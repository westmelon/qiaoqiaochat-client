import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import messageMi from './messageMiddleware'
import { reducer, initialState } from './reducers/auto-reducer'
import reduxWebsocket from '../websocket/index'

const reduxWebsocketMiddleware = reduxWebsocket({ serializer: payload => payload })

export const store = createStore<StoreStates, any, {}, {}>(
  reducer,
  initialState,
  applyMiddleware(thunk, messageMi, reduxWebsocketMiddleware)
)

declare global {
  type AppStore = typeof store
}
