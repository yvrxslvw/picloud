import { FC, HTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { Table } from 'shared/UI';
import { IFile } from 'shared/models';
import { useReadQuery } from 'shared/api';
import { AddFileButton, FileContext, FileFeature, WidgetContext } from 'features/Drive';
import { useContextMenu } from 'widgets/Drive/lib';
import cl from './style.module.scss';

interface DriveMainWidgetProps extends HTMLAttributes<HTMLDivElement> {
	path: string;
}

export const DriveMainWidget: FC<DriveMainWidgetProps> = ({ path, className, ...props }) => {
	const crumbs = decodeURI(path).split('/').slice(2).join('/');
	const { widgetRef, widgetContextRef, fileContextRef, setSelectedFile, selectedFile } = useContextMenu();
	const [files, setFiles] = useState<IFile[]>([]);
	const { data, refetch } = useReadQuery(crumbs);

	useEffect(() => {
		if (data) {
			setFiles(data);
			setFiles(prev => prev.toSorted((a, b) => +a.isFolder + +b.isFolder));
		}
	}, [data]);

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
							key={uuidv4()}
						/>
					))}
				</tbody>
			</Table>

			<AddFileButton filesRefetch={refetch} />
			<WidgetContext widgetContextRef={widgetContextRef} filesRefetch={refetch} />
			<FileContext fileContextRef={fileContextRef} selectedFile={selectedFile} filesRefetch={refetch} />
		</div>
	);
};
