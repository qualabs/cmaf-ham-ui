import * as Ham from "@svta/common-media-library";
import { Protocols } from "../utils/enums/Protocols";
import { FileExtensions } from "../utils/enums/FileExtensions";
import JSZip from "jszip";
import saveAs from "file-saver";
const zip = new JSZip();

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

  const hamZipDownload = async (protocol: Protocols) => {
    const manifest = await getManifest(protocol)
    if (manifest){
      const fileExtension = FileExtensions[protocol]
      if (fileExtension) {
        zip.file(fileName + fileExtension, manifest.manifest);
        zip.generateAsync({type:"blob"}).then(function(content) {
          saveAs(content, "ham_converter.zip");
      });
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
      <button id="download-mpd" onClick={() => hamZipDownload(Protocols.DASH)}>Export as DASH</button>
      <button id="download-m3u8" onClick={() => hamZipDownload(Protocols.HLS)}>Export as HLS</button>
    </>
  )
}

export default HamDownload;