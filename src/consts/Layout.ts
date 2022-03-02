import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const isSmallDevice = width < 375;

const clockItemBr = 32;
const presetItemHeight = 118;
const CityItemHeight = 65;

const lapItemHeight = 50;

const textSizes = {
	small: 14,
	normal: 16,
	large: 18,
	xl: 24,
	xxl: 28,
	xxxl: 32,
};

export {
	height,
	width,
	textSizes,
	clockItemBr,
	lapItemHeight,
	isSmallDevice,
	CityItemHeight,
	presetItemHeight,
};
