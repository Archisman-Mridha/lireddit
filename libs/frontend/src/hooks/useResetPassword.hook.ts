import { errors } from "../errors/errors"
import { ResetPasswordParameters, useResetPasswordMutation } from "../generated/graphql"

export function useResetPassword( ) {
    const [resetPasswordMutation]= useResetPasswordMutation( )

    return async function resetPassword(parameters: ResetPasswordParameters, successCallback: ( ) => void, errorCallback: (error: string) => void) {
        const { data, errors: serverErrors }= await resetPasswordMutation({ variables: { parameters }})

        if(serverErrors || !data)
            errorCallback(errors.serverError)

        else if(data.resetPassword.error)
            errorCallback(data.resetPassword.error)

        else successCallback( )
    }
}