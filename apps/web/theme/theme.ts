import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"
import { sharedTheme } from "@./frontend"

export const chakraTheme= extendTheme(
    withDefaultColorScheme({ colorScheme: sharedTheme.colors.blue })
)