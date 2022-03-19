import { useFetchPostQuery } from "../generated/graphql"
import { useSelector } from "react-redux"
import { rootStateType } from "../redux/store"
import { errors } from "../errors/errors"

export function useFetchPost(postID: string, errorCallback: (error: string) => void) {
    const accessToken= useSelector<rootStateType>(reduxState => reduxState.userReducer.accessToken)

    const { data, loading, error }= useFetchPostQuery({

        variables: { parameters: { _id: postID }},
        context: { headers: { Authorization: `Bearer ${ accessToken }`}}
    })

    if(error)
        errorCallback(errors.serverError)

    else if(data?.fetchPost.error)
        errorCallback(data?.fetchPost.error)

    return { data: data?.fetchPost.post, loading }
}