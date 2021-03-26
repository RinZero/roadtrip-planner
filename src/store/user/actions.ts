import { ActionType, createAction } from 'typesafe-actions'

import { LocationState, RoadtripState } from './types'

export const logInSuccess = createAction('user/LOG_IN_SUCCESS')<{
  id: string
  userName: string
  email: string
  isAdmin: boolean
  picture?: string
  image?: string
  roadtrips?: RoadtripState[]
  locations?: LocationState[]
  token: string
}>()

export const getRoadtripsByUserSuccess = createAction(
  'user/GET_ROADTRIPS_BY_USER_SUCCESS'
)<{
  roadtrips?: RoadtripState[]
}>()

export const getLocationsByUserSuccess = createAction(
  'user/GET_LOCATIONS_BY_USER_SUCCESS'
)<{
  locations?: LocationState[]
}>()

export const updateUser = createAction('user/UPDATE_USER')<{
  userName: string
  email: string
  password: string
  picture: string
}>()

export const logOutSuccess = createAction('user/LOG_OUT_SUCCESS')()

export const UserActions = {
  updateUser,
  logInSuccess,
  logOutSuccess,
  getRoadtripsByUserSuccess,
  getLocationsByUserSuccess,
}

export type UserActionsType = ActionType<typeof UserActions>
