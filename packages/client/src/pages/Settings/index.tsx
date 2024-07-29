import { FC } from 'react';
import { SettingsWidget } from 'widgets/Settings';
import cl from './style.module.scss';

export const SettingsPage: FC = () => {
	return (
		<div className={cl.SettingsPage}>
			<SettingsWidget />
		</div>
	);
};
