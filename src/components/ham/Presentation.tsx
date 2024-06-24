import * as Ham from "@svta/common-media-library/cmaf-ham";
import SelectionSet from "./SelectionSet";
import { Box, Container, Grid } from "@mui/material";

interface PresentationParams {
  presentation: Ham.Presentation;
}

import {
  PresentationContext,
  PresentationContextType,
} from "../../context/PresentationContext";
import { useContext } from "react";
import ToolTip from "../ToolTip";

export default function Presentation() {
  const { presentation } = useContext(
    PresentationContext
  ) as PresentationContextType;

  let selectionSets = presentation?.selectionSets.map(
    (selectionSet: Ham.SelectionSet) => (
      <SelectionSet
        selectionSet={selectionSet}
        key={`selection-set-item-${selectionSet.id}`}
      />
    )
  );

  return (
    <Container>
      <div className="presentation-card">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          gap={1}
        >
          <h3>Presentation: {presentation?.id}</h3>
          <ToolTip title="Example info"></ToolTip>
        </Box>
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          rowGap={2}
        >
          {selectionSets}
        </Grid>
      </div>
    </Container>
  );
}
