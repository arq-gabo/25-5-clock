import React from "react";
import Progress from "react-circle-progress-bar";
import LengthPanel from "./LengthPanel";
import PlayResetBtn from "./PlayResetBtn";

const Clock = () => {
	const sesionProps = {
		title: "Sesion Length",
		value: 25
	};

	const breakProps = {
		title: "Break Length",
		value: 5
	};

	return (
		<div className="text-amber-100 text-center w-72 h-72 relative">
			<p className="text-2xl absolute left-1/2 top-10 -translate-x-1/2 ">
				Session
			</p>
			<p className="text-7xl absolute left-1/2 top-20 -translate-x-1/2">
				25:00
			</p>
			<Progress
				className="w-60 absolute left-1/2 top-0 -translate-x-1/2"
				progress={0}
				hideValue={true}
				ballStrokeWidth={12}
				strokeWidth={6}
				background={"#fef3c7"}
			/>
			<PlayResetBtn />
			<div className="absolute w-full bottom-0 flex justify-between">
				<LengthPanel objProp={breakProps} />
				<LengthPanel objProp={sesionProps} />
			</div>
		</div>
	);
};

export default Clock;
