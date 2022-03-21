import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client"
import { graphQLErrorHandler } from "../handlers/graphql-errors.handler"

export const apolloClient= new ApolloClient({

    ssrMode: true,
    link: from([ graphQLErrorHandler, new HttpLink({ uri: "http://192.168.29.127:4000/graphql" }) ]),
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