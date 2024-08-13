import { FC, useState } from 'react';
import { LoginWindow } from 'entities/Login';
import { AuthButton, LoginInput, PasswordInput } from 'features/Login';
import cl from './style.module.scss';

interface LoginFormWidgetProps {}

export const LoginFormWidget: FC<LoginFormWidgetProps> = () => {
	const [data, setData] = useState({ login: '', password: '' });

	return (
		<div className={cl.LoginForm}>
			<LoginWindow
				loginInput={<LoginInput data={data} setData={setData} />}
				passwordInput={<PasswordInput data={data} setData={setData} />}
				authButton={<AuthButton data={data} />}
			/>
		</div>
	);
};
