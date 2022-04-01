import React, { FC, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import { width } from 'consts';
import { formateTime, formateTimeWithSMH } from 'utils';
import { TimerContext } from 'store/contexts/timer';
import { TimerStopwatchText } from 'components/TimerStopwatchText';

// eslint-disable-next-line react/display-name
export const TimerCounter: FC = () => {
	const {
		dispatch,
		state: { secondsInput, minutesInput, hoursInput, timerPaused, timerStart },
	} = useContext(TimerContext);

	const [currentTime, setCurrentTime] = useState(
		Number(formateTimeWithSMH(secondsInput, minutesInput, hoursInput))
	);

	let unSubscribe: NodeJS.Timer;

	useEffect(() => {
		if (!timerPaused && timerStart) {
			let startTime = currentTime;

			unSubscribe = setInterval(() => {
				startTime -= 1000;

				setCurrentTime((prev) => prev - 1000);

				if (startTime === 0) {
					stopTimer();
				}
			}, 1000);
		}
		return () => {
			clearInterval(unSubscribe);
		};
	}, [timerStart, timerPaused]);

	const stopTimer = () => {
		//TODO add tone and notification.
		dispatch({ type: 'updateTimerEnded', payload: true });
		dispatch({ type: 'updateTimerStart', payload: false });
		dispatch({ type: 'updateTimerPaused', payload: false });
		clearInterval(unSubscribe);
	};

	return (
		<View
			style={{
				flex: 1.8,
				justifyContent: 'center',
				alignItems: 'center',
				// backgroundColor: '#f4f4',
			}}
		>
			<TimerStopwatchText
				seconds={formateTime(currentTime, 's')}
				minutes={formateTime(currentTime, 'm')}
				hours={formateTime(currentTime, 'h')}
				type={'timer'}
				fontSize={width * 0.15}
				conStyle={{ width: width * 0.75 }}
			/>
		</View>
	);
};

// export default Timer;
