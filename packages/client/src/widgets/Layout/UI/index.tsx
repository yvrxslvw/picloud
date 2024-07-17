import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'entities/Layout';
import { useAppSelector } from 'shared/hooks';
import { ProfileImageDropdown } from 'features/HeaderAccount';
import cl from './style.module.scss';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	const { isLogged, userInfo } = useAppSelector(state => state.user);
	const usedSpacePercentage = userInfo ? (userInfo.usedSpace / userInfo.totalSpace) * 100 : 0;

	return (
		<div className={cl.Layout}>
			<Header
				isLogged={isLogged}
				usedSpace={userInfo?.usedSpace.toFixed(2)}
				usedSpacePercentage={usedSpacePercentage}
				totalSpace={userInfo?.totalSpace}
				isNotEnoughSpace={usedSpacePercentage >= 80}
				profileImageDropdown={<ProfileImageDropdown imageLink={userInfo?.profileImage} />}
			/>
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};
