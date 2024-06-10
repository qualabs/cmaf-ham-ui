import { Box, Container, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import ReactHlsPlayer from "react-hls-player";

export default function HLSPlayer() {
  const [hlsUrl, setHlsUrl] = useState(
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  );
  const playerRef = useRef<HTMLVideoElement>(null);
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
