import { useEffect, useState } from 'react';
import { timer } from 'shared/utils';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { PopupSlice } from 'entities/Popup';

export const useProgress = (popupId: number) => {
	const [translate, setTranslate] = useState(-100);
	const [progress, setProgress] = useState(0);
	const [tick, setTick] = useState(false);
	const { popups } = useAppSelector(state => state.popup);
	const dispatch = useAppDispatch();
	const { removePopup } = PopupSlice.actions;

	const onClickHandler = async () => {
		await hide();
	};

	const show = async () => {
		await timer(200);
		setTranslate(0);
		await timer(400);
		setTick(true);
	};

	const hide = async () => {
		await timer(200);
		setTranslate(100);
		await timer(400);
		dispatch(removePopup(popupId));
	};

	useEffect(() => {
		show();
	}, []);

	useEffect(() => {
		if (!tick && progress <= 100) {
			const timer = setTimeout(() => setTick(true), 100);
			return () => clearTimeout(timer);
		}
	}, [tick]);

	useEffect(() => {
		if (tick) {
			setProgress(prev => prev + 3.33);
			setTick(false);
		}
	}, [tick]);

	useEffect(() => {
		if (Object.values(popups).length > 3 && popupId === Object.values(popups)[0].id) dispatch(removePopup(popupId));
	}, [popups]);

	useEffect(() => {
		if (progress >= 100) hide();
	}, [progress]);

	return { onClickHandler, translate, progress };
};
