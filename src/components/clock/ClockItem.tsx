import React, { FC } from 'react';

import { View, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@react-navigation/native';

import Animated, { ZoomIn } from 'react-native-reanimated';

import { pColor } from 'utils';
import { wcStyle } from 'styles';
import { clockItemBr } from 'consts';
import { Text, Pressable, RadioButton } from 'components';

type Props = {
	//
	time: string;
	city: string;
	checked: boolean;
	timeDifference: string;
	editable: boolean;
	onLongPress: () => void;
	containerStyle?: ViewStyle;
	onPressChecked: () => void;
};

const ClockItem: FC<Props> = ({
	checked,
	editable,
	onLongPress,
	containerStyle,
	onPressChecked,
	time,
	city,
	timeDifference,
}) => {
	const { dark } = useTheme();

	return (
		<View
			style={[
				{ overflow: 'hidden', borderRadius: clockItemBr },
				containerStyle,
			]}
		>
			<Pressable
				onLongPress={onLongPress}
				onPress={editable ? onPressChecked : undefined}
				style={[
					wcStyle.clockItemContainer,
					{ backgroundColor: pColor(dark).backgroundTwo },
				]}
			>
				<View style={wcStyle.clockItemLeft}>
					{editable && (
						<Animated.View entering={ZoomIn} style={{ marginEnd: 18 }}>
							<RadioButton dark={dark} checked={checked} />
						</Animated.View>
					)}

					<View style={{ marginEnd: editable ? 24 : 0 }}>
						<Text textSize="large" numberOfLines={3} style={{}}>
							{city}
						</Text>

						<Text textSize="small" style={{ fontSize: 12, marginTop: -2 }}>
							{timeDifference}
						</Text>
					</View>
				</View>

				<View style={wcStyle.clockItemRight}>
					<Text style={{ fontSize: 42 }}>{time}</Text>

					<View>
						{editable && false && (
							<Ionicons
								name="code"
								size={18}
								color={pColor(dark).text}
								style={{
									transform: [{ rotate: '90deg' }],
									marginStart: 16,
									// marginEnd: 10,
								}}
							/>
						)}
						{!editable && <View></View>}
					</View>
				</View>
			</Pressable>
		</View>
	);
};

export default ClockItem;
