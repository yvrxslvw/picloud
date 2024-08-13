import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface LoginInputProps {
	data: { login: string; password: string };
	setData: Dispatch<SetStateAction<{ login: string; password: string }>>;
}

export const LoginInput: FC<LoginInputProps> = ({ data, setData }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const login = e.target.value;
		setData({ ...data, login });
	};

	return <Input label='Логин' placeholder='Введите Ваш логин' value={data.login} onChange={onChangeHandler} />;
};
