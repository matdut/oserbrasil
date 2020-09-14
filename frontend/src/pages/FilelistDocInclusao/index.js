import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";

const FileList = ({ files, onDelete }) => (
  <Container>   
  {files.map(uploadedFile => (
    <li key={uploadedFile.id}>
      <FileInfo>  
      <a
            href={uploadedFile.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Preview src={uploadedFile.preview} />               
        </a>                   
      </FileInfo>
      <div>       

        {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
        {uploadedFile.error && <MdError size={24} color="#e57878" />}
      </div>        
    </li>
  ))}
</Container>
);

export default FileList;