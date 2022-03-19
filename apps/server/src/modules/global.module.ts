import { Global, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { JWTUtils } from "../utils/jwt.utils"

@Global( )
@Module({

    imports: [
        JwtModule.registerAsync({

            imports: [ ConfigModule ],
            inject: [ ConfigService ],

            useFactory: (configService: ConfigService) => ({

                expiresIn: "30d",
                secret: configService.get("JWT_SECRET")
            })
        })
    ],

    providers: [ JWTUtils ],

    exports: [ JwtModule, JWTUtils ]
})
export class globalModule { }