import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	small?: boolean;
	large?: boolean;
	dark?: boolean;
}

export const Text: FC<TextProps> = ({ children, className, small, large, dark, ...props }) => {
	return (
		<p className={cn(cl.Text, className, { [cl.Small]: small, [cl.Large]: large, [cl.Dark]: dark })} {...props}>
			{children}
		</p>
	);
};
