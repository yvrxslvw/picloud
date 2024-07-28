import { FC, HTMLAttributes, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { Table } from 'shared/UI';
import { FileItem } from 'entities/File';
import cl from './style.module.scss';

interface DriveMainWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export const DriveMainWidget: FC<DriveMainWidgetProps> = ({ className, ...props }) => {
	const widgetRef = useRef<HTMLDivElement>(null);

	const onContextHandler = (e: MouseEvent) => {
		e.preventDefault();

		// eslint-disable-next-line no-console
		console.log('there\'ll be widget context menu');
	};

	useEffect(() => {
		widgetRef.current?.addEventListener('contextmenu', onContextHandler);

		return () => widgetRef.current?.removeEventListener('contextmenu', onContextHandler);
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
		</div>
	);
};
