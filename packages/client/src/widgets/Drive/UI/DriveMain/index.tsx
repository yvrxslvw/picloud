import { FC, HTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import { Table } from 'shared/UI';
import { AddFileButton, FileContext, FileFeature, WidgetContext } from 'features/Drive';
import cl from './style.module.scss';
import { useContextMenu } from 'widgets/Drive/lib';
import { useReadQuery } from 'shared/api';
import { IFile } from 'shared/models';

interface DriveMainWidgetProps extends HTMLAttributes<HTMLDivElement> {
	path: string;
}

export const DriveMainWidget: FC<DriveMainWidgetProps> = ({ path, className, ...props }) => {
	const crumbs = decodeURI(path).split('/').slice(2).join('/');
	const { widgetRef, widgetContextRef, fileContextRef, setSelectedFile, selectedFile } = useContextMenu();
	const [files, setFiles] = useState<IFile[]>([]);
	const { data } = useReadQuery(crumbs);

	useEffect(() => {
		if (data) setFiles(data);
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
							key={new Date(file.modifyTime).getTime()}
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
