import { PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from 'shared/api';
import { UserState } from './User.slice';

type State = UserState;

export const login = (state: State, action: PayloadAction<LoginResponse>) => {
	state.isLogged = true;
	state.userInfo = action.payload.user;
};

export const logout = (state: State) => {
	state.isLogged = false;
	state.userInfo = null;
};
