import React, { useContext } from 'react';

import { TimerContext } from 'store';

import { TimerCounter } from './TimerCounter';

import { TimerSetter } from './TimerSetter';

export const TimerTop = () => {
	const {
		state: { timerStart },
	} = useContext(TimerContext);

	return timerStart ? <TimerCounter /> : <TimerSetter />;
};
