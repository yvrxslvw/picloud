import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { IFile } from 'shared/models';
import { Table } from 'shared/UI';
import { AddFileButton, FileContext, FileFeature, WidgetContext } from 'features/Drive';
import cl from './style.module.scss';
import { useContextMenu } from 'widgets/Drive/lib';

const files: IFile[] = [
	{ isFolder: true, name: 'папка 1', modifyTime: 1721141062000, size: 0 },
	{ isFolder: true, name: 'папка 2', modifyTime: 1721141043000, size: 0 },
	{ isFolder: true, name: 'папка 3', modifyTime: 1721141023000, size: 0 },
	{ isFolder: true, name: 'папка 4', modifyTime: 1721141049000, size: 0 },
	{ isFolder: true, name: 'папка 5', modifyTime: 1721141065000, size: 0 },
	{ isFolder: true, name: 'папка 6', modifyTime: 1721141076000, size: 0 },
	{ isFolder: false, name: 'файл.exe', modifyTime: 1721141089000, size: 4.39 },
];

interface DriveMainWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export const DriveMainWidget: FC<DriveMainWidgetProps> = ({ className, ...props }) => {
	const { widgetRef, widgetContextRef, fileContextRef, setSelectedFile, selectedFile } = useContextMenu();

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
