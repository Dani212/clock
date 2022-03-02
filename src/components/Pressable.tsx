/**
 * @description This component was created to add custom androiod ripple color
 */

import {
	Platform,
	Pressable as DefaultPressable,
	PressableProps,
} from 'react-native';
import React, { FC } from 'react';
import { pColor } from 'utils';
import { useTheme } from '@react-navigation/native';

interface Props extends PressableProps {
	ripple_raduis?: number;
	ripple_color?: string;
}

export const Pressable: FC<Props> = ({
	ripple_raduis,
	ripple_color,
	...otherProps
}) => {
	const { dark } = useTheme();

	return (
		<DefaultPressable
			android_ripple={{
				borderless: !true,
				color: ripple_color ? ripple_color : pColor(dark).pressed,
				radius: ripple_raduis,
			}}
			style={({ pressed }) => [
				{
					...Platform.select({
						ios: {
							backgroundColor: pressed ? pColor(dark).pressed : undefined,
						},
						android: {
							backgroundColor: pressed ? pColor(dark).pressed : undefined,
						},
					}),
					paddingVertical: 10,
				},
			]}
			{...otherProps}
		/>
	);
};
