import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'

import { ReduxState } from './types'
import { uiReducer } from './ui/reducers'
import { userReducer } from './user/reducers'

export default (history: History) =>
  combineReducers<ReduxState>({
    user: userReducer,
    ui: uiReducer,
    router: connectRouter(history),
  })
