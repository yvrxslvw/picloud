import { FC, TableHTMLAttributes } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

export const Table: FC<TableProps> = ({ className, children, ...props }) => {
	return (
		<table className={cn(cl.Table, className)} {...props}>
			{children}
		</table>
	);
};
