import React, { useState, forwardRef, useImperativeHandle } from 'react';

import { View, Pressable, ViewStyle } from 'react-native';

import { Text } from './Text';
import { EddRefProps } from 'types';
import { eddStyles } from 'styles';
import { pColor } from 'utils';

interface Props {
	dark: boolean;
	conStyle?: ViewStyle;
	listItem: string[];
	itemPress: (item: string) => void;
}

// eslint-disable-next-line react/display-name
export const EllipsisDropdown = forwardRef<EddRefProps, Props>(
	({ listItem, itemPress, dark, conStyle }, ref) => {
		const [showDialog, setShowDialog] = useState(false);
		const open = () => {
			setShowDialog(true);
		};

		const close = () => {
			setShowDialog(false);
		};

		useImperativeHandle(ref, () => ({ open, close }), []);

		if (!showDialog) return null;

		return (
			<View style={[eddStyles.container, conStyle]}>
				<Pressable
					onPress={close}
					style={{
						flex: 1,
						zIndex: -100,
						backgroundColor: '#f4f4',
					}}
				/>

				<View
					style={[
						eddStyles.dropDownContainer,
						{ backgroundColor: pColor(dark).backgroundTwo },
					]}
				>
					{listItem.map((item, index) => (
						<Pressable
							key={String(index)}
							onPress={() => itemPress(item)}
							style={[
								eddStyles.itemBtn,
								{
									paddingTop: index === 0 ? 16 : 8,
								},
							]}
						>
							<Text style={{}}>{item}</Text>
						</Pressable>
					))}
				</View>
			</View>
		);
	}
);
