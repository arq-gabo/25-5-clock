import React from "react";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { MdReplay } from "react-icons/md";

const PlayResetBtn = () => {
	return (
		<div className="flex absolute left-1/2 bottom-14 -translate-x-1/2 -translate-y-1/2">
			<button className="text-4xl mx-3">
				<TbPlayerPlay />
			</button>
			<button className="text-4xl mx-3">
				<MdReplay />
			</button>
		</div>
	);
};

export default PlayResetBtn;
