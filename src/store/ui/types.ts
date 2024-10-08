import { RoadtripState } from '../user/types'

export type userEntry = {
  public?: boolean
  name: string
  description?: string
  latitude: number | null
  longitude: number | null
  category?: string
  user_id?: number
  is_allowed?: boolean
}

export type UiState = {
  progressStep: '1' | '2' | '3' | '4'
  previousStep: '1' | '2' | '3' | '4'
  roadtripStops: number[][]
  roadtripStopNames: string[]
  maxRoadtripStops: number
  isEditOpen: boolean
  isAddPlace: boolean
  isLoginActive: boolean
  selectedCategories: { id: string; text: string }[]
  mapRoute: string[]
  isLocked: boolean
  roadtripInfos: {
    address: string
    categories: { id: string; name: string; primary?: boolean }
    coordinates: number[]
    api_key: string
    entry?: userEntry
  }[]
  editRoadtrip: RoadtripState
  dropzoneFiles: (File & { preview: string })[]
  isTest: boolean
  message: { content: string; status?: string }
  isGenerated: boolean
  coorForMap: { lat: number; lng: number }
}
