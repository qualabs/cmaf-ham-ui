import { useContext } from "react";
import "./Track.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import {
  SelectedTrackContext,
  SelectedTrackType,
} from "../../context/TrackSelectedContext";
import ToolTip from "../ToolTip";
import { Box } from "@mui/material";

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap={1}
      >
        <span>Track: {track.id}</span>
        <ToolTip title="Example info"></ToolTip>
      </Box>
    </div>
  );
}
