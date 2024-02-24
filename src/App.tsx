import React, { FormEvent, useMemo, useState } from "react";
import "./App.css";
import HamDisplay from "./components/HamDisplay";
import { ManifestInput } from "./components/ManifestInput";

function App() {
  let [fileName, setFileName] = useState("");

  const onInput = useMemo<React.FormEventHandler<HTMLInputElement>>(
    () => (element: FormEvent<HTMLInputElement>) => {
      console.log(element.currentTarget.value);
      setFileName(element.currentTarget.value);
    },
    []
  );

  return (
    <div>
      <ManifestInput onInput={onInput}></ManifestInput>
      <HamDisplay fileName={fileName}></HamDisplay>
    </div>
  );
}

export default App;
