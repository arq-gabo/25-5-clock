import React, { useState } from "react";
import Progress from "react-circle-progress-bar";
import LengthPanel from "./LengthPanel";
import PlayResetBtn from "./PlayResetBtn";

const Clock = () => {
	const defaultSesion = 2;
	const defaultBreak = 2;
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
				sesionBreak ? (sesionBreak = false) : (sesionBreak = true);
				setIsSesionOrBreak(sesionBreak);
				if (!sesionBreak) {
					time = breakTime * 60000 - 1000;
					setMiliSeconds(time);
					console.log("caso1");
				} else {
					time = sesionTime * 60000 - 1000;
					setMiliSeconds(time);
					console.log("caso2");
				}
			} else {
				time -= 1000;
				setMiliSeconds(time);
			}
			console.log(time);
		}, 250);
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
		title: "Sesion Length",
		value: sesionTime,
		add: () => {
			if (!playCount && ifValidIncrement(sesionTime)) {
				setSesionTime(sesionTime + 1);
				setMiliSeconds((sesionTime + 1) * 60000);
			}
		},
		substract: () => {
			if (!playCount && ifValidDecrement(sesionTime)) {
				setSesionTime(sesionTime - 1);
				setMiliSeconds((sesionTime - 1) * 60000);
			}
		}
	};

	const breakProps = {
		title: "Break Length",
		value: breakTime,
		add: () => {
			if (!playCount && ifValidIncrement(breakTime)) {
				setBreakTime(prev => prev + 1);
			}
		},
		substract: () => {
			if (!playCount && ifValidDecrement(breakTime)) {
				setBreakTime(prev => prev - 1);
			}
		}
	};

	let minutes = Math.floor(miliSeconds / 60000);
	let seconds = Math.floor((miliSeconds % 60000) / 1000).toFixed(0);

	return (
		<div className="text-amber-100 text-center w-72 h-72 relative">
			<p className="text-2xl absolute left-1/2 top-10 -translate-x-1/2 ">
				{isSesionOrBreak ? "Session" : "Break"}
			</p>
			<p className="text-7xl absolute left-1/2 top-20 -translate-x-1/2">
				{minutes < 10 ? `0${minutes}` : minutes}:
				{seconds < 10 ? `0${seconds}` : seconds}
			</p>
			<Progress
				className="w-60 absolute left-1/2 top-0 -translate-x-1/2"
				progress={0}
				hideValue={true}
				ballStrokeWidth={12}
				strokeWidth={6}
				background={"#fef3c7"}
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
		</div>
	);
};

export default Clock;
