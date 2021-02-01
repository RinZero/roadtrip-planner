import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import { updateUser, UserActionsType, logInSuccess } from './actions'
import { UserState } from './types'

export const initialState: UserState = {
  userName: 'Guest',
  email: '',
  isAdmin: false,
  password: '',
  image: '',
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
      case getType(updateUser): {
        const { userName, email, password, image } = action.payload
        draft.userName = userName
        draft.email = email
        draft.password = password
        draft.image = image
        return draft
      }
      default:
        return draft
    }
  }
)
