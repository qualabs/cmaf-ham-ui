import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "./hlsplayer.css";
import IconButton from "../IconButton/IconButton";
import CloseIcon from "../../assets/icons/close.svg?react";
import { useNavigate } from "react-router-dom";

export default function HLSPlayer() {
  const playerRef = useRef(null);

  useEffect(() => {
    // Exponer el reproductor en la consola de Chrome
    window.player = playerRef.current;
  }, []);

  const [hlsUrl, setHlsUrl] = useState(
    "http://localhost:39271/hls/sample-1/main.m3u8",
  );

  // IF WE WANT TO UPLOAD .M3U8 LOCALLY

  // const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);

  // const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const fileUrl = URL.createObjectURL(file);
  //     setLocalFileUrl(fileUrl);
  //     setHlsUrl(""); // Clear the URL input to avoid confusion
  //   }
  // };

  const navigate = useNavigate();

  const onClose = () => {
    navigate("/");
  };

  return (
    <div className="hls-player-container">
      <div className="hls-player-header">
        <h3>HLS Player</h3>
        <div className="info-actions">
          <IconButton
            icon={<CloseIcon />}
            onClick={onClose}
            backgroundColor="transparent"
            label="Edit Info"
          />
        </div>
      </div>
      <div className="hls-input-container">
        <label>HLS Url</label>
        <input value={hlsUrl} onChange={(e) => setHlsUrl(e.target.value)} />
      </div>

      {/* ********************************** */}

      {/* IF WE WANT TO UPLOAD .M3U8 LOCALLY */}

      {/* <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
          Upload HLS File
          <input
            type="file"
            hidden
            accept=".m3u8"
            onChange={handleFileUpload}
          />
        </Button> */}

      {/* ********************************** */}

      <div className="player-wrapper">
        <ReactPlayer
          ref={playerRef}
          url={hlsUrl}
          playing={true}
          controls={true}
          width="100%"
          height="100%"
          config={{
            file: {
              hlsVersion: "1.5.14",
              dashVersion: "4.7.4",
            },
          }}
        />

        <p>The HLS source must be hosted on a server to be able to play it.</p>
      </div>
    </div>
  );
}
