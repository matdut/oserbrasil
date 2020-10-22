import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgressbar from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import Avatar from '@material-ui/core/Avatar';
import { Container, FileInfo, Preview } from "./styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));


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
             <Preview src={uploadedFile.preview} className="foto_borda" />                    
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