import React, { useContext, useEffect, useRef, useState } from 'react';

import { useNavigation, useTheme } from '@react-navigation/native';

import { SafeAreaView } from 'react-native';

import { styles } from 'styles';

import { EddRefProps } from 'types';

import { TimerTop } from './timer';
import { TimerHeader } from './Header';
import { EllipsisDropdown } from 'components';
import { TimerBottomHalf } from './TimerBottom';

import AddPresetComponent from './preset/AddPreset';
import { useSelector } from 'react-redux';
import { showEditPresetState } from 'reduxStore';
import { TimerStopAlert } from './TimerStopAlert';
import { TimerContext } from 'store';

const Index = () => {
	const { dark } = useTheme();

	const { navigate } = useNavigation();

	const showEditPreset = useSelector(showEditPresetState);

	const [showPreset, setShowPreset] = useState(false);

	const ellipsisRef = useRef<EddRefProps>(null);

	const {
		dispatch,
		state: { timerEnd: timerEnded },
	} = useContext(TimerContext);

	const onPressAdd = () => {
		// addPresetRef.current?.open();
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
		setShowPreset(!true);
	};

	const resetTimer = () => {
		dispatch({ type: 'updateTimerEnded', payload: false });
		dispatch({ type: 'updateTimerStart', payload: true });
	};

	const stopOverTimer = () => {
		console.log('stop');
		dispatch({ type: 'updateTimerEnded', payload: false });
		dispatch({ type: 'updateTimerStart', payload: false });
	};

	return (
		<SafeAreaView style={styles.container}>
			<TimerHeader onPressAdd={onPressAdd} onPressEllipsis={onPressEllipsis} />

			<TimerTop />

			<TimerBottomHalf />

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
