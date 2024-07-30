import { ChangeEvent, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FileLoader } from 'shared/UI';
import cl from './style.module.scss';

interface AddFileButtonProps {}

export const AddFileButton: FC<AddFileButtonProps> = () => {
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): boolean => {
		const files = e.target.files;
		if (!files) return false;
		let str = '';
		for (const file of files) str += file.name + ' ';
		console.log(str.trim());
		return true;
	};

	return (
		<FileLoader
			className={cl.Loader}
			inputElement={
				<p className={cl.AddFileButton}>
					<FontAwesomeIcon icon={faPlus} />
				</p>
			}
			onChange={onChangeHandler}
			multiple
		/>
	);
};
