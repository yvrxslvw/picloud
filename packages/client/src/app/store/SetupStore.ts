import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './RootReducer';

export const SetupStore = () =>
	configureStore({ reducer: RootReducer, middleware: getDefaultMiddleware => getDefaultMiddleware() });
