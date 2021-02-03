export type UserState = {
  id: string
  userName: string
  email: string
  isAdmin: boolean
  picture?: string
  roadtrips?: {
    [key: string]: RoadtripState
  }[]
  locations?: LocationState[]
}

export type RoadtripState = {
  name: string
  stops: LocationState[]
  distance: number
}

export type LocationState = {
  id: string
  name: string
  longitude: number
  latitude: number
  description?: string
  date?: string
  isReturning?: 'daily' | 'weekly' | 'monthly' | 'yearly' | undefined
  fotos?: string[]
}
