import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import { logInSuccess, UserActionsType } from './actions'
import { UserState } from './types'

export const initialState: UserState = {
  userName: 'Guest',
  email: '',
  isAdmin: false,
  roadtrips: [],
  locations: [],
}

export const userReducer = produce(
  (draft: Draft<UserState> = initialState, action: UserActionsType) => {
    switch (action.type) {
      case getType(logInSuccess): {
        const {
          userName,
          email,
          isAdmin,
          roadtrips,
          locations,
        } = action.payload
        draft.userName = userName
        draft.email = email
        draft.isAdmin = isAdmin
        draft.roadtrips = roadtrips
        draft.locations = locations
        return draft
      }
      default:
        return draft
    }
  }
)
