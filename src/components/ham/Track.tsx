import { useContext } from "react";
import "./Track.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import {
  SelectedTrackContext,
  SelectedTrackType,
} from "../../context/TrackSelectedContext";

export default function Track({ track }: { track: Ham.Track }) {
  const { selectTrack } = useContext(SelectedTrackContext) as SelectedTrackType;
  const onClick = () => {
    selectTrack(track);
  };
  return (
    <div id={`track-div-${track.id}`} className="track-card" onClick={onClick}>
      <span>Track: {track.id}</span>
    </div>
  );
}
