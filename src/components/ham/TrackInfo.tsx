import "./TrackInfo.css";
import * as Ham from "@svta/common-media-library/cmaf-ham";
import { useState } from "react";
import IconButton from "../IconButton/IconButton";
import EditIcon from "../../assets/icons/edit.svg?react";
import DeleteIcon from "../../assets/icons/delete.svg?react";
import Button from "../Button/Button";
import { motion } from "framer-motion";

interface TrackInfoItem {
  id: string;
  label: string;
  value: number | string;
  editable?: boolean;
}

export default function TrackInfo({
  track,
  onClose,
}: {
  track: Ham.Track;
  onClose: () => void;
}) {
  const [trackEditMode, setTrackEditMode] = useState(false);
  /*  const { presentation, selectPresentation } = useContext(
    PresentationContext,
  ) as PresentationContextType; */

  const removeTrack = () => {
    console.log("Remove track", track.id);
    /* //WIP
    if (presentation != null) {
      const updatedPresentation = deleteTrack(presentation, track.id);
      selectPresentation(updatedPresentation);
    } */
  };

  const enterEditMode = () => {
    setTrackEditMode(true);
  };

  const saveChanges = () => {
    setTrackEditMode(false);
  };

  return (
    <motion.div
      layoutId={track.id}
      className="track-info"
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className="track-info-header">
        <h3>
          Track Details:{" "}
          <motion.span layoutId={`title-${track.id}`}>
            {track.id || "Track"}
          </motion.span>
        </h3>
        <div className="track-info-actions">
          <IconButton
            icon={<EditIcon />}
            onClick={enterEditMode}
            backgroundColor="transparent"
            label="Edit Info"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={removeTrack}
            backgroundColor="transparent"
            label="Delete Track"
          />
        </div>
      </div>
      <div className="track-info-container">
        {trackToItems(track).map((item) => (
          <div className="track-info-row">
            <label htmlFor={item.id}>{item.label}</label>
            <input
              id={item.id}
              value={item.value}
              disabled={!trackEditMode}
            ></input>
          </div>
        ))}
      </div>
      <div className="track-info-footer">
        {trackEditMode ? (
          <>
            <Button
              label="Save"
              color="#0a0f15b2"
              background="radial-gradient(76.39% 76.39% at 50% 50%, #FFDB80 0%, #FFBE1A 100%)"
              onClick={saveChanges}
            />
            <Button
              label="Discard"
              color="#0a0f15b2"
              background="#D1D1D1"
              onClick={onClose}
            />
          </>
        ) : (
          <Button
            label="Close"
            color="#0a0f15b2"
            background="radial-gradient(76.39% 76.39% at 50% 50%, #FFDB80 0%, #FFBE1A 100%)"
            onClick={onClose}
          />
        )}
      </div>
    </motion.div>
  );
}

const trackToItems = (track: Ham.Track): TrackInfoItem[] => {
  return [
    {
      id: "id",
      label: "Track:",
      value: track.id,
      editable: false,
    },
    {
      id: "name",
      label: "Name: ",
      value: track.fileName || "",
      editable: true,
    },
    {
      id: "bandwidth",
      label: "Bandwidth:",
      value: track.bandwidth,
      editable: true,
    },
    {
      id: "duration",
      label: "Duration:",
      value: track.duration,
      editable: true,
    },
    {
      id: "segments",
      label: "Number of segments:",
      value: track.segments.length,
      editable: true,
    },
    {
      id: "language",
      label: "Language:",
      value: track.language,
      editable: true,
    },
  ].filter((item) => item.value !== undefined);
};
