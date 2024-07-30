import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'entities/Layout';
import { useAppSelector } from 'shared/hooks';
import { ProfileImageDropdown } from 'features/HeaderAccount';
import cl from './style.module.scss';
import { Popup } from 'entities/Popup';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const { isLogged, userInfo } = useAppSelector(state => state.user);
	const { popups } = useAppSelector(state => state.popup);
	const usedSpacePercentage = userInfo ? (userInfo.usedSpace / userInfo.totalSpace) * 100 : 0;

	return (
		<div className={cl.Layout}>
			<Header
				isLogged={isLogged}
				usedSpace={userInfo?.usedSpace.toFixed(2)}
				usedSpacePercentage={usedSpacePercentage}
				totalSpace={userInfo?.totalSpace.toFixed(2)}
				isNotEnoughSpace={usedSpacePercentage >= 80}
				profileImageDropdown={<ProfileImageDropdown imageLink={userInfo?.profileImage} />}
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
