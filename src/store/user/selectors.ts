import { createSelector } from 'reselect'

import { UserState } from './types'

export const selectUser = (state: { user: UserState }) => state.user

export const selectRoadtrips = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.roadtrips
  })

export const selectUserName = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.userName
  })

export const selectUserEmail = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.email
  })

export const selectUserPicture = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.picture
  })
export const selectUserId = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.id
  })

export const selectUserToken = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.token
  })

export const selectUserLocations = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.locations
  })

export const selectAdminUsers = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.users
  })

export const selectUserIsAdmin = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.isAdmin
  })

export const selectUserHasTutorial = () =>
  createSelector(selectUser, (user: UserState) => {
    return user.tutorial
  })
