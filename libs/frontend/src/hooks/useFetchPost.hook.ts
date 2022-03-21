import { useFetchPostQuery } from "../generated/graphql"
import { useSelector } from "react-redux"
import { rootStateType } from "../redux/store"

export function useFetchPost(postID: string) {
    const accessToken= useSelector<rootStateType>(reduxState => reduxState.userReducer.accessToken)

    const queryDetails= useFetchPostQuery({

        variables: { parameters: { _id: postID }},
        context: { headers: { Authorization: `Bearer ${ accessToken }`}}
    })

    return queryDetails
}