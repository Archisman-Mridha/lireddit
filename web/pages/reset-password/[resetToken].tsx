import { NextPage } from "next"
import { Icon, Text, useToast } from "@chakra-ui/react"
import { CoverImage, FormSubmitButton, Screen, Wrapper } from "../../styles/global.styles"
import WelcomeImagePath from "../../images/welcome.png"
import { Form, Formik } from "formik"
import { BsArrowRightCircle } from "react-icons/bs"
import { resetPasswordValidationSchema, useResetPassword } from "@./frontend"
import { useRouter } from "next/router"
import { useErrorCallback } from "../../hooks/useErrorCallback.hook"
import { FormTextField } from "web/components/global/form-input.component"

const initialValues= { newPassword: "" }

const ResetPassword: NextPage= ( ) => {
    const resetPassword= useResetPassword( )

    const toast= useToast( )

    const { push, query }= useRouter( )

    const errorCallback= useErrorCallback( )

    const successCallback= ( ) => {
        toast({

            description: "password reset successfull",
            status: "success",
            isClosable: true,
            position: "bottom-right"
        })

        push("/signin")
    }

    const submitHandler= (formData: typeof initialValues) => resetPassword(
        { ...formData, resetToken: query["resetToken"] as string}, successCallback, errorCallback
    )

    return (

        <>
            <Screen>
                <Wrapper>
                    <CoverImage
                        src= {WelcomeImagePath.src}
                    />

                    <Text marginBottom= "20px">Enter a secure new password</Text>

                    <Formik
                        initialValues= {initialValues}
                        validationSchema= {resetPasswordValidationSchema}
                        onSubmit= {submitHandler}
                    >
                        {
                            ({ handleSubmit, isSubmitting, setFieldValue }) => (

                                <>
                                    <Form>
                                        <FormTextField
                                            placeholder= "Secure Password"
                                            inputType= "password"
                                            name= "newPassword"
                                            setFieldValue= {setFieldValue}
                                        />

                                        <FormSubmitButton
                                            rightIcon= {<Icon as= { BsArrowRightCircle } />}
                                            onClick= {( ) => handleSubmit( )}
                                            isLoading= { isSubmitting }
                                            marginTop= "7.5px"
                                        >
                                            Reset Password
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

export default ResetPassword