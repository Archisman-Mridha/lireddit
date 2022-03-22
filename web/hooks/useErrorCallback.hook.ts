import { useToast } from "@chakra-ui/react"

export function useErrorCallback( ) {
    const toast= useToast( )

    return function errorCallback(error: string) {
        toast({

            description: error,
            status: "error",
            isClosable: true,
            position: "bottom-right"
        })
    }
}