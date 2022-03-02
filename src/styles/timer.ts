import { height, presetItemHeight, width } from 'consts';
import { StyleSheet } from 'react-native';

/**
 * @name APTI mean add preset text input
 * @name APTI mean add preset
 */
export const timerStyle = StyleSheet.create({
	APContentContainer: {
		height: 250,
		width,
		zIndex: 100,
		borderRadius: 32,
	},
	APHeaderText: {
		marginTop: 20,
		marginHorizontal: 18,
		fontSize: 22,
		fontWeight: '600',
	},
	APTIdotContainer: {
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 18,
		width: 5,
	},
	APTIdot: {
		height: 4,
		width: 5,
		borderRadius: 360,
	},
	APTIContainer: {
		// backgroundColor: '#f4f4',
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: width * 0.55,
		alignItems: 'center',
		// marginTop: 18,
		marginVertical: 12,
		marginHorizontal: 18,
	},
	APTITimer: {
		// paddingTop: 16,
		width: width * 0.11,
		fontSize: width * 0.09,
		textAlign: 'center',
	},
	APBtnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	buttonsContainer: {
		// height: height * 0.127,
		position: 'absolute',
		// backgroundColor: '#f4f4',
		bottom: height * 0.0721,
		alignItems: 'center',
		alignSelf: 'center',
	},
	twinButtonContainer: {
		flexDirection: 'row',
		width: width * 0.75,
		// alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	presetItemContainer: {
		height: presetItemHeight,
		width: presetItemHeight,
		justifyContent: 'center',
		// alignItems: 'center',
		flexDirection: 'row',
		// marginHorizontal: 4,
	},
});
