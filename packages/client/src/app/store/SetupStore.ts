import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './RootReducer';
import { AuthApi } from 'shared/api/auth';
import { DriveApi } from 'shared/api';

export const SetupStore = () =>
	configureStore({
		reducer: RootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware().concat(AuthApi.middleware).concat(DriveApi.middleware),
	});
