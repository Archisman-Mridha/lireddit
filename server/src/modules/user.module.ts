import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule, SchemaFactory } from "@nestjs/mongoose"
import { genSalt, hash } from "bcryptjs"
import { userEntity } from "../models/user.model"
import { userResolver } from "../resolvers/user.resolver"
import { userService } from "../services/user.service"

@Module({

    imports: [
        MongooseModule.forFeatureAsync([{

            name: userEntity.name,
            useFactory: ( ) => {
                const schema= SchemaFactory.createForClass(userEntity)

                schema.pre<userEntity>("save", async function( ) {

                    this.password= await hash(this.password, await genSalt( ))
                })

                return schema
            }
        }]),

        JwtModule.registerAsync({

            imports: [ ConfigModule ],
            inject: [ ConfigService ],

            useFactory: (configService: ConfigService) => ({

                expiresIn: "30d",
                secret: configService.get("JWT_SECRET")
            })
        })
    ],

    providers: [ userResolver, userService ],

    exports: [ MongooseModule ]
})
export class userModule { }