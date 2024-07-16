import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from 'entities/Layout';
import cl from './style.module.scss';

interface LayoutProps {}

export const Layout: FC<LayoutProps> = () => {
	return (
		<div className={cl.Layout}>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};
