interface ServerException {
	message: string;
	error: string;
	statusCode: number;
}

export const isServerError = (error: unknown): error is { data: ServerException } => {
	return (
		typeof error === 'object' &&
		error != null &&
		'data' in error &&
		typeof (error as { data: ServerException }).data.message === 'string' &&
		typeof (error as { data: ServerException }).data.error === 'string' &&
		typeof (error as { data: ServerException }).data.statusCode === 'number'
	);
};
