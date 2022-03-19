import { useRegisterMutation, RegisterParameters } from "../generated/graphql"
import { errors } from "../errors/errors"
import { useDispatch } from "react-redux"
import { dispatchType } from "../redux/store"
import { actions } from "../redux/actions/actions"

export function useRegister( ) {
    const [ registerMutation ]= useRegisterMutation( )

    const dispatch= useDispatch<dispatchType>( )

    return async function registrationHandler(parameters: RegisterParameters, successCallback: ( ) => void, errorCallback: (error: string) => void) {
        try {
            const { data, errors: serverErrors }= await registerMutation({

                variables: { parameters }
            })

            if(serverErrors || !data)
                errorCallback(errors.serverError)

            else if(data.register.error)
                errorCallback(data.register.error)

            else {
                dispatch({

                    type: actions.userReducerActions.authenticateUserAction,
                    payload: {

                        accessToken: data.register.accessToken,
                        ...data.register.userDetails
                    }
                })

                successCallback( )
            }
        } catch(error) { errorCallback(errors.serverError) }
    }
}