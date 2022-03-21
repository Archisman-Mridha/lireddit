import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: any
}

export type Mutation = {
    __typename?: "Mutation"
    createPost: OperationResponse
    deletePost: OperationResponse
    register: AuthResponse
    resetPassword: OperationResponse
    updatePost: OperationResponse
    vote: OperationResponse
}

export type MutationCreatePostArgs = {
    parameters: CreatePostParameters
}

export type MutationDeletePostArgs = {
    parameters: DeletePostParameters
}

export type MutationRegisterArgs = {
    parameters: RegisterParameters
}

export type MutationResetPasswordArgs = {
    parameters: ResetPasswordParameters
}

export type MutationUpdatePostArgs = {
    parameters: UpdatePostParameters
}

export type MutationVoteArgs = {
    parameters: VoteParameters
}

export type Query = {
    __typename?: "Query"
    fetchPost: FetchPostResponse
    fetchPosts: FetchPostsResponse
    requestResetPassword: OperationResponse
    signin: AuthResponse
}

export type QueryFetchPostArgs = {
    parameters: FetchPostParameters
}

export type QueryFetchPostsArgs = {
    parameters: FetchPostsParameters
}

export type QueryRequestResetPasswordArgs = {
    parameters: RequestResetPasswordParameters
}

export type QuerySigninArgs = {
    parameters: SigninParameters
}

export type AuthResponse = {
    __typename?: "authResponse"
    accessToken?: Maybe<Scalars["String"]>
    error?: Maybe<Scalars["String"]>
    userDetails?: Maybe<UserDetails>
}

export type CreatePostParameters = {
    description: Scalars["String"]
    title: Scalars["String"]
}

export type DeletePostParameters = {
    _id: Scalars["ID"]
}

export type FetchPostParameters = {
    _id: Scalars["ID"]
}

export type FetchPostResponse = {
    __typename?: "fetchPostResponse"
    error?: Maybe<Scalars["String"]>
    post?: Maybe<PostEntity>
}

export type FetchPostsParameters = {
    limit?: InputMaybe<Scalars["Int"]>
    offset?: InputMaybe<Scalars["Int"]>
}

export type FetchPostsResponse = {
    __typename?: "fetchPostsResponse"
    error?: Maybe<Scalars["String"]>
    posts?: Maybe<Array<PostEntity>>
}

export type OperationResponse = {
    __typename?: "operationResponse"
    error?: Maybe<Scalars["String"]>
    operationResult?: Maybe<Scalars["Boolean"]>
}

export type PostEntity = {
    __typename?: "postEntity"
    _id: Scalars["ID"]
    createdAt: Scalars["DateTime"]
    creator: UserEntity
    description: Scalars["String"]
    points: Scalars["Int"]
    title: Scalars["String"]
    updatedAt: Scalars["DateTime"]
    voteStatus?: Maybe<Scalars["Int"]>
}

export type RegisterParameters = {
    email: Scalars["String"]
    password: Scalars["String"]
    username: Scalars["String"]
}

export type RequestResetPasswordParameters = {
    email: Scalars["String"]
}

export type ResetPasswordParameters = {
    newPassword: Scalars["String"]
    resetToken: Scalars["String"]
}

export type SigninParameters = {
    identifier: Scalars["String"]
    password: Scalars["String"]
}

export type UpdatePostParameters = {
    _id: Scalars["ID"]
    description: Scalars["String"]
    title: Scalars["String"]
}

export type UserDetails = {
    __typename?: "userDetails"
    _id: Scalars["ID"]
    username: Scalars["String"]
}

export type UserEntity = {
    __typename?: "userEntity"
    _id: Scalars["ID"]
    email: Scalars["String"]
    username: Scalars["String"]
}

export type VoteParameters = {
    postID: Scalars["String"]
    value: Scalars["Int"]
}

export type AuthDataFragment = {
    __typename?: "authResponse"
    error?: string | null
    accessToken?: string | null
    userDetails?: { __typename?: "userDetails"; _id: string; username: string } | null
}

export type PostDetailsFragment = {
    __typename?: "postEntity"
    _id: string
    title: string
    description: string
    points: number
    voteStatus?: number | null
    createdAt: any
    updatedAt: any
    creator: { __typename?: "userEntity"; username: string }
}

export type CreatePostMutationVariables = Exact<{
    parameters: CreatePostParameters
}>

export type CreatePostMutation = {
    __typename?: "Mutation"
    createPost: { __typename?: "operationResponse"; error?: string | null; operationResult?: boolean | null }
}

export type DeletePostMutationVariables = Exact<{
    parameters: DeletePostParameters
}>

export type DeletePostMutation = {
    __typename?: "Mutation"
    deletePost: { __typename?: "operationResponse"; error?: string | null; operationResult?: boolean | null }
}

export type RegisterMutationVariables = Exact<{
    parameters: RegisterParameters
}>

export type RegisterMutation = {
    __typename?: "Mutation"
    register: {
        __typename?: "authResponse"
        error?: string | null
        accessToken?: string | null
        userDetails?: { __typename?: "userDetails"; _id: string; username: string } | null
    }
}

export type ResetPasswordMutationVariables = Exact<{
    parameters: ResetPasswordParameters
}>

export type ResetPasswordMutation = {
    __typename?: "Mutation"
    resetPassword: { __typename?: "operationResponse"; error?: string | null; operationResult?: boolean | null }
}

export type UpdatePostMutationVariables = Exact<{
    parameters: UpdatePostParameters
}>

export type UpdatePostMutation = {
    __typename?: "Mutation"
    updatePost: { __typename?: "operationResponse"; error?: string | null; operationResult?: boolean | null }
}

export type VoteMutationVariables = Exact<{
    parameters: VoteParameters
}>

export type VoteMutation = {
    __typename?: "Mutation"
    vote: { __typename?: "operationResponse"; error?: string | null; operationResult?: boolean | null }
}

export type FetchPostQueryVariables = Exact<{
    parameters: FetchPostParameters
}>

export type FetchPostQuery = {
    __typename?: "Query"
    fetchPost: {
        __typename?: "fetchPostResponse"
        error?: string | null
        post?: {
            __typename?: "postEntity"
            _id: string
            title: string
            description: string
            points: number
            voteStatus?: number | null
            createdAt: any
            updatedAt: any
            creator: { __typename?: "userEntity"; username: string }
        } | null
    }
}

export type FetchPostsQueryVariables = Exact<{
    parameters: FetchPostsParameters
}>

export type FetchPostsQuery = {
    __typename?: "Query"
    fetchPosts: {
        __typename?: "fetchPostsResponse"
        error?: string | null
        posts?: Array<{
            __typename?: "postEntity"
            _id: string
            title: string
            description: string
            points: number
            voteStatus?: number | null
            createdAt: any
            updatedAt: any
            creator: { __typename?: "userEntity"; username: string }
        }> | null
    }
}

export type RequestResetPasswordQueryVariables = Exact<{
    parameters: RequestResetPasswordParameters
}>

export type RequestResetPasswordQuery = {
    __typename?: "Query"
    requestResetPassword: { __typename?: "operationResponse"; error?: string | null; operationResult?: boolean | null }
}

export type SigninQueryVariables = Exact<{
    parameters: SigninParameters
}>

export type SigninQuery = {
    __typename?: "Query"
    signin: {
        __typename?: "authResponse"
        error?: string | null
        accessToken?: string | null
        userDetails?: { __typename?: "userDetails"; _id: string; username: string } | null
    }
}

export const AuthDataFragmentDoc = gql`
    fragment authData on authResponse {
        error
        accessToken
        userDetails {
            _id
            username
        }
    }
`
export const PostDetailsFragmentDoc = gql`
    fragment postDetails on postEntity {
        _id
        title
        description
        points
        voteStatus
        createdAt
        updatedAt
        creator {
            username
        }
    }
`
export const CreatePostDocument = gql`
    mutation CreatePost($parameters: createPostParameters!) {
        createPost(parameters: $parameters) {
            error
            operationResult
        }
    }
`
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options)
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>
export const DeletePostDocument = gql`
    mutation DeletePost($parameters: deletePostParameters!) {
        deletePost(parameters: $parameters) {
            error
            operationResult
        }
    }
`
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options)
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>
export const RegisterDocument = gql`
    mutation Register($parameters: registerParameters!) {
        register(parameters: $parameters) {
            error
            accessToken
            userDetails {
                _id
                username
            }
        }
    }
`
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>
export const ResetPasswordDocument = gql`
    mutation ResetPassword($parameters: resetPasswordParameters!) {
        resetPassword(parameters: $parameters) {
            error
            operationResult
        }
    }
`
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options)
}
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>
export const UpdatePostDocument = gql`
    mutation UpdatePost($parameters: updatePostParameters!) {
        updatePost(parameters: $parameters) {
            error
            operationResult
        }
    }
`
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options)
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>
export const VoteDocument = gql`
    mutation Vote($parameters: voteParameters!) {
        vote(parameters: $parameters) {
            error
            operationResult
        }
    }
`
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options)
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>
export const FetchPostDocument = gql`
    query FetchPost($parameters: fetchPostParameters!) {
        fetchPost(parameters: $parameters) {
            error
            post {
                _id
                title
                description
                points
                voteStatus
                createdAt
                updatedAt
                creator {
                    username
                }
            }
        }
    }
`

/**
 * __useFetchPostQuery__
 *
 * To run a query within a React component, call `useFetchPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostQuery({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useFetchPostQuery(baseOptions: Apollo.QueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options)
}
export function useFetchPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPostQuery, FetchPostQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<FetchPostQuery, FetchPostQueryVariables>(FetchPostDocument, options)
}
export type FetchPostQueryHookResult = ReturnType<typeof useFetchPostQuery>
export type FetchPostLazyQueryHookResult = ReturnType<typeof useFetchPostLazyQuery>
export type FetchPostQueryResult = Apollo.QueryResult<FetchPostQuery, FetchPostQueryVariables>
export const FetchPostsDocument = gql`
    query FetchPosts($parameters: fetchPostsParameters!) {
        fetchPosts(parameters: $parameters) {
            error
            posts {
                _id
                title
                description
                points
                voteStatus
                createdAt
                updatedAt
                creator {
                    username
                }
            }
        }
    }
`

/**
 * __useFetchPostsQuery__
 *
 * To run a query within a React component, call `useFetchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPostsQuery({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useFetchPostsQuery(baseOptions: Apollo.QueryHookOptions<FetchPostsQuery, FetchPostsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<FetchPostsQuery, FetchPostsQueryVariables>(FetchPostsDocument, options)
}
export function useFetchPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPostsQuery, FetchPostsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<FetchPostsQuery, FetchPostsQueryVariables>(FetchPostsDocument, options)
}
export type FetchPostsQueryHookResult = ReturnType<typeof useFetchPostsQuery>
export type FetchPostsLazyQueryHookResult = ReturnType<typeof useFetchPostsLazyQuery>
export type FetchPostsQueryResult = Apollo.QueryResult<FetchPostsQuery, FetchPostsQueryVariables>
export const RequestResetPasswordDocument = gql`
    query RequestResetPassword($parameters: requestResetPasswordParameters!) {
        requestResetPassword(parameters: $parameters) {
            error
            operationResult
        }
    }
`

/**
 * __useRequestResetPasswordQuery__
 *
 * To run a query within a React component, call `useRequestResetPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestResetPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestResetPasswordQuery({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useRequestResetPasswordQuery(baseOptions: Apollo.QueryHookOptions<RequestResetPasswordQuery, RequestResetPasswordQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<RequestResetPasswordQuery, RequestResetPasswordQueryVariables>(RequestResetPasswordDocument, options)
}
export function useRequestResetPasswordLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<RequestResetPasswordQuery, RequestResetPasswordQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<RequestResetPasswordQuery, RequestResetPasswordQueryVariables>(RequestResetPasswordDocument, options)
}
export type RequestResetPasswordQueryHookResult = ReturnType<typeof useRequestResetPasswordQuery>
export type RequestResetPasswordLazyQueryHookResult = ReturnType<typeof useRequestResetPasswordLazyQuery>
export type RequestResetPasswordQueryResult = Apollo.QueryResult<RequestResetPasswordQuery, RequestResetPasswordQueryVariables>
export const SigninDocument = gql`
    query Signin($parameters: signinParameters!) {
        signin(parameters: $parameters) {
            error
            accessToken
            userDetails {
                _id
                username
            }
        }
    }
`

/**
 * __useSigninQuery__
 *
 * To run a query within a React component, call `useSigninQuery` and pass it any options that fit your needs.
 * When your component renders, `useSigninQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSigninQuery({
 *   variables: {
 *      parameters: // value for 'parameters'
 *   },
 * });
 */
export function useSigninQuery(baseOptions: Apollo.QueryHookOptions<SigninQuery, SigninQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useQuery<SigninQuery, SigninQueryVariables>(SigninDocument, options)
}
export function useSigninLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SigninQuery, SigninQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions }
    return Apollo.useLazyQuery<SigninQuery, SigninQueryVariables>(SigninDocument, options)
}
export type SigninQueryHookResult = ReturnType<typeof useSigninQuery>
export type SigninLazyQueryHookResult = ReturnType<typeof useSigninLazyQuery>
export type SigninQueryResult = Apollo.QueryResult<SigninQuery, SigninQueryVariables>
