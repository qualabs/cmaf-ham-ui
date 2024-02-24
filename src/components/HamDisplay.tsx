import { useEffect, useState } from "react";
import * as Ham from "@svta/common-media-library";
import Presentation from "./ham/Presentation";

export const HamDisplay = ({ fileName }: { fileName: string }) => {
  const [presentation, setPresentation] = useState<Ham.Presentation | null>(
    null
  );

  useEffect(() => {
    const getManifest = async (fileName: string) =>
      await fetch(fileName)
        .then((r) => r.text())
        .then((manifest) => {
          console.log(manifest);
          return Ham.mpdToHam(manifest);
        })
        .then((presentation) => setPresentation(presentation));
    getManifest(fileName);
  }, [fileName]);

  if (presentation != null) {
    return (
      <div>
        <h1>Display of {fileName}</h1>
        <Presentation presentation={presentation}></Presentation>
      </div>
    );
  } else {
    return <div>Please select a CMAF compliant Manifest to parse</div>;
  }
};

export default HamDisplay;
