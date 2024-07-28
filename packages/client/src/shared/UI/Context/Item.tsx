import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

export interface ItemProps extends HTMLAttributes<HTMLLIElement> {}

export const Item: FC<ItemProps> = ({ className, children, ...props }) => {
	return (
		<li className={cn(cl.Item, className)} {...props}>
			{children}
		</li>
	);
};
