import * as React from "react";
import { FileInputButton, FileCard, FilesUiProvider } from "@files-ui/react";
import { Autocomplete, TextField, Button } from "@mui/material";
import "./styles.css";

const DemoGlobalConfig = () => {
  const [localization, setLocalization] = React.useState(undefined);

  const [darkModeOn, setDarkModeOn] = React.useState(false);
  const [otherIcons, setOtherIcons] = React.useState(true);

  const hadleSelect = (value) => {
    console.log(value);
    setLocalization(value?.value);
  };
  const iconsConfig = {
    //local resource
    docx: "/other_icons/wordicon.png",
    //external resource
    pdf: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDw14VqtuvUv74kiT1anhx6eRb_JjOXBxeqA&usqp=CAU",
  };
  return (
    <FilesUiProvider
      config={{
        localization: localization,
        darkMode: darkModeOn,
        icons: otherIcons ? iconsConfig : undefined,
      }}
    >
      <div className="demo-controls-container">
        <Autocomplete
          disablePortal
          autoSelect
          size="small"
          onChange={(e, value) => hadleSelect(value)}
          id="combo-box-demo"
          options={languages}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.language}
          renderInput={(params) => (
            <TextField {...params} label="Localization" />
          )}
        />
        <Button
          variant="contained"
          onClick={() => setDarkModeOn((_darkModeOn) => !_darkModeOn)}
        >
          {darkModeOn ? "turn on light" : "turn off light"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setOtherIcons((_otherIcons) => !_otherIcons)}
        >
          {!otherIcons ? "Other icons" : "Default icons"}
        </Button>
      </div>
      <div
        className="demo-localization-container"
        style={{
          backgroundColor: darkModeOn ? "#121212" : "white",
        }}
      >
        <div className="inputbutton-container">
          <FileInputButton value={[]} />
        </div>
        <div className="filecard-container">
          {extFiles.map((extFile, index) => (
            <FileCard key={index} {...extFile} onDelete={() => {}} info />
          ))}
        </div>
      </div>
    </FilesUiProvider>
  );
};
export default DemoGlobalConfig;

const languages = [
  { language: "Español: ES-es", value: "ES-es" },
  { language: "English: EN-en", value: "EN-en" },
  { language: "French: FR-fr", value: "FR-fr" },
  { language: "Italian: IT-it", value: "IT-it" },
  { language: "Portuguese: PT-pt", value: "PT-pt" },
  { language: "Russian: RU-ru", value: "RU-ru" },
  { language: "Chinese(simplified): ZH-cn", value: "ZH-cn" },
  { language: "Chinese(traditional): ZH-hk", value: "ZH-hk" },
];
const extFiles = [
  {
    id: 0,
    name: "file_global_conf.docx",
    size: 28 * 1024,
    errors: ["pdf not allowed", "file is too big"],
  },
  {
    id: 1,
    valid: false,
    name: "file_global_conf.docx",

    size: 28 * 1024,
    errors: ["pdf not allowed", "file is too big"],
  },
  {
    id: 2,
    valid: true,
    name: "file_global_conf.docx",
    size: 28 * 1024,
  },
  {
    id: 3,
    valid: true,
    name: "file_global_conf.pdf",
    type: "application/pdf",
    size: 28 * 1024,
    uploadStatus: "preparing",
  },
  {
    id: 4,
    name: "file_global_conf.pdf",
    type: "application/pdf",
    size: 28 * 1024,
    uploadStatus: "uploading",
    progress: 28,
  },
  {
    id: 5,
    valid: true,
    name: "file_global_conf.docx",
    size: 28 * 1024,
    uploadStatus: "aborted",
    uploadMessage: "Upload was aborted",
  },
  {
    id: 6,
    valid: false,
    name: "file_global_conf.pdf",
    type: "application/pdf",
    size: 28 * 1024,
    uploadStatus: "error",
    uploadMessage: "there was an error on the server",
  },
  {
    id: 7,
    valid: true,
    name: "file_global_conf.docx",
    size: 28 * 1024,
    uploadStatus: "success",
    uploadMessage: "files-ui <3",
  },
];
