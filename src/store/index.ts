import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'

export const history = createBrowserHistory()

export type AppState = ReturnType<typeof reducers>

const middleWareEnhancer = applyMiddleware(routerMiddleware(history))
const composeEnhancer = composeWithDevTools({})

const store = createStore(reducers(), composeEnhancer(middleWareEnhancer))

export default store
