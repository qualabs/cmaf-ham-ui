import * as Ham from "@svta/common-media-library";

import { FC, createContext, useState } from "react";

export type SelectedTrackType = {
  selectedTrack: Ham.Track | null;
  selectTrack: (track: Ham.Track) => void;
  openTrackModal: boolean;
  handleOpenTrackModal: () => void;
  handleCloseTrackModal: () => void;
};

export const SelectedTrackContext = createContext<SelectedTrackType | null>(null);

export const SelectedTrackProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState<Ham.Track | null>(null);
  
  const [openTrackModal, setOpenTrackModal] = useState(false);
  const handleOpenTrackModal = () => setOpenTrackModal(true);
  const handleCloseTrackModal = () => setOpenTrackModal(false);

  const selectTrack = (track: Ham.Track | null) => {
    setSelectedTrack(track);
    return;
  };
  return (
    <SelectedTrackContext.Provider value={{ selectedTrack, selectTrack, openTrackModal, handleOpenTrackModal, handleCloseTrackModal }}>
      {children}
    </SelectedTrackContext.Provider>
  );
};
