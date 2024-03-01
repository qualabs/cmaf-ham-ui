import { useEffect, useState } from "react";
import * as Ham from "@svta/common-media-library";
import Presentation from "./ham/Presentation";
import { Container } from "@mui/material";
import HamDownload from "./HamDownload";

enum Protocols {
  HLS= "hls",
  DASH= "dash"
}

export const HamDisplay = ({ manifest, protocol }: { manifest: string, protocol: string }) => {
  const [presentation, setPresentation] = useState<Ham.Presentation | null>(null);

  useEffect(() => {
    const mapManifest = async function (manifest: string) {
      // console.log(manifest);
      // console.log(protocol);
      switch(protocol) {
        case Protocols.DASH:
          return Ham.mpdToHam(manifest)
            .then(setPresentation)
            .catch((e) => {
              console.error("Erorr while parsing manifest", e);
            }
          );
          break;
        case Protocols.HLS:
          // return Ham.mpdToM3U8(manifest)
          //   .then(setPresentation)
          //   .catch((e) => {
          //     console.error("Erorr while parsing manifest", e);
          //   }
          // );
          break;
        default:
          break;
        }
    };

    mapManifest(manifest);
  }, [manifest]);

  if (presentation != null) {
    return (
      <Container maxWidth="lg">
        <HamDownload presentation={presentation} />
        <Presentation presentation={presentation}></Presentation>
      </Container>
    );
  } else {
    return <div>Please select a CMAF compliant Manifest to parse</div>;
  }
};

export default HamDisplay;
