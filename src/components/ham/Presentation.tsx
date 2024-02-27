import * as Ham from "@svta/common-media-library/cmaf-ham";
import SelectionSet from "./SelectionSet";
import { Card, CardContent, Container, Grid } from "@mui/material";

interface PresentationParams {
  presentation: Ham.Presentation;
}

export default function Presentation({ presentation }: PresentationParams) {
  let selectionSets = presentation.selectionSets.map(
    (selectionSet: Ham.SelectionSet) => (
      <SelectionSet selectionSet={selectionSet} />
    )
  );

  return (
    <Container  sx={{ background: "grey" }}>
      <Card>
        <CardContent>
          <h3>Presentation: {presentation.id}</h3>
          <Grid
            container
            direction="column"
            justifyContent="space-evenly"
            rowGap={2}
          >
            {selectionSets}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
