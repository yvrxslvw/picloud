import { Dispatch, FC, SetStateAction } from 'react';
import { Button } from 'shared/UI';

interface AuthButtonProps {
	login: string;
	password: string;
	setErrorText: Dispatch<SetStateAction<string>>;
}

export const AuthButton: FC<AuthButtonProps> = ({ login, password, setErrorText }) => {
	const onClickHandler = () => {
		if (!login) return setErrorText('Неверный логин или пароль.');
		if (!password) return setErrorText('Неверный логин или пароль.');

		setErrorText('Неверный логин или пароль.'); //! tmp
	};

	return (
		<Button type='submit' onClick={onClickHandler}>
			Войти
		</Button>
	);
};
