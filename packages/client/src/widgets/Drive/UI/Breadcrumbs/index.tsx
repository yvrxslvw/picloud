import { FC, HTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import cl from './style.module.scss';

interface BreadcrumbsWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export const BreadcrumbsWidget: FC<BreadcrumbsWidgetProps> = ({ className, ...props }) => {
	return (
		<div className={cn(cl.Breadcrumbs, className)} {...props}>
			<div className={cn(cl.Breadcrumb, cl.DriveRoot)}>MyDrive</div>
			<FontAwesomeIcon icon={faArrowRight} className={cl.Arrow} />
			<div className={cl.Breadcrumb}>Папка 1</div>
			<FontAwesomeIcon icon={faArrowRight} className={cl.Arrow} />
			<div className={cl.Breadcrumb}>Папка 2</div>
			<FontAwesomeIcon icon={faArrowRight} className={cl.Arrow} />
			<div className={cl.Breadcrumb}>Папка 3</div>
			<FontAwesomeIcon icon={faArrowRight} className={cl.Arrow} />
			<div className={cl.Breadcrumb}>Папка 4</div>
		</div>
	);
};
