import React, { FC } from 'react';
import { View, Pressable, Platform, ViewStyle, TextStyle } from 'react-native';
import { styles } from 'styles';

import { pColor } from 'utils';

import { Text } from './Text';

type Props = {
	dark: boolean;
	title: string;
	textStyle?: TextStyle;
	conStyle?: ViewStyle;
	buttonColor?: string;
	btnTextColor?: string;
	disableRipple?: boolean;
	disabled?: boolean | undefined;
	onPress?: () => void | undefined;
};

export const Button: FC<Props> = ({
	dark,
	title,
	onPress,
	conStyle,
	disabled,
	textStyle,
	buttonColor,
	btnTextColor,
	disableRipple,
}) => {
	const btnColor = buttonColor ? buttonColor : '#f4f4';

	return (
		<View style={[styles.buttonCon, conStyle]}>
			<Pressable
				onPress={onPress}
				disabled={disabled}
				android_ripple={{
					borderless: true,
					color: disableRipple ? 'transparent' : pColor(dark).pressed,
				}}
				style={({ pressed }) => [
					{
						...Platform.select({
							ios: {
								backgroundColor: pressed ? pColor(dark).pressed : btnColor,
							},
							default: {
								backgroundColor: btnColor,
							},
						}),
					},
					styles.button,
				]}
			>
				<Text
					style={[
						{ color: btnTextColor ? btnTextColor : '#ffffff' },
						textStyle,
					]}
				>
					{title}
				</Text>
			</Pressable>
		</View>
	);
};
