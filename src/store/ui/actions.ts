import { ActionType, createAction } from 'typesafe-actions'

export const setProgressStep = createAction('ui/SET_PROGRESS_STEP')<{
  progressStep: '1' | '2' | '3' | '4'
}>()

export const setRoadtripStops = createAction('ui/SET_ROADTRIP_Stops')<{
  roadtripStops: string[]
}>()

export const UiActions = {
  setProgressStep,
  setRoadtripStops,
}

export type UiActionsType = ActionType<typeof UiActions>
