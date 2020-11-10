import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Input } from 'reactstrap';
//import axios from 'axios';
import api from '../../services/api';
import ReactModal from 'react-modal';
import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import Box from '@material-ui/core/Box';

import MaterialTable from 'material-table';
//import { Tabs, Tab } from 'react-bootstrap';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
//import { useTheme } from "@material-ui/core/styles";

import { Link } from "react-router-dom";
import Modal from 'react-modal';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';


import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//library sweetalert
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial' ;
import Menu_administrador from '../administrador/menu_administrador';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { cnpjMask } from '../formatacao/cnpjmask';

import { dataMask } from '../formatacao/datamask';

import { Data } from '@react-google-maps/api';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

//import { Alert } from 'reactstrap';
var dateFormat = require('dateformat');
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
const logid = localStorage.getItem('logid');
const { cpf } = require('cpf-cnpj-validator');
//const theme = useTheme();

//const baseUrl = "http://34.210.56.22:3333";
/*const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

let customStyle = {
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create("width"),
  width: "100%"
};
*/ 
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const customStyles = {
  overlay: {    
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
   // backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '0px',
    left                   : '66%',     
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100%',    
    width                  : '40%',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

const ConfirmacaodelStyles = {
  overlay: {
    backgroundColor: 'papayawhip',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
   // backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '50%',
    left                   : '66%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '50%',    
    width                  : '560px',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};


class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      campId: '',
      campNome: "",
      campSenha: '',
      campNomeTitulo: '',
      campData_nascimento:"",
      campEmail:"",      
      campEmailAnterior:"",   
      campTelefone1:"",
      campRazao_social: "",
      campDeletarId: '',
      campDeletarEmail: '',
      empresaId: 0,
      campStatusId: 0,
      campCpf:"",       
      mensagem_alert: false,
      mensagem_usuario: '',
      camp_cpf_disabled: false,
      camp_nome_disabled: false,
      camp_datanasc_disabled: false,
      camp_email_disabled: true,
      camp_telefone_disabled: false,
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',      
      campgerencia_eventos: false, 
      campMonitorar_eventos: false, 
      camprepresentante_legal: false,     
      campgerenciar_todos_eventos: false, 
      campincluir_alterar_cartao: false, 
      campvisualizar_eventos_servicos: false,
      campincluir_operadores_eventos: false, 
      campincluir_operadores: false, 
      campincluir_eventos_servicos: false,
      campalterar_eventos_servicos: false,
      campexcluir_eventos_servicos: false,
      campemitir_relatorio: false,
      campalterar_endereco_empresa: false,       
      erro_cpf: false,
      erro_nome: false,
      erro_datanascimento: false,
      erro_email: false,
      erro_telefone: false,
      validacao_cpf: false,
      validacao_nome: false,
      validacao_datanascimento: false,
      validacao_email: false,
      validacao_telefone: false,  
      showModal: false,
      showModalInclusao: false,
      inicio: 0,
      mensagem: '',
      value: "1",
      color: 'light',
      listOperadores:[],
      listOperadoresExcluidos:[],
      listOperadoresCadIncompletos:[],
      listOperadoresConvites:[],

      listaStatus:[],
      validate: {
        nomeState: '',      
        datanascimentoState: '',   
        emailState: '',
        cpfState: '',     
        telefone1State: '',     
      }    
    }
    this.cpfchange = this.cpfchange.bind(this);
    this.telefone1change = this.telefone1change.bind(this);  
    this.emailchange = this.emailchange.bind(this);
    this.nomeChange = this.nomeChange.bind(this);     
    this.data_nascimentochange = this.data_nascimentochange.bind(this);

    this.verificaEmail = this.verificaEmail.bind(this);       
    this.verificaCpf = this.verificaCpf.bind(this);  
    this.verificaCpfonblur = this.verificaCpfonblur.bind(this);      

    this.verificaCpfonfocus = this.verificaCpfonfocus.bind(this); 
    this.verificaNomeonfocus = this.verificaNomeonfocus.bind(this); 
    this.verificaEmailonfocus = this.verificaEmailonfocus.bind(this);   
    this.verificaTelefone1onfocus = this.verificaTelefone1onfocus.bind(this);   

    this.verificaTelefone1 = this.verificaTelefone1.bind(this);  
    this.verificaNome = this.verificaNome.bind(this);  
    this.verificaDataNascimento = this.verificaDataNascimento.bind(this);  

    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.validaCpfChange = this.validaCpfChange.bind(this);  
    this.validatelefone1Change = this.validatelefone1Change.bind(this);  
    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validaDataNascimentoChange = this.validaDataNascimentoChange.bind(this);    

    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_email = this.busca_email.bind(this);

    this.handlegerenciaChange = this.handlegerenciaChange.bind(this);
    this.handlegerenciarotasChange = this.handlemonitorar_eventosChange.bind(this);
    this.handleeditaoperadoresChange = this.handlerepresentantelegalChange.bind(this);
  }

  componentDidMount(){

    let userId = this.props.match.params.id;     
    localStorage.setItem('logid', userId);

    console.log('logid - '+userId);

    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });

    if (localStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else {
        this.loadOperadores();    
        this.loadOperadoresExcluidos();
        this.loadOperadoresCadIncompletos();
        this.carrega_status();  
        this.loadConvites();
    }    
  }

  loadOperadoresExcluidos(){
    // const url = baseUrl+"/cliente/list"
    api.get('/operador/listExcluidos')
     .then(res=>{
       if (res.data.success) {
 
         const data = res.data.data       
         this.setState({
           listOperadoresExcluidos:data,           
         })    
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }
   
   loadOperadoresCadIncompletos(){
    // const url = baseUrl+"/cliente/list"
    api.get('/operador/listarIncompletos')
     .then(res=>{
       if (res.data.success) {
 
         const data = res.data.data       
         this.setState({
           listOperadoresCadIncompletos:data,           
         })    
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }

  handlegerenciaChange = (event) => {
    this.setState({ 
      campgerencia_eventos: event.target.checked
    });
  };
  handlemonitorar_eventosChange = (event) => {
    this.setState({ 
      campMonitorar_eventos: event.target.checked
    });
  };
  handlerepresentantelegalChange = (event) => {
    this.setState({ 
      camprepresentante_legal: event.target.checked
    });
  };
  

  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.descricao}</MenuItem>              
      )
    })     
  
   }
    

  enviar_botao_modal(inicio) {
    const { validate } = this.state 
     // console.log(JSON.stringify(this.state, null, "    "));
      console.log(JSON.stringify(validate, null, "    "));

     if (inicio == 1) {
  
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Enviar </label>
                </div>     
          </Box>           
      );   
       
      } else {

        if (this.state.validacao_email == true) { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendEnvioEmail()}>
                      <div className="d-flex justify-content-center">
                      <label> Enviar </label>
                      </div>     
                </Box>           
            );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Enviar </label>
                    </div>     
              </Box>           
          );   
        }   

      } 
} 

sendEnvioEmail(){        
  const { validate } = this.state;       
  validate.cpfState= '';
  this.setState({ 
     mensagem_aguarde: 'Aguarde, enviando o convite...',       
     validate 
  }); 
  
  const email_envio = this.state.campEmail;

      const operadordata = {  
        email: this.state.campEmail,    
        empresaId: localStorage.getItem('logid'),     
        statusId: 8,
        perfilId: localStorage.getItem('logperfil'),
        gerenciar_eventos: this.state.campgerencia_eventos, 
        monitorar_eventos: this.state.campMonitorar_eventos,   
        representante_legal: this.state.camprepresentante_legal,              
      }    
      
      api.get(`/emailOperador/getemail/${this.state.campEmail}`)
      .then(res1=>{             

        if (res1.data.data.length == 0) {    
      
          api.post(`/emailOperador/create`, operadordata)
          .then(res=>{             
          // console.log(' resultado - '+JSON.stringify(res.data, null, "    "));       
            //   url: `http://localhost:3000/operadores/${res.data.data.id}`,   
            //url: `http://www.oser.app.br:21497/operadores/${res.data.data.id}`,
            if (res.data.success == true) {    
        
              const params_email = {    
                email: email_envio,         
             //  url: `http://localhost:3000/operadores_incluir/${res.data.data.id}/${res.data.data.email}`,     
                url: `http://www.oser.app.br:21497/operadores_incluir/${res.data.data.id}/${res.data.data.email}`,     
                texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
              }      
            // console.log(' resultado - '+JSON.stringify(params_email, null, "    "));    
                
              api.post("/email/send", params_email);                        
             

             this.setState({                          
                mensagem_usuario: 'Mensagem para operador enviada com sucesso!',                      
             }); 
            
             this.verifica_botao(1);
             this.enviar_botao_modal(1);         

             this.envia_mensagemInclusaoClick();     

             // this.handleCloseModalInclusao();
     
            }       
          })        
          .catch(error=>{
            alert("Erro de conexão "+error)
          })        

        } else {      

          const params_email = {    
            email: email_envio,            
            url: `http://www.oser.app.br:21497/operadores_incluir/${res1.data.data.id}/${res1.data.data.email}`,     
           // url: `http://localhost:3000/operadores_incluir/${res1.data.data.id}/${res1.data.data.email}`,     
            texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
          }      
            
          api.post("/email/send", params_email)       
                  
          this.setState({                          
            mensagem_usuario: 'Mensagem para operador enviada com sucesso!',                      
         }); 
        
         this.verifica_botao(1);
         this.enviar_botao_modal(1);         

         this.envia_mensagemInclusaoClick();     
     
        }
      
      })        
      .catch(error=>{
        alert("Erro de conexão "+error)
      })        
 
}

  handleOpenModalEdit(data) {
    this.setState({ 
      showModal: true,        
      incluir: false,  
      erro_email: false,   
      validacao_email: false,
      mensagem_aguarde: '',
    });  

    localStorage.setItem('logoperadorId', data.id);     
    console.log('buscar_operador ');
    this.busca_operador();   

    if (localStorage.getItem('logperfil') == 1) {
      this.setState({ 
        camp_cpf_disabled: true,
        camp_nome_disabled: true,
        camp_datanasc_disabled: false,
        camp_email_disabled: true,
        camp_telefone_disabled: false,
      });
    }

   // this.prepareSave();
  }  
  
  handleCloseModalEdit() {
    this.setState({ 
      showModal: false,  
      campStatusId: 0,  
    });
    localStorage.setItem('logeditid', '');
    
    this.setState({ 
      mensagem_aguarde: ''
    }); 

    this.loadOperadores();    
    this.loadOperadoresExcluidos();
    this.loadOperadoresCadIncompletos();
    this.carrega_status();  
    this.loadConvites();
    
    //this.loadMotorista();     
  //  this.carrega_status();  
    
  }
  cpfchange(e) {
    this.setState({ campCpf: cpfMask(e.target.value) })
  }
  telefone1change(e) {
    this.setState({ campTelefone1: celularMask(e.target.value) })
  }
  emailchange(e) {
    this.setState({ campEmail: e.target.value })
  }
  nomeChange(event) {     
    this.setState({        
        campNome: event.target.value
    });    
  } 
  data_nascimentochange(e) {
    this.setState({ campData_nascimento: dataMask(e.target.value) })
  }

  loadConvites(){
    // const url = baseUrl+"/cliente/list"
    api.get(`/emailOperador/list/`+localStorage.getItem('logid'))
     .then(res=>{
       if (res.data.success) {
 
         const data = res.data.data       
         this.setState({listOperadoresConvites:data})
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }
   

  busca_cpf(e){
    const { validate } = this.state
    const cpflog = e.target.value   
    //console.log(`/operador/getOperadorCpf/${cpflog}/${this.state.campCnpj}`);   
   api.get(`/operador/getOperadorCpf/${cpflog}/${this.state.campCnpj}`)
   .then(res=>{
     //  console.log(JSON.stringify(res.data, null, "    ")); 
       if (res.data.success) {         
          validate.cpfState = 'has-danger'
          this.setState({ 
             erro_cpf: true,
             validacao_cpf: false,
             mensagem_cpf: 'Operador já cadastrado'  
          });
          this.state.incluir = false;
 
         this.setState({ validate })
       } else {
         //console.log(`/empresa/getOperadorCpfRep/${cpflog}/${this.state.campCnpj}`);   
           api.get(`/empresa/getOperadorCpfRep/${cpflog}/${this.state.campCnpj}`)
           .then(res=>{
       //    console.log(JSON.stringify(res.data, null, "    ")); 
           if (res.data.success) {         
             validate.cpfState = 'has-danger'
             this.setState({ 
                 erro_cpf: true,
                 validacao_cpf: false,
                 mensagem_cpf: 'Operador já cadastrado nesta empresa como representante legal'  
             });
             this.state.incluir= false
 
             this.setState({ validate })
           } else {
               validate.cpfState = 'has-success'
               this.setState({ 
                erro_cpf: false,
                validacao_cpf: true,
                 mensagem_cpf: ''  
               });
 
               this.state.incluir= true 
           }  
         })        
         .catch(error=>{
           alert("Error de conexão busca_cpf "+error)
         })   
       }  
     })        
     .catch(error=>{
       alert("Error de conexão busca_cpf "+error)
     })   
   }
   busca_email() {
    const { validate } = this.state
    //console.log('busca cliente metodo e ID '+localStorage.getItem('logid'));    
    api.get(`/emailOperador/getEmpresa/${localStorage.getItem('logemailId')}/${localStorage.getItem('logemail')}`)
    .then(res=>{       
        if (res.data.data.length > 0) {
           
          this.setState({           
            campEmail: res.data.data[0].email,     
            empresaId: res.data.data[0].empresaId,                                  
            inicio: 2,
            incluir: true
          })                 
   
          validate.emailState = 'has-success'
          this.setState({ validate })
          localStorage.setItem('logid', res.data.data[0].empresaId);
          if (localStorage.getItem('logperfil') == 8) {
             localStorage.setItem('lograzao_social', this.state.campRazao_social)      
          }   

        //  this.setState({ validate })
        } else {
          console.log('busca operador ID '+localStorage.getItem('logemailId'));
          localStorage.setItem('logoperadorId', localStorage.getItem('logemailId'));  
          this.busca_operador();
        }
      })        
      .catch(error=>{
        alert("Error de conexão busca_email "+error)
      })       
  
  } 

  busca_operador() {
    const { validate } = this.state
   // console.log('busca operador ID '+localStorage.getItem('logid'));
  //  console.log('busca perfil operador state - '+localStorage.getItem('logperfil'));   
    api.get(`/operador/get/${localStorage.getItem('logoperadorId')}`)
    .then(res=>{
      //  console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {
           
          this.setState({ 
            campId: res.data.data[0].id,
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,
            campCnpj: cnpjMask(res.data.data[0].empresa.cnpj),
            campRazao_social: res.data.data[0].empresa.razao_social,
            campData_nascimento: dateFormat(res.data.data[0].data_nascimento, "UTC:dd/mm/yyyy"),
            campEmail: res.data.data[0].email,      
            campEmailAnterior: res.data.data[0].email,      
            campTelefone1: res.data.data[0].celular,            
            campStatusId: res.data.data[0].statusId,
            empresaId: res.data.data[0].empresa.id,            
            incluir: false,
            inicio: 2,
            validacao_cpf: true,
            validacao_datanascimento: true,
            validacao_email: true,
            validacao_nome: true,
            validacao_telefone: true,
          });            
          console.log('Buscar operador - '+JSON.stringify(this.state, null, "    ")); 

          api.get(`/permissao/listaacesso/8/${localStorage.getItem('logoperadorId')}`)
          .then(resacesso=>{
              console.log(' acesso - '+JSON.stringify(resacesso.data, null, "    ")); 
             
              if (resacesso.data.data.length > 0) {                
                
                resacesso.data.data.map((data)=>{          

                  if (data.funcionalidade.descricao == 'Gerenciar Eventos') {
                    this.setState({ 
                      campgerencia_eventos: true, 
                    }) 
  
                   }
                  if (data.funcionalidade.descricao == 'Monitorar Eventos') {
                    this.setState({ 
                      campMonitorar_eventos: true, 
                    }) 

                  }                
                  if (data.funcionalidade.descricao == 'Representante Legal') {
                    this.setState({ 
                      camprepresentante_legal: true, 
                    }) 
  
                  }          
                  
                })     
                
            }   
          
         
          localStorage.setItem('logid', res.data.data[0].empresaId);
         // console.log('busca cliente cnpj - '+res.data.data[0].cliente.cnpj);   
          if (this.state.campCpf !== "") {
            validate.cpfState = 'has-success'      
          }
          if (this.state.campNome !== "") {
            validate.nomeState = 'has-success'      
          }
          if (this.state.campData_nascimento !== "") {
            validate.datanascimentoState = 'has-success'      
          }
          if (this.state.campEmail !== "") {
            validate.emailState = 'has-success'      
          }   
          if (this.state.campTelefone1 !== "") {
            validate.telefone1State = 'has-success'      
          }            
  
          this.setState({ validate })
         })        
        .catch(error=>{
          alert("Error de conexão busca_acesso "+error)
        })    

        } 
      })        
      .catch(error=>{
        alert("Error de conexão busca_operador "+error)
      })       
  
  }
  verificaCpfonfocus(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,               
        erro_cpf: false,
        validacao_cpf: false,
        mensagem_cpf: ''  
       })            
    }  
  } 
  verificaNomeonfocus(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.nomeState = ''
      this.setState({ 
        validate,            
        erro_nome: false,
        validacao_nome: false,   
        mensagem_nome: ''  
       })            
    }  
  } 
  verificaCpf(e) {
    const { validate } = this.state
       if (e.target.value.length == 0) {
        validate.cpfState = ''
        validate.datanascimentoState = ''
        validate.emailState = ''
        validate.nomeState = ''
        validate.telefone1State = ''
        this.setState({ 
          validate,       
          campNome: '',
          campData_nascimento: '',
          campEmail: '',
          campTelefone1: '',
          inicio: 1,
          erro_cpf: false,
          validacao_cpf: false,   
          mensagem_cpf: ''  
         })            
       }  
   }  

   verificaCpfonblur(e) {
    const { validate } = this.state
       if (e.target.value.length  == 0) {
        validate.cpfState = ''
        validate.datanascimentoState = ''
        validate.emailState = ''
        validate.nomeState = ''
        validate.telefone1State = ''
        this.setState({ 
          validate,       
          campNome: '',
          campData_nascimento: '',
          campEmail: '',
          campTelefone1: '',
          inicio: 1,
          erro_cpf: false,
          validacao_cpf: false,   
          mensagem_cpf: ''  
         })            
       }  else if (e.target.value.length == 14){                
        console.log('é valido - '+e.target.value);
        this.busca_cpf(e);// se existir não deixa cadastrar 
    }  
   }  
  verificaTelefone1(e) {   
    const { validate } = this.state
       if (e.target.value.length == 0) {          
        validate.telefone1State = ''
        this.setState({ 
          validate,
          erro_telefone: false,
          validacao_telefone: false,   
          inicio: 1,
          mensagem_telefone1: ''
         })      
       } else {       

        if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success' ;                
            this.setState({ 
              erro_telefone: false,
              validacao_telefone: true,   
              mensagem_telefone1: ''
          });           
        }

       }        
   }
   verificaEmailonfocus(e){   
    const { validate } = this.state
      if (e.target.value.length == 0) {
        validate.emailState = ''
        this.setState({ 
            validate,
            erro_email: false,
            validacao_email: false,   
            mensagem_email: ''  
        })                   
      }  
   }
   verificaTelefone1onfocus(e){   
    const { validate } = this.state
    validate.telefone1State = ''
       this.setState({ 
            validate,
            erro_telefone: false,
            validacao_telefone: false,   
            mensagem_telefone1: ''  
        })                   
   }
   verificaEmail(e){   
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.emailState = ''
      this.setState({ 
        validate,
        erro_email: false,
        validacao_email: false,   
        mensagem_email: ''  
    })                          
    } else if (e.target.value.length > 0 && validate.emailState == 'has-danger') {
    this.setState({ 
      validate,
      erro_email: true,
      validacao_email: false,   
      mensagem_email: 'Email é obrigatório.'  
     })     
    }
     
  } 
  verificaNome() {
    const { validate } = this.state
       if (this.state.campNome.length == 0) {
        validate.nomeState = 'has-danger'
        this.setState({ 
          validate,
          erro_nome: false,
          validacao_nome: false,   
          mensagem_nome: ''  
         })      
       } else {
        validate.nomeState = 'has-success' ;        

        this.setState({ 
          erro_nome: false,
          validacao_nome: true,   
          mensagem_nome: ''
       });  

       }         
   }
  verificaDataNascimento() {
    const { validate } = this.state
       if (this.state.campData_nascimento.length == 0) {
        validate.datanascimentoState = 'has-danger'
        this.setState({ 
          validate,
          erro_datanascimento: false,
          validacao_datanascimento: false,
          mensagem_data_nascimento: ''  
         })      
       } else {

          validate.datanascimentoState = 'has-success' ;        
          this.setState({ 
            erro_datanascimento: false,
            validacao_datanascimento: true,
            mensagem_data_nascimento: ''
          });     

       }        
   }

  validaEmailChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
    [ name ]: value,
    });
    }
    
    busca_email_ja_cadastrado(email) {
      const { validate } = this.state
      api.get(`/login/getEmail/${email}`)
      .then(res=>{          
        console.log(' resultado cliente - '+JSON.stringify(res.data, null, "    "));        
        if (res.data.success) {

            validate.emailState = 'has-danger'
            this.setState({ 
                validate,
                erro_email: true,
                validacao_email: false,
                mensagem_email: 'Email já cadastrado.'  
            })                            
        } else {
          console.log(`valida email - ${email}`);
          api.get(`/emailOperador/getEmail/${email}`)
          .then(response=>{       
            console.log(' resultado - '+JSON.stringify(response.data, null, "    "));        
            console.log(' resultado length - '+JSON.stringify(response.data.data.length, null, "    "));        
              if (response.data.data.length > 0) {                                  
              validate.emailState = '';
              this.setState({      
                  erro_email: true,   
                  validacao_email: false,                             
                  mensagem_email: 'Convite já foi enviado para este email',                    
                  validate,
              });                

              } else {      

                  this.setState({         
                    erro_email: false,   
                    validacao_email: true,    
                    mensagem_email: ''  
                })
              } 
            })        
            .catch(error=>{
              alert("Erro de emailOperador "+error)
            })           
        }        
      })        
      .catch(error=>{
        alert("Erro de login "+error)
      })                   
    }
    
    validateEmail(e) {
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state
      
        if (emailRex.test(e.target.value)) {                         
          this.setState({ 
            erro_email: false,
            validacao_email: true 
          });    
            //console.log(' valida email - '+e.target.value);   
            //console.log(' valida email - '+this.state.campEmail);   
            this.busca_email_ja_cadastrado(e.target.value)                
                    
            
        } else {         
          this.setState({ 
            validate,
            erro_email: false,
            validacao_email: false,
            mensagem_email: '' })  
        }

        this.setState({ validate })
    }       
    
    validaCpfChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.cpfState = ''
          this.setState({ 
            erro_cpf: false,
            validacao_cpf: false,   
            mensagem_cpf: '' 
          })  
        } else if (e.target.value.length == 14) {          
          //valida o cpf 
           console.log('e.target.value - '+e.target.value);
           if (cpf.isValid(e.target.value)) {
               //cpf válido 
               console.log('é valido - '+e.target.value);
               this.busca_cpf(e);// se existir não deixa cadastrar

           } else {
            validate.cpfState = 'has-danger'       
            this.setState({ 
              erro_cpf: true,
              validacao_cpf: false,   
              mensagem_cpf: 'O campo CPF é inválido'
            })     
           } 
        //  this.busca_cpf(e) 
        //  validate.cpfState = 'has-success'       
        //  this.setState({ mensagem_cpf: '' })  
        }  
        this.setState({ validate })
    }
    
    validatelefone1Change(e){
      const { validate } = this.state
       
        if (e.target.value.length == 0) {
          validate.telefone1State = ''
          this.setState({ 
            erro_telefone: false,
            validacao_telefone: false,   
            mensagem_telefone1: '' 
          })  
        } else {          
          
          if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success'       
            this.setState({ 
              erro_telefone: false,
              validacao_telefone: true,   
              mensagem_telefone1: '' 
            })  

            this.setState({ 
              inicio: 2,
              erro_telefone: false,
              validacao_telefone: false,   
              progresso: 25
            });             
          }          
        }  
        this.setState({ validate })
        this.verifica_botao(this.state.inicio)
    }    
    validaNomeChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.nomeState = ''
          this.setState({ 
            erro_nome: false,
            validacao_nome: false,   
            mensagem_nome: ''
          })  
        } else if (e.target.value.length > 0) {      
          validate.nomeState = ''       
          this.setState({ 
            erro_nome: false,
            validacao_nome: false,   
            mensagem_nome: '' 
          })  
        }  
        this.setState({ validate })  
     }  

     validaDataNascimentoChange(e){
      const { validate } = this.state
  
     if (e.target.value.length < 1) {
      validate.datanascimentoState = ''
      this.setState({ 
        erro_datanascimento: false,
        validacao_datanascimento: false,   
        mensagem_data_nascimento: '' 
      })  
    }     

    this.setState({ validate })
}

verifica_botao(inicio) {
  const { validate } = this.state    
  if (inicio == 1) {
    return (
     <div>                  
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal" p={2}>
              <div className="d-flex justify-content-center">
              <label> Salvar Alterações </label>
              </div>     
        </Box>           
    </div>     
    );   
  } else {
  if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
      && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
      && validate.telefone1State == 'has-success') {
        return (    
          <div>                                          
                <Box  bgcolor="error.main" color="error.contrastText" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSave()}>
                  <div className="d-flex justify-content-center">
                        <label> Salvar Alterações </label>                          
                  </div>                    
                </Box>                                                  
          </div>       
        );
      } else {
        return (
          <div>              
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal" p={2}>
                  <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                  </div>     
            </Box>           
          </div>
      );   
      }   
    }      

 
} 
 
 
carrega_status(){ 
   
    api.get('/status/listafiltro')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaStatus:data})
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  loadOperadores(){
   // const url = baseUrl+"/cliente/list"
   api.get(`/operador/listaempresa/`+localStorage.getItem('logid'))
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data       
        this.setState({listOperadores:data})
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }

  sendSave(){        
    const { validate } = this.state;       
    validate.cpfState= '';
    this.setState({ 
       mensagem_aguarde: 'Aguarde, salvando os dados...',       
       validate 
    }); 
    //    console.log('Clicou aqui')

    //  const senhaAleatoria = Math.random().toString(36).slice(-8);     

       const datapost_alterar = {
         nome: this.state.campNome,              
         email: this.state.campEmail,
         celular: this.state.campTelefone1,  
         statusId: this.state.campStatusId,            
         data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),      
         cpf: this.state.campCpf,
         perfilId: 8,
        }  
 
       console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
       api.put(`/operador/update/${localStorage.getItem('logoperadorId')}`, datapost_alterar)
       .then(response=>{
         if (response.data.success==true) {                 
           
          if (this.state.campgerencia_eventos == false) {
            api.delete(`/permissao/deletaFuncionalidade/${localStorage.getItem('logoperadorId')}/8/3`)
           } else {
         
            api.get(`/permissao/getFuncionalidade/${localStorage.getItem('logoperadorId')}/8/3`)
            .then(verificarPermissao=>{

             if (verificarPermissao.data.data.length == 0) {  
                const permissao_acesso = {
                  perfilId: 8,
                  logid: localStorage.getItem('logoperadorId'),
                  funcionalidadeId: 3
                }  

                api.post(`/permissao/create`, permissao_acesso);

              }    

            }).catch(error=>{
                    alert("Erro verificar campgerencia_eventos  "+error)
            })         
           }

           if (this.state.campMonitorar_eventos == false) {
            api.delete(`/permissao/deletaFuncionalidade/${localStorage.getItem('logoperadorId')}/8/4`)
           } else {
            
            api.get(`/permissao/getFuncionalidade/${localStorage.getItem('logoperadorId')}/8/4`)
            .then(verificarPermissao=>{

              if (verificarPermissao.data.data.length == 0) {  
                const permissao_acesso = {
                  perfilId: 8,
                  logid: localStorage.getItem('logoperadorId'),
                  funcionalidadeId: 4
                }  

                api.post(`/permissao/create`, permissao_acesso);

              }    

            }).catch(error=>{
                    alert("Erro verificar campMonitorar_eventos  "+error)
            })         
           }
           if (this.state.camprepresentante_legal == false) {
            api.delete(`/permissao/deletaFuncionalidade/${localStorage.getItem('logoperadorId')}/8/5`)
           } else {
            api.get(`/permissao/getFuncionalidade/${localStorage.getItem('logoperadorId')}/8/5`)
            .then(verificarPermissao=>{

              if (verificarPermissao.data.data.length == 0) {  
                const permissao_acesso = {
                  perfilId: 8,
                  logid: localStorage.getItem('logoperadorId'),
                  funcionalidadeId: 5
                }  

                api.post(`/permissao/create`, permissao_acesso);

              }    

            }).catch(error=>{
                    alert("Erro verificar camprepresentante_legal "+error)
            })  
           }
           
           const logindata = {  
             email: this.state.campEmail,  
             perfilId: 8,
             statusId: this.state.campStatusId
           }
 
           api.put(`/login/update/${localStorage.getItem('logoperadorId')}`,logindata);
 
           this.setState({ 
            mensagem_usuario: 'Operador alterado com sucesso!',       
            validate 
           }); 
            
           this.envia_mensagemClick();

           
          // this.handleCloseModalEdit(); 
         //  localStorage.setItem('lognome', this.state.campNome);             
 
         }           
       }).catch(error=>{
         alert("Erro verificar log  ")
       })           
 
 }  

 opcao_tabChange = (event, newValue) => {   
  this.setState({        
      value: newValue 
  });    
};

  render()
  {
    return (
      <div>    
          <div>
            <Menu_cliente_empresarial />  
            <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <h5> {localStorage.getItem('lograzao_social')} </h5>                                         
                  <div className="titulo_bemvindo"> Operador </div>                     
              </div>      
            </div>
          </div>
     <div className="container-fluid margem_left">          
     <br/>
     <TabContext value={this.state.value} className="tabs_padrao">
            <AppBar position="static" color="transparent">
              <TabList onChange={this.opcao_tabChange} aria-label="simple tabs example">           
                <Tab label="Ativos" value="1" className="tabs_titulo_lista"/>
                <Tab label="Excluidos" value="2" className="tabs_titulo_lista_2"/>            
                <Tab label="Cadastro Incompleto" value="3" className="tabs_titulo_lista_2"/>            
                <Tab label="Convites" value="4" className="tabs_titulo_lista_2"/>              
              </TabList>
            </AppBar>        
          <TabPanel value="1" className="tirar_espaco">  
           <div style={{ maxWidth: '100%' }}>
                    <MaterialTable          
                        title=""
                        style={ {width: "96%"}}                                  
                        columns={[
                          { title: '', field: '#', width: "58px", minWidth: '58px', maxWidth: '58px' },
                          { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px', render: rowData => rowData.status.descricao.substr(0,35) },
                          { title: 'CNPJ', field: 'empresa.cnpj', width: '135px', minWidth: '135px', maxWidth: '135px', render: rowData =>  cnpjMask(rowData.empresa.cnpj) }, 
                          { title: 'Razão Social', field: 'empresa.razao_social', width: '290px', minWidth: '290px', maxWidth: '290px', render: rowData => rowData.empresa.razao_social.substr(0,30) },
                          { title: 'Representante Legal', field: 'nome', width: '200px', minWidth: '200px', maxWidth: '200px', render: rowData => rowData.nome.substr(0,30) },
                          { title: 'Email', field: 'email', width: '260px', minWidth: '260px',  maxWidth: '260px', render: rowData => rowData.email.substr(0,30) }, 
                          { title: 'Telefone', field: 'celular', width: '120px', minWidth: '120px', maxWidth: '120px' },                                                                                                                 
                          { title: '', field: '', align: 'left', width: '150px', lookup: { 1: 'sadas', 2: 'asdas' }, },   
                        ]}
                        data={this.state.listOperadores}   
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir',
                            addTooltip: 'Adicionar Valores Tarifários',
                            deleteTooltip: 'Deletar',
                            editTooltip: 'Editar',
                            editRow: {
                               deleteText: 'Deseja realmente deletar esta linha ?',
                               cancelTooltip: 'Cancelar',
                               saveTooltip: 'Salvar',
                            }
                          },
                          toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'Buscar operador',        
                          },
                          pagination: {
                            labelRowsSelect: 'linhas',
                            labelDisplayedRows: '{count} de {from}-{to}',
                            firstTooltip: 'Primeira página',
                            previousTooltip: 'Página anterior',
                            nextTooltip: 'Próxima página',
                            lastTooltip: 'Última página'
                          },
                          header: {
                            actions: 'Ações',
                          },
                        }}        
                        options={{                          
                          rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                          searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                          //paginationPosition: 'bottom',  
                          searchFieldAlignment: 'left', 
                          exportAllData: true,
                          exportFileName: 'Rel_empresa_operadores_ativos',
                          search: true,     
                          searchFieldVariant: 'outlined', 
                          toolbarButtonAlignment: 'right',           
                          paging: false,      
                          maxBodyHeight: 450,
                          minBodyHeight: 450,   
                         // maxBodyHeight: 400,
                         // resizable: false,
                        //  headerStyle: { position: 'static', top: 0 },      
                        //  cellStyle:{ position: 'fixed' },
                          //headerStyle: { position: 'sticky', top: 0 },
                          /*exportButton: true, */            
                          exportButton: { pdf: true },     
                          actionsColumnIndex: 7,
                          //pageSize: 7,
                          pageSizeOptions: [0],           
                        }}
                        actions={[
                          {             
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (evt, data) => this.handleOpenModalEdit(data)
                          }
                          /*,
                          {
                            icon: 'add',
                            tooltip: 'Adiciona Operadores',
                            isFreeAction: true,
                            onClick: (event) => this.handleOpenModalInclusao()
                          } */
                        ]}
                      />      
            </div>      
      </TabPanel>       
      <TabPanel value="2" className="tirar_espaco">  
      <div style={{ maxWidth: '100%' }}>
                    <MaterialTable          
                        title=""
                        style={ {width: "96%"}}                                  
                        columns={[
                          { title: '', field: '#', width: "58px", minWidth: '58px', maxWidth: '58px' },
                          { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px', render: rowData => rowData.status.descricao.substr(0,35) },
                          { title: 'CNPJ', field: 'empresa.cnpj', width: '135px', minWidth: '135px', maxWidth: '135px', render: rowData =>  cnpjMask(rowData.empresa.cnpj) }, 
                          { title: 'Razão Social', field: 'empresa.razao_social', width: '290px', minWidth: '290px', maxWidth: '290px', render: rowData => rowData.empresa.razao_social.substr(0,30) },
                          { title: 'Representante Legal', field: 'nome', width: '200px', minWidth: '200px', maxWidth: '200px', render: rowData => rowData.nome.substr(0,30) },
                          { title: 'Email', field: 'email', width: '260px', minWidth: '260px',  maxWidth: '260px', render: rowData => rowData.email.substr(0,30) }, 
                          { title: 'Telefone', field: 'celular', width: '120px', minWidth: '120px', maxWidth: '120px' },                                                                                                                 
                          { title: '', field: '', align: 'left', width: '150px', lookup: { 1: 'sadas', 2: 'asdas' }, },   
                        ]}
                        data={this.state.listOperadoresExcluidos}   
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir',
                            addTooltip: 'Adicionar Valores Tarifários',
                            deleteTooltip: 'Deletar',
                            editTooltip: 'Editar',
                            editRow: {
                               deleteText: 'Deseja realmente deletar esta linha ?',
                               cancelTooltip: 'Cancelar',
                               saveTooltip: 'Salvar',
                            }
                          },
                          toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'Buscar operador',        
                          },
                          pagination: {
                            labelRowsSelect: 'linhas',
                            labelDisplayedRows: '{count} de {from}-{to}',
                            firstTooltip: 'Primeira página',
                            previousTooltip: 'Página anterior',
                            nextTooltip: 'Próxima página',
                            lastTooltip: 'Última página'
                          },
                          header: {
                            actions: 'Ações',
                          },
                        }}        
                        options={{
                          rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                           searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_empresa_operadores_excluidos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,          
                              maxBodyHeight: 450,
                              minBodyHeight: 450, 
                            //  maxBodyHeight: 400,
                            //  resizable: false,
                            //  headerStyle: { position: 'static', top: 0 },      
                            //  cellStyle:{ position: 'fixed' },
                              //headerStyle: { position: 'sticky', top: 0 },
                              /*exportButton: true, */            
                              exportButton: { pdf: true },     
                              actionsColumnIndex: 7,
                              //pageSize: 7,
                              pageSizeOptions: [0],           
                        }}
                        actions={[
                          {             
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (evt, data) => this.handleOpenModalEdit(data)
                          }
                          /*,
                          {
                            icon: 'delete',                                                             
                            tooltip: 'Deleta Motorista',          
                            onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                          } */
                        ]}
                      />      
            </div>      
      </TabPanel>  
      <TabPanel value="3" className="tirar_espaco">  
      <div style={{ maxWidth: '100%' }}>
                    <MaterialTable          
                        title=""
                        style={ {width: "96%"}}                                  
                        columns={[
                          { title: '', field: '#', width: "58px", minWidth: '58px', maxWidth: '58px' },
                          { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px', render: rowData => rowData.status.descricao.substr(0,35) },
                          { title: 'CNPJ', field: 'empresa.cnpj', width: '135px', minWidth: '135px', maxWidth: '135px', render: rowData =>  cnpjMask(rowData.empresa.cnpj) }, 
                          { title: 'Razão Social', field: 'empresa.razao_social', width: '290px', minWidth: '290px', maxWidth: '290px', render: rowData => rowData.empresa.razao_social.substr(0,30) },
                          { title: 'Representante Legal', field: 'nome', width: '200px', minWidth: '200px', maxWidth: '200px', render: rowData => rowData.nome.substr(0,30) },
                          { title: 'Email', field: 'email', width: '260px', minWidth: '260px',  maxWidth: '260px', render: rowData => rowData.email.substr(0,30) }, 
                          { title: 'Telefone', field: 'celular', width: '120px', minWidth: '120px', maxWidth: '120px' },                                                                                                                 
                          { title: '', field: '', align: 'left', width: '150px', lookup: { 1: 'sadas', 2: 'asdas' }, },   
                        ]}
                        data={this.state.listOperadoresCadIncompletos}   
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir',
                            addTooltip: 'Adicionar Valores Tarifários',
                            deleteTooltip: 'Deletar',
                            editTooltip: 'Editar',
                            editRow: {
                               deleteText: 'Deseja realmente deletar esta linha ?',
                               cancelTooltip: 'Cancelar',
                               saveTooltip: 'Salvar',
                            }
                          },
                          toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'Buscar operador',        
                          },
                          pagination: {
                            labelRowsSelect: 'linhas',
                            labelDisplayedRows: '{count} de {from}-{to}',
                            firstTooltip: 'Primeira página',
                            previousTooltip: 'Página anterior',
                            nextTooltip: 'Próxima página',
                            lastTooltip: 'Última página'
                          },
                          header: {
                            actions: 'Ações',
                          },
                        }}        
                        options={{
                          rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                          searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_empresa_operadores_excluidos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,          
                              maxBodyHeight: 450,
                              minBodyHeight: 450, 
                            //  maxBodyHeight: 400,
                            //  resizable: false,
                            //  headerStyle: { position: 'static', top: 0 },      
                            //  cellStyle:{ position: 'fixed' },
                              //headerStyle: { position: 'sticky', top: 0 },
                              /*exportButton: true, */            
                              exportButton: { pdf: true },     
                              actionsColumnIndex: 7,
                              //pageSize: 7,
                              pageSizeOptions: [0],           
                        }}
                        actions={[
                          {             
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (evt, data) => this.handleOpenModalEdit(data)
                          },
                          {             
                            icon: 'mail',
                            tooltip: 'Enviar',
                            onClick: (evt, data) => this.onEnvioSenhaEmail(data)
                          },
                          {
                            icon: 'delete',                                                             
                            tooltip: 'Deleta Operador',          
                            onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                          }
                        ]}
                      />      
            </div>      
      </TabPanel>  
      <TabPanel value="4" className="tirar_espaco">  
      <div style={{ maxWidth: '100%' }}>
                    <MaterialTable          
                        title=""
                        style={ {width: "96%"}}                                  
                        columns={[
                          { title: '', field: '#', width: "58px", minWidth: '58px', maxWidth: '58px' },
                          { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px' },               
                          { title: 'Email', field: 'email', width: '400px', minWidth: '400px', maxWidth: '400px' },                 
                          { title: '', field: '#', width: '50px', minWidth: '50px', maxWidth: '50px' },
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },                  
                        ]}
                        data={this.state.listOperadoresConvites}   
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir',
                            addTooltip: 'Adicionar Valores Tarifários',
                            deleteTooltip: 'Deletar',
                            editTooltip: 'Editar',
                            editRow: {
                               deleteText: 'Deseja realmente deletar esta linha ?',
                               cancelTooltip: 'Cancelar',
                               saveTooltip: 'Salvar',
                            }
                          },
                          toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'buscar operador',        
                          },
                          pagination: {
                            labelRowsSelect: 'linhas',
                            labelDisplayedRows: '{count} de {from}-{to}',
                            firstTooltip: 'Primeira página',
                            previousTooltip: 'Página anterior',
                            nextTooltip: 'Próxima página',
                            lastTooltip: 'Última página'
                          },
                          header: {
                            actions: 'Ação',
                          },
                        }}        
                        options={{
                          rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                          searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                          //paginationPosition: 'bottom',  
                          searchFieldAlignment: 'left', 
                          exportAllData: true,
                          exportFileName: 'Rel_adm_operadores_excluidos',
                          search: true,     
                          searchFieldVariant: 'outlined', 
                          toolbarButtonAlignment: 'right',           
                          paging: false,          
                          maxBodyHeight: 450,
                          minBodyHeight: 450,     
                          exportButton: { pdf: true },           
                          actionsColumnIndex: 3,
                          //pageSize: 7,
                          pageSizeOptions: [0],   
                        }}
                        actions={[
                          {             
                            icon: 'mail',
                            tooltip: 'Enviar',
                            onClick: (evt, data) => this.onEnvioEmail(data)
                          },
                          {
                            icon: 'delete',                                                             
                            tooltip: 'Deleta Convite',          
                            onClick: (evt, data) => this.handleOpenModalConviteDelete(data)                                     
                          }
                        ]}
                       /* editable={{                          
                          onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                               // const dataDelete = [...this.state.campId];
                                const index = oldData.id;   
                                console.log(' id - '+ oldData.id);
                               // dataDelete.splice(index, 1);                              
                                resolve()                                
                                this.sendDelete(index)
                              }, 1000)
                            }),
                        }} */
                      />      
            </div>      
      </TabPanel>               
    </TabContext>   
    <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
                            <AddIcon/> <div className="botao_incluir"> Adicionar Operador  </div>
                        </Fab>
                      </div>  
    <ReactModal 
        isOpen={this.state.showModal}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo">  Editar Operador 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalEdit()} className="botao_close_modal">
              <CloseOutlinedIcon />
            </IconButton></div>        

             <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_modal">
                      <div class="p-2">                
                        <div className="descricao_modal_editar">{this.state.campRazao_social}</div>

                        <div className="descricao_modal_editar title_modal_editar">{this.state.campCnpj}</div>
                        <br/>
                              <FormControl variant="outlined" className="buscar_status_modal">
                                    <InputLabel className="buscar_label_status_modal" id="demo-simple-select-outlined-label">Status </InputLabel>
                                    <Select                                                 
                                      autoComplete="off"                     
                                      className="data_modal_text"                                                
                                      labelId="demo-simple-select-outlined-label"
                                      id="busca"
                                      value={this.state.campStatusId}                                    
                                      onChange={ (e) => {
                                        this.statusChange(e)
                                      }}                  
                                      labelWidth={60}          
                                    >                                            
                                      {this.loadStatus()}                    
                                      </Select>
                              </FormControl>                           
                    </div>
                      <div class="p-2">  
                        <div className="sub_titulo_modal_editor"> Operador </div>                
                      <div class="p-2">   
                        <div class="d-flex justify-content-start">
                          <div>     
                              <div className="titulo_modal_editar">CPF</div>             
                              <div className="descricao_modal_editar">{this.state.campCpf}</div> 
                          </div>
                          <div>
                            <div className="titulo_modal_editar">Nome</div>             
                            <div className="descricao_modal_editar">{this.state.campNome}</div> 
                          </div>
                        </div>      
                      </div>                  
                      <div class="p-2">   
                        <div className="titulo_modal_editar">Email</div>             
                        <div className="descricao_modal_editar">{this.state.campEmail}</div> 
                      </div>               
                                                          
                      </div>              
                      <div class="p-2">  
                   <div class="d-flex justify-content-start">
                       <div>   
                          <FormControl variant="outlined" className="posicao_caixa_texto">
                              <InputLabel className="buscar_label_status_modal" 
                                    htmlFor="filled-adornment-password">Data de Nascimento</InputLabel>
                              <OutlinedInput      
                                  autoComplete="off"                    
                                  readOnly={this.state.camp_datanasc_disabled}                     
                                  error={this.state.erro_datanascimento}
                                  helperText={this.state.mensagem_data_nascimento}
                                  className="data_modal_text"                          
                                  id="outlined-basic"                   
                                  variant="outlined"
                                  value={this.state.campData_nascimento}
                                  onBlur={this.verificaDataNascimento}
                                  onChange={ (e) => {
                                    this.data_nascimentochange(e)                       
                                    this.validaDataNascimentoChange(e)
                                  }}                                    
                                  inputProps={{
                                    maxLength: 10,
                                  }}     
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_datanascimento? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={180}                      
                              />
                            <FormHelperText error={this.state.erro_datanascimento}>
                                  {this.state.mensagem_data_nascimento}
                            </FormHelperText>
                          </FormControl>  
                      </div>
                      <div>
                      <FormControl variant="outlined" className="posicao_caixa_texto">
                          <InputLabel className="label_modal_operador" htmlFor="filled-adornment-password">Telefone</InputLabel>
                          <OutlinedInput   
                              autoComplete="off"           
                              readOnly={this.state.camp_telefone_disabled}            
                              error={this.state.erro_telefone}
                              helperText={this.state.mensagem_telefone1}
                              className="input_data_text"                       
                              id="outlined-basic"                   
                              variant="outlined"
                              value={this.state.campTelefone1}                
                              onBlur={this.verificaTelefone1}                            
                              onChange={ (e) => {
                                this.telefone1change(e)                       
                                this.validatelefone1Change(e)
                              }}                                      
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_telefone? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={80}                      
                          />
                        <FormHelperText error={this.state.erro_telefone}>
                              {this.state.mensagem_telefone1}
                        </FormHelperText>
                      </FormControl>        
                      </div>
                  </div>        
              </div>               
              <div className="posicao_1">         
                 <div class="p-2">                        
                  <div className="checkbox_titulo"> Permisões de Acesso </div>
                  </div>
               </div>   
                  <div className="posicao_1">
                          <div class="p-2">                        
                            <div class="d-flex justify-content-start">
                              <div className="coluna_modal_separacao_d"> 
                                  <div className="checkbox_subtitulo">Pemissão de Representante Legal</div> 
                                  <div className="checkbox_descricao">É permitido realizar todas as funcionalidades disponiveis na conta da sua empresa.</div>
                                </div>                               
                              <div className="coluna_modal_separacao_e">                                                  

                              <FormGroup aria-label="position" row>
                                      <FormControlLabel
                                        value={this.state.camprepresentante_legal}
                                        control={<Switch color="primary" checked={this.state.camprepresentante_legal} 
                                            onChange={this.handlerepresentantelegalChange}/>}                                    
                                        labelPlacement="end"
                                      />                       
                              </FormGroup>
                                  
                              </div>
                            </div>     
                          </div>
                          <div class="p-2">                        
                            <div className="d-flex justify-content-start">
                              <div className="coluna_modal_separacao_d"> 
                                  <div className="checkbox_subtitulo">Gerenciar Eventos</div> 
                                  <div className="checkbox_descricao">É permitido criar, alterar, excluir e gerenciar eventos na conta da sua empresa.</div>
                                </div>                               
                              <div className="coluna_modal_separacao_e"> 
                                    <FormGroup aria-label="position" row>
                                      <FormControlLabel
                                        value={this.state.campgerencia_eventos}
                                        control={<Switch color="primary" checked={this.state.campgerencia_eventos} 
                                            onChange={this.handlegerenciaChange}/>}                                    
                                        labelPlacement="end"
                                      />                       
                                    </FormGroup>
                              </div>
                            </div>     
                          </div>
                      <div class="p-2">                        
                        <div class="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d"> 
                               <div className="checkbox_subtitulo">Monitorar Eventos</div> 
                               <div className="checkbox_descricao">É permitido Listar e Monitorar eventos na conta da sua empresa.</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e"> 
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    className="checkbox_esquerdo_operador"
                                    value={this.state.campMonitorar_eventos}
                                    control={<Switch color="primary" checked={this.state.campMonitorar_eventos} 
                                        onChange={this.handlemonitorar_eventosChange}/>}                                    
                                    labelPlacement="end"
                                  />                       
                                </FormGroup>
                           </div>
                        </div>        
                     </div>                
                </div>                           

                      <FormHelperText>
                          {this.state.mensagem_salvo}
                      </FormHelperText>                 
                          
                    </div>                             
                    {this.verifica_botao(this.state.inicio)}            
                 </div>
               </div>
            </div>      
    </ReactModal>  

    <ReactModal 
        isOpen={this.state.showModalInclusao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao">Solicitar Inclusão do operador 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()} className="botao_close_modal_operador">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_modal_motorista">                                   
                      <div class="p-2">   
                      <FormControl variant="outlined">
                          <InputLabel className="label_text" htmlFor="filled-adornment-password">Email</InputLabel>
                          <OutlinedInput    
                              autoComplete="off"                     
                              error={this.state.erro_email}
                              helperText={this.state.mensagem_email}
                              className="data_operador"                       
                              id="outlined-basic"                   
                              variant="outlined"
                              value={this.state.campEmail}                                         
                              onChange={ (e) => {
                                this.emailchange(e) 
                                this.validateEmail(e)
                                this.validaEmailChange(e)                                
                              } }                                   
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_email? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={80}                      
                          />
                        <FormHelperText error={this.state.erro_email}>
                              {this.state.mensagem_email}
                        </FormHelperText>
                      </FormControl>                         
                      </div>
                      <div className="posicao_2">               
                <div class="p-2">                        
                    <div className="checkbox_titulo">Permissões de Acesso </div>
                </div>
              </div>  
               <div className="posicao_2">
                      <div class="p-2">                        
                        <div class="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d"> 
                               <div className="checkbox_subtitulo">Permissão de Representante Legal</div> 
                               <div className="checkbox_descricao">É permitido realizar todas as funcionalidades disponiveis na conta da sua empresa.</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e">                                                  

                           <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value={this.state.camprepresentante_legal}
                                    control={<Switch color="primary" checked={this.state.camprepresentante_legal} 
                                        onChange={this.handlerepresentantelegalChange}/>}                                    
                                    labelPlacement="end"
                                  />                       
                           </FormGroup>
                               
                           </div>
                        </div>     
                      </div>
                      <div class="p-2">                        
                        <div className="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d"> 
                               <div className="checkbox_subtitulo">Gerenciar Eventos</div> 
                               <div className="checkbox_descricao">É permitido criar, alterar, excluir e gerenciar eventos na conta da sua empresa.</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e"> 
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value={this.state.campgerencia_eventos}
                                    control={<Switch color="primary" checked={this.state.campgerencia_eventos} 
                                        onChange={this.handlegerenciaChange}/>}                                    
                                    labelPlacement="end"
                                  />                       
                                </FormGroup>
                           </div>
                        </div>     
                      </div>
                      <div class="p-2">                        
                        <div class="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d"> 
                               <div className="checkbox_subtitulo">Monitorar Eventos</div> 
                               <div className="checkbox_descricao">É permitido Listar e Monitorar eventos na conta da sua empresa.</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e"> 
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    className="checkbox_esquerdo_operador"
                                    value={this.state.campMonitorar_eventos}
                                    control={<Switch color="primary" checked={this.state.campMonitorar_eventos} 
                                        onChange={this.handlemonitorar_eventosChange}/>}                                    
                                    labelPlacement="end"
                                  />                       
                                </FormGroup>
                           </div>
                        </div>                      
                </div>
              </div>      
                    </div>                        
                    {this.enviar_botao_modal(this.state.inicio)}          

                 </div>
               </div>    
            </div>
     </ReactModal>       
     <ReactModal 
              isOpen={this.state.showMensagemDelete}
              style={ConfirmacaodelStyles}
              contentLabel="Inline Styles Modal Example"                                  
              ><div> 
                  <IconButton aria-label="editar" onClick={()=>this.handleCloseModalDelete()} className="botao_close_modal_deletar">
                    <CloseOutlinedIcon />
                  </IconButton></div>       
                  <center><img src="/exclamation.png" /> </center>
                  <div className="container_alterado">              
                    
                  <div className="moldura_modal_delecao">
                          <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Operador? </div>
                    <div>Ao confirmar a exclusão o registro será apagado.  </div>
                  </div>     
                     <div className="retorno">{this.state.retorno}</div>
                  <Box 
                    className="botoes_delete_cancelar_modal" p={2} onClick={()=>this.handleCloseModalDelete()}>
                    <div className="d-flex justify-content-center">
                    <label> Cancelar </label>
                    </div>     
                  </Box>      
                  <Box 
                    className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDelete(this.state.campDeletarId, this.state.campDeletarEmail )}>
                    <div className="d-flex justify-content-center">
                    <label> Excluir </label>
                    </div>     
                  </Box>      

                  </div>
          </ReactModal>  

          <ReactModal 
              isOpen={this.state.showConviteDelete}
              style={ConfirmacaodelStyles}
              contentLabel="Inline Styles Modal Example"                                  
              ><div> 
                  <IconButton aria-label="editar" onClick={()=>this.handleCloseModalConviteDelete()} className="botao_close_modal_deletar">
                    <CloseOutlinedIcon />
                  </IconButton></div>       
                  <center><img src="/exclamation.png" /> </center>
                  <div className="container_alterado">              
                    
                  <div className="moldura_modal_delecao">
                          <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Convite? </div>
                    <div>Ao confirmar a exclusão o registro será apagado.  </div>
                  </div>     
                     <div className="retorno">{this.state.retorno}</div>
                  <Box 
                    className="botoes_delete_cancelar_modal" p={2} onClick={()=>this.handleCloseModalConviteDelete()}>
                    <div className="d-flex justify-content-center">
                    <label> Cancelar </label>
                    </div>     
                  </Box>      
                  <Box 
                    className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDeleteConvite(this.state.campDeletarId)}>
                    <div className="d-flex justify-content-center">
                    <label> Excluir </label>
                    </div>     
                  </Box>      

                  </div>
          </ReactModal>  

     <Snackbar 
          anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}    
          open={this.state.mensagem_alert} 
          autoHideDuration={4000} 
          onClose={this.envia_mensagemInclusaoClose}>
        <Alert onClose={this.envia_mensagemInclusaoClose} severity="success">
               {this.state.mensagem_usuario}
        </Alert>
      </Snackbar>
      <Snackbar 
          anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}    
          open={this.state.mensagem_alert_edicao} 
          autoHideDuration={4000} 
          onClose={this.envia_mensagemClose}>
        <Alert onClose={this.envia_mensagemClose} severity="success">
               {this.state.mensagem_usuario}
        </Alert>
      </Snackbar>
      <Snackbar 
        anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}       
        open={this.state.mensagem_alert_exclusao} 
        autoHideDuration={2000} onClose={this.envia_mensagemExclusaoClose}>
        <Alert onClose={this.envia_mensagemExclusaoClose} severity="error">
               {this.state.mensagem_usuario}
        </Alert>
      </Snackbar>   
      </div>   
    </div>  
    );
  }

  envia_mensagemInclusaoClick = () => {
    this.setState({ 
      mensagem_alert: true      
    });

  }      

  envia_mensagemInclusaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_alert: false      
    });    

    this.handleCloseModalInclusao();      
  };

  envia_mensagemClick = () => {
    this.setState({ 
      mensagem_alert_edicao: true      
    });

  }      

  envia_mensagemClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_alert_edicao: false      
    });    

    this.handleCloseModalEdit();      
  };

  handleOpenModalDelete(data) { 
    this.setState({ 
      showMensagemDelete: true,
      campDeletarId: data.id,      
      campDeletarEmail: data.email,      
      retorno: '',
      campDescricao: '',
      validacao_descricao: false,
    });  
    
    
  }
  
  handleCloseModalDelete() {
    this.setState({ 
      showMensagemDelete: false
    });   


  }


  handleOpenModalConviteDelete(data) { 
    this.setState({ 
      showConviteDelete: true,
      campDeletarId: data.id,      
      retorno: '',
      campDescricao: '',
      validacao_descricao: false,
    });  
    
    
  }
  
  handleCloseModalConviteDelete() {
    this.setState({ 
      showConviteDelete: false
    });   


  }

  envia_mensagemExclusaoClick = () => {
    this.setState({ 
      mensagem_alert_exclusao: true      
    });

  }      

  envia_mensagemExclusaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_alert_exclusao: false,
      listOperadores: [],      
      listOperadoresCadIncompletos: [],
      listOperadoresExcluidos: [],
      listOperadoresConvites: [],
    });   
  
    this.loadOperadores();
    this.loadConvites();
    this.loadOperadoresExcluidos();
    this.loadOperadoresCadIncompletos();
  

  };


  handleOpenModalInclusao () {
    const { validate } = this.state 
    validate.emailState = '';
    this.setState({ 
      showModalInclusao: true,
      campEmail: '',
      campEmailAnterior: '', 
      erro_email: false,   
      validacao_email: false,
      campgerencia_eventos: false, 
      campMonitorar_eventos: false, 
      camprepresentante_legal: false, 
      validate   
    });  
     
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false,
      mensagem_aguarde: '',
      incluir: false,
      listOperadores: [],      
      listOperadoresCadIncompletos: [],
      listOperadoresExcluidos: [],
      listOperadoresConvites: [],
    });   
  


     this.loadOperadores();    
     this.loadOperadoresExcluidos();
     this.loadOperadoresCadIncompletos();
     this.loadConvites();
   
  }
  onIncluir() {
    this.props.history.push(`/incluir_operador/`+localStorage.getItem('logid'));   
  }

  loadFillData(){
    
    return this.state.listOperadores.map((data, index)=>{     
      return(        
        <tr>
          <th>{index + 1}</th>          
          <td>{data.cpf}</td>
          <td>{data.nome}</td>
          <td>{data.email}</td>          
          <td>{data.celular}</td>
          <td><Input                   
                    type="select" 
                    name="select" 
                    className="status_select"
                    id="select" 
                    value={data.status.id}                        
                    onChange={ (e) => {
                      this.statusChange(e, data)                                             
                    }}                                                          >
              {this.loadStatus()}      
              </Input></td>
          <td>
            <div style={{width:"150px"}}>                  
              {'   '}
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data.email, data.id)}>
                <DeleteIcon />
              </IconButton>    
            </div>            
          </td>          
        </tr>
      )
    })
  }
  
  statusChange(e){
  
    this.setState({ campStatusId: e.target.value })
  
  /*  const datapost = {
      statusId: e.target.value     
    }    
    api.put(`/login/update/${data.id}`, datapost)
    
    api.put(`/operador/update/${data.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadOperadores();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
    }) */
  }

  onEnvioSenhaEmail(data) {
    const senhaAleatoria = Math.random().toString(36).slice(-8);
   
    const datapost = {
      logid: data.id, 
      perfilId: 8,
      senha: senhaAleatoria
    }        
   //console.log('cliente id - '+data.id);

   api.put(`/login/update/${data.id}`, datapost)

   const params_email = {    
     email: data.email,                      
     url: `http://www.oser.app.br:21497/login`,        
     texto: `Sr(a) ${data.nome}, termine o seu cadastro acessando o link abaixo \n Sua senha provisória é: ${senhaAleatoria} `, 
   }      

   api.post("/email/send", params_email)    

   this.setState({   
     emailState: '',
     mensagem_usuario: 'Mensagem para operador enviada com sucesso!'
   });               

   this.envia_mensagemClick();          
}


handleOpenModalConviteDelete(data) { 
  this.setState({ 
    showConviteDelete: true,
    campDeletarId: data.id,      
    retorno: '',
    campDescricao: '',
    validacao_descricao: false,
  });  
  
  
}

handleCloseModalConviteDelete() {
  this.setState({ 
    showConviteDelete: false,
    listOperadores: [],      
    listOperadoresCadIncompletos: [],
    listOperadoresExcluidos: [],
    listOperadoresConvites: [],
  });   

  this.loadOperadores();
  this.loadConvites();
  this.loadOperadoresExcluidos();
  this.loadOperadoresCadIncompletos();

}
  
  onEnvioEmail(data) {
    
      api.get(`/emailOperador/getemail/${data.email}`)
      .then(res1=>{   

        const params_email = {    
          email: data.email,                      
          url: `http://www.oser.app.br:21497/operadores_incluir/${res1.data.id}/${data.email}`,        
          texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
        }

        api.post("/email/send", params_email)    

      })
      .catch ( error => {
        alert("Error 325 ")
      })

  }
  
  onDelete(data, id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
      //  this.sendDelete(data, id)
      } 
    })
  }

  sendDelete(id, email){
    // url de backend    
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network

    console.log(`/login/delete/${email}`);
    api.delete(`/login/delete/${email}`)    

    console.log(`/operadorevento/deleteOperadorEvento/${id}`);
    api.delete(`/operadorevento/deleteOperadorEvento/${id}`)  

    console.log(`/operador/delete/${id}`);
    api.delete(`/operador/delete/${id}`)
    .then(response =>{
      if (response.data.success) {       

        this.setState({       
          mensagem_usuario: 'Operador excluído com sucesso!'
         });  

         this.loadOperadores();
         this.loadOperadoresExcluidos();
         this.loadOperadoresCadIncompletos();
         this.loadConvites();  

         this.handleCloseModalDelete();
         this.envia_mensagemExclusaoClick();

      }
    })
    .catch ( error => {
      alert("Error operador delete "+ error)
    })
  }

  sendDeleteConvite(userId){     

    api.delete(`/emailOperador/delete/${userId}`)
    .then(response =>{

      if (response.data.success) {       
        this.setState({       
          mensagem_usuario: 'Convite operador excluído com sucesso!'
         });

         this.loadOperadores();
         this.loadOperadoresExcluidos();
         this.loadOperadoresCadIncompletos();
         this.loadConvites();  

         this.handleCloseModalConviteDelete();
         this.envia_mensagemExclusaoClick();

      } 
    })
    .catch ( error => {
      alert("Error emailOperador/delete ")
    })
  }

}

export default listComponent;
