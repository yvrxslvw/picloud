import { UserSlice } from 'app/store';
import { usePopup } from 'entities/Popup';
import { FC, useEffect } from 'react';
import { useLoginMutation } from 'shared/api';
import { useAppDispatch } from 'shared/hooks';
import { Button } from 'shared/UI';
import { isServerError } from 'shared/utils';

interface AuthButtonProps {
	data: { login: string; password: string };
}

export const AuthButton: FC<AuthButtonProps> = ({ data }) => {
	const { createPopup } = usePopup();
	const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading }] = useLoginMutation();
	const { login } = UserSlice.actions;
	const dispatch = useAppDispatch();

	const onClickHandler = () => {
		if (!data.login || !data.password) return createPopup('Неверный логин или пароль.');
		loginUser({ ...data });
	};

	useEffect(() => {
		isServerError(loginError) && createPopup(loginError.data.message);
	}, [loginError]);

	useEffect(() => {
		if (loginData) {
			dispatch(login(loginData));
		}
	}, [loginData]);

	return (
		<Button type='submit' onClick={onClickHandler} loading={loginIsLoading}>
			Войти
		</Button>
	);
};
