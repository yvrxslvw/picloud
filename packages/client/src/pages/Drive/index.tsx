import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import { Table } from 'shared/UI';

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
					<tr>
						<td><FontAwesomeIcon icon={faFolder} /></td>
						<td>кусь</td>
						<td>16.07.2024 в 17:44</td>
						<td>-</td>
					</tr>
					<tr>
						<td><FontAwesomeIcon icon={faFile} /></td>
						<td>кусь.exe</td>
						<td>16.07.2024 в 17:44</td>
						<td>290 ГБ</td>
					</tr>
					<tr>
						<td><FontAwesomeIcon icon={faFile} /></td>
						<td>кусь.exe</td>
						<td>16.07.2024 в 17:44</td>
						<td>290 ГБ</td>
					</tr>
				</tbody>
			</Table>
		</>
	);
};
