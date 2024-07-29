import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from 'shared/constants';
import { Dropdown } from 'shared/UI';

interface ProfileImageDropdownProps {
	imageLink: string | undefined;
}

export const ProfileImageDropdown: FC<ProfileImageDropdownProps> = ({ imageLink }) => {
	const navigate = useNavigate();

	const onClickDriveHandler = () => {
		navigate(ROUTER_PATHS.DRIVE_PAGE);
	};

	const onClickSettingsHandler = () => {
		navigate(ROUTER_PATHS.SETTINGS_PAGE);
	};

	const onClickLogoutHandler = () => {
		console.log('logout');
	};

	return (
		<Dropdown.Root mainElement={<img src={imageLink} alt='profile' />}>
			<Dropdown.Node content='Мой диск' onClick={onClickDriveHandler} />
			<Dropdown.Node content='Настройки' onClick={onClickSettingsHandler} />
			<Dropdown.Node content='Выйти из аккаунта' onClick={onClickLogoutHandler} />
		</Dropdown.Root>
	);
};
