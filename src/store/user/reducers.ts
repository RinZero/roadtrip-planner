import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import {
  logInSuccess,
  logOutSuccess,
  updateUser,
  UserActionsType,
  getRoadtripsByUserSuccess,
  getLocationsByUserSuccess,
} from './actions'
import { UserState } from './types'

export const initialState: UserState = {
  userName: 'Guest',
  email: '',
  isAdmin: false,
  password: '',
  roadtrips: [],
  locations: [],
  id: 'guest',
  picture: undefined,
  token: '',
}

export const userReducer = produce(
  (draft: Draft<UserState> = initialState, action: UserActionsType) => {
    switch (action.type) {
      case getType(logInSuccess): {
        const {
          userName,
          email,
          isAdmin,
          picture,
          id,
          roadtrips,
          locations,
          token,
          image,
        } = action.payload
        draft.id = id
        draft.userName = userName
        draft.email = email
        draft.isAdmin = isAdmin
        draft.picture = picture || image
        draft.roadtrips = roadtrips
        draft.locations = locations
        draft.token = token
        return draft
      }
      case getType(getRoadtripsByUserSuccess): {
        const { roadtrips } = action.payload
        draft.roadtrips = roadtrips
        return draft
      }
      case getType(getLocationsByUserSuccess): {
        const { locations } = action.payload
        draft.locations = locations
        return draft
      }
      case getType(updateUser): {
        const { userName, email, password, picture } = action.payload
        draft.userName = userName
        draft.email = email
        draft.password = password
        draft.picture = picture
        return draft
      }
      case getType(logOutSuccess): {
        draft = initialState
        return draft
      }
      default:
        return draft
    }
  }
)
