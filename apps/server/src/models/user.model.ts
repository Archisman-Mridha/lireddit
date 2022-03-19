import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Prop, Schema } from "@nestjs/mongoose"

@ObjectType( )
@Schema( )
export class userEntity {

    @Field(( ) => ID)
    _id: string

    @Field(( ) => String)
    @Prop({ type: String, required: true, unique: true })
    username: string

    @Field(( ) => String)
    @Prop({ type: String, unique: true, required: true })
    email: string

    @Prop({ type: String, required: true })
    password: string
}