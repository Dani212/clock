import React, { FC, memo } from 'react';
import { View, ViewStyle } from 'react-native';

import { Text } from '../Text';
import { pColor } from 'utils';
import { stopWStyle } from 'styles';

type Props = {
	dark: boolean;
	header: boolean;
	colOneText: string;
	colTwoText: string;
	colThreeText: string;
	conStyle?: ViewStyle;
};

const LapRowComponent: FC<Props> = ({
	dark,
	header,
	colOneText,
	colTwoText,
	conStyle,
	colThreeText,
}) => {
	return (
		<View
			style={[
				stopWStyle.compContainer,
				{
					marginBottom: header ? 16 : 0,
					borderBottomColor: header ? pColor(dark).disableText : 'transparent',
					// backgroundColor: '#f4f4',
				},
				conStyle,
			]}
		>
			<View style={stopWStyle.colOne}>
				<Text style={{ color: pColor(dark).disableText }}>{colOneText}</Text>
			</View>
			<View style={stopWStyle.col}>
				<Text style={{ color: pColor(dark).disableText }}>{colTwoText}</Text>
			</View>
			<View style={stopWStyle.col}>
				<Text
					style={{
						color: header ? pColor(dark).disableText : pColor(dark).text,
					}}
				>
					{colThreeText}
				</Text>
			</View>
		</View>
	);
};

export default memo(LapRowComponent);
