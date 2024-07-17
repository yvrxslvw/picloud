import { FC } from 'react';

interface ProfileImageDropdownProps {
	imageLink: string | undefined;
}

export const ProfileImageDropdown: FC<ProfileImageDropdownProps> = ({ imageLink }) => {
	return <img src={imageLink} alt='profile' />; //! todo
};
