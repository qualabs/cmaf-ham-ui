import {
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./TrackInfo.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";

interface TrackInfoItem {
  id: string;
  label: string;
  value: number | string;
  editable?: boolean;
}

export default function TrackInfo({ track }: { track: Ham.Track }) {
  return (
    <div className="track-info">
      <div id="track-info-header">
        <h3>Track Details</h3>
        <button>Edit</button>
      </div>
      <List title="test">
        {trackToItems(track)
          .map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.label + " " + item.value}
              ></ListItemText>
            </ListItem>
          ))
          .flatMap((value, index, array) =>
            array.length - 1 !== index // check for the last item
              ? [value, <Divider />]
              : value
          )}
      </List>
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
