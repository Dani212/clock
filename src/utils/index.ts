export * from './formateTime';
export * from './stopwatch';
export * from './timer';
export * from './clock';

import { Theme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { colors } from 'consts';
import { ColorSchemeName } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

/**
 * @name pColor means pick color
 * @description This function is used to pick ehti
 */
export const pColor = (dark: boolean): typeof colors.dark => {
	return colors[dark ? 'dark' : 'light'];
};

export const selectTheme = (colorScheme: ColorSchemeName): Theme => {
	const LightTheme = {
		dark: DefaultTheme.dark,
		colors: {
			...DefaultTheme.colors,
			background: Colors.light.background,
		},
	};

	const DarkThemed = {
		dark: DarkTheme.dark,
		colors: {
			...DarkTheme.colors,
			background: Colors.dark.background,
		},
	};

	return colorScheme === 'dark' ? DarkThemed : LightTheme;
};
