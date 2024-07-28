import { FC, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { ROUTER_PATHS } from 'shared/constants';
import cl from './style.module.scss';

interface BreadcrumbsWidgetProps extends HTMLAttributes<HTMLDivElement> {
	path: string;
}

export const BreadcrumbsWidget: FC<BreadcrumbsWidgetProps> = ({ className, path, ...props }) => {
	const crumbs = decodeURI(path).split('/').slice(2);
	const navigate = useNavigate();

	const onClickHomeHandler = () => {
		navigate(ROUTER_PATHS.DRIVE_PAGE);
	};

	const onClickCrumbHandler = (crumbIndex: number) => {
		navigate(ROUTER_PATHS.DRIVE_PAGE + '/' + crumbs.slice(0, crumbIndex + 1).join('/'));
	};

	return (
		<div className={cn(cl.Breadcrumbs, className)} {...props}>
			<div className={cn(cl.Breadcrumb, cl.DriveRoot)} onClick={onClickHomeHandler}>
				My Drive
			</div>
			{crumbs.map((crumb, index) => (
				<section key={crumb + index}>
					<FontAwesomeIcon icon={faArrowRight} className={cl.Arrow} />
					<div className={cl.Breadcrumb} onClick={() => onClickCrumbHandler(index)}>
						{crumb}
					</div>
				</section>
			))}
		</div>
	);
};
