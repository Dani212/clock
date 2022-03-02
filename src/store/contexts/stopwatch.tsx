import { STOPWATCH_ALL_TYPE } from 'types';
import React, {
	Dispatch,
	useReducer,
	createContext,
	ReactElement,
} from 'react';
import {
	stopwatchInitialState,
	stopwatchReducer,
	StopwatchStateProps,
} from 'store/reducers/stopwatch';

export const StopwatchContext = createContext<{
	state: StopwatchStateProps;
	dispatch: Dispatch<{ type: STOPWATCH_ALL_TYPE; payload: any }>;
}>({
	state: { ...stopwatchInitialState },
	dispatch: () => {
		//
	},
});

type Props = {
	children: ReactElement;
};

export const StopwatchContextContainer = ({ children }: Props) => {
	const [state, dispatch] = useReducer(stopwatchReducer, stopwatchInitialState);
	return (
		<StopwatchContext.Provider value={{ state, dispatch }}>
			{children}
		</StopwatchContext.Provider>
	);
};
