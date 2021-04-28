import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { RootReducers } from './RootReducer'

declare global {
  export interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export const store = createStore(
  RootReducers,
  composeEnhancers(applyMiddleware(thunk)),
)
