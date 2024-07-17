import { FC } from 'react';
import { Text } from 'shared/UI';

interface ErrorTextProps {
	error: string;
}

export const ErrorText: FC<ErrorTextProps> = ({ error }) => {
	return <Text small>{error}</Text>;
};
