import React, { useState } from 'react';
import './FileUpload.css';

type FileUploadProps = {
  question: string;
};

const FileUpload: React.FC<FileUploadProps> = ({ question }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="file-upload">
      <p>{question}</p>
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default FileUpload;