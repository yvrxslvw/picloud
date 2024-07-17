import { combineReducers } from '@reduxjs/toolkit';
import { UserSlice } from './models';

export const RootReducer = combineReducers({
	user: UserSlice.reducer,
});
