import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Menu_motorista from './menu_motorista';
import Menu_administrador from '../administrador/menu_administrador';
import Resizer from 'react-image-file-resizer';
import Typography from '@material-ui/core/Typography';
import ReactModal from 'react-modal';
import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import api from '../../services/api';
import './documentos.css';

//FOTO
import filesize from "filesize";
import Upload from "../UploadDocumentos";
import FileList from "../FilelistDocumento";
//import Upload from "../Upload";
//import FileList from "../Filelist";
import { Container, Content } from "../style";

const andamento_cadastro = localStorage.getItem('logprogress');     
//const cep_empresa = localStorage.getItem('logcep');     
//const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');
const resizeFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
  uri => {
    resolve(uri);
  },
  'base64'
  );
});

const FotoStyles = {
  overlay: {    
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: '85%',
    //backgroundColor: 'rgba(255, 255, 255, 0.75)'
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  content : {
    top                    : '10px',
    left                   : '36%',    
    right                  : '50%',
    bottom                 : '80px',  
    height                 : '60%',    
    width                  : '350px',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',   
    border: '1px solid #ccc',   
  }
};

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      uploadedCNH: [],
      uploadedCRVL: [],
      foto: '',
      perfillog: null,
      camp_foto_CNH_url: '',
      foto_incluida_1: false,     
      incluir_foto_1: false,          
      mensagem_foto1: '',     
      foto1State: '',                                  
    }       
    this.verificar_menu = this.verificar_menu.bind(this);      
  }

  componentDidMount(){      

    //console.log('ENTROU AQUI ')

    let userId = this.props.match.params.id;

    this.setState({      
      perfillog: localStorage.getItem('logperfil'),
      incluir_foto_1: false,     
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
    

    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        //console.log('busca motorista - '+JSON.stringify(res.data, null, "    ")); 
        if (res.data.success == true) {
           
          this.setState({             
            campNome: res.data.data[0].nome, 
            camp_foto_CNH_url: res.data.data[0].foto_CNH_url,
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
          
          this.setState({                   
            uploadedCNH: uploadedCNH,            
            foto1State: 'has-success'
          });           

        }
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })            

  }
 
  verificar_menu_lateral() {

    if (localStorage.getItem('logperfil') == 1) {
     return( 
       <Menu_administrador />     
     );
    } else if (localStorage.getItem('logperfil') == 3) {
     return( 
       <Menu_motorista />     
     );
    }
  
  }
 
verifica_botao(inicio) {
   // console.log(JSON.stringify(this.state, null, "    "));
   // console.log(JSON.stringify(inicio, null, "    "));
   if (inicio == 1) {
    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
              <div className="d-flex justify-content-center">
              <label> Salvar Alterações </label>
              </div>     
        </Box>           
    );   
  } else {
      //console.log(JSON.stringify(this.state, null, "    "));
      //  console.log(JSON.stringify(' validacao campo ', null, "    "));
        if (this.state.foto1State == 'has-success') {

          return (
            <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados" p={2} onClick={()=>this.sendUpdate()}>
            <div className="d-flex justify-content-center">
            <label> Salvar Alterações </label>
            </div>     
            </Box>           
          );         
      } else {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
      }         
  }  
  }  
  onChange = async (file) => { 
    const image = await resizeFile(file);
    return image;
  }
  getBase64(file, success) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      debugger;
      success( reader.result );
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  async sendUpdate(){        
  //console.log('sendupdate - '+JSON.stringify(this.state, null, "    ")); 

   if (this.state.incluir_foto_1 == true) {

     //  const formData = new FormData();              
     const file = this.state.uploadedCNH[0].file;
       // formData.append("file", this.state.uploadedCNH[0].file)         
       // formData.append('id', localStorage.getItem('logid'));     
   
         const formData = {
          foto_url: await this.onChange(file),
           name: this.state.uploadedCNH[0].name
         }

         
          api.put(`/motorista/documentoCNH/update/${localStorage.getItem('logid')}`, formData)
          .then(response=>{
           // console.log(JSON.stringify(response.data, null, "    ")); 

                if (response.data.success==true) {                         
                  this.setState({                          
                    foto_incluida_1: true
                  });
                }
                else {
                  alert("Error conexão CNH ")              
                }     
          }).catch(error=>{
            alert("Error conxao CNH ")          
          })      
    } 

      if (localStorage.getItem('logperfil') == 1) {
        this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));
      } else if (localStorage.getItem('logperfil') == 3) {
        this.props.history.push(`/area_motorista`);                   
      } else if (localStorage.getItem('logperfil') == 0) {
        this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));
      }          
    /*  
    if (this.state.foto_incluida_1 == true && this.state.foto_incluida_2 == true) {

      if (localStorage.getItem('logperfil') == 1) {
        this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));
      } else if (localStorage.getItem('logperfil') == 3) {
        this.props.history.push(`/area_motorista`);                   
      } else if (localStorage.getItem('logperfil') == 0) {
        this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));
      }          
      
    }  else {

      if (localStorage.getItem('logperfil') == 1) {
        this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));
      } else if (localStorage.getItem('logperfil') == 3) {
        this.props.history.push(`/area_motorista`);                   
      } else if (localStorage.getItem('logperfil') == 0) {
        this.props.history.push(`/foto_motorista/`+localStorage.getItem('logid'));
       }       
    }     */  
}  

handleUploadCNH = files => {  
  console.log(JSON.stringify(' files - '+files[0].size, null, "    "));   

 // if (files[0].size <= 2047335) {
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
        camp_foto_CNH_url: uploadedCNH[0].preview,
        incluir_foto_1: true,
        foto1State: 'has-success',
        mensagem_foto1: ''
      });  
      this.verifica_botao(2);
 //}
 
 /*else {  
    this.setState({        
      incluir_foto_1: false,
      foto1State: '', 
      mensagem_foto1: 'Foto muito grande, favor adicionar outra '
    });  
    this.verifica_botao(2);
 } */  

 // uploadedFiles.forEach(this.processUpload);
}

verificar_menu(){

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
verifica_titulo() {
  if ( this.state.perfil == 1) {
    return (            
      'ADMINISTRADOR' 
     ); 
  } else {
    return (      
      localStorage.getItem('lognome')
     ); 
  }            
}

verifica_horario(){
  const d = new Date();
  const hour = d.getHours();

  if (hour < 5) {
    return (
      'boa noite'
      );        
  } else if (hour < 5) { 
    return (
      'bom dia' 
      );        
  } else if (hour < 8) { 
    return (
      'bom dia'          
      );        
  } else if (hour < 12) { 
    return (
      'bom dia'          
      );        
  } else if (hour < 18) { 
    return (
      'boa tarde'          
      );        
  } else { 
    return (
       'boa noite'          
      );        
  }
}

handleOpenModalFoto(data) { 
  this.setState({      
    showModalFoto: true,    
    foto: data,  
  });      

  //  console.log('url '+data);
    
}

handleCloseModalFoto  () {
  this.setState({       
    showModalFoto: false,
    foto: ''
  });    
 
}

render(){  
  const { uploadedCNH } = this.state; 
  
return (
<div>    
<div>
 {this.verificar_menu_lateral()}
<div> 
    <div>     
    <div className="container-fluid titulo_lista margem_left">                   
           <div className="unnamed-character-style-4 descricao_admministrador">                                
              <div className="titulo_bemvindo"> {this.verifica_titulo()}, {this.verifica_horario()} ! </div>           
            </div>                
            
              <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '42vh', width: '42vh' }} />
              </Container>

              <br/>
              <br/>
              <br/>
          </div> 

            <div class="d-flex flex-column espacamento_caixa_texto">                       
                <div class="p-2">           
                <Grid item xs>
                <Paper className="documento_motorista_cnh">
                       <div>
                        <div className="titulocnh"><stronger>CNH </stronger></div>                      
                        <div className="descricaocnh">Carteira Nacional de Habilitação</div>                      
                        <Container>   
                   
                                <div class="d-flex justify-content-start">
                                   <div>
                                   <Content>
                                      <img src={this.state.camp_foto_CNH_url} variant="circle" 
                                         className="foto_modal_motorista" onClick={()=>this.handleOpenModalFoto(this.state.camp_foto_CNH_url)} />                                                        
                                    </Content>   
                                   </div>
                                   <div>
                                     <Content>
                                         <Upload onUpload={this.handleUploadCNH} />                                       
                                    </Content>                                            
                                   </div>
                                 </div>    
                           </Container>                                
                            <Box bgcolor="text.disabled" color="background.paper" className="mensagem_foto1"  p={2}>
                            <div className="d-flex justify-content-center">
                            <label> {this.state.mensagem_foto1} </label>
                            </div>     
                          </Box>                          
                        </div> 
                    </Paper>
                  </Grid>   

                    <ReactModal 
                        isOpen={this.state.showModalFoto}
                        style={FotoStyles}
                        contentLabel="Inline Styles Modal Example"                                  
                        ><div className="editar_titulo_inclusao"> Foto / Documentos
                            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalFoto()} className="botao_close_modal_foto_doc">
                              <CloseOutlinedIcon />
                            </IconButton></div>       
                            <div className="container_alterado">
                              <div className="d-flex justify-content">        
                                <div>  
                                <div class="d-flex flex-column espacamento_caixa_texto">              
                                      <div class="p-2">  
                                            <img src={this.state.foto} variant="circle" className="foto_size_modal"/>
                                      </div>
                                    </div>        
                                </div>
                              </div>
                            </div>     
                    </ReactModal>                     
               </div>                             
              
            </div>       
            {this.verifica_botao(this.state.inicio)}                                       
    </div>           
   </div>  
  </div> 
</div> 
  );
} 
}
export default empresarialComponent;