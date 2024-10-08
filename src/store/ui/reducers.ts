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
  setIsTest,
  setMessage,
  setRoadtripStopNames,
  setPreviousStep,
  setIsGenerated,
  setCoorForMap,
  resetUI,
} from './actions'
import { UiState } from './types'

export const initialState: UiState = {
  progressStep: '1',
  previousStep: '1',
  roadtripStops: [],
  maxRoadtripStops: 5,
  isEditOpen: false,
  isAddPlace: false,
  isLoginActive: false,
  selectedCategories: [],
  mapRoute: [],
  isLocked: false,
  roadtripInfos: [],
  editRoadtrip: { name: '', stops: [], id: -1, public: false },
  dropzoneFiles: [],
  isTest: false,
  message: { content: '', status: 'error' },
  roadtripStopNames: [],
  isGenerated: false,
  coorForMap: { lat: 47.5, lng: 13.5 },
}

export const uiReducer = produce(
  (draft: Draft<UiState> = initialState, action: UiActionsType) => {
    switch (action.type) {
      case getType(setProgressStep): {
        const { progressStep } = action.payload
        draft.progressStep = progressStep
        return draft
      }
      case getType(setPreviousStep): {
        const { previousStep } = action.payload
        draft.previousStep = previousStep
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
      case getType(setIsTest): {
        draft.isTest = !draft.isTest
        return draft
      }
      case getType(setMessage): {
        const { message, status } = action.payload
        draft.message = { content: message, status: status }

        return draft
      }
      case getType(setRoadtripStopNames): {
        const { roadtripStopNames } = action.payload
        draft.roadtripStopNames = roadtripStopNames
        return draft
      }
      case getType(setIsGenerated): {
        const { isGenerated } = action.payload
        draft.isGenerated = isGenerated
        return draft
      }
      case getType(setCoorForMap): {
        const { lat, lng } = action.payload
        draft.coorForMap = { lat: lat, lng: lng }
        return draft
      }
      case getType(resetUI): {
        draft = initialState
        return draft
      }
      default:
        return draft
    }
  }
)
