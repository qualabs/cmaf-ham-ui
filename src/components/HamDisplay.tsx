import { useEffect, useState } from "react";
import * as Ham from "@svta/common-media-library";
import Presentation from "./ham/Presentation";
import { Container } from "@mui/material";

export const HamDisplay = ({ manifest, protocol }: { manifest: string, protocol: string }) => {
  const [presentation, setPresentation] = useState<Ham.Presentation | null>(
    null
  );

  useEffect(() => {
    const mapManifest = async function (manifest: string) {
      console.log(manifest);
      console.log(protocol);
      if (protocol == "dash"){
        return Ham.mpdToHam(manifest)
          .then(setPresentation)
          .catch((e) => {
            console.error("Erorr while parsing manifest", e);
          }
        );
      }
      if(protocol == "hsl"){
        //hlsToHam
      }
    };

    mapManifest(manifest);
  }, [manifest]);

  if (presentation != null) {
    return (
      <Container maxWidth="lg">
        <h2>Display of {presentation.id}</h2>
        <Presentation presentation={presentation}></Presentation>
      </Container>
    );
  } else {
    return <div>Please select a CMAF compliant Manifest to parse</div>;
  }
};

export default HamDisplay;
