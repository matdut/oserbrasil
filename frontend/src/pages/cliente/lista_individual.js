import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Input, Button } from 'reactstrap';
//import axios from 'axios';
import api from '../../services/api';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import { dataMask } from '../formatacao/datamask';

import IconButton from '@material-ui/core/IconButton';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ReactModal from 'react-modal';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import './lista_cliente.css';
import CheckIcon from '@material-ui/icons/Check';
//import Modal from '@material-ui/core/Modal';
import { Data } from '@react-google-maps/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table';

import { Alert, Tabs, Tab } from 'react-bootstrap';

import TesteAlteracao from '../cliente/modal/representante';
import { Link } from "react-router-dom";
import Menu_administrador from '../administrador/menu_administrador';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const baseUrl = "http://34.210.56.22:3333";

const customStyles = {
  overlay: {    
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '0px',
    left                   : '66%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100%',    
    width                  : '560px',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

/*
let columns = [
  { title: '', field: '#' },
  { title: 'Status', field: 'status.descricao' },
  { title: 'CPF', field: 'cpf' },
  { title: 'Nome', field: 'nome' },
  { title: 'Email', field: 'email' },
  { title: 'telefone', field: 'celular'},   
  { title: '', field: 'status.descricao', lookup: { 1: 'sadas', 2: 'asdas' }, },
  { title: '', field: '#'},     
]; 


let columns = [
  { id: '1', label: '', minWidth: 60 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'cpf', label: 'CPF', minWidth: 100 },
  { id: 'nome', label: 'Nome', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 90 },
  { id: 'telefone', label: 'Telefone', minWidth: 60 },
  { id: 'acao', label: '', minWidth: 100 },
];
*/

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      campStatus: '',
      inicio: 0,
      mensagem: '',
      teste: '',
      campNome: "",
      campStatusId: 0,
      campData_nascimento:"",
      campbuscacliente: "",
      campEmail:"",      
      campEmailAnterior: "",
      campTelefone1:"",
      campCpf:"",       
      cpf_selecionado: '',
      incluir: false,
      showModal: false,
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',        
      mensagem_aguarde: '',
      color: 'light',
      listCliente:[],
      listClienteExcluidos:[],
      listaStatus:[],    
      validate: {
        nomeState: '',      
        datanascimentoState: '',   
        emailState: '',
        cpfState: '',     
        telefone1State: '',     
      }    
    }
    this.buscachange = this.buscachange.bind(this);
    this.statusChange = this.statusChange.bind(this);


    this.handleOpenModal = this.handleOpenModal.bind(this);    

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

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_cliente = this.busca_cliente.bind(this);  

  }

  componentDidMount(){

    moment.locale('pt-br');
    this.setState({
      mensagem_aguarde: '',
      perfil: localStorage.getItem('logperfil')    
    });

    if (localStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else {
        this.loadCliente();  
        this.loadClienteExcluidos();  
        this.carrega_status();        
    }
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

  verificaCpfonfocus(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,               
        mensagem_cpf: ''  
       })            
    }  
  } 
  verificaNomeonfocus(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {  
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
          mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       }  
   }  

   verificaCpfonblur(e) {
    const { validate } = this.state
       if (e.target.value.length < 14) {
        validate.cpfState = 'has-danger'   
        this.setState({ 
          validate,                 
          inicio: 1,
          mensagem_cpf: ''  
         })            
       }  else if (e.target.value.length == 14){                
        console.log('é valido - '+e.target.value);
        this.busca_cpf(e);// se existir não deixa cadastrar 
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
            mensagem_telefone1: ''  
        })                   
   }
   verificaEmail(e){   
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.emailState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_email: 'Email é obrigatório.'  
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
                erro_datanascimento: true,
                validacao_datanascimento: false,
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
          this.setState({ mensagem_cpf: '' })  
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
      this.setState({ 
        mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' 
      })  
    } 
    
    /* else {    
      
      if (e.target.value.length == 10) {
        
        //var data_nascimento = new Date(e.target.value).toString;  
        //console.log('e.target.value.length - '+e.target.value.length);
        if (dateFormat(e.target.value) ) {
          validate.datanascimentoState = 'has-success' ;        
          this.setState({ 
            mensagem_data_nascimento: '',  
            progresso: 5 
          });  

        } else {
         // console.log('DATA NASCIMENTO - '+this.state.campData_nascimento)
          validate.datanascimentoState = 'has-danger'
          this.setState({ 
            validate,
            mensagem_data_nascimento: 'Formato inválido'  
          })      
        }    
      } else if (e.target.value.length > 10) {
        validate.datanascimentoState = 'has-danger'
          this.setState({ 
            validate,
            mensagem_data_nascimento: 'Formato inválido'  
          })      
      } 
      
    }  */
    this.setState({ validate })
}
sendSave(){            
  const { validate } = this.state;       
  validate.cpfState= '';
  this.setState({ 
     mensagem_aguarde: 'Aguarde, alterando os dados...',
     validate 
  }); 
  //const conversaodate = Moment("04/12/1974").format('YYYY/MM/DD');
  //console.log('data 1 - '+JSON.stringify(dateFormat("23/08/2020", 'YYYY/MM/DD'), null, "    "));  
 // console.log('data 3 - '+JSON.stringify(Moment("1994-07-01").format('DD-MM-YYYY'), null, "    ")); 
 // console.log('data 4 - '+JSON.stringify(Moment("1994-07-01").format('YYYY-MM-DD'), null, "    ")); 

  const datapost = {
      nome: this.state.campNome,              
      email: this.state.campEmail,
      celular: this.state.campTelefone1,    
      data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),      //Moment(this.state.campData_nascimento).format('YYYY-MM-DD'),    
      cpf: this.state.campCpf,    
      perfilId: 2,
      statusId: this.state.campStatusId,
      situacaoId: 1
 } 
      console.log('datapost - '+JSON.stringify(datapost, null, "    ")); 
     // console.log(' this.state.incluir - '+JSON.stringify(this.state.incluir, null, "    ")); 

     if (this.state.incluir == false) {                
      console.log(`/cliente/update/${localStorage.getItem('logeditid')}`); 
      api.put(`/cliente/update/${localStorage.getItem('logeditid')}`, datapost)
      .then(response=>{
        if (response.data.success==true) {        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 2,
            statusId: this.state.campStatusId
          }
          
          console.log('logindata - '+JSON.stringify(logindata, null, "    ")); 
          //console.log(`/login/update/${localStorage.getItem('logid')}`); 
          api.put(`/login/update/${localStorage.getItem('logeditid')}`,logindata)
          
          localStorage.setItem('lognome', this.state.campNome);      

          
          

          this.handleCloseModal();

          //this.props.history.push('/lista_individual');           
          //this.handleCloseModal();   
          //localStorage.setItem('logid', userId);
       /*
          if (localStorage.getItem('logperfil') == 1) {
         //   localStorage.setItem('logperfil', 1);
            //this.handleCloseModal();            
            this.props.history.push('/lista_individual');   
         } else if (localStorage.getItem('logperfil') == 2) {
             this.props.history.push(`/area_cliente_individual`);
         } else if (localStorage.getItem('logperfil') == 7) {  
             this.props.history.push(`/area_cliente_empresarial`);                              
         } else if (localStorage.getItem('logperfil') == 0) {
             this.props.history.push(`/cliente_senha/`+localStorage.getItem('logid'));   
         }             
         */  

        }
        else {
         // console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
          alert("Error na Criação verificar log")              
        }
      }).catch(error=>{
        alert("Error save cliente - "+error)
      })

    }      
}  
busca_cliente() {
  const { validate } = this.state 
  console.log(`/cliente/get/${localStorage.getItem('logeditid')}`);  
  api.get(`/cliente/get/${localStorage.getItem('logeditid')}`)
  .then(res=>{
     // console.log(JSON.stringify(res.data, null, "    ")); 
      if (res.data.success) {
      //  const dataF = new Data(res.data.data[0].data_nascimento);          
        this.setState({ 
          campCpf: res.data.data[0].cpf,
          campNome: res.data.data[0].nome,
          campData_nascimento: dateFormat(res.data.data[0].data_nascimento, "UTC:dd/mm/yyyy"),
          campEmail: res.data.data[0].email,      
          campTelefone1: res.data.data[0].celular,           
          campStatusId: res.data.data[0].statusId,
          incluir: false, 
          inicio: 2,
          validacao_cpf: true,
          validacao_datanascimento: true,
          validacao_email: true,
          validacao_nome: true,
          validacao_telefone: true,
        })                                         
        
        console.log(JSON.stringify(this.state, null, "    ")); 

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

        console.log('data nascimento - '+this.state.campData_nascimento);  
      } 
    })        
    .catch(error=>{
      alert("Error de conexão cliente "+error)
    })       

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
          mensagem_cpf: 'Cliente já cadastrado'  
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

  
  handleOpenModal(data) {
    this.setState({ 
      showModal: true,        
      incluir: false,  
      mensagem_aguarde: '',
    });    
    localStorage.setItem('logeditid', data.id);     
    console.log('buscar_cliente ');
    this.busca_cliente();   

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
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,  
      campStatusId: 0,  
    });
    localStorage.setItem('logeditid', '');
    
    this.loadClienteExcluidos();
    this.loadCliente();     
  //  this.carrega_status();  
    
  }

  
  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.descricao}</MenuItem>              
      )
    })     
  
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

  loadCliente(){
   // const url = baseUrl+"/cliente/list"
   api.get('/cliente/list')
    .then(res=>{
      if (res.data.success) {

        const data = res.data.data       
        this.setState({
          listCliente:data,      
        })
     
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  loadClienteExcluidos(){
    // const url = baseUrl+"/cliente/list"
    api.get('/cliente/listarExcluidos')
     .then(res=>{
       if (res.data.success) {
 
         const data = res.data.data       
         this.setState({
           listClienteExcluidos:data,           
         })    
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }

  sendBusca() {       
    //console.log(`/cliente/findCliente/${this.state.campbuscacliente}`)
    console.log('status '+this.state.campStatusId);
    console.log('busca '+this.state.campbuscacliente);
    if (this.state.campbuscacliente == '' && this.state.campStatusId == 0 )  {
       console.log('log 1 ');
       this.loadCliente();    
    } else {
      console.log('status '+this.state.campStatusId);
      if (this.state.campbuscacliente !== '' && this.state.campStatusId == 0 )  {
        console.log('log 2 ');
          api.get(`/cliente/findcliente/${this.state.campbuscacliente}/2`)
          .then(res=>{
            console.log('result - '+JSON.stringify(res.data, null, "    "));  
            if (res.data.success) {
              const data = res.data.data       
              this.setState({listCliente:data})
              
            }
            else {
              alert("Error  1")
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })
      } else if (this.state.campStatusId > 0 && this.state.campbuscacliente !== '') {        
        console.log('log 3 ');
        api.get(`/cliente/findclientestatus/${this.state.campbuscacliente}/2/${this.state.campStatusId}`)
          .then(res=>{
            console.log('result - '+JSON.stringify(res.data, null, "    "));  
            if (res.data.success) {
              const data = res.data.data       
              this.setState({listCliente:data})              
            }
            else {
              alert("Error  2")
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })
      } else if (this.state.campStatusId >= 0 && this.state.campbuscacliente == '')  {
        console.log('log 4 ');  
        api.get(`/cliente/findstatus/${this.state.campStatusId}/2`)
          .then(res=>{            
            if (res.data.success) {
              const data = res.data.data       
              this.setState({listCliente:data})              
            }
            else {
              alert("Error 3 ")
            }
          })
          .catch(error=>{
            alert("Error server "+error)
          })
      }    
  }


  }
  
  render()
  {   
  
    return (
      <div>

      <Menu_administrador />  
      <div className="titulo_admministrador">     
        <div className="unnamed-character-style-4 descricao_admministrador">          
           <h3><strong>Lista de Clientes</strong></h3>
         </div>      
      </div>
      <div className="container_modal_list"> 
       <br/>   

       <Tabs 
           defaultActiveKey="ativos" id="uncontrolled-tab-example" className="tabs_titulo_lista">          
          <Tab eventKey="ativos" title="Ativos">
          <div style={{ maxWidth: '95%' }}>    
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '#', width: '40px' },
                              { title: 'Status', field: 'status.descricao', width: '155px' },
                              { title: 'CPF', field: 'cpf', align: 'center', width: '150px' },
                              { title: 'Nome', field: 'nome', width: '350px' },
                              { title: 'Email', field: 'email', width: '400px' },
                              { title: 'Telefone', field: 'celular', align: 'center', width: '150px'},                                 
                              { title: '', field: '#', width: '50px' },
                              { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' },                              
                             },            
                            ]}
                            data={this.state.listCliente}   
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
                                searchPlaceholder: 'Buscar cliente',        
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
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              /* searchFieldStyle: '.teste_css', */
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px" , color: "#0F074E"  },
                              exportFileName: 'Relatorio_adm_cliente',
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
                                tooltip: 'editar',                                
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                            ]}
                          />      
                </div>    
          </Tab>        
          <Tab eventKey="excluidos" title="Excluidos">
              <div style={{ maxWidth: '95%'}}>    
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '#', width: '40px' },
                              { title: 'Status', field: 'status.descricao', width: '155px' },
                              { title: 'CPF', field: 'cpf', align: 'center', width: '150px' },
                              { title: 'Nome', field: 'nome', width: '350px' },
                              { title: 'Email', field: 'email', width: '400px' },
                              { title: 'Telefone', field: 'celular', align: 'center', width: '150px'},                                              
                              { title: '', field: '#', width: '50px' },
                              { title: '', field: '', align: 'left', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                            ]}
                            data={this.state.listClienteExcluidos}   
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
                                searchPlaceholder: 'Buscar cliente',        
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
                              exportAllData: true,
                              exportFileName: 'Rel_adm_cliente_excluidos',
                              search: true,     
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
                                tooltip: 'Editar',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                            ]}
                          />      
                </div>      
          </Tab>          
        </Tabs>  
           
      
       <br/>
       <ReactModal 
            isOpen={this.state.showModal}
            style={customStyles}
            contentLabel="Inline Styles Modal Example"                                  
            ><div className="editar_titulo">  Editar Cliente 
                <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()} className="botao_close_modal">
                  <CloseOutlinedIcon />
                </IconButton>     </div>         
          <div className="container_alterado">
            <div className="d-flex justify-content">        
                 <div>     
            <div class="d-flex flex-column espacamento_caixa_modal">
              <div class="p-2">  
              <div class="d-flex justify-content-start">
                 <div>             
                  <FormControl variant="outlined" className="posicao_caixa_texto">
                    <InputLabel className="label_modal" htmlFor="filled-adornment-password">CPF</InputLabel>
                     <OutlinedInput
                       autoComplete="off"   
                        readOnly={this.state.camp_cpf_disabled}                        
                        error={this.state.erro_cpf}
                        helperText={this.state.mensagem_cpf}
                        className="cpf_text"                       
                        id="outlined-basic"                      
                        variant="outlined"
                        value={this.state.campCpf}
                        onKeyUp={this.verificaCpf}                                           
                        onChange={ (e) => {
                         this.cpfchange(e)                       
                         this.validaCpfChange(e)
                        }}                         
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_cpf? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}
                    />
                   <FormHelperText error={this.state.erro_cpf}>
                         {this.state.mensagem_cpf}
                   </FormHelperText>
                  </FormControl>     
               </div>   
               <div>
               <FormControl variant="outlined" className="buscar_status_modal">
                            <InputLabel className="buscar_label_status_modal" id="demo-simple-select-outlined-label">Status </InputLabel>
                            <Select                                                 
                              autoComplete="off"                     
                              className="select_modal_text"                                                
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
              </div> 
              </div>
              <div class="p-2"> 
                 <FormControl variant="outlined" className="posicao_caixa_texto">
                    <InputLabel  className="label_modal" htmlFor="filled-adornment-password">Nome</InputLabel>
                     <OutlinedInput  
                        autoComplete="off"       
                        readOnly={this.state.camp_nome_disabled}                     
                        error={this.state.erro_nome}
                        helperText={this.state.mensagem_cpf}
                        className="nome_text"                       
                        id="outlined-basic"                   
                        variant="outlined"
                        value={this.state.campNome}                                           
                      onChange={ (e) => {
                        this.nomeChange(e)                       
                        this.validaNomeChange(e)
                      }}        
                      inputProps={{
                        maxLength: 50,
                      }}              
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_nome? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}
                    />
                   <FormHelperText error={this.state.erro_nome}>
                         {this.state.mensagem_nome}
                   </FormHelperText>
                  </FormControl>      
              </div> 
              <div class="p-2">   
                <FormControl variant="outlined" className="posicao_caixa_texto">
                    <InputLabel className="label_modal" htmlFor="filled-adornment-password">Data de nascimento</InputLabel>
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
                    <InputLabel className="label_modal" htmlFor="filled-adornment-password">Email</InputLabel>
                     <OutlinedInput    
                        autoComplete="off"      
                        readOnly={this.state.camp_email_disabled}                                   
                        type="email"
                        error={this.state.erro_email}
                        helperText={this.state.mensagem_email}
                        className="data_text"                       
                        id="outlined-basic"                   
                        variant="outlined"
                        value={this.state.campEmail}
                        onBlur={this.verificaEmail}                                       
                        onChange={ (e) => {
                                    this.emailchange(e) 
                                    this.validateEmail(e)
                                    this.validaEmailChange(e)                                
                                  } }    
                        inputProps={{
                            maxLength: 50,
                        }}                                                      
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_email? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}                      
                    />
                   <FormHelperText error={this.state.erro_email}>
                         {this.state.mensagem_email}
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
                      //  onFocus={this.verificaTelefone1onfocus}
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
               <FormHelperText>
                   {this.state.mensagem_salvo}
               </FormHelperText>                 
                  
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
  
  validar_delete(email, id) {
     
    api.get(`/eventos/listaeventocliente/${id}/${localStorage.getItem('logperfil')}`)
    .then(response =>{

      const registros = response.data.data;
      if (registros.length > 0) {
       // console.log('id - '+response.data);
     //  console.log( JSON.stringify(response.data, null, "    ") );       
          this.setState({ 
            color: 'danger',
            mensagem: 'Cliente tem Evento(s) associado(s), não pode ser excluído'
          })             
       
      } else {
        this.sendDelete(email, id);
      } 
    })
    .catch ( error => {
      alert("Erro de Conexão "+error)
    })
  
  }

  onEditar(data){
    this.props.history.push(`/cliente_alterar/${data.id}`);   
  }

  onIncluir() {
    this.props.history.push(`/cliente_incluir/0`);   
  }
  onDelete(email, id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.validar_delete(email, id)
      } 
    })
  }

  sendDelete(){  
   
    const datapost = {
      statusId: 7
    }    

    api.put(`/login/update/${localStorage.getItem('logid')}`, datapost)
    
    api.put(`/cliente/update/${localStorage.getItem('logid')}`, datapost)
    .then(response =>{
  
      if (response.data.success) {             
          
      } 
    })
    .catch ( error => {
      alert("Error "+error)
    })
  }
}
export default listComponent;
