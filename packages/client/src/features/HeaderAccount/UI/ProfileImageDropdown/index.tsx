import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'shared/UI';
import { ROUTER_PATHS } from 'shared/constants';
import { useLogoutMutation } from 'shared/api';
import { UserSlice } from 'app/store';
import { useAppDispatch } from 'shared/hooks';

interface ProfileImageDropdownProps {
	imageLink: string | undefined;
}

export const ProfileImageDropdown: FC<ProfileImageDropdownProps> = ({ imageLink }) => {
	const navigate = useNavigate();
	const [logoutUser, { isSuccess }] = useLogoutMutation();
	const { logout } = UserSlice.actions;
	const dispatch = useAppDispatch();

	const onClickDriveHandler = () => {
		navigate(ROUTER_PATHS.DRIVE_PAGE);
	};

	const onClickSettingsHandler = () => {
		navigate(ROUTER_PATHS.SETTINGS_PAGE);
	};

	const onClickLogoutHandler = () => {
		logoutUser(null);
	};

	const onDragHandler = (e: React.DragEvent) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (isSuccess) dispatch(logout());
	}, [isSuccess]);

	return (
		<Dropdown.Root mainElement={<img src={imageLink} alt='profile' onDragStart={onDragHandler} />}>
			<Dropdown.Node content='Мой диск' onClick={onClickDriveHandler} />
			<Dropdown.Node content='Настройки' onClick={onClickSettingsHandler} />
			<Dropdown.Node content='Выйти из аккаунта' onClick={onClickLogoutHandler} />
		</Dropdown.Root>
	);
};
