import * as Ham from "@svta/common-media-library/cmaf-ham";

export default function Track({ track }: { track: Ham.Track }) {
  return (
    <div id={`track-div-${track.id}`} className="track-card" >
        <span>Track: {track.id}</span>
    </div>
  );
}
