import styled from "styled-components/native"
import { Text } from "native-base"
import { sharedTheme } from "@./frontend"

export const SmallText= styled(Text)`

    font-size: 13px;
    color: ${ sharedTheme.colors.blue };
    align-self: flex-end;
    margin-bottom: 5px;
    margin-top: -5px;
`

export const ToggleAuthStatusText= styled(Text)`

    margin-top: 25px;
    align-self: center;
    color: ${ sharedTheme.colors.blue };
`