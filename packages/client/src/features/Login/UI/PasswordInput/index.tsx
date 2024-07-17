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
			label='Пароль'
			placeholder='Введите Ваш пароль'
			type='password'
			value={password}
			onChange={onChangeHandler}
		/>
	);
};
