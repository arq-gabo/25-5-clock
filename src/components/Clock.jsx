import React, { useState } from "react";
import LengthPanel from "./LengthPanel";
import PlayResetBtn from "./PlayResetBtn";

// Circle progress bar repository used in this project
//https://www.npmjs.com/package/react-circle-progress-bar
import Progress from "react-circle-progress-bar";

const Clock = () => {
	const defaultSesion = 25;
	const defaultBreak = 5;
	const defaultSeconds = defaultSesion * 60000;

	const [miliSeconds, setMiliSeconds] = useState(defaultSeconds);
	const [playCount, setPlayCount] = useState(false);
	const [isCountSec, setIsCountSec] = useState(0);

	const [sesionTime, setSesionTime] = useState(defaultSesion);
	const [breakTime, setBreakTime] = useState(defaultBreak);
	const [isSesionOrBreak, setIsSesionOrBreak] = useState(true);

	// Function to press play button and start countdown
	const pause = () => {
		clearInterval(isCountSec);
		setIsCountSec(0);
	};

	const reset = () => {
		pause();
		setMiliSeconds(defaultSeconds);
	};

	let time;
	let sesionBreak;

	const play = () => {
		time = miliSeconds;
		sesionBreak = isSesionOrBreak;
		const timerSec = setInterval(() => {
			if (time === 0) {
				playSound();
				sesionBreak ? (sesionBreak = false) : (sesionBreak = true);
				setIsSesionOrBreak(sesionBreak);
				if (!sesionBreak) {
					time = breakTime * 60000;
					setMiliSeconds(time);
				} else {
					time = sesionTime * 60000;
					setMiliSeconds(time);
				}
			} else {
				time -= 1000;
				setMiliSeconds(time);
			}
		}, 1000);
		setIsCountSec(timerSec);
	};

	const handleBtnPlayPause = () => {
		if (playCount) {
			pause();
			setPlayCount(false);
		} else {
			play();
			setPlayCount(true);
		}
	};

	// Function to reset counter time
	const handleBtnReset = () => {
		setMiliSeconds(defaultSeconds);
		setPlayCount(false);
		reset();

		setSesionTime(defaultSesion);
		setBreakTime(defaultBreak);
		setIsSesionOrBreak(true);

		stopSound();
	};

	// function to increment o decrement break and session time
	const ifValidIncrement = val => {
		if (val >= 1 && val < 60) return true;
	};

	const ifValidDecrement = val => {
		if (val > 1 && val <= 60) return true;
	};

	// Objects to controller LenghtPanel Component
	const sesionProps = {
		title: "Session Length",
		id: {
			title: "session-label",
			clickDecrement: "session-decrement",
			clickIncrement: "session-increment",
			length: "session-length"
		},
		value: sesionTime,
		add: () => {
			if (!playCount && ifValidIncrement(sesionTime)) {
				setSesionTime(sesionTime + 1);
			}

			if (!playCount && isSesionOrBreak && ifValidIncrement(sesionTime)) {
				setMiliSeconds((sesionTime + 1) * 60000);
			}
		},
		substract: () => {
			if (!playCount && ifValidDecrement(sesionTime)) {
				setSesionTime(sesionTime - 1);
			}

			if (!playCount && isSesionOrBreak && ifValidDecrement(sesionTime)) {
				setMiliSeconds((sesionTime - 1) * 60000);
			}
		}
	};

	const breakProps = {
		title: "Break Length",
		id: {
			title: "break-label",
			clickDecrement: "break-decrement",
			clickIncrement: "break-increment",
			length: "break-length"
		},
		value: breakTime,
		add: () => {
			if (!playCount && ifValidIncrement(breakTime)) {
				setBreakTime(breakTime + 1);
			}

			if (!playCount && !isSesionOrBreak && ifValidIncrement(breakTime)) {
				setMiliSeconds((breakTime + 1) * 60000);
			}
		},
		substract: () => {
			if (!playCount && ifValidDecrement(breakTime)) {
				setBreakTime(breakTime - 1);
			}

			if (!playCount && !isSesionOrBreak && ifValidDecrement(breakTime)) {
				setMiliSeconds((breakTime - 1) * 60000);
			}
		}
	};

	//Show minutes and seconds filter at format 1min = 60 sec
	const returnMin = val => Math.floor(val / 60000);
	const returnSec = val => Math.floor((val % 60000) / 1000).toFixed(0);

	let minutes = returnMin(miliSeconds);
	let seconds = returnSec(miliSeconds);

	// Functionality to progress bar
	const percentageProgressBar = (val, currentVal) =>
		((val * 60000 - currentVal) * 100) / (val * 60000);

	let levelProgressBar = isSesionOrBreak
		? percentageProgressBar(sesionTime, miliSeconds)
		: percentageProgressBar(breakTime, miliSeconds);

	//if true equivalent to text-amber-500 in tailwind
	let colorsProgressBar;
	let colorTextAndClock;
	if (
		returnMin(miliSeconds) === 0 &&
		returnSec(miliSeconds) >= 0 &&
		returnSec(miliSeconds) <= 10
	) {
		colorsProgressBar = "#f97316";
		colorTextAndClock = "text-amber-500";
	} else {
		colorsProgressBar = "#5eaefd";
		colorTextAndClock = "";
	}

	// Sound Control
	const playSound = () => {
		const sound = document.getElementById("beep");
		sound.play();
	};

	const stopSound = () => {
		const sound = document.getElementById("beep");
		sound.pause();
		sound.currentTime = 0;
	};

	return (
		<div className="text-amber-100 text-center w-72 h-72 relative">
			<p
				className={`${colorTextAndClock} text-2xl absolute left-1/2 top-10 -translate-x-1/2`}
				id="timer-label"
			>
				{isSesionOrBreak ? "Session" : "Break"}
			</p>
			<p
				className={`${colorTextAndClock} text-7xl absolute left-1/2 top-20 -translate-x-1/2`}
				id="time-left"
			>
				{minutes < 10 ? `0${minutes}` : minutes}:
				{seconds < 10 ? `0${seconds}` : seconds}
			</p>
			<Progress
				className="w-60 absolute left-1/2 top-0 -translate-x-1/2"
				progress={levelProgressBar}
				hideValue={true}
				ballStrokeWidth={16}
				strokeWidth={7}
				transitionDuration={0.2}
				background={"#fef3c7"}
				gradient={[
					{ stop: 0.0, color: colorsProgressBar },
					{ stop: 1, color: colorsProgressBar }
				]}
			/>
			<PlayResetBtn
				playCount={playCount}
				reset={handleBtnReset}
				pausePlay={handleBtnPlayPause}
			/>
			<div className="absolute w-full bottom-0 flex justify-between">
				<LengthPanel objProp={breakProps} />
				<LengthPanel objProp={sesionProps} />
			</div>

			<audio
				src="https://res.cloudinary.com/dulwtefos/video/upload/v1663377067/fcc-react-project/alarm_xwwjlm.mp3"
				id="beep"
			/>
		</div>
	);
};

export default Clock;
