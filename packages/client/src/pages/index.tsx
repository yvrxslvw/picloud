import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from 'widgets/Layout';
import { useAppSelector } from 'shared/hooks';
import { PrivateRoutes, PublicRoutes } from './routes';

const PublicRouter = createBrowserRouter([
	{
		element: <Layout />,
		children: PublicRoutes,
	},
]);

const PrivateRouter = createBrowserRouter([
	{
		element: <Layout />,
		children: PrivateRoutes,
	},
]);

export const AppRouter: FC = () => {
	const user = useAppSelector(state => state.user);

	return <RouterProvider router={user.isLogged ? PrivateRouter : PublicRouter} />;
};
