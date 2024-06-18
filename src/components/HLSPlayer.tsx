import { Box, Button, Container, TextField } from "@mui/material";
import React, { ChangeEvent, useRef } from "react";
import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";

export default function HLSPlayer() {
  const [hlsUrl, setHlsUrl] = useState(
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  );
  const playerRef = useRef<HTMLVideoElement>(null);
  const [localFileUrl, setLocalFileUrl] = useState<string | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setLocalFileUrl(fileUrl);
      setHlsUrl(""); // Clear the URL input to avoid confusion
    }
  };

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
        {/* <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
          Upload HLS File
          <input
            type="file"
            hidden
            accept=".m3u8"
            onChange={handleFileUpload}
          />
        </Button> */}
        <Box width="60%" mt={4}>
          <ReactHlsPlayer
            src={hlsUrl}
            autoPlay={false}
            controls={true}
            width="100%"
            height="auto"
            playerRef={playerRef}
          />
        </Box>
      </Box>
    </Container>
  );
}
