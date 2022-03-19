import { Button, Icon, Image, ScrollView, Text, View } from "native-base"
import { FC } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Formik } from "formik"
import { EvilIcons } from "@expo/vector-icons"
import { registerValidationSchema } from "@./frontend"
import { FormInput } from "../components/form-input.component"
import { ToggleAuthStatusText } from "../styles/signin.styles"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { mainStackNavigatorScreens } from "../types/navigation.types"

const initialValues= {

    username: "",
    email: "",
    password: ""
}

const Register: FC= ( ) => {
    const { navigate }= useNavigation<NavigationProp<mainStackNavigatorScreens, "Register">>( )

    const navigateToSignin= ( ) => navigate("Signin")

    const submitHandler= ( ) => { }

    return (

        <>
            <SafeAreaView>
                <ScrollView>
                    <Image source= {require("../images/welcome.png")} />

                    <Text marginBottom= "25px">
                        Enter your registration details carefully
                    </Text>

                    <Formik
                        initialValues= { initialValues }
                        validationSchema= { registerValidationSchema }
                        onSubmit= { submitHandler }
                    >
                        {
                            ({ setFieldValue, handleSubmit }) => (

                                <>
                                    <FormInput
                                        placeholder= "Username"
                                        name= "username"
                                        setFieldValue= { setFieldValue }
                                    />

                                    <FormInput
                                        placeholder= "Email"
                                        name= "email"
                                        setFieldValue= { setFieldValue }
                                    />

                                    <FormInput
                                        placeholder= "Password"
                                        name= "password"
                                        setFieldValue= { setFieldValue }
                                    />

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

                    <ToggleAuthStatusText onPress= {navigateToSignin}>or signin</ToggleAuthStatusText>

                    <View height= "35px" />
                </ScrollView>
            </SafeAreaView>
        </>

    )
}

export default Register