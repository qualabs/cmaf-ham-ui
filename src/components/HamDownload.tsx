import * as Ham from "@svta/common-media-library";
import { Protocols } from "../utils/enums/Protocols";
import { FileExtensions } from "../utils/enums/FileExtensions";
import JSZip from "jszip";
import saveAs from "file-saver";
import { Manifest } from "@svta/common-media-library";

//TODO receive presentation as list
export const HamDownload = ({presentation, fileName}: { presentation: Ham.Presentation, fileName: string }) => {

  const hamDownload = (protocol: Protocols) => {
    const manifest = getMainManifest(protocol)
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

  const hamZipDownload = (protocol: Protocols) => {
    const zip = new JSZip();
    const manifest = getMainManifest(protocol)
    if (manifest){
      const fileExtension = FileExtensions[protocol]
      if (fileExtension) {
        zip.file(fileName + fileExtension, manifest.manifest);
        if(manifest.ancillaryManifests){
          exportAncillaryManifests(protocol, manifest.ancillaryManifests, zip);
        }
        zip.generateAsync({type:"blob"}).then(function(content) {
          saveAs(content, "ham_converter.zip");
      });
      }
    }
  }

  const getMainManifest = (protocol: Protocols ) =>{
    switch (protocol) {
      case Protocols.DASH:
        return Ham.hamToDash([presentation])
      case Protocols.HLS:
        return Ham.hamToHls([presentation]);
      default:
        break;
    }
  }

  const exportAncillaryManifests = (protocol: Protocols, manifests: Manifest[], zip: JSZip) =>{
    switch(protocol) {
      case Protocols.HLS:
      manifests.map((ancillaryManifest, index)=>{
        zip.file(`${index}`, ancillaryManifest.manifest);
      })
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