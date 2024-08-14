import { Dispatch, FC, RefObject, SetStateAction, useEffect } from 'react';
import { Context } from 'shared/UI';
import { IFile } from 'shared/models';
import { usePopup } from 'entities/Popup';
import cl from './style.module.scss';
import { useDeleteFilesMutation } from 'shared/api';
import { UserSlice } from 'app/store';
import { useAppDispatch } from 'shared/hooks';
import { useLocation } from 'react-router-dom';
import { isServerError } from 'shared/utils';

interface FileContextProps {
	fileContextRef: RefObject<HTMLUListElement>;
	selectedFile: IFile | undefined;
	filesRefetch: () => void;
	showRenameFileModal: Dispatch<SetStateAction<boolean>>;
}

export const FileContext: FC<FileContextProps> = ({
	fileContextRef,
	selectedFile,
	filesRefetch,
	showRenameFileModal,
}) => {
	const { createPopup } = usePopup();
	const [deleteFiles, { data, error }] = useDeleteFilesMutation();
	const { update } = UserSlice.actions;
	const dispatch = useAppDispatch();
	const path = decodeURI(useLocation().pathname).split('/').slice(2).join('/');

	const onRenameHandler = () => {
		showRenameFileModal(true);
	};

	const onDeleteHandler = () => {
		if (!selectedFile) return;
		deleteFiles([path ? `${path}/${selectedFile.name}` : selectedFile.name]);
	};

	useEffect(() => {
		if (data) {
			dispatch(update(data));
			filesRefetch();
			createPopup(selectedFile?.isFolder ? 'Папка успешно удалена.' : 'Файл успешно удалён.');
		}
	}, [data]);

	useEffect(() => {
		if (isServerError(error)) createPopup(error.data.message);
	}, [error]);

	return (
		<Context.Menu className={cl.FileContext} ref={fileContextRef}>
			<Context.Item onClick={onRenameHandler}>Переименовать</Context.Item>
			<Context.Item onClick={onDeleteHandler}>Удалить</Context.Item>
		</Context.Menu>
	);
};
