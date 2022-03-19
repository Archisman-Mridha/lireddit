import { Icon } from "@chakra-ui/react"
import { MdAlternateEmail, MdOutlineDescription } from "react-icons/md"
import { AiOutlineUser } from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri"
import { FaHeading } from "react-icons/fa"

export function getInputIcon(inputName: string) {
    switch(inputName) {

        case "Username":
        case "Identifier":
            return <Icon as= {AiOutlineUser} />

        case "Email":
        case "Registered Email":
            return <Icon as= {MdAlternateEmail} />

        case "Password":
        case "Secure Password":
            return <Icon as= {RiLockPasswordLine} />

        case "Title":
            return <Icon as= { FaHeading } />

        case "Description":
            return <Icon as= { MdOutlineDescription } />

        default:
            return null
    }
}