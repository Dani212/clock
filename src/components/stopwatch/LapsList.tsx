import React, { FC, useContext, useEffect, useRef } from 'react';

import { FlatList } from 'react-native';

import { useTheme } from '@react-navigation/native';

import LapRowComponent from './LapRow';

import { StopwatchLapProps } from 'types';

import { StopwatchContext } from 'store';
import { lapItemHeight } from 'consts';

type Props = {
	//
};

export const LapsListComponent: FC<Props> = () => {
	const { dark } = useTheme();

	const flatListRef = useRef<FlatList>(null);

	const { state } = useContext(StopwatchContext);

	useEffect(() => {
		state.laps.length > 5 &&
			flatListRef.current?.scrollToIndex({
				animated: true,
				index: state.laps.length - 1,
			});
	}, [state.laps]);

	const renderItem = ({ item }: { item: StopwatchLapProps }) => {
		return (
			<LapRowComponent
				colOneText={item.lap}
				colTwoText={item.lapTime}
				colThreeText={item.overallTime}
				header={false}
				dark={dark}
			/>
		);
	};

	const keyExtractor = (_: unknown, i: number) => String(i);

	const getItemLayout = (_: unknown, index: number) => ({
		length: lapItemHeight,
		offset: lapItemHeight * index,
		index,
	});

	return (
		<>
			{state.laps.length > 0 && (
				<LapRowComponent
					colOneText={'Lap'}
					colTwoText={'Lap times'}
					colThreeText={'Overall time'}
					conStyle={{ marginTop: 32 }}
					header={true}
					dark={dark}
				/>
			)}

			<FlatList
				inverted
				data={state.laps}
				ref={flatListRef}
				extraData={[dark]}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				getItemLayout={getItemLayout}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'flex-end',
				}}
				style={{ flex: 1 }}
			/>
		</>
	);
};
