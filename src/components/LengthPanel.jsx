import React from "react";

const LengthPanel = ({ objProp }) => {
	return (
		<div>
			<p className="text-xl">{objProp.title}</p>
			<div className="flex justify-center text-2xl">
				<button className="font-extrabold" onClick={objProp.substract}>
					-
				</button>
				<p className="w-16">{objProp.value}</p>
				<button className="font-extrabold" onClick={objProp.add}>
					+
				</button>
			</div>
		</div>
	);
};

export default LengthPanel;
