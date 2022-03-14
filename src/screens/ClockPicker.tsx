import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import {
	NavigationProp,
	useNavigation,
	useTheme,
} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from 'styles';
import { Timezones } from 'consts';
import { RootTabParamList } from 'types';

import { addClock } from 'reduxStore';

import { ClockPickerList } from 'components/clock/clockPicker/ClockPickerList';
import { ClockPickerHeader } from 'components/clock/clockPicker/Header';

const ClockCoutriesSearch: FC = () => {
	const { dark } = useTheme();
	const dispatch = useDispatch();

	const [sortedByCapital, setSortedByCapital] = useState<typeof Timezones>([]);
	const [country, setCountry] = useState<typeof Timezones>([]);
	// const listSize = useRef<number>(13);

	useEffect(() => {
		const sortedResult = Timezones.sort((a, b) => {
			const fa = a.capital.toLowerCase(),
				fb = b.capital.toLowerCase();

			if (fa < fb) {
				return -1;
			}
			if (fa > fb) {
				return 1;
			}
			return 0;
		});
		// const result = sortedResult.slice(0, 15);
		setCountry(sortedResult);
		setSortedByCapital(sortedResult);
	}, []);

	const { goBack } = useNavigation<NavigationProp<RootTabParamList>>();

	const onChangeText = (text: string) => {
		const list = sortedByCapital.filter(
			(e) =>
				e.capital.toLowerCase().includes(text.toLowerCase()) ||
				e.name.toLowerCase().includes(text.toLowerCase())
		);
		if (list.length > 0) {
			setCountry([...list]);
		} else {
			setCountry([...sortedByCapital]);
		}
	};

	const itemPressed = (item: typeof Timezones[0]) => {
		dispatch(addClock(item));

		goBack();
	};

	const onEndReached = () => {
		// if (listSize.current < country.length) {
		// 	const result = sortedByCapital.slice(
		// 		listSize.current,
		// 		listSize.current + 10
		// 	);
		// 	setCountry((prevState) => [...prevState, ...result]);
		// }
	};

	return (
		<SafeAreaView style={styles.container}>
			<ClockPickerHeader
				dark={dark}
				onChangeText={onChangeText}
				goBackPressed={() => goBack()}
			/>

			<ClockPickerList
				dark={dark}
				country={country}
				itemPressed={itemPressed}
				onEndReached={onEndReached}
			/>
		</SafeAreaView>
	);
};

export default ClockCoutriesSearch;
