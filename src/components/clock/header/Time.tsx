import React, { useState } from 'react';
import { useFocusEffect, useTheme } from '@react-navigation/native';

import { TimerStopwatchText, Text } from 'components';
import moment from 'moment';
import { pColor } from 'utils';

export const Time = () => {
	const [time, setTime] = useState<Date>(new Date());

	let unsubcribe: NodeJS.Timer;

	useFocusEffect(
		React.useCallback(() => {
			unsubcribe = setInterval(() => {
				const currentTime = new Date();
				setTime(currentTime);
			}, 1000);

			return () => {
				clearInterval(unsubcribe);
			};
		}, [])
	);

	const { dark } = useTheme();
	return (
		<>
			<TimerStopwatchText
				type={'timer'}
				hours={moment(time).format('HH')}
				seconds={moment(time).format('ss')}
				minutes={moment(time).format('mm')}
				fontSize={32}
				conStyle={{ width: 150 }}
			/>

			<Text
				textSize="small"
				style={{
					fontSize: 16,
					marginTop: -10,
					color: pColor(dark).disableText,
				}}
			>
				{'Greenwich Mean Time'}
			</Text>
		</>
	);
};
