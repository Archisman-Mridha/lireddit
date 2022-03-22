import { gql } from "@apollo/client"
import { useSelector } from "react-redux"
import { errors } from "../errors/errors"
import { useVoteMutation, VoteParameters } from "../generated/graphql"
import { rootStateType } from "../redux/store"

interface postFragment {

    _id: string
    points: number
    voteStatus: number | null
}

export function useVote( ) {
    const [ voteMutation ]= useVoteMutation( )

    const accessToken= useSelector<rootStateType>(reduxState => reduxState.userReducer.accessToken)

    return async function voteHandler(parameters: VoteParameters, errorCallback: (error: string) => void) {
        const { data, errors: serverErrors }= await voteMutation({

            variables: { parameters },
            context: { headers: { Authorization: `Bearer ${ accessToken }` }},

            update: cache => {
                const cacheID= cache.identify({ __typename: "postEntity", _id: parameters.postID })

                const data = cache.readFragment<postFragment>({

                    id: cacheID,
                    fragment: gql`

                        fragment readFragment on postEntity {

                            _id
                            points
                            voteStatus
                        }
                    `,
                })

                if(data) {
                    const updatedPoints= data.points + (

                        !data.voteStatus
                            ? parameters.value
                            : ( data.voteStatus === 1 ? -2: 2 )
                    )

                    cache.writeFragment({

                        id: cacheID,
                        data: { points: updatedPoints, voteStatus: parameters.value },
                        fragment: gql`

                            fragment writeFragment on postEntity {

                                points
                                voteStatus
                            }
                        `
                    })
                }
            }
        })

        if(serverErrors || !data)
            errorCallback(errors.serverError)

        else if(data.vote.error)
            errorCallback(data.vote.error)
    }
}