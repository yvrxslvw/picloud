import { FC, useState } from 'react';
import { RegisterWindow } from 'entities/Register';
import { ErrorText, LoginInput, PasswordConfirmInput, PasswordInput, RegisterButton } from 'features/Register';
import cl from './style.module.scss';

interface RegisterFormWidgetProps {}

export const RegisterFormWidget: FC<RegisterFormWidgetProps> = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [errorText, setErrorText] = useState('');

	return (
		<div className={cl.RegisterForm}>
			<RegisterWindow
				loginInput={<LoginInput login={login} setLogin={setLogin} />}
				passwordInput={<PasswordInput password={password} setPassword={setPassword} />}
				passwordConfirmInput={
					<PasswordConfirmInput passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm} />
				}
				errorText={<ErrorText error={errorText} />}
				registerButton={
					<RegisterButton login={login} password={password} passwordConfirm={passwordConfirm} setError={setErrorText} />
				}
			/>
		</div>
	);
};
