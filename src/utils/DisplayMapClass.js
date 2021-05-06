import React, { useState, useEffect } from 'react'

import flag from '../assets/flag.svg'

//Style Features of Map
function changeFeatureStyle(map) {
  // get the vector provider from the base layer
  var provider = map.getBaseLayer().getProvider()

  // get the style object for the base layer
  var streetStyle = provider.getStyle()

  var changeListener = (evt) => {
    if (streetStyle.getState() === window.H.map.Style.State.READY) {
      streetStyle.removeEventListener('change', changeListener)

      // query the sub-section of the style configuration
      // the call removes the subsection from the original configuration
      var streetConfig = streetStyle.extractConfig([
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

export class DisplayMapClass extends React.Component {
  mapRef = React.createRef()
  state = {
    map: null,
  }

  //Screenshot Doku: https://developer.here.com/documentation/examples/maps-js/maps/capture-map-area

  componentDidMount() {
    const H = window.H
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    })
    const defaultLayers = platform.createDefaultLayers()

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 47.7, lng: 13.2 },
        zoom: 7,
        pixelRatio: window.devicePixelRatio || 1,
      }
    )

    // Add all Markers to Map
    // Create an icon, an object holding the latitude and longitude, and a marker:
    // Location Object should look like this: { lat: 47.79941, lng: 13.04399 }
    const location = this.props.allLocations
    const flagIcon = new H.map.Icon(flag)
    for (let i = 0; i < location.length - 1; i++) {
      // Create the parameters for the routing request:
      const routingParameters = {
        routingMode: 'fast',
        transportMode: 'car',
        // The start point of the route:
        // format: '50.1120423728813,8.68340740740811'
        origin: location[i],
        // The end point of the route:
        destination: location[i + 1],
        // Include the route shape in the response
        return: 'polyline',
      }

      // Define a callback function to process the routing response:
      const onResult = function (result) {
        // ensure that at least one route was found
        if (result.routes.length) {
          result.routes[0].sections.forEach((section) => {
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

            // Add the route polyline and the two markers to the map:
            map.addObjects([routeLine, routeArrows, startMarker, endMarker])
          })
        }
      }

      // Get an instance of the routing service version 8:
      const router = platform.getRoutingService(null, 8)

      // Call calculateRoute() with the routing parameters,
      // the callback and an error callback function (called if a
      // communication error occurs):
      router.calculateRoute(routingParameters, onResult, function (error) {
        // alert(error.message)
      })
    }

    // resize map when window size change - responsive
    window.addEventListener('resize', function () {
      map.getViewPort().resize()
    })

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

    // Create the default UI components to allow the user to interact with them
    const ui = H.ui.UI.createDefault(map, defaultLayers)

    // Now use the map as required...
    changeFeatureStyle(map)

    this.setState({ map })
  }

  componentWillUnmount() {
    this.state.map.dispose()
  }

  render() {
    return (
      <div
        id="map"
        ref={this.mapRef}
        style={{
          height: this.props.isSmall ? '35vh' : '45vh',
          width: this.props.isSmall ? '46vw' : '64vw',
          minWidth: '270px',
          margin: 'auto',
        }}
      />
    )
  }
}
