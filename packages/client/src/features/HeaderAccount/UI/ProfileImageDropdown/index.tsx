import { FC } from 'react';
import { Dropdown } from 'shared/UI';

interface ProfileImageDropdownProps {
	imageLink: string | undefined;
}

export const ProfileImageDropdown: FC<ProfileImageDropdownProps> = ({ imageLink }) => {
	const onClickSettingsHandler = () => {
		console.log('settings');
	};

	const onClickLogoutHandler = () => {
		console.log('logout');
	};

	return (
		<Dropdown.Root mainElement={<img src={imageLink} alt='profile' />}>
			<Dropdown.Node content='Настройки' onClick={onClickSettingsHandler} />
			<Dropdown.Node content='Выйти из аккаунта' onClick={onClickLogoutHandler} />
		</Dropdown.Root>
	);
};
