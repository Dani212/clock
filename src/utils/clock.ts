import { height } from 'consts';
import moment from 'moment-timezone';

export const formatedTimezoneDiff = (timezone: string) => {
	const gmt = moment().tz(timezone).utcOffset() / 60;
	const localTimeZone = new Date().getTimezoneOffset();

	const lessOrAhead = gmt > -1;
	const has30Mins = Math.abs(gmt % 1) === 0.5;

	if (gmt === localTimeZone) {
		return 'local time';
	}

	if (has30Mins) {
		return `${
			Math.abs(gmt) > 1
				? Math.trunc(Math.abs(gmt)) + ' hrs'
				: Math.abs(gmt) + ' hr'
		} 30 mins ${lessOrAhead ? 'ahead' : 'behined'}`;
	}
	return `${
		Math.abs(gmt) > 1 ? Math.abs(gmt) + ' hours' : Math.abs(gmt) + ' hour'
	} ${lessOrAhead ? 'ahead' : 'behined'}`;
};

export const calFooterHeight = (len: number) => {
	const dividerNum = height - 44 - 128.4 / 2;
	// const dividerNum = 770 - 128.4 / 2;

	return len < 6 ? dividerNum - len * 128.4 : height * 0.01;
};
