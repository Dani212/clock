import React, { FC, useContext, useEffect, useState } from 'react';
import { View, Keyboard, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { timerStyle } from 'styles';
import { TimerContext } from 'store';
import { editableState } from 'reduxStore';
import { pColor, TBNCPicker } from 'utils';

import { Button } from 'components';
import { PresetsComponent } from './preset';

export const TimerBottomHalf: FC = () => {
	const { dark } = useTheme();
	const {
		dispatch,
		state: { selectedPresetItem, disableStartButton, timerPaused, timerStart },
	} = useContext(TimerContext);

	const editable = useSelector(editableState);

	const [disableButton, setDisableButton] = useState(false);

	useEffect(() => {
		// console.log(disableStartButton);
		setDisableButton(disableStartButton);
	}, [disableStartButton, selectedPresetItem]);

	const startTimer = () => {
		dispatch({ type: 'updateInputIsFocused', payload: false });
		dispatch({ type: 'updateTimerStart', payload: true });
		dispatch({ type: 'updateTimerPaused', payload: false });
	};

	const pauseTimer = () => {
		dispatch({ type: 'updateTimerPaused', payload: true });
	};

	const cancelTimer = () => {
		dispatch({ type: 'updateTimerStart', payload: false });
		dispatch({ type: 'updateTimerPaused', payload: false });
	};

	return (
		<Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
			<PresetsComponent />

			<View style={[timerStyle.buttonsContainer]}>
				{!timerStart ? (
					<Button
						dark={dark}
						title={'Start'}
						onPress={startTimer}
						disabled={disableButton || editable}
						buttonColor={
							disableButton || editable
								? pColor(dark).disableButton
								: pColor(dark).button
						}
					/>
				) : (
					<View style={timerStyle.twinButtonContainer}>
						<Button
							dark={dark}
							onPress={timerPaused ? startTimer : pauseTimer}
							title={TBNCPicker(dark, timerStart, timerPaused, 'l').name}
							buttonColor={TBNCPicker(dark, timerStart, timerPaused, 'l').color}
						/>

						<Button
							dark={dark}
							onPress={cancelTimer}
							title={TBNCPicker(dark, timerStart, timerPaused).name}
							buttonColor={TBNCPicker(dark, timerStart, timerPaused).color}
						/>
					</View>
				)}
			</View>
		</Pressable>
	);
};
