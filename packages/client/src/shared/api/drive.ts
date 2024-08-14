import { createApi } from '@reduxjs/toolkit/query/react';
import { IFile, IUser } from 'shared/models';
import { baseQuery } from './baseQuery';

export interface MoveFilesRequest {
	source: string;
	dist: string;
}

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
		createFolder: builder.mutation<IUser, string>({
			query: path => ({
				url: '/drive/folder',
				method: 'POST',
				body: {
					path,
				},
			}),
		}),
		moveFiles: builder.mutation<IUser, MoveFilesRequest>({
			query: body => ({
				url: '/drive',
				method: 'PUT',
				body,
			}),
		}),
	}),
});

export const {
	useReadQuery,
	useAddFilesMutation,
	useDeleteFilesMutation,
	useCreateFolderMutation,
	useMoveFilesMutation,
} = DriveApi;
