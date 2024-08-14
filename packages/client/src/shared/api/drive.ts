import { createApi } from '@reduxjs/toolkit/query/react';
import { IFile } from 'shared/models';
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
	}),
});

export const { useReadQuery } = DriveApi;
