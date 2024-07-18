import { FC } from 'react';
import { Table } from 'shared/UI';
import { FileItem } from 'entities/File';

export const DrivePage: FC = () => {
	return (
		<>
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
					<FileItem file={{ isFolder: true, name: 'папка с цыплятами', modifyTime: '07.16.2024 17:44:25', size: 0 }} />
					<FileItem file={{ isFolder: false, name: 'тяжелый кусь.exe', modifyTime: '07.16.2024 17:44:25', size: 290 }} />
				</tbody>
			</Table>
		</>
	);
};
