import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { API_URL } from 'shared/constants';

const query = fetchBaseQuery({
	baseUrl: API_URL,
	credentials: 'include',
	prepareHeaders(headers) {
		const accessToken = window.localStorage.getItem('accessToken');
		if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
		return headers;
	},
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions,
) => {
	let response = await query(args, api, extraOptions);

	if (response.error) {
		const refreshResponse = await query({ url: '/auth/refresh', method: 'POST' }, api, extraOptions);

		if (
			refreshResponse.data &&
			typeof refreshResponse.data === 'object' &&
			'token' in refreshResponse.data &&
			typeof refreshResponse.data.token === 'string'
		) {
			window.localStorage.setItem('accessToken', refreshResponse.data.token);
			response = await query(args, api, extraOptions);
		}
	}

	return response;
};
