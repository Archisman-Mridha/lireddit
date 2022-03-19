import { useDispatch } from "react-redux"
import { actions } from "../redux/actions/actions"
import { dispatchType } from "../redux/store"

export function useLogout( ) {
    const dispatch= useDispatch<dispatchType>( )

    return function logoutHandler(successCallback: ( ) => void) {
        dispatch({ type: actions.userReducerActions.logoutUserAction })

        successCallback( )
    }
}