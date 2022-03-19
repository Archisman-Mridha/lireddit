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
            <SafeAreaProvider>
                <NativeBaseProvider theme= { NativeBaseTheme }>
                    <StatusBar backgroundColor= "white" barStyle= "dark-content" />

                    <NavigationContainer>
                        <Suspense fallback= {<Fallback />}>
                            <Routes />
                        </Suspense>
                    </NavigationContainer>
                </NativeBaseProvider>
            </SafeAreaProvider>
        </>

    )
}