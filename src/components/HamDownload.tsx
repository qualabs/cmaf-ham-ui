import * as Ham from "@svta/common-media-library";
import { Protocols } from "../utils/enums/Protocols";
import { FileExtensions } from "../utils/enums/FileExtensions";

//TODO receive presentation as list
export const HamDownload = ({presentation, fileName}: { presentation: Ham.Presentation, fileName: string }) => {

  const hamDownload = async (protocol: Protocols) => {
    const manifest = await getManifest(protocol)
    if (manifest){
      const fileExtension = FileExtensions[protocol]
      if (fileExtension) {
        const element = document.createElement("a");
        const file = new Blob([manifest.manifest], {type: '*'})
        element.download = fileName + fileExtension;
        element.href = URL.createObjectURL(file);
        document.body.appendChild(element);
        element.click();
      }
    }
  }

  const getManifest = async (protocol: Protocols) =>{
    switch (protocol) {
      case Protocols.DASH:
        return Ham.hamToMPD([presentation])
      case Protocols.HLS:
        return Ham.hamToM3U8([presentation]);
      default:
        break;
    }
  }

  return (
    <>
      <button id="download-mpd" onClick={() => hamDownload(Protocols.DASH)}>Export as DASH</button>
      <button id="download-m3u8" onClick={() => hamDownload(Protocols.HLS)}>Export as HLS</button>
    </>
  )
}

export default HamDownload;