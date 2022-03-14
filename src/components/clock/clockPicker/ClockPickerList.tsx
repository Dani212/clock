import React, { Component } from 'react';

import moment from 'moment';

import { CityItemHeight, Timezones } from 'consts';
import CityItem from './CityItem';
import BigList from 'react-native-big-list';
import { Platform, View } from 'react-native';

type Props = {
	dark: boolean;
	country: typeof Timezones;
	onEndReached?: () => void;
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
		const topBorderRadius = index === 0 ? 32 : 0;
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

	getItemLayout = (_: unknown, index: number) => ({
		length: CityItemHeight,
		offset: CityItemHeight * index,
		index,
	});

	render() {
		return (
			<BigList
				data={this.props.country}
				// placeholder
				footerHeight={30}
				scrollEventThrottle={1}
				style={{ paddingTop: 18 }}
				itemHeight={CityItemHeight}
				renderItem={this.renderItem}
				getItemLayout={this.getItemLayout}
				// contentOffset={{ y: 100, x: 0 }}
				decelerationRate={Platform.OS === 'ios' ? 'normal' : 0.81}
				ListFooterComponent={() => <View style={{ height: 30 }} />}
			/>
		);
	}
}

// data={Timezones}
// windowSize={11}
// disableVirtualization
// updateCellsBatchingPeriod={25}
// initialNumToRender={13}
// maxToRenderPerBatch={15}
// removeClippedSubviews={false}
// keyExtractor={this.keyExtractor}
// keyboardShouldPersistTaps={'always'}
// onEndReached={this.props.onEndReached}
// getItemLayout={this.getItemLayout}
// extraData={[this.props.dark]}
