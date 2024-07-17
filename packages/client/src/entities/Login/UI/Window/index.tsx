import { FC, FormEvent, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { Link, Text, Window } from 'shared/UI';
import cl from './style.module.scss';
import { ROUTER_PATHS } from 'shared/constants';

interface LoginWindowProps extends HTMLAttributes<HTMLDivElement> {
	loginInput: ReactNode;
	passwordInput: ReactNode;
	errorText: ReactNode;
	authButton: ReactNode;
}

export const LoginWindow: FC<LoginWindowProps> = ({
	className,
	loginInput,
	passwordInput,
	errorText,
	authButton,
	...props
}) => {
	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<Window title='Авторизация' className={cn(cl.LoginWindow, className)} {...props}>
			<form onSubmit={onSubmitHandler}>
				<div className={cl.FeatureElement}>{loginInput}</div>
				<div className={cl.FeatureElement}>{passwordInput}</div>
				<div className={cn(cl.FeatureElement, cl.ErrorMessage)}>{errorText}</div>
				<div className={cn(cl.FeatureElement, cl.AuthButton)}>{authButton}</div>
			</form>
			<Text small dark className={cl.RegistrationLink}>
				Нет аккаунта? <Link to={ROUTER_PATHS.REGISTER_PAGE}>Регистрация</Link>
			</Text>
		</Window>
	);
};