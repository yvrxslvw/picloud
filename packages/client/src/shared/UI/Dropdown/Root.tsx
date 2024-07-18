import { FC, HTMLAttributes, ReactNode, useState } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';
import { timer } from 'shared/utils';

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
	mainElement: ReactNode;
}

export const Root: FC<RootProps> = ({ className, mainElement, children, ...props }) => {
	const [opacity, setOpacity] = useState(0);
	const [display, setDisplay] = useState('none');

	const toggleMenu = async (state: boolean) => {
		if (state) {
			setDisplay('block');
			await timer(1);
			setOpacity(1);
		} else {
			setOpacity(0);
			await timer(200);
			setDisplay('none');
		}
	};

	const onClickHandler = async () => {
		await toggleMenu(opacity === 0);
	};

	return (
		<div className={cn(cl.DropdownRoot, className)} {...props}>
			<span className={cl.MainElement} onClick={onClickHandler}>
				{mainElement}
			</span>

			{opacity === 1 && <div className={cl.CloseArea} onClick={onClickHandler} />}

			<div className={cl.Menu} style={{ opacity, display }}>
				{children}
			</div>
		</div>
	);
};
