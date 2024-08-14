import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface PasswordConfirmInputProps {
	data: { login: string; password: string; passwordConfirm: string };
	setData: Dispatch<SetStateAction<{ login: string; password: string; passwordConfirm: string }>>;
}

export const PasswordConfirmInput: FC<PasswordConfirmInputProps> = ({ data, setData }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const passwordConfirm = e.target.value;
		setData({ ...data, passwordConfirm });
	};

	return (
		<Input
			label='Подтверждение пароля'
			placeholder='Повторите придуманный пароль'
			type='password'
			value={data.passwordConfirm}
			onChange={onChangeHandler}
		/>
	);
};
