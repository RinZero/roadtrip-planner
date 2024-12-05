import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import {
  logInSuccess,
  logOutSuccess,
  updateUser,
  UserActionsType,
  getRoadtripsByUserSuccess,
  getLocationsByUserSuccess,
  getUsersByAdminSuccess,
  updateTutorial,
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
  created_at: '',
  updated_at: '',
  users: [],
  tutorial: [false, false, false],
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
          created_at,
          updated_at,
          users,
          tutorial,
        } = action.payload
        draft.id = id
        draft.userName = userName
        draft.email = email
        draft.isAdmin = isAdmin
        draft.picture = image || picture
        draft.roadtrips = roadtrips
        draft.locations = locations
        draft.users = users
        draft.token = token
        draft.created_at = created_at
        draft.updated_at = updated_at
        draft.tutorial = tutorial
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
      case getType(getUsersByAdminSuccess): {
        const { users } = action.payload
        draft.users = users
        return draft
      }
      case getType(updateUser): {
        const { userName, email, picture } = action.payload
        draft.userName = userName
        draft.email = email
        draft.picture = picture
        return draft
      }
      case getType(updateTutorial): {
        const { tutorial } = action.payload
        draft.tutorial = tutorial
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
