import Toast from "react-native-toast-message"

export function useErrorCallback( ) {

    return (error: string) => Toast.show({ text2: error })
}