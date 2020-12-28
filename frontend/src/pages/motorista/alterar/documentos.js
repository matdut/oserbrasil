import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Resizer from 'react-image-file-resizer';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'; 
import api from '../../../services/api';
import { dataMask } from '../../formatacao/datamask';
import '../documentos.css';
import Menu_motorista from '../menu_motorista';
import Menu_administrador from '../../administrador/menu_administrador';

//FOTO
import filesize from "filesize";
import Upload from "../../UploadDocumentos";
import FileList from "../../FilelistDocumento";
import { Content } from "../../style";

const andamento_cadastro = localStorage.getItem('logprogress');     
//const cep_empresa = localStorage.getItem('logcep');     
//const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');
var dateFormat = require('dateformat');
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
      uploadedFilesFoto: [],     
      perfillog: null,
      campCarro: '',
      campModelo: '',
      campCarroId: '',
      campModeloId: '',            
      camp_foto_CRVL_url: '',
      camp_foto_CNH_url: '',
      camp_foto_url: '',
      campSeguradoraId: '',
      campPlaca: '',
      campAnodut: '',            
      campAno: '',
      campCor: '',    
      campCep: '',
      campEndereco: "",
      campNumero: "",
      campComplemento:"",
      campCelular:"",
      campCidade:"",
      campEstadoId:0,
      estadoSelecionado: "",   
      campBairro:"",       
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
      perfillog: localStorage.getItem('logperfil'),
      incluir_foto_1: false, 
      incluir_foto_2: false,    
    });  

    this.setState({      
      progresso: 65
    });  

    if (userId !== 0) {
      localStorage.setItem('logid', userId);
    }
    
  
    this.carrega_motorista();   
    this.carrega_doc_veiculo();

    //this.valida_motorista();
  
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
  carrega_motorista() {   
    

    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        //console.log('busca motorista - '+JSON.stringify(res.data, null, "    ")); 
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
 
 carrega_doc_veiculo() { 
  api.get(`/veiculo/get/${localStorage.getItem('logVeiculo')}`)
  .then(res=>{        
    
    if (res.data.success == true) {

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

    }  
         
    })        
    .catch(error=>{
      alert("Error de conexão  "+error)
    })            
   

   // this.setState({ validate })     

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
        if (this.state.foto1State == 'has-success' && this.state.foto2State == 'has-success') {

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
sendUpdate(){        
  console.log('sendupdate - '+JSON.stringify(this.state, null, "    ")); 

  if (localStorage.getItem('logPendencia') == 0) {
  
    const datapost = {  
        email: this.state.campEmail,  
        perfilId: 3,
        statusId: 16
      }

      api.put(`/motorista/update/${localStorage.getItem('logid')}`, datapost)
      .then(response=>{
        if (response.data.success==true) {                        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 3,
            statusId: 16
          }

          api.put(`/login/update/${localStorage.getItem('logid')}`,logindata)

        }
        else {
          console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
          alert("Error na Criação verificar log")              
        }
      }).catch(error=>{
        alert("Error 34 ")
      })
    }



   if (this.state.incluir_foto_1 == true) {
    //console.log('FOTO UPLOAD 1');   
    const file = this.state.uploadedCNH[0].file;
    var vm = this;

    //const formData = new FormData();                 
    function onload(data) {
      debugger;
     console.log('data '+data);
      const formData = {
        foto_url: data,
        name: vm.state.uploadedCNH[0].name
      }
  
 //    formData.append("file", this.state.uploadedCNH[0].file, this.state.uploadedCNH[0].name)                  

      api.put(`/motorista/documentoCNH/update/${localStorage.getItem('logid')}`, formData)
      .then(response=>{
        
          //  console.log('Retorno update 1'+JSON.stringify(response.data, null, "    ")); 
            
            if (response.data.success==true) {                         
              vm.setState({                          
                foto_incluida_1: true
              });
            }
            else {
              alert("Error CNH ")              
            }     

      }).catch(error=>{
        alert("Error conxao CNH - "+ error)          
      })   
    }
    this.getBase64(file, onload); 
      
    } 

    if (this.state.incluir_foto_2 == true) {
      const file = this.state.uploadedCRVL[0].file;
      var vm = this;
  
      //const formData = new FormData();                 
      function onload(data) {
        debugger;
       console.log('data '+data);
        const formData = {
          foto_url: data,
          name: vm.state.uploadedCRVL[0].name
        }
        console.log(JSON.stringify(formData, null, "    ")); 

      // const formData1 = new FormData();  
        
      //formData.append("file", this.state.uploadedCRVL[0].file)                   
      //formData1.append("file", this.state.uploadedCRVL[0].file, this.state.uploadedCRVL[0].name) 
     // formData.append('id', localStorage.getItem('logid'));     

      api.put(`/veiculo/documentoCRVL/update/${localStorage.getItem('logVeiculo')}/${localStorage.getItem('logid')}`, formData)
        .then(response=>{
         // console.log(JSON.stringify(response.data, null, "    ")); 
         //  console.log('Retorno update 2'+JSON.stringify(response.data, null, "    ")); 
          if (response.data.success==true) {                          
             vm.setState({                          
              foto_incluida_2: true
            });
            
          }
          else {
            alert("Error conexão ")              
          }
        }).catch(error=>{
          alert("Error conxao crvl - "+error)
        })  

        }

        this.getBase64(file, onload);    

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
 // console.log(JSON.stringify(' files - '+files[0].size, null, "    "));   
  this.setState({    
    uploadedCNH: [],
  });  
  console.log(JSON.stringify(' uploadedCNH - '+this.state.uploadedCNH[0], null, "    "));   
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
        uploaded: true,
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

handleUploadCRVL = files => {  
  // console.log(JSON.stringify(' files - '+files[0].size, null, "    "));   
  //console.log(JSON.stringify(' uplodfiles - '+data, null, "    "));   

  this.setState({    
    uploadedCRVL: [],
  });  
  console.log(JSON.stringify(' uploadedCRVL - '+this.state.uploadedCRVL[0], null, "    "));   

 // if (files[0].size <= 2047335) {
    const uploadedCRVL = files.map(file => ({
      file,
      //id: uniqueId(),
      name: file.name,
      originalname: file.originalname,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: true,
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

/*  } else {
    this.setState({    
      foto2State: '',
      incluir_foto_2: false,
      mensagem_foto2: 'Foto muito grande, favor adicionar outra '
    });
    this.verifica_botao(2)
  }  */
 
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
  const { uploadedCNH } = this.state;
  const { uploadedCRVL } = this.state; 
  
return (
<div>    
<div>
 {this.verificar_menu_lateral()}
<div> 
    <div>     
    <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo">Documentos </div>         
              </div>  

                 {this.verifica_mensagem()}  

           
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
                                      {!!uploadedCNH.length && (
                                          <FileList files={uploadedCNH} />
                                       )}
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
                </div>
                <div class="p-2">           
                <Grid item xs>
                    <Paper className="documento_motorista_cnh_2">
                      <div>                       
                        <div className="titulocrvl"><stronger>CRLV</stronger></div>
                        <div className="descricaocrvl">Certificado de Registro e Licenciamento do Veí­culo</div>
                        <Container>   
            
                                <div class="d-flex justify-content-start">
                                   <div>
                                   <Content>
                                      {!!uploadedCRVL.length && (
                                          <FileList files={uploadedCRVL} />
                                       )}
                                    </Content>   
                                   </div>
                                   <div>
                                     <Content>
                                         <Upload onUpload={this.handleUploadCRVL} />                                       
                                     </Content>                                            
                                   </div>
                                 </div>                
                          </Container>                                            
                          <Box bgcolor="text.disabled" color="background.paper" className="mensagem_foto2"  p={2}>
                              <div className="d-flex justify-content-center">
                              <label> {this.state.mensagem_foto2} </label>
                              </div>     
                          </Box>    
                        </div>     
                    </Paper>
                  </Grid>                   
               </div>                            
            </div>       
            {this.verifica_botao(this.state.inicio)}                                       
    </div>       
    <div className="area_neutra">
               <Container maxWidth="sm" className="barra_incluir">
                  <Typography component="div" style={{ backgroundColor: '#white', height: '174px' }} />
              </Container>         
        </div>               
   </div>  
  </div> 
</div> 
  );
} 
}
export default empresarialComponent;