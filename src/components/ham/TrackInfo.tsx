import { Divider, List, ListItem, ListItemText } from "@mui/material";
import * as Ham from "@svta/common-media-library/cmaf-ham";

export default function TrackInfo({ track }: { track: Ham.Track }) {
  return (
    <List className="track-info">
      {trackToItems(track)
        .map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item}></ListItemText>
          </ListItem>
        ))
        .flatMap((value, index, array) =>
          array.length - 1 !== index // check for the last item
            ? [value, <Divider />]
            : value
        )}
    </List>
  );
}

const trackToItems = (track: Ham.Track) => {
  return [
    ["Track: ", track.id],
    ["Name: ", track.name],
    ["Bandwidth: ", track.bandwidth],
    ["Duration: ", track.duration],
    ["Number of segments: ", track.segments.length],
    ["Language: ", track.language],
  ]
    .filter((row) => row[1])
    .map((row) => {
      return row[0] + row[1].toString();
    });
};
