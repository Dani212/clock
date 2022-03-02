import React from 'react';

import { StyleSheet } from 'react-native';

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';

import { useSelector } from 'react-redux';

import { editableState } from 'reduxStore';
import { useTheme } from '@react-navigation/native';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const EditableShadView = () => {
	const { dark } = useTheme();

	const colors = dark
		? ['rgba(0,0,0, 0.1)', 'rgba(0,0,0, 1)', 'transparent']
		: ['rgba(255,255,255, 0.1)', 'rgba(255,255,255, 1)', 'transparent'];

	const editable = useSelector(editableState);

	if (!editable) return null;

	return (
		<AnimatedLinearGradient
			entering={FadeIn}
			exiting={FadeOut}
			colors={colors}
			style={{
				...StyleSheet.absoluteFillObject,
				marginBottom: 18,
				zIndex: 1000,
			}}
		/>
	);
};
