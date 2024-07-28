import { FC, RefObject } from 'react';
import { Context } from 'shared/UI';
import cl from './style.module.scss';

interface WidgetContextProps {
	widgetContextRef: RefObject<HTMLUListElement>;
}

export const WidgetContext: FC<WidgetContextProps> = ({ widgetContextRef }) => {
	const onCreateFolderHandler = () => {
		console.log('create folder');
	};

	const onCreateFileHandler = () => {
		console.log('create file');
	};

	return (
		<Context.Menu className={cl.WidgetContext} ref={widgetContextRef}>
			<Context.Item onClick={onCreateFolderHandler}>Создать папку</Context.Item>
			<Context.Item onClick={onCreateFileHandler}>Добавить файл</Context.Item>
		</Context.Menu>
	);
};
