import React, { PureComponent } from 'react';
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	View,
} from 'react-native';

import moment from 'moment';

import { ClockItem } from '.';
import { height } from 'consts';
import { ClockListProps } from 'types';
import { calFooterHeight, formatedTimezoneDiff } from 'utils';

type Props = {
	editable: boolean;
	isFocused: boolean;
	isScrolling: boolean;
	checkedItems: string[];
	clockList: ClockListProps[];
	onLongPress: (capital: string) => void;
	onPressChecked: (capital: string) => void;
	onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

type State = {
	time: Date;
};

class ClockList extends PureComponent<Props, State> {
	unsubcribe: NodeJS.Timer;

	constructor(props: Props) {
		super(props);

		this.state = {
			time: new Date(),
		};

		this.unsubcribe = setInterval(() => {
			const currentTime = new Date();
			if (!this.props.isScrolling && this.props.isFocused) {
				(currentTime.getMinutes() > 58 ||
					currentTime.getMinutes() !== this.state.time.getMinutes()) &&
					this.setState({ time: currentTime });
			}
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.unsubcribe);
	}

	renderItem = ({ item }: { item: ClockListProps }) => (
		<ClockItem
			city={item.capital}
			editable={this.props.editable}
			containerStyle={{ marginBottom: 18 }}
			checked={this.props.checkedItems.includes(item.capital)}
			onLongPress={() => this.props.onLongPress(item.capital)}
			onPressChecked={() => this.props.onPressChecked(item.capital)}
			time={moment.tz(this.state.time, item.timezones[0]).format('HH:mm')}
			timeDifference={formatedTimezoneDiff(item.timezones[0])}
		/>
	);

	keyExtractor = (item: ClockListProps) => String(item.capital);

	render() {
		return (
			<FlatList
				removeClippedSubviews
				initialNumToRender={10}
				maxToRenderPerBatch={15}
				data={this.props.clockList}
				renderItem={this.renderItem}
				onScroll={this.props.onScroll}
				keyExtractor={this.keyExtractor}
				extraData={[this.props.editable]}
				ListHeaderComponent={() => <View style={{ height: height * 0.42 }} />}
				ListFooterComponent={() => (
					<View
						style={{ height: calFooterHeight(this.props.clockList.length) }}
					/>
				)}
			/>
		);
	}
}

export default ClockList;
