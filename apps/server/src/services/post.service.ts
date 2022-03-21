import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { postEntity } from "../models/post.model"
import { Document, Model } from "mongoose"
import { createPostParameters, deletePostParameters, fetchPostParameters, fetchPostResponse, fetchPostsParameters, fetchPostsResponse, operationResponse, updatePostParameters, voteParameters } from "../types/types"
import { graphQLContext } from "../types/context.type"
import { errors } from "../errors/errors"
import { JWTUtils } from "../utils/jwt.utils"
import { voteEntity } from "../models/vote.model"

@Injectable( )
export class postService {
    constructor(
        @InjectModel(postEntity.name) private readonly postModel: Model<postEntity & Document>,
        @InjectModel(voteEntity.name) private readonly voteModel: Model<voteEntity & Document>,
        private readonly jwtUtils: JWTUtils
    )
    { }

    async createPost(parameters: createPostParameters, { req }: graphQLContext): Promise<operationResponse> {
        try {
            const creatorID= this.jwtUtils.parseUserID(req)

            await this.postModel.create({

                ...parameters,
                creator: creatorID
            })

            return { data: true }
        } catch(error) {
            console.error(error)

            return { error: errors.postCRUDErrors.createPostFailedError }
        }
    }

    async fetchPost(parameters: fetchPostParameters): Promise<fetchPostResponse> {
        try {
            const post= await this.postModel.findById(parameters._id).populate("creator", { username: 1 })

            if(!post)
                return { }

            else return { data: post }
        } catch(error) {
            console.error(error)

            return { error: errors.postCRUDErrors.readPostFailedError }
        }
    }

    async fetchPosts(parameters: fetchPostsParameters): Promise<fetchPostsResponse> {
        try {
            const posts= await this.postModel.find({ })
                .sort({ updatedAt: -1 })
                .skip(parameters.offset)
                .limit(parameters.limit)
                .populate("creator", { _id: 1, username: 1 })

            return { data: posts }
        } catch(error) {
            console.error(error)

            return { error: errors.postCRUDErrors.fetchPostsFailedError }
        }
    }

    async updatePost(parameters: updatePostParameters, { req }: graphQLContext): Promise<operationResponse> {
        try {
            const creatorID= this.jwtUtils.parseUserID(req)

            const postDocument= await this.postModel.findById(parameters._id)

            if(postDocument.creator !== creatorID)
                return { error: errors.postCRUDErrors.unauthorizedToUpdateError }

            await postDocument.updateOne({ $set: { ...parameters, updatedAt: new Date( ) }})

            return { data: true }
        } catch(error){
            console.error(error)

            return { error: errors.postCRUDErrors.updatePostFailedError }
        }
    }

    async deletePost(parameters: deletePostParameters, { req }: graphQLContext) {
        try {
            const creatorID= this.jwtUtils.parseUserID(req)

            await this.postModel.findOneAndDelete({ _id: parameters._id, creator: creatorID })

            return { data: true }
        } catch(error) {
            console.error(error)

            return { error: errors.postCRUDErrors.deletePostFailedError }
        }
    }

    async vote(parameters: voteParameters, { req }: graphQLContext): Promise<operationResponse> {
        try {
            const userID= this.jwtUtils.parseUserID(req)

            const voteDocument= await this.voteModel.findOne({ postID: parameters.postID, userID }, { _id: 1, value: 1 }),
                postDocument= await this.postModel.findById(parameters.postID, { _id: 1, points: 1 })

            //* filter parameters
            {
                if(! postDocument)
                    return { error: "post not found" }

                else if(parameters.value > 0)
                    parameters.value= 1

                else if(parameters.value < 0)
                    parameters.value= -1
            }

            if(!voteDocument) {
                await this.voteModel.create({

                    ...parameters,
                    userID
                })

                await postDocument.updateOne({ $inc: { points: parameters.value }})
            }

            else if(parameters.value !== voteDocument.value) {
                await voteDocument.updateOne({ $set: { value: parameters.value }})

                await postDocument.updateOne({ $inc: { points: 2 * parameters.value }})
            }

            return { data: true }
        } catch(error) {
            console.error(error)

            return { error: errors.voteFailureError }
        }
    }

    async resolveVoteStatus(post: postEntity, { req }: graphQLContext): Promise<number> {
        try {
            const userID= this.jwtUtils.parseUserID(req)

            const voteDocument= await this.voteModel.findOne({ userID, postID: post._id.toString( ) })

            return voteDocument ? voteDocument.value: 0
        } catch(error) {
            console.error(error)

            return 0
        }
    }
}