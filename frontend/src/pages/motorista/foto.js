import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

//FOTO
import filesize from "filesize";
import Upload from "../Upload";
import FileList from "../Filelist";
import { Container, Content } from "../style";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
///

import api from '../../services/api';
import './foto.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
//const cep_empresa = localStorage.getItem('logcep');     
//const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campFoto: "",
      campNome: "",
      uploadedFilesFoto: [],      
      inicio: 1,
      mensagem_foto: '',     
      perfillog: false,
      incluir_foto: false,   
      fotoState: ''
    }
    this.verificar_menu = this.verificar_menu.bind(this);      
    this.verifica_nome_motorista = this.verifica_nome_motorista.bind(this);

  }

  componentDidMount(){  

    let userId = this.props.match.params.id;

    if (userId !== 0) {
      localStorage.setItem('logid', userId);
    }

    this.setState({           
      perfillog: localStorage.getItem('logperfil'),
      fotoState: ''
    }); 
    
    this.setState({      
      progresso: 85
    });    

    this.carrega_motorista()     
    
  }

  carrega_motorista() {
    //console.log('ENTROU AQUI busca_cep_banco')
    const { validate } = this.state

    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log('busca motorista - '+JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {

          const uploadedFilesFoto = res.data.data.map(file => ({         
            file: ({
               path: file.foto_name
            }),  
            id: file.id,
            name: file.foto_name,
            readableSize: filesize(file.foto_size),            
            preview: file.foto_url,
            uploaded: false,
            url: file.foto_url,
            error: false            
          }));             
           
          this.setState({             
            campNome: res.data.data[0].nome,       
            uploadedFilesFoto: uploadedFilesFoto
          })          
          
          if (res.data.data[0].foto_name !== null) {
            this.setState({             
               fotoState: 'has-success',               
               inicio: 2
            })                     
          }
  
          this.setState({ validate })     

        } 

      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
  }

  verifica_nome_motorista(nome){
    let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = nome
    }
    return(    
          nome_titulo          
       );  
  } 

verifica_botao(inicio) {
   // console.log(JSON.stringify(this.state, null, "    "));
    console.log(JSON.stringify(inicio, null, "    "));
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

        if (this.state.fotoState == 'has-success') { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                      <div className="d-flex justify-content-center">
                      <label> Próximo</label>
                      </div>     
                </Box>           
            );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
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
        if (this.state.fotoState == 'has-success') { 
            return (
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                      <div className="d-flex justify-content-center">
                      <label> Salvar Alterações </label>
                      </div>     
                </Box>           
            );   
       } else {
        return (
      
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
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
        if (this.state.fotoState == 'has-success') { 
          return (
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                    </div>     
              </Box>           
          );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
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

        console.log(JSON.stringify(this.state.uploadedFilesFoto[0].file, null, "    ")); 

        formData.append("file", this.state.uploadedFilesFoto[0].file)                   
        formData.append('id', localStorage.getItem('logid'));     

        console.log(JSON.stringify(formData, null, "    "));        
        api.put(`/motorista/foto/update/${localStorage.getItem('logid')}`, formData)
        .then(response=>{
          console.log(JSON.stringify(response.data, null, "    ")); 
          
          if (response.data.success==true) {                       

            if (localStorage.getItem('logperfil') == 1) {
              this.props.history.push(`/senha_motorista/`+localStorage.getItem('logid'));                    
            } else if (localStorage.getItem('logperfil') == 3) {
              this.props.history.push(`/area_motorista`);                   
            } else if (localStorage.getItem('logperfil') == 0) {
              this.props.history.push(`/senha_motorista/`+localStorage.getItem('logid'));                    
            }            
  
          }
          else {
            alert("Error conexão ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
   } else {
    if (localStorage.getItem('logperfil') == 1) {
      this.props.history.push(`/senha_motorista/`+localStorage.getItem('logid'));                    
    } else if (localStorage.getItem('logperfil') == 3) {
      this.props.history.push(`/area_motorista`);                   
    } else if (localStorage.getItem('logperfil') == 0) {
      this.props.history.push(`/senha_motorista/`+localStorage.getItem('logid'));                    
    }            
    
   }   
}

handleUpload = files => {  

  if (files[0].size <= 2047335) {  
    //console.log(JSON.stringify(' uplodfiles - '+data, null, "    "));   
    const uploadedFilesFoto = files.map(file => ({
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
      //uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
      uploadedFilesFoto: uploadedFilesFoto,
      fotoState: 'has-success',
      incluir_foto: true,
      inicio: 2,
      mensagem_foto: ''
    });    

  } else {
    this.setState({    
      fotoState: '',
      incluir_foto: false,
      inicio: 1,
      mensagem_foto: 'Foto muito grande, favor adicionar outra '
    });    
  }  

 // uploadedFiles.forEach(this.processUpload);
}

verificar_menu(){
  if (localStorage.getItem('logperfil') == 0) {  
    return(
      <div>
      <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={`/documentos_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                      {this.verifica_nome_motorista(this.state.campNome)}, que tal adicionar uma foto ao seu perfil?       
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
                 <Link to={`/documentos_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                    Que tal adicionar uma foto ao seu perfil?       
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
                 <Link to="/area_motorista"> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     {this.verifica_nome_motorista(this.state.campNome)}, altere sua foto                             
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">                                      
                  </div>   
               </div>   
             
          </div>                       
     </div>     
    );
  }  
}
render(){  
  const { uploadedFilesFoto } = this.state;
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
          <div class="d-flex flex-column espacamento_caixa_texto">              
              <div class="p-2">         
              <Grid container spacing={1}>
                  <Grid item xs>
                    <Paper className="foto_motorista">
                        <Container>                            
                            <Content>
                              <Upload onUpload={this.handleUpload} />
                                {!!uploadedFilesFoto.length && (
                                  <FileList files={uploadedFilesFoto} />
                                )}
                            </Content>                
                          </Container>    
                    </Paper>
                    <Box bgcolor="text.disabled" color="background.paper" className="mensagem_foto"  p={2}>
                              <div className="d-flex justify-content-left">
                              <label> {this.state.mensagem_foto} </label>
                             </div>     
                    </Box>    
                  </Grid>
               </Grid>    
               <div className="d-flex flex-column">               
                  <div className="p-2 titulocnh"> 
                    <Grid container spacing={2}>
                      <Grid item xs>
                           <Paper className="grid3">
                          <strong> Requisitos de formato: </strong><br/>
                                tamanho mínimo da imagem: 300x100 pixeis;<br/>
                                formatos aceitáveis: JPG, JPEG, PNG;<br/>
                                tamanho do arquivo não deve exceder 2 MB. 
                           </Paper> 
                      </Grid>
                    </Grid>                  
                  </div>
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