import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';
import { FileLoader } from 'shared/UI';
import cl from './style.module.scss';
import { usePopup } from 'entities/Popup';

interface ProfileImageLoaderProps {
	setImage: Dispatch<SetStateAction<File | null>>;
}

export const ProfileImageLoader: FC<ProfileImageLoaderProps> = ({ setImage }) => {
	const { createPopup } = usePopup();

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return false;
		const image = e.target.files[0];
		if (!image.type.startsWith('image/')) {
			createPopup('Ошибка. Данный файл не является фотографией.');
			return false;
		}
		setImage(image);
		return true;
	};

	return (
		<>
			<FileLoader
				label='Фотография профиля'
				inputElement={<p className={cl.ProfileImageLoader}>Загрузить</p>}
				accept='image/*'
				showFiles
				onChange={onChangeHandler}
			/>
		</>
	);
};
