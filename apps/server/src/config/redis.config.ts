import { RedisModule } from "@liaoliaots/nestjs-redis"
import { ConfigModule, ConfigService } from "@nestjs/config"

export function getRedisConfig( ) {
    return RedisModule.forRootAsync({

        imports: [ ConfigModule ],
        inject: [ ConfigService ],

        useFactory: async (configService: ConfigService) => ({
            config: {

                username: "default",
                password: "password",
                host: configService.get("REDIS_DB_HOST"),
                port: 13455,
                onClientReady: client => client.on("error", error => console.error(error))
            }
        })
    })
}