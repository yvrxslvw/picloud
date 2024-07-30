import { usePopup } from 'entities/Popup';
import { FC } from 'react';
import { LoginRegex, PasswordRegex } from 'shared/regex';
import { Button } from 'shared/UI';

interface RegisterButtonProps {
	login: string;
	password: string;
	passwordConfirm: string;
}

export const RegisterButton: FC<RegisterButtonProps> = ({ login, password, passwordConfirm }) => {
	const { createPopup } = usePopup();

	const onClickHandler = () => {
		if (!login.match(LoginRegex)) return createPopup('Некорректный логин.');
		if (!password.match(PasswordRegex)) return createPopup('Пароль слишком простой.');
		if (password !== passwordConfirm) return createPopup('Пароли не совпадают.');

		createPopup('reg'); //! tmp
	};

	return (
		<Button type='submit' onClick={onClickHandler}>
			Создать аккаунт
		</Button>
	);
};
