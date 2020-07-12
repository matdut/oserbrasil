import React from "react";
import CircularProgressbar from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";

const FileList = ({ files, onDelete }) => (
  <Container>   
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>         
          <Preview src={uploadedFile.preview} />            
        </FileInfo>        
      </li>
    ))}
  </Container>
);

export default FileList;