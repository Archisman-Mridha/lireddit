import { sharedTheme } from "@./frontend"
import { StyleSheet } from "react-native"
import { BaseToast, BaseToastProps, ErrorToast } from "react-native-toast-message"

export const toastConfig= {
    success: (props: BaseToastProps) => (

        <>
            <BaseToast
                {...props}
                text2Style= {{ fontFamily: "montserratMedium" }}
            />
        </>

    ),

    error: (props: BaseToastProps) => (

        <>
            <ErrorToast {...props} text2Style= {styles.errorToastStyles} />
        </>

    )
}

export const styles= StyleSheet.create({
    errorToastStyles: {

        fontFamily: "montserrat-medium",
        fontSize: 13,
        color: sharedTheme.colors.red
    }
})