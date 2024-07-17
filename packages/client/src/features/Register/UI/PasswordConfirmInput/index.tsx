import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface PasswordConfirmInputProps {
	passwordConfirm: string;
	setPasswordConfirm: Dispatch<SetStateAction<string>>;
}

export const PasswordConfirmInput: FC<PasswordConfirmInputProps> = ({ passwordConfirm, setPasswordConfirm }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPasswordConfirm(value);
	};

	return (
		<Input
			label='Пароль'
			placeholder='Придумайте пароль'
			type='password'
			value={passwordConfirm}
			onChange={onChangeHandler}
		/>
	);
};