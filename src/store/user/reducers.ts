import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import { logInSuccess, logOutSuccess, UserActionsType } from './actions'
import { UserState } from './types'

export const initialState: UserState = {
  userName: 'Guest',
  email: '',
  isAdmin: false,
  roadtrips: [],
  locations: [],
  id: 'guest',
  picture: undefined,
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
        } = action.payload
        draft.id = id
        draft.userName = userName
        draft.email = email
        draft.isAdmin = isAdmin
        draft.picture = picture
        draft.roadtrips = roadtrips
        draft.locations = locations
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
