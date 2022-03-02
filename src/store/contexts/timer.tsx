import React, { useReducer, createContext } from 'react';
import {
	timerInitialState,
	timerReducer,
	TimerStateProps,
} from 'store/reducers/timer';
import { TIMER_ALL_TYPES } from 'types';

export const TimerContext = createContext<{
	state: TimerStateProps;
	dispatch: React.Dispatch<{ type: TIMER_ALL_TYPES; payload: any }>;
}>({
	state: { ...timerInitialState },
	dispatch: () => {
		/** */
	},
});

type Props = {
	children: React.ReactElement;
};

const Timer = ({ children }: Props) => {
	const [state, dispatch] = useReducer(timerReducer, timerInitialState);

	return (
		<TimerContext.Provider value={{ state, dispatch }}>
			{children}
		</TimerContext.Provider>
	);
};

export default Timer;
