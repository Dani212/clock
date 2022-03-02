import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'reduxStore/store';

type EditableScreenProps = 'clock' | 'timer';

type AppInitialStateProps = {
	editable: boolean;
	isKeyboardOpen: boolean;
	showEditPreset: boolean;
	clockEditableItems: string[];
	presetEditableItems: string[];
	editableScreen: EditableScreenProps;
};

const initialState: AppInitialStateProps = {
	editable: false,
	isKeyboardOpen: false,
	showEditPreset: false,
	editableScreen: 'clock',
	presetEditableItems: [],
	clockEditableItems: [],
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		updateEditable: (
			state,
			action: PayloadAction<{ data: boolean; screen: EditableScreenProps }>
		) => {
			state.editable = action.payload.data;
			state.editableScreen = action.payload.screen;
		},
		updateIsKeyboardOpen: (state, action: PayloadAction<boolean>) => {
			state.isKeyboardOpen = action.payload;
		},
		/**
		 * @name removeOrRemovePEI remove Or Remove Preset Editable Items
		 */
		removeOrCheckPEI: (state, action: PayloadAction<string>) => {
			const index = state.presetEditableItems.findIndex(
				(v) => v === action.payload
			);

			// if id includes else remove
			if (index > -1) {
				const result = [...state.presetEditableItems];
				result.splice(index, 1);

				state.presetEditableItems = [...result];
			} else {
				state.presetEditableItems.push(action.payload);
			}
		},
		/**
		 * @name removeOrRemoveAllPEI remove Or Remove All Preset Editable Items
		 */
		removeOrCheckAllPEI: (state, action: PayloadAction<string[]>) => {
			state.presetEditableItems = [...action.payload];
		},
		openPresetEdit: (state, action: PayloadAction<boolean>) => {
			state.showEditPreset = action.payload;
		},
		removeOrCheckClockItems: (state, action: PayloadAction<string>) => {
			const index = state.clockEditableItems.findIndex(
				(v) => v === action.payload
			);

			// if id includes else remove
			if (index > -1) {
				const result = [...state.clockEditableItems];
				result.splice(index, 1);

				state.clockEditableItems = [...result];
			} else {
				state.clockEditableItems.push(action.payload);
			}
		},
		removeOrCheckAllClockItems: (state, action: PayloadAction<string[]>) => {
			state.clockEditableItems = [...action.payload];
		},
	},
});

export const {
	updateEditable,
	openPresetEdit,
	removeOrCheckPEI,
	removeOrCheckAllPEI,
	updateIsKeyboardOpen,
	removeOrCheckClockItems,
	removeOrCheckAllClockItems,
} = appSlice.actions;

export const clockEditableItemsState = (state: RootState) =>
	state.app.clockEditableItems;

export const timerEditableItemsState = (state: RootState) =>
	state.app.presetEditableItems;

export const isKeyboardOpenState = (state: RootState) =>
	state.app.isKeyboardOpen;

export const showEditPresetState = (state: RootState) =>
	state.app.showEditPreset;

export const editableScreenState = (state: RootState) =>
	state.app.editableScreen;

export const editableState = (state: RootState) => state.app.editable;

export default appSlice.reducer;
