import { StyleSheet } from 'react-native';
import { width } from 'consts';

export const wcStyle = StyleSheet.create({
	clockItemContainer: {
		// backgroundColor: '#f4f4',
		paddingHorizontal: 18,
		flexDirection: 'row',
		paddingVertical: 16,
		minHeight: 110,
		// flex: 1,
		maxHeight: 140,
		width,
	},
	clockItemRight: {
		flex: 1,

		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		// backgroundColor: 'gray',
	},
	clockItemLeft: {
		flex: 1.3,
		paddingEnd: 8,
		flexShrink: 100,
		overflow: 'hidden',
		// backgroundColor: '#f0f',
		flexDirection: 'row',
		alignItems: 'center',
	},
});
