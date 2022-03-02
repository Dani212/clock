/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from 'react';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ColorSchemeName } from 'react-native';

import SettingsScreen from 'screens/Settings';
import NotFoundScreen from 'screens/NotFoundScreen';
import ClockPickerScreen from 'screens/ClockPicker';
import TimerConverterScreen from 'screens/TimeConverter';

import { RootStackParamList } from '../types/navigation';
import { BottomTabNavigator } from './bottomTab';

import LinkingConfiguration from './LinkingConfiguration';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<Stack.Navigator>
				<Stack.Screen
					name="Root"
					component={BottomTabNavigator}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="NotFound"
					component={NotFoundScreen}
					options={{ title: 'Oops!' }}
				/>
				<Stack.Screen
					name="ClockPickerScreen"
					component={ClockPickerScreen}
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Group screenOptions={{ presentation: 'modal' }}>
					<Stack.Screen
						name="TimerConverterScreen"
						component={TimerConverterScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen name="SettingsScreen" component={SettingsScreen} />
				</Stack.Group>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
