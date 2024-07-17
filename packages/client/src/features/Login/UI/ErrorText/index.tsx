import { FC } from 'react';
import { Text } from 'shared/UI';

interface ErrorTextProps {
	text: string;
}

export const ErrorText: FC<ErrorTextProps> = ({ text }) => {
	return <Text small>{text}</Text>;
};
