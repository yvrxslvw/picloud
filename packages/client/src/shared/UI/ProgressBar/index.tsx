import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
	red?: boolean;
	progress: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ className, red, progress, ...props }) => {
	return (
		<div className={cn(cl.ProgressBar, className, { [cl.Red]: red })} {...props}>
			<div className={cl.Progress} style={{ width: progress + '%' }} />
		</div>
	);
};
