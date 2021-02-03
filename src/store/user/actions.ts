import { ActionType, createAction } from 'typesafe-actions'

import { LocationState, RoadtripState } from './types'

export const logInSuccess = createAction('user/LOG_IN_SUCCESS')<{
  id: string
  userName: string
  email: string
  isAdmin: boolean
  picture?: string
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
export const logOutSuccess = createAction('user/LOG_OUT_SUCCESS')()

export const UserActions = {
  logIn,
  updateUser,
  logInSuccess,
  logOutSuccess,
}

export type UserActionsType = ActionType<typeof UserActions>
