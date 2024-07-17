import { Dispatch, FC, SetStateAction } from 'react';
import { LoginRegex, PasswordRegex } from 'shared/regex';
import { Button } from 'shared/UI';

interface RegisterButtonProps {
	login: string;
	password: string;
	passwordConfirm: string;
	setError: Dispatch<SetStateAction<string>>;
}

export const RegisterButton: FC<RegisterButtonProps> = ({ login, password, passwordConfirm, setError }) => {
	const onClickHandler = () => {
		if (!login.match(LoginRegex)) return setError('Некорректный логин.');
		if (!password.match(PasswordRegex)) return setError('Пароль слишком простой.');
		if (password !== passwordConfirm) return setError('Пароли не совпадают.');

		setError('reg'); //! tmp
	};

	return (
		<Button type='submit' onClick={onClickHandler}>
			Создать аккаунт
		</Button>
	);
};
