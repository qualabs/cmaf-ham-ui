import * as Ham from "@svta/common-media-library";

enum Protocols {
  HLS= "hls",
  DASH= "dash"
}

enum Extentions {
  hls= ".m3u8",
  dash= ".mpd"
}

export const HamDownload = ({presentation, fileName}: { presentation: Ham.Presentation, fileName: string }) => {

  const hamDownload = async (protocol: Protocols) => {
    const manifest = await getManifest(protocol)
    if (manifest){
      const fileExtention = Extentions[protocol]
      if (fileExtention) {
        const element = document.createElement("a");
        const file = new Blob([manifest], {type: '*'})
        element.download = fileName + fileExtention;
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