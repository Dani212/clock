import React, { FC, useEffect, useRef, useState } from 'react';
import { View, ViewStyle, TextInput } from 'react-native';
import { width } from 'consts';
import { styles } from 'styles';
import { pColor } from 'utils';

import { Text } from './Text';

type Props = {
	dark: boolean;
	fontSize?: number;
	hours?: string;
	minutes?: string;
	seconds?: string;
	onBlur?: () => void;
	onFocus?: () => void;
	autoFouced?: boolean;
	conStyle?: ViewStyle;
	headerConStyle?: ViewStyle;
	goToNextInput: () => void;
	headerTextFontSize?: number;
	onSubmitEditingSecs?: () => void;
	type: 'alarm' | 'timer' | 'preset';
	disableBtnFeebBack?: (disabled: boolean) => void;
	onChangeText: (seconds: string, minutes: string, hours: string) => void;
};

export const TimerInput: FC<Props> = ({
	dark,
	type,
	onBlur,
	onFocus,
	fontSize,
	conStyle,
	autoFouced,
	hours,
	minutes,
	seconds,
	onChangeText,
	goToNextInput,
	headerConStyle,
	disableBtnFeebBack,
	headerTextFontSize,
	onSubmitEditingSecs,
}) => {
	const textFontSize = fontSize ? fontSize : width * 0.11;
	const hTextFontSize = headerTextFontSize ? headerTextFontSize : width * 0.04;

	const [hourInput, setHourInput] = useState('00');
	const [minutesInput, setMinutesInput] = useState('00');
	const [secondsInput, setSecondsInput] = useState('00');

	const hourRef = useRef<TextInput>(null);
	const minutesRef = useRef<TextInput>(null);
	const secondsRef = useRef<TextInput>(null);

	const [isFocused, setIsFocused] = useState<boolean>(false);

	const onChangeHourText = (text: string) => {
		setHourInput(text);

		onChangeText(secondsInput, minutesInput, text);

		if (text.length > 1) {
			minutesRef.current?.focus();
		}
	};

	const onChangeMinutesText = (text: string) => {
		if (text.length === 1 && Number(text) > 6) {
			type !== 'alarm' && secondsRef.current?.focus();

			const result = `0${text}`;

			setMinutesInput(result);

			onChangeText(secondsInput, result, hourInput);
		} else if (text.length === 2 && Number(text) > 59) {
			const result = '59';

			setMinutesInput(result);

			onChangeText(secondsInput, result, hourInput);
		} else {
			setMinutesInput(text);
			onChangeText(secondsInput, text, hourInput);
		}

		if (text.length > 1) {
			type !== 'alarm' && secondsRef.current?.focus();
		}
	};

	const onChangeSecondsText = (text: string) => {
		if (text.length === 1 && Number(text) > 6) {
			const result = `0${text}`;
			onChangeText(result, minutesInput, hourInput);
			setSecondsInput(text);
			goToNextInput();
		} else if (text.length === 2 && Number(text) > 59) {
			const result = '59';
			onChangeText(result, minutesInput, hourInput);
			setSecondsInput(result);
			goToNextInput();
		} else {
			setSecondsInput(text);
			onChangeText(text, minutesInput, hourInput);
		}
		if (text.length > 1) {
			goToNextInput();
		}
	};

	const onfocus = () => {
		//(
		onFocus && onFocus();

		setIsFocused(true);
	};

	const sHideTitle = () => {
		if (
			!hourRef.current?.isFocused() &&
			!minutesRef.current?.isFocused() &&
			!secondsRef.current?.isFocused()
		) {
			onBlur && onBlur();
			setIsFocused(false);
		}
	};

	const onblurHours = () => {
		sHideTitle();

		if (hourInput.length < 1) setHourInput('00');

		if (hourInput.length === 1) setHourInput('0' + hourInput);
	};

	const onblurMinutes = () => {
		sHideTitle();

		if (minutesInput.length < 1) setMinutesInput('00');

		if (minutesInput.length === 1) setMinutesInput('0' + minutesInput);
	};

	const onblurSeconds = () => {
		sHideTitle();

		if (secondsInput.length < 1) setSecondsInput('00');

		if (secondsInput.length === 1) setSecondsInput('0' + secondsInput);
	};

	useEffect(() => {
		disableBtnFeebBack &&
			disableBtnFeebBack(
				Number(hourInput) === 0 &&
					Number(secondsInput) === 0 &&
					Number(minutes) === 0
			);
	}, [hourInput, secondsInput, minutes]);

	useEffect(() => {
		!hourRef.current?.isFocused() && setHourInput(hours ? hours : '00');

		!minutesRef.current?.isFocused() &&
			setMinutesInput(minutes ? minutes : '00');

		!secondsRef.current?.isFocused() &&
			setSecondsInput(seconds ? seconds : '00');
	}, [hours, minutes, seconds]);

	useEffect(() => {
		if (autoFouced) {
			setTimeout(() => {
				hourRef.current?.focus();
			}, 500);
		}
	}, [autoFouced]);

	return (
		<View
			style={[
				styles.timerStopwatchTextCon,
				{
					width: type === 'alarm' ? width * 0.4 : width * 0.7,
					flexDirection: 'column',
				},
				conStyle,
			]}
		>
			{type !== 'preset' && !isFocused && (
				<View
					style={[{ flexDirection: 'row', marginBottom: 80 }, headerConStyle]}
				>
					<Text
						style={[styles.timerStopwatchText, { fontSize: hTextFontSize }]}
					>
						Hours
					</Text>

					<Text
						style={[styles.timerStopwatchText, { fontSize: hTextFontSize }]}
					>
						Minutes
					</Text>

					{type !== 'alarm' && (
						<Text
							style={[styles.timerStopwatchText, { fontSize: hTextFontSize }]}
						>
							Seconds
						</Text>
					)}
				</View>
			)}

			<View style={{ flexDirection: 'row' }}>
				<TextInput
					ref={hourRef}
					value={hourInput}
					maxLength={2}
					onBlur={onblurHours}
					numberOfLines={1}
					selectTextOnFocus
					defaultValue={'00'}
					blurOnSubmit={false}
					returnKeyType="next"
					returnKeyLabel="next"
					keyboardType="number-pad"
					onChangeText={onChangeHourText}
					onFocus={type !== 'alarm' ? onfocus : undefined}
					onSubmitEditing={() => minutesRef.current?.focus()}
					style={[
						styles.timerStopwatchText,
						{ fontSize: textFontSize, color: pColor(dark).text },
					]}
				/>

				<Text
					style={[
						styles.timerStopwatchText,
						{ fontSize: textFontSize, flex: 0.2 },
					]}
				>
					:
				</Text>

				<TextInput
					ref={minutesRef}
					value={minutesInput}
					maxLength={2}
					onBlur={onblurMinutes}
					numberOfLines={1}
					selectTextOnFocus
					defaultValue={'00'}
					blurOnSubmit={false}
					returnKeyType="next"
					returnKeyLabel="next"
					keyboardType="number-pad"
					onChangeText={onChangeMinutesText}
					onFocus={type !== 'alarm' ? onfocus : undefined}
					onSubmitEditing={() => secondsRef.current?.focus()}
					style={[
						styles.timerStopwatchText,
						{ fontSize: textFontSize, color: pColor(dark).text },
					]}
				/>
				{type !== 'alarm' && (
					<>
						<Text
							style={[
								styles.timerStopwatchText,
								{ fontSize: textFontSize, flex: 0.2 },
							]}
						>
							:
						</Text>

						<TextInput
							maxLength={2}
							ref={secondsRef}
							numberOfLines={1}
							selectTextOnFocus
							defaultValue={'00'}
							value={secondsInput}
							blurOnSubmit={false}
							onBlur={onblurSeconds}
							keyboardType="number-pad"
							onChangeText={onChangeSecondsText}
							returnKeyType={type === 'preset' ? 'next' : 'done'}
							returnKeyLabel={type === 'preset' ? 'next' : 'done'}
							onFocus={onfocus}
							style={[
								styles.timerStopwatchText,
								{ fontSize: textFontSize, color: pColor(dark).text },
							]}
							onSubmitEditing={onSubmitEditingSecs}
						/>
					</>
				)}
			</View>
		</View>
	);
};
