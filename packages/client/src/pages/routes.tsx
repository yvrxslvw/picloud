import { Navigate, RouteObject } from 'react-router-dom';
import { ROUTER_PATHS } from 'shared/constants';
import { LoginPage } from './Login';
import { RegisterPage } from './Register';
import { DrivePage } from './Drive';
import { SettingsPage } from './Settings';

export const PublicRoutes: RouteObject[] = [
	{ element: <LoginPage />, path: ROUTER_PATHS.LOGIN_PAGE },
	{ element: <RegisterPage />, path: ROUTER_PATHS.REGISTER_PAGE },
	{ element: <Navigate to={ROUTER_PATHS.LOGIN_PAGE} replace />, path: '/*' },
];

export const PrivateRoutes: RouteObject[] = [
	{ element: <DrivePage />, path: ROUTER_PATHS.DRIVE_PAGE + '/*' },
	{ element: <SettingsPage />, path: ROUTER_PATHS.SETTINGS_PAGE },
	{ element: <Navigate to={ROUTER_PATHS.DRIVE_PAGE} replace />, path: '/*' },
];
