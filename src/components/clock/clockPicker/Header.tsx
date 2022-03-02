import React, { FC } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Pressable } from 'components';
import { styles } from 'styles';
import { pColor } from 'utils';

type Props = {
	dark: boolean;
	goBackPressed: () => void;
	onChangeText: (text: string) => void;
};

export const ClockPickerHeader: FC<Props> = ({
	dark,
	onChangeText,
	goBackPressed,
}) => {
	return (
		<View
			style={[
				styles.header,
				{
					// backgroundColor: '#f4f4',
					justifyContent: 'flex-start',
					alignItems: 'center',
					paddingBottom: 0,
					// marginTop: 12,
					height: 55,
				},
			]}
		>
			<Pressable
				ripple_raduis={20}
				onPress={goBackPressed}
				style={{ padding: 8, marginStart: 12 }}
			>
				<Ionicons name="arrow-back" size={24} color={pColor(dark).text} />
			</Pressable>
			<TextInput
				onChangeText={onChangeText}
				underlineColorAndroid={'transparent'}
				placeholder="Search capital / country"
				placeholderTextColor={pColor(dark).disableText}
				style={[
					styles.text,
					{ marginHorizontal: 18, color: pColor(dark).text },
				]}
			/>
		</View>
	);
};

// export default ClockPickerHeader;
