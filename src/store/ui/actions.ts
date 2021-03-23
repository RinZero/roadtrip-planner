import { ActionType, createAction } from 'typesafe-actions'

export const setProgressStep = createAction('ui/SET_PROGRESS_STEP')<{
  progressStep: '1' | '2' | '3' | '4'
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
  selectedCategoriesMap: Map<string, string>
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

export const UiActions = {
  setProgressStep,
  setRoadtripStops,
  setMaxRoadtripStops,
  setUiSelectedCategories,
  setMapRoute,
  setIsLocked,
  setRoadtripInfos,
}

export type UiActionsType = ActionType<typeof UiActions>
