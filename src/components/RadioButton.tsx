import React, { FC } from 'react';

import { View, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { pColor } from 'utils';

export const RadioButton: FC<{
	dark: boolean;
	checked: boolean;
	conStyle?: ViewStyle;
}> = ({ dark, checked: active, conStyle }) => (
	<View
		style={[
			{
				width: 22,
				height: 22,
				borderWidth: 1.4,
				borderRadius: 360,
				alignItems: 'center',
				justifyContent: 'center',
				borderColor: active ? pColor(dark).button : pColor(dark).disableText, //'#BF40BF'
				backgroundColor: active ? pColor(dark).button : 'transparent',
			},
			conStyle,
		]}
	>
		{active && (
			<Ionicons name="checkmark" size={18} color={pColor(dark).backgroundTwo} />
		)}
	</View>
);
