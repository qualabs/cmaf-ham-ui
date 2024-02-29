import React from "react";
import * as Ham from "@svta/common-media-library";

export const HamDownload = ({presentation}: { presentation: Ham.Presentation, protocol: string }) => {

  const downloadTMpdFile = async (event: React.MouseEvent<HTMLButtonElement>, protocol: string) => {
    let manifest;
    if(protocol == 'dash'){
      manifest = await Ham.hamToMpd(presentation);
    } else if (protocol == 'hls') {
      // manifest = await Ham.hamToM3U8(presentation);
    }
    if (manifest){
      const element = document.createElement("a");
      const file = new Blob([manifest], {type: 'text/plain'})
      element.href = URL.createObjectURL(file);
      element.download = "myFile.txt";
      document.body.appendChild(element);
      element.click();
    }
  }

  return (
    <>
      <button onClick={(e) => downloadTMpdFile(e, 'dash')}>Download as DASH</button>
      <button onClick={(e) => downloadTMpdFile(e, 'hls')}>Download as HLS</button>
    </>
  )
}

export default HamDownload;