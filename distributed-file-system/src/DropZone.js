import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
  VideoPreview,
} from "@files-ui/react";
import * as React from "react";

const BASE_URL = "https://www.myserver.com";

export default function MyDropZone() {

  const [extFiles, setExtFiles] = React.useState([]);
  const [imageSrc, setImageSrc] = React.useState(undefined);
  const [videoSrc, setVideoSrc] = React.useState(undefined);


  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles[0].file);
    setExtFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleWatch = (videoSource) => {
    setVideoSrc(videoSource);
  };
  const handleStart = (filesToUpload) => {
    console.log(extFiles[0].file);
    console.log(extFiles[0].file.name);
    console.log(extFiles[0].type);
    // console.log(extFiles[0].lastModifiedDate.toDateString());
    console.log("advanced demo start upload", filesToUpload);
    const byteArray = new Uint8Array([
      /* byte data goes here */
    ]);

    // Create a Blob object from the byteArray
    const blob = new Blob([byteArray]);

    // Create a file from the Blob object
    const file = new File([blob], extFiles[0].file, { type: extFiles[0].type });

    // Create a FormData object
    const formData = new FormData();

    // Append the file to the FormData object
    formData.append("file", file);

    console.log(formData);
  };
  const handleFinish = (uploadedFiles) => {
    console.log(extFiles);
    console.log("advanced demo finish upload", uploadedFiles);
  };
  const handleAbort = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };
  return (
    <>
      <Dropzone
        onChange={updateFiles}
        minHeight="195px"
        value={extFiles}
        maxFiles={1}
        label="Drag'n drop files here or click to browse"
        uploadConfig={{
          // autoUpload: true
          url: BASE_URL + "/file",
          cleanOnUpload: true,
        }}
        onUploadStart={handleStart}
        onUploadFinish={handleFinish}
        fakeUpload
        actionButtons={{
          position: "after",
          abortButton: {},
          deleteButton: {},
          uploadButton: {},
        }}
      >
        {extFiles.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            onSee={handleSee}
            onWatch={handleWatch}
            onAbort={handleAbort}
            onCancel={handleCancel}
            resultOnTooltip
            alwaysActive
            preview
            info
          />
        ))}
      </Dropzone>
      <FullScreen
        open={imageSrc !== undefined}
        onClose={() => setImageSrc(undefined)}
      >
        <ImagePreview src={imageSrc} />
      </FullScreen>
      <FullScreen
        open={videoSrc !== undefined}
        onClose={() => setVideoSrc(undefined)}
      >
        <VideoPreview src={videoSrc} autoPlay controls />
      </FullScreen>

    </>
  );
}
