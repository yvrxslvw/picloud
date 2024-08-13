export const convertFileSize = (size: number) => {
	return (size / Math.pow(1024, 1)).toFixed(2);
};
