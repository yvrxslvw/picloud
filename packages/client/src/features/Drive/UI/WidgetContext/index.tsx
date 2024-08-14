import { ChangeEvent, Dispatch, FC, RefObject, SetStateAction, useEffect } from 'react';
import { Context, FileLoader } from 'shared/UI';
import { usePopup } from 'entities/Popup';
import cl from './style.module.scss';
import { useAddFilesMutation } from 'shared/api';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks';
import { UserSlice } from 'app/store';
import { isServerError } from 'shared/utils';

interface WidgetContextProps {
	widgetContextRef: RefObject<HTMLUListElement>;
	filesRefetch: () => void;
	showCreateFolderModal: Dispatch<SetStateAction<boolean>>;
}

export const WidgetContext: FC<WidgetContextProps> = ({ widgetContextRef, filesRefetch, showCreateFolderModal }) => {
	const { createPopup } = usePopup();
	const [addFile, { data: addFileData, error: addFileError }] = useAddFilesMutation();
	const path = decodeURI(useLocation().pathname).split('/').slice(2).join('/');
	const { update } = UserSlice.actions;
	const dispatch = useAppDispatch();

	const onCreateFolderHandler = () => {
		showCreateFolderModal(true);
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): boolean => {
		const files = e.target.files;
		if (!files) return false;
		const formData = new FormData();
		for (const file of files) formData.append('files', file, encodeURI(file.name));
		formData.append('uploadPath', path);
		addFile(formData);
		return true;
	};

	useEffect(() => {
		if (addFileData) {
			dispatch(update(addFileData));
			filesRefetch();
			createPopup('Успешно загружено!');
		}
	}, [addFileData]);

	useEffect(() => {
		if (isServerError(addFileError)) createPopup(addFileError.data.message);
	}, [addFileError]);

	return (
		<Context.Menu className={cl.WidgetContext} ref={widgetContextRef}>
			<Context.Item onClick={onCreateFolderHandler}>Создать папку</Context.Item>
			<FileLoader
				className={cl.Loader}
				inputElement={<Context.Item>Добавить файл</Context.Item>}
				onChange={onChangeHandler}
				multiple
			/>
		</Context.Menu>
	);
};
