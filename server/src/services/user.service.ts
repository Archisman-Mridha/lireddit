import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { userEntity } from "../models/user.model"
import { Document, Model } from "mongoose"
import { registerParameters, authResponse, signinParameters, requestResetPasswordParameters, operationResponse, resetPasswordParameters } from "../types/types"
import { errors } from "../errors/errors"
import validator from "validator"
import { compare, genSalt, hash } from "bcryptjs"
import { InjectRedis } from "@liaoliaots/nestjs-redis"
import { Redis } from "ioredis"
import { v4 } from "uuid"
import { MailService } from "@sendgrid/mail"
import { isTestEnvironment } from "../utils/test.utils"
import { InjectSendGrid } from "@ntegral/nestjs-sendgrid"
import { JWTUtils } from "../utils/jwt.utils"

@Injectable( )
export class userService {
    constructor(
        @InjectModel(userEntity.name) private readonly userModel: Model<userEntity & Document>,
        @InjectRedis( ) private readonly redisClient: Redis,
        @InjectSendGrid( ) private readonly mailService: MailService,
        private readonly jwtUtils: JWTUtils
    )
    { }

    async register(parameters: registerParameters): Promise<authResponse> {
        try {
            let existingUser= await this.userModel.findOne({ email: parameters.email }, { email: 1 })

            if(existingUser)
                return { error: errors.registrationErrors.emailRegisteredError }

            existingUser= await this.userModel.findOne({ username: parameters.username }, { username: 1 })

            if(existingUser)
                return { error: errors.registrationErrors.usernameRegisteredError }

            const newUser= await this.userModel.create(parameters)

            return {

                data: { _id: newUser._id, username: newUser.username },
                accessToken: await this.jwtUtils.createAccessToken(newUser._id.toString( ))
            }
        } catch(error) {
            console.error(error)

            return { error: errors.registrationErrors.registrationFailureError }
        }
    }

    async signin(parameters: signinParameters): Promise<authResponse> {
        try {
            const existingUser= await this.userModel.findOne(

                validator.isEmail(parameters.identifier) ? { email: parameters.identifier }: { username: parameters.identifier },
                { _id: 1, password: 1, username: 1 }
            )

            if(!existingUser)
                return { error: errors.signinErrors.userNotFoundError }

            else if(
                ! await compare(parameters.password, existingUser.password)
            )
                return { error: errors.signinErrors.wrongPasswordError }

            return {

                data: { _id: existingUser._id, username: existingUser.username },
                accessToken: await this.jwtUtils.createAccessToken(existingUser._id.toString( ))
            }
        } catch(error) {
            console.error(error)

            return { error: errors.signinErrors.signinFailureError }
        }
    }

    async requestResetPassword(parameters: requestResetPasswordParameters): Promise<operationResponse> {
        try {
            const existingUser= await this.userModel.findOne({ email: parameters.email }, { email: 1, _id: 1 })

            if(!existingUser)
                return { error: errors.requestResetPasswordErrors.emailNotRegisteredError }

            const resetToken= v4( )

            await this.redisClient.set(
                resetToken, existingUser._id.toString( ), "ex", 24 * 60 * 60 * 1000
            )

            if(! isTestEnvironment( )) {
                const mailingResult= await this.mailService.send({

                    to: parameters.email,
                    from: "archi.procoder@gmail.com",
                    subject: "Password reset link",
                    text: "Click on the link to reset your password. The link is valid for next 24 hours :",
                    html: `<a href= "http://localhost:4200/reset-password/${ resetToken }">reset password link</a>`
                })

                console.info(mailingResult)
            }

            return { data: true }
        } catch(error) {
            console.error(error)

            return { error: errors.requestResetPasswordErrors.sendingResetEmailError }
        }
    }

    async resetPassword(parameters: resetPasswordParameters): Promise<operationResponse> {
        try {
            const userID= await this.redisClient.get(parameters.resetToken)

            if(! userID)
                return { error: errors.resetPasswordErrors.resetTokenExpiredError }

            const existingUser= await this.userModel.findById(userID)

            if(! existingUser)
                return { error: errors.resetPasswordErrors.userNotFoundError }

            await existingUser.updateOne({ $set: { password: await hash(parameters.newPassword, await genSalt( )) }})

            await this.redisClient.del(parameters.resetToken)

            return { data: true }
        } catch(error) {
            console.error(error)

            return { error: errors.resetPasswordErrors.resetPasswordFailureError }
        }
    }
}