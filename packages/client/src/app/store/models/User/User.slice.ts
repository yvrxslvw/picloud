import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'shared/models';

export interface UserState {
	isLogged: boolean;
	userInfo: IUser | null;
}

const initialState: UserState = {
	isLogged: false,
	userInfo: null,
};

export const UserSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {},
});
