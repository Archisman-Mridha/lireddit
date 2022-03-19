import { NextPage } from "next"
import { CoverImage, FormSubmitButton, Screen, Wrapper } from "../styles/global.styles"
import PostImagePath from "../images/post.png"
import { Icon, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { FormTextField } from "../components/form-input.component"
import { BsArrowRightCircle } from "react-icons/bs"
import { createPostValidationSchema, useCreatePost } from "@./frontend"
import { Protected } from "../components/protected.component"
import { useRouter } from "next/router"
import { useErrorCallback } from "../hooks/useErrorCallback.hook"

const initialValues= {

    title: "",
    description: ""
}

const CreatePost: NextPage= ( ) => {
    const createPostHandler= useCreatePost( )

    const { push }= useRouter( )

    const successCallback= ( ) => push("/")

    const errorCallback= useErrorCallback( )

    const submitHandler= (formData: typeof initialValues) => createPostHandler(formData, successCallback, errorCallback)

    return (

        <>
            <Protected>
                <Screen>
                    <Wrapper>
                        <CoverImage
                            src= {PostImagePath.src}
                        />

                        <Text fontSize= "14px" marginBottom= "22.5px" maxWidth= "450px">
                            Enter details about your amazing new post !
                        </Text>

                        <Formik
                            initialValues= { initialValues }
                            validationSchema= { createPostValidationSchema }
                            onSubmit= { submitHandler }
                        >
                            {
                                ({ setFieldValue, handleSubmit, isSubmitting }) => (

                                    <>
                                        <Form>
                                            <FormTextField
                                                placeholder= "Title"
                                                inputType= "text"
                                                name= "title"
                                                setFieldValue= { setFieldValue }
                                            />

                                            <FormTextField
                                                placeholder= "Description"
                                                inputType= "text"
                                                name= "description"
                                                setFieldValue= { setFieldValue }
                                                isTextArea
                                            />

                                            <FormSubmitButton
                                                rightIcon= {<Icon as= { BsArrowRightCircle } />}
                                                onClick= {( ) => handleSubmit( )}
                                                isLoading= { isSubmitting }
                                                marginTop= "7.5px"
                                            >
                                                Create Post
                                            </FormSubmitButton>
                                        </Form>
                                    </>

                                )
                            }
                        </Formik>
                    </Wrapper>
                </Screen>
            </Protected>
        </>

    )
}

export default CreatePost