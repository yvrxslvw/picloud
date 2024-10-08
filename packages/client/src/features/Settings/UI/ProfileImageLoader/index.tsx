import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { FileLoader } from 'shared/UI';
import cl from './style.module.scss';
import { usePopup } from 'entities/Popup';

interface ProfileImageLoaderProps {
	data: { image: File | null; login: string; password: string; passwordConfirm: string };
	setData: Dispatch<SetStateAction<{ image: File | null; login: string; password: string; passwordConfirm: string }>>;
}

export const ProfileImageLoader: FC<ProfileImageLoaderProps> = ({ data, setData }) => {
	const { createPopup } = usePopup();
	const [previewSrc, setPreviewSrc] = useState('');

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return false;
		const image = e.target.files[0];
		if (!image.type.startsWith('image/')) {
			createPopup('Ошибка. Данный файл не является фотографией.');
			return false;
		}
		const reader = new FileReader();
		reader.onload = e => {
			if (!e.target || typeof e.target.result !== 'string') return;
			setPreviewSrc(e.target.result);
		};
		setData({ ...data, image });
		reader.readAsDataURL(image);
		return true;
	};

	return (
		<div className={cl.ProfileFileLoader}>
			<FileLoader
				label='Фотография профиля'
				inputElement={<p className={cl.ProfileImageLoader}>Загрузить</p>}
				accept='image/*'
				showFiles
				onChange={onChangeHandler}
			/>
			{previewSrc && (
				<div className={cl.Image}>
					<img src={previewSrc} />
				</div>
			)}
		</div>
	);
};
