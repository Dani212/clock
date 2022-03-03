import React from 'react';

import {
	BottomTabBarProps,
	createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import ClockScreen from 'screens/Clock';
import TabOneScreen from 'screens/Stopwatch';
import TabTwoScreen from 'screens/Timer';

import { RootTabParamList } from 'types';
import { pColor } from 'utils';
import { MyTabBar } from './CustomTabBar';
import { styles } from 'styles';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function BottomTabNavigator() {
	const { dark, colors } = useTheme();

	return (
		<BottomTab.Navigator
			// initialRouteName="TabOne"
			tabBar={(props: BottomTabBarProps) => <MyTabBar {...props} />}
			screenOptions={{
				tabBarActiveTintColor: pColor(dark).tint,
			}}
		>
			<BottomTab.Screen
				name="ClockScreen"
				component={ClockScreen}
				options={{
					title: 'Clock',
					headerShown: false,
					headerTitleStyle: styles.text,
				}}
			/>

			<BottomTab.Screen
				name="StopwatchScreen"
				component={TabOneScreen}
				options={{
					title: 'Stopwatch',
					headerShown: false,
					headerShadowVisible: false,
					headerTitleStyle: styles.text,
					headerStyle: { backgroundColor: colors.background },
				}}
			/>

			<BottomTab.Screen
				name="TimerScreen"
				component={TabTwoScreen}
				options={{
					title: 'Timer',
					headerShown: false,
					headerTitleStyle: styles.text,
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
