import { RedisModule } from "@liaoliaots/nestjs-redis"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { isTestEnvironment } from "../utils/test.utils"
import { RedisMemoryServer } from "redis-memory-server"

let testRedisDB: RedisMemoryServer

export function getRedisConfig( ) {
    return RedisModule.forRootAsync({

        imports: [ ConfigModule ],
        inject: [ ConfigService ],

        useFactory: async (configService: ConfigService) => {
            if(isTestEnvironment( )) {
                testRedisDB= new RedisMemoryServer( )

                await testRedisDB.start( )
            }

            return {
                config: {

                    username: "default",
                    password: "password",
                    host:
                        isTestEnvironment( ) ? await testRedisDB.getHost( ): configService.get("REDIS_DB_HOST"),

                    port: isTestEnvironment( ) ? await testRedisDB.getPort( ): 13455,

                    onClientReady: client => client.on("error", error => console.error(error))
                }
            }
        }
    })
}