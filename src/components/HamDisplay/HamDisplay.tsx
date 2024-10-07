import { useContext, useEffect } from "react";
import * as Ham from "@svta/common-media-library";
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
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../Modal/Modal";
import WrongFileIcon from "../../assets/icons/wrong-file.svg?react";

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

  useEffect(() => {
    selectedTrack ? openTrackModal : handleCloseTrackModal();
  }, [selectedTrack]);

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
        <AnimatePresence>
          {selectedTrack !== null && openTrackModal && (
            <Modal>
              <TrackInfo
                onClose={handleCloseTrackModal}
                track={selectedTrack}
              ></TrackInfo>
            </Modal>
          )}
        </AnimatePresence>
      </>
    );
  } else {
    return (
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.5, staggerChildren: 0.5 }}
        className="wrong-file-container"
      >
        <WrongFileIcon />
        <motion.h3>Please select a CMAF compliant Manifest to parse</motion.h3>
        <motion.p>
          Supported protocols are DASH and HLS, please select another file or
          check URL.
        </motion.p>
      </motion.div>
    );
  }
};

export default HamDisplay;
