import { useFetchPost } from "@./frontend"
import { Loader } from "../../components/loader.component"
import { Navbar } from "apps/web/components/navbar.component"
import { Protected } from "apps/web/components/protected.component"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useErrorCallback } from "../../hooks/useErrorCallback.hook"
import { Box, Center, Heading, Text } from "@chakra-ui/react"
import { CoverImage, PostsWrapper } from "../../styles/global.styles"
import PostImagePath from "../../images/post.png"

const Post: NextPage= ( ) => {
    const { query }= useRouter( )

    const errorCallback= useErrorCallback( )

    const { data, loading }= useFetchPost(query["postID"] as string, errorCallback)

    if(loading)
        return <Loader />

    else if(!data)
        return (

            <>
                <Center width= "100vw" height= "100vh" flexDirection= "column">
                    <CoverImage
                        src= {PostImagePath.src}
                    />

                    <Text>Post not found !</Text>
                </Center>
            </>

        )

    else return (

        <Protected>
            <Navbar />

            <PostsWrapper>
                <Heading fontSize= "20px" marginBottom= "5px">{ data.title }</Heading>

                <Text
                    marginBottom= "5px"
                    textAlign= "end"
                    color= "gray"
                >
                    posted by { data.creator.username }
                </Text>

                <Box>{ data.description }</Box>
            </PostsWrapper>
        </Protected>

    )
}

export default Post