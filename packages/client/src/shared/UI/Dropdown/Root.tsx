import { FC, HTMLAttributes, ReactNode, useState } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
	mainElement: ReactNode;
}

export const Root: FC<RootProps> = ({ className, mainElement, children, ...props }) => {
	const [isShown, setIsShown] = useState(false);

	const onClickHandler = () => {
		setIsShown(prev => !prev);
	};

	return (
		<div className={cn(cl.DropdownRoot, className)} {...props}>
			<span className={cl.MainElement} onClick={onClickHandler}>
				{mainElement}
			</span>

			<div className={cl.Menu} style={{ opacity: isShown ? 1 : 0 }}>
				{children}
			</div>
		</div>
	);
};
