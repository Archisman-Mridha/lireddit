import { FC, lazy } from "react"
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"
import { mainStackNavigatorScreens } from "../types/navigation.types"
import { Icon } from "native-base"
import { Ionicons } from "@expo/vector-icons"

const Signin= lazy(( ) => import("../screens/signin"))
const Register= lazy(( ) => import("../screens/register"))

const MainNavigationStack= createStackNavigator<mainStackNavigatorScreens>( )

const defaultStackScreenOptions: StackNavigationOptions= { }

const stackScreenOptions: StackNavigationOptions= {

    headerTitleStyle: {

        fontFamily: "montserrat-extrabold",
        marginLeft: -10
    },

    headerStyle: {

        borderBottomColor: "rgba(0, 0, 0, 0.2)",
        borderBottomWidth: 1
    },

    cardStyle: {

        backgroundColor: "white"
    },

    headerBackTitleVisible: false,
    headerBackImage: ( ) => <Icon as= { Ionicons } name="arrow-back-circle-outline" size= "24px" />
}

export const Routes: FC= ( ) => {
    return (

        <>
            <MainNavigationStack.Navigator screenOptions= {stackScreenOptions} defaultScreenOptions= {defaultStackScreenOptions} initialRouteName= "Signin">
                <MainNavigationStack.Screen name= "Signin" component= { Signin } />

                <MainNavigationStack.Screen name= "Register" component= { Register } />
            </MainNavigationStack.Navigator>
        </>

    )
}