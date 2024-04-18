import * as Ham from "@svta/common-media-library";

import { FC, createContext, useState } from "react";

export type PresentationContextType = {
  presentation: Ham.Presentation | null;
  selectPresentation: (presentation: Ham.Presentation) => void;
};

export const PresentationContext = createContext<PresentationContextType | null>(null);

export const PresentationProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const [presentation, setPresentation] = useState<Ham.Presentation | null>(null);

  const selectPresentation = (presentation: Ham.Presentation | null) => {
    setPresentation(presentation);
    return;
  };

  return (
    <PresentationContext.Provider value={{ presentation, selectPresentation }}>
      {children}
    </PresentationContext.Provider>
  );
};
