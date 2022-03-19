import { actions } from "../actions/actions"

interface stateType {

    _id?: string
    username?: string
    accessToken?: string
}

const initialState: stateType= { }

export function userReducer(state: stateType= initialState, action: any): stateType {
    switch(action.type) {
        case actions.userReducerActions.authenticateUserAction:
            return action.payload

        case actions.userReducerActions.logoutUserAction:
            return { }

        default:
            return state
    }
}