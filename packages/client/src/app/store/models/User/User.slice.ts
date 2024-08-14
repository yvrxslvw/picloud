import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'shared/models';
import { login, logout, update } from './User.actions';

export interface UserState {
	isLogged: boolean;
	userInfo: IUser;
}

const initialState: UserState = {
	isLogged: false,
	userInfo: {
		id: -1,
		login: '',
		password: '',
		profileImage: '',
		createdAt: '',
		usedSpace: 0,
		totalSpace: 0,
		roles: [],
	},
};

export const UserSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {
		login,
		logout,
		update,
	},
});
