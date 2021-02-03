import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import { logIn, updateUser, UserActionsType } from './actions'
import { UserState } from './types'

export const initialState: UserState = {
  userName: 'Guest',
  email: '',
  isAdmin: false,
  password: '',
  image: '',
  roadtrips: [],
}

export const userReducer = produce(
  (draft: Draft<UserState> = initialState, action: UserActionsType) => {
    switch (action.type) {
      case getType(logIn): {
        const { userName } = action.payload
        draft.userName = userName
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
