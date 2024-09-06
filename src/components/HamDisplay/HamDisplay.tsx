import { useContext, useEffect } from "react";
import * as Ham from "@svta/common-media-library";
import { Container, Modal } from "@mui/material";
import Presentation from "../ham/Presentation";
import HamDownload from "../HamDownload";
import { Protocols } from "../../utils/enums/Protocols";
import TrackInfo from "../ham/TrackInfo";
import {
  SelectedTrackContext,
  SelectedTrackType,
} from "../../context/TrackSelectedContext";

import {
  PresentationContext,
  PresentationContextType,
} from "../../context/PresentationContext";
import "./ham-display.css";
import { motion } from "framer-motion";

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
    PresentationContext,
  ) as PresentationContextType;

  const { selectedTrack, openTrackModal, handleCloseTrackModal } = useContext(
    SelectedTrackContext,
  ) as SelectedTrackType;

  useEffect(() => {
    const mapManifest = async function (manifest: string) {
      // console.log(manifest);
      // console.log(protocol);
      switch (protocol) {
        case Protocols.DASH:
          // eslint-disable-next-line no-case-declarations
          const ham = Ham.dashToHam(manifest);
          if (ham.length > 0) {
            selectPresentation(ham[0]); // TODO change state to list of presentations
          }
          break;
        case Protocols.HLS:
          // return Ham.hlsToHam(manifest)
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
      <>
        <section className="ham-display-container">
          <section className="ham-display-header">
            <motion.h1
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <strong>Presentation: </strong>
              {presentation?.id}
            </motion.h1>
            <HamDownload presentation={presentation} fileName={fileName} />
          </section>
          <Presentation />
        </section>
        {selectedTrack !== null && (
          <Modal open={openTrackModal} onClose={handleCloseTrackModal}>
            <TrackInfo track={selectedTrack}></TrackInfo>
          </Modal>
        )}
      </>
    );
  } else {
    return <div>Please select a CMAF compliant Manifest to parse</div>;
  }
};

export default HamDisplay;
