import { Box, Container, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

export default function HLSPlayer() {
  const playerRef = useRef(null);

  useEffect(() => {
    // Exponer el reproductor en la consola de Chrome
    window.player = playerRef.current;
  }, []);

  const [hlsUrl, setHlsUrl] = useState(
    "http://localhost:39271/hls/sample-1/main.m3u8"
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

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="50vh"
        mt={4}
      >
        <TextField
          variant="outlined"
          label="HLS Url"
          value={hlsUrl}
          onChange={(e) => setHlsUrl(e.target.value)}
          margin="normal"
          sx={{ backgroundColor: "white", width: "60%" }}
          InputLabelProps={{
            sx: {
              color: "grey",
              margin: "-1vh",
              fontWeight: "bold",
            },
          }}
        />

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
          
        <Box width="60%" mt={4}>
          <div className="player-wrapper">
            <ReactPlayer
              ref={playerRef}
              url={hlsUrl}
              playing={true}
              controls={true}
              width="100%"
              height="100%"
              config={{
                file:{
                  hlsVersion: "1.5.14",
                  dashVersion: "4.7.4"
                }
              }}
            />
          </div>
        </Box>
      </Box>
    </Container>
  );
}
