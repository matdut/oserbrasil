import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../../formatacao/celularmask';
import { cpfMask } from '../../formatacao/cpfmask';
import api from '../../../services/api';
import '../operadores.css';
import Menu_operador from '../menu_operador';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import FormHelperText from '@material-ui/core/FormHelperText';

import CheckIcon from '@material-ui/icons/Check';
import { dataMask } from '../../formatacao/datamask';

import TextField from '@material-ui/core/TextField';
import { Data } from '@react-google-maps/api';

var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
//const nodemailer = require('nodemailer');
const andamento_cadastro = sessionStorage.getItem('logprogress'); 
//var sendmail = require('../sendmail')({silent: true})

class operadoresComponent extends React.Component{  

  constructor(props){
    super(props);  
    this.textInput = React.createRef();
    this.state = { 
      campId: 0,     
      campNome: "",
      campSenha: '',
      campNomeTitulo: '',
      campData_nascimento:"",
      campEmail:"",      
      campEmailAnterior:"",   
      campTelefone1:"",
      campRazao_social: "",
      mensagem_aguarde: "",
      empresaId: 0,
      campCpf:"",       
      camp_cpf_disabled: false,
      camp_nome_disabled: false,
      campStatusId:'',          
      campCnpj:"",
      endereco:"",     
      perfillog:'',       
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',        
      email_disabilitado: false,
      incluir: false, 
      inicio: 1,
      progresso: 0,      
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
    this.verificaTelefone1 = this.verificaTelefone1.bind(this);  
    this.verificaNome = this.verificaNome.bind(this);  
    this.verificaDataNascimento = this.verificaDataNascimento.bind(this);      

    this.verificaCpfonfocus = this.verificaCpfonfocus.bind(this);  
    this.verificaEmailonfocus = this.verificaEmailonfocus.bind(this);
    this.verificaTelefone1onfocus = this.verificaTelefone1onfocus.bind(this);   
    this.verificaNomeonfocus = this.verificaNomeonfocus.bind(this);       

    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.validaCpfChange = this.validaCpfChange.bind(this);  
    this.validatelefone1Change = this.validatelefone1Change.bind(this);  
    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validaDataNascimentoChange = this.validaDataNascimentoChange.bind(this);  

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_email = this.busca_email.bind(this);
   // this.busca_cliente = this.busca_cliente.bind(this);
    this.verificar_menu = this.verificar_menu.bind(this);
    this.verificaCpfonblur = this.verificaCpfonblur.bind(this);
    
    //this.envio_email = this.envio_email.bind(this);   
    
    this.verifica_nome_operador = this.verifica_nome_operador.bind(this);
  }

  componentDidMount(){ 
   
    let userId = this.props.match.params.id;         
    let email = this.props.match.params.email;        

    console.log('userId - '+userId);
    console.log('email - '+email);

    sessionStorage.setItem('logperfil', 0);
    
      if (email == "0") {

        console.log('Entrou aqui email == 0 ');
        sessionStorage.setItem('logoperadorId', userId);  

        this.busca_operador_cadastro();
        

      } else {  

        console.log('Entrou aqui email !== 0 ');
        sessionStorage.setItem('logemailId', userId);
        sessionStorage.setItem('logemail', email); 

        /* verificar se operador já está cadastrado */
            api.get(`/operador/getEmail/${email}`)
            .then(res=>{  

                if (res.data.data.length > 0) {                  
          
                 this.setState({       
                     erro_email: true,
                     validacao_email: false,              
                     mensagem_aguarde: 'Email já cadastrado',                    
                 });

                  this.props.history.push(`/`);                     

                } else {

                 this.setState({ 
                    email_disabilitado: true,
                    campEmail: email,                 
                    incluir: true, 
                    validacao_email: true,
                 });

                 console.log('busca_email ');   
                 this.busca_email(); 

                 console.log('busca_empresa ');   
                 this.busca_empresa();    
                }
            }).catch(error=>{
              alert("Error de conexão busca_empresa "+error)
            })      
            
             //if (sessionStorage.getItem('logoperadorId'))
        }                        
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
    } else if (e.target.value.length == 14)  {
      validate.cpfState = 'has-success'
      this.setState({ 
        validate,               
        erro_cpf: false,   
        validacao_cpf: true,    
        mensagem_cpf: ''  
       }) 
      //console.log('é valido asasas - '+e.target.value);
      // this.busca_cpf(e);// se existir não deixa cadastrar 
      
    }
  } 
  verificaTelefone1onfocus(e){   
    const { validate } = this.state   
       this.setState({ 
            validate,
            erro_telefone: false,   
            validacao_telefone: false,    
            mensagem_telefone1: ''              
        })                   
   } 
  verifica_nome_operador(nome){
    let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = nome
    }
    return(    
          nome_titulo          
       );  
  } 
  busca_empresa() {    
    console.log('busca empresa ID '+sessionStorage.getItem('logid'));    
    api.get(`/empresa/get/${sessionStorage.getItem('logid')}`)
    .then(res=>{       
        if (res.data.success) {
           
          this.setState({           
            campCnpj: res.data.data.cnpj,
            inicio: 2
          })    
          console.log('cnpj - '+ this.state.cnpj);             
        } 
      })        
      .catch(error=>{
        alert("Error de conexão busca_empresa "+error)
      })       
  
  } 

  busca_email() {
    const { validate } = this.state
    console.log(`/emailOperador/getEmpresa/${sessionStorage.getItem('logemailId')}/${sessionStorage.getItem('logemail')}`);    
    api.get(`/emailOperador/getEmpresa/${sessionStorage.getItem('logemailId')}/${sessionStorage.getItem('logemail')}`)
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
          console.log('res.data.data[0].empresaId '+ res.data.data[0].empresaId);
          sessionStorage.setItem('logid', res.data.data[0].empresaId);          

          console.log('Empresa Id - '+sessionStorage.getItem('logid'));
          if (sessionStorage.getItem('logperfil') == 8) {
             sessionStorage.setItem('lograzao_social', this.state.campRazao_social)      
          }   

        //  this.setState({ validate })
        }
      })        
      .catch(error=>{
        alert("Error de conexão busca_email "+error)
      })       
  
  } 
  busca_operador() {
    const { validate } = this.state
   // console.log('busca operador ID '+sessionStorage.getItem('logid'));
  //  console.log('busca perfil operador state - '+sessionStorage.getItem('logperfil'));   
    api.get(`/operador/get/${sessionStorage.getItem('logoperadorId')}`)
    .then(res=>{
      //  console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
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
            validacao_nome: true,
            validacao_datanascimento: true,
            validacao_email: true,
            validacao_telefone: true,
          })                        
         
          sessionStorage.setItem('logid', res.data.data[0].empresaId);
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
  
          this.setState({ 
            validate 
          })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão busca_operador "+error)
      })       
  
  }

  busca_operador_cadastro() {
    const { validate } = this.state
   // console.log('busca operador ID '+sessionStorage.getItem('logid'));
    console.log('busca logoperadorId operador state - '+sessionStorage.getItem('logoperadorId'));   
    api.get(`/operador/get/${sessionStorage.getItem('logoperadorId')}`)
    .then(res=>{
      //  console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
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
            validacao_nome: true,
            validacao_datanascimento: true,
            validacao_email: true,
            validacao_telefone: true,
          })                        
         
          sessionStorage.setItem('logid', res.data.data[0].empresaId);
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
  
          this.setState({ 
            validate 
          })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão busca_operador "+error)
      })       
  
  }
  busca_cpf(e){
   const { validate } = this.state
   const cpflog = e.target.value   

  console.log(`/operador/getOperadorCpf/${cpflog}/${this.state.campCnpj}`);   
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
  
  verificaCpf(e) {
    const { validate } = this.state
       if (e.target.value.length == 0) {
        //validate.cpfState = 'has-danger'
       // validate.datanascimentoState = ''     
       // validate.nomeState = ''
       // validate.telefone1State = ''
        this.setState({ 
          validate,       
         // campNome: '',
          //campData_nascimento: '',        
          //campTelefone1: '',
          inicio: 1,
           erro_cpf:false,
           validacao_cpf: false,
         // mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       } else if (e.target.value.length == 14) {
        if (cpf.isValid(e.target.value)) {
           //cpf válido 
           this.setState({            
             erro_cpf:false,
             validacao_cpf: true,
           })            
          console.log('é valido - '+e.target.value);
          //this.busca_cpf(e);// se existir não deixa cadastrar
        }
         
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
              inicio: 2,
              mensagem_telefone1: ''
          });           
        }

       }        
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
            validacao_email: true,    
            mensagem_email: ''  
        })                   
       }     
    })        
    .catch(error=>{
      alert("Erro de conexão 3"+error)
    })                   
  }

  verificaEmail(e){   
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.emailState = 'has-danger'
      this.setState({ 
        validate,
        erro_email: true,   
        validacao_email: false,    
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
          erro_nome: true,   
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
    let date_validar = this.state.campData_nascimento;
    var dia = date_validar.substr(0,2);
    var mes = date_validar.substr(3,2);   
    var ano = date_validar.substr(6,4);   

       if (this.state.campData_nascimento.length == 0) {     
         this.setState({ 
             validate,
            erro_datanascimento: false, 
            validacao_datanascimento: false,    
            mensagem_data_nascimento: '' 
         })    
         
       } else if (this.state.campData_nascimento.length == 10) {


        if ( mes == '02' && dia == 29 && (!Number.isInteger(ano / 4)) ){
         
            this.setState({ 
              validate,
              erro_datanascimento: true,   
              validacao_datanascimento: false,      
              mensagem_data_nascimento: 'Dia é inválido.' 
             })  

        } else if ( mes == '02' && dia == 30) {

          this.setState({ 
            validate,
            erro_datanascimento: true,   
            validacao_datanascimento: false,      
            mensagem_data_nascimento: 'Dia é inválido.' 
           })  

        } else if ( mes == '02' && dia == 31) {

            this.setState({ 
              validate,
              erro_datanascimento: true,   
              validacao_datanascimento: false,      
              mensagem_data_nascimento: 'Dia é inválido.' 
             })  

        }  
        else {
          
    
        if (dia > 31) {
         this.setState({ 
          validate,
          erro_datanascimento: true,   
          validacao_datanascimento: false,             
          mensagem_data_nascimento: 'Dia é inválido.' 
          })  
        } else if (mes > 12) {
         this.setState({ 
          validate,
          erro_datanascimento: true,   
          validacao_datanascimento: false,             
          mensagem_data_nascimento: 'Mês é inválido.' 
          })  
        } else if ((mes==4||mes==6||mes==9||mes==11) && dia==31) {
         this.setState({ 
          validate,
          erro_datanascimento: true,   
          validacao_datanascimento: false,             
          mensagem_data_nascimento: 'Data do serviço é inválido.' 
          })  
        } else {
          validate.datanascimentoState = 'has-success' ;      
         this.setState({ 
          validate,
          erro_datanascimento: false,   
          validacao_datanascimento: true,             
          mensagem_data_nascimento: '',
         });   
        }     

       }
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
             //  this.busca_cpf(e);// se existir não deixa cadastrar

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
          //this.setState({ mensagem_telefone1: 'O campo Telefone é obrigatório.' })  
        } else {          
          
          if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success'       
            this.setState({ mensagem_telefone1: '' })  

            this.setState({ 
              inicio: 2,
              erro_telefone: false,   
              validacao_telefone: true,    
              progresso: 50
            });             
          }          
        }  
        this.setState({ validate })
        this.verifica_botao(this.state.inicio)
    }
    
validaNomeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length > 0) {
      validate.nomeState = ''
      //this.setState({ mensagem_nome: '' })  
   // } else if (e.target.value.length > 10) {      
   //   validate.nomeState = 'has-success'       
   //   this.setState({ mensagem_nome: '' })  
    }  
    this.setState({ validate })  
}
validaDataNascimentoChange(e){
  const { validate } = this.state
  
  if (e.target.value.length < 1) {
    validate.datanascimentoState = 'has-danger'
    this.setState({ 
      erro_datanascimento: false,
      validacao_datanascimento: false,
      mensagem_data_nascimento: '' 
    })  
  } else if (e.target.value.length > 0) {      
    validate.datanascimentoState = 'has-success'       
    this.setState({ 
      erro_datanascimento: false,
      validacao_datanascimento: true,
      mensagem_data_nascimento: '' 
    })  
  }  
}

verifica_botao(inicio) {
  const { validate } = this.state    
  console.log(JSON.stringify(this.state, null, "    "));

if (inicio == 1) {
  return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado" p={2}>
            <div className="d-flex justify-content-center">
              <label> Próximo </label>
            </div>     
      </Box>           
  );   
} else {

  if (this.state.validacao_cpf == true && this.state.validacao_datanascimento == true  
    && this.state.validacao_email == true && this.state.validacao_nome == true
    && this.state.validacao_telefone == true) {
      return (           
        <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados"  p={2} onClick={()=>this.sendSave()}>
        <div className="d-flex justify-content-center">
            <label> Próximo </label>
        </div>     
        </Box>           
      );
    } else {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado" p={2}>
              <div className="d-flex justify-content-center">
                <label> Próximo </label>
              </div>     
        </Box>           
    );   
    }         
}

} 
/*
envio_email(email, nome, senhaaleatoria) {

  const transporter = nodemailer.createTransport({
    host: "smtp.oser.app.br",
    //host: "smtps.uol.com.br",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        //user: "mateus.dutra@oserbrasil.com.br",
        user: "mateus.dutra@oser.app.br",
        pass: "uvlb4otd"
    },
    tls: { rejectUnauthorized: false }
   });
  
  const mailOptions = {
   // from: "mateus.dutra@oserbrasil.com.br",
    from: "mateus.dutra@oser.app.br",
    to: `${email}`,
    subject: "E-mail enviado usando Node!",
    text: `Bem vindo(a) ${nome}, sua senha é inicial ${senhaaleatoria}.  `
  };
  console.log('email - '+JSON.stringify(mailOptions, null, "    ")); 

  transporter.sendMail(mailOptions);
} 
*/

sendSave(){        
  const { validate } = this.state;       
  validate.cpfState= '';
  this.setState({ 
     mensagem_aguarde: 'Aguarde, salvando os dados...',       
     validate 
  }); 
    

   //  const senhaAleatoria = Math.random().toString(36).slice(-8);
   console.log('Incluir '+this.state.incluir); 

     if (this.state.incluir == true) {
      const datapost_incluir = {
        nome: this.state.campNome,              
        email: this.state.campEmail,
        celular: this.state.campTelefone1,    
        data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),     
        cpf: this.state.campCpf,  
        perfilId: 8,
        empresaId: this.state.empresaId,
        statusId: 1,        
        situacaoId: 1
       }                 
       console.log('incluir - '+JSON.stringify(datapost_incluir, null, "    ")); 
        api.post('/operador/create',datapost_incluir)
        .then(response=>{
          if (response.data.success) {                       
           
            const logindata = {  
              email: this.state.campEmail,                
              perfilId: 8,
              statusId: 1,
              logid: response.data.data.id
            }

            api.post('/login/create',logindata)                      
          
          if (sessionStorage.getItem('logperfil') == 1) {
             sessionStorage.setItem('logperfil', 1);
             this.props.history.push('/area_administrador');                 
          } else if (sessionStorage.getItem('logperfil') == 7) {         
            sessionStorage.setItem('logperfil', 8);
            sessionStorage.setItem('logid', response.data.data.id); 
            this.props.history.push(`/area_operador`);       
          } else if (sessionStorage.getItem('logperfil') == 0) {
            sessionStorage.setItem('lognome', this.state.campNome);  
            sessionStorage.setItem('logid', response.data.data.id);  
            sessionStorage.setItem('logperfil', 8);
            this.props.history.push('/senha_operador_incluir/'+response.data.data.id);       
          }           
  
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
    } else {
      
      const datapost_alterar = {
        nome: this.state.campNome,              
        email: this.state.campEmail,
        celular: this.state.campTelefone1,    
        data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),     
        cpf: this.state.campCpf,
        perfilId: 8,
       }  

      console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
      api.put(`/operador/update/${sessionStorage.getItem('logoperadorId')}`, datapost_alterar)
      .then(response=>{
        if (response.data.success==true) {                        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 8,
            statusId: this.state.campStatusId
          }

          console.log('logindata - '+JSON.stringify(logindata, null, "    ")); 
          api.put(`/login/update/${sessionStorage.getItem('logoperadorId')}`,logindata)
          
        //  sessionStorage.setItem('lognome', this.state.campNome);  
          //sessionStorage.setItem('logid', userId);
          if (sessionStorage.getItem('logperfil') == 1) {
            this.props.history.push(`/area_administrador`);
          } else if (sessionStorage.getItem('logperfil') == 7) {
              this.props.history.push(`/area_cliente_empresarial`);                   
          } else if (sessionStorage.getItem('logperfil') == 8) {
              this.props.history.push(`/senha_operador_incluir/`+sessionStorage.getItem('logoperadorId'));                                  
          } else if (sessionStorage.getItem('logperfil') == 0) {
            this.props.history.push(`/senha_operador_incluir/`+sessionStorage.getItem('logoperadorId'));                                  
          }                

        }
        else {
//console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
          alert("Error na Criação verificar log")              
        }
      }).catch(error=>{
        alert("Error 34 ")
      })

    }      
}  

verificaCpfonblur(e) {
  const { validate } = this.state        
     if (e.target.value.length == 0) {         
     // validate.cpfState = 'has-danger'       
      this.setState({ 
        validate,            
        inicio: 1,
        erro_cpf: true,
        validacao_cpf: false,
        mensagem_cpf: '',  
       })                    
     }  else if (e.target.value.length == 14) {          
      //valida o cpf 
       console.log('e.target.value - '+e.target.value);
       if (cpf.isValid(e.target.value)) {
           //cpf válido 
          // console.log('é valido - '+e.target.value);
          // this.busca_cpf(e);// se existir não deixa cadastrar

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

verificar_menu() {   
 // console.log('perfil verificar_menu -'+sessionStorage.getItem('logperfil'))
 return(
  <div>
      <div className="d-flex justify-content-around">
           <div className="botao_navegacao">                                  
             </div>                  
             <div>
               <div className="titulo_representante">                
                  <label>  Olá, Fale um pouco sobre você!</label>            
               </div>
             </div>   
             
             <div>
                <div className="botao_navegacao">
                   
                </div>   
             </div>                     
      </div>      
        <br/>    
        <div className="barra_incluir">        
           <Progress color="warning" value={this.state.progresso} className="progressbar"/>
        </div>      
  </div>           
 );

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

busca_email_convite() {
  const { validate } = this.state
  //console.log('busca cliente metodo e ID '+sessionStorage.getItem('logid'));    
  api.get(`/emailOperador/getEmail/${sessionStorage.getItem('logemail')}`)
  .then(res=>{       
      if (res.data.data.length > 0) {
         
        this.setState({           
          campEmail: res.data.data[0].email,           
          inicio: 2,
          incluir: true
        })                 
 
        validate.emailState = 'has-success'
        this.setState({ validate })
      }   
        
    })        
    .catch(error=>{
      alert("Error de conexão busca_email "+error)
    })       

} 


render(){  

return (
<div>   
<div>
<div className="d-flex justify-content">  
<div className="d-flex justify-content-start"> 
      <div className="area_direita">   
          <div>   
            <img className="titulo_logo" src="../../logo.png"/>
         </div>      
      </div>    
   </div>
    <div className="area_esquerda">     
           {this.verificar_menu()}

           <div className="d-flex flex-column espacamento_caixa_texto">        
              <div className="p-2"> 
               <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">CPF</InputLabel>
                     <OutlinedInput 
                        autoComplete="off"                                   
                        type="text"                       
                        error={this.state.erro_cpf}
                        helperText={this.state.mensagem_cpf}
                        className="cpf_incluir_text"                       
                        id="cpf_incluir"                      
                        variant="outlined"
                        value={this.state.campCpf}
                        onKeyUp={this.verificaCpf}
                        onFocus={this.verificaCpfonfocus}
                        onBlur={this.verificaCpfonblur}
                        onChange={ (e) => {
                         this.cpfchange(e)                       
                         this.validaCpfChange(e)
                        }}          
                        inputProps={{
                          maxLength: 14,
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
              <div className="p-2"> 
                 <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome</InputLabel>
                     <OutlinedInput
                        autoComplete="off"
                        type="text"                       
                        error={this.state.erro_nome}
                        helperText={this.state.mensagem_cpf}
                        className="nome_incluir_text"                       
                        id="nome_incluir"                   
                        variant="outlined"
                        value={this.state.campNome}
                        onBlur={this.verificaNome}
                        onFocus={this.verificaNomeonfocus}
                      onChange={ (e) => {
                        this.nomeChange(e)                       
                        this.validaNomeChange(e)
                      }}     
                      inputProps={{
                        maxLength: 40,
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
              <div className="p-2">   
                <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Data de nascimento</InputLabel>
                     <OutlinedInput    
                        autoComplete="off"                     
                        error={this.state.erro_datanascimento}
                        helperText={this.state.mensagem_data_nascimento}
                        className="data_text"                       
                        id="data_incluir"                   
                        variant="outlined"
                        value={this.state.campData_nascimento}
                        onBlur={this.verificaDataNascimento}
                        onKeyUp={this.verificaDataNascimento}
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
              <div className="p-2">
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Email</InputLabel>
                     <OutlinedInput          
                        autoComplete="off"      
                        disabled={this.state.email_disabilitado}            
                        type="email"
                        error={this.state.erro_email}
                        helperText={this.state.mensagem_email}
                        className="data_text"                       
                        id="email_incluir"                   
                        variant="outlined"
                        value={this.state.campEmail}
                        onBlur={this.verificaEmail}                     
                        onFocus={this.verificaEmailonfocus}                       
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
              <div className="p-2">
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Telefone</InputLabel>
                     <OutlinedInput     
                        autoComplete="off"                              
                        type="text"                                      
                        error={this.state.erro_telefone}
                        helperText={this.state.mensagem_telefone1}
                        className="data_text"                       
                        id="telefone_incluir"                   
                        variant="outlined"
                        value={this.state.campTelefone1}                
                        onBlur={this.verificaTelefone1}            
                        onFocus={this.verificaTelefone1onfocus}
                        onChange={ (e) => {
                          this.telefone1change(e)                       
                          this.validatelefone1Change(e)
                        }}          
                        inputProps={{
                          maxLength: 40,
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
            <div className="mensagem_aguarde">
              <FormHelperText>
                  {this.state.mensagem_aguarde}
              </FormHelperText>       
            </div>          
            {this.verifica_botao(this.state.inicio)}             
         </div>   
         <div className="area_neutra">
              <Container maxWidth="sm" className="barra_incluir">
                  <Typography component="div" style={{ backgroundColor: '#white', height: '220px' }} />
              </Container>            
         </div>               
     </div>         
   </div>  
</div> 
  );
} 
}
export default operadoresComponent;