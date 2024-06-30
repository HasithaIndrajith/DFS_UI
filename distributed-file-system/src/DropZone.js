import { Dropzone, FileMosaic } from "@files-ui/react";
import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyDropZone({ appendUploadedFile }) {
  const [extFiles, setExtFiles] = React.useState([]);

  const updateFiles = (incommingFiles) => {
    // 1
    console.log(incommingFiles);
    console.log("1 incomming files", incommingFiles[0].file);
    setExtFiles(incommingFiles);
  };

  const handleStart = (filesToUpload) => {
    //2
    console.log("Started Uploading");
  };

  const handleFinish = (uploadedFiles) => {
    //3
    console.log("File uploaded", extFiles);
    appendUploadedFile(extFiles[0]);
    setExtFiles([]);
    toast.success("File uploaded successfully");
  };

  const onDelete = (id) => {
    console.log("Deleted!", id);
    setExtFiles(extFiles.filter((x) => x.id !== id));
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
          url: `http://localhost:5001/namenode/upload`,
          // url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/upload`,
          body: { extFiles },
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
