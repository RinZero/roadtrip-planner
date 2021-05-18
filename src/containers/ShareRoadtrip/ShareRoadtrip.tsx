import React, { memo } from 'react'

import {
  List,
  ListItemText,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Link,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { resetUI } from '../../store/actions'
import {
  selectMapRoute,
  selectRoadtripInfos,
  selectUiSelectedCategories,
  selectRoadtripStopNames,
} from '../../store/selectors'
import DisplayMapFC from '../../utils/DisplayMapFC'
import {
  TagChip,
  LocationsListItem,
  StopsBox,
  ListRespBox,
  BottomInfoBox,
  BottomOptionBox,
  TagBox,
} from './style'
const ShareRoadtrip = () => {
  const mapRoute = useSelector(selectMapRoute())
  const roadtriptInfos = useSelector(selectRoadtripInfos())
  const selectedStops = useSelector(selectRoadtripStopNames())
  const selectedCategories = useSelector(selectUiSelectedCategories())
  // für die Zusammenfassung welche Kategorien für den Roadtrip verwendet wurden
  const theme = useTheme()
  const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const dispatch = useDispatch()
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" align="center">
          Der Roadtrip wurde erstellt
        </Typography>

        <Link
          component={RouterLink}
          to={`/step/:1`}
          onClick={() => dispatch(resetUI())}
          variant="h6"
        >
          Erstelle einen weiteren Roadtrip
        </Link>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <ListRespBox>
          <DisplayMapFC allLocations={mapRoute} isSmall={isLaptop} />
          <StopsBox isLaptop={isLaptop}>
            <Typography variant="h6" align="center">
              Ausgewählte Stops:
            </Typography>
            <List component="nav" aria-label="locations">
              {roadtriptInfos.map((item) => {
                return (
                  <LocationsListItem>
                    <ListItemText primary={item.address} />
                  </LocationsListItem>
                )
              })}
            </List>
          </StopsBox>
        </ListRespBox>
        <BottomInfoBox>
          <BottomOptionBox>
            <Typography variant="h6">Ausgewählte Orte:</Typography>
            <TagBox component="ul">
              {selectedStops
                .filter((item) => item.length > 0)
                .map((item) => {
                  return <TagChip label={item} />
                })}
            </TagBox>
          </BottomOptionBox>
          <BottomOptionBox>
            <Typography variant="h6">Ausgewählte Kategorien:</Typography>
            <TagBox component="ul">
              {selectedCategories.map((item) => {
                return <TagChip label={item.text} />
              })}
            </TagBox>
          </BottomOptionBox>
        </BottomInfoBox>
      </Box>
    </>
  )
}

export default memo(ShareRoadtrip)
