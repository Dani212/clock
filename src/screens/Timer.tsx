import React, { useEffect } from 'react';

import { BackHandler, EmitterSubscription, Keyboard } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';

import {
	editableState,
	removeOrCheckAllPEI,
	updateEditable,
	updateIsKeyboardOpen,
} from 'reduxStore';

import TimerContent from 'components/timer';

import TimerContext from 'store/contexts/timer';

export default function TabTwoScreen() {
	const dispatch = useDispatch();

	const editable = useSelector(editableState);

	const backAction = () => {
		if (editable) {
			dispatch(removeOrCheckAllPEI([]));
			dispatch(updateEditable({ data: false, screen: 'timer' }));
			return true;
		} else {
			return false;
		}
	};

	let keyboardShow: EmitterSubscription;
	let keyboardHide: EmitterSubscription;
	useEffect(() => {
		keyboardShow = Keyboard.addListener('keyboardDidShow', () => {
			dispatch(updateIsKeyboardOpen(true));
		});

		keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
			dispatch(updateIsKeyboardOpen(false));
		});

		return () => {
			Keyboard.removeSubscription(keyboardHide);
			Keyboard.removeSubscription(keyboardShow);
		};
	}, []);

	useFocusEffect(
		React.useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', backAction);

			return () =>
				BackHandler.removeEventListener('hardwareBackPress', backAction);
		}, [editable])
	);

	return (
		<TimerContext>
			<TimerContent />
		</TimerContext>
	);
}
