import { FC } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import cn from 'classnames';
import cl from './style.module.scss';

interface LinkProps extends RouterLinkProps {
	
}

export const Link: FC<LinkProps> = ({ className, children, ...props }) => {
	return (
		<RouterLink className={cn(cl.Link, className)} {...props}>
			{children}
		</RouterLink>
	);
};
