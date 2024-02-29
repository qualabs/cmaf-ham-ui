import "./SelectionSet.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import SwitchingSet from "./SwitchingSet";
import { Grid } from "@mui/material";

export default function SelectionSet({
  selectionSet,
}: {
  selectionSet: Ham.SelectionSet;
}) {
  let switchingSets = selectionSet.switchingSets.map(
    (switchingSet: Ham.SwitchingSet) => (
      <Grid item xs={4} key={`switching-set-item-${switchingSet.id}`}>
        <SwitchingSet switchingSet={switchingSet} />
      </Grid>
    )
  );

  return (
    <div className="selection-set-card">
      <h4>Selection Set {selectionSet.id}</h4>
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="stretch"
          spacing={2}
        >
          {switchingSets}
        </Grid>
    </div>
  );
}
