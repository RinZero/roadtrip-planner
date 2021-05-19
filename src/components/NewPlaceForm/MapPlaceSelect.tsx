import { useRef, useEffect, memo } from 'react'

import { Box, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'

import flag from '../../assets/flag.svg'
import { selectCoorForMap } from '../../store/selectors'
import { StyledNumberInput } from './style'

type PlaceMapProps = {
  setMapCoor({}): void
  coor: { lat: number; lng: number }
  zoom: number
}
const windowH = window as any

const PlaceMap = (props: PlaceMapProps) => {
  const { setMapCoor, coor, zoom } = props
  const coorForMap = useSelector(selectCoorForMap())
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapRef.current === null || mapRef === null) return
    const H = windowH.H
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    })
    const defaultLayers = platform.createDefaultLayers()

    // map
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: coorForMap.lat, lng: coorForMap.lng },
      zoom: zoom,
      pixelRatio: window.devicePixelRatio || 1,
    })

    // Create an icon, an object holding the latitude and longitude, and a marker:
    const flagIcon = new H.map.Icon(flag)
    const centerMarker = new H.map.Marker(
      { lat: coorForMap.lat, lng: coorForMap.lng },
      {
        icon: flagIcon,
      }
    )
    // Marker stays in the center of the map
    hMap.getViewModel().addEventListener('sync', function () {
      const center = hMap.getCenter()
      centerMarker.setGeometry(center)
      hMap.addObjects([centerMarker])
      setMapCoor({ lat: center.lat, lng: center.lng })
    })

    // resize map when window size change - responsive
    windowH.addEventListener('resize', () => {
      hMap.getViewPort().resize()
    })

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap))

    // Create the default UI components to allow the user to interact with them
    const ui = H.ui.UI.createDefault(hMap, defaultLayers)

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose()
    }
  }, [mapRef, coorForMap]) // This will run this hook every time this ref is updated

  return (
    <>
      <Typography variant="body1">Standort auswählen</Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" height="25vh">
        <div
          id="mapPlace"
          ref={mapRef}
          style={{
            height: '25vh',
            maxWidth: '70vw',
            minWidth: '270px',
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
        >
          <StyledNumberInput
            id="latitude"
            name="latitude"
            label="Breitengrad"
            value={coor.lat}
            inputProps={{ step: '0.000000000000001', max: 180, min: -180 }}
          />
          <StyledNumberInput
            id="longitude"
            name="longitude"
            label="Längengrad"
            value={coor.lng}
            inputProps={{ step: '0.000000000000001', max: 90, min: -90 }}
          />
        </Box>
      </Box>
    </>
  )
}
export default memo(PlaceMap)
