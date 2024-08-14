import { FC, useState } from 'react';
import { RegisterWindow } from 'entities/Register';
import { LoginInput, PasswordConfirmInput, PasswordInput, RegisterButton } from 'features/Register';
import cl from './style.module.scss';

interface RegisterFormWidgetProps {}

export const RegisterFormWidget: FC<RegisterFormWidgetProps> = () => {
	const [data, setData] = useState({
		login: '',
		password: '',
		passwordConfirm: '',
	});

	return (
		<div className={cl.RegisterForm}>
			<RegisterWindow
				loginInput={<LoginInput data={data} setData={setData} />}
				passwordInput={<PasswordInput data={data} setData={setData} />}
				passwordConfirmInput={<PasswordConfirmInput data={data} setData={setData} />}
				registerButton={<RegisterButton data={data} />}
			/>
		</div>
	);
};
