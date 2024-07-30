import { usePopup } from 'entities/Popup';
import { FC } from 'react';
import { Button } from 'shared/UI';

interface AuthButtonProps {
	login: string;
	password: string;
}

export const AuthButton: FC<AuthButtonProps> = ({ login, password }) => {
	const { createPopup } = usePopup();

	const onClickHandler = () => {
		if (!login) return createPopup('Неверный логин или пароль.');
		if (!password) return createPopup('Неверный логин или пароль.');

		createPopup('Неверный логин или пароль.'); //! tmp
	};

	return (
		<Button type='submit' onClick={onClickHandler}>
			Войти
		</Button>
	);
};
