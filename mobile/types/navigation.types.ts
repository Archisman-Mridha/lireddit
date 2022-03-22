import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

export interface mainStackNavigatorProps<T extends keyof mainStackNavigatorScreens> {

    navigation: StackNavigationProp<mainStackNavigatorScreens, T>
    route: RouteProp<mainStackNavigatorScreens, T>
}

export type mainStackNavigatorScreens = {

    "Signin": undefined,
    "Register": undefined,
    "Posts": undefined
}