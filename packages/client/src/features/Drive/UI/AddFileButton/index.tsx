import { ChangeEvent, FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FileLoader } from 'shared/UI';
import cl from './style.module.scss';
import { useAddFilesMutation } from 'shared/api';
import { useLocation } from 'react-router-dom';
import { UserSlice } from 'app/store';
import { useAppDispatch } from 'shared/hooks';
import { isServerError } from 'shared/utils';
import { usePopup } from 'entities/Popup';

interface AddFileButtonProps {
	filesRefetch: () => void;
}

export const AddFileButton: FC<AddFileButtonProps> = ({ filesRefetch }) => {
	const { createPopup } = usePopup();
	const [addFile, { data, error }] = useAddFilesMutation();
	const path = decodeURI(useLocation().pathname).split('/').slice(2).join('/');
	const { update } = UserSlice.actions;
	const dispatch = useAppDispatch();

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): boolean => {
		const uploadedFiles = e.target.files;
		if (!uploadedFiles) return false;
		const formData = new FormData();
		for (const file of uploadedFiles) formData.append('files', file, encodeURI(file.name));
		formData.append('uploadPath', path);
		addFile(formData);
		return true;
	};

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
