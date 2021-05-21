export type UserState = {
  id: string
  userName: string
  email: string
  password: string
  isAdmin: boolean
  tutorial: boolean[]
  picture?: string
  roadtrips?: RoadtripState[]
  locations?: LocationState[]
  token: string
  created_at?: string
  updated_at?: string
  users?: UserState[]
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
  user_id?: number
  public?: boolean
  is_allowed?: boolean
  api_entry_key?: string
  created_at?: string
  updated_at?: string
  order: number
}
