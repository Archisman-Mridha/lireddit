import { useFetchPost } from "@./frontend"
import { Loader } from "../../components/global/loader.component"
import { Navbar } from "web/components/global/navbar.component"
import { Protected } from "web/components/global/protected.component"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { PostsWrapper } from "../../styles/global.styles"
import { Post } from "../../components/posts/post.component"
import { QueryErrorState } from "web/components/global/query-error-state.component"

const PostDetails: NextPage= ( ) => {
    const { query }= useRouter( )

    const { data, loading, error }= useFetchPost(query["postID"] as string)

    return (

        <Protected>
            <Navbar />

            {
                (
                    function( ) {
                        if(loading)
                            return <Loader />

                        else if(error || data.fetchPost.error)
                            return <QueryErrorState error= "error occured while fetching the post" />

                        else if(!data)
                            return <QueryErrorState error= "post not found !" />

                        else return (

                            <PostsWrapper>
                                <Post {...data.fetchPost.post as never} />
                            </PostsWrapper>

                        )
                    }
                )( )
            }
        </Protected>

    )
}

export default PostDetails