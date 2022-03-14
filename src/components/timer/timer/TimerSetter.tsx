import React, { FC, useContext, useEffect } from 'react';

import { ScrollView, Keyboard, View } from 'react-native';

import { useTheme } from '@react-navigation/native';

import { width } from 'consts';

import { TimerContext } from 'store/contexts/timer';

import { TimerInput } from 'components/TimerInput';

import { EditableShadView } from './EditableShadView';

export const TimerSetter: FC = () => {
	const { dark } = useTheme();

	const {
		dispatch,
		state: { hoursInput, minutesInput, secondsInput },
	} = useContext(TimerContext);

	useEffect(() => {
		const unSubscribe = Keyboard.addListener('keyboardDidHide', () => {
			// Setting this dispatch will help to know when to hide or show preset
			dispatch({ type: 'updateInputIsFocused', payload: false });
		});

		return () => {
			unSubscribe.remove();
		};
	}, []);

	const onChangeText = (seconds: string, minutes: string, hours: string) => {
		dispatch({ type: 'updateHoursInput', payload: hours });
		dispatch({ type: 'updateSecondsInput', payload: seconds });
		dispatch({ type: 'updateMinutesInput', payload: minutes });
		dispatch({
			type: 'updateSelectedPresetItem',
			payload: `${hours}${minutes}${seconds}`,
		});
	};

	const onBlur = () => {
		// Setting this dispatch will help to know when to hide or show preset
		dispatch({ type: 'updateInputIsFocused', payload: false });
	};

	const onFocus = () => {
		// Setting this dispatch will help to know when to hide or show preset
		dispatch({ type: 'updateInputIsFocused', payload: true });
	};

	const disableBtnFeebBack = (disable: boolean) => {
		dispatch({ type: 'updateDisableStartButton', payload: disable });
	};
	return (
		<View style={{ flex: 1.3 }}>
			{/*
			 * The scroll help to remove focus from the input
			 * when the background screen is tapped
			 */}
			<ScrollView style={{ flex: 1, paddingTop: 72 }}>
				<TimerInput
					dark={dark}
					type={'timer'}
					fontSize={width * 0.14}
					headerTextFontSize={width * 0.05}
					onChangeText={onChangeText}
					goToNextInput={() => {
						// refName.current?.focus();
					}}
					onSubmitEditingSecs={() => {
						Keyboard.dismiss();
					}}
					hours={hoursInput}
					minutes={minutesInput}
					seconds={secondsInput}
					onBlur={onBlur}
					onFocus={onFocus}
					disableBtnFeebBack={disableBtnFeebBack}
					conStyle={{
						// backgroundColor: '#f4f4',
						width: width * 0.8,
						marginStart: 4,
						marginVertical: 16,
					}}
				/>
			</ScrollView>

			<EditableShadView />
		</View>
	);
};
