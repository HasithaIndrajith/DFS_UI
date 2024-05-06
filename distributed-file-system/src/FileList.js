
import { FileCard } from '@files-ui/react';
import axios from 'axios';
import { useState } from 'react';
// import TamperedModal from './TamperedModal';  
// import { toast, ToastContainer } from 'react-toastify';

export default function FileList({ files }) {
  // const [showModal, setShowModal] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [downloadingFileName, setDownloadingFileName] = useState('');

  // const handleTamperedContent = (fileName: string) => {
  //   console.log(`Content of the file ${fileName} has been tampered with`);
  //   console.log('No content found');
  //   console.log('Modal for confirmation');
  //   setShowModal(true);
  // };

  const handleDownloadedContent = (data, fileName) => {
    console.log('Download the file to user\'s device');
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    setDownloadingFileName('');
  }

  // const handleTamperedDownload = async (allowTampered, fileName) => {
  //   setShowModal(false);
  //   if (allowTampered) {
  //     console.log('Download the tampered file');
  //     const response = await axios({
  //       responseType: 'blob',
  //       url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/retrieve?fileName=${fileName}&allowTampered=true`,
  //     })
  //     // check status code, if status code is no_content, then content was not able to be retrieved at the server
  //     if (response.status === 204) {
  //       console.log('No content found');
  //       toast.error('Download failed. File is corrupted.');
  //       return;
  //     }
  //     // if status code is 200, then content is available even if tampered, download the file
  //     else {
  //       handleDownloadedContent(response.data, fileName);
  //     }
  //   } else {
  //     console.log('Do not download the file');
  //   }
  //   setDownloadingFileName('');
  // }

  const handleDownload = async (fileName) => {
    console.log("Download file", fileName);
    // setDownloadingFileName(fileName);
    // eslint-disable-next-line no-unused-vars
    const response = await axios({
      responseType: 'blob',
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/retrieve?fileName=${fileName}`,
    })


    
    // check status code, if status code is no_content, then content has been tampered with
    
    
    if (response.status === 204) {
      // handleTamperedContent(fileName);
      return;
    }

    
    // if status code is 200, then content is authentic, download the file 
    else {
      console.log('File is authentic');
      handleDownloadedContent(response.data, fileName);
    }



  };

  const handleDelete = async (fileName) => {
    console.log("Delete file", fileName);
    const response = await axios({
      method: 'delete',
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/server/delete?fileName=${fileName}`,
    })
    if (response.status === 200) {
      console.log('File deleted successfully');
    }
  };

  return (
    <>
    {/* <ToastContainer /> */}
    <div className="flex flex-wrap mt-4 align-left justify-left">
      {files.map((file) => (
        <div className="mr-12 m-4" key={file.id}>
          <FileCard 
          {...file} 
          darkMode={true}
          onDownload={() => {
            handleDownload(file.name);
          }}
          onDelete={() => {
            handleDelete(file.name);
          }}
          />
        </div>
      ))}
    </div>
    {/* <TamperedModal open={showModal} handleClose={(allowTampered) => {
      handleTamperedDownload(allowTampered, downloadingFileName);
      }} /> */}
    </>
  );
}
