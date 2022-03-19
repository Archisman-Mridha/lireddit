import { onError } from "@apollo/client/link/error"

export const graphQLErrorHandler = onError(
    function ({ graphQLErrors, networkError }) {

        if (graphQLErrors)
            graphQLErrors.map(({ message }) => console.error(`[GraphQL Error] ${ message }`))

        else if (networkError)
            console.error(`[Network Error] ${ networkError }`)
    }
)