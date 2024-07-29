import { FC, HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import cl from './style.module.scss';
import { timer } from 'shared/utils';

export interface RootProps extends HTMLAttributes<HTMLDivElement> {
	mainElement: ReactNode;
}

export const Root: FC<RootProps> = ({ className, mainElement, children, ...props }) => {
	const [opacity, setOpacity] = useState(0);
	const [display, setDisplay] = useState('none');
	const dropdownRef = useRef<HTMLSpanElement>(null);

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

	const onClickDropdownHandler = async (e: MouseEvent) => {
		e.stopPropagation();
		await toggleMenu(!opacity);
	};

	const onClickDocumentHandler = async () => {
		await toggleMenu(false);
	};

	useEffect(() => {
		document.addEventListener('click', onClickDocumentHandler);
		dropdownRef.current?.addEventListener('click', onClickDropdownHandler);

		return () => {
			document.removeEventListener('click', onClickDocumentHandler);
			dropdownRef.current?.removeEventListener('click', onClickDropdownHandler);
		};
	}, []);

	return (
		<div className={cn(cl.DropdownRoot, className)} {...props}>
			<span className={cl.MainElement} ref={dropdownRef}>
				{mainElement}
			</span>

			<div className={cl.Menu} style={{ opacity, display }}>
				{children}
			</div>
		</div>
	);
};
