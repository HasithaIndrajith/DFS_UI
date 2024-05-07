import { Dropzone, FileMosaic } from "@files-ui/react";
import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyDropZone({ appendUploadedFile }) {
  const [extFiles, setExtFiles] = React.useState([]);

  const updateFiles = (incommingFiles) => {
    console.log(incommingFiles)
    console.log("incomming files", incommingFiles[0].file);
    setExtFiles(incommingFiles);
  };
  const onDelete = (id) => {
    console.log("Deleted!" , id);
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };

  const handleStart = (filesToUpload) => {
    console.log("Started Uploading");
  };

  const handleFinish = (uploadedFiles) => {
    console.log("File uploaded", extFiles);
    appendUploadedFile(extFiles[0]);
    setExtFiles([]);
    toast.success("File uploaded successfully");
  };

  return (
    <>
      <ToastContainer />
      <Dropzone
        onChange={updateFiles}
        minHeight="195px"
        value={extFiles}
        maxFiles={1}
        label="Drag'n drop files here or click to browse"
        uploadConfig={{
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/upload`,
          method: "POST",
          headers: {}, // add API key
        }}
        onUploadStart={handleStart}
        onUploadFinish={handleFinish}
        // onAbort={handleAbort}
        // onClean={handleCancel}
        actionButtons={{
          position: "after",
          abortButton: {},
          uploadButton: {},
          cleanButton: { onClick: () => setExtFiles([]) },
        }}
      >
        {extFiles.map((file) => (
          <FileMosaic
            {...file}
            key={file.id}
            onDelete={onDelete}
            resultOnTooltip
            alwaysActive
            preview
            info
          />
        ))}
      </Dropzone>
    </>
  );
}
