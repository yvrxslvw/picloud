import { Navigate, RouteObject } from 'react-router-dom';
import { ROUTER_PATHS } from 'shared/constants';
import { LoginPage } from './Login';

export const PublicRoutes: RouteObject[] = [
	{ element: <LoginPage />, path: ROUTER_PATHS.LOGIN_PAGE },
	{ element: <Navigate to={ROUTER_PATHS.LOGIN_PAGE} replace />, path: '/*' },
];
