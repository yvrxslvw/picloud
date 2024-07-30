import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Text } from 'shared/UI';
import cl from './style.module.scss';
import { useProgress } from '../../lib';

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
	popupId: number;
	content: string;
}

export const Popup: FC<PopupProps> = ({ popupId, content, className, ...props }) => {
	const { onClickHandler, progress, translate } = useProgress(popupId);

	return (
		<div
			className={cn(cl.Popup, className)}
			onClick={onClickHandler}
			style={{ transform: `translateX(${translate}%)` }}
			{...props}
		>
			<section>
				<FontAwesomeIcon icon={faCircleInfo} className={cl.Icon} />
			</section>
			<section>
				<Text className={cl.Content}>{content}</Text>
			</section>
			<div className={cl.Progress} style={{ width: `${progress}%` }} />
		</div>
	);
};
