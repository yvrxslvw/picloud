import { ChangeEvent, FC, InputHTMLAttributes, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import cl from './style.module.scss';

interface FileLoaderProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	inputElement: ReactNode;
	showFiles?: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => boolean;
}

export const FileLoader: FC<FileLoaderProps> = ({ label, inputElement, showFiles, className, onChange, ...props }) => {
	const [id] = useState(uuidv4());
	const [files, setFiles] = useState('');

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (onChange && !onChange(e)) return;
		const inputFiles = e.target.files;
		const fileList = [];
		if (inputFiles) {
			for (const file of inputFiles) fileList.push(file.name);
			setFiles(fileList.join(', '));
		}
	};

	return (
		<div className={cn(cl.FileLoader, className)}>
			{label && <p className={cl.Label}>{label}</p>}
			<label htmlFor={id}>{inputElement}</label>
			<input id={id} type='file' className={cl.Input} onChange={onChangeHandler} {...props} />
			{files && showFiles && <p className={cl.FileList}>Выбрано: {files}</p>}
		</div>
	);
};
