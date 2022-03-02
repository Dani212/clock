import moment from 'moment-timezone';

export const formatedTimezoneDiff = (timezone: string) => {
	const gmt = moment().tz(timezone).utcOffset() / 60;
	const localTimeZone = new Date().getTimezoneOffset();

	const lessOrAhead = gmt > -1;
	const has30Mins = gmt % 1 === 0.5;

	if (gmt === localTimeZone) {
		return 'local time';
	}

	if (has30Mins) {
		return `${
			Math.abs(gmt) > 1 ? Math.trunc(gmt) + ' hrs' : Math.abs(gmt) + ' hr'
		} 30 mins ${lessOrAhead ? 'ahead' : 'behined'}`;
	}
	return `${
		Math.abs(gmt) > 1 ? Math.abs(gmt) + ' hours' : Math.abs(gmt) + ' hour'
	} ${lessOrAhead ? 'ahead' : 'behined'}`;
};
