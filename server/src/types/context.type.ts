export interface graphQLContext {

    req: Request & { headers: { [key: string]: string } }
    res: Response
}