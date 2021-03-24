export type UserState = {
  id: string
  userName: string
  email: string
  password: string
  image: string
  isAdmin: boolean
  picture?: string
  roadtrips?: RoadtripState[]
  locations?: LocationState[]
  token: string
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
  category?: string
  description?: string
  date?: string
  isReturning?: 'daily' | 'weekly' | 'monthly' | 'yearly' | undefined
  fotos?: string[]
}
