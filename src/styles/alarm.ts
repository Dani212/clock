import { StyleSheet } from 'react-native';

import { width } from 'consts';

export const alarmStyle = StyleSheet.create({
	compContainer: {
		flexDirection: 'row',
		borderRadius: 24,
		height: width * 0.32,
		width,
	},
	compLeft: {
		justifyContent: 'center',
		flex: 1,
		// backgroundColor: '#f4f4',
		paddingHorizontal: 16,
	},
	compRight: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 16,
		// backgroundColor: '#f2f2',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	compTitle: {
		fontSize: 14,
		marginTop: 26,
		marginBottom: 10,
		marginStart: 4,
		// marginVertical: 12,
	},
	compTime: {
		fontSize: 42,
	},
});
