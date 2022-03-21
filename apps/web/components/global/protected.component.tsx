import { rootStateType } from "@./frontend"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FC } from "react"
import { useSelector } from "react-redux"

export const Protected: FC= ({ children }) => {
    const _id= useSelector<rootStateType>(reduxState => reduxState.userReducer._id)

    const { replace }= useRouter( )

    const toast= useToast( )

    if(! _id) {
        replace("/signin")

        toast({

            description: "please signin or register",
            status: "warning",
            isClosable: true,
            position: "bottom-right"
        })

        return null
    }

    else return (

        <>
            { children }
        </>

    )
}