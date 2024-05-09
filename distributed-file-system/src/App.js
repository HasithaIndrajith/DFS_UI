
import axios from "axios";
import { sampleFileMetadata, searchedFileMetadata } from "./data";
import FileList from "./FileList";
import { useEffect, useState } from "react";
import  MyDropZone  from "./DropZone";

export default function AdvancedDropzoneDemo() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const scrollToDropZone = () => {
    console.log('Scrolling to DropZone');
    const dropZone = document.getElementById('dropzone');
    if (dropZone) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // TODO: Call the search API

    // TODO: Update the files state with the search results
    setFiles(searchedFileMetadata);

    // Scroll to the FileList section
    const fileList = document.getElementById('filelist');
    if (fileList) {
      window.scrollTo({ top: fileList.offsetTop, behavior: 'smooth' });
    }

    // Clear the search input
    setSearchQuery('');

  }

  const appendUploadedFile = (file) => {
    console.log('Appending uploaded file:', file);
    const newFile = {
      id: (files.length + 1).toString(),
      name: file.name,
      size: file.size,
      type: file.type
    };
    setFiles([...files, newFile]);
  }


  return (
    <>
      <nav className="bg-primary m-0 p-4 text-white flex justify-between items-center fixed top-0 w-full z-40 shadow-light">
        <span className="text-xl text-gray-100">
          File Storage System
        </span>

        <div className="space-x-4">
          {/* Add upload button that directs to the DropZone section in the page */}
          <button
            className="bg-secondaryLightGreen hover:bg-secondaryLightPurple text-white font-regular py-1 px-2 rounded"
            onClick={scrollToDropZone}
          >
            Upload
          </button>
          {/*input for search */}
          <input
            type="text"
            placeholder="Search for files..."
            className={`p-1 border-2 rounded-md w-96 text-black hover:border-secondaryLightGreen focus:outline-none`}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {/* Add a search button */}
          <button
            className="bg-secondaryLightGreen hover:bg-secondaryLightPurple text-white font-regular py-1 px-2 rounded"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </button>
        </div>
      </nav>

      <main className="p-24 mt-4 bg-primary-dark w-full m-auto">
        <div className="flex justify-center items-center m-12 bg-primary p-10 rounded-lg" id="dropzone">
          <MyDropZone appendUploadedFile={appendUploadedFile} />
        </div>

        <div className="m-12">
          <span className="text-2xl font-semibold text-gray-100" id="filelist">
            Your Files
          </span>
          <div className="flex justify-center items-center bg-primary rounded-lg mt-10 pb-5">
            <FileList files={files} />
          </div>
        </div>
      </main>
    </>
  );
}
