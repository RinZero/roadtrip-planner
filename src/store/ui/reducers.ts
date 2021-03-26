import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import {
  setRoadtripInfos,
  setIsLocked,
  setMapRoute,
  setMaxRoadtripStops,
  setProgressStep,
  setRoadtripStops,
  setUiSelectedCategories,
  UiActionsType,
  setEditRoadtripStops,
  setEditRoadtrip,
  setDropzoneFiles,
} from './actions'
import { UiState } from './types'

export const initialState: UiState = {
  progressStep: '1',
  roadtripStops: [],
  maxRoadtripStops: 5,
  isEditOpen: false,
  isAddPlace: false,
  isLoginActive: false,
  selectedCategories: new Map<string, string>(),
  mapRoute: [],
  isLocked: false,
  roadtripInfos: [],
  editRoadtrip: { name: '', stops: [], id: -1, public: false },
  dropzoneFiles: [],
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
        const { selectedCategoriesMap } = action.payload
        draft.selectedCategories = selectedCategoriesMap
        return draft
      }
      case getType(setMapRoute): {
        const { mapRoute } = action.payload
        draft.mapRoute = mapRoute
        return draft
      }
      case getType(setIsLocked): {
        const { isLocked } = action.payload
        draft.isLocked = isLocked
        return draft
      }
      case getType(setRoadtripInfos): {
        const { roadtripInfos } = action.payload
        draft.roadtripInfos = roadtripInfos
        return draft
      }
      case getType(setEditRoadtripStops): {
        const { editRoadtripStops } = action.payload
        draft.editRoadtrip.stops = editRoadtripStops
        return draft
      }
      case getType(setEditRoadtrip): {
        const { editRoadtrip } = action.payload
        draft.editRoadtrip = editRoadtrip
        return draft
      }
      case getType(setDropzoneFiles): {
        const { dropzoneFiles } = action.payload
        draft.dropzoneFiles = dropzoneFiles
        return draft
      }
      default:
        return draft
    }
  }
)
