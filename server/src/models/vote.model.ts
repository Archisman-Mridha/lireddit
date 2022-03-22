import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Prop, Schema } from "@nestjs/mongoose"
import { Types } from "mongoose"
import { postEntity } from "./post.model"
import { userEntity } from "./user.model"

@ObjectType( )
@Schema( )
export class voteEntity {

    @Field(( ) => ID)
    _id: string

    @Field(( ) => String)
    @Prop({ type: Types.ObjectId, ref: userEntity.name, required: true })
    userID: string

    @Field(( ) => String)
    @Prop({ type: Types.ObjectId, ref: postEntity.name, required: true })
    postID: string

    @Field(( ) => Int)
    @Prop({ type: Number, required: true, enum: [-1, 1] })
    value: number
}