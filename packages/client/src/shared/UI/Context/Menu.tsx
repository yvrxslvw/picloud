import { FC, forwardRef, HTMLAttributes, Ref, RefAttributes } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

export interface MenuProps extends HTMLAttributes<HTMLUListElement>, RefAttributes<HTMLUListElement> {}

export const Menu: FC<MenuProps> = forwardRef(({ className, children, ...props }, ref: Ref<HTMLUListElement>) => {
	return (
		<ul className={cn(cl.Menu, className)} ref={ref} {...props}>
			{children}
		</ul>
	);
});
