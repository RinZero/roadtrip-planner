import * as React from 'react'

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

    var svg =
      '<svg height="30px" viewBox="-96 0 464 464" width="30px" ' +
      'xmlns="http://www.w3.org/2000/svg">' +
      '<path d="m272 428c0-19.882812-60.890625-36-136-36s-136 16.117188-136 36 60.890625 36 136 36 136-16.117188 136-36zm0 0" fill="#adabac"/>' +
      '<path d="m120 160h32v256c0 8.835938-7.164062 16-16 16s-16-7.164062-16-16zm0 0" fill="#494342"/>' +
      '<path d="m232 96c0 53.019531-42.980469 96-96 96s-96-42.980469-96-96 42.980469-96 96-96 96 42.980469 96 96zm0 0" fill="#ad2943"/>' +
      '<path d="m200 96c0 35.347656-28.652344 64-64 64s-64-28.652344-64-64 28.652344-64 64-64 64 28.652344 64 64zm0 0" fill="#ee3446"/></svg>'

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(svg),
      coords = { lat: 47.79941, lng: 13.04399 },
      marker = new H.map.Marker(coords, { icon: icon })

    map.addObject(marker)

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
