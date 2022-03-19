import { errors } from "../errors/errors"
import { useSigninLazyQuery, SigninParameters } from "../generated/graphql"
import { useDispatch } from "react-redux"
import { dispatchType } from "../redux/store"
import { actions } from "../redux/actions/actions"

export function useSignin( ) {
    const [ signinQuery ]= useSigninLazyQuery( )

    const dispatch= useDispatch<dispatchType>( )

    return async function signinHandler(parameters: SigninParameters, successCallback: ( ) => void, errorCallback: (error: string) => void) {
        try {
            const { data, error: serverError }= await signinQuery({

                variables: { parameters }
            })

            if(serverError || !data)
                errorCallback(errors.serverError)

            else if(data.signin.error)
                errorCallback(data.signin.error)

            else {
                dispatch({

                    type: actions.userReducerActions.authenticateUserAction,
                    payload: {

                        accessToken: data.signin.accessToken,
                        ...data.signin.userDetails
                    }
                })

                successCallback( )
            }
        } catch(error) { errorCallback(errors.serverError) }
    }
}