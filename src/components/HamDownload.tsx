import * as Ham from "@svta/common-media-library";
import { Protocols } from "../utils/enums/Protocols";
import { FileExtensions } from "../utils/enums/FileExtensions";
import JSZip from "jszip";
import saveAs from "file-saver";
import { Manifest } from "@svta/common-media-library";
import Button from "./Button/Button";
import DownloadIcon from "../assets/icons/download.svg?react";
import PlayerIcon from "../assets/icons/player.svg?react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//TODO receive presentation as list
export const HamDownload = ({
  presentation,
  fileName,
}: {
  presentation: Ham.Presentation;
  fileName: string;
}) => {
  /*   const hamDownload = (protocol: Protocols) => {
    const manifest = getMainManifest(protocol);
    if (manifest) {
      const fileExtension = FileExtensions[protocol];
      if (fileExtension) {
        const element = document.createElement("a");
        const file = new Blob([manifest.manifest], { type: "*" });
        element.download = fileName + fileExtension;
        element.href = URL.createObjectURL(file);
        document.body.appendChild(element);
        element.click();
      }
    }
  }; */

  const hamZipDownload = (protocol: Protocols) => {
    const zip = new JSZip();
    const manifest = getMainManifest(protocol);
    if (manifest) {
      const fileExtension = FileExtensions[protocol];
      if (fileExtension) {
        zip.file(fileName + fileExtension, manifest.manifest);
        if (manifest.ancillaryManifests) {
          exportAncillaryManifests(protocol, manifest.ancillaryManifests, zip);
        }
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, `ham-converter-${protocol}-${Date.now()}.zip`);
        });
      }
    }
  };

  const getMainManifest = (protocol: Protocols) => {
    switch (protocol) {
      case Protocols.DASH:
        return Ham.hamToDash([presentation]);
      case Protocols.HLS:
        return Ham.hamToHls([presentation]);
      default:
        break;
    }
  };

  const exportAncillaryManifests = (
    protocol: Protocols,
    manifests: Manifest[],
    zip: JSZip,
  ) => {
    switch (protocol) {
      case Protocols.HLS:
        manifests.map((ancillaryManifest, index) => {
          const fileName = index + 1;
          zip.file(`${fileName}.m3u8`, ancillaryManifest.manifest);
        });
    }
  };

  const actionsAnimationVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const navigate = useNavigate();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={actionsAnimationVariants}
      className="actions-container"
    >
      <Button
        label="HLS Player"
        icon={<PlayerIcon />}
        color="#0a0f15b2"
        background="radial-gradient(50% 50% at 50% 50%, #CACACA 0%, #B1B1B1 100%)"
        onClick={() => navigate("/player")}
      />
      <Button
        label="Export as DASH"
        icon={<DownloadIcon />}
        color="#0a0f15b2"
        background="radial-gradient(76.39% 76.39% at 50% 50%, #FFDB80 0%, #FFBE1A 100%)"
        onClick={() => hamZipDownload(Protocols.DASH)}
      />
      <Button
        label="Export as HLS"
        icon={<DownloadIcon />}
        color="#0a0f15b2"
        background="radial-gradient(76.39% 76.39% at 50% 50%, #FFDB80 0%, #FFBE1A 100%)"
        onClick={() => hamZipDownload(Protocols.HLS)}
      />
    </motion.div>
  );
};

export default HamDownload;
