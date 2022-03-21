import { useState } from "react"
import { useSelector } from "react-redux"
import { useFetchPostsQuery } from "../generated/graphql"
import { rootStateType } from "../redux/store"

export function useFetchPosts( ) {
    const [ hasMorePosts, setHasMorePosts ]= useState<boolean>(true)

    const accessToken= useSelector<rootStateType>(reduxState => reduxState.userReducer.accessToken)

    const queryDetails= useFetchPostsQuery({

        variables: {
            parameters: {

                offset: 0,
                limit: 5
            }
        },

        context: { headers: { Authorization: `Bearer ${ accessToken }` }},
        notifyOnNetworkStatusChange: true
    })

    if(queryDetails.data && queryDetails.data.fetchPosts.posts!.length === 0)
        setHasMorePosts(false)

    return {

        queryDetails,
        hasMorePosts,
        fetchMorePosts: ( ) => queryDetails.fetchMore({

            variables: {

                parameters: {

                    limit: 5,

                    //@ts-ignore
                    offset: queryDetails.data.fetchPosts.posts.length + 1
                }
            },

            updateQuery: (previousData, { fetchMoreResult }) => {
                if(fetchMoreResult?.fetchPosts.error)
                    return previousData

                else {
                    if(fetchMoreResult!.fetchPosts.posts!.length < 5)
                        setHasMorePosts(false)

                    return {
                        __typename: "Query",
                        fetchPosts: {

                            __typename: "fetchPostsResponse",
                            error: null,
                            posts: [

                                //@ts-ignore
                                ...previousData.fetchPosts.posts,
                                ...fetchMoreResult!.fetchPosts.posts
                            ]
                        }
                    }
                }
            }
        })
    }
}