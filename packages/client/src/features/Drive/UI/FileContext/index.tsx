import { FC, RefObject } from 'react';
import cl from './style.module.scss';
import { Context } from 'shared/UI';
import { IFile } from 'shared/models';

interface FileContextProps {
	fileContextRef: RefObject<HTMLUListElement>;
	selectedFile: IFile | undefined;
}

export const FileContext: FC<FileContextProps> = ({ fileContextRef, selectedFile }) => {
	const onRenameHandler = () => {
		console.log('rename', selectedFile?.name);
	};

	const onDeleteHandler = () => {
		console.log('delete', selectedFile?.name);
	};

	return (
		<Context.Menu className={cl.FileContext} ref={fileContextRef}>
			<Context.Item onClick={onRenameHandler}>Переименовать</Context.Item>
			<Context.Item onClick={onDeleteHandler}>Удалить</Context.Item>
		</Context.Menu>
	);
};
