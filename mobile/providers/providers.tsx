import { FC, Suspense, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar, NativeBaseProvider } from "native-base"
import { Routes } from "../routes/routes"
import { useLoadFonts } from "../hooks/useLoadFonts"
import AppLoading from "expo-app-loading"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Fallback } from "../components/skeletons/fallback"
import { NativeBaseTheme } from "../theme/theme"
import { LogBox } from "react-native"
import { Provider } from "react-redux"
import { apolloClient, store } from "@./frontend"
import { ApolloProvider } from "@apollo/client"
import Toast from "react-native-toast-message"

export const Providers: FC= ( ) => {
    const isFontsLoaded= useLoadFonts( )

    useEffect(
        ( ) => LogBox.ignoreLogs([

            "Please pass alt prop"
        ]),
        [ ]
    )

    if (!isFontsLoaded)
        return <AppLoading />

    else return (

        <>
            <ApolloProvider client= { apolloClient }>
                <Provider store= { store }>
                    <SafeAreaProvider>
                        <NativeBaseProvider theme= { NativeBaseTheme }>
                            <StatusBar backgroundColor= "white" barStyle= "dark-content" />

                            <NavigationContainer>
                                <Suspense fallback= {<Fallback />}>
                                    <Routes />
                                </Suspense>
                            </NavigationContainer>

                            <Toast
                                position= "bottom"
                                visibilityTime= {5000}
                                bottomOffset= {50}
                                type= "error"
                            />
                        </NativeBaseProvider>
                    </SafeAreaProvider>
                </Provider>
            </ApolloProvider>
        </>

    )
}