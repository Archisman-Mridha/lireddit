import { Injectable, UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { registerGuard } from "../guards/register.guard"
import { userEntity } from "../models/user.model"
import { registerParameters, authResponse, signinParameters, operationResponse, requestResetPasswordParameters, resetPasswordParameters } from "../types/types"
import { userService } from "../services/user.service"

@Injectable( )
@Resolver(( ) => userEntity)
export class userResolver {
    constructor(private readonly userService: userService) { }

    @Mutation(( ) => authResponse)
    @UseGuards(registerGuard)
    register(@Args("parameters") parameters: registerParameters): Promise<authResponse> {
        return this.userService.register(parameters)
    }

    @Query(( ) => authResponse)
    signin(@Args("parameters") parameters: signinParameters): Promise<authResponse> {
        return this.userService.signin(parameters)
    }

    @Query(( ) => operationResponse)
    requestResetPassword(@Args("parameters") parameters: requestResetPasswordParameters): Promise<operationResponse> {
        return this.userService.requestResetPassword(parameters)
    }

    @Mutation(( ) => operationResponse)
    resetPassword(@Args("parameters") parameters: resetPasswordParameters): Promise<operationResponse> {
        return this.userService.resetPassword(parameters)
    }
}