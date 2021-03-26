export type UserState = {
  id: string
  userName: string
  email: string
  password: string
  isAdmin: boolean
  picture?: string
  roadtrips?: RoadtripState[]
  locations?: LocationState[]
  token: string
}

export type RoadtripState = {
  name: string
  stops: LocationState[]
  distance?: number
  id: number
  public: boolean
}

export type LocationState = {
  id: string
  name?: string
  longitude?: number
  latitude?: number
  category?: string
  description?: string
  date?: string
  isReturning?: 'daily' | 'weekly' | 'monthly' | 'yearly' | undefined
  fotos?: string[]
  user_id?: number
  public?: boolean
  is_allowed?: boolean
  api_entry_key?: string
}
