import * as Ham from "@svta/common-media-library/cmaf-ham";
import SelectionSet from "./SelectionSet";
import { Container, Grid } from "@mui/material";

interface PresentationParams {
  presentation: Ham.Presentation;
}

export default function Presentation({ presentation }: PresentationParams) {
  let selectionSets = presentation.selectionSets.map(
    (selectionSet: Ham.SelectionSet) => (
      <SelectionSet selectionSet={selectionSet} key={`selection-set-item-${selectionSet.id}`}/>
    )
  );

  return (
    <Container>
      <div className="presentation-card">
          <h3>Presentation: {presentation.id}</h3>
          <Grid
            container
            direction="row"
            justifyContent="center"
            gap={2}
          >
            {selectionSets}
          </Grid>
      </div>
    </Container>
  );
}
