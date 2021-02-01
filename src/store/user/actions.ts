import { ActionType, createAction } from 'typesafe-actions'

import { LocationState, RoadtripState } from './types'

export const logInSuccess = createAction('user/LOG_IN_SUCCESS')<{
  userName: string
  email: string
  isAdmin: boolean
  roadtrips?: {
    [key: string]: RoadtripState
  }[]
  locations?: LocationState[]
}>()

export const UserActions = {
  logInSuccess,
}

export type UserActionsType = ActionType<typeof UserActions>
