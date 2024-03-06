import {
  Divider,
  List,
} from "@mui/material";
import "./TrackInfo.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import { deleteTrack } from '../../utils/PresentationManipulation'
import { useContext, useState } from "react";
import { PresentationContext, PresentationContextType } from "../../context/PresentationContext";

interface TrackInfoItem {
  id: string;
  label: string;
  value: number | string;
  editable?: boolean;
}

export default function TrackInfo({ track }: { track: Ham.Track }) {
  const [trackEditMode, setTrackEditMode] = useState(false);
  const { presentation, selectPresentation } = useContext(
    PresentationContext
  ) as PresentationContextType;
  
  const removeTrack = () => {
    //remove track from presentation
    if (presentation != null) {
      let updatedPresentation = deleteTrack(presentation, track.id)
      selectPresentation(updatedPresentation)
    }
  };

  return (
    <div className="track-info">
      <div id="track-info-header">
        <h3>Track Details</h3>
        <div>
          <button onClick={() => setTrackEditMode(true)}>Edit</button>
          <button onClick={() => removeTrack()}>Delete</button>
        </div>
      </div>
      <List title="test">
        {trackToItems(track)
          .map((item) => (
            <div className="track-info-row">
              <label htmlFor={item.id}>{item.label}</label>
              <input id={item.id} value={item.value} disabled={!trackEditMode}></input>
            </div>
          ))
          .flatMap((value, index, array) =>
            array.length - 1 !== index // check for the last item
              ? [value, <Divider />]
              : value
          )}
      </List>
      {trackEditMode && 
        <div>
          <button>Save</button>
          <button onClick={() => setTrackEditMode(false)}>Cancel</button>
        </div>
      }
    </div>
  );
}

const trackToItems = (track: Ham.Track): TrackInfoItem[] => {
  return [
    {
      id: "id",
      label: "Track:",
      value: track.id,
      editable: false,
    },
    {
      id: "name",
      label: "Name: ",
      value: track.name,
      editable: true,
    },
    {
      id: "bandwidth",
      label: "Bandwidth:",
      value: track.bandwidth,
      editable: true,
    },
    {
      id: "duration",
      label: "Duration:",
      value: track.duration,
      editable: true,
    },
    {
      id: "segments",
      label: "Number of segments:",
      value: track.segments.length,
      editable: true,
    },
    {
      id: "language",
      label: "Language:",
      value: track.language,
      editable: true,
    },
  ].filter((item) => item.value !== undefined);
};
