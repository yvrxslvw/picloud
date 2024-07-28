import { FC, HTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { IFile } from 'shared/models';
import { formatDate } from 'shared/utils';
import cl from './style.module.scss';

interface FileItemProps extends HTMLAttributes<HTMLTableRowElement> {
	file: IFile;
}

export const FileItem: FC<FileItemProps> = ({ file, className, ...props }) => {
	return (
		<tr className={cn(cl.FileItem, className)} {...props}>
			<td className={cl.Icon}>
				<FontAwesomeIcon icon={file.isFolder ? faFolder : faFile} />
			</td>
			<td>{file.name}</td>
			<td>{formatDate(file.modifyTime)}</td>
			<td>{file.size === 0 ? '-' : file.size.toFixed(2) + ' ГБ'}</td>
		</tr>
	);
};
