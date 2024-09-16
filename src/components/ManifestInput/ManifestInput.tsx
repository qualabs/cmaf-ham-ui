import React, { useRef, useState } from "react";
import "./manifest-input.css";
import { Protocols } from "../../utils/enums/Protocols";
import IconButton from "../IconButton/IconButton";
import SubmitIcon from "../../assets/icons/submit.svg?react";
import AttachIcon from "../../assets/icons/attach.svg?react";
import RemoveIcon from "../../assets/icons/remove.svg?react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const ManifestInput = ({
  manifest,
  setManifest,
  setProtocol,
  setFileName,
}: {
  manifest: string | null;
  setManifest: React.Dispatch<React.SetStateAction<string | null>>;
  setProtocol: React.Dispatch<React.SetStateAction<string | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [fileSelected, setFileSelected] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    fileNameFromUrl();
    if (fileSelected) {
      setFileSelected(undefined);
      fileInputRef.current!.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFileSelected(event.target.files[0]);
      fileNameFromFile();
      setInputValue("");
    }
  };

  const getProtocol = (string: string) => {
    //const mpdRegex = /.*\.mpd$/
    const m3u8Regex = /.*\.m3u8$/;
    if (m3u8Regex.test(string)) {
      return Protocols.HLS;
    } else {
      return Protocols.DASH;
    }
  };

  const fileNameFromFile = () => {
    setFileName(fileSelected?.name.split(".")[0]);
  };

  const fileNameFromUrl = () => {
    const urlFileName = inputValue.split("/").pop();
    if (urlFileName) {
      setFileName(urlFileName?.split(".")[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFileSelected(files[0]);
      fileNameFromFile();
      fileInputRef.current!.files = files;
      setInputValue("");
      setIsDragOver(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const submit = async () => {
    console.log("Submitted", fileSelected, inputValue);
    if (fileSelected) {
      await readManifest(fileSelected);
      const manifest_protocol = getProtocol(fileSelected.name);
      console.log({ manifest_protocol });

      setProtocol(manifest_protocol);
    }
    if (inputValue) {
      await readManifest(undefined, inputValue);
      setProtocol(getProtocol(inputValue));
    }
  };

  const readManifest = async (file?: File, uri?: string) => {
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

  const attachFile = () => {
    fileInputRef.current?.click();
  };

  const removeManifest = () => {
    setManifest(null);
    setInputValue("");
    setFileSelected(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitEnabled = (!!inputValue || !!fileSelected) && !manifest;

  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <motion.section
      layout
      className={`input-container ${isDragOver ? "drag-over" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragOver(false)}
    >
      <input
        type="text"
        className="input-text"
        placeholder={
          !fileSelected ? "Type a URL or drop an MPD/M3U8 file" : undefined
        }
        value={inputValue}
        onChange={handleInputChange}
      />
      <input
        className="input-file"
        type="file"
        accept=".mpd,.m3u8"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {fileSelected ? (
        <div className="file-selected-name">
          <span>{fileSelected.name}</span>
        </div>
      ) : null}

      {!manifest && !fileSelected && !inputValue && (
        <IconButton
          onClick={attachFile}
          backgroundColor="#373a43"
          label="Select File"
          icon={<AttachIcon />}
        />
      )}
      <AnimatePresence mode="wait">
        {(manifest || fileSelected) && (
          <IconButton
            onClick={removeManifest}
            label="Clear"
            icon={<RemoveIcon />}
            backgroundColor="#373a43"
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {submitEnabled && (
          <IconButton
            onClick={submit}
            label="Submit"
            icon={<SubmitIcon />}
            backgroundColor="#FFBE1A"
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ManifestInput;
