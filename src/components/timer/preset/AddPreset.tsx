import React, { useState, useRef, useContext, useEffect, FC } from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	KeyboardAvoidingView,
} from 'react-native';

import { pColor } from 'utils';
import { width } from 'consts';
import { styles, timerStyle } from 'styles';
import { TimerContext } from 'store/contexts/timer';

import { Text } from 'components/Text';
import { Button } from 'components/Button';
import { Pressable } from 'components/Pressable';
import { TimerInput } from 'components/TimerInput';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToPresets,
	editableState,
	openPresetEdit,
	presetsListState,
	removeOrCheckAllPEI,
	timerEditableItemsState,
	updateEditable,
	updatePresets,
} from 'reduxStore';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

type Props = {
	dark: boolean;
	close: () => void;
};

// eslint-disable-next-line react/display-name
const AddPresetComponent: FC<Props> = ({ dark, close }) => {
	const dispatch = useDispatch();

	// this state will help determine if to add new
	// preset or update previous one
	const editable = useSelector(editableState);

	const presetItemList = useSelector(presetsListState);

	// this state contains the id of preset to be updated
	const checkedPresetItems = useSelector(timerEditableItemsState);

	// This is be use to enable and disable add button
	const [isDisabled, setIsDisabled] = useState(false);

	const {
		dispatch: contextDispatch,
		state: { hoursInput, minutesInput, secondsInput },
	} = useContext(TimerContext);

	const refName = useRef<TextInput>(null);
	const presetName = useRef('');
	const initPresetName = useRef('');

	const [initHourInput, setInitHourInput] = useState('00');
	const [initMinutesInput, setInitMinutesInput] = useState('00');
	const [initSecondsInput, setInitSecondsInput] = useState('00');

	const seconds = useRef('');
	const minutes = useRef('');
	const hours = useRef('');
	const id = useRef('');

	const setDefaultState = (secs: string, mins: string, hrs: string) => {
		seconds.current = secs;
		minutes.current = mins;
		hours.current = hrs;
		setInitHourInput(hrs);
		setInitMinutesInput(mins);
		setInitSecondsInput(secs);
	};

	// update default props
	useEffect(() => {
		// console.log(minutesInput);
		if (editable) {
			const index = presetItemList.findIndex(
				(v) => v.id === checkedPresetItems[0]
			);

			const result = presetItemList[index];

			presetName.current = result.title;
			initPresetName.current = result.title;
			id.current = result.id;

			setIsDisabled(true);

			setDefaultState(result.seconds, result.minutes, result.hour);
		} else {
			setDefaultState(secondsInput, minutesInput, hoursInput);
		}
	}, []);

	const updateBtnDisableState = () => {
		if (
			Number(seconds.current) < 1 &&
			Number(minutes.current) < 1 &&
			Number(hours.current) < 1
		)
			setIsDisabled(true);
		else if (
			seconds.current === initSecondsInput &&
			minutes.current === initMinutesInput &&
			hours.current === initHourInput &&
			presetName === initPresetName &&
			editable
		)
			setIsDisabled(true);
		else isDisabled && setIsDisabled(false);
	};

	const onChangeText = (secs: string, mins: string, hrs: string) => {
		seconds.current = secs;
		minutes.current = mins;
		hours.current = hrs;

		updateBtnDisableState();
	};

	const onChangeTextName = (text: string) => {
		//
		presetName.current = text.trim();
		updateBtnDisableState();
	};

	const updatePreset = () => {
		dispatch(
			updatePresets({
				id: id.current,
				hour: hours.current,
				seconds: seconds.current,
				minutes: minutes.current,
				title: presetName.current,
			})
		);

		dispatch(openPresetEdit(false));

		dispatch(removeOrCheckAllPEI([]));

		dispatch(updateEditable({ data: false, screen: 'timer' }));

		close();
	};

	const addPreset = () => {
		if (editable) {
			updatePreset();
			return;
		}

		const index = presetItemList.findIndex(
			(v) =>
				v.title === presetName.current &&
				v.hour === hours.current &&
				v.minutes === minutes.current &&
				v.seconds === seconds.current
		);

		if (index < 0) {
			const hour =
				hours.current.length < 2 ? `0${hours.current}` : hours.current;
			const mins =
				minutes.current.length < 2 ? `0${minutes.current}` : minutes.current;
			const secs =
				seconds.current.length < 2 ? `0${seconds.current}` : seconds.current;
			const title = presetName.current ? presetName.current.trim() : '';
			// console.log(hour, mins, secs);
			// console.log(title);

			const id = new Date();

			dispatch(
				addToPresets({
					id: `${id}`,
					title: title,
					hour: hour,
					minutes: mins,
					seconds: secs,
				})
			);
			contextDispatch({
				type: 'updateSelectedPresetItem',
				payload: `${hour}${mins}${secs}`,
			});
			contextDispatch({ type: 'updateHoursInput', payload: hour });
			contextDispatch({ type: 'updateMinutesInput', payload: mins });
			contextDispatch({ type: 'updateSecondsInput', payload: secs });
		} else {
			// TODO show toast that user has a preset available
		}

		close();
	};

	return (
		<Animated.View
			entering={FadeIn}
			exiting={FadeOut}
			style={{
				...StyleSheet.absoluteFillObject,
				backgroundColor: 'rgba(0, 0,0,0.5)',
				paddingBottom: 18,
			}}
		>
			<Pressable
				onPress={close}
				ripple_color="transparent"
				style={{
					flex: 1,
					// backgroundColor: 'rgba(0, 0,0,0.5)',
					// zIndex: 100,
				}}
			/>
			<KeyboardAvoidingView
				style={[
					timerStyle.APContentContainer,
					{ backgroundColor: pColor(dark).backgroundTwo },
				]}
			>
				<Text style={timerStyle.APHeaderText}>Add preset timer</Text>

				<TimerInput
					autoFouced
					dark={dark}
					hours={initHourInput}
					minutes={initMinutesInput}
					seconds={initSecondsInput}
					type={'preset'}
					fontSize={width * 0.099}
					onChangeText={onChangeText}
					goToNextInput={() => {
						refName.current?.focus();
					}}
					conStyle={{
						// backgroundColor: '#f4f4',
						alignSelf: 'flex-start',
						width: width * 0.6,
						marginStart: 4,
						marginVertical: 16,
					}}
				/>
				<TextInput
					ref={refName}
					placeholder="Preset timer name"
					onChangeText={onChangeTextName}
					placeholderTextColor={pColor(dark).disableText}
					style={{
						...styles.text,
						marginBottom: 18,
						marginHorizontal: 18,
						borderBottomWidth: 2,
						color: pColor(dark).text,
						borderBottomColor: refName.current?.isFocused()
							? pColor(dark).text
							: pColor(dark).disableText,
					}}
				/>

				<View style={timerStyle.APBtnContainer}>
					<Button
						dark={dark}
						title="Cancel"
						onPress={close}
						buttonColor={'transparent'}
						btnTextColor={pColor(dark).text}
						// buttonColor={pColor(dark).presetItemBg}
						conStyle={{ height: 38 }}
					/>

					<View
						style={{
							height: 15,
							backgroundColor: pColor(dark).disableText,
							width: 2,
						}}
					/>

					<Button
						title="Add"
						dark={dark}
						onPress={addPreset}
						disabled={isDisabled}
						conStyle={{ height: 38 }}
						buttonColor={'transparent'}
						btnTextColor={
							isDisabled ? pColor(dark).disableText : pColor(dark).text
						}

						// buttonColor={pColor(dark).presetItemBg}
					/>
				</View>
			</KeyboardAvoidingView>
		</Animated.View>
	);
};

export default AddPresetComponent;
