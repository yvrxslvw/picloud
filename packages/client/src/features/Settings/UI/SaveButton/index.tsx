import { FC } from 'react';
import { Button } from 'shared/UI';

interface SaveButtonProps {
	image: File | null;
	login: string;
	password: string;
	passwordConfirm: string;
}

export const SaveButton: FC<SaveButtonProps> = ({ image, login, password, passwordConfirm }) => {
	const onClickHandler = () => {
		console.log(image?.name, login, password, passwordConfirm);
	};

	return <Button onClick={onClickHandler}>Сохранить</Button>;
};
