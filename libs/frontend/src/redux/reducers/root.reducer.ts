import { combineReducers } from "redux"
import { userReducer } from "./user.reducer"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const persistConfig= {

    key: "root",
    storage,
    whitelist: ["userReducer"]
}

export const persistedRootReducer= persistReducer(

    persistConfig, combineReducers({

        userReducer
    })
)