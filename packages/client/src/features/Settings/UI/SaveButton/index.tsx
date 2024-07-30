import { usePopup } from 'entities/Popup';
import { FC } from 'react';
import { Button } from 'shared/UI';

interface SaveButtonProps {
	image: File | null;
	login: string;
	password: string;
	passwordConfirm: string;
}

export const SaveButton: FC<SaveButtonProps> = ({ image, login, password, passwordConfirm }) => {
	const { createPopup } = usePopup();

	const onClickHandler = () => {
		createPopup(`${image ? image.name : 'no photo'} | ${login} | ${password} | ${passwordConfirm}`);
	};

	return <Button onClick={onClickHandler}>Сохранить</Button>;
};
