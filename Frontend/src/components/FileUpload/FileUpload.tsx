import React, { useState } from 'react';
import './FileUpload.css';
import { useFormContext } from '../../context/FormContext';

type FileUploadProps = {
  question: string;
  questionId:string;
};

const FileUpload: React.FC<FileUploadProps> = ({ question ,questionId }) => {
  const [_selectedFile, setSelectedFile] = useState<File | null>(null);
  const { formData, setFormData } = useFormContext();
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
      setFormData({ fileupload: { ...formData.fileupload, [questionId]: event.target.files[0] } });
    
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