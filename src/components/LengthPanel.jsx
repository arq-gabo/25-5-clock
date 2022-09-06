import React from "react";

const LengthPanel = ({ objProp }) => {
	console.log(objProp);
	return (
		<div
			className={`absolute left-1/2 ${objProp.position} -translate-x-1/2 -translate-y-1/2`}
		>
			<p className="text-xl">Sesion Length</p>
			<div className="flex justify-center text-2xl">
				<button className="font-extrabold">+</button>
				<p className="mx-8">5</p>
				<button className="font-extrabold">-</button>
			</div>
		</div>
	);
};

export default LengthPanel;
