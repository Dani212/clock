import React, { FC } from 'react';

import { View, ViewStyle } from 'react-native';

import { width } from 'consts';

import { styles } from 'styles';

import { Text } from './Text';

type Props = {
	type: 'stopwatch' | 'timer';
	conStyle?: ViewStyle;
	fontSize?: number;
	millSeconds?: string;
	seconds: string;
	minutes: string;
	hours?: string;
};

export const TimerStopwatchText: FC<Props> = ({
	type,
	fontSize,
	conStyle,
	millSeconds,
	seconds,
	minutes,
	hours,
}) => {
	const textFontSize = fontSize ? fontSize : width * 0.11;

	return (
		<View
			style={[
				styles.timerStopwatchTextCon,
				{
					width: type === 'stopwatch' ? width * 0.6 : width * 0.7,
				},
				conStyle,
			]}
		>
			{type === 'timer' && (
				<>
					<Text style={[styles.timerStopwatchText, { fontSize: textFontSize }]}>
						{hours}
					</Text>

					<Text
						style={[
							styles.timerStopwatchText,
							{ fontSize: textFontSize, flex: 0.2 },
						]}
					>
						:
					</Text>
				</>
			)}

			<Text style={[styles.timerStopwatchText, { fontSize: textFontSize }]}>
				{minutes}
			</Text>

			<Text
				style={[
					styles.timerStopwatchText,
					{ fontSize: textFontSize, flex: 0.2 },
				]}
			>
				:
			</Text>

			<Text style={[styles.timerStopwatchText, { fontSize: textFontSize }]}>
				{seconds}
			</Text>

			{type === 'stopwatch' && (
				<>
					<Text
						style={[
							styles.timerStopwatchText,
							{ fontSize: textFontSize, flex: 0.1 },
						]}
					>
						.
					</Text>
					<Text style={[styles.timerStopwatchText, { fontSize: textFontSize }]}>
						{millSeconds}
					</Text>
				</>
			)}
		</View>
	);
};
