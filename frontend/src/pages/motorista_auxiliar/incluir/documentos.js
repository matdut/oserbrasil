import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import api from '../../../services/api';
import '../documentos.css';
import menu_motorista_auxiliar from '../menu_motorista_auxiliar';
import Menu_administrador from '../../administrador/menu_administrador';

import Resizer from 'react-image-file-resizer';

//FOTO
import filesize from "filesize";
import Upload from "../../UploadDocumentos";
//import Upload from "../../UploadDocumentosModal";
//import FileList from "../../FilelistDocInclusao";
import FileList from "../../FilelistDocumento";
import { Container, Content } from "../../style";

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
      uploadedCNH: [],
      uploadedCRVL: [],
      perfillog: null,
      foto_incluida_1: false,
      foto_incluida_2: false,
      incluir_foto_1: false,    
      incluir_foto_2: false,
      mensagem_foto1: '',
      mensagem_foto2: '',
      foto1State: '',          
      foto2State: ''                        
    }       
    this.verificar_menu = this.verificar_menu.bind(this);      
  }

  componentDidMount(){      

    //console.log('ENTROU AQUI ')

    let userId = this.props.match.params.id;

    this.setState({      
      perfillog: sessionStorage.getItem('logperfil'),
      incluir_foto_1: false, 
      incluir_foto_2: false,    
    });  

    this.setState({      
      progresso: 65
    });  

    if (userId !== 0) {
      sessionStorage.setItem('logid', userId);
    }      
    this.carrega_motorista();  
    
    if (sessionStorage.getItem('logVeiculo') > 0) {
      this.carrega_doc_veiculo();  
  //  } else {

   ///   this.load_veiculo();
    }
    
  }

  carrega_motorista() {   
    

    api.get(`/motoristaAuxiliar/get/${sessionStorage.getItem('logid')}`)
    .then(res=>{
        console.log('busca motorista doc - '+JSON.stringify(res.data, null, "    ")); 
        if (res.data.success == true) {
           
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

 

verifica_botao(inicio) {

  
      //console.log(JSON.stringify(this.state, null, "    "));
      //  console.log(JSON.stringify(' validacao campo ', null, "    "));
      //  if (this.state.foto1State == 'has-success' && this.state.foto2State == 'has-success') {

          return (
            <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados" p={2} onClick={()=>this.sendUpdate()}>
            <div className="d-flex justify-content-center">
            <label> Próximo </label>
            </div>     
            </Box>           
          );   

     /* } else {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
            </Box>           
        );   
      }    */     
 // }  
  }  

  /*
handleDelete = async id => {

    await api.delete(`posts/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedCNH.filter(file => file.id !== id)
    });
 };
*/

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
  //console.log('sendupdate state - '+JSON.stringify(this.state, null, "    ")); 

   if (this.state.incluir_foto_1 == true) {
    //console.log('FOTO UPLOAD 1');   
    const file = this.state.uploadedCNH[0].file;   

    //const formData = new FormData();                 
    
      const formData = {
        foto_url:  await this.onChange(file),
        name: this.state.uploadedCNH[0].name
      }
      console.log(' CNH - '+JSON.stringify(formData, null, "    ")); 
 //    formData.append("file", this.state.uploadedCNH[0].file, this.state.uploadedCNH[0].name)                  

      api.put(`/motoristaAuxiliar/documentoCNH/update/${sessionStorage.getItem('logid')}`, formData)
      .then(response=>{
        
            console.log('Retorno update 1'+JSON.stringify(response.data, null, "    ")); 
            
            if (response.data.success==true) {                         
              this.setState({                          
                foto_incluida_1: true
              });
            }
            else {
              alert("Error CNH ")              
            }     

      }).catch(error=>{
        alert("Error conxao CNH - "+ error)          
      })   
   // }
    //this.getBase64(file, onload); 
      
    } 
          

      if (sessionStorage.getItem('logperfil') == 1) {
        this.props.history.push(`/foto_motorista_auxiliar_incluir/`+sessionStorage.getItem('logid'));
      } else if (sessionStorage.getItem('logperfil') == 9) {
        this.props.history.push(`/area_motorista_auxiliar`);                   
      } else if (sessionStorage.getItem('logperfil') == 0) {
        this.props.history.push(`/foto_motorista_auxiliar_incluir/`+sessionStorage.getItem('logid'));
      }          

}  
handleUploadCNH = files => {  
 // console.log(JSON.stringify(' files - '+files[0].size, null, "    "));   
  this.setState({    
    uploadedCNH: [],
  });  
  console.log(JSON.stringify(' uploadedCNH - '+this.state.uploadedCNH[0], null, "    "));   
  //if (files[0].size <= 2047335) {
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
        incluir_foto_1: true,
        foto1State: 'has-success',
        mensagem_foto1: ''
      });              

      this.verifica_botao(2);
/* } else {  
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
  if (sessionStorage.getItem('logperfil') == 0) {  
    return(
      <div>
          <div className="d-flex justify-content-around">             
               <div className="botao_navegacao">
                 <Link to={`/endereco_aux_motorista_incluir/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
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

  } else if (sessionStorage.getItem('logperfil') == 1) { 
    return(
      <div>
          <div className="d-flex justify-content-around">             
               <div className="botao_navegacao">
                 <Link to={`/endereco_aux_motorista_incluir/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
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
  } else if (sessionStorage.getItem('logperfil') == 9) { 
    return(
      <div>
          <div className="d-flex justify-content-around">             
               <div className="botao_navegacao">          
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
     </div>    
    );
  }  
}
verificar_menu_lateral() {

  if (sessionStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (sessionStorage.getItem('logperfil') == 9) {
   return( 
    <menu_motorista_auxiliar />   
   );
  }

}

render(){  
  const { uploadedCNH } = this.state;
    
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
          
          <div className="d-flex flex-column">              
              <div class="p-2">                  
              
                 <Grid item xs>
                    <Paper className="documento_motorista_cnh_2">
                       <div>
                        <div className="titulocnh"><stronger>CNH </stronger></div>                      
                        <div className="descricaocnh">Carteira Nacional de Habilitação</div>                      
                    
                   
                                <div class="d-flex justify-content-start">
                                   <div>
                                
                                      {!!uploadedCNH.length && (
                                          <FileList files={uploadedCNH} />
                                       )}
                              
                                   </div>
                                   <div>
                          
                                         <Upload onUpload={this.handleUploadCNH} />                                       
                                                               
                                   </div>
                                 </div>    
                                                 
                            <Box bgcolor="text.disabled" color="background.paper" className="mensagem_foto1"  p={2}>
                            <div className="d-flex justify-content-center">
                            <label> {this.state.mensagem_foto1} </label>
                            </div>     
                          </Box>                          
                        </div> 
                    </Paper>
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