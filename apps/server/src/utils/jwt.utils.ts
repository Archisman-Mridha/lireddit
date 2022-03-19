import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable( )
export class JWTUtils {
    constructor(private readonly jwtService: JwtService) { }

    parseUserID(req: Request & { headers: { [key: string]: string }}) {

        return this.jwtService.decode(
            req.headers.authorization.split(" ")[1]
        )
    }

    createAccessToken(payload: string | object): Promise<string> {
        return this.jwtService.signAsync(payload)
    }
}