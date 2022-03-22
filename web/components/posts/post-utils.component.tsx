import { Box, IconButton, Link } from "@chakra-ui/react"
import { FC } from "react"
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit2 } from "react-icons/fi"
import NextLink from "next/link"
import { useDeletePost } from "@./frontend"
import { useRouter } from "next/router"
import { useErrorCallback } from "web/hooks/useErrorCallback.hook"

interface postUtilsProps {

    _id: string
}

export const PostUtils: FC<postUtilsProps>= ({ _id }) => {
    const deletePostHandler= useDeletePost( )

    const { replace, route }= useRouter( )

    const errorCallback= useErrorCallback( )

    const deletePostSuccessCallback= ( ) => route !== "/" && replace("/")

    const deletePost= ( ) => deletePostHandler({ _id }, deletePostSuccessCallback, errorCallback)

    return (

        <>
            <Box marginLeft="auto">
                <Box>
                    <NextLink href="/post/edit/[id]" as={`/post/edit/${ _id }`}>
                        <IconButton
                            as= { Link }
                            mr= { 4 }
                            icon= { <FiEdit2 size= "20px" /> }
                            aria-label= "Edit Post"
                        />
                    </NextLink>

                    <IconButton
                        icon= { <AiOutlineDelete size= "20px" color= "black" /> }
                        aria-label="Delete Post"
                        onClick={ deletePost }
                    />
                </Box>
            </Box>
        </>

    )
}