import { errors } from "../errors/errors"
import { UpdatePostParameters, useUpdatePostMutation } from "../generated/graphql"
import { useSelector } from "react-redux"
import { rootStateType } from "../redux/store"

export function useUpdatePost( ) {
    const [ updatePostMutation ]= useUpdatePostMutation( )

    const accessToken= useSelector<rootStateType>(reduxState => reduxState.userReducer.accessToken)

    return async function UpdatePostHandler(parameters: UpdatePostParameters, successCallback: ( ) => void, errorCallback: (error: string) => void) {
        const { data, errors: serverErrors }= await updatePostMutation({

            variables: { parameters },
            context: { headers: { Authorization: `Bearer ${ accessToken }` }}
        })

        console.info(serverErrors, data!.updatePost.error)

        if(serverErrors || !data)
            errorCallback(errors.serverError)

        else if(data.updatePost.error)
            errorCallback(data.updatePost.error)

        else successCallback( )
    }
}