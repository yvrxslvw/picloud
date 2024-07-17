import { FC, InputHTMLAttributes, useState } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const Input: FC<InputProps> = ({ className, label, type, ...props }) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const onClickHandler = () => {
		setIsPasswordShown(prev => !prev);
	};

	return (
		<div className={cn(cl.Input, className)}>
			<p>{label}</p>
			<input type={type === 'password' ? (isPasswordShown ? 'text' : 'password') : type} {...props} />

			{type === 'password' && (
				<button onClick={onClickHandler} type='button'>
					<FontAwesomeIcon icon={isPasswordShown ? faEye : faEyeSlash} />
				</button>
			)}
		</div>
	);
};
