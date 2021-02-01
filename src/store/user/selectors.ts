import { createSelector } from 'reselect'

import { UserState } from './types'

export const selectUser = (state: { user: UserState }) => state.user

export const makeSelectRoadtrips = (userName: string) =>
  createSelector(selectUser, (user: UserState) => {
    if (user.userName === userName) {
      return user.roadtrips
    }
    return null
  })

export const selectUserName = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.userName
  })
