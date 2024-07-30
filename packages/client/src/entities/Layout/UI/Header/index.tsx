import { FC, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { Logo, ProgressBar, Text } from 'shared/UI';
import cl from './style.module.scss';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
	isLogged: boolean;
	usedSpace: string | undefined;
	usedSpacePercentage: number | undefined;
	totalSpace: string | undefined;
	isNotEnoughSpace: boolean;
	profileImageDropdown: ReactNode;
}

export const Header: FC<HeaderProps> = ({
	className,
	isLogged,
	usedSpace,
	usedSpacePercentage,
	totalSpace,
	isNotEnoughSpace,
	profileImageDropdown,
	...props
}) => {
	if (usedSpacePercentage && usedSpacePercentage > 100) usedSpacePercentage = 100;

	return (
		<div className={cn(cl.Header, className)} {...props}>
			<div className={cl.HeaderRow}>
				<Logo />
				{isLogged && (
					<div className={cl.Account}>
						<div className={cl.DriveSpace}>
							<Text small>Использовано места:</Text>
							<ProgressBar progress={usedSpacePercentage ?? 0} red={isNotEnoughSpace} />
							<Text small>
								{usedSpace} / {totalSpace} ГБ
							</Text>
						</div>
						<div className={cl.Image}>
							{profileImageDropdown}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
