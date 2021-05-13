import { useRef, useEffect, memo } from 'react'

import { Box, useMediaQuery, useTheme } from '@material-ui/core'

import flag from '../../assets/flag.svg'
import { StyledNumberInput } from './style'

type PlaceMapProps = {
  register: any
  setValue: any
  lat: number
  lng: number
}
const windowH = window as any

const PlaceMap = (props: PlaceMapProps) => {
  const { register, setValue } = props
  const theme = useTheme()
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'))

  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const { lat, lng } = props
    setValue('latitude', lat)
    setValue('longitude', lng)

    if (mapRef.current === null || mapRef === null) return
    const H = windowH.H
    const platform = new H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY,
    })
    const defaultLayers = platform.createDefaultLayers()

    // map
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: lat, lng: lng },
      zoom: 6.5,
      pixelRatio: window.devicePixelRatio || 1,
    })

    // Create an icon, an object holding the latitude and longitude, and a marker:
    const flagIcon = new H.map.Icon(flag)
    const centerMarker = new H.map.Marker(
      { lat: lat, lng: lng },
      {
        icon: flagIcon,
      }
    )
    // Marker stays in the center of the map
    hMap.getViewModel().addEventListener('sync', function () {
      const center = hMap.getCenter()
      centerMarker.setGeometry(center)
      hMap.addObjects([centerMarker])
      setValue('latitude', center.lat)
      setValue('longitude', center.lng)
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
  }, [mapRef, props]) // This will run this hook every time this ref is updated

  return (
    <>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <div
          id="mapPlace"
          ref={mapRef}
          style={{
            height: isLaptop ? '30vh' : '20vh',
            maxWidth: '70vw',
            minWidth: isLaptop ? '40vw' : '270px',
            margin: 'auto',
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
            inputRef={register}
            inputProps={{ step: '0.000000000000001', max: 180, min: -180 }}
          />
          <StyledNumberInput
            id="longitude"
            name="longitude"
            label="Längengrad"
            inputRef={register}
            inputProps={{ step: '0.000000000000001', max: 90, min: -90 }}
          />
        </Box>
      </Box>
    </>
  )
}
export default memo(PlaceMap)
