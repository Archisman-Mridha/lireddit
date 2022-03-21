import { useDispatch } from "react-redux"
import { actions } from "../redux/actions/actions"
import { dispatchType } from "../redux/store"

export function useLogout( ) {
    const dispatch= useDispatch<dispatchType>( )

    return function logoutHandler(callback: ( ) => void) {
        callback( )

        dispatch({ type: actions.userReducerActions.logoutUserAction })
    }
}