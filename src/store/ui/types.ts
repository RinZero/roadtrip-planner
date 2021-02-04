export type UiState = {
  progressStep: '1' | '2' | '3' | '4'
  roadtripStops: number[][]
  maxRoadtripStops: number
  isEditOpen: boolean
  isAddPlace: boolean
  isLoginActive: boolean
  selectedCategories: string[]
}
