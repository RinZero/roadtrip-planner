export type PublicPlaceType = {
  id: string
  categroy: string
  name: string
  description?: string
  user?: any
  location?: any
  latitude: number
  longitude: number
  is_allowed: boolean
  public: boolean
}

export type FormInputUserEntry = {
  name: string
  description: string
  latitude: number | null
  longitude: number | null
  category?: string
  public?: boolean
}
