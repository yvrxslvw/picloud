import { FC, FormEvent, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { Link, Text, Window } from 'shared/UI';
import { ROUTER_PATHS } from 'shared/constants';
import cl from './style.module.scss';

interface RegisterWindowProps extends HTMLAttributes<HTMLDivElement> {
	loginInput: ReactNode;
	passwordInput: ReactNode;
	passwordConfirmInput: ReactNode;
	errorText: ReactNode;
	registerButton: ReactNode;
}

export const RegisterWindow: FC<RegisterWindowProps> = ({
	className,
	loginInput,
	passwordInput,
	passwordConfirmInput,
	errorText,
	registerButton,
	...props
}) => {
	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<Window title='Регистрация' className={cn(cl.RegisterWindow, className)} {...props}>
			<form onSubmit={onSubmitHandler}>
				<div className={cn(cl.FeatureElement, cl.LargeMargin)}>{loginInput}</div>
				<div className={cn(cl.FeatureElement, cl.LargeMargin)}>{passwordInput}</div>
				<div className={cn(cl.FeatureElement, cl.SmallMargin)}>{passwordConfirmInput}</div>
				<div className={cn(cl.FeatureElement, cl.SmallMargin, cl.ErrorMessage)}>{errorText}</div>
				<div className={cn(cl.FeatureElement, cl.SmallMargin, cl.ButtonBody)}>{registerButton}</div>
			</form>
			<Text small dark className={cl.AuthLink}>
				Уже есть аккаунт? <Link to={ROUTER_PATHS.LOGIN_PAGE}>Авторизация</Link>
			</Text>
		</Window>
	);
};
