import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface PasswordInputProps {
	data: { image: File | null; login: string; password: string; passwordConfirm: string };
	setData: Dispatch<SetStateAction<{ image: File | null; login: string; password: string; passwordConfirm: string }>>;
}

export const PasswordInput: FC<PasswordInputProps> = ({ data, setData }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const password = e.target.value;
		setData({ ...data, password });
	};

	return (
		<Input
			label='Новый пароль'
			type='password'
			placeholder='Введите новый пароль'
			value={data.password}
			onChange={onChangeHandler}
		/>
	);
};
