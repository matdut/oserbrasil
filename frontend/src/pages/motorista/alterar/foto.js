'use strict';
import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Menu_motorista from '../menu_motorista';
import Menu_administrador from '../../administrador/menu_administrador';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'; 

import Avatar from '@material-ui/core/Avatar';

//FOTO

//import Upload from "../../UploadDocumentos";
//import FileList from "../../FilelistDocumento";

import filesize from "filesize";
import Upload from "../../Upload";
//import Upload from "../UploadDocumentos";
//import FileList from "../FilelistDocumento";
import FileList from "../../Filelist";
import { Content } from "../../style";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
///
import Resizer from 'react-image-file-resizer';

import api from '../../../services/api';
import '../foto.css';
var dateFormat = require('dateformat');

const fs = require('fs');
//const imageToBase64 = require('image-to-base64');
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

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campFoto: "",
      campNome: "",
      campCep: '',    
      campBairro: '',
      campEndereco: '',
      campComplemento:'',
      campNumero:'',
      campCidade:'',
      campCarro: '',
      campModelo: '',
      campCarroId: '',
      campModeloId: '',            
      camp_foto: '',
      camp_foto_CRVL_url: '',
      camp_foto_CNH_url: '',
      camp_foto_url: '',
      campSeguradoraId: '',
      campPlaca: '',
      campAnodut: '',            
      campAno: '',
      campCor: '',  
      uploadedFilesFoto: [],     
      foto_compress: '', 
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

    this.carrega_motorista();     
    this.valida_motorista();
  }

  valida_motorista() {
    const { validate } = this.state;  
    localStorage.setItem('logPendencia', 0);
    api.get(`/veiculo/get/${localStorage.getItem('logVeiculo')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {          

          this.setState({            
            campCarroId: res.data.data[0].marcaId,
            campModeloId: res.data.data[0].modeloId,            
            camp_foto_CRVL_url: res.data.data[0].foto_CRVL_url,
            campSeguradoraId: res.data.data[0].seguradoraId,
            campPlaca: res.data.data[0].placa,
            campAnodut: res.data.data[0].anodut,            
            campAno: res.data.data[0].ano,
            campCor: res.data.data[0].cor,            
          })            
          api.get(`/motorista/get/${res.data.data[0].motoristaId}`)
          .then(res=>{
            console.log(JSON.stringify(res.data, null, "    ")); 
            if (res.data.success) {
               
              this.setState({               
                campStatusId: res.data.data[0].statusId,
                campCNH: res.data.data[0].numero_carteira,   
                campData_CNH:  dateFormat(res.data.data[0].data_validade, "UTC:dd/mm/yyyy"),  
                camp_foto_CNH_url: res.data.data[0].foto_CNH_url,
                camp_foto_url: res.data.data[0].foto_url,                          
                campNumero: res.data.data[0].numero,
                campComplemento: res.data.data[0].complemento,                               
                campCep: res.data.data[0].cep,                   
              })       
              
              
              if (this.state.campCarroId == null || this.state.campCarroId == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campModeloId == null || this.state.campModeloId == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.camp_foto_CRVL_url == null || this.state.camp_foto_CRVL_url == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campSeguradoraId == null || this.state.campSeguradoraId == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campPlaca == null || this.state.campPlaca == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campAnodut == null || this.state.campAnodut == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campAno == null || this.state.campAno == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campCor == null || this.state.campCor == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campCNH == null || this.state.campCNH == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campData_CNH == null || this.state.campData_CNH == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.camp_foto_CNH_url == null || this.state.camp_foto_CNH_url == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.camp_foto_url == null || this.state.camp_foto_url == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campCep == null || this.state.campCep == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campNumero == null || this.state.campNumero == "") {
                localStorage.setItem('logPendencia', 1)
              }
              if (this.state.campComplemento == null || this.state.campComplemento == "") {
                localStorage.setItem('logPendencia', 1)
              }

            } 

          })        
          .catch(error=>{
            alert("Error de conexão motorista "+error)
          })       

        }  

      })        
      .catch(error=>{
        alert("Error de conexão carrega_veiculo "+error)
      })   
    }

  preview_imagem(file) {
    //let data = 'c3RhY2thYnVzZS5jb20=';
    let buff = new Buffer(file, 'base64');
    return buff.toString('ascii');
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
            data: file.foto_url,
            error: false            
          }));             
           
          this.setState({             
            campNome: res.data.data[0].nome,       
            uploadedFilesFoto: uploadedFilesFoto,
            camp_foto: uploadedFilesFoto[0].preview,
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
   if (inicio == 1) {

    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
              <div className="d-flex justify-content-center">
              <label> Salvar Alterações </label>
              </div>     
        </Box>           
    );   
     
} else {

if (this.state.fotoState == 'has-success') { 
    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados"  p={2} onClick={()=>this.sendUpdate()}>
              <div className="d-flex justify-content-center">
              <label> Salvar Alterações</label>
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
    success( reader.result );
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}
async sendUpdate(){         

  
  if (localStorage.getItem('logPendencia') == 0) {
    const data1 = {
      email: this.state.campEmail,  
      perfilId: 3,
      statusId: 16
    }          
      api.put(`/motorista/update/${localStorage.getItem('logid')}`, data1)      

      api.put(`/login/update/${localStorage.getItem('logid')}`,data1)
   }


  if (this.state.incluir_foto == true) {
  //  console.log(' passando o upload 2 '+JSON.stringify(this.state.uploadedFilesFoto[0], null, "    "));            
    const file = this.state.uploadedFilesFoto[0].file;            
    //var vm = this;

    //function onload(data) {     
      // console.log('data '+data);
      const formData = {
        foto_url: await this.onChange(file),
        name: this.state.uploadedFilesFoto[0].name
      }
     console.log(' base64 o arquivo 1 - '+JSON.stringify(formData, null, "    "));
    
      api.put(`/motorista/foto/update/${localStorage.getItem('logid')}`, formData)      
  
              if (localStorage.getItem('logperfil') == 1) {
                this.props.history.push(`/senha_motorista/`+localStorage.getItem('logid'));                    
              } else if (localStorage.getItem('logperfil') == 3) {
                this.props.history.push(`/area_motorista`);                   
              } else if (localStorage.getItem('logperfil') == 0) {
                this.props.history.push(`/senha_motorista/`+localStorage.getItem('logid'));                    
              }         

   // }   
   // this.onFotoChange(file, onload);
    //this.onFotoChange(file, onload);

     // const formData = new FormData();      
      //console.log(JSON.stringify(formData, null, "    "));        
      //formData.append("file", this.state.uploadedFilesFoto[0].file, this.state.uploadedFilesFoto[0].name);
     // formData.append("file", this.state.uploadedFilesFoto[0].file, this.state.uploadedFilesFoto[0].name);
      //const config = { headers: { 'Content-Type': 'multipart/form-data' } };  
   // let buff = new Buffer(file);
   // let base64data = buff.toString('base64');

    //console.log(' base 64 - '+base64data);        
    
       
  
        //  }
          //else {
           // alert("Error conexão ")              
         // }
        
       // }).catch(error=>{
        //  alert("Erro verificar log  "+error)
       // })
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

  console.log('File - '+ (files[0].size));
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

    //console.log(' file.url - '+uploadedFilesFoto.url);
    
    this.setState({
      //uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
      uploadedFilesFoto: uploadedFilesFoto,
      fotoState: 'has-success',
      camp_foto: uploadedFilesFoto[0].preview,
      incluir_foto: true,
      inicio: 2,
      mensagem_foto: ''
    });       

 /* } else {
    this.setState({    
      fotoState: '',
      incluir_foto: false,
      inicio: 1,
      mensagem_foto: 'Foto muito grande, favor adicionar outra '
    });    
  } */  

 // uploadedFiles.forEach(this.processUpload);
}

verificar_menu(){

  return(
    <div>
    <div className="d-flex justify-content-around">
             <div className="botao_navegacao">
               <Link to={`/documentos_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
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

verifica_mensagem() {
  if (localStorage.getItem('statusid') == 16) {
    //const classes = useStyles();
    return (
      <div className="mensagem_motorista">     
         Documentação em análise, favor aguardar. Liberadas apenas as funções de alteração de dados cadastrais!!   
      </div>
    );
  }
  
}

render(){  
  const { uploadedFilesFoto } = this.state;
return (
<div>    
<div>
 {this.verificar_menu_lateral()}
<div> 
    <div>     
    <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo">Foto </div>         
              </div> 
              {this.verifica_mensagem()}         
            </div> 

          <div className="d-flex flex-column espacamento_caixa_texto">              
              <div class="p-2">       
              <Grid item xs>
                <Paper className="documento_motorista_cnh">
                       <div>
                        <div className="titulocnh"><stronger>FOTO </stronger></div>                                              
                        <Container>  
                   
                               <div className="d-flex justify-content-start">
                                   <div>
                                   <Content>
                                      {!!uploadedFilesFoto.length && (
                                          <FileList files={uploadedFilesFoto} />
                                       )}
                                    </Content>   
                                   </div>
                                   <div>
                                     <Content>
                                         <Upload onUpload={this.handleUpload} />                                       
                                    </Content>                                            
                                   </div>
                                 </div>   
                                  
                           </Container>                                
                            <Box bgcolor="text.disabled" color="background.paper" className="mensagem_foto1"  p={2}>
                            <div className="d-flex justify-content-center">
                            <label> {this.state.mensagem_foto} </label>
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