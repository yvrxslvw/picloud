import { Dispatch, FC, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { IFile } from 'shared/models';
import { FileItem } from 'entities/File';

interface FileFeatureProps {
	file: IFile;
	widgetRef: RefObject<HTMLUListElement>;
	contextRef: RefObject<HTMLUListElement>;
	setSelectedFile: Dispatch<SetStateAction<IFile | undefined>>;
}

export const FileFeature: FC<FileFeatureProps> = ({ file, widgetRef, contextRef, setSelectedFile }) => {
	const fileRef = useRef<HTMLTableRowElement>(null);

	const onFileDoubleClickHandler = () => {
		console.log('double click', file.name);
	};

	const onFileContextMenuHandler = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		setSelectedFile(file);

		if (!contextRef.current || !widgetRef.current) return;
		widgetRef.current.style.display = 'none';
		contextRef.current.style.display = 'block';
		contextRef.current.style.top = `${e.clientY + 10}px`;
		contextRef.current.style.left = `${e.clientX + 10}px`;
	};

	useEffect(() => {
		fileRef.current?.addEventListener('dblclick', onFileDoubleClickHandler);
		fileRef.current?.addEventListener('contextmenu', onFileContextMenuHandler);

		return () => {
			fileRef.current?.removeEventListener('dblclick', onFileDoubleClickHandler);
			fileRef.current?.removeEventListener('contextmenu', onFileContextMenuHandler);
		};
	}, []);

	return <FileItem file={file} ref={fileRef} />;
};
