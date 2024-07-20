import { FC, HTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { Table } from 'shared/UI';
import { FileItem } from 'entities/File';
import cl from './style.module.scss';

interface DriveMainWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export const DriveMainWidget: FC<DriveMainWidgetProps> = ({ className, ...props }) => {
	return (
		<div className={cn(cl.DriveMain, className)} {...props}>
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
