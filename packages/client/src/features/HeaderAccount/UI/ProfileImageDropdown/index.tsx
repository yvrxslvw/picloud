/* eslint-disable no-console */
import { FC } from 'react';
import { Dropdown } from 'shared/UI';

interface ProfileImageDropdownProps {
	imageLink: string | undefined;
}

export const ProfileImageDropdown: FC<ProfileImageDropdownProps> = ({ imageLink }) => {
	return (
		<Dropdown.Root mainElement={<img src={imageLink} alt='profile' />}>
			<Dropdown.Node content='1 элемент' onClick={() => console.log('1 элемент')} />
			<Dropdown.Node content='2 элемент' onClick={() => console.log('2 элемент')} />
			<Dropdown.Node content='3 элемент' onClick={() => console.log('3 элемент')} />
			<Dropdown.Node content='4 элемент' onClick={() => console.log('4 элемент')} />
			<Dropdown.Node content='5 элемент' onClick={() => console.log('5 элемент')} />
		</Dropdown.Root>
	);
};
