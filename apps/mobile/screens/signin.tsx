import { Button, Icon, Image, ScrollView, Text, View } from "native-base"
import { FC } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Formik } from "formik"
import { EvilIcons } from "@expo/vector-icons"
import { signinValidationSchema } from "@./frontend"
import { FormInput } from "../components/form-input.component"
import { SmallText, ToggleAuthStatusText } from "../styles/signin.styles"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { mainStackNavigatorScreens } from "../types/navigation.types"

const initialValues= {

    identifier: "",
    password: ""
}

const Signin: FC= ( ) => {
    const { navigate }= useNavigation<NavigationProp<mainStackNavigatorScreens, "Signin">>( )

    const navigateToRegistration= ( ) => navigate("Register")

    const submitHandler= ( ) => { }

    return (

        <>
            <SafeAreaView>
                <ScrollView>
                    <Image source= {require("../images/welcome.png")} />

                    <Text marginBottom= "25px">
                        Enter your registered username or email as account identifier and the account password
                    </Text>

                    <Formik
                        initialValues= { initialValues }
                        validationSchema= { signinValidationSchema }
                        onSubmit= { submitHandler }
                    >
                        {
                            ({ setFieldValue, handleSubmit }) => (

                                <>
                                    <FormInput
                                        placeholder= "Identifier"
                                        name= "identifier"
                                        setFieldValue= { setFieldValue }
                                    />

                                    <FormInput
                                        placeholder= "Password"
                                        name= "password"
                                        setFieldValue= { setFieldValue }
                                    />

                                    <SmallText>request reset password</SmallText>

                                    <Button
                                        endIcon= {<Icon as= { EvilIcons } name="arrow-right" size= "22px" />}
                                        onPress= {( ) => handleSubmit( )}
                                    >
                                        Submit
                                    </Button>
                                </>

                            )
                        }
                    </Formik>

                    <ToggleAuthStatusText onPress= {navigateToRegistration}>or register</ToggleAuthStatusText>

                    <View height= "35px" />
                </ScrollView>
            </SafeAreaView>
        </>

    )
}

export default Signin