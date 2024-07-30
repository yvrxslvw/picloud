import { useEffect, useRef, useState } from 'react';
import { IFile } from 'shared/models';

export const useContextMenu = () => {
	const widgetRef = useRef<HTMLDivElement>(null);
	const widgetContextRef = useRef<HTMLUListElement>(null);
	const fileContextRef = useRef<HTMLUListElement>(null);
	const [selectedFile, setSelectedFile] = useState<IFile>();

	const onWidgetContextMenuHandler = (e: MouseEvent) => {
		e.preventDefault();

		if (!widgetContextRef.current || !fileContextRef.current) return;
		fileContextRef.current.style.display = 'none';
		widgetContextRef.current.style.display = 'block';
		widgetContextRef.current.style.top = `${e.clientY + window.scrollY + 10}px`;
		widgetContextRef.current.style.left = `${e.clientX + 10}px`;
	};

	const onDocumentClickHandler = () => {
		if (!widgetContextRef.current || !fileContextRef.current) return;
		widgetContextRef.current.style.display = 'none';
		fileContextRef.current.style.display = 'none';
	};

	useEffect(() => {
		widgetRef.current?.addEventListener('contextmenu', onWidgetContextMenuHandler);
		document.addEventListener('click', onDocumentClickHandler);

		return () => {
			widgetRef.current?.removeEventListener('contextmenu', onWidgetContextMenuHandler);
			document.removeEventListener('click', onDocumentClickHandler);
		};
	}, []);

	return { widgetRef, widgetContextRef, fileContextRef, setSelectedFile, selectedFile };
};
