import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'reduxStore/store';
import { PresetItemProps } from 'types';

export interface CounterState {
	presets: PresetItemProps[];
}

const initialState: CounterState = {
	presets: [],
};

export const counterSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		addToPresets: (state, action: PayloadAction<PresetItemProps>) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.presets.push(action.payload);
		},
		updatePresets: (state, action: PayloadAction<PresetItemProps>) => {
			const index = state.presets.findIndex((v) => v.id === action.payload.id);

			if (index > -1) {
				const result = [...state.presets];
				result[index] = {
					...action.payload,
				};

				state.presets = [...result];
			}
		},
		removePresets: (state, action: PayloadAction<string[]>) => {
			if (action.payload.length > 0) {
				const result = state.presets.filter(
					(value) => !action.payload.includes(value.id)
				);

				state.presets = [...result];
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToPresets, removePresets, updatePresets } =
	counterSlice.actions;

export const presetsListState = (state: RootState) => state.timer.presets;

export default counterSlice.reducer;
