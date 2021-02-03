import { ActionType, createAction } from 'typesafe-actions'

export const logIn = createAction('user/LOG_IN')<{
  userName: string
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
}

export type UserActionsType = ActionType<typeof UserActions>
