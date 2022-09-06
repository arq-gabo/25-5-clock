import React from "react";
import Progress from "react-circle-progress-bar";
import LengthPanel from "./LengthPanel";
import PlayResetBtn from "./PlayResetBtn";

const Clock = () => {
	const sesionProps = {
		position: "bottom-36",
		title: "Sesion",
		value: 25
	};

	return (
		<div className="text-amber-100 text-center w-full h-full relative">
			<LengthPanel objProp={sesionProps} />
			<p className="text-2xl absolute left-1/2 top-52 -translate-x-1/2 ">
				Session
			</p>
			<p className="text-7xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				00:00
			</p>
			<Progress
				className="w-60 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
				progress={50}
				hideValue={true}
				ballStrokeWidth={12}
				strokeWidth={6}
				background={"#fef3c7"}
			/>
			<PlayResetBtn />
		</div>
	);
};

export default Clock;
