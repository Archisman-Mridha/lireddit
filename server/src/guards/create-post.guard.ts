import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { createPostParameters } from "../types/types"

@Injectable( )
export class createPostGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {

        const { title, description }= GqlExecutionContext.create(context)
            .getArgs<{ parameters: createPostParameters }>( )
            .parameters

        if(
            title.length < 2 ||
            description.length < 2
        )
            throw new Error( )

        else return true
    }
}