import { FC, useState } from 'react';
import { LoginWindow } from 'entities/Login';
import { AuthButton, LoginInput, PasswordInput } from 'features/Login';
import cl from './style.module.scss';

interface LoginFormWidgetProps {}

export const LoginFormWidget: FC<LoginFormWidgetProps> = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className={cl.LoginForm}>
			<LoginWindow
				loginInput={<LoginInput login={login} setLogin={setLogin} />}
				passwordInput={<PasswordInput password={password} setPassword={setPassword} />}
				authButton={<AuthButton login={login} password={password} />}
			/>
		</div>
	);
};
