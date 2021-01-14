import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';
import { Alert, Input, CardBody } from 'reactstrap';
import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import { cnpjMask } from '../formatacao/cnpjmask';
import { cepMask } from '../formatacao/cepmask';
import { numeroMask } from '../formatacao/numeromask';
import { dataMask } from '../formatacao/datamask';
import { cnpjremoveMask } from '../formatacao/cnpjremovemask';

import ReactModal from 'react-modal';
import Box from '@material-ui/core/Box';

import { Link } from "react-router-dom";
//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Data } from '@react-google-maps/api';

import MaterialTable from 'material-table';
import { Tabs, Tab } from 'react-bootstrap';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const buscadorcep = require('buscadorcep');
var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
//import { Alert } from 'reactstrap';
const nome = sessionStorage.getItem('lognome');  
const perfil = sessionStorage.getItem('logperfil');
//const baseUrl = "http://34.210.56.22:3333";

/*
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

*/

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
    left                   : '60%',    
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

/*
let columns = [
  { id: '1', label: '', minWidth: 80, align: 'left' },
  { id: 'status', label: 'Status', minWidth: 80, align: 'left' },
  { id: 'cnpj', label: 'CNPJ', minWidth: 100, align: 'left'},
  { id: 'nome', label: 'Razão Social', minWidth: 200, align: 'left' },  
  { id: 'representante', label: 'Representante Legal', minWidth: 60, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 90, align: 'left' },
  { id: 'acao', label: '', minWidth: 100, align: 'left' },
];
*/

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      inicio: 0,
      mensagem: '',
      campNome: "",
      campStatusId: 0,
      campData_nascimento:"",
      campbuscacliente: "",
      campEmail:"",      
      campEmailAnterior: "",
      campTelefone1:"",
      campCpf:"",       
      campRazao_social: "",
      campNome_fantasia:"",
      campCep: '',
      campNome: '',
      campEndereco: '',
      campBairro: '',
      campNumero: '',
      campComplemento:"",
      campCelular:"",
      campCidade:"",
      campEstadoId:0,      
      estadoSelecionado: "",   
      color: 'light',
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',        
      mensagem_aguarde: '',
      mensagem_cep: '',  
      mensagem_endereco: '',  
      mensagem_numero: '',  
      mensagem_complemento: '',      
      mensagem_estado: '',  
      mensagem_cidade: '',  
      mensagem_bairro: '',      
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
      erro_cep: false,
      erro_numero: false,
      erro_complemento: false,
      validacao_cep: false,
      validacao_numero: false,
      validacao_complemento: false,
      listEmpresas:[],
      listEmpresasExcluidos:[],
      listaStatus:[],
      validate: {
        nomeState: '',      
        datanascimentoState: '',   
        emailState: '',
        cpfState: '',     
        telefone1State: '',     
      }    
    }
    this.numerochange = this.numerochange.bind(this);
    this.complementochange = this.complementochange.bind(this);
    this.validaNumeroChange = this.validaNumeroChange.bind(this);  
    this.validaComplementoChange = this.validaComplementoChange.bind(this);      

    this.buscachange = this.buscachange.bind(this);
    this.statusChange = this.statusChange.bind(this);

    this.cpfchange = this.cpfchange.bind(this);
    this.nomeChange = this.nomeChange.bind(this);     

    this.telefone1change = this.telefone1change.bind(this);  
    this.emailchange = this.emailchange.bind(this);
    this.data_nascimentochange = this.data_nascimentochange.bind(this);

    this.verificaCpf = this.verificaCpf.bind(this);  
    this.verificaCpfonblur = this.verificaCpfonblur.bind(this);      

    this.verificaEmail = this.verificaEmail.bind(this);          
    this.verificaCpfonfocus = this.verificaCpfonfocus.bind(this); 
    this.verificaNomeonfocus = this.verificaNomeonfocus.bind(this); 

    this.verificaCep = this.verificaCep.bind(this);  
    this.verificaComplemento = this.verificaComplemento.bind(this);  
    this.verificaNumero = this.verificaNumero.bind(this);        
    
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

    this.buscar_cepClick = this.buscar_cepClick.bind(this);  
    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_cliente = this.busca_cliente.bind(this);  
  }

  componentDidMount(){
    this.setState({     
      perfil: sessionStorage.getItem('logperfil')    
    });

    console.log('logperfil - '+perfil);

    if (sessionStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else {

      this.loadEmpresas();   
      this.loadEmpresasExcluidos();   
      this.carrega_status();        
         
    }
  }

  carrega_estado() {
    api.get('/estado/getNome/'+this.state.campEstadoId)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({ estado_selecionado:data[0].nome})
      }
      else {
        alert('Lista vazia')
      }
    })
    .catch(error=>{
      alert("Error estado "+error)
    })

  }

  busca_cliente() {
    const { validate } = this.state  
    console.log('id - '+sessionStorage.getItem('logeditid'));
    api.get(`/empresa/get/${sessionStorage.getItem('logeditid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
      //  const dataF = new Data(res.data.data[0].data_nascimento);     
        if (res.data.success) {
          sessionStorage.setItem('logclienteId', res.data.data[0].cliente.id)  
          sessionStorage.setItem('logempresaid', res.data.data[0].id)
          this.setState({ 
            campCnpj: cnpjMask(res.data.data[0].cnpj),          
            campRazao_social: res.data.data[0].razao_social,
            campNome_fantasia: res.data.data[0].nome_fantasia,                  
            campCidade: res.data.data[0].cidade,
            campComplemento: res.data.data[0].complemento,
            campNumero: res.data.data[0].numero,
            campBairro: res.data.data[0].bairro,
            campEstado: res.data.data[0].estadoId,
            campEstadoId: res.data.data[0].estadoId,
            campEndereco: res.data.data[0].endereco,          
            campCep: res.data.data[0].cep,      
            campCpf: res.data.data[0].cliente.cpf,
            campNome: res.data.data[0].cliente.nome,
            campData_nascimento: dateFormat(res.data.data[0].cliente.data_nascimento, "UTC:dd/mm/yyyy"),
            campEmail: res.data.data[0].cliente.email,      
            campEmailAnterior: res.data.data[0].cliente.email,      
            campTelefone1: res.data.data[0].cliente.celular,           
            campStatusId: res.data.data[0].cliente.statusId, 
            incluir: false,           
            inicio: 2,
            validacao_cpf: true,
            validacao_datanascimento: true,
            validacao_email: true,
            validacao_nome: true,
            validacao_telefone: true,
            validacao_cnpj: true,            
            validacao_razaosocial: true,
            validacao_cep: true,
          })       
          
          this.setState({                  
            progresso: 25
          });             

          if (this.state.campNumero != "") {
            this.setState({                  
              validacao_numero: true,
            });               
          }

          if (this.state.campComplemento != "") {
            this.setState({                  
              validacao_complemento: true,
            });               
          }

          if (this.state.campCnpj == ''){
            this.setState({ 
              campCpf: null 
            })  
          }            
         
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

          console.log('ESTADO ID '+this.state.campEstadoId);
          if (this.state.campEstadoId !== 0) {
            this.carrega_estado()
          }
  
          this.setState({ validate })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão cliente "+error)
      })       
  
  }  
  cepchange(e) {
    this.setState({ campCep: cepMask(e.target.value) })
   // if (this.state.campCep.length > 0) {
   //   this.handleClick(e)
   // }
  }

  buscar_cepClick(e) {    
    const base = e.target.value;
    const estadoId = "";
    const { validate } = this.state
    
    console.log('BASE '+JSON.stringify(base.replace('-',''), null, "    "));                
  
    if (base.length > 0) {
     buscadorcep(base.replace('-','')).
       then(endereco => { 
  
        //console.log('Busca '+JSON.stringify(endereco, null, "    "));                  
  
            api.get(`/estado/get/${endereco.uf}`)
            .then(res=>{        
              validate.enderecoState = ''  
              validate.cidadeState = ''  
              validate.bairroState = ''  
              validate.estadoState = ''  
              validate.numeroState = ''  
              validate.complementoState = ''  
  
              if (res.data.data.length !== 0) {
                //console.log(JSON.stringify(res.data.data.length, null, "    "));          
  
                  if (res.data.success) {      
                    //console.log(JSON.stringify(res.data, null, "    "));                  
                    
                    if (endereco.logradouro !== "") {
                      validate.enderecoState = 'has-success'         
                    }
                    if (endereco.localidade !== "") {
                      validate.cidadeState = 'has-success'
                    }
                    if (endereco.bairro !== "") {
                      validate.bairroState = 'has-success'
                    } 
                    if (endereco.uf !== "") {
                      validate.estadoState = 'has-success'
                    }           
                    if (endereco.complemento !== "") {
                      validate.complementoState = 'has-success'         
                    }
                    
                    this.setState({                    
                      cep_encontrado: 'encontrado',
                      campCep: endereco.cep,
                      campEndereco: endereco.logradouro,
                      campCidade: endereco.localidade,
                      campComplemento: '',
                      campBairro: endereco.bairro,
                      campEstadoId: res.data.data[0].id, // endereco.uf,           
                      estado_selecionado: endereco.uf,
                      campComplemento: endereco.complemento
                    }); 
  
                    //console.log(JSON.stringify(this.state, null, "    "));
                  } else {  
                
                    validate.cepState = 'has-danger'
                    this.setState({             
                        validate,
                        cep_encontrado: '',
                        mensagem_cep: 'O cep não encontrado', 
                        campCep: "",
                        campEndereco: "",
                        campCidade: "",
                        campBairro: "",
                        campEstadoId: 0, 
                        estado_selecionado: ""
                    })            
  
                  } 
                } else {
  
                  validate.cepState = 'has-danger'
                      this.setState({             
                          validate,
                          cep_encontrado: '',
                          mensagem_cep: 'O cep não encontrado', 
                         // campCep: "",
                          campEndereco: "",
                          campCidade: "",
                          campBairro: "",
                          campEstadoId: 0, 
                          estado_selecionado: ""
                      })            
        
                }  
            })        
            .catch(error=>{
              alert("Error buscar_cepClick "+error)
            })        
           //console.log(JSON.stringify(this.state, null, "    ")); 
          // this.estadoChange = this.estadoChange.bind(this); 
        });
        
      //}
      }  else {
         this.limpar_endereco();
      }
  
  };
  

  verificaCep(e) {
    const { validate } = this.state
    //console.log('verificaCep - '+JSON.stringify(this.state, null, "    "));
    if (e.target.value.length == 0) {
       if (e.target.value.trim().length == 0) {
          this.limpar_endereco()
          validate.numeroState = ''     
          validate.complementoState = ''
          validate.bairroState = ''          
          validate.cidadeState = ''     
          validate.estadoState = ''
          validate.enderecoState = ''
         // validate.cepState = ''
          this.setState({    
            erro_cep: false,       
            validacao_cep: false,       
            inicio: 1,       
           // mensagem_cep: ''            
          })            
          this.setState({ validate })
      }   
    }  
   }
   verificaNumero(e) {
    const { validate } = this.state
       if (e.target.value.trim().length == 0) {       
        this.setState({ 
          validate,
          inicio: 1,        
          erro_cep: true,       
          validacao_cep: false,       
          mensagem_numero: ''  
         })            
       }      
   }
  
   verificaComplemento(e) {
    const { validate } = this.state
       if (e.target.value.trim().length == 0) {
        validate.complementoState = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,   
          erro_complemento: true,
          validacao_complemento: false,                     
          mensagem_complemento: 'O campo Complemento é obrigatório.'  
         })             
       }      
   }

   limpar_endereco() {
    this.setState({ 
      campEndereco: "",
      campNumero: "",
      campComplemento:"",
      campCelular:"",
      campCidade:"",
      campEstadoId:0,
      estadoSelecionado: "",   
      campBairro:"",      
      mensagem_endereco: '',  
      mensagem_numero: '',  
      mensagem_complemento: '',      
      mensagem_estado: '',  
      mensagem_cidade: '',  
      mensagem_bairro: '',      
      validate: {     
        enderecoState: '',
        numeroState: '',     
        complementoState: '',
        bairroState: '',          
        cidadeState: '',     
        estadoState: '',     
      }      
    });
   } 
   
  buscachange(e) {
    this.setState({ campbuscacliente: e.target.value })
  }

  statusChange(e) {
    this.setState({ campStatusId: e.target.value })
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
  complementochange(e) {
    this.setState({ campComplemento: e.target.value })
  }
  numerochange(e) {
    this.setState({ campNumero: numeroMask(e.target.value) })
  }

  validaNumeroChange(e){
    const { validate } = this.state
    
      if (e.target.value.trim().length == 0) {        
        this.setState({ 
            erro_numero: false,
            validacao_numero: false, 
            inicio: 1,
            mensagem_numero: '' 
        })  
      } else if (e.target.value.trim().length > 0) {
        validate.numeroState = 'has-success'  
        this.setState({           
          erro_numero: false,
          validacao_numero: true, 
          inicio: 2
        })
       
      }  
      this.setState({ validate })   
     
  }
  validaComplementoChange(e){
    const { validate } = this.state
    
      if (e.target.value.trim().length == 0) {    
        this.setState({          
          erro_complemento: false,
          validacao_complemento: false, 
          mensagem_complemento: '' 
        })  
      } else if (e.target.value.trim().length > 0) {
        validate.complementoState = 'has-success'       
        this.setState({           
          erro_complemento: false,
          validacao_complemento: true, 
        })           
      }  
      this.setState({ validate })
      
  }
  validaCepChange(e){
    const { validate } = this.state
    //console.log('teste cep '+e.target.value);
      if (e.target.value.length == 0) {
        this.limpar_endereco()     
        validate.numeroState = ''
        validate.complementoState = ''
        validate.enderecoState = ''
        validate.estadoState = ''
        validate.bairroState = ''
        validate.cidadeState = ''
        this.setState({ 
           inicio: 1,
           erro_cep: true,
           validacao_cep: false,
           mensagem_cep: '' 
        })  
      } else if (e.target.value.length == 9) {      
              validate.cepState = 'has-success'                  
              this.setState({ 
                erro_cep: false,
                validacao_cep: true,
                busca_cep: e.target.value,
                mensagem_cep: ''                                            
              })
              
          this.buscar_cepClick(e);
      }      
      this.setState({ validate })
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
          erro_cpf: true,
          validacao_cpf: false, 
          mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       }  
   }  

   verificaCpfonblur(e) {
    const { validate } = this.state
       if (e.target.value.length < 14) {
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
          erro_cpf: true,
          validacao_cpf: false, 
          mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       }  
   }  
  verificaTelefone1(e) {   
    const { validate } = this.state
       if (e.target.value.length < 15) {          
        validate.telefone1State = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,
          erro_telefone: true,
          validacao_telefone: false, 
          mensagem_telefone1: 'O campo Telefone é obrigatório.'
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
    } else {
      if (this.state.campEmailAnterior !== e.target.value) {
          this.busca_email_ja_cadastrado(e.target.value)         
      }    
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
      this.setState({ 
        validate,
        erro_email: false,
        validacao_email: false, 
        mensagem_email: ''  
    })                          
    } else if (e.target.value.length > 0 && this.state.validacao_email == true) {
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
        this.setState({ 
          validate,
          erro_nome: false,
          validacao_nome: false, 
          mensagem_nome: ''  
         })      
       } else {
        validate.nomeState = 'has-success' ;        

        this.setState({ 
          mensagem_nome: ''
       });  

       }         
   }
  verificaDataNascimento() {
    const { validate } = this.state
       if (this.state.campData_nascimento.length == 0) {    
        this.setState({ 
          validate,
          erro_datanascimento: true,
          validacao_datanascimento: false,
          mensagem_data_nascimento: ''  
         })      
       } else if (this.state.campData_nascimento.length == 10) {

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
        }      
      })        
      .catch(error=>{
        alert("Erro de conexão "+error)
      })                   
    }
    
    validateEmail(e) {
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state
      
        if (emailRex.test(e.target.value)) {                         
            validate.emailState = 'has-success'     
            //console.log(' valida email - '+e.target.value);   
            //console.log(' valida email - '+this.state.campEmail);   
            if (this.state.campEmailAnterior !== e.target.value) {
              this.busca_email_ja_cadastrado(e.target.value)                
              } else {
                this.setState({ 
                  validate,
                  erro_email: false,
                  validacao_email: true,
                  mensagem_email: '' 
                })          
              }              
                                 
                    
            
        } else {
          validate.emailState = 'has-danger'
          this.setState({ 
            validate,
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
          validate.telefone1State = 'has-danger'
          this.setState({ mensagem_telefone1: 'O campo Telefone é obrigatório.' })  
        } else {          
          
          if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success'       
            this.setState({ mensagem_telefone1: '' })  

            this.setState({ 
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
          this.setState({ mensagem_nome: '' })  
        } else if (e.target.value.length > 0) {      
          validate.nomeState = ''       
          this.setState({ mensagem_nome: '' })  
        }  
        this.setState({ validate })  
     }   
     validaDataNascimentoChange(e){
      const { validate } = this.state
  
    if (e.target.value.length < 1) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' })  
    } 
    this.setState({ validate })
}

busca_cpf(e){
  const { validate } = this.state
 api.get(`/cliente/getClienteCpf/${e.target.value}`)
 .then(res=>{
     console.log(JSON.stringify(res.data, null, "    ")); 
     if (res.data.success) {
        
        validate.cpfState = 'has-danger'
        this.setState({ 
           erro_cpf: true,
           validacao_cpf: false,
           mensagem_cpf: 'Representante já cadastrado'  
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
     alert("Error de conexão  "+error)
   })   
 }
 
   verifica_botao(inicio) {
     const { validate } = this.state    
     if (inicio == 1) {
       return (
        <div>                  
           <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal_scroll" p={2}>
                 <div className="d-flex justify-content-center">
                 <label> Salvar Alterações </label>
                 </div>     
           </Box>           
       </div>     
       );   
     } else {
      if (this.state.validacao_cpf == true && this.state.validacao_datanascimento == true  
        && this.state.validacao_email == true && this.state.validacao_nome == true
        && this.state.validacao_telefone == true) {
           return (    
             <div>                                          
                   <Box  bgcolor="error.main" color="error.contrastText" className="botoes_habilitados_modal_scroll"  p={2} onClick={()=>this.sendSave()}>
                     <div className="d-flex justify-content-center">
                           <label> Salvar Alterações </label>                          
                     </div>                    
                   </Box>                                                  
             </div>       
           );
         } else {
           return (
             <div>              
               <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal_scroll" p={2}>
                     <div className="d-flex justify-content-center">
                       <label> Salvar Alterações </label>
                     </div>     
               </Box>           
             </div>
         );   
         }   
       }      
   
    
   } 
 

  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <option key={data.descricao} value={data.id}>{data.descricao} </option>
      )
    })     
  
   }


  loadEmpresas(){
   // const url = baseUrl+"/cliente/list"
   api.get('/empresa/list')
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data               
        this.setState({             
            listEmpresas: data          
        })                        
      }
    })
    .catch(error=>{
      alert("Error server lista "+error)
    })
  }

  loadEmpresasExcluidos(){
    // const url = baseUrl+"/cliente/list"
    api.get('/empresa/listExcluidos')
     .then(res=>{
       if (res.data.success) {
         const data = res.data.data       
         this.setState({listEmpresasExcluidos:data})
       }  
     })
     .catch(error=>{
       alert("Error server lista excluido "+error)
     })
   }

  handleOpenModal(data) {
    this.setState({ 
      showModal: true,        
      incluir: false,  
      mensagem_aguarde: '',
    });    

    sessionStorage.setItem('logeditid', data.id);             
    console.log(' logeditid - '+data.id);
    this.busca_cliente();   

    if (sessionStorage.getItem('logperfil') == 1) {
      this.setState({ 
        camp_cpf_disabled: true,
        camp_nome_disabled: true,
        camp_datanasc_disabled: true,
        camp_email_disabled: true,
        camp_telefone_disabled: false,
      });
    }  
  }  
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,  
      campStatusId: 0,  
      listEmpresas: [],
      listEmpresasExcluidos: [],
    });
   
    sessionStorage.setItem('logeditid', '');
    
    this.loadEmpresas();  
    this.loadEmpresasExcluidos();  
  //  this.carrega_status();  
    
  }

  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }

  sendBusca() {       
    //console.log(`/cliente/findCliente/${this.state.campbuscacliente}`)    
    if (this.state.campbuscacliente == '' && this.state.campStatusId == 0 )  {
       console.log('log 1 ');
       this.loadCliente();    
    } else {
      console.log('status '+this.state.campStatusId);
      if (this.state.campbuscacliente !== '' && this.state.campStatusId == 0 )  {
        console.log('log 2 ');
          api.get(`/cliente/findcliente/${this.state.campbuscacliente}/7`)
          .then(res=>{
            console.log('result - '+JSON.stringify(res.data, null, "    "));  
            if (res.data.success) {
              const data = res.data.data       
              this.setState({listCliente:data})
              
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })
      } else if (this.state.campStatusId > 0 && this.state.campbuscacliente !== '') {        
        console.log('log 3 ');
        api.get(`/cliente/findclientestatus/${this.state.campbuscacliente}/7/${this.state.campStatusId}`)
          .then(res=>{
            console.log('result - '+JSON.stringify(res.data, null, "    "));  
            if (res.data.success) {
              const data = res.data.data       
              this.setState({listCliente:data})              
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })
      } else if (this.state.campStatusId >= 0 && this.state.campbuscacliente == '')  {
        console.log('log 4 ');
        api.get(`/cliente/findstatus/${this.state.campStatusId}/7`)
          .then(res=>{            
            if (res.data.success) {
              const data = res.data.data       
              this.setState({listCliente:data})              
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })
      }    
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
 
  render()
  {
    return (
      <div>    
          <div>
            <Menu_administrador />  
            <div className="titulo_lista">
               <div className="unnamed-character-style-4 descricao_admministrador">                       
                 <strong>Lista de Clientes Empresarial</strong>
              </div>      
            </div>
          </div>
          <div className="container_modal_list">                    
          <br/>        
          <Tabs 
              defaultActiveKey="ativos" id="uncontrolled-tab-example" className="tabs_titulo_lista">          
             <Tab eventKey="ativos" title="Ativos">
             <div style={{ maxWidth: '90% !important', maxHeight: '80% !important' }}>    
                 <MaterialTable       
                       title=""                                                                        
                        columns={[
                          { title: '', field: '#', width: '3% !important' },
                          { title: 'Status', field: 'cliente.status.descricao', width: '10% !important' },
                          { title: 'CNPJ', field: 'cnpj', width: '10% !important', render: rowData =>  cnpjMask(rowData.cnpj) },
                          { title: 'Razão Social', field: 'razao_social', width: '30% !important', render: rowData => rowData.razao_social.substring(0,30) },
                          { title: 'Representante Legal', field: 'cliente.nome', width: '30% !important' , render: rowData => rowData.cliente.nome.substring(0,30) },
                          { title: 'Email', field: 'cliente.email', width: '30% !important' },
                          { title: 'Telefone', field: 'cliente.celular', align: 'center', width: '20% !important'},                                                      
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                        ]}
                        data={this.state.listEmpresas}     
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir',
                            addTooltip: 'Add',
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
                            searchPlaceholder: 'Buscar empresa',        
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
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "10px" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px" , color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportFileName: 'Relatorio_adm_empresa',
                              search: true,     
                              exportAllData: true,                              
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',          
                             // detailPanelType: 'single', 
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 7,
                              pageSize: 7,
                              pageSizeOptions: [0],         
                        }}
                        actions={[
                          {             
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (evt, data) => this.handleOpenModal(data)
                          }
                        ]}
                      />      
             </div>      
          </Tab>
          <Tab eventKey="excluidos" title="Excluidos">
          <div style={{ maxWidth: '90% !important', maxHeight: '80% !important' }}>    
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '#', width: '3% !important' },
                              { title: 'Status', field: 'cliente.status.descricao', width: '10% !important' },
                              { title: 'CNPJ', field: 'cnpj', width: '10% !important', render: rowData =>  cnpjMask(rowData.cnpj) },
                              { title: 'Razão Social', field: 'razao_social', width: '30% !important', render: rowData => rowData.razao_social.substring(0,30) },
                              { title: 'Representante Legal', field: 'cliente.nome', width: '30% !important' , render: rowData => rowData.cliente.nome.substring(0,30) },
                              { title: 'Email', field: 'cliente.email', width: '30% !important' },
                              { title: 'Telefone', field: 'cliente.celular', align: 'center', width: '20% !important'},                                                      
                              { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },                     
                            ]}
                            data={this.state.listEmpresasExcluidos}        
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir',
                                addTooltip: 'Add',
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
                                searchPlaceholder: 'Buscar empresa',        
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
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px" , color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportFileName: 'Relatorio_adm_empresa_excluidos',
                              search: true,     
                              exportAllData: true,                              
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 7,
                              pageSize: 7,
                              pageSizeOptions: [7],                                      
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                            ]}
                          />      
                </div>      
          </Tab>          
        </Tabs>  

         
       <br/>
       <ReactModal 
            scrollable={true}
            isOpen={this.state.showModal}
            style={customStyles}
            contentLabel="Inline Styles Modal Example"          
            > <div className="editar_titulo">Editar Representante 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()} className="botao_close_modal_empresa">
              <CloseOutlinedIcon />
            </IconButton>     </div>           
  <div className="container_alterado">
    <div className="d-flex justify-content">        
                 <div>     
            <div class="d-flex flex-column espacamento_caixa_modal">
            <div class="p-2">                
                <div className="descricao_modal_editar">{this.state.campRazao_social}</div>

                <div className="descricao_modal_editar title_modal_editar">{this.state.campCnpj}</div>
                <br/>
                <FormControl variant="outlined" className="label_empresa_status_modal">
                            <InputLabel className="buscar_label_empresa_modal" id="demo-simple-select-outlined-label">Status </InputLabel>
                            <Select                                                 
                              autoComplete="off"                     
                              className="select_modal_status_empresa"                                                
                              labelId="demo-simple-select-outlined-label"
                              id="busca"
                              value={this.state.campStatusId}                                    
                              onChange={ (e) => {
                                this.statusChange(e)
                              }}                  
                              labelWidth={50}          
                             >                                            
                              {this.loadStatus()}                    
                              </Select>
                          </FormControl>                      
            </div>
              <div class="p-2">  
                 <div className="sub_titulo_modal_editor"> Representante Legal </div>                
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
                <FormControl variant="outlined" className="posicao_caixa_texto">
                    <InputLabel className="select_status_modal" htmlFor="filled-adornment-password">Data de Nascimento</InputLabel>
                     <OutlinedInput      
                        autoComplete="off"                    
                        readOnly={this.state.camp_datanasc_disabled}                     
                        error={this.state.erro_datanascimento}
                        helperText={this.state.mensagem_data_nascimento}
                        className="data_text"                          
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
              <div class="p-2">
              <FormControl variant="outlined" className="posicao_caixa_texto">
                    <InputLabel className="label_modal" htmlFor="filled-adornment-password">Telefone</InputLabel>
                     <OutlinedInput   
                        autoComplete="off"           
                        readOnly={this.state.camp_telefone_disabled}            
                        error={this.state.erro_telefone}
                        helperText={this.state.mensagem_telefone1}
                        className="data_text"                       
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

              <div class="p-2">  
                   <div className="sub_titulo_modal_editor"> Endereço </div>                
              </div>             
              
              <div class="p-2">
                <div class="d-flex justify-content-start">
                  <div>      
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                          <InputLabel className="label_modal" htmlFor="filled-adornment-password">Cep</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_cep}
                              helperText={this.state.mensagem_cep}
                              className="data_modal_text"                       
                              id="cep_incluir"                      
                              variant="outlined"
                              value={this.state.campCep}
                              onblur={this.verificaCep}
                              onKeyUp={this.verificaCep}   
                              onChange={ (e) => {
                                this.cepchange(e)                       
                                this.validaCepChange(e)
                              }}                         
                              inputProps={{
                                maxLength: 9,
                              }}
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_cep? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={50}
                          />
                          <div className="naoseiocep_modal">
                              <a className="alink" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei meu CEP</a> 
                          </div> 
                        <FormHelperText error={this.state.erro_cep}>
                              {this.state.mensagem_cep}
                        </FormHelperText>
                        </FormControl>         
                     </div>
                        <div>
                           {this.mostrar_endereco()}       
                        </div>
                   </div>                     
                </div>
                <div class="p-2">
                  <div class="d-flex justify-content-start">
                    <div>
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                        <InputLabel className="label_modal" htmlFor="filled-adornment-password">Número</InputLabel>
                        <OutlinedInput   
                            autoComplete="off"           
                            error={this.state.erro_numero}
                            helperText={this.state.mensagem_numero}
                            className="data_modal_text"                                    
                            id="numero_incluir"                      
                            variant="outlined"
                            value={this.state.campNumero}
                            onblur={this.verificaNumero}
                            onKeyUp={this.verificaNumero}
                            onChange={ (e) => {
                              this.numerochange(e)                       
                              this.validaNumeroChange(e)
                            }}           
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_numero? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={80}                      
                        />
                        <FormHelperText error={this.state.erro_numero}>
                                {this.state.mensagem_numero}
                          </FormHelperText>
                    </FormControl>                           
                    </div>
                    <div> 
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                        <InputLabel className="label_modal" htmlFor="filled-adornment-password">Complemento</InputLabel>
                        <OutlinedInput 
                            autoComplete="off"                                   
                            type="text"                       
                            error={this.state.erro_complemento}
                            helperText={this.state.mensagem_complemento}                                    
                            id="complemento_incluir"   
                            className="data_modal_text"                                    
                            variant="outlined"
                            value={this.state.campComplemento}
                            onblur={this.verificaComplemento}
                            onKeyUp={this.verificaComplemento}
                            onChange={ (e) => {
                              this.complementochange(e)                       
                              this.validaComplementoChange(e)
                            }}                                  
                            maxlength="9"     
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_complemento? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={110}
                        />                        
                      <FormHelperText error={this.state.erro_complemento}>
                            {this.state.mensagem_complemento}
                      </FormHelperText>
                      </FormControl>    
                    </div>
                  </div> 
                </div>                          
            </div>       
            <div className="mensagem_aguarde">
              <FormHelperText>
                  {this.state.mensagem_aguarde}
              </FormHelperText>       
            </div>                   
            {this.verifica_botao(this.state.inicio)}             
         </div>   
    </div>
    </div>
         </ReactModal>  
       <Alert color={this.state.color}>
         {this.state.mensagem}
       </Alert>    
          <br/>
          <br/>       
       
      </div>   
    </div>      
    );
  }

  onIncluir() {
    this.props.history.push(`/empresa_incluir/0`);   
  }
  
  carrega_status(){
  
    //const baseUrl = "http://34.210.56.22:3333"
    //const url = baseUrl+"/seguradora/list"
    api.get('/status/list')
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
  

  validar_delete(data, id) {     
    console.log('validar_delete - '+JSON.stringify(data, null, "    ")); 
    
    //console.log(`/eventos/listaeventocliente/${id}/${data.cliente.perfilId}`);
    api.get(`/eventos/listaeventocliente/${id}/${data.cliente.perfilId}`)
    .then(response =>{

      if (response.data.success) {
    
        Swal.fire({
          title: 'Você está certo?',
          text: 'Cliente tem Evento(s) associado(s), deseja excluir?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, apaga isto!',
          cancelButtonText: 'Não, mantêm'
        }).then((result) => {
          if (result.value) {
            this.sendDelete(data, id);
          } else if (result.dismiss == Swal.DismissReason.cancel) {
            this.setState({ 
              color: 'danger',
              mensagem: 'Seus dados não foram apagados :)'
            })  
          }
        })
      } else {
        this.sendDelete(data, id);
      } 
    })
    .catch ( error => {
      alert("Erro exclusão do evento")
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
        this.validar_delete(data, id)
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        this.setState({ 
          color: 'danger',
          mensagem: 'Seus dados não foram apagados :)'
        })  
      }
    })
  }

  sendSave(){            
    const { validate } = this.state;       
    validate.cpfState= '';
    this.setState({ 
       mensagem_aguarde: 'Aguarde, alterando os dados...',
       validate 
    }); 
 
   const dataempresaData = {    
    razao_social: this.state.campRazao_social,              
    cnpj: cnpjremoveMask(this.state.campCnpj),
    nome_fantasia: this.state.campNome_fantasia,
    cidade: this.state.campCidade,
    complemento: this.state.campComplemento,
    numero: this.state.campNumero,
    bairro: this.state.campBairro,    
    endereco: this.state.campEndereco,
    estadoId: this.state.campEstado,    
    cep: this.state.campCep,  
  }       
  
  api.put(`/empresa/update/${sessionStorage.getItem('logempresaid')}`, dataempresaData)
  .then(respempresa=>{
    if (respempresa.data.success==true) {        
  
          const datapost = {
              nome: this.state.campNome,              
              email: this.state.campEmail,
              celular: this.state.campTelefone1,    
              data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),       //Moment(this.state.campData_nascimento).format('YYYY-MM-DD'),    
              cpf: this.state.campCpf,    
              perfilId: 7,
              statusId: this.state.campStatusId,
              situacaoId: 1
        }       
        
              console.log('datapost - '+JSON.stringify(datapost, null, "    ")); 
            // console.log(' this.state.incluir - '+JSON.stringify(this.state.incluir, null, "    "));         
           
          //   console.log(`/cliente/update/${sessionStorage.getItem('logeditid')}`); 
              api.put(`/cliente/update/${sessionStorage.getItem('logclienteId')}`, datapost)
              .then(response=>{
                if (response.data.success==true) {        
                  
                  const logindata = {  
                    email: this.state.campEmail,  
                    perfilId: 7,
                    statusId: this.state.campStatusId
                  }
                  
                  console.log('logindata - '+JSON.stringify(logindata, null, "    ")); 
                  //console.log(`/login/update/${sessionStorage.getItem('logid')}`); 
                  api.put(`/login/update/${sessionStorage.getItem('logclienteId')}`,logindata)
                  
                  sessionStorage.setItem('lognome', this.state.campNome);          
                  
                  
                  this.handleCloseModal(); 
          
        
                }
              }).catch(error=>{
                alert("Error save cliente - "+error)
              })        
           
          }     
        }).catch(error=>{
          alert("Error save cliente - "+error)
        })     
  }  
  sendDelete(data, userId){
    // url de backend
    console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    let clienteId = '';
    console.log('deletar o email - '+data.cliente.email);
    api.delete(`/login/delete/${data.cliente.email}`)     
    
    console.log('deletou');

    const datapost = {  
      perfilId: data.cliente.perfilId,      
    }   
     
    /* tem que excluir os serviços */
     
    api.delete(`/eventos/deleteEmpresa/${userId}`,datapost)        

    api.delete(`/operador/deleteEmpresa/${userId}`)        

    api.get(`/empresa/getEmpresaCliente/${userId}`)
    .then(res=>{
      if (res.data.success) {
        
        clienteId = res.data.data[0].cliente.id;
        console.log('pegou o cliente '+clienteId);

        api.delete(`/empresa/delete/${res.data.data[0].id}`)
        .then(response =>{
         
          if (response.data.success) {       
      
            console.log('deleteou a empresa ');
              api.delete(`/cliente/delete/${clienteId}`)
              .then(response =>{
                
                if (response.data.success) {       
            
                      console.log('deleteou o cliente ');
                      this.loadEmpresas()
          
                } else {      
                  this.setState({ 
                    color: 'danger',
                    mensagem: 'Seus dados não foram apagados :)'
                  })    
                }

              })        
              .catch(error=>{
                alert("Error de conexão cliente "+error)
              })            
    
          } else {      
            this.setState({ 
              color: 'danger',
              mensagem: 'Seus dados não foram apagados :)'
            })    
          }
        })        
        .catch(error=>{
          alert("Error de conexão cliente "+error)
        })                                       
        
        
      }  
    })        
    .catch(error=>{
      alert("Error de conexão cliente "+error)
    })        
   
  }

}

export default listComponent;
