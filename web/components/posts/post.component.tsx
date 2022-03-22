import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react"
import { FC } from "react"
import NextLink from "next/link"
import { AuthorLabel, PostLayout } from "../../styles/post.styles"
import { Vote } from "./vote.component"
import { PostUtils } from "./post-utils.component"
import { Maybe, PostEntity } from "@./frontend"
import { useSelector } from "react-redux"
import { rootStateType } from "@./frontend"

interface postProps extends Maybe<PostEntity> { }

export const Post: FC<postProps>= ({ _id, creator, title, description, points, voteStatus }) => {
    const username= useSelector<rootStateType>(reduxState => reduxState.userReducer.username)

    return (

        <>
            <PostLayout>
                <Vote points= { points } _id= { _id } voteStatus= { voteStatus } />

                <Box flex={ 1 }>
                    <NextLink href="/post/[id]" as={`/post/${ _id }`}>
                        <Link>
                            <Heading fontSize="xl">{ title }</Heading>
                        </Link>
                    </NextLink>

                    <AuthorLabel>posted by { creator.username }</AuthorLabel>

                    <Flex alignItems= "center">
                        <Text flex={ 1 }>{ description }</Text>

                        { creator.username === username && <PostUtils _id= { _id } /> }
                    </Flex>
                </Box>
            </PostLayout>
        </>

    )
}