import React from 'react';

import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from 'hooks/useCachedResources';
import useColorScheme from 'hooks/useColorScheme';
import Navigation from 'navigation/index';

import { store, persistor } from 'reduxStore/store';
import { styles } from 'styles';
import { pColor } from 'utils';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<SafeAreaProvider
						style={[
							styles.container,
							{ backgroundColor: pColor(colorScheme === 'dark').background },
						]}
					>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
					</SafeAreaProvider>
				</PersistGate>
			</Provider>
		);
	}
}
