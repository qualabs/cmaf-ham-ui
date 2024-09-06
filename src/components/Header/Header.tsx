import React from "react";
import "./header.css";
import ManifestInput from "../ManifestInput/ManifestInput";
import HamConverter from "../../assets/ham-converter.svg?react";
import HamConverterWhite from "../../assets/ham-coverter-white.svg?react";
import InfoIcon from "../../assets/icons/info.svg?react";
import { motion } from "framer-motion";
import IconButton from "../IconButton/IconButton";

const Header = ({
  setManifest,
  manifest,
  setProtocol,
  isFullScreen,
  setFileName,
}: {
  manifest: string | null;
  setManifest: React.Dispatch<React.SetStateAction<string | null>>;
  setProtocol: React.Dispatch<React.SetStateAction<string | null>>;
  isFullScreen?: boolean;
  setFileName: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return (
    <motion.header
      layoutRoot
      className={`header ${isFullScreen ? "" : "no-selected"}`}
    >
      {isFullScreen ? <HamConverterWhite /> : <HamConverter />}
      <ManifestInput
        manifest={manifest}
        setManifest={setManifest}
        setProtocol={setProtocol}
        setFileName={setFileName}
      />

      <IconButton
        onClick={() => console.log("info")}
        label="Remove"
        icon={<InfoIcon />}
        backgroundColor="#373a43"
        className="info-button"
      />
    </motion.header>
  );
};

export default Header;
