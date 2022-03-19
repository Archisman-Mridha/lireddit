import { applyMiddleware, createStore } from "redux"
import { persistedRootReducer } from "./reducers/root.reducer"
import { logger } from "redux-logger"
import thunk from "redux-thunk"
import { persistStore } from "redux-persist"

export const store= createStore(persistedRootReducer, applyMiddleware(logger, thunk))

export type rootStateType= ReturnType<typeof store.getState>
export type dispatchType= typeof store.dispatch

export const persistor= persistStore(store)