import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import api from '../../../services/api';
import './veiculo.css';
//FOTO
import filesize from "filesize";
import Upload from "../../UploadDocumentos";
import FileList from "../../FilelistDocumento";
import { Container, Content } from "../../style";

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
      foto_incluida_2: false,      
      incluir_foto_2: false,    
      mensagem_foto2: '',
      foto1State: '',          
      foto2State: ''                        
    }       
    this.verificar_menu = this.verificar_menu.bind(this);      
  }

  componentDidMount(){      

    console.log('ENTROU AQUI ')

    let userId = this.props.match.params.id;

    this.setState({      
      perfillog: localStorage.getItem('logperfil'),
      incluir_foto_2: false,   
      progresso: 90 
    });  

    this.setState({      
      progresso: 65
    });  

    if (userId !== 0) {
      localStorage.setItem('logdocumento', userId);
    }   
  
    this.carrega_doc_veiculo()
  
  }
 
 
 carrega_doc_veiculo() { 
  api.get(`/veiculo/get/${localStorage.getItem('logVeiculo')}`)
  .then(res=>{        

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
          uploadedCRVL: uploadedCRVL,
          foto2State: 'has-success'
        });             
         
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
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_doc_foto"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
            </Box>           
        );   
      } else {
          //console.log(JSON.stringify(this.state, null, "    "));
          //  console.log(JSON.stringify(' validacao campo ', null, "    "));
            if (this.state.foto1State == 'has-success' && this.state.foto2State == 'has-success') {

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_doc_foto_habilitado" p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Próximo </label>
                </div>     
                </Box>           
              );         
          } else {
            return (
    
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_doc_foto"  p={2}>
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
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_doc_foto"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
      } else {          
          //  console.log(JSON.stringify(' validacao campo ', null, "    "));
          if (this.state.foto2State == 'has-success') {

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_foto_habilitado" p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
                </Box>           
              );         
        }  else {
          return (
  
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_doc_foto"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Próximo </label>
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
          
          if (this.state.foto2State == 'has-success') {

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_foto_habilitado" p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
                </Box>           
              );         
        }  else {
          return (
  
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_doc_foto"  p={2}>
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
  console.log('sendupdate - '+JSON.stringify(this.state, null, "    ")); 

   
    if (this.state.incluir_foto_2 == false) {
              const formData = new FormData();  

              formData.append("file", this.state.uploadedCRVL[0].file)                   
              formData.append('id', localStorage.getItem('logid'));     

              api.put(`/veiculo/documentoCRVL/update/${localStorage.getItem('logdocumento')}`, formData)
                .then(response=>{
                  console.log(JSON.stringify(response.data, null, "    ")); 
  
                  if (response.data.success==true) {                          
                    this.setState({                          
                      foto_incluida_2: true
                    });
                    
                  }
                  else {
                    alert("Error conexão ")              
                  }
                }).catch(error=>{
                  alert("Error conxao crvl ")
                })          
           
      }     

      if (localStorage.getItem('logperfil') == 1) {
        this.props.history.push(`/lista_veiculos/`+localStorage.getItem('logid'));
      } else if (localStorage.getItem('logperfil') == 3) {
        this.props.history.push(`/lista_veiculos/`+localStorage.getItem('logid'));                  
      }            
}

handleUploadCRVL = files => {  
   console.log(JSON.stringify(' files - '+files[0].size, null, "    "));   
  //console.log(JSON.stringify(' uplodfiles - '+data, null, "    "));   

  if (files[0].size <= 2047335) {
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
      incluir_foto_2: true,
      foto2State: 'has-success',
      mensagem_foto2: ''
    });
    this.verifica_botao(2)

  } else {
    this.setState({    
      foto2State: '',
      incluir_foto_2: false,
      mensagem_foto2: 'Foto muito grande, favor adicionar outra '
    });
    this.verifica_botao(2)
  } 
 
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
            
                  </div>   
               </div>   
          <div>
         
          </div> 
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
            
              </div>   
           </div>   
         
      </div>              
      <div>
         
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
              <Grid container spacing={1}>
                  <Grid item xs>
                    <Paper className="grid1">
                       <div className="titulocrvl">CRVL 1</div>
                        <div className="descricaocrvl">Certificado de Registro e Licenciamento do Veí­culo</div>
                        <Container>                            
                            <Content>
                              <Upload onUpload={this.handleUploadCRVL} />
                                {!!uploadedCRVL.length && (
                                  <FileList files={uploadedCRVL} />
                                )}  
                            </Content>                
                          </Container>    
                    </Paper>
                    <Box bgcolor="text.disabled" color="background.paper" className="mensagem_foto"  p={2}>
                              <div className="d-flex justify-content-left">
                              <label> {this.state.mensagem_foto2} </label>
                             </div>     
                    </Box>    
                  </Grid>
               </Grid>   
                    
               </div>   
               <div className="d-flex flex-column">               
                  <div className="p-2 titulocnh"> 
                    <Grid container spacing={2}>
                      <Grid item xs>
                           <Paper className="grid4">
                          <strong> Requisitos de formato: </strong><br/>
                                tamanho mínimo da imagem: 300x100 pixeis;
                                formatos aceitáveis: JPG, JPEG, PNG;
                                tamanho do arquivo não deve exceder 2 MB. 
                           </Paper> 
                      </Grid>
                    </Grid>                  
                  </div>
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