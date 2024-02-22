import React from "react";
import * as Ham from "@svta/common-media-library/cmaf-ham";

const Track = (track: Ham.Track) => (
	<div>
		<span>${track.id}</span>
	</div>
);

export default Track;
