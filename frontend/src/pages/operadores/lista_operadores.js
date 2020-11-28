import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';
import { Spinner } from 'reactstrap';

//import Switch from 'react-ios-switch';

import ReactModal from 'react-modal';
import MaterialTable from 'material-table';
//import { Tabs, Tab } from 'react-bootstrap';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import { cnpjMask } from '../formatacao/cnpjmask';
//library sweetalert
import Menu_administrador from '../administrador/menu_administrador';
import Swal from 'sweetalert2/dist/sweetalert2.js';
//import 'sweetalert2/src/sweetalert2.scss';
import { dataMask } from '../formatacao/datamask';
import { cepremoveMask } from '../formatacao/cepremovemask';
import { cnpjremoveMask } from '../formatacao/cnpjremovemask';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
//import { useIosSwitchStyles } from '@mui-treasury/styles/switch/ios';
//import { withStyles } from '@material-ui/core/styles';

//import Switch from '@material-ui/core/Switch';
//import { useIosSwitchStyles } from '@mui-treasury/styles/switch/ios';
//import { useLovelySwitchStyles } from '@mui-treasury/styles/switch/lovely';


import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const { cpf } = require('cpf-cnpj-validator');
const { cnpj } = require('cpf-cnpj-validator');
var dateFormat = require('dateformat');
//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
const logid = localStorage.getItem('logid');

//const baseUrl = "http://34.210.56.22:3333";

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
    left                   : '64%',   
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100vh',     
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


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      campCnpj:"",
      mensagem_usuario: '',
      campRazao_social: "",
      campNome_fantasia:"",
      campDeletarId: '',
      campDeletarEmail: '',
      campNome: "",
      campSenha: '',
      campNomeTitulo: '',
      campData_nascimento:"",
      campEmail:"",      
      campEmailAnterior:"",   
      campTelefone1:"",
      campRazao_social: "",
      campStatusId: 0,
      mensagem_alert: false,
      encontrou_cnpj: true,
      campo_cnpj_disabled:false,
      campo_razao_social_disabled:false,
      campo_nome_fantasia_disabled:false,
      campgerencia_eventos: false, 
      campMonitorar_eventos: false, 
      camprepresentante_legal: false, 
      checked: true,
      value: "1",
   /*   campgerenciar_todos_eventos: false, 
      campincluir_alterar_cartao: false, 
      campvisualizar_eventos_servicos: false,
      campincluir_operadores_eventos: false, 
      campincluir_operadores: false, 
      campincluir_eventos_servicos: false,
      campalterar_eventos_servicos: false,
      campexcluir_eventos_servicos: false,
      campemitir_relatorio: false,
      campalterar_endereco_empresa: false,   */            
      camp_cpf_disabled: false,
      camp_nome_disabled: false,
      camp_datanasc_disabled: false,
      camp_email_disabled: true,
      camp_telefone_disabled: false,
      validacao_cnpj: false,
      validacao_razaosocial: false,
      validacao_nomefantasia: false,
      empresaId: 0,
      campCpf:"",           
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',     
      mensagem_razao_social: '',  
      mensagem_nome_fantasia: '',  
      consulta_cnpj:'',  
      erro_cpf: false,
      erro_nome: false,
      erro_datanascimento: false,
      erro_email: false,
      erro_telefone: false,
      erro_cnpj: false,
      erro_razaosocial: false,
      erro_nomefantasia: false,
      validacao_cpf: false,
      validacao_nome: false,
      validacao_datanascimento: false,
      validacao_email: false,
      validacao_telefone: false,    
      showModal: false,
      inicio: 0,
      mensagem: '',
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

    this.cnpjchange = this.cnpjchange.bind(this);     
    this.nomefantasiachange = this.nomefantasiachange.bind(this);      
    this.loadcnpj = this.loadcnpj.bind(this);   
    this.razaosocialchange = this.razaosocialchange.bind(this);   
  
    this.verificanomefantasia = this.verificanomefantasia.bind(this);   
    this.verificacnpj = this.verificacnpj.bind(this);   
    this.verificarazaosocial = this.verificarazaosocial.bind(this);       
    this.verificacnpjonfocus = this.verificacnpjonfocus.bind(this);       

    //this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validatecnpjChange = this.validatecnpjChange.bind(this);   
    this.validatenomefantasiaChange = this.validatenomefantasiaChange.bind(this);   
    this.validaterazaosocialChange = this.validaterazaosocialChange.bind(this); 

    this.verificaSaidacnpj = this.verificaSaidacnpj.bind(this);      

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
    
    /*this.handleincluiCartaoChange = this.handleincluiCartaoChange.bind(this);    
    this.handlevisualizaEventosChange = this.handlevisualizaEventosChange.bind(this);
    this.handleincluiOperadoresChange = this.handleincluiOperadoresChange.bind(this);
    this.handleincluiOperadoresEventosChange = this.handleincluiOperadoresEventosChange.bind(this);
    this.handleincluiEventoServicoChange = this.handleincluiEventoServicoChange.bind(this);
    this.handlealteraEventoServicoChange = this.handlealteraEventoServicoChange.bind(this);
    this.handleexcluiEventoServicoChange = this.handleexcluiEventoServicoChange.bind(this);
    this.handleemiterelatorioChange = this.handleemiterelatorioChange.bind(this);
    this.handlealterarEnderecoEmpresaChange = this.handlealterarEnderecoEmpresaChange.bind(this); */
  }

  componentDidMount(){
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
  
  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <option key={data.descricao} value={data.id}>{data.descricao} </option>
      )
    })     
  
   }
   limpar_cnpj_nao_encontrado() {
    this.setState({      
      campCnpj: "",          
      campRazao_social: "",
      campNome_fantasia:"",      
    });
   }   

   limpar_campos() {
    this.setState({      
        campgerencia_eventos: false, 
        campMonitorar_eventos: false, 
        camprepresentante_legal: false, 
      }); 
   }
 
   loadcnpj(e) {
    const { validate } = this.state
    if (this.state.campCnpj.length > 0) { 
  
      //console.log(' recebe valores - '+JSON.stringify(this.state , null, "    "));                 
  
      //console.log('Consulta CNPJ 1 - '+this.state.campCnpj); 
      //console.log('Consulta CNPJ target - '+e.target.value); 
      console.log('Consulta CNPJ - '+cnpjremoveMask(this.state.campCnpj));   
      //const cnpj_consulta = cnpjremoveMask(this.state.campCnpj);
     let cnpj = `https://cors-anywhere.herokuapp.com/http://www.receitaws.com.br/v1/cnpj/${cnpjremoveMask(this.state.campCnpj)}`;
     //let cnpj = `http://www.receitaws.com.br/v1/cnpj/${cnpjremoveMask(this.state.campCnpj)}`;
      console.log(`campCNPJ - ${cnpj}`);
     // console.log(cnpj);
      api.get(cnpj)
      .then((val)=>{
        if (val.data !== null) {
          console.log('Saida Receita - '+JSON.stringify(val, null, "    "));
  
          if (val.data.situacao == "ATIVA") {
           console.log('SITUACAO - '+ val.data.situacao);       
           console.log(JSON.stringify(val.data , null, "    "));             
  
            let estado = ''
            console.log('val.data.uf - '+val.data.uf)       
           
            if (val.data.uf.length > 0) {
                api.get(`/estado/get/${val.data.uf}`)
                .then(res=>{      
                  estado = res.data.data[0].id                   
                  
                  console.log('UF - '+ estado)
                  
                  this.setState({ 
                    campRazao_social: val.data.nome,              
                    //campEmail: atualiza_email,
                    campNome_fantasia: val.data.fantasia,                                               
                    //campEmailTeste: atualiza_email,
                    campBairro: val.data.bairro,
                    campCidade: val.data.municipio,
                    campEndereco: val.data.logradouro,
                    campComplemento: val.data.complemento,
                    campEstado: estado,
                    campNumero: val.data.numero,
                    campCep: cepremoveMask(val.data.cep),           
                    encontrou_cnpj: true,      
                  });    
  
                  localStorage.setItem('logcepbanco', this.state.campCep);  
                  if (this.state.campCnpj !== "") {
                    validate.cnpjState = 'has-success'      
                  }
                  if (this.state.campRazao_social !== "") {
                    validate.razao_socialState = 'has-success'      
                  }
                  if (this.state.campNome_fantasia !== "") {
                    validate.nome_fantasiaState = 'has-success'      
                  }              
  
                  this.setState({ 
                    validate,              
                    inicio: 2,
                    progresso: 50,
                    erro_cnpj: false,
                    validacao_cnpj: true,        
                    erro_razaosocial:false,
                    validacao_razaosocial: true,                  
                    mensagem_CNPJ: ''                  
                  })   
  
                  if (this.state.campNome_fantasia !== "") {
                    this.setState({ 
                      erro_nomefantasia:false,
                      validacao_nomefantasia: true,
                    });
                  }
                  
                  console.log('campEstado - '+this.state.campEstado)
                })        
                .catch(error=>{
                  alert("Error de conexão  "+error)
                })   
               }
                           
                //console.log('Saida localizacao - '+JSON.stringify(this.state , null, "    "));
          
          } else {
            validate.cnpjState = 'has-danger'
            this.setState({ 
              erro_cnpj: true,
              validacao_cnpj: false,   
              mensagem_CNPJ: 'CNPJ não regular da receita federal', 
              encontrou_cnpj: true 
            })  
          }
        } else {
          validate.cnpjState = 'has-danger'
          this.setState({ 
            erro_cnpj: true,
            validacao_cnpj: false,  
            mensagem_CNPJ: 'CNPJ não encontrado na receita federal', 
            encontrou_cnpj: true  
          })  
        }
       // console.log('callapi: ' + JSON.stringify(val))
      }).catch(error=>{
        validate.cnpjState = 'has-success'
        this.setState({        
            erro_cnpj: false,
            validacao_cnpj: true,     
            mensagem_CNPJ: '',           
            encontrou_cnpj: true  
         })  
      })
       //})
    //.catch((error) => console.log('callapi:'+ JSON.stringify(error)));
    }
   }

   validatecnpjChange(e){
    const { validate } = this.state
    
      console.log('TAMANHO - '+e.target.value.length)
      if (e.target.value.length == 0) {
        validate.cnpjState = ''
        this.setState({ 
           mensagem_CNPJ: '',
           erro_cnpj: false,
           validacao_cnpj: true, 
           encontrou_cnpj: false, 
           inicio: 1           
        })  
      } else if (e.target.value.length == 18) {   
        this.setState({ 
          encontrou_cnpj: false 
        })
        if (e.key !== 'Enter') {
          ///validate.cnpjState = ''
            this.setState({ 
            mensagem_CNPJ: '',
            inicio: 2           
            })  
            console.log(' verifica '+e.target.value)                 
            // verifica se é um número válido
            if (cnpj.isValid(e.target.value)) {
                //cnpj válido   
                console.log(' CNPJ VALIDO '+e.target.value)            
                this.verifica_cnpj(e)

            } else {
              console.log(' CNPJ INVALIDO '+e.target.value)
              validate.cnpjState = 'has-danger'
              this.setState({ 
                erro_cnpj: true,
                validacao_cnpj: false,      
                mensagem_CNPJ: 'O campo CNPJ é inválido.',
                encontrou_cnpj: true, 
                inicio: 1           
                })                                         
            }                     
        }  
      }  
        
      this.setState({ validate })
  }

  validatenomefantasiaChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.nome_fantasiaState = ''
        this.setState({ 
          inicio:1,
          mensagem_nome_fantasia: '' 
        })  
      } else {
        validate.nome_fantasiaState = ''       
        this.setState({           
          inicio: 2
        })
       // this.verifica_botao(this.state.inicio)
      }  
      this.setState({ validate })
  } 
  validaterazaosocialChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.razao_socialState = 'has-danger'
        this.setState({ 
          erro_razaosocial: true,
          validacao_razaosocial: false,
          mensagem_razao_social: 'O campo Razão Social é obrigatório.' 
        })  
      } else if (e.target.value.length > 0) {
        validate.razao_socialState = 'has-success'        
        this.setState({ 
          erro_razaosocial: false,
          validacao_razaosocial: true,
          mensagem_razao_social: '' 
        })  
      }  
      this.setState({ validate })
  }
   carrega_status(){ 
   
    api.get('/status/listafiltro')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaStatus:data})
      }
      else {
        alert("Erro de conexão")
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

   // console.log('evento - '+JSON.stringify(event.target.value, null, "    "));     
    this.setState({ 
      camprepresentante_legal: event.target.checked
    }); 
  };
  /*
  handleincluiOperadoresChange = (event) => {
    this.setState({ 
      campincluir_operadores: event.target.checked
    });
  };
  
  handleincluiOperadoresEventosChange = (event) => {
    this.setState({ 
      campincluir_operadores_eventos: event.target.checked
    });
  };

  handlevisualizaEventosChange = (event) => {
    this.setState({ 
      campvisualizar_eventos_servicos: event.target.checked
    });
  };
  handleincluiEventoServicoChange = (event) => {
    this.setState({ 
      campincluir_eventos_servicos: event.target.checked
    });
  };
  handlealteraEventoServicoChange = (event) => {
    this.setState({ 
      campalterar_eventos_servicos: event.target.checked
    });
  };
  handleexcluiEventoServicoChange = (event) => {
    this.setState({ 
      campexcluir_eventos_servicos: event.target.checked
    });
  };
  handleemiterelatorioChange = (event) => {
    this.setState({ 
      campemitir_relatorio: event.target.checked
    });
  };
  handlealterarEnderecoEmpresaChange = (event) => {
    this.setState({ 
      campalterar_endereco_empresa: event.target.checked
    });
  };
*/
  verifica_cnpj(e) {
    const { validate } = this.state
    //console.log(`/empresa/getbuscaempresacnpj/${cnpjremoveMask(e.target.value)}`)         
    //let userId = this.props.match.params.id;  
   api.get(`/empresa/getbuscaempresacnpj/${cnpjremoveMask(e.target.value)}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {  
          
          validate.cnpjState = 'has-has-success' 
          this.setState({ 
            campRazao_social: res.data.data[0].razao_social,              
            inicio: 1,    
            erro_cnpj: false,
            validacao_cnpj: true,              
          })           
          
        }
         else {
          //console.log('nao encontrou base '+JSON.stringify(res.data, null, "    ")); 
          //this.loadcnpj(e)
          this.setState({ 
            validate,
            erro_cnpj: true,
            validacao_cnpj: false,          
            mensagem_CNPJ: 'Empresa não cadastrada' 
         })

        } 
      })        
      .catch(error=>{
        alert("Error de conexão cliente/get "+error)
      })   
    }
   
  verifica_base_cnpj(e) {
    const { validate } = this.state
   // console.log('verifica_base_cnpj cnpj - '+cnpjremoveMask(e.target.value))         
    //let userId = this.props.match.params.id;  
    api.get(`/empresa/getEmpresaCnpj/${cnpjremoveMask(e.target.value)}/${localStorage.getItem('logcpfrep')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
  
          validate.cnpjState = 'has-danger' 
          this.setState({ 
            inicio: 1,    
            erro_cnpj: true,
            validacao_cnpj: false,     
            mensagem_CNPJ: 'O campo CNPJ já cadastrado.' 
          }) 
          
          this.setState({ 
             validate,
             erro_cnpj: false,
             validacao_cnpj: true, 
             encontrou_cnpj: true 
          })
        } else {
          console.log('nao encontrou base '+JSON.stringify(res.data, null, "    ")); 
          this.loadcnpj(e)
        }
      })        
      .catch(error=>{
        alert("Error de conexão cliente/get "+error)
      })   
    }

  verificaSaidacnpj(e) {
    const { validate } = this.state
      
      if (e.target.value.trim().length == 0) {      

        this.setState({ 
          validate,
          inicio: 1,  
          encontrou_cnpj: true, 
          erro_cnpj: false,
          validacao_cnpj: false,          
          mensagem_CNPJ: ''  
         })        
         
      } 
   }

   verificacnpjonfocus(e) {
    const { validate } = this.state         
       if (e.target.value.trim().length == 0){
          this.limpar_cnpj_nao_encontrado()
          validate.nome_fantasiaState = ''     
          validate.razao_socialState = ''
            validate.cnpjState = ''
            this.setState({ 
              validate,
              erro_cnpj: false,
              validacao_cnpj: false,    
              encontrou_cnpj: true, 
              campRazao_social: '',
              campNome_fantasia:'',
              campCnpj:'',
              mensagem_CNPJ: '',
              inicio: 1           
              })                                         
        } 
   }
   verificacnpj(e) {
    const { validate } = this.state         
        if (e.target.value.trim().length == 0) {
          validate.nome_fantasiaState = ''     
          validate.razao_socialState = ''
          this.setState({ 
            validate,
            erro_cnpj: false,
            validacao_cnpj: false,  
            encontrou_cnpj: true, 
            campRazao_social: '',
            campNome_fantasia:'',
            campCnpj:'',
            mensagem_CNPJ: '',
            inicio: 1           
            })     
        } else if (e.target.value.length == 18) {   
              this.setState({ 
                encontrou_cnpj: false 
              })       
                ///validate.cnpjState = ''
                  this.setState({ 
                  mensagem_CNPJ: '',
                  inicio: 2,
                  erro_cnpj: false,
                  validacao_cnpj: true,        
                  encontrou_cnpj: true, 
                  progresso: 70           
                  })  
                  console.log(' verifica '+e.target.value)                 
                  // verifica se é um número válido
                  if (cnpj.isValid(e.target.value)) {
                      //cnpj válido   
                      console.log(' CNPJ VALIDO '+e.target.value)            
                      this.verifica_cnpj(e)
      
                  } else {
                    console.log(' CNPJ INVALIDO '+e.target.value)
                    validate.cnpjState = 'has-danger'
                    this.setState({ 
                      erro_cnpj: true,
                      validacao_cnpj: false,            
                      mensagem_CNPJ: 'O campo CNPJ é inválido.',
                      encontrou_cnpj: true, 
                      inicio: 1           
                      })                                         
                  }                                 
                  this.setState({ validate })    
            }         
   }
  
  verificarazaosocial(e) {
    const { validate } = this.state      
       
       if (e.target.value.length == 0) {
  
        validate.razao_socialState = 'has-danger'
        this.setState({ 
          validate,
          erro_razaosocial: true,
          validacao_razaosocial: false,
          inicio: 1,      
          mensagem_razao_social: 'O campo Razão Social é obrigatório'  
         })      
       } else {
        this.setState({ 
          inicio: 2,      
          erro_razaosocial: false,
          validacao_razaosocial: true,
       });  

       }    
   }
  
  verificanomefantasia(e) {
    const { validate } = this.state
      
       if (e.target.value.length == 0) {  
        this.setState({ 
          inicio: 2,   
       });  
       } else if (e.target.value.length > 0)  {
        validate.nome_fantasiaState = 'has-success'
        this.setState({ 
          validate,          
          erro_cnpj: false,
          validacao_cnpj: true,
          inicio: 2,      
          //mensagem_razao_social: 'wqqwqweqe'  
          //mensagem_razao_social: 'O campo Razão Social é obrigatório'  
         })                    

       }    
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
                 mensagem_cpf: 'Operador já cadastrado nesta empresa como representante legal'  
             });
             this.state.incluir= false
 
             this.setState({ validate })
           } else {
               validate.cpfState = 'has-success'
               this.setState({ 
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

   sendteste(){        


    this.setState({   
        mensagem_usuario: 'Mensagem Enviada com sucesso'
    });          

    this.envia_mensagemClick();      

   } 

   sendEnvioEmail(){      
    
    const { validate } = this.state;       
    validate.cpfState= '';
    console.log(`busca operador CNPJ - ${cnpjremoveMask(this.state.campCnpj)}`);
    
    this.setState({ 
       validacao_email: false,
       mensagem_aguarde: 'Aguarde, enviando email  ssdasadd...',       
       validate 
    }); 
    
    const email_envio = this.state.campEmail; 

        console.log(`/empresa/getbuscaempresacnpj/${cnpjremoveMask(this.state.campCnpj)}`);
        


          api.get(`/empresa/getbuscaempresacnpj/${cnpjremoveMask(this.state.campCnpj)}`)
          .then(respempresa=>{
         // console.log(' resultado empresa 2 - '+JSON.stringify(respempresa.data, null, "    "));        
            if (respempresa.data.success==true) {     
      
                  const operadordata = {  
                    email: this.state.campEmail,    
                    empresaId: respempresa.data.data[0].id,     
                    perfilId: 1,
                    statusId: 8,
                    gerenciar_eventos: this.state.campgerencia_eventos, 
                    monitorar_eventos: this.state.campMonitorar_eventos,   
                    representante_legal: this.state.camprepresentante_legal,             
                  }    
                  
                  api.get(`/emailOperador/getemail/${this.state.campEmail}`)
                  .then(res1=>{             
                
                    if (res1.data.data.length == 0) {                

                      api.post(`/emailOperador/create`, operadordata)
                      .then(resemail=>{   

                       if (resemail.data.success == true) {    
                              const params_email = {    
                                email: email_envio,            
                                url: `http://www.oser.app.br:21497/operadores_incluir/${resemail.data.data.id}/${resemail.data.data.email}`,     
                                //url: `http://localhost:3000/operadores_incluir/${res1.data.data.id}/${res1.data.data.email}`,     
                                texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
                              }      
                                
                              api.post("/email/send", params_email)       
                                      
                              this.setState({   
                                emailState: '',
                                mensagem_usuario: 'Mensagem para operador enviada com sucesso!'
                              });          

              
                              this.verifica_botao(1);

                              this.envia_mensagemInclusaoClick();                       
                         }   
                       
                      })        
                      .catch(error=>{
                        alert("Erro de conexão "+error)
                      })  
                
                    }
                  
                  })        
                  .catch(error=>{
                    alert("Erro de conexão "+error)
                  })  
            }
      
          })        
          .catch(error=>{
            alert("Erro de conexão "+error)
          })          
/*
      }

    })        
    .catch(error=>{
      alert("Erro de conexão "+error)
    })    */

    
   
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

  enviar_botao_modal(inicio) {
    const { validate } = this.state 
     console.log(JSON.stringify(this.state, null, "    "));
     // console.log(JSON.stringify(inicio, null, "    "));

     if (inicio == 1) {
  
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Enviar </label>
                </div>     
          </Box>           
      );   
       
      } else {

        if (this.state.validacao_email == true && this.state.validacao_cnpj == true) { 
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
   handleOpenModalEdit(data) {
    this.setState({ 
      showModal: true,            
      mensagem_aguarde: '',
      campEmail: '',
      campCnpj: '',
      Email: '',
      erro_email: false,
      validacao_email: false, 
      campgerencia_eventos: false,
      camprepresentante_legal: false,
      campMonitorar_eventos: false,
    });     

    if (localStorage.getItem('logperfil') == 1) {
      this.setState({ 
        camp_cpf_disabled: true,
        camp_nome_disabled: true,
        camp_datanasc_disabled: false,
        camp_email_disabled: true,
        camp_telefone_disabled: false,
      });
    }

    console.log('buscar_operador '+data.id);
    localStorage.setItem('logoperadorId', data.id);    
    this.busca_operador();      

   // this.prepareSave();
  }  
  busca_operador() {
    const { validate } = this.state
    console.log('busca operador ID '+localStorage.getItem('logoperadorId'));
  //  console.log('busca perfil operador state - '+localStorage.getItem('logperfil'));   
    api.get(`/operador/get/${localStorage.getItem('logoperadorId')}`)
    .then(res=>{
      //  console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {     
          
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

          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campCnpj: cnpjMask(res.data.data[0].empresa.cnpj),
            campRazao_social: res.data.data[0].empresa.razao_social,
            campNome: res.data.data[0].nome,
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
          })                        
         
         // console.log('Buscar operador - '+JSON.stringify(this.state, null, "    ")); 
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
  handleCloseModalEdit() {
    this.setState({ 
      showModal: false,  
      campStatusId: 0,  
    });
    localStorage.setItem('logeditid', '');
    
    this.loadOperadores();
    this.loadConvites();
    this.loadOperadoresExcluidos();
    
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
        validate.cpfState = 'has-danger'
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
       if (e.target.value.length == 0) {        
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
        this.setState({ 
          validate,
          inicio: 1,
          erro_telefone: false,
          validacao_telefone: false,
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
        validate.nomeState = ''
        this.setState({ 
          validate,
          erro_nome: false,
          validacao_nome: false,
          mensagem_nome: ''  
         })      
       } else {
        validate.nomeState = 'has-success';        

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
       // console.log(' resultado motorista - '+JSON.stringify(res.data, null, "    "));        
        if (res.data.success) {
  
                validate.emailState = 'has-danger'
                  this.setState({ 
                    validate,
                    erro_email: true,   
                    validacao_email: false,    
                    mensagem_email: 'Email já cadastrado.'  
                })                                           
         } else {
          validate.emailState = 'has-success'
          this.setState({ 
              validate,
              erro_email: false,   
              inicio: 2,
              validacao_email: true,    
              mensagem_email: ''  
          })                   
         }     
      })        
      .catch(error=>{
        alert("Erro de conexão 3"+error)
      })                   
    }
    
    validateEmail(e) {
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state
       
      if (emailRex.test(e.target.value)) {                         
          validate.emailState = 'has-success'     
         // console.log(' valida email - '+e.target.value);   
          //console.log(' valida email - '+this.state.campEmail);   
          this.busca_email_ja_cadastrado(e.target.value) 
          
      } else {
        validate.emailState = 'has-danger'
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
              validacao_telefone: false,
              mensagem_telefone1: '' 
            })  

            this.setState({ 
              erro_telefone: false,
              validacao_telefone: false,
              inicio: 2,
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
      this.setState({ 
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

  loadOperadores(){
   // const url = baseUrl+"/cliente/list"
   api.get('/operador/list')
    .then(res=>{
      if (res.data.success) {

        const data = res.data.data       
        this.setState({listOperadores:data})

        //console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  loadOperadoresExcluidos(){
    // const url = baseUrl+"/cliente/list"
    api.get('/operador/listExcluidos')
     .then(res=>{
       if (res.data.success) {
 
         const data = res.data.data       
         this.setState({listOperadoresExcluidos:data})
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
         this.setState({listOperadoresCadIncompletos:data})
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }

   loadConvites(){
    // const url = baseUrl+"/cliente/list"
    api.get(`/emailOperador/listAdministrador`)
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
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }

  sendSave(){        
    const { validate } = this.state    
    this.setState({ 
      validacao_email: false,
      mensagem_aguarde: 'Aguarde, Incluindo os dados...',       
      validate 
   }); 
//    console.log('clicou aqui ');
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
 
      // console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
       console.log('logoperador - '+localStorage.getItem('logoperadorId'));
       api.put(`/operador/update/${localStorage.getItem('logoperadorId')}`, datapost_alterar)
       .then(response=>{
         console.log('response - '+JSON.stringify(response.data, null, "    ")); 

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
           validate.cpfState = ''
           
           this.setState({   
            emailState: '',
            mensagem_usuario: 'Operador alterado com sucesso!',
            validate
          });          

           this.envia_mensagemClick(); 

         }
         else {
 //console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
           alert("Error na Criação verificar log")              
         }           
       }).catch(error=>{
         alert("Erro verificar log  ")
       })           
 
 }  
 cnpjchange(e) {
  this.setState({ campCnpj: cnpjMask(e.target.value) })

}
razaosocialchange(e) {
  this.setState({ campRazao_social: e.target.value })
}
nomefantasiachange(e) {
  this.setState({ campNome_fantasia: e.target.value })
}
analisando_retorno() {

  if (this.state.encontrou_cnpj !== true) {    
    return (
        <Spinner color="info" />                          
    );
  }
}

mostrar_razao_social() {

  if (this.state.campRazao_social !== "") {
  return (
    <div>         
        <div className="descricao_endereco_endereço">
        <div className="cnpj_altura"> {this.state.campRazao_social} </div><br/>               
        </div> 
    </div>     
  );

  } else {
    return (
      ""
    );
  }
}

mostrar_endereco() {

  if (this.state.campEndereco !== "") {
  return (    
     <div> 
        <div className="titulo_modal_editar">Endereço</div>             
        <div className="descricao_modal_endereço">
          {this.state.campEndereco} <br/>
          {this.state.campBairro+' , '+this.state.campCidade+' / '+this.state.estado_selecionado} 
        </div> 
    </div>            
  );

  } else {
    return (
      ""
    );
  }
}

opcao_tabChange = (event, newValue) => {   
  this.setState({        
      value: newValue 
  });    
};

  render()
  {
   // const iosStyles = useIosSwitchStyles();
    return (
      <div>    
          <div>
            <Menu_administrador />  
            <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">   
              <div className="ajustar_top">
            <div class="row">              
              <div className="col mr-auto div1 titulo_bemvindo">Operador</div>
            </div>
          </div>               
            
            </div>      
            </div>

          </div>

    <div className="margem_left">       
    
    <div className="container-fluid">      
   
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
              <div>
                    <MaterialTable          
                        title=""
                                                    
                        columns={[
                          { title: '', field: '#', width: "58px", minWidth: '58px', maxWidth: '58px' },
                          { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px', render: rowData => rowData.status.descricao.substr(0,35) },
                          { title: 'CNPJ', field: 'empresa.cnpj', width: '135px', minWidth: '135px', maxWidth: '135px', render: rowData =>  cnpjMask(rowData.empresa.cnpj) }, 
                          { title: 'Razão Social', field: 'empresa.razao_social', width: '290px', minWidth: '290px', maxWidth: '290px', render: rowData => rowData.empresa.razao_social.substr(0,30) },
                          { title: 'Representante Legal', field: 'nome', width: '200px', minWidth: '200px', maxWidth: '200px', render: rowData => rowData.nome.substr(0,30) },
                          { title: 'Email', field: 'email', width: '260px', minWidth: '200px',  maxWidth: '200px', render: rowData => rowData.email.substr(0,30) }, 
                          { title: 'Telefone', field: 'celular', width: '120px', minWidth: '120px', maxWidth: '120px' },                                                                                                                 
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },                        
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
                            searchPlaceholder: 'Buscar operadores',        
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
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_empresas',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,          
                              maxBodyHeight: '59vh',
                              minBodyHeight: '59vh',   
                              padding: 'dense',   
                              overflowY: 'scroll',                             
                           //   tableLayout: 'fixed',   
                              actionsColumnIndex: 7,
                              exportButton: { pdf: true },          
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
                            //onClick: (event) => this.sendteste()
                            onClick: (event) => this.handleOpenModalInclusao()
                          } */
                        ]}                       
                      />      
            </div>      
      </TabPanel>       
      <TabPanel value="2" className="tirar_espaco">      
      <div>
                    <MaterialTable          
                        title=""
                                              
                        columns={[
                          { title: '', field: '#', width: "58px", minWidth: '58px', maxWidth: '58px' },
                          { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px', render: rowData => rowData.status.descricao.substr(0,35) },
                          { title: 'CNPJ', field: 'empresa.cnpj', width: '135px', minWidth: '135px', maxWidth: '135px', render: rowData =>  cnpjMask(rowData.empresa.cnpj) }, 
                          { title: 'Razão Social', field: 'empresa.razao_social', width: '290px', minWidth: '290px', maxWidth: '290px', render: rowData => rowData.empresa.razao_social.substr(0,30) },
                          { title: 'Representante Legal', field: 'nome', width: '200px', minWidth: '200px', maxWidth: '200px', render: rowData => rowData.nome.substr(0,30) },
                          { title: 'Email', field: 'email', width: '260px', minWidth: '200px',  maxWidth: '200px', render: rowData => rowData.email.substr(0,30) }, 
                          { title: 'Telefone', field: 'celular', width: '120px', minWidth: '120px', maxWidth: '120px' },                                                                                                                 
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },        
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
                            searchPlaceholder: 'Buscar operadores',        
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
                          searchFieldAlignment: 'left', 
                          exportAllData: true,
                          exportFileName: 'Rel_adm_empresas',
                          search: true,     
                          searchFieldVariant: 'outlined', 
                          toolbarButtonAlignment: 'right',           
                          paging: false,          
                          maxBodyHeight: '59vh',
                          minBodyHeight: '59vh',   
                          padding: 'dense',   
                          overflowY: 'scroll',
                        //  tableLayout: 'fixed',   
                          actionsColumnIndex: 7,
                          exportButton: { pdf: true },          
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
                            tooltip: 'Deleta Operador',          
                            onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                          }
                          */
                        ]}
                      />      
            </div>      
      </TabPanel>  
      <TabPanel value="3" className="tirar_espaco">      
      <div>
                    <MaterialTable          
                        title=""
                                              
                        columns={[
                          { title: '', field: '#', width: "58px", minWidth: '58px', maxWidth: '58px' },
                          { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px', render: rowData => rowData.status.descricao.substr(0,35) },
                          { title: 'CNPJ', field: 'empresa.cnpj', width: '135px', minWidth: '135px', maxWidth: '135px', render: rowData =>  cnpjMask(rowData.empresa.cnpj) }, 
                          { title: 'Razão Social', field: 'empresa.razao_social', width: '290px', minWidth: '290px', maxWidth: '290px', render: rowData => rowData.empresa.razao_social.substr(0,30) },
                          { title: 'Representante Legal', field: 'nome', width: '200px', minWidth: '200px', maxWidth: '200px', render: rowData => rowData.nome.substr(0,30) },
                          { title: 'Email', field: 'email', width: '260px', minWidth: '200px',  maxWidth: '200px', render: rowData => rowData.email.substr(0,30) }, 
                          { title: 'Telefone', field: 'celular', width: '120px', minWidth: '120px', maxWidth: '120px' },                                                                                                                 
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },                                         
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
                            searchPlaceholder: 'Buscar operadores',        
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
                          searchFieldAlignment: 'left', 
                          exportAllData: true,
                          exportFileName: 'Rel_adm_empresas',
                          search: true,     
                          searchFieldVariant: 'outlined', 
                          toolbarButtonAlignment: 'right',           
                          paging: false,          
                          maxBodyHeight: '59vh',
                          minBodyHeight: '59vh',   
                          padding: 'dense',   
                          overflowY: 'scroll',
                         // tableLayout: 'fixed',   
                          actionsColumnIndex: 7,
                          exportButton: { pdf: true },          
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
      <div>
                    <MaterialTable          
                        title=""
                                                     
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
                          maxBodyHeight: '59vh',
                          minBodyHeight: '59vh',    
                          padding: 'dense',   
                          overflowY: 'scroll',                
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
                        }}*/
                      />      
            </div>      
      </TabPanel>                  
    </TabContext>   
    <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize',  outline: 'none'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
                            <AddIcon/> <div className="botao_incluir"> Adicionar Operador  </div>
                        </Fab>
                      </div>    

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
                    className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDelete(this.state.campDeletarId, this.state.campDeletarEmail)}>
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
                          <InputLabel className="label_telefone_modal_operador" htmlFor="filled-adornment-password">Telefone</InputLabel>
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
                    <div className="checkbox_titulo">Permissões de Acesso </div>
                </div>
              </div>  
               <div className="posicao_1">
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
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">CNPJ</InputLabel>
                     <OutlinedInput 
                        autoComplete="off"                                   
                        type="text"                                           
                        error={this.state.erro_cnpj}
                        helperText={this.state.mensagem_CNPJ}
                        className="data_text"                  
                        id="cnpj"                      
                        variant="outlined"
                        value={this.state.campCnpj}
                        onKeyUp={this.verificacnpj}                
                        onFocus={this.verificacnpjonfocus}
                        onBlur={this.verificaSaidacnpj}
                        onChange={ (e) => {
                          this.cnpjchange(e)                                        
                          this.validatecnpjChange(e)
                        }}                        
                        inputProps={{
                          maxLength: 18,
                        }}                            
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_cnpj? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}
                    />             
                  { this.analisando_retorno() }    
                   <FormHelperText error={this.state.erro_cnpj}>
                         {this.state.mensagem_CNPJ}
                   </FormHelperText>
                  </FormControl>   
              </div>     
              <div class="p-2">                                
                  <div>
                      {this.mostrar_razao_social()}                      
                  </div>               
              </div> 
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
                    <div className="checkbox_titulo">Permisões de Acesso </div>
                </div>
              </div>  
               <div className="posicao_2">
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
                                         
                    </div>       
                    {this.enviar_botao_modal(this.state.inicio)}          

                 </div>
               </div>    
            </div>
     </ReactModal>       
       <Snackbar 
       anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}       
       open={this.state.mensagem_alert}      
       autoHideDuration={2000} onClose={this.envia_mensagemInclusaoClose}>
        <Alert onClose={this.envia_mensagemInclusaoClose} severity="success">
               {this.state.mensagem_usuario}
        </Alert>
      </Snackbar>

      <Snackbar 
       anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}       
       open={this.state.mensagem_alert_edicao}      
       autoHideDuration={2000} onClose={this.envia_mensagemClose}>
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
      mensagem_alert: false,      
      listOperadores: [],      
      listOperadoresCadIncompletos: [],
      listOperadoresExcluidos: [],
      listOperadoresConvites: [],
    });   
  
    this.loadOperadores();
    this.loadConvites();
    this.loadOperadoresExcluidos();
    this.loadOperadoresCadIncompletos();

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
      mensagem_alert_edicao: false,
      listOperadores: [],      
      listOperadoresCadIncompletos: [],
      listOperadoresExcluidos: [],
      listOperadoresConvites: [],
    });   
  
    this.loadOperadores();
    this.loadConvites();
    this.loadOperadoresExcluidos();
    this.loadOperadoresCadIncompletos();

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
    
    console.log('delete OPERADOR - '+JSON.stringify(data, null, "    ")); 

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


  onIncluir() {      
    this.props.history.push(`/incluir_operador/`+localStorage.getItem('logid'));   
  }
 
  handleOpenModalInclusao () {
    this.setState({ 
      showModalInclusao: true,
      erro_email: false,
      validacao_email: false,
      validacao_cnpj: false,
      campgerencia_eventos: false, 
      campMonitorar_eventos: false, 
      camprepresentante_legal: false, 
      campEmail: '',    
      campRazao_social: '',
      campCnpj: '',      
    });  
     this.limpar_campos();    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false,
      incluir: false,
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

  onEnvioEmail(data) {
    
    api.get(`/emailOperador/getemail/${data.email}`)
    .then(res1=>{   

      const params_email = {    
        email: data.email,                      
        //url: `http://www.oser.app.br:21497/operadores_incluir/${data.id}/${data.email}`,        
        url: `http://localhost:3000/operadores_incluir/${data.id}/${data.email}`,        
        texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
      }

      api.post("/email/send", params_email)    

      this.setState({   
        emailState: '',
        mensagem_usuario: 'Mensagem Enviada com sucesso'
      });               

      this.envia_mensagemInclusaoClick();         


    })
    .catch ( error => {
      alert("Error 325 ")
    })

}


  onSenha(data) {
    
    const params_email = {    
      email: data.email,                      
      url: `http://www.oser.app.br:21497/operadores_incluir/${localStorage.getItem('logid')}/${data.email}`,        
      texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
    }
    
    api.post("/email/send", params_email)       

  //  alert('Mensagem Enviada');

  }

  statusChange(e, data){
    this.setState({ campStatusId: e.target.value })
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
        this.sendDelete(data, id)
      } 
    })
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

  sendDelete(id, email){
    // url de backend    
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/login/delete/${email}`)    

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
      alert("Error operador delete ")
    })
  }

  sendDeleteConvite(userId){     

    console.log(`/emailOperador/delete/${userId}`);
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
