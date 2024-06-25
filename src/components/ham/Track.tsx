import { useContext } from "react";
import "./Track.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import {
  SelectedTrackContext,
  SelectedTrackType,
} from "../../context/TrackSelectedContext";
import InfoBox from "../InfoBox";

export default function Track({ track }: { track: Ham.Track }) {
  const { selectedTrack, selectTrack, handleOpenTrackModal } = useContext(
    SelectedTrackContext
  ) as SelectedTrackType;
  const onClick = () => {
    selectTrack(track);
    handleOpenTrackModal();
  };
  const isSelected = selectedTrack !== null && selectedTrack.id === track.id;
  return (
    <div
      id={`track-div-${track.id}`}
      className={"track-card " + (isSelected ? "selected" : "")}
      onClick={onClick}
    >
      <InfoBox
        id={track.id}
        text={"Track: "}
        info={"Example track info"}
        headerLevel={5}
      />
    </div>
  );
}
