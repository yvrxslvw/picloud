import { FC, HTMLAttributes, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { Context, Table } from 'shared/UI';
import { FileItem } from 'entities/File';
import cl from './style.module.scss';

interface DriveMainWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export const DriveMainWidget: FC<DriveMainWidgetProps> = ({ className, ...props }) => {
	const widgetRef = useRef<HTMLDivElement>(null);
	const contextRef = useRef<HTMLUListElement>(null);

	const onWidgetHandler = (e: MouseEvent) => {
		e.preventDefault();

		if (!contextRef.current) return;
		contextRef.current.style.display = 'block';
		contextRef.current.style.top = `${e.clientY + 10}px`;
		contextRef.current.style.left = `${e.clientX + 10}px`;
	};

	const onContextHandler = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const onDocumentHandler = () => {
		if (!contextRef.current) return;
		contextRef.current.style.display = 'none';
	};

	useEffect(() => {
		widgetRef.current?.addEventListener('contextmenu', onWidgetHandler);
		contextRef.current?.addEventListener('click', onContextHandler);
		document.addEventListener('click', onDocumentHandler);

		return () => {
			widgetRef.current?.removeEventListener('contextmenu', onWidgetHandler);
			contextRef.current?.removeEventListener('click', onContextHandler);
			document.removeEventListener('click', onDocumentHandler);
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
					<FileItem file={{ isFolder: true, name: 'папка', modifyTime: '07.16.2024 17:44:25', size: 0 }} />
					<FileItem file={{ isFolder: true, name: 'папка', modifyTime: '07.16.2024 17:44:25', size: 0 }} />
					<FileItem file={{ isFolder: false, name: 'файл.exe', modifyTime: '07.16.2024 17:44:25', size: 4.39 }} />
				</tbody>
			</Table>

			<button className={cl.AddFileButton}>
				<FontAwesomeIcon icon={faPlus} />
			</button>

			<Context.Menu className={cl.Context} ref={contextRef}>
				<Context.Item>Создать папку</Context.Item>
				<Context.Item>Добавить файл</Context.Item>
			</Context.Menu>
		</div>
	);
};
