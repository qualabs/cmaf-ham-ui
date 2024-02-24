import * as Ham from "@svta/common-media-library/cmaf-ham";
import Track from "./Track";

interface PresentationParams {
  presentation: Ham.Presentation;
}

export default function Presentation({ presentation }: PresentationParams) {
  let tracks = presentation.getTracks().map((track : Ham.Track) => (
    <li key={track.id}>
      <Track track={track} />
    </li>
  ));

  return (
    <div>
      <span>{presentation.id}</span>
      <ul>{tracks}</ul>
    </div>
  );
}
