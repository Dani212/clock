import { SWStatusProps } from 'types';

/**
 * @name SWBNCPicker stop watch button name and color picker
 * @param status
 * @param dark
 * @param btnPosition 'l' means left
 * @returns Color code and name of button
 */
export const SWBNCPicker = (
	dark: boolean,
	status: SWStatusProps,
	btnPosition?: 'l'
) => {
	if (btnPosition !== 'l')
		return {
			name: status === 'paused' ? 'Reset' : 'Lap',
			color:
				status === 'inactive'
					? 'rgba(212, 212, 212, 0.3)'
					: dark
					? 'rgba(212, 212, 212, 0.7)'
					: 'rgba(212, 212, 212, 1)',
		};

	// console.log(status === 'inactive');

	const name =
		status === 'inactive' ? 'Start' : status === 'active' ? 'Stop' : 'Resume';

	const color = status === 'active' ? '#f01616' : '#445cbd';

	return { name, color };
};
