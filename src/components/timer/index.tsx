import React, { useContext, useEffect, useRef, useState } from 'react';

import { useNavigation, useTheme } from '@react-navigation/native';

import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

import { styles } from 'styles';

import { EddRefProps } from 'types';

import { TimerTop } from './timer';
import { TimerHeader } from './Header';
import { EllipsisDropdown } from 'components';
import { TimerBottomHalf } from './TimerBottom';

import AddPresetComponent from './preset/AddPreset';
import { useDispatch, useSelector } from 'react-redux';
import {
	openPresetEdit,
	removeOrCheckAllPEI,
	showEditPresetState,
	updateEditable,
} from 'reduxStore';
import { TimerStopAlert } from './TimerStopAlert';
import { TimerContext } from 'store';

const Index = () => {
	const { dark } = useTheme();

	const { navigate } = useNavigation();

	const dispatch = useDispatch();

	const showEditPreset = useSelector(showEditPresetState);

	const [showPreset, setShowPreset] = useState(false);

	const ellipsisRef = useRef<EddRefProps>(null);

	const {
		dispatch: contextDispatch,
		state: { timerEnd: timerEnded },
	} = useContext(TimerContext);

	const onPressAdd = () => {
		setShowPreset(true);
	};

	useEffect(() => {
		if (showEditPreset) {
			onPressAdd();
		}
	}, [showEditPreset]);

	const onPressEllipsis = () => {
		ellipsisRef.current?.open();
	};

	const itemPress = (item: string) => {
		ellipsisRef.current?.close();

		if (item === 'Settings') {
			navigate('SettingsScreen');
		}
	};

	const closeAppPreset = () => {
		showEditPreset && dispatch(openPresetEdit(false));
		setShowPreset(false);
		dispatch(removeOrCheckAllPEI([]));
		dispatch(updateEditable({ data: false, screen: 'timer' }));
	};

	const resetTimer = () => {
		contextDispatch({ type: 'updateTimerEnded', payload: false });
		contextDispatch({ type: 'updateTimerStart', payload: true });
	};

	const stopOverTimer = () => {
		contextDispatch({ type: 'updateTimerEnded', payload: false });
		contextDispatch({ type: 'updateTimerStart', payload: false });
	};

	return (
		<SafeAreaView style={styles.container}>
			<TimerHeader onPressAdd={onPressAdd} onPressEllipsis={onPressEllipsis} />

			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<TimerTop />

				<TimerBottomHalf />
			</KeyboardAvoidingView>

			<EllipsisDropdown
				listItem={['Edit preset tiemrs', 'Settings', 'Contact us']}
				itemPress={itemPress}
				ref={ellipsisRef}
				dark={dark}
			/>

			{showPreset && <AddPresetComponent dark={dark} close={closeAppPreset} />}

			{timerEnded && (
				<TimerStopAlert stop={stopOverTimer} resetTimer={resetTimer} />
			)}
		</SafeAreaView>
	);
};

export default Index;
