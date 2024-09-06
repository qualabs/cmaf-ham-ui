import "./SelectionSet.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import SwitchingSet from "./SwitchingSet";
import { motion } from "framer-motion";

export default function SelectionSet({
  selectionSet,
}: {
  selectionSet: Ham.SelectionSet;
}) {
  const handleMediaType = (input: string) => {
    const mediaTypes: { [key: string]: string } = {
      video_: "VIDEO TRACKS",
      videostream_: "VIDEO TRACKS",
      audio_: "AUDIO TRACKS",
      audiostream_: "AUDIO TRACKS",
      datastream_: "METADATA TRACKS",
      metadatastream_: "METADATA TRACKS",
      metadata_: "METADATA TRACKS",
      textstream_: "TEXT TRACKS",
      imagestream_: "IMAGE TRACKS",
      thumbnail_: "THUMBNAIL TRACKS",
      image_: "IMAGE TRACKS",
    };

    const key = Object.keys(mediaTypes).find((prefix) =>
      input.startsWith(prefix),
    );
    return key ? mediaTypes[key] : "UNKNOWN TYPE";
  };

  const presentationAnimationVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.6,
      },
    },
  };

  const selectionSetAnimationVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={presentationAnimationVariants}
      className="selection-set-card"
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        Selection Set {selectionSet.id}
        <span>
          {handleMediaType(selectionSet.switchingSets[0].tracks[0].id)}
        </span>
      </motion.h2>
      {selectionSet.switchingSets.map((switchingSet: Ham.SwitchingSet, key) => (
        <motion.div
          variants={selectionSetAnimationVariants}
          key={`switching-set-item-${switchingSet.id}-${key}`}
        >
          <SwitchingSet switchingSet={switchingSet} />
        </motion.div>
      ))}
    </motion.div>
  );
}
