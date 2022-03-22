import { Field, ObjectType, ReturnTypeFuncValue } from "@nestjs/graphql"

export function createGraphQLResponse<T>(dataType: ReturnTypeFuncValue, dataFieldName: string) {

    @ObjectType({ isAbstract: true })
    abstract class graphQLResponse {

        @Field(( ) => String, { nullable: true })
        error?: string

        @Field(( ) => dataType, { nullable: true, name: dataFieldName })
        data?: T
    }

    return graphQLResponse
}