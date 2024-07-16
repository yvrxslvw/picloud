import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';
import { Text } from 'shared/UI';

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
	return (
		<div className={cn(cl.Footer, className)} {...props}>
			<div className={cl.FooterRow}>
				<Text small>All rights reserved &#169; 2024</Text>
			</div>
		</div>
	);
};
