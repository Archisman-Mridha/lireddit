import { INestApplication } from "@nestjs/common"
import { createServer } from "../functions/create-server.function"
import { createTestUser, executeRequest, loadGraphQLFile } from "../utils/test.utils"
import { registerParameters, requestResetPasswordParameters, signinParameters } from "../types/types"

var app: INestApplication

beforeAll(
    async ( ) => app= await createServer(5000)
)

var testUser: any= createTestUser( )

describe("registration tests", ( ) => {
    const executeRegisterUser= (parameters: registerParameters) => executeRequest(
        loadGraphQLFile("mutations/register"), parameters, "register"
    )

    test("should activate register guard", async ( ) => {
        try {
            await executeRegisterUser({

                ...testUser,
                email: "invalid email"
            })

            throw Error("should have thrown error")
        } catch(error) { }
    })

    test("should register properly", async ( ) => {
        const response= await executeRegisterUser(testUser)

        expect(response.error).toBeNull( )
        expect(response.userDetails).toBeTruthy( )
    })
})

describe("signin tests", ( ) => {
    const executeSigninUser= (parameters: signinParameters) => executeRequest(loadGraphQLFile("queries/signin"), parameters, "signin")

    test("should detect invalid signin credentials", async ( ) => {
        const response= await executeSigninUser({

            identifier: "invalid identifier",
            password: testUser.password
        })

        expect(response.error).toBeTruthy( )

        testUser.accessToken= response.accessToken
    })

    test("should signin properly", async ( ) => {
        const response= await executeSigninUser({

            identifier: testUser.email,
            password: testUser.password
        })

        expect(response.error).toBeNull( )
        expect(response.accessToken).toBeTruthy( )

        testUser.accessToken= response.accessToken
    })
})

describe("reset password tests", ( ) => {
    const executeRequestResetPassword= (parameters: requestResetPasswordParameters) => executeRequest(
        loadGraphQLFile("queries/request-reset-password"), parameters, "request-reset-password"
    )

    test("should request for reset password", async ( ) => {
        const response= await executeRequestResetPassword({ email: testUser.email })

        expect(response.error).toBeNull( )
        expect(response.operationResult).toBeTruthy( )
    })
})

afterAll(
    async ( ) => await app.close( )
)