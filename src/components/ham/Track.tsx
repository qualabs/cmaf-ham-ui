import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import * as Ham from "@svta/common-media-library/cmaf-ham";

export default function Track({ track }: { track: Ham.Track }) {
  return (
    <Card sx={{ background: "#7d5e7d" }}>
      <CardContent>
        <span>Track: {track.id}</span>
      </CardContent>
    </Card>
  );
}
