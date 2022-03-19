import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ThrottlerModule } from "@nestjs/throttler"
import { join } from "path"
import { getMongooseConfig } from "../config/mongoose.config"
import { getRedisConfig } from "../config/redis.config"
import { isDevEnvironment } from "../utils/test.utils"
import { userModule } from "./user.module"
import { SendGridModule } from "@ntegral/nestjs-sendgrid"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { postModule } from "./post.module"
import { globalModule } from "./global.module"

@Module({

    imports: [
        ConfigModule.forRoot({ envFilePath: join(process.env.PWD, ".env"), isGlobal: true }),

        getMongooseConfig( ),

        GraphQLModule.forRoot<ApolloDriverConfig>({

            driver: ApolloDriver,
            autoSchemaFile: isDevEnvironment ? join(process.env.PWD, "apps/server/src/graphql/schema.graphql") : true,
            context: ({ req, res }) => ({ req, res }),
            sortSchema: true
        }),

        ThrottlerModule.forRoot({ limit: 10, ttl: 60 }),

        getRedisConfig( ),

        SendGridModule.forRootAsync({

            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: (configService: ConfigService) => ({

                apiKey: configService.get("SENDGRID_API_KEY")
            })
        }),

        globalModule,

        userModule,
        postModule
    ]
})
export class appModule { }