import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { AuthGuard } from "@nestjs/passport"
import { Observable } from "rxjs"

@Injectable( )
export class JWTGuard extends AuthGuard("jwt") {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)

        return ctx.getContext( ).req
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }

    handleRequest(error: any, user: any) {
        if(error || !user)
            throw error || new UnauthorizedException( )

        else return user
    }
}