import { errors } from "../errors/errors"
import { DeletePostParameters, useDeletePostMutation } from "../generated/graphql"
import { useSelector } from "react-redux"
import { rootStateType } from "../redux/store"

export function useDeletePost( ) {
    const [ deletePostMutation ]= useDeletePostMutation( )

    const accessToken= useSelector<rootStateType>(reduxState => reduxState.userReducer.accessToken)

    return async function DeletePostHandler(parameters: DeletePostParameters, successCallback: ( ) => void, errorCallback: (error: string) => void) {
        const { data, errors: serverErrors }= await deletePostMutation({

            variables: { parameters },
            context: { headers: { Authorization: `Bearer ${ accessToken }` }},
            update: cache => cache.evict({ fieldName: "fetchPosts:{}" })
        })

        if(serverErrors || !data)
            errorCallback(errors.serverError)

        else if(data.deletePost.error)
            errorCallback(data.deletePost.error)

        else successCallback( )
    }
}