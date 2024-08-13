import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, className, loading, ...props }) => {
	return (
		<button className={cn(cl.Button, className)} disabled={loading} {...props}>
			{children}
		</button>
	);
};
