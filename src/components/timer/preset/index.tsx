/**
 * @description This component handle the list of preset, selecting the items for
 * delete or edit and also can be use to set default to timer input component
 */

import React, { FC, useContext, useEffect, useRef } from 'react';

import { FlatList, Vibration, View } from 'react-native';

import { PresetItemProps } from 'types';
import { PresetItem } from './PresetItem';
import { useDispatch, useSelector } from 'react-redux';
import {
	editableState,
	presetsListState,
	removeOrCheckAllPEI,
	removeOrCheckPEI,
	timerEditableItemsState,
	updateEditable,
} from 'reduxStore';

import { TimerContext } from 'store';
import { presetItemHeight, pressVibration } from 'consts';

export const PresetsComponent: FC = () => {
	const dispatch = useDispatch();

	const flatListRef = useRef<FlatList>(null);

	const editable = useSelector(editableState);

	const presetList = useSelector(presetsListState);

	// this are items that are selected when items editable is true.
	const checkedPresetItems = useSelector(timerEditableItemsState);

	const isInitailRendering = useRef(true);

	const {
		dispatch: contextDispatch,
		state: { selectedPresetItem, inputIsFocused, timerStart },
	} = useContext(TimerContext);

	useEffect(() => {
		if (presetList.length - 1 > -1 && presetList.length > 3)
			!isInitailRendering.current &&
				flatListRef.current?.scrollToIndex({
					animated: true,
					viewPosition: 1,
					viewOffset: -32,
					index: presetList.length - 1,
				});

		isInitailRendering.current = false;
	}, [presetList]);

	const onPresetItemLongPress = (id: string) => {
		Vibration.vibrate(pressVibration);

		dispatch(updateEditable({ data: !editable, screen: 'timer' }));

		// Add the item been hold to checked list
		!editable && dispatch(removeOrCheckPEI(id));

		// Remove all item form the checked list
		editable && dispatch(removeOrCheckAllPEI([]));
	};

	const onPresetItemPress = (
		id: string,
		hour: string,
		minutes: string,
		seconds: string
	) => {
		if (editable) {
			dispatch(removeOrCheckPEI(id));

			return;
		}

		contextDispatch({
			type: 'updateSelectedPresetItem',
			payload: `${hour}${minutes}${seconds}`,
		});

		contextDispatch({ type: 'updateHoursInput', payload: hour });
		contextDispatch({ type: 'updateMinutesInput', payload: minutes });
		contextDispatch({ type: 'updateSecondsInput', payload: seconds });
	};

	const renderItem = ({ item }: { item: PresetItemProps }) => (
		<PresetItem
			title={item.title}
			editable={editable}
			checked={checkedPresetItems.includes(item.id)}
			onLongPress={() => onPresetItemLongPress(item.id)}
			value={`${item.hour} : ${item.minutes} : ${item.seconds}`}
			selected={
				selectedPresetItem === `${item.hour}${item.minutes}${item.seconds}`
			}
			onPress={() =>
				onPresetItemPress(item.id, item.hour, item.minutes, item.seconds)
			}
		/>
	);

	const keyExtractor = (item: PresetItemProps) => `${item.id}`;

	const getItemLayout = (_: unknown, index: number) => ({
		length: presetItemHeight,
		offset: presetItemHeight * index,
		index,
	});

	if (timerStart || inputIsFocused) return null;

	return (
		<FlatList
			horizontal
			ref={flatListRef}
			data={presetList}
			// initialScrollIndex={50}
			// initialNumToRender={15}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			getItemLayout={getItemLayout}
			removeClippedSubviews={false}
			showsHorizontalScrollIndicator={false}
			style={{
				alignSelf: 'center',
				paddingStart: 16,
			}}
			contentOffset={{ x: 8, y: 0 }}
			ListFooterComponent={
				presetList.length < 3 ? undefined : () => <View style={{ width: 30 }} />
			}
		/>
	);
};
