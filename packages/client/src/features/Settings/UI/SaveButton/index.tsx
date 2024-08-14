import { UserSlice } from 'app/store';
import { usePopup } from 'entities/Popup';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useUpdateMutation } from 'shared/api';
import { useAppDispatch } from 'shared/hooks';
import { LoginRegex, PasswordRegex } from 'shared/regex';
import { Button } from 'shared/UI';
import { isServerError } from 'shared/utils';

interface SaveButtonProps {
	data: { image: File | null; login: string; password: string; passwordConfirm: string };
	setData: Dispatch<SetStateAction<{ image: File | null; login: string; password: string; passwordConfirm: string }>>;
}

export const SaveButton: FC<SaveButtonProps> = ({ data, setData }) => {
	const { createPopup } = usePopup();
	const [updateUser, { data: updateUserData, error: updateUserError, isLoading: updateUserIsLoading }] =
		useUpdateMutation();
	const { update } = UserSlice.actions;
	const dispatch = useAppDispatch();

	const onClickHandler = () => {
		if (!data.login.match(LoginRegex)) return createPopup('Некорректный логин.');
		if (data.password && !data.password.match(PasswordRegex)) return createPopup('Пароль слишком простой.');
		if (data.password && data.password !== data.passwordConfirm) return createPopup('Пароли не совпадают.');
		const formData = new FormData();
		data.image && formData.append('profileImage', data.image);
		data.login && formData.append('login', data.login);
		data.password && formData.append('password', data.password);
		updateUser(formData);
	};

	useEffect(() => {
		if (updateUserData) {
			dispatch(update(updateUserData));
			createPopup('Изменения успешно сохранены!');
			setData({
				image: null,
				login: data.login,
				password: '',
				passwordConfirm: '',
			});
		}
	}, [updateUserData]);

	useEffect(() => {
		if (isServerError(updateUserError)) createPopup(updateUserError.data.message);
	}, [updateUserError]);

	return (
		<Button onClick={onClickHandler} loading={updateUserIsLoading}>
			Сохранить
		</Button>
	);
};
