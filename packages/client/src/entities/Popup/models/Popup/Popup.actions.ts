import { PayloadAction } from '@reduxjs/toolkit';
import { IPopup } from 'shared/models';
import { PopupState } from './Popup.slice';

type State = PopupState;

export const createPopup = (state: State, action: PayloadAction<string>) => {
	state.counter++;
	const newPopup: IPopup = {
		id: state.counter,
		content: action.payload,
	};
	state.popups[state.counter] = newPopup;
};

export const removePopup = (state: State, action: PayloadAction<number>) => {
	delete state.popups[action.payload];
};
