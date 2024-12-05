import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

export const history = createBrowserHistory()

export type AppState = ReturnType<typeof reducers>

const middleWareEnhancer = applyMiddleware(routerMiddleware(history))
const composeEnhancer = composeWithDevTools({})

const persistConfig = {
  key: 'root',
  storage, //storage import defines which, type of torage is used. In this case: localStorage
}
const persistedReducer = persistReducer(persistConfig, reducers(history))

const store = createStore(persistedReducer, composeEnhancer(middleWareEnhancer))
export const persistor = persistStore(store)

export default store
