import { FC, forwardRef, HTMLAttributes, Ref, RefAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { IFile } from 'shared/models';
import { convertFileSize, formatDate } from 'shared/utils';
import cl from './style.module.scss';

interface FileItemProps extends HTMLAttributes<HTMLTableRowElement>, RefAttributes<HTMLTableRowElement> {
	file: IFile;
}

export const FileItem: FC<FileItemProps> = forwardRef(
	({ file, className, ...props }, ref: Ref<HTMLTableRowElement>) => {
		return (
			<tr className={cn(cl.FileItem, className)} ref={ref} {...props}>
				<td className={cl.Icon}>
					<FontAwesomeIcon icon={file.isFolder ? faFolder : faFile} />
				</td>
				<td>{file.name}</td>
				<td>{formatDate(file.modifyTime)}</td>
				<td>{file.isFolder ? '-' : convertFileSize(file.size) + ' ГБ'}</td>
			</tr>
		);
	},
);
