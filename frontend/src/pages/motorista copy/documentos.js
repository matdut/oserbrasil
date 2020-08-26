import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import api from '../../services/api';
import './documentos.css';

//FOTO
import filesize from "filesize";
import Upload from "../UploadDocumentos";
import FileList from "../FilelistDocumento";
import { Container, Content } from "../style";

const andamento_cadastro = localStorage.getItem('logprogress');     
//const cep_empresa = localStorage.getItem('logcep');     
//const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      uploadedCNH: [],
      uploadedCRVL: [],
      perfillog: null,
      validate: {         
        carroState: '',          
        modeloState: '',          
        corState: '',     
        placaState: '',     
        anoState: '',     
        apoliceState: '',     
        seguroState: '', 
        incluir_foto: false,    
      }    
    }       
    this.verificar_menu = this.verificar_menu.bind(this);      
  }

  componentDidMount(){      

    console.log('ENTROU AQUI ')

    let userId = this.props.match.params.id;

    this.setState({      
      perfillog: localStorage.getItem('logperfil')
    });  

    this.setState({      
      progresso: 65
    });  

    if (userId !== 0) {
      localStorage.setItem('logid', userId);
    }
    
  
    this.carrega_motorista()
  
  }

  carrega_motorista() {
    
    const { validate } = this.state

    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log('busca motorista - '+JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {
           
          this.setState({             
            campNome: res.data.data[0].nome, 
            inicio: 2
          })                      

          const uploadedCNH = res.data.data.map(file => ({         
            file: ({
               path: file.foto_CNH_name
            }),  
            id: file.id,
            name: file.foto_CNH_name,
            readableSize: filesize(file.foto_CNH_size),
            progress: 0,
            preview: file.foto_CNH_url,
            uploaded: false,
            url: file.foto_CNH_url,
            error: false
          }));        

          const uploadedCRVL = res.data.data.map(file => ({         
            file: ({
               path: file.foto_CRVL_name
            }),  
            id: file.id,
            name: file.foto_CRVL_name,
            readableSize: filesize(file.foto_CRVL_size),
            progress: 0,
            preview: file.foto_CRVL_url,
            uploaded: false,
            url: file.foto_CRVL_url,
            error: false
          }));        
        
          this.setState({
            //uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
            uploadedCNH: uploadedCNH,
            uploadedCRVL: uploadedCRVL
          });
  
  
          this.setState({ validate })     

        }
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
  }
 

verifica_botao(inicio) {
   // console.log(JSON.stringify(this.state, null, "    "));
   // console.log(JSON.stringify(inicio, null, "    "));
   if (localStorage.getItem('logperfil') == 0) {
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
            </Box>           
        );   
      } else {
    
          //  console.log(JSON.stringify(' validacao campo ', null, "    "));
            if (this.state.uploadedCNH.length > 0 && this.state.uploadedCRVL.length > 0) {

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_foto_habilitado" p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Próximo </label>
                </div>     
                </Box>           
              );         
        }          
      }
    } else if (localStorage.getItem('logperfil') == 1) {
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
      } else {
    
          //  console.log(JSON.stringify(' validacao campo ', null, "    "));
            if (this.state.uploadedCNH.length > 0 && this.state.uploadedCRVL.length > 0) {

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_foto_habilitado" p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
                </Box>           
              );         
        }          
      }

    } else if (localStorage.getItem('logperfil') == 3) {
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
      } else {
    
          //  console.log(JSON.stringify(' validacao campo ', null, "    "));
            if (this.state.uploadedCNH.length > 0 && this.state.uploadedCRVL.length > 0) {

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_foto_habilitado" p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
                </Box>           
              );         
        }          
      }
    }     
  }  

sendUpdate(){        
     
   if (this.state.incluir_foto == true) {
       const formData = new FormData();              
       
       console.log(JSON.stringify(this.state.uploadedCNH[0].file, null, "    ")); 
       console.log(JSON.stringify(this.state.uploadedCRVL[0].file, null, "    ")); 

        formData.append("file", this.state.uploadedCNH[0].file)         
        formData.append('id', localStorage.getItem('logid'));     

        api.put(`/motorista/documentoCNH/update/${localStorage.getItem('logid')}`, formData)
        .then(response=>{
          console.log(JSON.stringify(response.data, null, "    ")); 

          if (response.data.success==true) {                       
              const formData = new FormData();  

              formData.append("file", this.state.uploadedCRVL[0].file)                   
              formData.append('id', localStorage.getItem('logid'));     

              api.put(`/motorista/documentoCRVL/update/${localStorage.getItem('logid')}`, formData)
                .then(response=>{
                  console.log(JSON.stringify(response.data, null, "    ")); 
  
                  if (response.data.success==true) {       
                    
                    if (localStorage.getItem('logperfil') == 1) {
                      this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));
                    } else if (localStorage.getItem('logperfil') == 3) {
                      this.props.history.push(`/area_motorista`);                   
                    } else if (localStorage.getItem('logperfil') == 0) {
                      this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));
                    }    
          
                  }
                  else {
                    alert("Error conexão ")              
                  }
                }).catch(error=>{
                  alert("Error conxao crvl ")
                })            
           
          }
          else {
            alert("Error conexão CNH ")              
          }
        }).catch(error=>{
          alert("Error 34 ")          
        }) 
    } else {

      if (localStorage.getItem('logperfil') == 1) {
        this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));                    
      } else if (localStorage.getItem('logperfil') == 3) {
        this.props.history.push(`/area_motorista`);                   
      } else if (localStorage.getItem('logperfil') == 0) {
        this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));                    
      }    
      
    }     
}  

handleUploadCNH = files => {  
  
  //console.log(JSON.stringify(' uplodfiles - '+data, null, "    "));   
  const uploadedCNH = files.map(file => ({
    file,
    //id: uniqueId(),
    name: file.name,
    originalname: file.originalname,
    readableSize: filesize(file.size),
    preview: URL.createObjectURL(file),
    progress: 0,
    uploaded: false,
    error: false,
    url: file.url
  })); 
   
  this.setState({    
    uploadedCNH: uploadedCNH,
    incluir_foto: true
  });

 // uploadedFiles.forEach(this.processUpload);
}

handleUploadCRVL = files => {  
  
  //console.log(JSON.stringify(' uplodfiles - '+data, null, "    "));   
  const uploadedCRVL = files.map(file => ({
    file,
    //id: uniqueId(),
    name: file.name,
    originalname: file.originalname,
    readableSize: filesize(file.size),
    preview: URL.createObjectURL(file),
    progress: 0,
    uploaded: false,
    error: false,
    url: file.url
  }));
 
   
  this.setState({    
    uploadedCRVL: uploadedCRVL,
    incluir_foto: true
  });

 // uploadedFiles.forEach(this.processUpload);
}

verificar_menu(){
  if (localStorage.getItem('logperfil') == 0) {  
    return(
      <div>
          <div className="d-flex justify-content-around">             
               <div className="botao_navegacao">
                 <Link to={`/veiculo_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     <label> faça o upload dos seus documentos. </label>                        
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                            
                  </div>   
               </div>   
             
          </div>              
          <div>
                <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>
     </div>    
    );

  } else if (localStorage.getItem('logperfil') == 1) { 
    return(
      <div>
          <div className="d-flex justify-content-around">             
               <div className="botao_navegacao">
                 <Link to={`/veiculo_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     <label> faça o upload dos seus documentos. </label>                        
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                            
                  </div>   
               </div>   
             
          </div>              
          <div>
                <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>
     </div>    
    );
  } else if (localStorage.getItem('logperfil') == 3) { 
    return(
      <div>
          <div className="d-flex justify-content-around">             
               <div className="botao_navegacao">
                 <Link to={`/veiculo_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     <label> faça o upload dos seus documentos. </label>                        
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                            
                  </div>   
               </div>   
             
          </div>              
          <div>
                <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>
     </div>    
    );
  }  
}

render(){  
  const { uploadedCNH } = this.state;
  const { uploadedCRVL } = this.state;
return (
<div>    
<div className="d-flex justify-content">
  <div className="d-flex justify-content-start"> 
      <div className="area_direita">   
          <div>   
            <img className="titulo_logo" src="../logo.png"/>
         </div>      
      </div>    
   </div>
   <div className="area_esquerda">      
       {this.verificar_menu()}   
          
          <div className="d-flex flex-column">              
              <div class="p-2">               
              <Grid container spacing={2}>
                  <Grid item xs>
                    <Paper className="grid1">
                       <div>
                        <div className="titulocnh"><stronger>CNH </stronger></div>                      
                        <div className="descricaocnh">Carteira Nacional de Habilitação</div>
                        <Container>                            
                            <Content>
                              <Upload onUpload={this.handleUploadCNH} />
                                {!!uploadedCNH.length && (
                                  <FileList files={uploadedCNH} />
                                )}
                            </Content>                
                          </Container>    
                        </div> 
                    </Paper>
                  </Grid>
                  <Grid item xs>
                    <Paper className="grid2">
                      <div>                       
                        <div className="titulocrvl"><stronger>CRVL</stronger></div>
                        <div className="descricaocrvl">Certificado de Registro e Licenciamento do Veículo</div>
                        <Container>                         
                            <Content>
                              <Upload onUpload={this.handleUploadCRVL} />
                                {!!uploadedCRVL.length && (
                                  <FileList files={uploadedCRVL} />
                                )}
                            </Content>                
                          </Container>    
                        </div>     
                    </Paper>
                  </Grid>        
                </Grid>                  
               </div>                    
            </div>       
            {this.verifica_botao(this.state.inicio)}                                       
    </div>                 
   </div>  
</div> 
  );
} 
}
export default empresarialComponent;