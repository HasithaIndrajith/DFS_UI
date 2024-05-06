export const sampleFileMetadata = [
  {
    id: '0',
    size: 1000,
    type: 'text/plain',
    name: 'sample.txt'
  },
  {
    id: '1',
    size: 2000,
    type: 'image/png',
    name: 'sample.png'
  },
  {
    id: '2',
    size: 3000,
    type: 'application/pdf',
    name: 'sample.pdf'
  },
  // add 15 more files
  {
    id: '3',
    size: 4000,
    type: 'text/plain',
    name: 'sample2.txt'
  },
  {
    id: '4',
    size: 5000,
    type: 'image/png',
    name: 'sample2.png'
  },
  {
    id: '5',
    size: 6000,
    type: 'application/pdf',
    name: 'sample2.pdf'
  },
  {
    id: '6',
    size: 7000,
    type: 'text/plain',
    name: 'sample3.txt'
  },
  {
    id: '7',
    size: 8000,
    type: 'image/png',
    name: 'sample3.png'
  },
  {
    id: '8',
    size: 9000,
    type: 'application/pdf',
    name: 'sample3.pdf'
  },
  {
    id: '9',
    size: 10000,
    type: 'text/plain',
    name: 'sample4.txt'
  },
  {
    id: '10',
    size: 11000,
    type: 'image/png',
    name: 'sample4.png'
  },
  {
    id: '11',
    size: 12000,
    type: 'application/pdf',
    name: 'sample4.pdf'
  },
  {
    id: '12',
    size: 13000,
    type: 'text/plain',
    name: 'sample5.txt'
  },
  {
    id: '13',
    size: 14000,
    type: 'image/png',
    name: 'sample5.png'
  },
  {
    id: '14',
    size: 15000,
    type: 'application/pdf',
    name: 'sample5.pdf'
  }
];
export const searchedFileMetadata = [
  // select random files from sampleFileMetadata
  sampleFileMetadata[0],
  sampleFileMetadata[5],
  sampleFileMetadata[6],
  sampleFileMetadata[9],
  ...sampleFileMetadata.slice(1, 15),
];
