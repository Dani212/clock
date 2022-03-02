export type ADD_TO_LAP_LIST = 'addToLapList';
export type REMOVE_ALL_LAP_LIST = 'removeAllLapList';
export type UPDATE_STOPWATCH_RESET = 'updateStopwatchReset';
export type UPDATE_STOPWATCH_LAP_START = 'updateStopwatchLapStart';

export type STOPWATCH_ALL_TYPE =
	| ADD_TO_LAP_LIST
	| REMOVE_ALL_LAP_LIST
	| UPDATE_STOPWATCH_LAP_START
	| UPDATE_STOPWATCH_RESET;
