
import axios from "axios";
import { sampleFileMetadata } from "./data";
import FileList from "./FileList";
import { useEffect, useState } from "react";
import  MyDropZone  from "./DropZone";

export default function AdvancedDropzoneDemo() {
  const [files, setFiles] = useState([]);
  // const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/files`
        );
        console.log("Files fetched:", response.data);
        // Convert the response data to the FileMetadata type
        const convertedFiles = response.data.map((file, index) => {
          return {
            id: index.toString(),
            size: file.fileSize,
            type: file.fileType,
            name: file.fileName,
          };
        });
        setFiles(convertedFiles);
      } catch (error) {
        console.error("Files fetch failed:", error);
      }
    }
    fetchFiles();
    setFiles(sampleFileMetadata);
  }, []);

  return (
    <>
      <MyDropZone />
      <FileList files={files} />
    </>
  );
}
