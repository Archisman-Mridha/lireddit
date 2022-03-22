import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client"
import { graphQLErrorHandler } from "../handlers/graphql-errors.handler"

export const apolloClient= new ApolloClient({

    ssrMode: true,
    link: from([ graphQLErrorHandler, new HttpLink({ uri: "http://localhost:4000/graphql" }) ]),
    cache: new InMemoryCache({

        typePolicies: {
            Query: {

                fields: {
                    fetchPosts: {

                        keyArgs: [ ]
                    }
                }
            },

            PostEntity: {

                keyFields: ["_id"]
            }
        }
    })
})

// s://lireddit-cloned.herokuapp.com