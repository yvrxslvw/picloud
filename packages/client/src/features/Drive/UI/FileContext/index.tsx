import { FC, RefObject } from 'react';
import { Context } from 'shared/UI';
import { IFile } from 'shared/models';
import { usePopup } from 'entities/Popup';
import cl from './style.module.scss';

interface FileContextProps {
	fileContextRef: RefObject<HTMLUListElement>;
	selectedFile: IFile | undefined;
}

export const FileContext: FC<FileContextProps> = ({ fileContextRef, selectedFile }) => {
	const { createPopup } = usePopup();

	const onRenameHandler = () => {
		createPopup('rename ' + selectedFile?.name);
	};

	const onDeleteHandler = () => {
		createPopup('delete ' + selectedFile?.name);
	};

	return (
		<Context.Menu className={cl.FileContext} ref={fileContextRef}>
			<Context.Item onClick={onRenameHandler}>Переименовать</Context.Item>
			<Context.Item onClick={onDeleteHandler}>Удалить</Context.Item>
		</Context.Menu>
	);
};
