import React, {
	forwardRef,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

import { View } from 'react-native';

import { width } from 'consts';

import { TimerStopwatchText } from 'components/TimerStopwatchText';

import { StopwatchContext } from 'store';

import { formateTime } from 'utils';

import { SWHTRefProps } from 'types';

import { stopWStyle } from 'styles';

// eslint-disable-next-line react/display-name
const HeaderText = forwardRef<SWHTRefProps>((_, ref) => {
	const [overallTime, setOverallTime] = useState(0);
	const [lapTime, setLapTime] = useState(0);

	const isLapTimeActive = useRef(false);
	const lapStartTime = useRef(0);

	/**
	 * This ref is used to save the isPaused, overallTime, lapTime so when
	 * timer is stop it save the current data and it is used to continue
	 * from were it stopped
	 */
	const pausedInfo = useRef({ isPaused: false, overallTime: 0, lapTime: 0 });
	const currentTimes = useRef({ overallTime: 0, lapTime: 0 });

	const { dispatch, state } = useContext(StopwatchContext);

	let unsubscribTimer: NodeJS.Timer;

	/**
	 *  This function is used to start lap and set
	 * 	laps every time the laps btn is pressed
	 * */
	const startLap = () => {
		!state.stopwatchLapStart &&
			dispatch({
				type: 'updateStopwatchLapStart',
				payload: true,
			});

		dispatch({
			type: 'addToLapList',
			payload: {
				overallTime: formateTime(currentTimes.current.overallTime, 'stop'),
				lapTime: formateTime(currentTimes.current.lapTime, 'stop'),
			},
		});
		// console.log('start');
		lapStartTime.current = new Date().getTime();
		isLapTimeActive.current = true;
		pausedInfo.current.lapTime = 0;
		// setLapTime(0);
	};

	/**
	 *  @description This function is used to start timer
	 * */
	const start = () => {
		const startTime = new Date().getTime();
		lapStartTime.current = isLapTimeActive.current
			? lapStartTime.current
			: startTime;

		unsubscribTimer = setInterval(() => {
			const currentTime =
				new Date().getTime() - startTime + pausedInfo.current.overallTime;

			setOverallTime(currentTime);
			currentTimes.current.overallTime = currentTime;

			const currentLapTime =
				new Date().getTime() -
				lapStartTime.current +
				pausedInfo.current.lapTime;

			setLapTime(currentLapTime);
			currentTimes.current.lapTime = currentLapTime;
		}, 300);
	};

	/**
	 *  This function is used to start timer
	 * */
	const stop = () => {
		pausedInfo.current = {
			isPaused: true,
			overallTime: currentTimes.current.overallTime,
			lapTime: currentTimes.current.lapTime,
		};

		clearInterval(unsubscribTimer);
	};

	/**
	 * This function is used to reset timer and lap value to it default settings
	 */
	const reset = () => {
		// console.log(unsubscribTimer, 'reset');
		clearInterval(unsubscribTimer);

		dispatch({
			type: 'updateStopwatchLapStart',
			payload: false,
		});

		dispatch({
			type: 'removeAllLapList',
			payload: [],
		});

		state.stopwatchReset &&
			dispatch({
				type: 'updateStopwatchReset',
				payload: false,
			});

		setLapTime(0);
		setOverallTime(0);
		currentTimes.current = { overallTime: 0, lapTime: 0 };
		pausedInfo.current = { isPaused: false, overallTime: 0, lapTime: 0 };
	};

	// stop time at 5940000 limit
	useEffect(() => {
		if (currentTimes.current.lapTime > 5940730) {
			dispatch({
				type: 'updateStopwatchReset',
				payload: true,
			});
		}
	}, [overallTime]);

	/**
	 * This function makes it possible to use startLap, reset, stop, start,
	 * from parent component.
	 */
	useImperativeHandle(ref, () => ({ startLap, reset, stop, start }), []);

	return (
		<View style={[stopWStyle.PHTextContainer]}>
			<TimerStopwatchText
				seconds={formateTime(overallTime, 's')}
				minutes={formateTime(overallTime, 'm')}
				millSeconds={formateTime(overallTime, 'ms')}
				type={'stopwatch'}
				fontSize={width * 0.15}
				conStyle={{ width: width * 0.75 }}
			/>

			{state.stopwatchLapStart && (
				<TimerStopwatchText
					seconds={formateTime(lapTime, 's')}
					minutes={formateTime(lapTime, 'm')}
					millSeconds={formateTime(lapTime, 'ms')}
					type={'stopwatch'}
					fontSize={width * 0.08}
					conStyle={{ width: width * 0.45 }}
				/>
			)}
		</View>
	);
});

export default HeaderText;
