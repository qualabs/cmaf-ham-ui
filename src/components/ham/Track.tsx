import { useContext } from "react";
import "./Track.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import {
  SelectedTrackContext,
  SelectedTrackType,
} from "../../context/TrackSelectedContext";
import MoreIcon from "../../assets/icons/more.svg?react";
import { motion } from "framer-motion";

export default function Track({ track }: { track: Ham.Track }) {
  const { selectTrack, handleOpenTrackModal } = useContext(
    SelectedTrackContext,
  ) as SelectedTrackType;
  const onClick = () => {
    selectTrack(track);
    handleOpenTrackModal();
  };

  return (
    <motion.div
      id={`track-div-${track.id}`}
      className="track-card"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{
        scale: 0.98,
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.327)",
      }}
      //variants={trackAnimationVariants}
    >
      <span>Track</span>
      <h4>{track.id}</h4>
      <MoreIcon />
    </motion.div>
  );
}
