import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface PasswordInputProps {
	data: { login: string; password: string; passwordConfirm: string };
	setData: Dispatch<SetStateAction<{ login: string; password: string; passwordConfirm: string }>>;
}

export const PasswordInput: FC<PasswordInputProps> = ({ data, setData }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const password = e.target.value;
		setData({ ...data, password });
	};

	return (
		<Input
			label='Пароль'
			placeholder='Придумайте пароль'
			type='password'
			value={data.password}
			onChange={onChangeHandler}
		/>
	);
};
