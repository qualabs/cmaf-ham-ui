import { useContext, useEffect } from "react";
import * as Ham from "@svta/common-media-library";
import { Container, Modal } from "@mui/material";
import Presentation from "./ham/Presentation";
import HamDownload from "./HamDownload";
import { Protocols } from "../utils/enums/Protocols";
import TrackInfo from "./ham/TrackInfo";
import {
  SelectedTrackContext,
  SelectedTrackType,
} from "../context/TrackSelectedContext";

import {
  PresentationContext,
  PresentationContextType,
} from "../context/PresentationContext";

export const HamDisplay = ({
  manifest,
  protocol,
  fileName,
}: {
  manifest: string;
  protocol: string;
  fileName: string;
}) => {

  const { presentation, selectPresentation } = useContext(
    PresentationContext
  ) as PresentationContextType;


  const { selectedTrack, openTrackModal, handleCloseTrackModal } = useContext(
    SelectedTrackContext
  ) as SelectedTrackType;

  useEffect(() => {
    const mapManifest = async function (manifest: string) {
      // console.log(manifest);
      // console.log(protocol);
      switch (protocol) {
        case Protocols.DASH:
          let ham = Ham.mpdToHam(manifest);
          if (ham.length > 0) {
            selectPresentation(ham[0]); // TODO change state to list of presentations
          }
          break;
        case Protocols.HLS:
          // return Ham.m3u8ToHam(manifest)
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
    let DownloadButtons = (
      <HamDownload presentation={presentation} fileName={fileName} />
    );
    let PresentationsDisplay = (
      <Presentation/>
    );

    // let Display =
    //   selectedTrack == null ? (
    //     <Container maxWidth="lg">
    //       {DownloadButtons}
    //       {PresentationsDisplay}
    //     </Container>
    //   ) : (
    //     <Container maxWidth="lg">
    //       {DownloadButtons}
    //       {PresentationsDisplay}
    //       <Modal
    //         open={openTrackModal}
    //         onClose={handleCloseTrackModal}
    //       >
    //         <TrackInfo track={selectedTrack}></TrackInfo>
    //       </Modal>
    //     </Container>
    //   );

    let Display =
       <>
        <Container maxWidth="lg">
          {DownloadButtons}
          {PresentationsDisplay}
        </Container>
        {selectedTrack !== null &&
          <Modal
            open={openTrackModal}
            onClose={handleCloseTrackModal}
          >
            <TrackInfo track={selectedTrack}></TrackInfo>
          </Modal>
        }
       </>

    return Display;
  } else {
    return <div>Please select a CMAF compliant Manifest to parse</div>;
  }
};

export default HamDisplay;
