import { errors } from "../errors/errors"
import { RequestResetPasswordParameters, useRequestResetPasswordLazyQuery } from "../generated/graphql"

export function useRequestResetPassword( ) {
    const [requestResetPasswordQuery]= useRequestResetPasswordLazyQuery( )

    return async function requestResetPassword(parameters: RequestResetPasswordParameters, successCallback: ( ) => void, errorCallback: (error: string) => void) {
        const { data, error }= await requestResetPasswordQuery({ variables: { parameters }})

        if(error || !data)
            errorCallback(errors.serverError)

        else if(data.requestResetPassword.error)
            errorCallback(data.requestResetPassword.error)

        else successCallback( )
    }
}