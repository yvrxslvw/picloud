import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ModalWindow } from 'entities/Modal';
import cl from './style.module.scss';
import { Button, Input } from 'shared/UI';
import { FNameRegex } from 'shared/regex';
import { usePopup } from 'entities/Popup';
import { useMoveFilesMutation } from 'shared/api';
import { isServerError } from 'shared/utils';
import { useLocation } from 'react-router-dom';
import { IFile } from 'shared/models';

interface RenameFileModalProps {
	selected: IFile | undefined;
	isShown: boolean;
	setIsShown: Dispatch<SetStateAction<boolean>>;
	filesRefetch: () => void;
}

export const RenameFileModal: FC<RenameFileModalProps> = ({ selected, isShown, setIsShown, filesRefetch }) => {
	const [fileName, setFileName] = useState('');
	const { createPopup } = usePopup();
	const [renameFile, { isSuccess, error, isLoading }] = useMoveFilesMutation();
	const path = decodeURI(useLocation().pathname).split('/').slice(2).join('/');

	const onClickHandler = () => {
		if (!selected) return;
		if (!fileName) return createPopup('Вы оставили поле пустым.');
		if (!FNameRegex.test(fileName))
			return createPopup(`Некорректное название ${selected.isFolder ? 'папки' : 'файла'}.`);
		renameFile({
			source: path ? `${path}/${selected.name}` : selected.name,
			dist: path ? `${path}/${fileName}` : fileName,
		});
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFileName(value);
	};

	const onCloseHandler = () => {
		setIsShown(false);
		setFileName('');
	};

	useEffect(() => {
		if (isSuccess && selected) {
			filesRefetch();
			setIsShown(false);
			setFileName('');
			createPopup(`${selected.isFolder ? 'Папка' : 'Файл'} успешно переименован${selected.isFolder ? 'а' : ''}.`);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isServerError(error)) createPopup(error.data.message);
	}, [error]);

	if (!selected) return;
	return (
		isShown && (
			<ModalWindow title={selected.isFolder ? 'Переименование папки' : 'Переименование файла'} onClose={onCloseHandler}>
				<form className={cl.ModalContent} onSubmit={e => e.preventDefault()}>
					<Input label='Новое название' value={fileName} onChange={onChangeHandler} />
					<Button onClick={onClickHandler} loading={isLoading}>
						Переименовать
					</Button>
				</form>
			</ModalWindow>
		)
	);
};
