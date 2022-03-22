import { Icon } from "native-base"
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons"

export function getInputIcon(inputLabel: string) {
    switch(inputLabel) {
        case "Identifier":
        case "Username":
            return <Icon as= { AntDesign } name= "user" marginLeft= "10px" />

        case "Email":
            return <Icon as= { MaterialIcons } name="alternate-email" marginLeft= "10px" />

        case "Password":
            return <Icon as= { Feather } name= "key" marginLeft= "10px" />

        default:
            return undefined
    }
}