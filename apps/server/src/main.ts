import { NestFactory } from "@nestjs/core"
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express"
import { appModule } from "./modules/app.module"

const port= 4000

async function main( ) {
    try {
        const app= await NestFactory.create<NestExpressApplication>(
            appModule, new ExpressAdapter( ), { cors: true }
        )

        await app.init( )

        app.listen(
            port, ( ) => console.info(`server started at port ${ port }`)
        )
    } catch(error) { console.error(error) }
}

main( )