import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { Images } from 'shared/images';
import cl from './style.module.scss';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
	dark?: boolean;
}

export const Logo: FC<LogoProps> = ({ className, dark, ...props }) => {
	return (
		<div className={cn(cl.Logo, className, { [cl.Dark]: dark })} {...props}>
			<h1>PI&emsp;&ensp;Cloud</h1>
			<img src={Images.cloud} alt='Cloud' className={cl.CloudImage} />
			<img src={Images.chick} alt='Chick' className={cl.ChickImage} />
		</div>
	);
};
