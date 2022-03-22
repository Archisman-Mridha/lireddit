import { Flex, IconButton } from "@chakra-ui/react"
import { FC, useState } from "react"
import { BiDownArrow, BiUpArrow } from "react-icons/bi"
import { useVote } from "@./frontend"
import { useErrorCallback } from "../../hooks/useErrorCallback.hook"

interface voteProps {

    points: number
    voteStatus: number
    _id: string
}

enum loadingStates {

    updootLoading,
    downdootLoading,
    notLoading
}

export const Vote: FC<voteProps>= ({ points, _id, voteStatus }) => {
    const voteHandler= useVote( )

    const errorCallback= useErrorCallback( )

    const [loadingState, setLoadingState]= useState<loadingStates>( loadingStates.notLoading )

    const upvoteHandler= async ( ) => {
        if(voteStatus !== 1) {
            setLoadingState(loadingStates.updootLoading)

            await voteHandler({ postID: _id, value: 1 }, errorCallback)

            setLoadingState(loadingStates.notLoading)
        }
    }

    const downvoteHandler= async ( ) => {
        if(voteStatus !== -1) {
            setLoadingState(loadingStates.downdootLoading)

            await voteHandler({ postID: _id, value: -1 }, errorCallback)

            setLoadingState(loadingStates.notLoading)
        }
    }

    return (

        <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
            <IconButton
                onClick={ upvoteHandler }
                aria-label="updoot post"
                icon= { <BiUpArrow size= "27.5px" color= { voteStatus > 0 ? "white": "black" } /> }
                backgroundColor= { voteStatus > 0 && "green" }
                isLoading= { loadingState === loadingStates.updootLoading }
            />

            { points }

            <IconButton
                onClick={ downvoteHandler }
                aria-label="downdoot post"
                icon= { <BiDownArrow size= "27.5px" color= { voteStatus < 0 ? "white": "black" } /> }
                backgroundColor= { voteStatus < 0 && "red" }
                isLoading= { loadingState === loadingStates.downdootLoading }
            />
        </Flex>

    )
}