import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { BreadcrumbsWidget, DriveMainWidget } from 'widgets/Drive';
import cl from './style.module.scss';

export const DrivePage: FC = () => {
	const location = useLocation();

	return (
		<div className={cl.DrivePage}>
			<BreadcrumbsWidget path={location.pathname} />
			<DriveMainWidget path={location.pathname} />
		</div>
	);
};
