import produce, { Draft } from 'immer'
import { getType } from 'typesafe-actions'

import { logIn, UserActionsType } from './actions'
import { UserState } from './types'

export const initialState: UserState = {
  userName: 'Guest',
  email: '',
  isAdmin: false,
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
      default:
        return draft
    }
  }
)
