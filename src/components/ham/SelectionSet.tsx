import "./SelectionSet.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import SwitchingSet from "./SwitchingSet";
import { Grid, Box } from "@mui/material";
import ToolTip from "../ToolTip";

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        gap={1}
      >
        <h4>Selection Set {selectionSet.id}</h4>
        <ToolTip title="Example info"></ToolTip>
      </Box>
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
