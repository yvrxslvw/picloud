import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface LoginInputProps {
	data: { image: File | null; login: string; password: string; passwordConfirm: string };
	setData: Dispatch<SetStateAction<{ image: File | null; login: string; password: string; passwordConfirm: string }>>;
}

export const LoginInput: FC<LoginInputProps> = ({ data, setData }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const login = e.target.value;
		setData({ ...data, login });
	};

	return <Input label='Логин' placeholder='Введите новый логин' value={data.login} onChange={onChangeHandler} />;
};
