import "./SelectionSet.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import SwitchingSet from "./SwitchingSet";
import { Grid, Box } from "@mui/material";

export default function SelectionSet({
  selectionSet,
}: {
  selectionSet: Ham.SelectionSet;
}) {
  let switchingSets = selectionSet.switchingSets.map(
    (switchingSet: Ham.SwitchingSet) => (
      <Grid item xs="auto" key={`switching-set-item-${switchingSet.id}`}>
        <SwitchingSet switchingSet={switchingSet} />
      </Grid>
    )
  );

  return (
    <div className="selection-set-card">
      <h4>Selection Set {selectionSet.id}</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
          spacing={4}
        >
          {switchingSets}
        </Grid>
      </Box>
    </div>
  );
}
