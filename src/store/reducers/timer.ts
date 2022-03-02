import { TIMER_ALL_TYPES } from 'types';

/* eslint-disable no-case-declarations */

export type TimerStateProps = {
	inputIsFocused: boolean;
	secondsInput: string;
	minutesInput: string;
	hoursInput: string;
	timerEnd: boolean;
	timerStart: boolean;
	timerPaused: boolean;
	selectedPresetItem: string;
	disableStartButton: boolean;
};

export const timerInitialState = {
	inputIsFocused: false,
	secondsInput: '00',
	minutesInput: '00',
	hoursInput: '00',
	timerEnd: false,
	timerStart: false,
	timerPaused: false,
	selectedPresetItem: '',
	disableStartButton: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const timerReducer = (
	state: TimerStateProps,
	action: { type: TIMER_ALL_TYPES; payload: any }
): TimerStateProps => {
	switch (action.type) {
		case 'updateInputIsFocused':
			return {
				...state,
				inputIsFocused: action.payload,
			};
		case 'updateSecondsInput':
			return {
				...state,
				secondsInput: action.payload,
			};
		case 'updateMinutesInput':
			return {
				...state,
				minutesInput: action.payload,
			};

		case 'updateHoursInput':
			return {
				...state,
				hoursInput: action.payload,
			};
		case 'updateTimerEnded':
			return {
				...state,
				timerEnd: action.payload,
			};

		case 'updateSelectedPresetItem':
			return {
				...state,
				selectedPresetItem: action.payload,
			};
		case 'updateTimerStart':
			return {
				...state,
				timerStart: action.payload,
			};
		case 'updateTimerPaused':
			return {
				...state,
				timerPaused: action.payload,
			};
		case 'updateDisableStartButton':
			return {
				...state,
				disableStartButton: action.payload,
			};
		default:
			return state;
	}
};
