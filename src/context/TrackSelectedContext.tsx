import * as Ham from "@svta/common-media-library";

import { FC, createContext, useState } from "react";

export type SelectedTrackType = {
  selectedTrack: Ham.Track | null;
  selectTrack: (track: Ham.Track) => void;
};

export const SelectedTrackContext = createContext<SelectedTrackType | null>(null);

export const SelectedTrackProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState<Ham.Track | null>(null);
  const selectTrack = (track: Ham.Track | null) => {
    setSelectedTrack(track);
    return;
  };
  return (
    <SelectedTrackContext.Provider value={{ selectedTrack, selectTrack }}>
      {children}
    </SelectedTrackContext.Provider>
  );
};
