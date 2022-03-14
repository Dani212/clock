import React, { FC } from 'react';

import { useTheme } from '@react-navigation/native';

import { Platform, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import Animated, {
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle,
	ZoomIn,
} from 'react-native-reanimated';

import { height } from 'consts';
import { styles } from 'styles';

import { BottomTabHeaderRight, Pressable, RadioButton, Text } from 'components';

import {
	editableState,
	clockListState,
	clockEditableItemsState,
	removeOrCheckAllClockItems,
	updateEditable,
} from 'reduxStore';
import { Time } from './Time';

type Props = {
	title: string;
	onPressAdd: () => void;
	onPressEllipsis: () => void;
	scrollY: SharedValue<number>;
};

const ClockHeader: FC<Props> = ({
	title,
	scrollY,
	onPressAdd,
	onPressEllipsis,
}) => {
	const { dark, colors } = useTheme();

	const dispatch = useDispatch();

	const editable = useSelector(editableState);

	const clockList = useSelector(clockListState);

	const selectedItems = useSelector(clockEditableItemsState);

	const numberOfSelected = selectedItems.length;

	const allSelected = selectedItems.length === clockList.length;

	const selectWord =
		selectedItems.length > 0 ? `${numberOfSelected} Selected` : 'Select items';

	const animatedHeaderStyle = useAnimatedStyle(() => ({
		height: interpolate(scrollY.value, [0, 280], [height * 0.4, 80], {
			extrapolateRight: Extrapolation.CLAMP,
			extrapolateLeft: Extrapolation.CLAMP,
		}),
	}));

	const animatedLargeTitleStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [0, 100], [1, 0], {
			extrapolateRight: Extrapolation.CLAMP,
		});

		return {
			height: interpolate(scrollY.value, [0, 280], [height * 0.334, 0], {
				extrapolateRight: Extrapolation.CLAMP,
			}),
			display: opacity < 0 ? 'none' : 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: 62,
			opacity,
		};
	});

	const animatedTitleConStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scrollY.value, [80, 160], [0, 1], {
			extrapolateRight: Extrapolation.CLAMP,
		});

		return {
			opacity,
			display: opacity < 0 ? 'none' : 'flex',
		};
	});

	const checkAllPressed = () => {
		const result: string[] = [];

		if (!allSelected) {
			clockList.forEach((v) => {
				result.push(v.capital);
			});
		}

		dispatch(removeOrCheckAllClockItems(result));
	};

	const onDonePressed = () => {
		dispatch(updateEditable({ data: false, screen: 'clock' }));
		dispatch(removeOrCheckAllClockItems([]));
	};

	return (
		<Animated.View
			style={[
				animatedHeaderStyle,
				styles.spanHeader,
				{ backgroundColor: colors.background },
			]}
		>
			<Animated.View style={[animatedLargeTitleStyle]}>
				{editable ? (
					<Text style={{ fontSize: 32 }}>{selectWord}</Text>
				) : (
					<Time />
				)}
			</Animated.View>

			<View style={[styles.header, { zIndex: 100, overflow: 'visible' }]}>
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
								ripple_raduis={20}
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

					<Animated.View style={animatedTitleConStyle}>
						<Text>{editable ? selectWord : title}</Text>
					</Animated.View>
				</View>

				<View>
					{!editable ? (
						<BottomTabHeaderRight
							activeScreen={'alarm'}
							onPressAdd={onPressAdd}
							onPressEllipsis={onPressEllipsis}
						/>
					) : Platform.OS === 'ios' ? (
						<Pressable
							ripple_raduis={27}
							onPress={onDonePressed}
							style={{ marginHorizontal: 16, paddingHorizontal: 6 }}
						>
							<Text>Done</Text>
						</Pressable>
					) : null}
				</View>
			</View>
		</Animated.View>
	);
};

export default ClockHeader;
