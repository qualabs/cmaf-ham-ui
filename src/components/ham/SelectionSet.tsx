import * as Ham from "@svta/common-media-library/cmaf-ham";
import SwitchingSet from "./SwitchingSet";
import { Card, CardContent, Grid } from "@mui/material";

export default function SelectionSet({
  selectionSet,
}: {
  selectionSet: Ham.SelectionSet;
}) {
  let switchingSets = selectionSet.switchingSets.map(
    (switchingSet: Ham.SwitchingSet) => (
      <Grid item xs={4}>
        <SwitchingSet switchingSet={switchingSet} />
      </Grid>
    )
  );

  return (
    <Card sx={{ background: "#2a9461" }}>
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
          spacing={2}
        >
          {switchingSets}
        </Grid>
        <span>Selection Set: {selectionSet.id}</span>
      </CardContent>
    </Card>
  );
}
