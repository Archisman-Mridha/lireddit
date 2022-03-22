import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { FC } from "react"
import { NavbarContentLayout, NavbarLayout } from "../../styles/navbar.styles"
import { useSelector } from "react-redux"
import { rootStateType, useLogout } from "@./frontend"
import { useRouter } from "next/router"

export const Navbar: FC= ( ) => {
    const logoutHandler= useLogout( )

    const { push, route }= useRouter( )

    const successCallback= ( ) => push("/signin")

    const username= useSelector<rootStateType>(reduxState => reduxState.userReducer.username)

    return (

        <>
            <NavbarLayout>
                <NavbarContentLayout>
                    <NextLink href="/">
                        <Heading cursor= "pointer">LiReddit</Heading>
                    </NextLink>
                    <Flex align="center">
                        {
                            route !== "/create-post" && (

                                <NextLink href="/create-post">
                                    <Button backgroundColor= "white" as= { Link } marginX= "5px">
                                        create post
                                    </Button>
                                </NextLink>

                            )
                        }

                        <Box marginX= "5px">{ username }</Box>

                        <Button onClick={( ) => logoutHandler(successCallback)}>
                            Logout
                        </Button>
                    </Flex>
                </NavbarContentLayout>
            </NavbarLayout>
        </>

    )
}