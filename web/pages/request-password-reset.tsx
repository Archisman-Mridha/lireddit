import { NextPage } from "next"
import { Text, Icon, useToast } from "@chakra-ui/react"
import WelcomeImagePath from "../images/welcome.png"
import { BsArrowRightCircle } from "react-icons/bs"
import { Form, Formik } from "formik"
import { requestResetPasswordValidationSchema, useRequestResetPassword } from "@./frontend"
import { FormTextField } from "../components/global/form-input.component"
import { useErrorCallback } from "../hooks/useErrorCallback.hook"
import { CoverImage, FormSubmitButton, Screen, Wrapper } from "../styles/global.styles"

const initialValues= { email: "" }

const RequestPasswordReset: NextPage= ( ) => {
    const requestResetPassword= useRequestResetPassword( )

    const toast= useToast( )

    const errorCallback= useErrorCallback( )

    const successCallback= ( ) => toast({

        description: "reset password link sent successfully",
        status: "success",
        isClosable: true,
        position: "bottom-right"
    })

    const submitHandler= (formData: typeof initialValues) => requestResetPassword(formData, successCallback, errorCallback)

    return (

        <>
            <Screen>
                <Wrapper>
                    <CoverImage
                        src= {WelcomeImagePath.src}
                    />

                    <Text fontSize= "14px" marginBottom= "22.5px" maxWidth= "450px">
                        Enter your registered email and you will get a reset password link
                    </Text>

                    <Formik
                        initialValues= { initialValues }
                        validationSchema= { requestResetPasswordValidationSchema }
                        onSubmit= { submitHandler }
                    >
                        {
                            ({ handleSubmit, isSubmitting, setFieldValue }) => (

                                <>
                                    <Form>
                                        <FormTextField
                                            placeholder= "Registered Email"
                                            inputType= "email"
                                            name= "email"
                                            setFieldValue= {setFieldValue}
                                        />

                                            <FormSubmitButton
                                                rightIcon= {<Icon as= { BsArrowRightCircle } />}
                                                onClick= {( ) => handleSubmit( )}
                                                isLoading= { isSubmitting }
                                                marginTop= "7.5px"
                                            >
                                                Get Reset Link
                                            </FormSubmitButton>
                                    </Form>
                                </>

                            )
                        }
                    </Formik>
                </Wrapper>
            </Screen>
        </>

    )
}

export default RequestPasswordReset