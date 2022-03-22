import { internet, name } from "faker"
import { loadFile } from "graphql-import-files"
import { spec } from "pactum"

export const isTestEnvironment= ( ) => process.env.NODE_ENV === "test"

export const isDevEnvironment= ( ) => process.env.NODE_ENV === "development"

export const loadGraphQLFile= (subpath: string) => loadFile(`graphql/${ subpath }.graphql`)

export const createTestUser= ( ) => ({

    username: name.firstName( ) + name.lastName( ),
    email: internet.email( ),
    password: internet.password(6)
})

export async function executeRequest<T>(graphQLQuery: string, parameters: T, field: string) {

    const response= await spec( )
        .post("http://localhost:5000/graphql")
        .withGraphQLQuery(graphQLQuery)
        .withGraphQLVariables({ parameters })
        .expectStatus(200)
        .toss( )

    return response.body.data[field]
}