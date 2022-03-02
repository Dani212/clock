import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { timerReducer, appReducer, clockReducer } from './reducers';

import AsyncStorageLib from '@react-native-async-storage/async-storage';

import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage: AsyncStorageLib,
	blacklist: ['app'],
};

const reducers = combineReducers({
	timer: timerReducer,
	clock: clockReducer,
	app: appReducer,
});

//this is use to set the reducers to persist store
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
