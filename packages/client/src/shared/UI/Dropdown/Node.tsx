import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

export interface NodeProps extends HTMLAttributes<HTMLDivElement> {
	content: string;
	onClick: () => void;
}

export const Node: FC<NodeProps> = ({ className, content, onClick, ...props }) => {
	return (
		<div className={cn(cl.DropdownNode, className)} onClick={onClick} {...props}>
			<p>{content}</p>
		</div>
	);
};
