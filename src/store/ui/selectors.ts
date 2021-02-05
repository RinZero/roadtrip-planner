import { createSelector } from 'reselect'

import { UiState } from './types'

export const selectUi = (state: { ui: UiState }) => state.ui

export const selectProgessStep = () =>
  createSelector(selectUi, (ui: UiState) => {
    return ui.progressStep
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
