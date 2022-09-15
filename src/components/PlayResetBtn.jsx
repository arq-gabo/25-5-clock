import React from "react";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { MdReplay } from "react-icons/md";

const PlayResetBtn = ({ pausePlay, reset, playCount }) => {
	return (
		<div className="flex absolute left-1/2 bottom-14 -translate-x-1/2 -translate-y-1/2">
			<button className="text-4xl mx-3" onClick={pausePlay}>
				{playCount ? <TbPlayerPause /> : <TbPlayerPlay />}
			</button>
			<button className="text-4xl mx-3" onClick={reset}>
				<MdReplay />
			</button>
		</div>
	);
};

export default PlayResetBtn;
