import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Button } from '../Button';
import { pColor, SWBNCPicker } from 'utils';
import { SWHTRefProps, SWStatusProps } from 'types';
import { LapsListComponent } from './LapsList';
import { stopWStyle } from 'styles';
import { StopwatchContext } from 'store';

import SWHTComponent from './HeaderText';

/**
 *
 * @name SWContent
 * @returns
 */
const SWContent: FC = () => {
	const [stopwatchStatus, setStopwatchStatus] =
		useState<SWStatusProps>('inactive');

	const { dark } = useTheme();

	const headerTextRef = useRef<SWHTRefProps | any>();

	const { state } = useContext(StopwatchContext);

	useEffect(() => {
		if (state.stopwatchReset) {
			stop();
			setStopwatchStatus('paused');
		}
	}, [state.stopwatchReset]);

	const leftBtnPressed = () => {
		if (stopwatchStatus === 'active') {
			setStopwatchStatus('paused');

			headerTextRef.current?.stop();
		} else {
			headerTextRef.current?.start();
			setStopwatchStatus('active');
		}
	};

	const rightBtnPressed = () => {
		if (stopwatchStatus === 'paused') {
			setStopwatchStatus('inactive');

			headerTextRef.current?.reset();
		} else {
			headerTextRef.current?.startLap();
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<SWHTComponent ref={headerTextRef} />

			<LapsListComponent />

			<View style={stopWStyle.buttonContainer}>
				<Button
					dark={dark}
					onPress={leftBtnPressed}
					disabled={state.stopwatchReset}
					title={SWBNCPicker(dark, stopwatchStatus, 'l').name}
					buttonColor={
						state.stopwatchReset
							? 'rgba(68, 92, 189, 0.7)'
							: SWBNCPicker(dark, stopwatchStatus, 'l').color
					}
				/>
				<Button
					dark={dark}
					onPress={rightBtnPressed}
					btnTextColor={pColor(dark).text}
					disabled={stopwatchStatus === 'inactive'}
					title={SWBNCPicker(dark, stopwatchStatus).name}
					buttonColor={SWBNCPicker(dark, stopwatchStatus).color}
				/>
			</View>
		</View>
	);
};

export default SWContent;
