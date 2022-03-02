export type UPDATE_SELECTED_PRESET_ITEM = 'updateSelectedPresetItem';

export type UPDATE_TIMER_START = 'updateTimerStart';

export type UPDATE_TIMER_PAUSED = 'updateTimerPaused';

export type UPDATE_INPUT_IS_FOCUSED = 'updateInputIsFocused';

export type UPDATE_SECONDS_INPUT = 'updateSecondsInput';

export type UPDATE_MINUTES_INPUT = 'updateMinutesInput';

export type UPDATE_HOURS_INPUT = 'updateHoursInput';

export type UPDATE_DISABLE_START_BUTTON = 'updateDisableStartButton';

export type UPDATE_TIMER_ENDED = 'updateTimerEnded';

export type TIMER_ALL_TYPES =
	| UPDATE_SELECTED_PRESET_ITEM
	| UPDATE_TIMER_START
	| UPDATE_TIMER_PAUSED
	| UPDATE_INPUT_IS_FOCUSED
	| UPDATE_SECONDS_INPUT
	| UPDATE_MINUTES_INPUT
	| UPDATE_HOURS_INPUT
	| UPDATE_TIMER_ENDED
	| UPDATE_DISABLE_START_BUTTON;

export type PresetItemProps = {
	id: string;
	title: string;
	seconds: string;
	minutes: string;
	hour: string;
};
