import { View } from 'react-native';
import React, { FC } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { pColor } from 'utils';
import { Pressable } from './Pressable';
import { useTheme } from '@react-navigation/native';

export type BottomTabHeaderRightProps = {
	onPressAdd?: () => void;
	onPressEllipsis?: () => void;
	activeScreen: 'alarm' | 'stopwatch' | 'timer';
};

export const BottomTabHeaderRight: FC<BottomTabHeaderRightProps> = ({
	activeScreen,
	onPressEllipsis,
	onPressAdd,
}) => {
	const { dark } = useTheme();
	return (
		<View style={{ flexDirection: 'row', overflow: 'hidden' }}>
			{activeScreen !== 'stopwatch' && (
				<Pressable
					onPress={onPressAdd}
					ripple_raduis={20}
					style={{
						paddingVertical: 5,
						marginHorizontal: 18,
					}}
				>
					<Ionicons
						name="add"
						size={32}
						color={pColor(dark).text}
						style={{ margin: 4 }}
					/>
				</Pressable>
			)}

			{false && (
				<Pressable
					onPress={onPressEllipsis}
					ripple_raduis={20}
					style={{ paddingVertical: 10 }}
				>
					<Ionicons
						size={24}
						name="ellipsis-vertical"
						color={pColor(dark).text}
						style={{ paddingHorizontal: 16 }}
					/>
				</Pressable>
			)}
		</View>
	);
};
