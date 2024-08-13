import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from 'shared/models';
import { baseQuery } from './baseQuery';

export interface LoginResponse {
	token: string;
	user: IUser;
}

export interface LoginRequest {
	login: string;
	password: string;
}

export const AuthApi = createApi({
	reducerPath: 'api/auth',
	tagTypes: ['auth'],
	baseQuery,
	endpoints: builder => ({
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: body => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useLoginMutation } = AuthApi;
