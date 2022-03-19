import { errors } from "../errors/errors"
import { CreatePostParameters, useCreatePostMutation } from "../generated/graphql"
import { useSelector } from "react-redux"
import { rootStateType } from "../redux/store"

export function useCreatePost( ) {
    const [ createPostMutation ]= useCreatePostMutation( )

    const accessToken= useSelector<rootStateType>(reduxState => reduxState.userReducer.accessToken)

    return async function createPostHandler(parameters: CreatePostParameters, successCallback: ( ) => void, errorCallback: (error: string) => void) {
        const { data, errors: serverErrors }= await createPostMutation({

            variables: { parameters },
            context: { headers: { Authorization: `Bearer ${ accessToken }` }}
        })

        if(serverErrors || !data)
            errorCallback(errors.serverError)

        else if(data.createPost.error)
            errorCallback(data.createPost.error)

        else successCallback( )
    }
}