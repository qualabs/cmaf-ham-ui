import "./SelectionSet.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import SwitchingSet from "./SwitchingSet";
import { Grid, Box } from "@mui/material";
import InfoBox from "../InfoBox";

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
      <InfoBox
        id={selectionSet.id}
        text={"Selection Set "}
        info={"Example selection set info"}
        headerLevel={4}
      />
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
