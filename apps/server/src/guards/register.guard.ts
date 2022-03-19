import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { registerParameters } from "../types/types"
import validator from "validator"

@Injectable( )
export class registerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {

        const { email, password, username }= GqlExecutionContext.create(context)
            .getArgs<{ parameters: registerParameters }>( )
            .parameters

        if(
            username.length < 4 ||
            ! validator.isAlphanumeric(username) ||
            ! validator.isEmail(email) ||
            password.length < 4
        )
            throw new Error( )

        else return true
    }
}