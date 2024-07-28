import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import cl from './style.module.scss';

interface AddFileButtonProps {}

export const AddFileButton: FC<AddFileButtonProps> = () => {
	const onClickHandler = () => {
		console.log('create file');
	};

	return (
		<button className={cl.AddFileButton} onClick={onClickHandler}>
			<FontAwesomeIcon icon={faPlus} />
		</button>
	);
};
