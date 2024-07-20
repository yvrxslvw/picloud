import { createSlice } from '@reduxjs/toolkit';
import { IUser } from 'shared/models';

export interface UserState {
	isLogged: boolean;
	userInfo: IUser | null;
}

//! TMP
const initialState: UserState = {
	isLogged: true,
	userInfo: {
		id: 1,
		login: 'yvrxslvw',
		profileImage: 'https://dictionary.cambridge.org/ru/images/full/chick_noun_002_06563.jpg?version=6.0.27',
		usedSpace: 4.39,
		totalSpace: 15,
	},
	// userInfo: null
};

export const UserSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {},
});
