import { Center, Text } from "@chakra-ui/react"
import { FC } from "react"
import { CoverImage } from "../../styles/global.styles"
import PostImagePath from "../../images/post.png"

interface queryErrorStateProps {

    error: string
}

export const QueryErrorState: FC<queryErrorStateProps>= ({ error }) => {
    return (

        <>
            <Center width= "100vw" flexDirection= "column" marginTop= "50px">
                <CoverImage src= {PostImagePath.src} />

                <Text>{ error }</Text>
            </Center>
        </>

    )
}