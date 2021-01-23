import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import { setProgressStep, setRoadtripStops, UiActionsType } from './actions'
import { UiState } from './types'

export const initialState: UiState = {
  progressStep: '1',
  roadtripStops: [],
  isEditOpen: false,
  isAddPlace: false,
  isLoginActive: false,
}

export const uiReducer = produce(
  (draft: Draft<UiState> = initialState, action: UiActionsType) => {
    switch (action.type) {
      case getType(setProgressStep): {
        const { progressStep } = action.payload
        draft.progressStep = progressStep
        return draft
      }
      case getType(setRoadtripStops): {
        const { roadtripStops } = action.payload
        draft.roadtripStops = roadtripStops
        return draft
      }
      default:
        return draft
    }
  }
)
