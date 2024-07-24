import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface UserCreate {
    name: string;
    email: string;
    password: string;
}

interface Message {
    message: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface UserResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    message?: string;
}

const userApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        credentials: 'include', // Ensure cookies are included in requests
    }),
    tagTypes: ['User'],
    endpoints(builder) {
        return {
            getUser: builder.query<UserResponse, number>({
                query: (id) => ({
                    url: `/users/${id}`,
                    method: 'GET',
                }),
                providesTags: (result, error, id) => [{ type: 'User', id }],
            }),
            loginUser: builder.mutation<UserResponse, LoginRequest>({
                query: (credentials) => ({
                    url: '/users/login',
                    method: 'POST',
                    body: credentials,
                }),
            }),
            signupUser: builder.mutation<Message, UserCreate>({
                query: (user) => ({
                    url: '/users/signup',
                    method: 'POST',
                    body: user,
                }),
                invalidatesTags: [{ type: 'User', id: 'LIST' }],
            }),
            updateUser: builder.mutation<UserResponse, { id: number; changes: Partial<UserCreate> }>({
                query: ({ id, changes }) => ({
                    url: `/users/${id}`,
                    method: 'PUT',
                    body: changes,
                }),
                invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
            }),
            removeUser: builder.mutation<void, number>({
                query: (id) => ({
                    url: `/users/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: (result, error, id) => [{ type: 'User', id }],
            }),
        };
    },
});

export const { useGetUserQuery, useLoginUserMutation, useSignupUserMutation, useUpdateUserMutation, useRemoveUserMutation } = userApi;
export { userApi };
