import { Flex, Text } from "@chakra-ui/react"
import styled from "styled-components"

export const PostLayout= styled(Flex)`

    padding: 12.5px 10px;
    border-width: 1px;
    border-radius: 7.5px;
`

PostLayout.defaultProps= { shadow: "md" }

export const AuthorLabel= styled(Text)`

    text-align: end;
    color: gray;
    margin-bottom: 5px;
`