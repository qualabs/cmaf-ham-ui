import "./SwitchingSet.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import Track from "./Track";
import { Grid } from "@mui/material";
import InfoBox from "../InfoBox";

export default function SwitchingSet({
  switchingSet,
}: {
  switchingSet: Ham.SwitchingSet;
}) {
  let tracks = switchingSet.tracks.map((track: Ham.Track, index) => (
    <Grid item xs={4} key={index}>
      <Track track={track} key={`track-item-${track.id}`} />
    </Grid>
  ));
  return (
    <div
      className="switching-set-card"
      id={`switching-set-card-${switchingSet.id}`}
    >
      <InfoBox
        id={switchingSet.id}
        text={"Switching Set: "}
        info={"Example switching set info"}
        headerLevel={5}
      />
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        gap={2}
      >
        {tracks}
      </Grid>
    </div>
  );
}
