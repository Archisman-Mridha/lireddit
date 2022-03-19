export const actions= {
    userReducerActions: {

        authenticateUserAction: "authenticate",
        logoutUserAction: "logout"
    }
}

//* action types

interface baseActionType {
    type: string
}

export interface authenticateUserActionType extends baseActionType {
    payload: {

        _id: string
        username: string
        accessToken: string
    }
}

export interface logoutUserActionType extends baseActionType { }