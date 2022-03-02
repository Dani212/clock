import React, { Component } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

import { pColor } from 'utils';
import { CityItemHeight } from 'consts';
import { Text, Pressable } from 'components';

type Props = {
	gmt: string;
	city: string;
	dark: boolean;
	onPress: () => void;
	containerStyle?: ViewStyle;
	btnBorderBottomWidth: number;
};
export default class CityItem extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	shouldComponentUpdate() {
		return false;
	}
	render() {
		const { city, gmt, dark, onPress, containerStyle, btnBorderBottomWidth } =
			this.props;
		return (
			<View
				style={[
					{
						overflow: 'hidden',
						height: CityItemHeight,
						backgroundColor: pColor(dark).backgroundTwo,
					},
					containerStyle,
				]}
			>
				<TouchableOpacity
					style={[
						{
							borderBottomColor: pColor(dark).dividerLine,
							borderBottomWidth: btnBorderBottomWidth,
							justifyContent: 'center',
							paddingHorizontal: 18,
							height: '100%',
						},
					]}
					// onPress={onPress}
				>
					<Text>{city}</Text>
					<Text textSize="small" style={{ color: pColor(dark).disableText }}>
						{gmt}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
