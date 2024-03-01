import * as Ham from "@svta/common-media-library";

enum Protocols {
  HLS= "hls",
  DASH= "dash"
}

export const HamDownload = ({presentation}: { presentation: Ham.Presentation }) => {

  const hamDownload = async (protocol: Protocols) => {
    const manifest = await getManifest(protocol)
    if (manifest){
      const fileExtention = getFileExtention(protocol)
      if (fileExtention) {
        const element = document.createElement("a");
        const file = new Blob([manifest], {type: '*'})
        element.download = "manifest."+fileExtention; //TODO access original filename
        triggerDownloadLink(element, file);
      }
    }
  }

  const getManifest = async (protocol: Protocols) =>{
    switch (protocol) {
      case Protocols.DASH:
        return await Ham.hamToMpd(presentation)
        break;
      case Protocols.HLS:
        // return await Ham.hamToM3U8(presentation);
        break;
      default:
        break;
    }
  }

  const getFileExtention = (protocol: string) =>{
    switch (protocol) {
      case Protocols.DASH:
        return "mpd";
        break;
      case Protocols.HLS:
        return "m3u8";
        break;
      default:
        break;
    }
  }

  function triggerDownloadLink(element: HTMLAnchorElement, file: Blob){
    element.href = URL.createObjectURL(file);
    document.body.appendChild(element);
    element.click();
  }

  return (
    <>
      <button id="download-mpd" onClick={() => hamDownload(Protocols.DASH)}>Export as DASH</button>
      <button id="download-m3u8" onClick={() => hamDownload(Protocols.HLS)}>Export as HLS</button>
    </>
  )
}

export default HamDownload;