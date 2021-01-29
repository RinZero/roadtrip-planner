import { ActionType, createAction } from 'typesafe-actions'

export const logIn = createAction('user/LOG_IN')<{
  userName: string
}>()

export const UserActions = {
  logIn,
}

export type UserActionsType = ActionType<typeof UserActions>
