import { Module } from "@nestjs/common"
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose"
import { postEntity } from "../models/post.model"
import { voteEntity } from "../models/vote.model"
import { postResolver } from "../resolvers/post.resolver"
import { postService } from "../services/post.service"
import { JWTStrategy } from "../strategies/jwt.strategy"
import { userModule } from "./user.module"

@Module({

    imports: [
        MongooseModule.forFeature([
            {
                name: postEntity.name,
                schema: SchemaFactory.createForClass(postEntity)
            },
            {
                name: voteEntity.name,
                schema: SchemaFactory.createForClass(voteEntity)
            }
        ]),

        userModule
    ],

    providers: [ postResolver, postService, JWTStrategy ]
})
export class postModule { }