import React from 'react';
import { View } from 'react-native';
// import {
// 	useTheme,
// 	useNavigation,
// 	NavigationProp,
// } from '@react-navigation/native';

import { SWContent } from 'components';
import { StopwatchContextContainer } from 'store';
import { styles } from 'styles';

// TODO: make list scroll to the bottom when a new item is add

export default function Stopwatch() {
	// const { dark } = useTheme();

	// const { navigate, setOptions } =
	// 	useNavigation<NavigationProp<RootStackParamList>>();

	// const ellipsisRef = useRef<EddRefProps>(null);

	// const onPressEllipsis = () => {
	// 	ellipsisRef.current?.open();
	// };

	// useLayoutEffect(() => {
	// 	setOptions({
	// 		headerTitle: '',
	// 		headerRight: () => (
	// 			<BottomTabHeaderRight
	// 				activeScreen="stopwatch"
	// 				onPressEllipsis={onPressEllipsis}
	// 			/>
	// 		),
	// 	});
	// }, []);

	// const itemPress = (item: string) => {
	// 	ellipsisRef.current?.close();

	// 	if (item === 'Settings') {
	// 		navigate('SettingsScreen');
	// 	}
	// };

	return (
		<StopwatchContextContainer>
			<View style={styles.container}>
				<SWContent />

				{/* <EllipsisDropdown
					listItem={['Settings', 'Contact us']}
					itemPress={itemPress}
					ref={ellipsisRef}
					dark={dark}
				/> */}
			</View>
		</StopwatchContextContainer>
	);
}
