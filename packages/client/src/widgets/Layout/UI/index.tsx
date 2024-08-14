import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Popup } from 'entities/Popup';
import { Footer, Header } from 'entities/Layout';
import { API_URL } from 'shared/constants';
import { useAppSelector } from 'shared/hooks';
import { convertFileSize } from 'shared/utils';
import { ProfileImageDropdown } from 'features/HeaderAccount';
import cl from './style.module.scss';
import { Images } from 'shared/images';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const { isLogged, userInfo } = useAppSelector(state => state.user);
	const { popups } = useAppSelector(state => state.popup);
	const usedSpacePercentage = (userInfo.usedSpace / userInfo.totalSpace) * 100;

	return (
		<div className={cl.Layout}>
			<Header
				isLogged={isLogged}
				usedSpace={convertFileSize(userInfo.usedSpace)}
				usedSpacePercentage={usedSpacePercentage}
				totalSpace={convertFileSize(userInfo.totalSpace)}
				isNotEnoughSpace={usedSpacePercentage >= 80}
				profileImageDropdown={
					<ProfileImageDropdown
						imageLink={userInfo.profileImage ? `${API_URL}/images/${userInfo.profileImage}` : Images.chick}
					/>
				}
			/>
			<main>
				<Outlet />
			</main>
			<Footer />

			<div className={cl.PopupBody}>
				{Object.values(popups).map(({ id, content }) => (
					<Popup key={id} popupId={id} content={content} />
				))}
			</div>
		</div>
	);
};
