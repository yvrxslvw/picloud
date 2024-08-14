import { UserSlice } from 'app/store';
import { usePopup } from 'entities/Popup';
import { FC, useEffect } from 'react';
import { useRegisterMutation } from 'shared/api';
import { useAppDispatch } from 'shared/hooks';
import { LoginRegex, PasswordRegex } from 'shared/regex';
import { Button } from 'shared/UI';
import { isServerError } from 'shared/utils';

interface RegisterButtonProps {
	data: { login: string; password: string; passwordConfirm: string };
}

export const RegisterButton: FC<RegisterButtonProps> = ({ data }) => {
	const { createPopup } = usePopup();
	const [registerUser, { data: registerUserData, error: registerUserError, isLoading: registerUserIsLoading }] =
		useRegisterMutation();
	const { login } = UserSlice.actions;
	const dispatch = useAppDispatch();

	const onClickHandler = () => {
		if (!data.login.match(LoginRegex)) return createPopup('Некорректный логин.');
		if (!data.password.match(PasswordRegex)) return createPopup('Пароль слишком простой.');
		if (data.password !== data.passwordConfirm) return createPopup('Пароли не совпадают.');
		const { login, password } = data;
		registerUser({ login, password });
	};

	useEffect(() => {
		if (registerUserData) {
			dispatch(login(registerUserData));
		}
	}, [registerUserData]);

	useEffect(() => {
		if (isServerError(registerUserError)) createPopup(registerUserError.data.message);
	}, [registerUserError]);

	return (
		<Button type='submit' onClick={onClickHandler} loading={registerUserIsLoading}>
			Создать аккаунт
		</Button>
	);
};
