import * as Ham from "@svta/common-media-library/cmaf-ham";
import Track from "./Track";
import { Card, CardContent, Grid } from "@mui/material";

export default function SwitchingSet({
  switchingSet,
}: {
  switchingSet: Ham.SwitchingSet;
}) {
  let tracks = switchingSet.tracks.map((track: Ham.Track) => (
    <Track track={track} />
  ));
  return (
    <Card sx={{ background: "#8bb1ae" }}>
      <CardContent>
        <span>Switching Set: {switchingSet.id}</span>
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          gap={2}
        >
          {tracks}
        </Grid>
      </CardContent>
    </Card>
  );
}
