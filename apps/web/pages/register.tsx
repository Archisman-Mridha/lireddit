import { registerValidationSchema } from "@./frontend"
import { Form, Formik } from "formik"
import { NextPage } from "next"
import { FormTextField } from "../components/form-input.component"
import { ChangeAuthStatusText, CoverImage, FormSubmitButton, Screen, Wrapper } from "../styles/global.styles"
import WelcomeImagePath from "../images/welcome.png"
import { Icon, Text } from "@chakra-ui/react"
import { BsArrowRightCircle } from "react-icons/bs"
import { useRegister } from "@./frontend"
import { useErrorCallback } from "../hooks/useErrorCallback.hook"
import { useRouter } from "next/router"

const initialValues= {

    username: "",
    email: "",
    password: ""
}

const Register: NextPage= ( ) => {
    const registerHandler= useRegister( )

    const { push }= useRouter( )

    const errorCallback= useErrorCallback( )

    const successCallback= ( ) => push("/")

    const submitHandler= (formData: typeof initialValues) => registerHandler(formData, successCallback, errorCallback)

    return (

        <>
            <Screen>
                <Wrapper>
                    <CoverImage
                        src= {WelcomeImagePath.src}
                    />

                    <Text fontSize= "14px" marginBottom= "22.5px">
                        Enter your registration details carefully
                    </Text>

                    <Formik
                        initialValues= { initialValues }
                        validationSchema= { registerValidationSchema }
                        onSubmit= { submitHandler }
                    >
                        {
                            ({ setFieldValue, handleSubmit, isSubmitting }) => (

                                <>
                                    <Form>
                                        <FormTextField
                                            placeholder= "Username"
                                            inputType= "text"
                                            name= "username"
                                            setFieldValue= { setFieldValue }
                                        />

                                        <FormTextField
                                            placeholder= "Email"
                                            inputType= "email"
                                            name= "email"
                                            setFieldValue= { setFieldValue }
                                        />

                                        <FormTextField
                                            placeholder= "Secure Password"
                                            inputType= "password"
                                            name= "password"
                                            setFieldValue= { setFieldValue }
                                        />

                                        <FormSubmitButton
                                            rightIcon= {<Icon as= { BsArrowRightCircle } />}
                                            onClick= {( ) => handleSubmit( )}
                                            isLoading= { isSubmitting }
                                            marginTop= "7.5px"
                                        >
                                            Register
                                        </FormSubmitButton>
                                    </Form>
                                </>

                            )
                        }
                    </Formik>

                    <ChangeAuthStatusText href= "/signin">or signin</ChangeAuthStatusText>
                </Wrapper>
            </Screen>
        </>

    )
}

export default Register