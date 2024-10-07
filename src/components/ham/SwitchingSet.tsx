import "./SwitchingSet.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import Track from "./Track";
import { motion } from "framer-motion";

export default function SwitchingSet({
  switchingSet,
}: {
  switchingSet: Ham.SwitchingSet;
}) {
  return (
    <motion.div
      className="switching-set-card"
      id={`switching-set-card-${switchingSet.id}`}
    >
      <h3>Switching Set: {switchingSet.id}</h3>
      {switchingSet.tracks.map((track: Ham.Track, key) => (
        <Track track={track} key={`track-item-${track.id}-${key}`} />
      ))}
    </motion.div>
  );
}
