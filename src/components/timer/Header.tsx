import React, { FC } from 'react';

import { useTheme } from '@react-navigation/native';

import { View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';

import { styles } from 'styles';

import { BottomTabHeaderRight, Pressable, RadioButton, Text } from 'components';

import {
	editableState,
	timerEditableItemsState,
	presetsListState,
	removeOrCheckAllPEI,
} from 'reduxStore';

export const TimerHeader: FC<{
	onPressAdd: () => void;
	onPressEllipsis: () => void;
}> = ({ onPressAdd, onPressEllipsis }) => {
	const { dark } = useTheme();

	const dispatch = useDispatch();

	const editable = useSelector(editableState);

	const presets = useSelector(presetsListState);

	const selectedItems = useSelector(timerEditableItemsState);

	const numberOfSelected = selectedItems.length;

	const allSelected = selectedItems.length === presets.length;

	const selectWord =
		selectedItems.length > 0 ? `${numberOfSelected} Selected` : 'Select items';

	const checkAllPressed = () => {
		const result: string[] = [];

		if (!allSelected) {
			presets.forEach((v) => {
				result.push(v.id);
			});
		}

		dispatch(removeOrCheckAllPEI(result));
	};

	return (
		<View style={[styles.header, { height: 80, alignItems: 'flex-end' }]}>
			<View
				style={{
					marginStart: 18,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				{editable && (
					<Animated.View entering={ZoomIn} style={{ marginEnd: 18 }}>
						<Pressable
							onPress={checkAllPressed}
							style={{
								alignItems: 'center',
							}}
						>
							<RadioButton dark={dark} checked={allSelected} />
							<Text style={{ fontSize: 12 }}>All</Text>
						</Pressable>
					</Animated.View>
				)}

				{editable && (
					<Animated.View exiting={FadeOut} entering={FadeIn}>
						<Text>{selectWord}</Text>
					</Animated.View>
				)}
			</View>

			<View>
				{!editable && (
					<BottomTabHeaderRight
						onPressEllipsis={onPressEllipsis}
						onPressAdd={onPressAdd}
						activeScreen={'alarm'}
					/>
				)}
			</View>
		</View>
	);
};
