import React, { FC } from 'react';

import { useTheme } from '@react-navigation/native';

import { RadioButton } from 'components/RadioButton';

import { View, Pressable } from 'react-native';

import { timerStyle } from 'styles';

import { pColor } from 'utils';

import { Text } from 'components/Text';
import { presetItemHeight } from 'consts';

type Props = {
	value: string;
	title?: string;
	checked?: boolean;
	selected?: boolean;
	editable: boolean;
	onPress?: () => void;
	onLongPress?: () => void;
};

export const PresetItem: FC<Props> = ({
	selected,
	onLongPress,
	checked,
	editable,
	onPress,
	title,
	value,
}) => {
	const { dark } = useTheme();

	return (
		<View
			style={[
				timerStyle.presetItemContainer,
				{ backgroundColor: 'transparent' },
			]}
		>
			{editable && (
				<RadioButton
					dark={dark}
					checked={checked ? true : false}
					conStyle={{
						marginEnd: selected ? -13 : -16,
					}}
				/>
			)}

			<Pressable
				onLongPress={onLongPress}
				onPress={onPress}
				style={({ pressed }) => [
					{
						height: pressed ? presetItemHeight * 0.85 : presetItemHeight * 0.92,
						width: pressed ? presetItemHeight * 0.85 : presetItemHeight * 0.92,
						borderColor: selected
							? !editable
								? pColor(dark).button
								: 'transparent'
							: 'transparent',
						backgroundColor: pColor(dark).presetItemBg,
						borderWidth: 2,
						borderRadius: 360,
						alignItems: 'center',
						justifyContent: 'center',
						transform: [{ scale: pressed ? 0.9 : 1 }],
					},
				]}
			>
				{!title ? null : (
					<Text
						numberOfLines={1}
						style={{
							// fontSize: pressed ? 12 : 14,
							bottom: -6,
							marginHorizontal: 8,
						}}
					>
						{title}
					</Text>
				)}
				<Text textSize="small">{value}</Text>
			</Pressable>
		</View>
	);
};
// export default PresetItem;
