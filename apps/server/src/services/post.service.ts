import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { postEntity } from "../models/post.model"
import { Document, Model } from "mongoose"
import { createPostParameters, deletePostParameters, fetchPostParameters, fetchPostResponse, operationResponse, updatePostParameters, voteParameters } from "../types/types"
import { graphQLContext } from '../types/context.type';
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

    async fetchPosts( ): Promise<> {
        try {
        } catch(error) {
            console.error(error)

            return { error }
        }
    }

    async updatePost(parameters: updatePostParameters, { req }: graphQLContext): Promise<operationResponse> {
        try {
            const creatorID= this.jwtUtils.parseUserID(req)

            await this.postModel.findOneAndUpdate(

                { _id: parameters._id, creator: creatorID },
                { $set: { ...parameters }}
            )

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

            const voteDocument= await this.voteModel.findOne({ postID: parameters.postID, userID }, { _id: 1 }),
                postDocument= await this.postModel.findById(parameters.postID, { _id: 1 })

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
                if(parameters.value === 0)
                    return { error: "couldn't complete request" }

                else {
                    await this.voteModel.create({

                        ...parameters,
                        userID
                    })

                    await postDocument.updateOne({ $inc: { points: parameters.value }})
                }
            } else {
                if(parameters.value === 0) {
                    await postDocument.updateOne({ $inc: { points: -voteDocument.value }})

                    await voteDocument.deleteOne( )
                }

                else if(parameters.value !== voteDocument.value) {
                    await voteDocument.updateOne({ $set: { value: parameters.value }})

                    await postDocument.updateOne({ $inc: { points: 2 * parameters.value }})
                }
            }

            return { data: true }
        } catch(error) {
            console.error(error)

            return { error }
        }
    }
}