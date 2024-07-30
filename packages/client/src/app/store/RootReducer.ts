import { combineReducers } from '@reduxjs/toolkit';
import { UserSlice } from './models';
import { PopupSlice } from 'entities/Popup';

export const RootReducer = combineReducers({
	user: UserSlice.reducer,
	popup: PopupSlice.reducer,
});
