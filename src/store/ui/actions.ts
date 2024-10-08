/* eslint-disable prettier/prettier */
import { ActionType, createAction } from 'typesafe-actions'

import { LocationState, RoadtripState } from '../user/types'

export const setProgressStep = createAction('ui/SET_PROGRESS_STEP')<{
  progressStep: '1' | '2' | '3' | '4'
}>()

export const setPreviousStep = createAction('ui/SET_PREVIOUS_STEP')<{
  previousStep: '1' | '2' | '3' | '4'
}>()

export const setRoadtripStops = createAction('ui/SET_ROADTRIP_STOPS')<{
  roadtripStops: number[][]
}>()

export const setMaxRoadtripStops = createAction('ui/SET_MAX_ROADTRIP_STOPS')<{
  maxRoadtripStops: number
}>()

export const setUiSelectedCategories = createAction(
  'ui/SET_UI_SELECTED_CATEGORIES'
)<{
  selectedCategories: { id: string; text: string }[]
}>()

export const setMapRoute = createAction('ui/SET_MAP_ROUTE')<{
  mapRoute: string[]
}>()

export const setIsLocked = createAction('ui/SET_IS_LOCKED')<{
  isLocked: boolean
}>()

export const setRoadtripInfos = createAction('ui/SET_ROADTRIP_INFOS')<{
  roadtripInfos: {
    address: string
    categories: { id: string; name: string; primary?: boolean }
    coordinates: number[]
    api_key: string
  }[]
}>()

export const setEditRoadtripStops = createAction('ui/SET_EDIT_ROADTRIP_STOPS')<{
  editRoadtripStops: LocationState[]
}>()

export const setEditRoadtrip = createAction('ui/SET_EDIT_ROADTRIP')<{
  editRoadtrip: RoadtripState
}>()
export const setDropzoneFiles = createAction('ui/SET_DROPZONE_FILES')<{
  dropzoneFiles: (File & { preview: string })[]
}>()

export const setIsTest = createAction('ui/SET_IS_TEST')()

export const setMessage = createAction('ui/SET_MESSAGE')<{
  message: string
  status?: string
}>()

export const setRoadtripStopNames = createAction('ui/SET_ROADTRIP_STOP_NAMES')<{
  roadtripStopNames: string[]
}>()

export const setIsGenerated = createAction('ui/SET_IS_GENERATED')<{
  isGenerated: boolean
}>()
export const setCoorForMap = createAction('ui/SET_COOR_FOR_MAP')<{
  lat: number
  lng: number
}>()

export const resetUI = createAction('ui/RESET_UI')()
export const UiActions = {
  setIsTest,
  setProgressStep,
  setPreviousStep,
  setRoadtripStops,
  setMaxRoadtripStops,
  setUiSelectedCategories,
  setMapRoute,
  setIsLocked,
  setRoadtripInfos,
  setEditRoadtripStops,
  setEditRoadtrip,
  setDropzoneFiles,
  setMessage,
  setRoadtripStopNames,
  setIsGenerated,
  setCoorForMap,
  resetUI,
}

export type UiActionsType = ActionType<typeof UiActions>
