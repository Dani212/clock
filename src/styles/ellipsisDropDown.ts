import { height, width } from 'consts';
import { StyleSheet } from 'react-native';

/**
 * @name eddStyles means ellipsis drop down styles
 */
export const eddStyles = StyleSheet.create({
	container: {
		height,
		width,
		position: 'absolute',
		zIndex: 100,
		top: -48,
	},
	dropDownContainer: {
		position: 'absolute',
		right: 8,
		top: 0,
		elevation: 5,
		zIndex: 1000,
		borderRadius: 16,
		overflow: 'hidden',
	},
	itemBtn: {
		minWidth: width * 0.4,
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
});
