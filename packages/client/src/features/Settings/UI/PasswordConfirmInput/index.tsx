import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { Input } from 'shared/UI';

interface PasswordConfirmInputProps {
	data: { image: File | null; login: string; password: string; passwordConfirm: string };
	setData: Dispatch<SetStateAction<{ image: File | null; login: string; password: string; passwordConfirm: string }>>;
}

export const PasswordConfirmInput: FC<PasswordConfirmInputProps> = ({ data, setData }) => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const passwordConfirm = e.target.value;
		setData({ ...data, passwordConfirm });
	};

	return (
		<Input
			label='Подтверждение нового пароля'
			type='password'
			placeholder='Введите заново новый пароль'
			value={data.passwordConfirm}
			onChange={onChangeHandler}
		/>
	);
};
