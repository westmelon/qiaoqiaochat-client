import { createStore, applyMiddleware, Store } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import messageMi from './messageMiddleware'
import { reducer, initialState } from './reducers/auto-reducer'

// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;

// const enhancer = composeEnhancers(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// );

// const composeEnhancers = (() => {
//   const compose_ = window && (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose)
//   if (process.env.NODE_ENV === 'development' && compose_) {
//     return compose_()
//   }
//   return compose
// })()

const middlewares = [thunk, messageMi]

// const enhancer = composeEnhancers(applyMiddleware(...middlewares))

// export const store = createStore<StoreStates, any, {}, {}>(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middlewares))
// )

let store
export const buildStore = () => {
  return createStore<StoreStates, any, {}, {}>(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
}

declare global {
  type AppStore = Store
}
