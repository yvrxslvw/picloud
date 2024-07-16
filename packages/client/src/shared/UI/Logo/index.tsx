import { FC } from 'react';
import cl from './style.module.scss';
import { Images } from 'shared/images';

export const Logo: FC = () => {
	return (
		<div className={cl.Logo}>
			<p>PI</p>
			<img src={Images.cloud} alt='Cloud' className={cl.CloudImage} />
			<img src={Images.chick} alt='Chick' className={cl.ChickImage} />
			<p>Cloud</p>
		</div>
	);
};
