import { useDispatch } from "react-redux"
import { actions } from "../redux/actions/actions"
import { dispatchType } from "../redux/store"
import { useApolloClient } from "@apollo/client"

export function useLogout( ) {
    const dispatch= useDispatch<dispatchType>( )

    const { cache }= useApolloClient( )

    return function logoutHandler(callback: ( ) => void) {
        cache.reset( )

        callback( )

        dispatch({ type: actions.userReducerActions.logoutUserAction })
    }
}