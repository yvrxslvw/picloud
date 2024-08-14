import { FC, PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import cl from './style.module.scss';

interface ModalWindowProps extends PropsWithChildren {
	title: string;
	onClose: () => void;
}

export const ModalWindow: FC<ModalWindowProps> = ({ title, onClose, children }) => {
	return (
		<div className={cl.ModalWindowBody} onClick={onClose}>
			<div className={cl.ModalWindow} onClick={e => e.stopPropagation()}>
				<div className={cl.Header}>
					<h4>{title}</h4>
					<button onClick={onClose}>
						<FontAwesomeIcon icon={faClose} />
					</button>
				</div>
				<div className={cl.Content}>{children}</div>
			</div>
		</div>
	);
};
