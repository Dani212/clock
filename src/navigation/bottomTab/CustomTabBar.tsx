import React from 'react';

import { View, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
	Easing,
	SlideInDown,
	SlideOutDown,
} from 'react-native-reanimated';

import { pColor } from 'utils';
import { styles } from 'styles';
import {
	timerEditableItemsState,
	editableScreenState,
	isKeyboardOpenState,
	removeOrCheckAllPEI,
	editableState,
	openPresetEdit,
	removePresets,
	updateEditable,
	removeOrCheckAllClockItems,
	removeClocks,
	clockEditableItemsState,
} from 'reduxStore';
import { Text, Pressable as CustomPressable } from 'components';

export const MyTabBar = ({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) => {
	// This hook is used to return current theme state.
	const { dark } = useTheme();

	const dispatch = useDispatch();

	const editable = useSelector(editableState);

	const editableScreen = useSelector(editableScreenState);

	const isKeyboardOpen = useSelector(isKeyboardOpenState);

	const checkedPresetItems = useSelector(timerEditableItemsState);

	const checkedClockItems = useSelector(clockEditableItemsState);

	const clockCheckedList = useSelector(clockEditableItemsState);

	const editBtn = () => {
		console.log('first test');
		dispatch(openPresetEdit(true));
		// dispatch(removeOrCheckAllPEI([]));
	};

	const deleteBtn = () => {
		if (editableScreen === 'timer') {
			dispatch(removeOrCheckAllPEI([]));
			dispatch(removePresets(checkedPresetItems));
			dispatch(updateEditable({ data: false, screen: 'timer' }));
		} else {
			dispatch(removeOrCheckAllClockItems([]));
			dispatch(removeClocks(checkedClockItems));
			dispatch(updateEditable({ data: false, screen: 'clock' }));
		}
	};

	if (editable || isKeyboardOpen) {
		// return null;
		return editable ? (
			<View
				style={{
					height: editableScreen === 'timer' ? 40 : 80,
				}}
			>
				{(checkedPresetItems.length > 0 || clockCheckedList.length > 0) && (
					<Animated.View
						entering={SlideInDown.easing(Easing.cubic)}
						exiting={SlideOutDown}
						style={[
							styles.editDeleteContainer,
							{
								justifyContent:
									editableScreen === 'timer' ? 'space-between' : 'center',
								// backgroundColor: '#f4f4',
							},
						]}
					>
						{editableScreen === 'timer' && (
							<CustomPressable
								ripple_raduis={36}
								onPress={editBtn}
								style={styles.editDeleteButton}
								disabled={checkedPresetItems.length > 1}
							>
								<Ionicons
									name="pencil"
									color={
										checkedPresetItems.length > 1
											? pColor(dark).disableText
											: pColor(dark).text
									}
									size={18}
								/>
								<Text
									style={[
										checkedPresetItems.length > 1 && {
											color: pColor(dark).disableText,
										},
									]}
								>
									Edit
								</Text>
							</CustomPressable>
						)}

						<CustomPressable
							ripple_raduis={36}
							onPress={deleteBtn}
							style={styles.editDeleteButton}
						>
							<Ionicons name="trash-bin" color={pColor(dark).text} size={18} />
							<Text>Delete</Text>
						</CustomPressable>
					</Animated.View>
				)}
			</View>
		) : (
			<View style={{ height: 40 }} />
		);
	}

	return (
		<Animated.View
			entering={SlideInDown}
			exiting={SlideOutDown}
			style={{
				flexDirection: 'row',
				justifyContent: 'space-evenly',
				// backgroundColor: '#f4f4',
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];

				const checkTitle =
					options.title !== undefined ? options.title : route.name;

				const label =
					options.tabBarLabel !== undefined ? options.tabBarLabel : checkTitle;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						// The `merge: true` option makes sure that the params inside the tab screen are preserved
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<View key={String(index)} style={styles.bottomTabBtnCon}>
						<Pressable
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : {}}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							testID={options.tabBarTestID}
							onPress={onPress}
							onLongPress={onLongPress}
							style={{ borderRadius: 10, paddingHorizontal: 5 }}
							android_ripple={{
								borderless: !true,
								color: pColor(dark).pressed,
								radius: index === 1 ? 46 : index === 2 ? 27 : 30,
							}}
						>
							<View
								style={{
									borderWidth: 2,
									borderBottomColor: isFocused
										? pColor(dark).text
										: 'transparent',
								}}
							>
								<Text style={[styles.bottomTabText, {}]}>
									{label === 'WorldClock' ? 'Clock' : label}
								</Text>
							</View>
						</Pressable>
					</View>
				);
			})}
		</Animated.View>
	);
};
