import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

interface WindowProps extends HTMLAttributes<HTMLDivElement> {
	title: string;
}

export const Window: FC<WindowProps> = ({ className, children, title, ...props }) => {
	return (
		<div className={cl.Window} {...props}>
			<div className={cl.WindowHeader}>
				<h2>{title}</h2>
			</div>
			<div className={cn(cl.WindowBody, className)}>{children}</div>
		</div>
	);
};
