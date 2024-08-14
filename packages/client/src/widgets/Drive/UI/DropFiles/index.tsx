import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { usePopup } from 'entities/Popup';
import cl from './style.module.scss';
import { useAddFilesMutation } from 'shared/api';
import { useAppDispatch } from 'shared/hooks';
import { UserSlice } from 'app/store';
import { isServerError } from 'shared/utils';

interface DropFilesWidgetProps extends HTMLAttributes<HTMLDivElement> {
	filesRefetch: () => void;
}

export const DropFilesWidget: FC<DropFilesWidgetProps> = ({ filesRefetch, className, style, ...props }) => {
	const [display, setDisplay] = useState('none');
	const { createPopup } = usePopup();
	const [addFile, { data, error }] = useAddFilesMutation();
	const { update } = UserSlice.actions;
	const dispatch = useAppDispatch();

	const preventDefaults = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const highlight = (state: boolean) => {
		setDisplay(state ? 'flex' : 'none');
	};

	const onDropHandler = (e: DragEvent) => {
		if (!e.dataTransfer) return;
		const uploadedFiles = e.dataTransfer.files;
		const formData = new FormData();
		for (const file of uploadedFiles) formData.append('files', file, encodeURI(file.name));
		formData.append('uploadPath', decodeURI(window.location.pathname.split('/').slice(2).join('/')));
		addFile(formData);
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

	useEffect(() => {
		if (data) {
			dispatch(update(data));
			filesRefetch();
			createPopup('Успешно загружено!');
		}
	}, [data]);

	useEffect(() => {
		if (isServerError(error)) createPopup(error.data.message);
	}, [error]);

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
