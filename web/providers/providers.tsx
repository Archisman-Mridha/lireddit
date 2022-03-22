import { FC } from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { chakraTheme } from "../theme/theme"
import { ApolloProvider } from "@apollo/client"
import { apolloClient, persistor } from "@./frontend"
import { Provider } from "react-redux"
import { store } from "@./frontend"
import { PersistGate } from "redux-persist/integration/react"

export const Providers: FC= ({ children }) => {
    return (

        <>
            <Provider store= { store }>
                <PersistGate loading= { null } persistor= { persistor }>
                    <ApolloProvider client= { apolloClient }>
                        <ChakraProvider theme= { chakraTheme }>
                            { children }
                        </ChakraProvider>
                    </ApolloProvider>
                </PersistGate>
            </Provider>
        </>

    )
}