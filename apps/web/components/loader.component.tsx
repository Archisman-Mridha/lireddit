import { Center, Spinner } from "@chakra-ui/react"
import { FC } from "react"

export const Loader: FC= ( ) => {
    return (

        <>
            <Center height= "100vh" width= "100vw">
                <Spinner size= "lg" />
            </Center>
        </>

    )
}