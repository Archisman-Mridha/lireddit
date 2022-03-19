import { signinValidationSchema, useSignin } from "@./frontend"
import { Form, Formik } from "formik"
import { NextPage } from "next"
import { FormTextField } from "../components/form-input.component"
import { ChangeAuthStatusText, CoverImage, FormSubmitButton, ResetPasswordText, Screen, Wrapper } from "../styles/global.styles"
import WelcomeImagePath from "../images/welcome.png"
import { Icon, Text } from "@chakra-ui/react"
import { BsArrowRightCircle } from "react-icons/bs"
import { useErrorCallback } from "../hooks/useErrorCallback.hook"
import { useRouter } from "next/router"

const initialValues= {

    identifier: "",
    password: ""
}

const Signin: NextPage= ( ) => {
    const signinHandler= useSignin( )

    const { push }= useRouter( )

    const errorCallback= useErrorCallback( )

    const successCallback= ( ) => push("/")

    const submitHandler= (formData: typeof initialValues) => signinHandler(formData, successCallback, errorCallback)

    return (

        <>
            <Screen>
                <Wrapper>
                    <CoverImage
                        src= {WelcomeImagePath.src}
                    />

                    <Text fontSize= "14px" marginBottom= "22.5px" maxWidth= "450px">
                        Enter your registered username or email as account identifier and the account password
                    </Text>

                    <Formik
                        initialValues= { initialValues }
                        validationSchema= { signinValidationSchema }
                        onSubmit= { submitHandler }
                    >
                        {
                            ({ setFieldValue, handleSubmit, isSubmitting }) => (

                                <>
                                    <Form>
                                        <FormTextField
                                            placeholder= "Identifier"
                                            inputType= "text"
                                            name= "identifier"
                                            setFieldValue= { setFieldValue }
                                        />

                                        <FormTextField
                                            placeholder= "Secure Password"
                                            inputType= "password"
                                            name= "password"
                                            setFieldValue= { setFieldValue }
                                        />

                                        <ResetPasswordText href= "/request-password-reset">request reset password</ResetPasswordText>

                                        <FormSubmitButton
                                            rightIcon= {<Icon as= { BsArrowRightCircle } />}
                                            onClick= {( ) => handleSubmit( )}
                                            isLoading= { isSubmitting }
                                            marginTop= "7.5px"
                                        >
                                            Signin
                                        </FormSubmitButton>
                                    </Form>
                                </>

                            )
                        }
                    </Formik>

                    <ChangeAuthStatusText href= "/register">or register</ChangeAuthStatusText>
                </Wrapper>
            </Screen>
        </>

    )
}

export default Signin