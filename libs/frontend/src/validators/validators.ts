import * as yup from "yup"
import { errors } from "../errors/errors"

const usernameValidator= yup.string( )
    .trim( )
    .required(errors.usernameRequiredError)
    .min(4, errors.usernameShortError)

const emailValidator= yup.string( )
    .trim( )
    .required( )
    .email( )

const identifierValidator= yup.string( )
    .trim( )
    .required(errors.identifierRequiredError)
    .min(4, errors.identifierRequiredError)

const passwordValidator= yup.string( )
    .trim( )
    .required(errors.passwordRequiredError)
    .min(4, errors.passwordShortError)

const postTitleValidator= yup.string( )
    .trim( )
    .required(errors.postTileRequiredError)
    .min(2, errors.postTitleShortError)

const postDescriptionValidator= yup.string( )
    .trim( )
    .required(errors.postDescriptionRequiredError)
    .min(2, errors.postDescriptionShortError)

export const signinValidationSchema= yup.object( ).shape({

    identifier: identifierValidator,
    password: passwordValidator
})

export const registerValidationSchema= yup.object( ).shape({

    username: usernameValidator,
    email: emailValidator,
    password: passwordValidator
})

export const requestResetPasswordValidationSchema= yup.object( ).shape({

    email: emailValidator
})

export const resetPasswordValidationSchema= yup.object( ).shape({

    newPassword: passwordValidator
})

export const createPostValidationSchema= yup.object( ).shape({

    title: postTitleValidator,
    description: postDescriptionValidator
})