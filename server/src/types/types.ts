import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql"
import { createGraphQLResponse } from "../generators/graphql-respnse.generator"
import { postEntity } from "../models/post.model"
import { userEntity } from "../models/user.model"
import { voteEntity } from "../models/vote.model"

@InputType( )
export class registerParameters extends PickType(userEntity, ["username", "email"], InputType) {

    @Field(( ) => String)
    password: string
}

@InputType( )
export class signinParameters {

    @Field(( ) => String)
    identifier: string

    @Field(( ) => String)
    password: string
}

@InputType( )
export class requestResetPasswordParameters extends PickType(userEntity, ["email"], InputType) { }

@InputType( )
export class resetPasswordParameters {

    @Field(( ) => String)
    resetToken: string

    @Field(( ) => String)
    newPassword: string
}

@InputType( )
export class createPostParameters extends PickType(postEntity, ["title", "description"], InputType) { }

@InputType( )
export class fetchPostParameters extends PickType(postEntity, ["_id"], InputType) { }

@InputType( )
export class fetchPostsParameters {

    @Field(( ) => Int, { defaultValue: 5 })
    limit: number

    @Field(( ) => Int, { defaultValue: 0 })
    offset: number
}

@InputType( )
export class updatePostParameters extends PickType(postEntity, ["_id", "title", "description"], InputType) { }

@InputType( )
export class deletePostParameters extends PickType(postEntity, ["_id"], InputType) { }

@InputType( )
export class voteParameters extends PickType(voteEntity, ["postID", "value"], InputType) { }

@ObjectType( )
export class userDetails extends PickType(userEntity, ["_id", "username"], ObjectType) { }

@ObjectType( )
export class authResponse extends createGraphQLResponse<userDetails>(userDetails, "userDetails") {

    @Field(( ) => String, { nullable: true })
    accessToken?: string
}

@ObjectType( )
export class fetchCurrentUserResponse extends createGraphQLResponse<userEntity>(userEntity, "user") { }

@ObjectType( )
export class operationResponse extends createGraphQLResponse<boolean>(Boolean, "operationResult") { }

@ObjectType( )
export class fetchPostResponse extends createGraphQLResponse<postEntity>(postEntity, "post") { }

@ObjectType( )
export class fetchPostsResponse extends createGraphQLResponse<postEntity[ ]>([postEntity], "posts") { }