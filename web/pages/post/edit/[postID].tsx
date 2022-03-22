import { NextPage } from "next"
import { CoverImage, FormSubmitButton, PostsWrapper } from "../../../styles/global.styles"
import PostImagePath from "../../../images/post.png"
import { Icon, Text } from "@chakra-ui/react"
import { Form, Formik } from "formik"
import { FormTextField } from "../../../components/global/form-input.component"
import { BsArrowRightCircle } from "react-icons/bs"
import { createPostValidationSchema, useUpdatePost } from "@./frontend"
import { Protected } from "../../../components/global/protected.component"
import { useRouter } from "next/router"
import { useErrorCallback } from "../../../hooks/useErrorCallback.hook"
import { Navbar } from "web/components/global/navbar.component"

const initialValues= {

    title: "",
    description: ""
}

const EditPost: NextPage= ( ) => {
    const updatePostHandler= useUpdatePost( )

    const { push, query }= useRouter( )

    const successCallback= ( ) => push("/")

    const errorCallback= useErrorCallback( )

    const submitHandler= (formData: typeof initialValues) => updatePostHandler(
        { ...formData, _id: query["postID"] as string }, successCallback, errorCallback
    )

    return (

        <>
            <Protected>
                <Navbar />

                <PostsWrapper>
                    <CoverImage
                        src= {PostImagePath.src}
                    />

                    <Text fontSize= "14px" marginBottom= "22.5px" maxWidth= "450px">
                        Update your post and make it more amazing
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
                                            Update Post
                                        </FormSubmitButton>
                                    </Form>
                                </>

                            )
                        }
                    </Formik>
                </PostsWrapper>
            </Protected>
        </>

    )
}

export default EditPost