import { STOPWATCH_ALL_TYPE, StopwatchLapProps } from 'types';

export type StopwatchStateProps = {
	stopwatchLapStart: boolean;
	stopwatchReset: boolean;
	laps: StopwatchLapProps[];
};

export const stopwatchInitialState: StopwatchStateProps = {
	laps: [],
	stopwatchReset: false,
	stopwatchLapStart: false,
};

// const formateBoolVar = (currentData: boolean, newData?: boolean) => {
// 	if (typeof newData === 'undefined') return currentData;
// 	return newData;
// };

export const stopwatchReducer = (
	state: StopwatchStateProps,
	action: { type: STOPWATCH_ALL_TYPE; payload: any }
): StopwatchStateProps => {
	switch (action.type) {
		case 'addToLapList':
			return {
				...state,
				laps: [
					...state.laps,
					{
						...action.payload,
						lap:
							state.laps.length + 1 < 10
								? `0${state.laps.length + 1}`
								: `${state.laps.length + 1}`,
					},
				],
			};
		case 'removeAllLapList':
			return {
				...state,
				laps: [],
			};
		case 'updateStopwatchReset':
			return {
				...state,
				stopwatchReset: action.payload,
			};
		case 'updateStopwatchLapStart':
			return {
				...state,
				stopwatchLapStart: action.payload,
			};

		default:
			return {
				...state,
			};
	}
};
