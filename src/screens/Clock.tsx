import React, { useRef } from 'react';

import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
	NavigationProp,
	useFocusEffect,
	useNavigation,
	useTheme,
} from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import ClockHeader from 'components/clock/header';

import { styles } from 'styles';
import { EllipsisDropdown } from 'components';
import { EddRefProps, RootStackParamList, RootTabScreenProps } from 'types';
import {
	clockEditableItemsState,
	clockListState,
	editableState,
	removeOrCheckClockItems,
	updateEditable,
} from 'reduxStore';
import ClockList from 'components/clock/ClockList';
// import { Timezones } from 'consts';

const AnimatedClockList = Animated.createAnimatedComponent(ClockList);

const ClockScreen = ({ navigation }: RootTabScreenProps<'ClockScreen'>) => {
	const { dark } = useTheme();

	const dispatch = useDispatch();

	const isFocused = useIsFocused();

	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	const clockCheckedList = useSelector(clockEditableItemsState);

	const editable = useSelector(editableState);

	const clockList = useSelector(clockListState);

	const translationY = useSharedValue(0);

	const isScrolling = useSharedValue(false);

	const ellipsisRef = useRef<EddRefProps>(null);

	const backAction = () => {
		if (editable) {
			dispatch(updateEditable({ data: false, screen: 'clock' }));
			return true;
		} else {
			return false;
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', backAction);

			return () =>
				BackHandler.removeEventListener('hardwareBackPress', backAction);
		}, [editable])
	);

	const onPressAdd = () => {
		// navigate('ClockPickerScreen');
		navigate('TimerConverterScreen');
	};

	const onPressEllipsis = () => {
		// console.log('test');
		ellipsisRef.current?.open();
	};
	// console.log(moment.tz(new Date(), 'America/Los_Angeles').format('hh:mm'));
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			translationY.value = event.contentOffset.y;
		},
		onBeginDrag: () => {
			isScrolling.value = true;
		},
		onEndDrag: () => {
			isScrolling.value = false;
		},
	});

	const onPressChecked = (capital: string) => {
		dispatch(removeOrCheckClockItems(capital));
	};

	const onLongPress = (capital: string) => {
		if (isScrolling.value) return;

		dispatch(removeOrCheckClockItems(capital));
		dispatch(updateEditable({ data: !editable, screen: 'clock' }));
	};

	const itemPress = (item: string) => {
		ellipsisRef.current?.close();

		if (item === 'Settings') {
			navigate('SettingsScreen');
		} else if (item === 'Edit clocks') {
			dispatch(updateEditable({ data: true, screen: 'clock' }));
		} else {
			// TODO: navigate to Time converter
			navigation.navigate('TimerConverterScreen');
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<EllipsisDropdown
				listItem={['TimeZone converter', 'Edit clocks', 'Settings']}
				itemPress={itemPress}
				ref={ellipsisRef}
				dark={dark}
			/>

			<ClockHeader
				title={'World Clocks'}
				scrollY={translationY}
				onPressAdd={onPressAdd}
				onPressEllipsis={onPressEllipsis}
			/>

			<AnimatedClockList
				editable={editable}
				clockList={clockList}
				isFocused={isFocused}
				onScroll={scrollHandler}
				onLongPress={onLongPress}
				checkedItems={clockCheckedList}
				isScrolling={isScrolling.value}
				// clockList={[
				// 	Timezones[0],
				// 	Timezones[1],
				// 	Timezones[3],
				// 	Timezones[4],
				// 	Timezones[5],
				// ]}
				onPressChecked={onPressChecked}
			/>
		</SafeAreaView>
	);
};

export default ClockScreen;
