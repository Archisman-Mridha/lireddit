import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { isTestEnvironment } from "../utils/test.utils"

export function getMongooseConfig( ) {
    return MongooseModule.forRootAsync({

        imports: [ ConfigModule ],
        inject: [ ConfigService ],

        useFactory: async (configService: ConfigService) => {
            if(isTestEnvironment( )) {
                const testDB= await MongoMemoryServer.create( )

                return { uri: testDB.getUri( ) }
            }

            return {

                uri: configService.get("MONGODB_URI"),
                dbName: "lireddit"
            }
        }
    })
}