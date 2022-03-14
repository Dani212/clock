import { fontFamily, width } from 'consts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		fontFamily,
		fontSize: 16,
	},
	// bottomTabBtnCon means bottom Tab Button Container
	bottomTabBtnCon: {
		flex: 1,
		alignItems: 'center',
		padding: 4,
		paddingBottom: 10,
		overflow: 'hidden',
		borderRadius: 10,
	},
	bottomTabText: {
		paddingBottom: 0,
		overflow: 'hidden',
	},
	buttonCon: {
		width: 120,
		height: 45,
		borderRadius: 32,
		overflow: 'hidden',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
	},
	timerStopwatchTextCon: {
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	timerStopwatchText: { flex: 1, textAlign: 'center' },
	spanHeader: {
		justifyContent: 'flex-end',
		position: 'absolute',
		zIndex: 100,
		top: 0,
		width,
	},
	header: {
		width,
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerLeft: {
		paddingHorizontal: 18,
		flexDirection: 'row',
		alignItems: 'center',
	},
	editDeleteContainer: {
		flexDirection: 'row',
		position: 'absolute',
		alignSelf: 'center',
		width: width * 0.7,
		bottom: 0,
	},
	editDeleteButton: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 8,
		width: 70,
		height: 70,
	},
});
