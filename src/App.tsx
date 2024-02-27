import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import HamDisplay from "./components/HamDisplay";
import { ManifestFileInput } from "./components/ManifestFileInput";
import { ManifestUrlInput } from "./components/ManifestUrlInput";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Tabs, Tab, Box } from "@mui/material";

const theme = createTheme({
  /* palette: {
    primary: {
      main: "#2a9461",

    },
    secondary: {
      main: "#494c7d",
    },
  }, */
  // Override or create new styles, colors, palettes...
});

export default function App() {
  let [manifest, setManifest] = useState<string | null>(null);
  let [file, setFile] = useState<Blob | null>(null);
  let [protocol, setProtocol] = useState<string | null>(null);
  let [uri, setUri] = useState<string>("");
  let [toggleMediaPlaylistInputs, setToggleMediaPlaylistInputs] = useState<boolean>(false);
  const [ tabValue, setTabValue ] = useState(0);

  const onSubmit = async (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();

    const handleFile = (file: Blob) => {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent?.target?.result) {
          setManifest(readerEvent.target.result.toString());
        }
      };
    };

    if (uri) {
      await fetch(uri)
        .then((r) => r.text())
        .then(setManifest)
        .catch((e) => {
          console.error("Error while reading manifest", e);
          setManifest(null);
        });
    } else if (file) {
      handleFile(file);
      
    } else {
      console.info("No input");
      setManifest(null);
    }
  };

  const onFile = (element: ChangeEvent<HTMLInputElement>) => {
    if (element.target?.files) {
      setFile(element.target.files[0]);
      let manifest_protocol = getProtocol(element.target.files[0].name)
      setProtocol(manifest_protocol);
      if(manifest_protocol == "hls"){
        setToggleMediaPlaylistInputs(true);
      }
    } else {
      setFile(null);
    }
  };

  const onUri = async (element: FormEvent<HTMLInputElement>) => {
    setUri(element.currentTarget.value);
    setProtocol(getProtocol(element.currentTarget.value));
  };

  const getProtocol = (string: string) => {
    //const mpdRegex = /.*\.mpd$/
    const m3u8Regex = /.*\.m3u8$/
    if (m3u8Regex.test(string)) {
      return 'hls'
    } else {
      return 'dash'
    }
  }

  let display =
    manifest !== null && protocol !== null ? (
      <HamDisplay manifest={manifest} protocol={protocol}></HamDisplay>
    ) : (
      <div>Error</div>
    );

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    };


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h1>HAM Converter</h1>
        <Box sx={{ borderBottom: 2, borderColor: 'divider', m:2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="From URL" id={"tab-text"} />
            <Tab label="From File" id={"tab-text"}  />
          </Tabs>
        </Box>
        { tabValue == 0 && 
          <ManifestUrlInput
            onSubmit={onSubmit}
            onUri={onUri}
            toggleMediaPlaylistInputs={toggleMediaPlaylistInputs}
          ></ManifestUrlInput>
        }
        { tabValue == 1 &&
          <ManifestFileInput
            onSubmit={onSubmit}
            onFile={onFile}
            toggleMediaPlaylistInputs={toggleMediaPlaylistInputs}
          ></ManifestFileInput>
        }
        {display}
      </Container>
    </ThemeProvider>
  );
}
