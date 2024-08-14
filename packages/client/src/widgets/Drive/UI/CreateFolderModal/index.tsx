import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ModalWindow } from 'entities/Modal';
import cl from './style.module.scss';
import { Button, Input } from 'shared/UI';
import { FNameRegex } from 'shared/regex';
import { usePopup } from 'entities/Popup';
import { useCreateFolderMutation } from 'shared/api';
import { isServerError } from 'shared/utils';
import { useLocation } from 'react-router-dom';

interface CreateFolderModalProps {
	isShown: boolean;
	setIsShown: Dispatch<SetStateAction<boolean>>;
	filesRefetch: () => void;
}

export const CreateFolderModal: FC<CreateFolderModalProps> = ({ isShown, setIsShown, filesRefetch }) => {
	const [folderName, setFolderName] = useState('');
	const { createPopup } = usePopup();
	const [createFolder, { isSuccess, error, isLoading }] = useCreateFolderMutation();
	const path = decodeURI(useLocation().pathname).split('/').slice(2).join('/');

	const onClickHandler = () => {
		if (!folderName) return createPopup('Вы оставили поле пустым.');
		if (!FNameRegex.test(folderName)) return createPopup('Некорректное название папки.');
		createFolder(path ? `${path}/${folderName}` : folderName);
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFolderName(value);
	};

	const onCloseHandler = () => {
		setIsShown(false);
		setFolderName('');
	};

	useEffect(() => {
		if (isSuccess) {
			filesRefetch();
			setIsShown(false);
			setFolderName('');
			createPopup('Папка успешно создана.');
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isServerError(error)) createPopup(error.data.message);
	}, [error]);

	return (
		isShown && (
			<ModalWindow title='Создание папки' onClose={onCloseHandler}>
				<div className={cl.ModalContent}>
					<Input label='Название папки' value={folderName} onChange={onChangeHandler} />
					<Button onClick={onClickHandler} loading={isLoading}>
						Создать папку
					</Button>
				</div>
			</ModalWindow>
		)
	);
};
