import { FC } from 'react';
import { BreadcrumbsWidget, DriveMainWidget } from 'widgets/Drive';
import cl from './style.module.scss';
import { useLocation } from 'react-router-dom';

export const DrivePage: FC = () => {
	const location = useLocation();

	return (
		<div className={cl.DrivePage}>
			<BreadcrumbsWidget path={location.pathname} />
			<DriveMainWidget />
		</div>
	);
};
