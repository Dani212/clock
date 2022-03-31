import { Platform } from 'react-native';

import colors from './Colors';

export * from './CountriesAndTimezone';

export * from './Layout';

const pressVibration = Platform.OS === 'ios' ? 6 : 25;

const fontFamily = 'poppins';
// const fontFamily = 'space-mono';

export { colors, fontFamily, pressVibration };
