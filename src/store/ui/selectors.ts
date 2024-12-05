import { createSelector } from 'reselect'

import { UiState } from './types'

export const selectUi = (state: { ui: UiState }) => state.ui

export const selectProgessStep = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.progressStep
  })

export const selectPreviousStep = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.previousStep
  })

export const selectRoadtripStops = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.roadtripStops
  })

export const selectMaxRoadtripStops = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.maxRoadtripStops
  })

export const selectIsEditOpen = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.isEditOpen
  })

export const selectIsAddPlace = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.isAddPlace
  })

export const selectIsLoginActive = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.isLoginActive
  })

export const selectUiSelectedCategories = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.selectedCategories
  })

export const selectMapRoute = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.mapRoute
  })

export const selectIsLocked = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.isLocked
  })

export const selectRoadtripInfos = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.roadtripInfos
  })

export const selectEditRoadtrip = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.editRoadtrip
  })

export const selectDropzoneFiles = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.dropzoneFiles
  })

export const selectIsTest = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.isTest
  })

export const selectMessage = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.message
  })

export const selectRoadtripStopNames = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.roadtripStopNames
  })

export const selectIsGenerated = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.isGenerated
  })

export const selectCoorForMap = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.coorForMap
  })
