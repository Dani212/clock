import { StyleSheet } from 'react-native';

import { height, width } from 'consts';

export const stopWStyle = StyleSheet.create({
	compContainer: {
		height: 50,
		paddingVertical: 5,
		flexDirection: 'row',
		width: width * 0.8,
		alignSelf: 'center',
		borderBottomWidth: 1,
	},
	colOne: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	col: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		width: '75%',
		marginTop: 18,
		height: height * 0.127,
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	/*
	 * @name PHTextContainer Parent Header Text Container
	 */
	PHTextContainer: { justifyContent: 'flex-end', height: height * 0.25 },
});
