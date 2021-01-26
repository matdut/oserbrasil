import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import menu_motorista_preferido from '../menu_motorista_preferido';
import Menu_administrador from '../../administrador/menu_administrador';
//FOTO
import filesize from "filesize";
import Upload from "../../Upload";
import FileList from "../../Filelist";

import Resizer from 'react-image-file-resizer';

//import Upload from "../UploadDocumentos";
//import FileList from "../FilelistDocumento";

import { Container, Content } from "../../style";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
///
import api from '../../../services/api';
import '../foto.css';

const andamento_cadastro = sessionStorage.getItem('logprogress');     
//const cep_empresa = sessionStorage.getItem('logcep');     
//const userId = sessionStorage.getItem('logid');
const buscadorcep = require('buscadorcep');

const resizeFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
  uri => {
    resolve(uri);
  },
  'base64'
  );
});
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
      sessionStorage.setItem('logid', userId);
    }

    this.setState({           
      perfillog: sessionStorage.getItem('logperfil'),
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

    api.get(`/motoristaPreferido/get/${sessionStorage.getItem('logid')}`)
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

  if (inicio == 1) {

    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
              <div className="d-flex justify-content-center">
              <label> Próximo </label>
              </div>     
        </Box>           
    );   
     
} else {

if (this.state.fotoState == 'has-success') { 
    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados"  p={2} onClick={()=>this.sendUpdate()}>
              <div className="d-flex justify-content-center">
              <label> Próximo</label>
              </div>     
        </Box>           
    );   
} else {
  return (

    <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
            <div className="d-flex justify-content-center">
            <label> Próximo </label>
            </div>     
      </Box>           
  );   
}   

} 

} 

componentWillUnmount() {
  //this.state.uploadedFilesFoto.forEach(file => URL.revokeObjectURL(file.preview));
}
onChange = async (file) => { 
  const image = await resizeFile(file);
  return image;
}
getBase64(file, success) {
  var reader = new FileReader();  
  reader.readAsDataURL(file);
  reader.onload = function () { 
    success( reader.result );
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}
async sendUpdate(){        
 
  debugger;
  if (this.state.incluir_foto == true) {
    //const formData = new FormData();             
    
 //   console.log(JSON.stringify(formData, null, "    "));        
       //  formData.append("file", this.state.uploadedFilesFoto[0].file, this.state.uploadedFilesFoto[0].name);
    const file = this.state.uploadedFilesFoto[0].file;    
   // console.log(' Conversor file -  '+JSON.stringify(resizeFile(file), null, "    "));        

//    var vm = this;

    const formData = {
        foto_url: await this.onChange(file),
        name: this.state.uploadedFilesFoto[0].name
      }

         api.put(`/motoristaPreferido/foto/update/${sessionStorage.getItem('logid')}`, formData)
    
            if (sessionStorage.getItem('logperfil') == 1) {
              this.props.history.push(`/senha_motorista_preferido_incluir/`+sessionStorage.getItem('logid'));                    
            } else if (sessionStorage.getItem('logperfil') == 10) {
              this.props.history.push(`/area_motorista_preferido`);                   
            } else if (sessionStorage.getItem('logperfil') == 0) {
              this.props.history.push(`/senha_motorista_preferido_incluir/`+sessionStorage.getItem('logid'));                    
            }              
        
        //  }
         

   }
}

handleUpload = files => {  

  this.setState({    
    uploadedFilesFoto: [],
  });  

  //console.log(JSON.stringify(' uploadedFilesFoto - '+this.state.uploadedFilesFoto[0], null, "    "));   

 // if (files[0].size <= 2047335) {  
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

/*  } else {
    this.setState({    
      fotoState: '',
      incluir_foto: false,
      inicio: 1,
      mensagem_foto: 'Foto muito grande, favor adicionar outra '
    });    
  }   */

 // uploadedFiles.forEach(this.processUpload);
}

verificar_menu(){
  if (sessionStorage.getItem('logperfil') == 0) {  
    return(
      <div>
      <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={`/documentos_preferido_motorista_incluir/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                      {this.verifica_nome_motorista(this.state.campNome)}, adicione uma foto ao seu perfil       
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

  } else if (sessionStorage.getItem('logperfil') == 1) { 
    return(
      <div>
      <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={`/documentos_motorista_incluir/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                       Adicione uma foto ao seu perfil
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
  } else if (sessionStorage.getItem('logperfil') == 10) { 
    return(
      <div>
      <div className="d-flex justify-content-around">
               <div className="botao_navegacao">              
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

verificar_menu_lateral() {

  if (sessionStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (sessionStorage.getItem('logperfil') == 10) {
   return( 
    <menu_motorista_preferido />    
   );
  }

}

render(){  

  const { uploadedFilesFoto } = this.state;
return (
<div>    
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
                    <div>
                        <div className="titulocnh"><stronger>FOTO </stronger></div>                                              
                        <Container>   
                              <Content>
                                      {!!uploadedFilesFoto.length && (
                                          <FileList files={uploadedFilesFoto} />
                                       )}
                              </Content>   
                              <Content>
                                        <Upload onUpload={this.handleUpload} />                                       
                              </Content>                                                                      
                          </Container>    
                     </div>     
                    </Paper>
                    <Box bgcolor="text.disabled" color="background.paper" className="mensagem_foto"  p={2}>
                              <div className="d-flex justify-content-left">
                              <label> {this.state.mensagem_foto} </label>
                             </div>     
                    </Box>    
                  </Grid>
               </Grid>                                                                   
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