import React from "react";

const LengthPanel = ({ objProp }) => {
	return (
		<div>
			<p className="text-xl" id={objProp.id.title}>
				{objProp.title}
			</p>
			<div className="flex justify-center text-2xl">
				<button
					id={objProp.id.clickDecrement}
					className="font-extrabold  active:scale-75"
					onClick={objProp.substract}
				>
					-
				</button>
				<p className="w-16" id={objProp.id.length}>
					{objProp.value}
				</p>
				<button
					id={objProp.id.clickIncrement}
					className="font-extrabold  active:scale-75"
					onClick={objProp.add}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default LengthPanel;
