import * as React from 'react'

import markerSVG from '../assets/markerSVG.svg'
export class DisplayMapClass extends React.Component {
  mapRef = React.createRef()
  state = {
    map: null,
  }

  componentDidMount() {
    const H = window.H
    const platform = new H.service.Platform({
      apikey: 'E2lDYLhdeOT8rv2atmJ78m7_jafCkXg3NmgSAwjpcdE',
    })

    const defaultLayers = platform.createDefaultLayers()

    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        center: { lat: 47.79941, lng: 13.04399 },
        zoom: 8,
        pixelRatio: window.devicePixelRatio || 1,
      }
    )

    // Add all Markers to Map
    // Create an icon, an object holding the latitude and longitude, and a marker:
    // Location Object should look like this: { lat: 47.79941, lng: 13.04399 }
    this.props.allLocations.forEach(function (location) {
      var icon = new H.map.Icon(markerSVG),
        coords = location,
        marker = new H.map.Marker(coords, { icon: icon })
      map.addObject(marker)
    })

    // Create the parameters for the routing request:
    var routingParameters = {
      routingMode: 'fast',
      transportMode: 'car',
      // The start point of the route:
      // format: '50.1120423728813,8.68340740740811'
      origin: this.props.start,
      // The end point of the route:
      destination: this.props.end,
      // Include the route shape in the response
      via: '50.1120423728813,8.68340740740811',
      return: 'polyline',
    }

    // Define a callback function to process the routing response:
    var onResult = function (result) {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section) => {
          // Create a linestring to use as a point source for the route line
          let linestring = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          )

          // Create a polyline to display the route:
          let routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'red', lineWidth: 3 },
          })

          // Create a marker for the start point:
          let startMarker = new H.map.Marker(section.departure.place.location)

          // Create a marker for the end point:
          let endMarker = new H.map.Marker(section.arrival.place.location)

          // Add the route polyline and the two markers to the map:
          map.addObjects([routeLine, startMarker, endMarker])

          // Set the map's viewport to make the whole route visible:
          map
            .getViewModel()
            .setLookAtData({ bounds: routeLine.getBoundingBox() })
        })
      }
    }

    // Get an instance of the routing service version 8:
    var router = platform.getRoutingService(null, 8)

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult, function (error) {
      alert(error.message)
    })

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers)

    this.setState({ map })
  }

  componentWillUnmount() {
    this.state.map.dispose()
  }

  render() {
    return <div ref={this.mapRef} style={{ height: '500px', width: '70%' }} />
  }
}
