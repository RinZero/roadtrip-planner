import { memo, FC, useRef, useEffect } from 'react'

import flag from '../assets/flag.svg'

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
function addMarkerToGroup(group: any, marker: any, html: any) {
  // add custom data to the marker
  marker.setData(html)
  group.addObject(marker)
}
function addInfoBubble(map: any, ui: any, markers: any) {
  const group = new windowH.H.map.Group()
  // eslint-disable-next-line no-console
  console.log(map)
  map.addObject(group)

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener(
    'tap',
    (evt: any) => {
      // eslint-disable-next-line no-console
      console.log('hi')
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      const bubble = new windowH.H.ui.InfoBubble(evt.target.getGeometry(), {
        // read custom data
        content: evt.target.getData(),
      })
      // eslint-disable-next-line no-console
      console.log(bubble)
      // show info bubble
      ui.addBubble(bubble)
    },
    false
  )
  markers.map((marker: any) => addMarkerToGroup(group, marker, '<h1>h1</h1>'))
}

export type MapProps = {
  allLocations: string[]
  isSmall: boolean
}

const DisplayMapFC: FC<MapProps> = ({ allLocations, isSmall }) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef<HTMLDivElement>(null)

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
    const markerArray: any[] = []
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

            // Create a marker for the end point:
            const endMarker = new H.map.Marker(section.arrival.place.location, {
              icon: flagIcon,
            })
            // eslint-disable-next-line no-console
            console.log(startMarker)
            markerArray.push(startMarker)
            markerArray.push(endMarker)
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

    // Create the default UI components to allow the user to interact with them
    const ui = H.ui.UI.createDefault(hMap, defaultLayers)
    // Now use the map as required...
    // eslint-disable-next-line no-console
    console.log(hMap.getObjects())
    changeFeatureStyle(hMap)
    addInfoBubble(hMap, ui, hMap.getObjects())

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
