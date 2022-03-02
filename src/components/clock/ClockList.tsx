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
import { formatedTimezoneDiff } from 'utils';

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

	calFooterHeight = () => {
		const len = this.props.clockList.length;

		if (len === 0) return height * 0.9;
		if (len === 1) return height * 0.7;
		if (len === 2) return height * 0.53;
		if (len === 3) return height * 0.4;
		if (len === 4) return height * 0.2;
		if (len === 5) return height * 0.08;
		if (len > 6) return height * 0.03;
	};

	render() {
		return (
			<FlatList
				removeClippedSubviews
				initialNumToRender={15}
				data={this.props.clockList}
				renderItem={this.renderItem}
				onScroll={this.props.onScroll}
				keyExtractor={this.keyExtractor}
				extraData={[this.props.editable]}
				ListHeaderComponent={() => <View style={{ height: height * 0.42 }} />}
				ListFooterComponent={() => (
					<View style={{ height: this.calFooterHeight() }} />
				)}
			/>
		);
	}
}

export default ClockList;
