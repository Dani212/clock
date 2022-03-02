export const formateTime = (
	time: number,
	actionType: 'stop' | 'timer' | 'h' | 'm' | 's' | 'ms'
) => {
	let msecs: string | number = time % 1000;

	if (msecs < 10) {
		msecs = `0${msecs}`;
	} else if (msecs > 99) {
		msecs = `${Math.floor(msecs / 10)}`;
	}

	let seconds = Math.floor(time / 1000);
	let minutes = Math.floor(time / 60000);
	const hours = Math.floor(time / 3600000);

	seconds = seconds - minutes * 60;
	minutes = minutes - hours * 60;

	// let formatted;

	switch (actionType) {
		case 'stop':
			return `${minutes < 10 ? 0 : ''}${minutes}:${
				seconds < 10 ? 0 : ''
			}${seconds}.${msecs}`;
		case 'h':
			return `${hours < 10 ? 0 : ''}${hours}`;

		case 'm':
			return `${minutes < 10 ? 0 : ''}${minutes}`;

		case 'ms':
			return `${msecs}`;

		case 's':
			return `${seconds < 10 ? 0 : ''}${seconds}`;

		default:
			return `${hours < 10 ? 0 : ''}${hours}  :  ${
				minutes < 10 ? 0 : ''
			}${minutes}  :  ${seconds < 10 ? 0 : ''}${seconds}`;
	}
};

/**
 *
 * @name formateTimeWithSMH formate time with seconds mintues hours
 *
 * @param seconds
 * @param minutes
 * @param hours
 * @returns
 */
export const formateTimeWithSMH = (
	seconds: string,
	minutes: string,
	hours: string
) => {
	const secs = Number(seconds) < 1 ? 0 : Number(seconds) * 1000;
	const mins = Number(minutes) < 1 ? 0 : Number(minutes) * 60000;
	const hrs = Number(hours) < 1 ? 0 : Number(hours) * 3600000;
	return `${hrs + mins + secs}`;
};
