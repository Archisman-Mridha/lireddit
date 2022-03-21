export const errors= {
    registrationErrors: {

        emailRegisteredError: "email is pre-registerd",
        usernameRegisteredError: "username is pre-registered",

        registrationFailureError: "failed registering user"
    },

    signinErrors: {

        userNotFoundError: "user not found",
        wrongPasswordError: "password provided was wrong",

        signinFailureError: "failed signing in user"
    },

    requestResetPasswordErrors: {

        emailNotRegisteredError: "email is not registered",

        sendingResetEmailError: "failed to send reset email"
    },

    resetPasswordErrors: {

        resetTokenExpiredError: "reset token expired",
        userNotFoundError: "user not found",

        resetPasswordFailureError: "failed resetting password"
    },

    postCRUDErrors: {

        createPostFailedError: "failed creating post",

        updatePostFailedError: "failed updating post",
        unauthorizedToUpdateError: "only the creator can update this post",

        deletePostFailedError: "failed deleting post",

        readPostFailedError: "failed fetching post",
        fetchPostsFailedError: "failed fetching posts"
    },

    voteFailureError: "failed voting on post"
}