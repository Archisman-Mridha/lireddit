import { Injectable, UseGuards } from "@nestjs/common"
import { Args, Context, Int, Mutation, Query, ResolveField, Resolver, Root } from "@nestjs/graphql"
import { postEntity } from "../models/post.model"
import { createPostParameters, deletePostParameters, fetchPostParameters, fetchPostResponse, fetchPostsParameters, fetchPostsResponse, operationResponse, updatePostParameters, voteParameters } from "../types/types"
import { postService } from "../services/post.service"
import { graphQLContext } from "../types/context.type"
import { createPostGuard } from "../guards/create-post.guard"
import { JWTGuard } from "../guards/jwt.guard"

@Injectable( )
@Resolver(( ) => postEntity)
export class postResolver {
    constructor(private readonly postService: postService) { }

    @ResolveField(( ) => Int, { nullable: true })
    async voteStatus(@Root( ) post: postEntity, @Context( ) context: graphQLContext): Promise<number> {
        return this.postService.resolveVoteStatus(post, context)
    }

    @Mutation(( ) => operationResponse)
    @UseGuards(JWTGuard)
    @UseGuards(createPostGuard)
    createPost(@Args("parameters") parameters: createPostParameters, @Context( ) context: graphQLContext): Promise<operationResponse> {
        return this.postService.createPost(parameters, context)
    }

    @Query(( ) => fetchPostResponse)
    @UseGuards(JWTGuard)
    fetchPost(@Args("parameters") parameters: fetchPostParameters): Promise<fetchPostResponse> {
        return this.postService.fetchPost(parameters)
    }

    @Query(( ) => fetchPostsResponse)
    @UseGuards(JWTGuard)
    fetchPosts(@Args("parameters") parameters: fetchPostsParameters): Promise<fetchPostsResponse> {
        return this.postService.fetchPosts(parameters)
    }

    @Mutation(( ) => operationResponse)
    @UseGuards(JWTGuard)
    @UseGuards(createPostGuard)
    updatePost(@Args("parameters") parameters: updatePostParameters, @Context( ) context: graphQLContext): Promise<operationResponse> {
        return this.postService.updatePost(parameters, context)
    }

    @Mutation(( ) => operationResponse)
    @UseGuards(JWTGuard)
    deletePost(@Args("parameters") parameters: deletePostParameters, @Context( ) context: graphQLContext): Promise<operationResponse> {
        return this.postService.deletePost(parameters, context)
    }

    @Mutation(( ) => operationResponse)
    @UseGuards(JWTGuard)
    vote(@Args("parameters") parameters: voteParameters, @Context( ) context: graphQLContext): Promise<operationResponse> {
        return this.postService.vote(parameters, context)
    }
}