import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface LoginInputProps {
	login: string;
	setLogin: Dispatch<SetStateAction<string>>;
}

export const LoginInput: FC<LoginInputProps> = ({ login, setLogin }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setLogin(value);
	};

	return <Input label='Логин' placeholder='Введите Ваш логин' value={login} onChange={onChangeHandler} />;
};
