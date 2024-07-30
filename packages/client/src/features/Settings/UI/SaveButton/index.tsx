import { usePopup } from 'entities/Popup';
import { FC } from 'react';
import { LoginRegex, PasswordRegex } from 'shared/regex';
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
		if (!login.match(LoginRegex)) return createPopup('Некорректный логин.');
		if (password && !password.match(PasswordRegex)) return createPopup('Пароль слишком простой.');
		if (password && password !== passwordConfirm) return createPopup('Пароли не совпадают.');

		createPopup(`${image ? image.name : 'no photo'} | ${login} | ${password} | ${passwordConfirm}`);
	};

	return <Button onClick={onClickHandler}>Сохранить</Button>;
};
