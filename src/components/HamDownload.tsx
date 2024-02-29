import * as Ham from "@svta/common-media-library";

export const HamDownload = ({presentation}: { presentation: Ham.Presentation, protocol: string }) => {

  const downloadMpdFile = async () => {
    let manifest = await Ham.hamToMpd(presentation);
    if (manifest){
      const element = document.createElement("a");
      const file = new Blob([manifest], {type: 'application/dash+xml'})
      element.download = "myFile.mpd"; //TODO access original filename
      triggerDownloadLink(element, file);
    }
  }

  const downloadM3U8File = async () => {
    // let manifest = await Ham.hamToM3U8(presentation);
    // if (manifest){
    //   const element = document.createElement("a");
    //   const file = new Blob([manifest], {type: 'application/x-mpegURL'})
    //   element.download = "myFile.m3u8"; //TODO access original filename
    //   triggerDownloadLink(element, file);
    // }
  }

  function triggerDownloadLink(element: HTMLAnchorElement, file: Blob){
    element.href = URL.createObjectURL(file);
    document.body.appendChild(element);
    element.click();
  }

  return (
    <>
      <button id="download-mpd" onClick={downloadMpdFile}>Export as DASH</button>
      <button id="download-m3u8" onClick={downloadM3U8File}>Export as HLS</button>
    </>
  )
}

export default HamDownload;