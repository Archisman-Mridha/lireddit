import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { userEntity } from "../models/user.model"
import { Model, Document } from "mongoose"

@Injectable( )
export class JWTStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        protected readonly configService: ConfigService,
        @InjectModel(userEntity.name) private readonly userModel: Model<Document & userEntity>
    )
    {
        super({

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken( ),
            secretOrKey: configService.get("JWT_SECRET")
        })
    }

    async validate(payload: string) {
        return await this.userModel.findById(payload)
    }
}