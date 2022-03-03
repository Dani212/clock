import React from 'react';
import { View } from 'react-native';

import { SWContent } from 'components';
import { StopwatchContextContainer } from 'store';
import { styles } from 'styles';

export default function Stopwatch() {
	return (
		<StopwatchContextContainer>
			<View style={styles.container}>
				<SWContent />
			</View>
		</StopwatchContextContainer>
	);
}
