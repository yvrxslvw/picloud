import { combineReducers } from '@reduxjs/toolkit';
import { UserSlice } from './models';
import { PopupSlice } from 'entities/Popup';
import { AuthApi } from 'shared/api/auth';
import { DriveApi } from 'shared/api';

export const RootReducer = combineReducers({
	user: UserSlice.reducer,
	popup: PopupSlice.reducer,
	[AuthApi.reducerPath]: AuthApi.reducer,
	[DriveApi.reducerPath]: DriveApi.reducer,
});
