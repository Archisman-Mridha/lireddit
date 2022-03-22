import { NextPage } from "next"
import { Navbar } from "../components/global/navbar.component"
import { Protected } from "../components/global/protected.component"
import { Button, Center, Stack } from "@chakra-ui/react"
import { PostsWrapper } from "../styles/global.styles"
import { Post } from "../components/posts/post.component"
import { QueryErrorState } from "../components/global/query-error-state.component"
import { useFetchPosts } from "@./frontend"

const Home: NextPage= ( ) => {
    const { queryDetails: { data, loading, error }, hasMorePosts, fetchMorePosts }= useFetchPosts( )

    return (

        <>
            <Protected>
                <Navbar />

                {
                    (
                        function( ) {
                            if(error || (data && data.fetchPosts.error))
                                return <QueryErrorState error= "error occured when fetching posts" />

                            else if(data && data.fetchPosts.posts.length === 0)
                                return <QueryErrorState error= "no posts found" />

                            else return (

                                <PostsWrapper>
                                    <Stack spacing= "15px">
                                        {
                                            data && data.fetchPosts.posts.map(
                                                (post, index) => <Post key= { index } {...post as never} />
                                            )
                                        }
                                    </Stack>

                                    {
                                        hasMorePosts && (

                                            <Center>
                                                <Button
                                                    marginTop= "25px"
                                                    backgroundColor= "tan"
                                                    isLoading= { loading }
                                                    onClick= { fetchMorePosts }
                                                >
                                                    Load More
                                                </Button>
                                            </Center>

                                        )
                                    }
                                </PostsWrapper>

                            )
                        }
                    )( )
                }
            </Protected>
        </>

    )
}

export default Home