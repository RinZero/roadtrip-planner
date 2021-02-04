import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import {
  setMaxRoadtripStops,
  setProgressStep,
  setRoadtripStops,
  setUiSelectedCategories,
  UiActionsType,
} from './actions'
import { UiState } from './types'

export const initialState: UiState = {
  progressStep: '1',
  roadtripStops: [],
  maxRoadtripStops: 5,
  isEditOpen: false,
  isAddPlace: false,
  isLoginActive: false,
  selectedCategories: [],
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
      case getType(setMaxRoadtripStops): {
        const { maxRoadtripStops } = action.payload
        draft.maxRoadtripStops = maxRoadtripStops
        return draft
      }
      case getType(setUiSelectedCategories): {
        const { selectedCategories } = action.payload
        draft.selectedCategories = selectedCategories
        return draft
      }
      default:
        return draft
    }
  }
)
