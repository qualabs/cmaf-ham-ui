import React from "react";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import Track from "./Track";

interface PresentationParams {
	presentation: Ham.Presentation;
}

function Presentation({ presentation }: PresentationParams) {
	let tracks = presentation.getTracks();

	return (
		<div>
			<span>{presentation.id}</span>

			<div>{tracks.map(Track)}</div>
		</div>
	);
}

export default Presentation;
