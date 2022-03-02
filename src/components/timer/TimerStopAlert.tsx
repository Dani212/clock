import React, { useEffect, useState } from 'react';

import { StyleSheet, Vibration, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { Text, TimerStopwatchText, Button } from 'components';
import { timerStyle } from 'styles';
import { formateTime, pColor } from 'utils';
import { width } from 'consts';

export const TimerStopAlert = ({
	resetTimer,
	stop,
}: {
	stop: () => void;
	resetTimer: () => void;
}) => {
	const { dark } = useTheme();

	const [time, setTime] = useState(0);

	let timerCounter: NodeJS.Timer;
	const ONE_SECOND_IN_MS = 100;

	const PATTERN = [
		1 * ONE_SECOND_IN_MS,
		2 * ONE_SECOND_IN_MS,
		3 * ONE_SECOND_IN_MS,
	];

	useEffect(() => {
		Vibration.vibrate(PATTERN, true);

		timerCounter = setInterval(() => {
			setTime((prev) => prev + 1000);
		}, 1000);

		return () => {
			Vibration.cancel();
			clearInterval(timerCounter);
		};
	}, []);

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={{
				...StyleSheet.absoluteFillObject,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<View
				style={{
					backgroundColor: pColor(dark).modalBg,
					height: '100%',
					width: '100%',
				}}
			/>
			<View
				style={{
					padding: 18,
					// elevation: 1,
					borderRadius: 32,
					width: width * 0.8,
					backgroundColor: pColor(dark).viewBg,
					position: 'absolute',
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center',
					zIndex: 100,
				}}
			>
				{/* eslint-disable-next-line quotes */}
				<Text textSize="large">{"Time's up"}</Text>

				<View style={{ flexDirection: 'row', marginVertical: 16 }}>
					<Text textSize="xxl">-</Text>
					<TimerStopwatchText
						type={'timer'}
						hours={formateTime(time, 'h')}
						seconds={formateTime(time, 's')}
						minutes={formateTime(time, 'm')}
						conStyle={{ width: width * 0.4 }}
						fontSize={32}
					/>
				</View>

				<View style={timerStyle.APBtnContainer}>
					<Button
						dark={dark}
						title="Stop"
						onPress={stop}
						buttonColor={'transparent'}
						btnTextColor={pColor(dark).text}
						// buttonColor={pColor(dark).presetItemBg}
						conStyle={{ height: 38 }}
					/>

					<View
						style={{
							height: 15,
							backgroundColor: pColor(dark).disableText,
							width: 2,
						}}
					/>

					<Button
						title="Reset"
						dark={dark}
						onPress={resetTimer}
						conStyle={{ height: 38 }}
						buttonColor={'transparent'}
						btnTextColor={pColor(dark).text}
						// buttonColor={pColor(dark).presetItemBg}
					/>
				</View>
			</View>
		</Animated.View>
	);
};
