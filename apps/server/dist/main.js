/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/server/src/config/mongoose.config.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMongooseConfig = void 0;
const tslib_1 = __webpack_require__("tslib");
const config_1 = __webpack_require__("@nestjs/config");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongodb_memory_server_1 = __webpack_require__("mongodb-memory-server");
const test_utils_1 = __webpack_require__("./apps/server/src/utils/test.utils.ts");
function getMongooseConfig() {
    return mongoose_1.MongooseModule.forRootAsync({
        imports: [config_1.ConfigModule],
        inject: [config_1.ConfigService],
        useFactory: (configService) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if ((0, test_utils_1.isTestEnvironment)()) {
                const testDB = yield mongodb_memory_server_1.MongoMemoryServer.create();
                return { uri: testDB.getUri() };
            }
            return {
                uri: configService.get("MONGODB_URI"),
                dbName: "lireddit"
            };
        })
    });
}
exports.getMongooseConfig = getMongooseConfig;


/***/ }),

/***/ "./apps/server/src/config/redis.config.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRedisConfig = void 0;
const tslib_1 = __webpack_require__("tslib");
const nestjs_redis_1 = __webpack_require__("@liaoliaots/nestjs-redis");
const config_1 = __webpack_require__("@nestjs/config");
const test_utils_1 = __webpack_require__("./apps/server/src/utils/test.utils.ts");
const redis_memory_server_1 = __webpack_require__("redis-memory-server");
let testRedisDB;
function getRedisConfig() {
    return nestjs_redis_1.RedisModule.forRootAsync({
        imports: [config_1.ConfigModule],
        inject: [config_1.ConfigService],
        useFactory: (configService) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if ((0, test_utils_1.isTestEnvironment)()) {
                testRedisDB = new redis_memory_server_1.RedisMemoryServer();
                yield testRedisDB.start();
            }
            return {
                config: {
                    username: "default",
                    password: "password",
                    host: (0, test_utils_1.isTestEnvironment)() ? yield testRedisDB.getHost() : configService.get("REDIS_DB_HOST"),
                    port: (0, test_utils_1.isTestEnvironment)() ? yield testRedisDB.getPort() : 13455,
                    onClientReady: client => client.on("error", error => console.error(error))
                }
            };
        })
    });
}
exports.getRedisConfig = getRedisConfig;


/***/ }),

/***/ "./apps/server/src/errors/errors.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errors = void 0;
exports.errors = {
    registrationErrors: {
        emailRegisteredError: "email is pre-registerd",
        usernameRegisteredError: "username is pre-registered",
        registrationFailureError: "failed registering user"
    },
    signinErrors: {
        userNotFoundError: "user not found",
        wrongPasswordError: "password provided was wrong",
        signinFailureError: "failed signing in user"
    },
    requestResetPasswordErrors: {
        emailNotRegisteredError: "email is not registered",
        sendingResetEmailError: "failed to send reset email"
    },
    resetPasswordErrors: {
        resetTokenExpiredError: "reset token expired",
        userNotFoundError: "user not found",
        resetPasswordFailureError: "failed resetting password"
    },
    postCRUDErrors: {
        createPostFailedError: "failed creating post",
        updatePostFailedError: "failed updating post",
        deletePostFailedError: "failed deleting post",
        readPostFailedError: "failed fetching post",
        fetchPostsFailedError: "failed fetching posts"
    }
};


/***/ }),

/***/ "./apps/server/src/generators/graphql-respnse.generator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createGraphQLResponse = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
function createGraphQLResponse(dataType, dataFieldName) {
    let graphQLResponse = class graphQLResponse {
    };
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => String, { nullable: true }),
        (0, tslib_1.__metadata)("design:type", String)
    ], graphQLResponse.prototype, "error", void 0);
    (0, tslib_1.__decorate)([
        (0, graphql_1.Field)(() => dataType, { nullable: true, name: dataFieldName }),
        (0, tslib_1.__metadata)("design:type", Object)
    ], graphQLResponse.prototype, "data", void 0);
    graphQLResponse = (0, tslib_1.__decorate)([
        (0, graphql_1.ObjectType)({ isAbstract: true })
    ], graphQLResponse);
    return graphQLResponse;
}
exports.createGraphQLResponse = createGraphQLResponse;


/***/ }),

/***/ "./apps/server/src/guards/create-post.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPostGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
let createPostGuard = class createPostGuard {
    canActivate(context) {
        const { title, description } = graphql_1.GqlExecutionContext.create(context)
            .getArgs()
            .parameters;
        if (title.length < 2 ||
            description.length < 2)
            throw new Error();
        else
            return true;
    }
};
createPostGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], createPostGuard);
exports.createPostGuard = createPostGuard;


/***/ }),

/***/ "./apps/server/src/guards/jwt.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JWTGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const passport_1 = __webpack_require__("@nestjs/passport");
let JWTGuard = class JWTGuard extends (0, passport_1.AuthGuard)("jwt") {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(error, user) {
        if (error || !user)
            throw error || new common_1.UnauthorizedException();
        else
            return user;
    }
};
JWTGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], JWTGuard);
exports.JWTGuard = JWTGuard;


/***/ }),

/***/ "./apps/server/src/guards/register.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const validator_1 = __webpack_require__("validator");
let registerGuard = class registerGuard {
    canActivate(context) {
        const { email, password, username } = graphql_1.GqlExecutionContext.create(context)
            .getArgs()
            .parameters;
        if (username.length < 4 ||
            !validator_1.default.isAlphanumeric(username) ||
            !validator_1.default.isEmail(email) ||
            password.length < 4)
            throw new Error();
        else
            return true;
    }
};
registerGuard = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], registerGuard);
exports.registerGuard = registerGuard;


/***/ }),

/***/ "./apps/server/src/models/post.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const user_model_1 = __webpack_require__("./apps/server/src/models/user.model.ts");
let postEntity = class postEntity {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", String)
], postEntity.prototype, "_id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], postEntity.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], postEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => user_model_1.userEntity),
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: user_model_1.userEntity.name }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof user_model_1.userEntity !== "undefined" && user_model_1.userEntity) === "function" ? _a : Object)
], postEntity.prototype, "creator", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    (0, tslib_1.__metadata)("design:type", Number)
], postEntity.prototype, "points", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], postEntity.prototype, "voteStatus", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, mongoose_1.Prop)({ type: Date, default: Date.now() }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], postEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    (0, mongoose_1.Prop)({ type: Date, default: Date.now() }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], postEntity.prototype, "updatedAt", void 0);
postEntity = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)({ isAbstract: true }),
    (0, mongoose_1.Schema)()
], postEntity);
exports.postEntity = postEntity;


/***/ }),

/***/ "./apps/server/src/models/user.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let userEntity = class userEntity {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", String)
], userEntity.prototype, "_id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    (0, tslib_1.__metadata)("design:type", String)
], userEntity.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ type: String, unique: true, required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], userEntity.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], userEntity.prototype, "password", void 0);
userEntity = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)()
], userEntity);
exports.userEntity = userEntity;


/***/ }),

/***/ "./apps/server/src/models/vote.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.voteEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const post_model_1 = __webpack_require__("./apps/server/src/models/post.model.ts");
const user_model_1 = __webpack_require__("./apps/server/src/models/user.model.ts");
let voteEntity = class voteEntity {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, tslib_1.__metadata)("design:type", String)
], voteEntity.prototype, "_id", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: user_model_1.userEntity.name, required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], voteEntity.prototype, "userID", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: post_model_1.postEntity.name, required: true }),
    (0, tslib_1.__metadata)("design:type", String)
], voteEntity.prototype, "postID", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, mongoose_1.Prop)({ type: Number, required: true, enum: [-1, 1] }),
    (0, tslib_1.__metadata)("design:type", Number)
], voteEntity.prototype, "value", void 0);
voteEntity = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)()
], voteEntity);
exports.voteEntity = voteEntity;


/***/ }),

/***/ "./apps/server/src/modules/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const throttler_1 = __webpack_require__("@nestjs/throttler");
const path_1 = __webpack_require__("path");
const mongoose_config_1 = __webpack_require__("./apps/server/src/config/mongoose.config.ts");
const redis_config_1 = __webpack_require__("./apps/server/src/config/redis.config.ts");
const test_utils_1 = __webpack_require__("./apps/server/src/utils/test.utils.ts");
const user_module_1 = __webpack_require__("./apps/server/src/modules/user.module.ts");
const nestjs_sendgrid_1 = __webpack_require__("@ntegral/nestjs-sendgrid");
const apollo_1 = __webpack_require__("@nestjs/apollo");
const post_module_1 = __webpack_require__("./apps/server/src/modules/post.module.ts");
const global_module_1 = __webpack_require__("./apps/server/src/modules/global.module.ts");
let appModule = class appModule {
};
appModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: (0, path_1.join)(process.env.PWD, ".env"), isGlobal: true }),
            (0, mongoose_config_1.getMongooseConfig)(),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: test_utils_1.isDevEnvironment ? (0, path_1.join)(process.env.PWD, "apps/server/src/graphql/schema.graphql") : true,
                context: ({ req, res }) => ({ req, res }),
                sortSchema: true
            }),
            throttler_1.ThrottlerModule.forRoot({ limit: 10, ttl: 60 }),
            (0, redis_config_1.getRedisConfig)(),
            nestjs_sendgrid_1.SendGridModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    apiKey: configService.get("SENDGRID_API_KEY")
                })
            }),
            global_module_1.globalModule,
            user_module_1.userModule,
            post_module_1.postModule
        ]
    })
], appModule);
exports.appModule = appModule;


/***/ }),

/***/ "./apps/server/src/modules/global.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.globalModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const jwt_utils_1 = __webpack_require__("./apps/server/src/utils/jwt.utils.ts");
let globalModule = class globalModule {
};
globalModule = (0, tslib_1.__decorate)([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    expiresIn: "30d",
                    secret: configService.get("JWT_SECRET")
                })
            })
        ],
        providers: [jwt_utils_1.JWTUtils],
        exports: [jwt_1.JwtModule, jwt_utils_1.JWTUtils]
    })
], globalModule);
exports.globalModule = globalModule;


/***/ }),

/***/ "./apps/server/src/modules/post.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const post_model_1 = __webpack_require__("./apps/server/src/models/post.model.ts");
const vote_model_1 = __webpack_require__("./apps/server/src/models/vote.model.ts");
const post_resolver_1 = __webpack_require__("./apps/server/src/resolvers/post.resolver.ts");
const post_service_1 = __webpack_require__("./apps/server/src/services/post.service.ts");
const jwt_strategy_1 = __webpack_require__("./apps/server/src/strategies/jwt.strategy.ts");
const user_module_1 = __webpack_require__("./apps/server/src/modules/user.module.ts");
let postModule = class postModule {
};
postModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: post_model_1.postEntity.name,
                    schema: mongoose_1.SchemaFactory.createForClass(post_model_1.postEntity)
                },
                {
                    name: vote_model_1.voteEntity.name,
                    schema: mongoose_1.SchemaFactory.createForClass(vote_model_1.voteEntity)
                }
            ]),
            user_module_1.userModule
        ],
        providers: [post_resolver_1.postResolver, post_service_1.postService, jwt_strategy_1.JWTStrategy]
    })
], postModule);
exports.postModule = postModule;


/***/ }),

/***/ "./apps/server/src/modules/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const bcryptjs_1 = __webpack_require__("bcryptjs");
const user_model_1 = __webpack_require__("./apps/server/src/models/user.model.ts");
const user_resolver_1 = __webpack_require__("./apps/server/src/resolvers/user.resolver.ts");
const user_service_1 = __webpack_require__("./apps/server/src/services/user.service.ts");
let userModule = class userModule {
};
userModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([{
                    name: user_model_1.userEntity.name,
                    useFactory: () => {
                        const schema = mongoose_1.SchemaFactory.createForClass(user_model_1.userEntity);
                        schema.pre("save", function () {
                            return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                                this.password = yield (0, bcryptjs_1.hash)(this.password, yield (0, bcryptjs_1.genSalt)());
                            });
                        });
                        return schema;
                    }
                }]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    expiresIn: "30d",
                    secret: configService.get("JWT_SECRET")
                })
            })
        ],
        providers: [user_resolver_1.userResolver, user_service_1.userService],
        exports: [mongoose_1.MongooseModule]
    })
], userModule);
exports.userModule = userModule;


/***/ }),

/***/ "./apps/server/src/resolvers/post.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const post_model_1 = __webpack_require__("./apps/server/src/models/post.model.ts");
const types_1 = __webpack_require__("./apps/server/src/types/types.ts");
const post_service_1 = __webpack_require__("./apps/server/src/services/post.service.ts");
const context_type_1 = __webpack_require__("./apps/server/src/types/context.type.ts");
const create_post_guard_1 = __webpack_require__("./apps/server/src/guards/create-post.guard.ts");
const jwt_guard_1 = __webpack_require__("./apps/server/src/guards/jwt.guard.ts");
let postResolver = class postResolver {
    constructor(postService) {
        this.postService = postService;
    }
    createPost(parameters, context) {
        return this.postService.createPost(parameters, context);
    }
    fetchPost(parameters) {
        return this.postService.fetchPost(parameters);
    }
    updatePost(parameters, context) {
        return this.postService.updatePost(parameters, context);
    }
    deletePost(parameters, context) {
        return this.postService.deletePost(parameters, context);
    }
    vote(parameters, context) {
        return this.postService.vote(parameters, context);
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => types_1.operationResponse),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.UseGuards)(create_post_guard_1.createPostGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__param)(1, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof types_1.createPostParameters !== "undefined" && types_1.createPostParameters) === "function" ? _a : Object, typeof (_b = typeof context_type_1.graphQLContext !== "undefined" && context_type_1.graphQLContext) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], postResolver.prototype, "createPost", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => types_1.fetchPostResponse),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof types_1.fetchPostParameters !== "undefined" && types_1.fetchPostParameters) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], postResolver.prototype, "fetchPost", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => types_1.operationResponse),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, common_1.UseGuards)(create_post_guard_1.createPostGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__param)(1, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof types_1.updatePostParameters !== "undefined" && types_1.updatePostParameters) === "function" ? _f : Object, typeof (_g = typeof context_type_1.graphQLContext !== "undefined" && context_type_1.graphQLContext) === "function" ? _g : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], postResolver.prototype, "updatePost", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => types_1.operationResponse),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__param)(1, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_j = typeof types_1.deletePostParameters !== "undefined" && types_1.deletePostParameters) === "function" ? _j : Object, typeof (_k = typeof context_type_1.graphQLContext !== "undefined" && context_type_1.graphQLContext) === "function" ? _k : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], postResolver.prototype, "deletePost", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => types_1.operationResponse),
    (0, common_1.UseGuards)(jwt_guard_1.JWTGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__param)(1, (0, graphql_1.Context)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_m = typeof types_1.voteParameters !== "undefined" && types_1.voteParameters) === "function" ? _m : Object, typeof (_o = typeof context_type_1.graphQLContext !== "undefined" && context_type_1.graphQLContext) === "function" ? _o : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], postResolver.prototype, "vote", null);
postResolver = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, graphql_1.Resolver)(() => post_model_1.postEntity),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_q = typeof post_service_1.postService !== "undefined" && post_service_1.postService) === "function" ? _q : Object])
], postResolver);
exports.postResolver = postResolver;


/***/ }),

/***/ "./apps/server/src/resolvers/user.resolver.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userResolver = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const register_guard_1 = __webpack_require__("./apps/server/src/guards/register.guard.ts");
const user_model_1 = __webpack_require__("./apps/server/src/models/user.model.ts");
const types_1 = __webpack_require__("./apps/server/src/types/types.ts");
const user_service_1 = __webpack_require__("./apps/server/src/services/user.service.ts");
let userResolver = class userResolver {
    constructor(userService) {
        this.userService = userService;
    }
    register(parameters) {
        return this.userService.register(parameters);
    }
    signin(parameters) {
        return this.userService.signin(parameters);
    }
    requestResetPassword(parameters) {
        return this.userService.requestResetPassword(parameters);
    }
    resetPassword(parameters) {
        return this.userService.resetPassword(parameters);
    }
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => types_1.authResponse),
    (0, common_1.UseGuards)(register_guard_1.registerGuard),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof types_1.registerParameters !== "undefined" && types_1.registerParameters) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], userResolver.prototype, "register", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => types_1.authResponse),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof types_1.signinParameters !== "undefined" && types_1.signinParameters) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], userResolver.prototype, "signin", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Query)(() => types_1.operationResponse),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof types_1.requestResetPasswordParameters !== "undefined" && types_1.requestResetPasswordParameters) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], userResolver.prototype, "requestResetPassword", null);
(0, tslib_1.__decorate)([
    (0, graphql_1.Mutation)(() => types_1.operationResponse),
    (0, tslib_1.__param)(0, (0, graphql_1.Args)("parameters")),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof types_1.resetPasswordParameters !== "undefined" && types_1.resetPasswordParameters) === "function" ? _g : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], userResolver.prototype, "resetPassword", null);
userResolver = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, graphql_1.Resolver)(() => user_model_1.userEntity),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_j = typeof user_service_1.userService !== "undefined" && user_service_1.userService) === "function" ? _j : Object])
], userResolver);
exports.userResolver = userResolver;


/***/ }),

/***/ "./apps/server/src/services/post.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.postService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const post_model_1 = __webpack_require__("./apps/server/src/models/post.model.ts");
const mongoose_2 = __webpack_require__("mongoose");
const errors_1 = __webpack_require__("./apps/server/src/errors/errors.ts");
const jwt_utils_1 = __webpack_require__("./apps/server/src/utils/jwt.utils.ts");
const vote_model_1 = __webpack_require__("./apps/server/src/models/vote.model.ts");
let postService = class postService {
    constructor(postModel, voteModel, jwtUtils) {
        this.postModel = postModel;
        this.voteModel = voteModel;
        this.jwtUtils = jwtUtils;
    }
    createPost(parameters, { req }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const creatorID = this.jwtUtils.parseUserID(req);
                yield this.postModel.create(Object.assign(Object.assign({}, parameters), { creator: creatorID }));
                return { data: true };
            }
            catch (error) {
                console.error(error);
                return { error: errors_1.errors.postCRUDErrors.createPostFailedError };
            }
        });
    }
    fetchPost(parameters) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const post = yield this.postModel.findById(parameters._id).populate("creator", { username: 1 });
                if (!post)
                    return {};
                else
                    return { data: post };
            }
            catch (error) {
                console.error(error);
                return { error: errors_1.errors.postCRUDErrors.readPostFailedError };
            }
        });
    }
    fetchPosts() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
    }
    updatePost(parameters, { req }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const creatorID = this.jwtUtils.parseUserID(req);
                yield this.postModel.findOneAndUpdate({ _id: parameters._id, creator: creatorID }, { $set: Object.assign({}, parameters) });
                return { data: true };
            }
            catch (error) {
                console.error(error);
                return { error: errors_1.errors.postCRUDErrors.updatePostFailedError };
            }
        });
    }
    deletePost(parameters, { req }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const creatorID = this.jwtUtils.parseUserID(req);
                yield this.postModel.findOneAndDelete({ _id: parameters._id, creator: creatorID });
                return { data: true };
            }
            catch (error) {
                console.error(error);
                return { error: errors_1.errors.postCRUDErrors.deletePostFailedError };
            }
        });
    }
    vote(parameters, { req }) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const userID = this.jwtUtils.parseUserID(req);
                const voteDocument = yield this.voteModel.findOne({ postID: parameters.postID, userID }, { _id: 1 }), postDocument = yield this.postModel.findById(parameters.postID, { _id: 1 });
                //* filter parameters
                {
                    if (!postDocument)
                        return { error: "post not found" };
                    else if (parameters.value > 0)
                        parameters.value = 1;
                    else if (parameters.value < 0)
                        parameters.value = -1;
                }
                if (!voteDocument) {
                    if (parameters.value === 0)
                        return { error: "couldn't complete request" };
                    else {
                        yield this.voteModel.create(Object.assign(Object.assign({}, parameters), { userID }));
                        yield postDocument.updateOne({ $inc: { points: parameters.value } });
                    }
                }
                else {
                    if (parameters.value === 0) {
                        yield postDocument.updateOne({ $inc: { points: -voteDocument.value } });
                        yield voteDocument.deleteOne();
                    }
                    else if (parameters.value !== voteDocument.value) {
                        yield voteDocument.updateOne({ $set: { value: parameters.value } });
                        yield postDocument.updateOne({ $inc: { points: 2 * parameters.value } });
                    }
                }
                return { data: true };
            }
            catch (error) {
                console.error(error);
                return { error };
            }
        });
    }
};
postService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, mongoose_1.InjectModel)(post_model_1.postEntity.name)),
    (0, tslib_1.__param)(1, (0, mongoose_1.InjectModel)(vote_model_1.voteEntity.name)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof jwt_utils_1.JWTUtils !== "undefined" && jwt_utils_1.JWTUtils) === "function" ? _c : Object])
], postService);
exports.postService = postService;


/***/ }),

/***/ "./apps/server/src/services/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_model_1 = __webpack_require__("./apps/server/src/models/user.model.ts");
const mongoose_2 = __webpack_require__("mongoose");
const errors_1 = __webpack_require__("./apps/server/src/errors/errors.ts");
const validator_1 = __webpack_require__("validator");
const bcryptjs_1 = __webpack_require__("bcryptjs");
const nestjs_redis_1 = __webpack_require__("@liaoliaots/nestjs-redis");
const ioredis_1 = __webpack_require__("ioredis");
const uuid_1 = __webpack_require__("uuid");
const mail_1 = __webpack_require__("@sendgrid/mail");
const test_utils_1 = __webpack_require__("./apps/server/src/utils/test.utils.ts");
const nestjs_sendgrid_1 = __webpack_require__("@ntegral/nestjs-sendgrid");
const jwt_utils_1 = __webpack_require__("./apps/server/src/utils/jwt.utils.ts");
let userService = class userService {
    constructor(userModel, redisClient, mailService, jwtUtils) {
        this.userModel = userModel;
        this.redisClient = redisClient;
        this.mailService = mailService;
        this.jwtUtils = jwtUtils;
    }
    register(parameters) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                let existingUser = yield this.userModel.findOne({ email: parameters.email }, { email: 1 });
                if (existingUser)
                    return { error: errors_1.errors.registrationErrors.emailRegisteredError };
                existingUser = yield this.userModel.findOne({ username: parameters.username }, { username: 1 });
                if (existingUser)
                    return { error: errors_1.errors.registrationErrors.usernameRegisteredError };
                const newUser = yield this.userModel.create(parameters);
                return {
                    data: { _id: newUser._id, username: newUser.username },
                    accessToken: yield this.jwtUtils.createAccessToken(newUser._id.toString())
                };
            }
            catch (error) {
                console.error(error);
                return { error: errors_1.errors.registrationErrors.registrationFailureError };
            }
        });
    }
    signin(parameters) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userModel.findOne(validator_1.default.isEmail(parameters.identifier) ? { email: parameters.identifier } : { username: parameters.identifier }, { _id: 1, password: 1, username: 1 });
                if (!existingUser)
                    return { error: errors_1.errors.signinErrors.userNotFoundError };
                else if (!(yield (0, bcryptjs_1.compare)(parameters.password, existingUser.password)))
                    return { error: errors_1.errors.signinErrors.wrongPasswordError };
                return {
                    data: { _id: existingUser._id, username: existingUser.username },
                    accessToken: yield this.jwtUtils.createAccessToken(existingUser._id.toString())
                };
            }
            catch (error) {
                console.error(error);
                return { error: errors_1.errors.signinErrors.signinFailureError };
            }
        });
    }
    requestResetPassword(parameters) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userModel.findOne({ email: parameters.email }, { email: 1, _id: 1 });
                if (!existingUser)
                    return { error: errors_1.errors.requestResetPasswordErrors.emailNotRegisteredError };
                const resetToken = (0, uuid_1.v4)();
                yield this.redisClient.set(resetToken, existingUser._id.toString(), "ex", 24 * 60 * 60 * 1000);
                if (!(0, test_utils_1.isTestEnvironment)()) {
                    const mailingResult = yield this.mailService.send({
                        to: parameters.email,
                        from: "archi.procoder@gmail.com",
                        subject: "Password reset link",
                        text: "Click on the link to reset your password. The link is valid for next 24 hours :",
                        html: `<a href= "http://localhost:4200/reset-password/${resetToken}">reset password link</a>`
                    });
                    console.info(mailingResult);
                }
                return { data: true };
            }
            catch (error) {
                console.error(error);
                return { error: errors_1.errors.requestResetPasswordErrors.sendingResetEmailError };
            }
        });
    }
    resetPassword(parameters) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const userID = yield this.redisClient.get(parameters.resetToken);
                if (!userID)
                    return { error: errors_1.errors.resetPasswordErrors.resetTokenExpiredError };
                const existingUser = yield this.userModel.findById(userID);
                if (!existingUser)
                    return { error: errors_1.errors.resetPasswordErrors.userNotFoundError };
                yield existingUser.updateOne({ $set: { password: yield (0, bcryptjs_1.hash)(parameters.newPassword, yield (0, bcryptjs_1.genSalt)()) } });
                yield this.redisClient.del(parameters.resetToken);
                return { data: true };
            }
            catch (error) {
                console.error(error);
                return { error: errors_1.errors.resetPasswordErrors.resetPasswordFailureError };
            }
        });
    }
};
userService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, mongoose_1.InjectModel)(user_model_1.userEntity.name)),
    (0, tslib_1.__param)(1, (0, nestjs_redis_1.InjectRedis)()),
    (0, tslib_1.__param)(2, (0, nestjs_sendgrid_1.InjectSendGrid)()),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof ioredis_1.Redis !== "undefined" && ioredis_1.Redis) === "function" ? _b : Object, typeof (_c = typeof mail_1.MailService !== "undefined" && mail_1.MailService) === "function" ? _c : Object, typeof (_d = typeof jwt_utils_1.JWTUtils !== "undefined" && jwt_utils_1.JWTUtils) === "function" ? _d : Object])
], userService);
exports.userService = userService;


/***/ }),

/***/ "./apps/server/src/strategies/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JWTStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_1 = __webpack_require__("@nestjs/passport");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const config_1 = __webpack_require__("@nestjs/config");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const user_model_1 = __webpack_require__("./apps/server/src/models/user.model.ts");
const mongoose_2 = __webpack_require__("mongoose");
let JWTStrategy = class JWTStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, "jwt") {
    constructor(configService, userModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT_SECRET")
        });
        this.configService = configService;
        this.userModel = userModel;
    }
    validate(payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield this.userModel.findById(payload);
        });
    }
};
JWTStrategy = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(1, (0, mongoose_1.InjectModel)(user_model_1.userEntity.name)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], JWTStrategy);
exports.JWTStrategy = JWTStrategy;


/***/ }),

/***/ "./apps/server/src/types/context.type.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./apps/server/src/types/types.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchPostResponse = exports.operationResponse = exports.authResponse = exports.userDetails = exports.voteParameters = exports.deletePostParameters = exports.updatePostParameters = exports.fetchPostParameters = exports.createPostParameters = exports.resetPasswordParameters = exports.requestResetPasswordParameters = exports.signinParameters = exports.registerParameters = void 0;
const tslib_1 = __webpack_require__("tslib");
const graphql_1 = __webpack_require__("@nestjs/graphql");
const graphql_respnse_generator_1 = __webpack_require__("./apps/server/src/generators/graphql-respnse.generator.ts");
const post_model_1 = __webpack_require__("./apps/server/src/models/post.model.ts");
const user_model_1 = __webpack_require__("./apps/server/src/models/user.model.ts");
const vote_model_1 = __webpack_require__("./apps/server/src/models/vote.model.ts");
let registerParameters = class registerParameters extends (0, graphql_1.PickType)(user_model_1.userEntity, ["username", "email"], graphql_1.InputType) {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], registerParameters.prototype, "password", void 0);
registerParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], registerParameters);
exports.registerParameters = registerParameters;
let signinParameters = class signinParameters {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], signinParameters.prototype, "identifier", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], signinParameters.prototype, "password", void 0);
signinParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], signinParameters);
exports.signinParameters = signinParameters;
let requestResetPasswordParameters = class requestResetPasswordParameters extends (0, graphql_1.PickType)(user_model_1.userEntity, ["email"], graphql_1.InputType) {
};
requestResetPasswordParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], requestResetPasswordParameters);
exports.requestResetPasswordParameters = requestResetPasswordParameters;
let resetPasswordParameters = class resetPasswordParameters {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], resetPasswordParameters.prototype, "resetToken", void 0);
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String),
    (0, tslib_1.__metadata)("design:type", String)
], resetPasswordParameters.prototype, "newPassword", void 0);
resetPasswordParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], resetPasswordParameters);
exports.resetPasswordParameters = resetPasswordParameters;
let createPostParameters = class createPostParameters extends (0, graphql_1.PickType)(post_model_1.postEntity, ["title", "description"], graphql_1.InputType) {
};
createPostParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], createPostParameters);
exports.createPostParameters = createPostParameters;
let fetchPostParameters = class fetchPostParameters extends (0, graphql_1.PickType)(post_model_1.postEntity, ["_id"], graphql_1.InputType) {
};
fetchPostParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], fetchPostParameters);
exports.fetchPostParameters = fetchPostParameters;
let updatePostParameters = class updatePostParameters extends (0, graphql_1.PickType)(post_model_1.postEntity, ["_id", "title", "description"], graphql_1.InputType) {
};
updatePostParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], updatePostParameters);
exports.updatePostParameters = updatePostParameters;
let deletePostParameters = class deletePostParameters extends (0, graphql_1.PickType)(post_model_1.postEntity, ["_id"], graphql_1.InputType) {
};
deletePostParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], deletePostParameters);
exports.deletePostParameters = deletePostParameters;
let voteParameters = class voteParameters extends (0, graphql_1.PickType)(vote_model_1.voteEntity, ["postID", "value"], graphql_1.InputType) {
};
voteParameters = (0, tslib_1.__decorate)([
    (0, graphql_1.InputType)()
], voteParameters);
exports.voteParameters = voteParameters;
let userDetails = class userDetails extends (0, graphql_1.PickType)(user_model_1.userEntity, ["_id", "username"], graphql_1.ObjectType) {
};
userDetails = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], userDetails);
exports.userDetails = userDetails;
let authResponse = class authResponse extends (0, graphql_respnse_generator_1.createGraphQLResponse)(userDetails, "userDetails") {
};
(0, tslib_1.__decorate)([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], authResponse.prototype, "accessToken", void 0);
authResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], authResponse);
exports.authResponse = authResponse;
let operationResponse = class operationResponse extends (0, graphql_respnse_generator_1.createGraphQLResponse)(Boolean, "operationResult") {
};
operationResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], operationResponse);
exports.operationResponse = operationResponse;
let fetchPostResponse = class fetchPostResponse extends (0, graphql_respnse_generator_1.createGraphQLResponse)(post_model_1.postEntity, "post") {
};
fetchPostResponse = (0, tslib_1.__decorate)([
    (0, graphql_1.ObjectType)()
], fetchPostResponse);
exports.fetchPostResponse = fetchPostResponse;


/***/ }),

/***/ "./apps/server/src/utils/jwt.utils.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JWTUtils = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jwt_1 = __webpack_require__("@nestjs/jwt");
let JWTUtils = class JWTUtils {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    parseUserID(req) {
        return this.jwtService.decode(req.headers.authorization.split(" ")[1]);
    }
    createAccessToken(payload) {
        return this.jwtService.signAsync(payload);
    }
};
JWTUtils = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], JWTUtils);
exports.JWTUtils = JWTUtils;


/***/ }),

/***/ "./apps/server/src/utils/test.utils.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isDevEnvironment = exports.isTestEnvironment = void 0;
const isTestEnvironment = () => "development" === "test";
exports.isTestEnvironment = isTestEnvironment;
const isDevEnvironment = () => "development" === "development";
exports.isDevEnvironment = isDevEnvironment;


/***/ }),

/***/ "@liaoliaots/nestjs-redis":
/***/ ((module) => {

module.exports = require("@liaoliaots/nestjs-redis");

/***/ }),

/***/ "@nestjs/apollo":
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/throttler":
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "@ntegral/nestjs-sendgrid":
/***/ ((module) => {

module.exports = require("@ntegral/nestjs-sendgrid");

/***/ }),

/***/ "@sendgrid/mail":
/***/ ((module) => {

module.exports = require("@sendgrid/mail");

/***/ }),

/***/ "bcryptjs":
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "ioredis":
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),

/***/ "mongodb-memory-server":
/***/ ((module) => {

module.exports = require("mongodb-memory-server");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "redis-memory-server":
/***/ ((module) => {

module.exports = require("redis-memory-server");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),

/***/ "validator":
/***/ ((module) => {

module.exports = require("validator");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const core_1 = __webpack_require__("@nestjs/core");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const app_module_1 = __webpack_require__("./apps/server/src/modules/app.module.ts");
const port = 4000;
function main() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        try {
            const app = yield core_1.NestFactory.create(app_module_1.appModule, new platform_express_1.ExpressAdapter(), { cors: true });
            yield app.init();
            app.listen(port, () => console.info(`server started at port ${port}`));
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map