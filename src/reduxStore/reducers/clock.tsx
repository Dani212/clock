import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'reduxStore/store';
import { ClockListProps } from 'types';

type ClockInitialStateProps = {
	clockList: ClockListProps[];
};

const initialState: ClockInitialStateProps = {
	clockList: [],
};

const clockSlice = createSlice({
	name: 'clock',
	initialState,
	reducers: {
		addClock: (state, action: PayloadAction<ClockListProps>) => {
			const index = state.clockList.findIndex(
				(v) => v.capital === action.payload.capital
			);

			if (index < 0) {
				state.clockList.unshift(action.payload);
			} else {
				const result = [...state.clockList];

				result.splice(index, 1);
				result.unshift(action.payload);

				state.clockList = [...result];
			}
		},
		removeClocks: (state, action: PayloadAction<string[]>) => {
			const result = state.clockList.filter(
				(v) => !action.payload.includes(v.capital)
			);

			state.clockList = [...result];
		},
		removeAllClocks: (state) => {
			state.clockList = [];
		},
	},
});

export const { removeAllClocks, removeClocks, addClock } = clockSlice.actions;

export const clockListState = (state: RootState) => state.clock.clockList;

export default clockSlice.reducer;
