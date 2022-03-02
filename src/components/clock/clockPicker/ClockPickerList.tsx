import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

import moment from 'moment';

import { Timezones } from 'consts';
// import { Text } from 'components';
import CityItem from './CityItem';

type Props = {
	dark: boolean;
	country: typeof Timezones;
	itemPressed: (item: typeof Timezones[0]) => void;
};

export class ClockPickerList extends Component<Props> {
	convertToGMT = (timezone: string) => {
		const gmt = moment().tz(timezone).utcOffset() / 60;
		const gmtHalf = gmt % 1 === 0 ? gmt : `${Math.floor(gmt)}:30`;

		return `Gmt ${gmt < 0 ? '-' : '+'} ${gmt < 0 ? -gmtHalf : gmtHalf}`;
	};

	renderItem = ({
		item,
		index,
	}: {
		item: typeof Timezones[0];
		index: number;
	}) => {
		const { country, dark, itemPressed } = this.props;
		const topBorderRadius = index === country.length - 1 ? 32 : 0;
		const bottomBorderRadius = index === country.length - 1 ? 32 : 0;

		return (
			<CityItem
				dark={dark}
				onPress={() => itemPressed(item)}
				gmt={this.convertToGMT(item.timezones[0])}
				city={`${item.capital} / ${item.name}`}
				btnBorderBottomWidth={index === this.props.country.length - 1 ? 0 : 1}
				containerStyle={{
					borderTopRightRadius: topBorderRadius,
					borderTopLeftRadius: topBorderRadius,
					borderBottomRightRadius: bottomBorderRadius,
					borderBottomLeftRadius: bottomBorderRadius,
				}}
			/>
		);
	};

	// keyExtractor = (item: typeof Timezones[0]) => item.country_code;
	keyExtractor = () => Math.random().toString(36).substr(2, 10);

	// getItemLayout = (_: unknown, index: number) => ({
	// 	length: CityItemHeight,
	// 	offset: CityItemHeight * index,
	// 	index,
	// });

	render() {
		return (
			<FlatList
				// data={Timezones}
				// removeClippedSubviews
				disableVirtualization
				initialNumToRender={15}
				maxToRenderPerBatch={20}
				data={this.props.country}
				style={{ paddingTop: 18 }}
				renderItem={this.renderItem}
				keyExtractor={this.keyExtractor}
				// getItemLayout={this.getItemLayout}
				extraData={[this.props.dark, this.props.country]}
				ListFooterComponent={() => <View style={{ height: 30 }} />}
			/>
		);
	}
}
