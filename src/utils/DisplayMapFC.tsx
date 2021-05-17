import { memo, FC, useRef, useEffect } from 'react'

import { useSelector } from 'react-redux'

import flag from '../assets/flag.svg'
import PopupContent from '../components/PopupContent'
import { selectRoadtripInfos } from '../store/selectors'
import './infoBubble.css'
const windowH = window as any //window.H hat keinen passende type deklaration von Here

const changeFeatureStyle = (map: any) => {
  // get the vector provider from the base layer
  const provider = map.getBaseLayer().getProvider()

  // get the style object for the base layer
  const streetStyle = provider.getStyle()

  const changeListener = (evt: Event) => {
    if (streetStyle.getState() === windowH.H.map.Style.State.READY) {
      streetStyle.removeEventListener('change', changeListener)

      // query the sub-section of the style configuration
      // the call removes the subsection from the original configuration
      const streetConfig = streetStyle.extractConfig([
        'landuse.park',
        'landuse.builtup',
        'roads.highway',
      ])
      // change the color, for the description of the style section
      // see the Developer's guide
      streetConfig.layers.landuse.park.draw.polygons.color = '#2ba815'
      streetConfig.layers.landuse.builtup.draw.polygons.color = '#a4aba4'
      streetConfig.layers.roads.highway.draw.lines.color = '#faef5a'

      // merge the configuration back to the base layer configuration
      streetStyle.mergeConfig(streetConfig)
    }
  }

  streetStyle.addEventListener('change', changeListener)
}

const formatBubbleTest = (info: {
  address: string
  categories: {
    id: string
    name: string
    primary?: boolean | undefined
  }
  coordinates: number[]
}) => {
  let bubbleString =
    '<p>' + info.address.slice(0, info.address.lastIndexOf(','))
  bubbleString += '</p><div class="overflowBox"><div class="categoriesBox">'
  ;(info.categories as any).forEach(
    (e: { name: string; primary?: boolean }) => {
      bubbleString +=
        '<div class="category' +
        (e.primary ? ' primeCategory' : '') +
        '">' +
        e.name +
        '</div>'
    }
  )
  bubbleString += `</div></div>`
  return bubbleString
}

export type MapProps = {
  allLocations: string[]
  isSmall: boolean
}

const DisplayMapFC: FC<MapProps> = ({ allLocations, isSmall }) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef<HTMLDivElement>(null)
  const roadtripInfos = useSelector(selectRoadtripInfos())
  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  useEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (mapRef.current === null || mapRef === null) return
    const H = windowH.H
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    })
    const defaultLayers = platform.createDefaultLayers()

    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 47.5, lng: 13.5 },
      zoom: 6.5,
      pixelRatio: window.devicePixelRatio || 1,
    })
    // Create the default UI components to allow the user to interact with them
    const ui = H.ui.UI.createDefault(hMap, defaultLayers)
    // Add all Markers to Map
    // Create an icon, an object holding the latitude and longitude, and a marker:
    // Location Object should look like this: { lat: 47.79941, lng: 13.04399 }
    const flagIcon = new H.map.Icon(flag)
    for (let i = 0; i < allLocations.length - 1; i++) {
      // Create the parameters for the routing request:
      const routingParameters = {
        routingMode: 'fast',
        transportMode: 'car',
        // The start point of the route:
        // format: '50.1120423728813,8.68340740740811'
        origin: allLocations[i],
        // The end point of the route:
        destination: allLocations[i + 1],
        // Include the route shape in the response
        return: 'polyline',
      }
      // Define a callback function to process the routing response:
      const onResult = function (result: any) {
        // ensure that at least one route was found

        if (result.routes.length) {
          result.routes[0].sections.forEach((section: any) => {
            // Create a linestring to use as a point source for the route line
            const linestring = H.geo.LineString.fromFlexiblePolyline(
              section.polyline
            )

            // Create a polyline to display the route:
            const routeLine = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 3,
                strokeColor: 'rgba(230, 0, 0, 1)',
                lineTailCap: 'arrow-tail',
                lineHeadCap: 'arrow-head',
              },
            })
            // Create a patterned polyline:
            const routeArrows = new H.map.Polyline(linestring, {
              style: {
                lineWidth: 3,
                fillColor: 'white',
                strokeColor: 'rgba(255, 255, 255, 1)',
                lineDash: [0, 2],
                lineTailCap: 'arrow-tail',
                lineHeadCap: 'arrow-head',
              },
            })

            // Create a marker for the start point:
            const startMarker = new H.map.Marker(
              section.departure.place.location,
              {
                icon: flagIcon,
              }
            )
            // eslint-disable-next-line no-console
            console.log(roadtripInfos[i].categories, roadtripInfos)
            startMarker.setData(formatBubbleTest(roadtripInfos[i]))
            startMarker.addEventListener('tap', (event: any) => {
              const bubble = new H.ui.InfoBubble(event.target.getGeometry(), {
                content: event.target.getData(),
              })
              bubble.addClass('custom-bubble')
              ui.addBubble(bubble)
            })
            // Create a marker for the end point:
            const endMarker = new H.map.Marker(section.arrival.place.location, {
              icon: flagIcon,
            })
            endMarker.setData(formatBubbleTest(roadtripInfos[i + 1]))
            endMarker.addEventListener('tap', (event: any) => {
              const bubble = new H.ui.InfoBubble(event.target.getGeometry(), {
                content: event.target.getData(),
              })
              bubble.addClass('custom-bubble')
              ui.addBubble(bubble)
            })
            // Add the route polyline and the two markers to the map:
            hMap.addObjects([routeLine, routeArrows, startMarker, endMarker])
          })
        }
      }

      // Get an instance of the routing service version 8:
      const router = platform.getRoutingService(null, 8)

      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(
        routingParameters,
        onResult,
        function (error: Error) {
          // alert(error.message)
        }
      )
    }

    // resize map when window size change - responsive
    windowH.addEventListener('resize', () => {
      hMap.getViewPort().resize()
    })

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap))

    // Now use the map as required...
    // eslint-disable-next-line no-console
    console.log(hMap.getObjects())
    changeFeatureStyle(hMap)

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose()
    }
  }, [mapRef, allLocations]) // This will run this hook every time this ref is updated

  return (
    <div
      id="map"
      ref={mapRef}
      style={{
        height: isSmall ? '35vh' : '45vh',
        width: isSmall ? '46vw' : '64vw',
        minWidth: '270px',
        margin: 'auto',
      }}
    />
  )
}
export default memo(DisplayMapFC)
