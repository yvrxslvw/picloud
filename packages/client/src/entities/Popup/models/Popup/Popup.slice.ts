import { createSlice } from '@reduxjs/toolkit';
import { IPopup } from 'shared/models';
import { createPopup, removePopup } from './Popup.actions';

export interface PopupState {
	popups: Record<number, IPopup>;
	counter: number;
}

const initialState: PopupState = {
	popups: {},
	counter: 0,
};

export const PopupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers: {
		createPopup,
		removePopup,
	},
});
