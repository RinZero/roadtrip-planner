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
