import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from 'widgets/Layout';
import { PublicRoutes } from './routes';

const PublicRouter = createBrowserRouter([
	{
		element: <Layout />,
		children: PublicRoutes,
	},
]);

export const AppRouter: FC = () => {
	return <RouterProvider router={PublicRouter} />; //! tmp
};
