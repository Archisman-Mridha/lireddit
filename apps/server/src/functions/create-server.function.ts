import { NestFactory } from "@nestjs/core"
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express"
import { isDevEnvironment, isTestEnvironment } from "../utils/test.utils"
import { appModule } from "../modules/app.module"
import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"

var app: INestApplication | NestExpressApplication

export async function createServer(port: number) {
    try {
        if(isTestEnvironment( )) {
            const testingModule: TestingModule= await Test.createTestingModule({

                imports: [ appModule ]
            }).compile( )

            app= testingModule.createNestApplication( )
        }

        app= await NestFactory.create<NestExpressApplication>(
            appModule, new ExpressAdapter( ), { cors: true }
        )

        await app.init( )

        app.listen(
            port, ( ) => isDevEnvironment( ) && console.info(`server started at port ${ port }`)
        )

        return app
    } catch(error) { console.error(error) }
}