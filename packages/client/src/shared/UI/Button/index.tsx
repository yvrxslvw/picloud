import { ButtonHTMLAttributes, FC } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
	return (
		<button className={cn(cl.Button, className)} {...props}>
			{children}
		</button>
	);
};
