import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface PasswordInputProps {
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
}

export const PasswordInput: FC<PasswordInputProps> = ({ password, setPassword }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
	};

	return (
		<Input
			label='Новый пароль'
			type='password'
			placeholder='Введите новый пароль'
			value={password}
			onChange={onChangeHandler}
		/>
	);
};
