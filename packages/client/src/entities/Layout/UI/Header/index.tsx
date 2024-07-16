import { FC, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Logo } from 'shared/UI';
import cl from './style.module.scss';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
	return (
		<div className={cn(cl.Header, className)} {...props}>
			<div className={cl.HeaderRow}>
				<Link to='/'>
					<Logo />
				</Link>
			</div>
		</div>
	);
};
