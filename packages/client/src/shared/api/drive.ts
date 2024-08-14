import { createApi } from '@reduxjs/toolkit/query/react';
import { IFile, IUser } from 'shared/models';
import { baseQuery } from './baseQuery';

export const DriveApi = createApi({
	reducerPath: 'api/drive',
	tagTypes: ['drive'],
	baseQuery,
	endpoints: builder => ({
		read: builder.query<IFile[], string>({
			query: path => ({
				url: `/drive/${path}`,
				method: 'GET',
			}),
		}),
		addFiles: builder.mutation<IUser, FormData>({
			query: body => ({
				url: '/drive',
				method: 'POST',
				body,
			}),
		}),
		deleteFiles: builder.mutation<IUser, string[]>({
			query: paths => ({
				url: '/drive',
				method: 'DELETE',
				body: {
					paths,
				},
			}),
		}),
	}),
});

export const { useReadQuery, useAddFilesMutation, useDeleteFilesMutation } = DriveApi;
