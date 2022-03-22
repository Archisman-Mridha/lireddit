import { sharedTheme } from "@./frontend"
import { Image, Input, FormErrorMessage, Button, Box, Center, Textarea } from "@chakra-ui/react"
import styled from "styled-components"

export const Screen= styled(Center)`

    padding-right: 12.5px;
    padding-left: 12.5px;
    padding-bottom: 25px;
    min-height: 100vh;
`

export const Wrapper= styled(Box)``

export const PostsWrapper= styled(Box)`

    margin: 0px auto;
    width: 100%;
    max-width: 750px;
    padding: 10px;
`

export const CoverImage= styled(Image)`

    width: 100%;
    max-width: 450px;
    aspect-ratio: ${ 16/12 };
    margin-bottom: 20px;
`

export const StyledInput= styled(Input)``

export const StyledTextArea= styled(Textarea)``

const defaultInputProps= {

    fontSize: "14px",
    flex: 1,
    marginBottom: "10px",
    borderWidth: "1.5px",
    maxWidth: "450px",
    borderRadius: "7.5px",
    autoComplete: "off",

    _invalid: {

        marginBottom: "-2.5px"
    }
}

StyledInput.defaultProps= {

    ...defaultInputProps,
    height: "47.5px",
}

StyledTextArea.defaultProps= {

    ...defaultInputProps,
    resize: "vertical"
}

export const InputFieldError= styled(FormErrorMessage)``

InputFieldError.defaultProps= {

    fontSize: "12px",
    marginBottom: "12.5px"
}

export const FormSubmitButton= styled(Button)``

FormSubmitButton.defaultProps= {

    fontSize: "14px",
    backgroundColor: sharedTheme.colors.blue,
    color: "white",
    borderRadius: "35px",
    height: "42.5px",
    paddingX: "17.5px"
}

export const ChangeAuthStatusText= styled.a`

    margin-top: 27.5px;
    width: 100%;
    text-align: center;
`

export const ResetPasswordText= styled.a`

    font-size: 12px;
    width: 100%;
    text-align: end;
`