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
	const dividerNum = 708;
	if (len === 0) return dividerNum;
	if (len === 1) return dividerNum - 118;
	if (len === 2) return dividerNum - 118 * 2;
	if (len === 3) return dividerNum - 125 * 3;
	if (len === 4) return dividerNum - 125 * 4;
	if (len === 5) return dividerNum - 129 * 5;

	if (len > 6) return height * 0.03;
};
