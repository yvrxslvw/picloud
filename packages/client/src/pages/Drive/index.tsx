import { FC } from 'react';
import { BreadcrumbsWidget, DriveMainWidget } from 'widgets/Drive';
import cl from './style.module.scss';

export const DrivePage: FC = () => {
	return (
		<div className={cl.DrivePage}>
			<BreadcrumbsWidget />
			<DriveMainWidget />
		</div>
	);
};
