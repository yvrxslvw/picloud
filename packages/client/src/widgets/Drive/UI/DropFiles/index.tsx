import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { usePopup } from 'entities/Popup';
import cl from './style.module.scss';

interface DropFilesWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export const DropFilesWidget: FC<DropFilesWidgetProps> = ({ className, style, ...props }) => {
	const [display, setDisplay] = useState('none');
	const { createPopup } = usePopup();

	const preventDefaults = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const highlight = (state: boolean) => {
		setDisplay(state ? 'flex' : 'none');
	};

	const onDropHandler = (e: DragEvent) => {
		if (!e.dataTransfer) return;
		const files = e.dataTransfer.files;
		const str = [];
		for (const file of files) str.push(file.name);
		createPopup(str.join(', '));
	};

	useEffect(() => {
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
			document.body.addEventListener(event, preventDefaults as EventListener, false);
		});
		['dragenter', 'dragover'].forEach(event => {
			document.body.addEventListener(event, () => highlight(true), false);
		});
		['dragleave', 'drop'].forEach(event => {
			document.body.addEventListener(event, () => highlight(false), false);
		});
		document.body.addEventListener('drop', onDropHandler, false);

		return () => {
			['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
				document.body.removeEventListener(event, preventDefaults as EventListener, false);
			});
			['dragenter', 'dragover'].forEach(event => {
				document.body.removeEventListener(event, () => highlight(true), false);
			});
			['dragleave', 'drop'].forEach(event => {
				document.body.removeEventListener(event, () => highlight(false), false);
			});
			document.body.removeEventListener('drop', onDropHandler, false);
		};
	}, []);

	return (
		<div className={cn(cl.DropFilesWidget, className)} style={{ ...style, display }} {...props}>
			<div className={cl.Window}>
				<h2>Загрузка файлов</h2>
				<p>Чтобы начать загрузку файлов - перетащите сюда файлы и отпустите.</p>
				<section>
					<FontAwesomeIcon icon={faFileCirclePlus} className={cl.Icon} />
				</section>
			</div>
		</div>
	);
};
