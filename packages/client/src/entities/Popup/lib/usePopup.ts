import { useAppDispatch } from 'shared/hooks';
import { PopupSlice } from '../models';

export const usePopup = () => {
	const dispatch = useAppDispatch();
	const { createPopup: create } = PopupSlice.actions;

	const createPopup = (content: string) => {
		dispatch(create(content));
	};

	return { createPopup };
};
