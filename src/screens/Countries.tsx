import React, { FC } from 'react';

import { View, Text } from 'react-native';
// import {  } from 'expo'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Pressable } from 'components';
import { styles } from 'styles';

type Props = {
	//
};

const Countries: FC<Props> = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={[styles.header]}>
				<Pressable>{/* <Ion */}</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Countries;
