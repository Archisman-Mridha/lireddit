import { Field, ObjectType, GraphQLISODateTime, Int, ID } from "@nestjs/graphql"
import { Prop, Schema } from "@nestjs/mongoose"
import { SchemaTypes } from "mongoose"
import { userEntity } from "./user.model"

@ObjectType({ isAbstract: true })
@Schema( )
export class postEntity {

    @Field(( ) => ID)
    _id: string

    @Field(( ) => String)
    @Prop({ type: String, required: true })
    title: string

    @Field(( ) => String)
    @Prop({ type: String, required: true })
    description: string

    @Field(( ) => userEntity)
    @Prop({ type: SchemaTypes.ObjectId, ref: userEntity.name })
    creator: userEntity

    @Field(( ) => Int)
    @Prop({ type: Number, default: 0 })
    points: number

    @Field(( ) => Int, { nullable: true })
    voteStatus: number | null

    @Field(( ) => GraphQLISODateTime)
    @Prop({ type: Date, default: Date.now( ) })
    createdAt: Date

    @Field(( ) => GraphQLISODateTime)
    @Prop({ type: Date, default: Date.now( ) })
    updatedAt: Date
}