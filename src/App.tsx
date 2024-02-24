import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import HamDisplay from "./components/HamDisplay";
import { ManifestInput } from "./components/ManifestInput";

export default function App() {
  let [manifest, setManifest] = useState<string | null>(null);
  let [fileName, setFileName] = useState<Blob | null>(null);
  let [uri, setUri] = useState<string>("");

  const onSubmit = async (form: FormEvent<HTMLFormElement>) => {
    form.preventDefault();

    const handleFile = (fileName: Blob) => {
      const reader = new FileReader();
      reader.readAsText(fileName, "UTF-8");
      reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent?.target?.result) {
          setManifest(readerEvent.target.result.toString());
        }
      };
    };

    if (uri) {
      console.info("Uri");
      //const getManifest = async (fileName: string) =>
      await fetch(uri)
        .then((r) => r.text())
        .then(setManifest)
        .catch((e) => {
          console.error("Error while reading manifest", e);
          setManifest(null);
        });
    } else if (fileName) {
      console.info("File", fileName);
      handleFile(fileName);
    } else {
      console.info("No input");
      setManifest(null);
    }
  };

  const onFile = (element: ChangeEvent<HTMLInputElement>) => {
    console.log(element.target);
    // setFileName(element.currentTarget.value);
    console.info("Unimplemented: Get manifest from file system");
    if (element.target?.files) {
      setFileName(element.target.files[0]);
    } else {
      setFileName(null);
    }
  };

  const onUri = async (element: FormEvent<HTMLInputElement>) => {
    setUri(element.currentTarget.value);
  };

  let display =
    manifest !== null ? (
      <HamDisplay manifest={manifest}></HamDisplay>
    ) : (
      <div>Error</div>
    );

  return (
    <div>
      <h1>HAM Converter</h1>
      <ManifestInput
        onSubmit={onSubmit}
        onUri={onUri}
        onFile={onFile}
      ></ManifestInput>
      {display}
    </div>
  );
}
