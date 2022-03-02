import { PresetItemProps } from 'types';

/**
 * @name TBNCPicker timer button name and color picker
 * @param timerStart
 * @param timerPaused
 * @param btnPosition 'l' means left
 * @returns Color code and name of button
 */
export const TBNCPicker = (
	dark: boolean,
	timerStart: boolean,
	timerPaused: boolean,
	btnPosition?: 'l'
) => {
	if (btnPosition === 'l')
		return {
			name: timerStart && !timerPaused ? 'Pause' : 'Resume',
			color: timerStart && !timerPaused ? '#f01616' : '#445cbd',
		};

	const name = 'Cancel';

	const color = dark ? 'rgba(212, 212, 212, 0.7)' : 'rgba(212, 212, 212, 1)'; //;

	return { name, color };
};

/**
 *
 * @name CTPItemsProps compare Two Preset Items Props
 * @param a
 * @param b
 * @returns
 */
export const CTPItemsProps = (
	a: PresetItemProps,
	b: PresetItemProps
): boolean => {
	return (
		a.title === b.title &&
		a.hour === b.hour &&
		a.minutes === b.minutes &&
		a.seconds === b.seconds
	);
};

/**
 *
 * @name ARCPISortFunc add And Remove Check Preset Items Sort Func
 */
export const ARCPISortFunc = (
	checkedPresetItems: PresetItemProps[],
	payload: PresetItemProps
) => {
	const checkedIndex = checkedPresetItems.findIndex((v) =>
		CTPItemsProps(v, payload)
	);

	let checkItems;

	if (checkedIndex > -1) {
		checkItems = checkedPresetItems.filter((v) => !CTPItemsProps(v, payload));
	} else {
		checkItems = [...checkedPresetItems, payload];
	}
	return [...checkItems];
};
