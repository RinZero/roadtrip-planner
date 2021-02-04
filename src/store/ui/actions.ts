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
  selectedCategories: string[]
}>()

export const UiActions = {
  setProgressStep,
  setRoadtripStops,
  setMaxRoadtripStops,
  setUiSelectedCategories,
}

export type UiActionsType = ActionType<typeof UiActions>
