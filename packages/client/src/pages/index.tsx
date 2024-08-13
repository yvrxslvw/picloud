import { FC, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from 'widgets/Layout';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { PrivateRoutes, PublicRoutes } from './routes';
import { useRefreshQuery } from 'shared/api';
import { UserSlice } from 'app/store';

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
	const { data, isLoading } = useRefreshQuery(undefined);
	const { login } = UserSlice.actions;
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data) dispatch(login(data));
	}, [data]);

	if (isLoading) return;
	return <RouterProvider router={user.isLogged ? PrivateRouter : PublicRouter} />;
};
