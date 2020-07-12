import React from 'react';
import api from '../services/api';

class Image_upload extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }     
   
    }
 
    fileChangedHandler = (event) => {
       this.setState({ selectedFile: event.target.files[0] })
    }

    uploadHandler = () => {
       const formData = new FormData()
        formData.append(
            'file',
            this.state.selectedFile,
            this.state.selectedFile.name
        )
        api.post('/file/posts', formData)
    }
      
    render() {
        return (
          <div>
            <input type="file" onChange={this.fileChangedHandler}/>
                  <button onClick={this.uploadHandler}>Upload!</button>
         </div> 
        );
    }
}
export default Image_upload;