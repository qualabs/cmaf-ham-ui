import * as Ham from "@svta/common-media-library/cmaf-ham";
import SelectionSet from "./SelectionSet";
import { Container, Grid } from "@mui/material";

interface PresentationParams {
  presentation: Ham.Presentation;
}

import {
  PresentationContext,
  PresentationContextType,
} from "../../context/PresentationContext";
import { useContext } from "react";
import InfoBox from "../InfoBox";

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
        <InfoBox
          id={presentation?.id}
          text={"Presentation: "}
          info={"Example presentation info"}
          headerLevel={3}
        />
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
