import { ChangeEvent, FC, RefObject } from 'react';
import { Context, FileLoader } from 'shared/UI';
import cl from './style.module.scss';

interface WidgetContextProps {
	widgetContextRef: RefObject<HTMLUListElement>;
}

export const WidgetContext: FC<WidgetContextProps> = ({ widgetContextRef }) => {
	const onCreateFolderHandler = () => {
		console.log('create folder');
	};

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): boolean => {
		const files = e.target.files;
		if (!files) return false;
		let str = '';
		for (const file of files) str += file.name + ' ';
		console.log(str.trim());
		return true;
	};

	return (
		<Context.Menu className={cl.WidgetContext} ref={widgetContextRef}>
			<Context.Item onClick={onCreateFolderHandler}>Создать папку</Context.Item>
			<FileLoader className={cl.Loader} inputElement={<Context.Item>Добавить файл</Context.Item>} onChange={onChangeHandler} multiple />
		</Context.Menu>
	);
};
