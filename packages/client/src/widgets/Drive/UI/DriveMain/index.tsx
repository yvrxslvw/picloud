import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { IFile } from 'shared/models';
import { Table } from 'shared/UI';
import { AddFileButton, FileContext, FileFeature, WidgetContext } from 'features/Drive';
import cl from './style.module.scss';

const files: IFile[] = [
	{ isFolder: true, name: 'папка 1', modifyTime: 1721141062000, size: 0 },
	{ isFolder: true, name: 'папка 2', modifyTime: 1721141043000, size: 0 },
	{ isFolder: true, name: 'папка 3', modifyTime: 1721141023000, size: 0 },
	{ isFolder: true, name: 'папка 4', modifyTime: 1721141049000, size: 0 },
	{ isFolder: true, name: 'папка 5', modifyTime: 1721141065000, size: 0 },
	{ isFolder: true, name: 'папка 6', modifyTime: 1721141076000, size: 0 },
	{ isFolder: false, name: 'файл.exe', modifyTime: 1721141089000, size: 4.39 },
	{ isFolder: false, name: 'файл.txt', modifyTime: 1722189099000, size: 0.01 },
];

interface DriveMainWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export const DriveMainWidget: FC<DriveMainWidgetProps> = ({ className, ...props }) => {
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

	return (
		<div className={cn(cl.DriveMain, className)} ref={widgetRef} {...props}>
			<Table>
				<thead>
					<tr>
						<th></th>
						<th>Название</th>
						<th>Дата модификации</th>
						<th>Размер</th>
					</tr>
				</thead>
				<tbody>
					{files.map(file => (
						<FileFeature
							file={file}
							widgetRef={widgetContextRef}
							contextRef={fileContextRef}
							setSelectedFile={setSelectedFile}
							key={file.modifyTime}
						/>
					))}
				</tbody>
			</Table>

			<AddFileButton />
			<WidgetContext widgetContextRef={widgetContextRef} />
			<FileContext fileContextRef={fileContextRef} selectedFile={selectedFile} />
		</div>
	);
};
