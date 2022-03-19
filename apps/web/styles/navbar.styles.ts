import { sharedTheme } from "@./frontend"
import { Flex } from "@chakra-ui/react"
import styled from "styled-components"

export const NavbarLayout= styled(Flex)`

    z-index: 100;
    position: sticky;
    top: 0px;
    background-color: ${ sharedTheme.colors.blue };
`

export const NavbarContentLayout= styled(Flex)`

    flex: 1;
    margin: auto;
    align-items: center;
    max-width: 750px;
    justify-content: space-between;
    padding: 10px;
`