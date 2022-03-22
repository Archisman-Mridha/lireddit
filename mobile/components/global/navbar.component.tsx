import { Button, Flex, Text } from "native-base"
import { FC } from "react"

export const Navbar: FC= ( ) => {
    return (

        <>
            <Flex flex= { 1 } justifyContent= "flex-end">
                <Text>archi</Text>

                <Button>create posts</Button>

                <Button>Login</Button>
            </Flex>
        </>

    )
}