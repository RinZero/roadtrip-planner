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

export const updateUser = createAction('user/UPDATE_USER')<{
  userName: string
  email: string
  password: string
  image: string
}>()

export const UserActions = {
  logIn,
  updateUser,
  logInSuccess,
}

export type UserActionsType = ActionType<typeof UserActions>
