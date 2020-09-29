import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../../formatacao/celularmask';
import { cpfMask } from '../../formatacao/cpfmask';
import api from '../../../services/api';
import '../operadores.css';
import Menu_operador from '../menu_operador';
import Menu_administrador from '../../administrador/menu_administrador';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { dataMask } from '../../formatacao/datamask';

import { Data } from '@react-google-maps/api';

var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
//const nodemailer = require('nodemailer');
const andamento_cadastro = localStorage.getItem('logprogress'); 
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
    this.verificaCpfOnblur = this.verificaCpfOnblur.bind(this);  
    
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

    //this.envio_email = this.envio_email.bind(this);   
    
    this.verifica_nome_operador = this.verifica_nome_operador.bind(this);
  }

  componentDidMount(){ 
   
    let userId = this.props.match.params.id;         
    let email = this.props.match.params.email;         

    console.log('Email '+email);
    localStorage.setItem('logid',  userId);
    //localStorage.setItem('logperfil', 0);
    
    if (email !== "0") {
      localStorage.setItem('logemailId', userId);
      localStorage.setItem('logemail', email);
      this.busca_email(); 
    } else {
      localStorage.setItem('logoperadorId', userId);  
      //localStorage.setItem('logid', userId);  
      this.busca_operador();
    }    

    this.busca_empresa();

    console.log('operador ID alterar'+localStorage.getItem('logoperadorId'));
    console.log('operador perfil - '+localStorage.getItem('logperfil'));   
  }  

  verificaTelefone1onfocus(e){   
    const { validate } = this.state
    validate.telefone1State = ''
       this.setState({ 
            validate,
            erro_telefone: false,   
            validacao_telefone: true,    
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
    //console.log('busca cliente metodo e ID '+localStorage.getItem('logid'));    
    api.get(`/empresa/get/${localStorage.getItem('logempresaid')}`)
    .then(res=>{       
        if (res.data.success) {
           
          this.setState({           
            campCnpj: res.data.data[0].cnpj,
            inicio: 2
          })                 
        } 
      })        
      .catch(error=>{
        alert("Error de conexão busca_empresa "+error)
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
      console.log('é valido asasas - '+e.target.value);
      this.busca_cpf(e);// se existir não deixa cadastrar 
      
    }
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
         
          localStorage.setItem('logempresaid', res.data.data[0].empresaId);
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
        } 
      })        
      .catch(error=>{
        alert("Error de conexão busca_operador "+error)
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
    this.setState({ campData_nascimento: e.target.value })
  }

  verificaEmailonfocus(e){   
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.emailState = ''
      this.setState({ 
          validate,
          mensagem_email: ''  
      })                   
    } else {
      if (this.state.campEmailAnterior !== e.target.value) {
        this.busca_email_ja_cadastrado(e.target.value)         
      }  
    }            
   } 

  verificaCpfOnblur(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
       validate.cpfState = 'has-danger'
       this.setState({ 
        validate,               
        inicio: 1,
        mensagem_cpf: 'O campo CPF é obrigatório'  
       })            
    }   
  }  
  verificaCpf(e) {
    const { validate } = this.state
       if (e.target.value.length == 0) {
        //validate.cpfState = 'has-danger'
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
         // mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       } else if (e.target.value.length == 14) {
        if (cpf.isValid(e.target.value)) {
          //cpf válido 
          console.log('é valido - '+e.target.value);
          this.busca_cpf(e);// se existir não deixa cadastrar
        }
         
       }  
   }
  
  verificaTelefone1(e) {  
    const { validate } = this.state
       if (e.target.value.length == 0) {          
        //validate.telefone1State = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,
          //mensagem_telefone1: 'O campo Telefone é obrigatório.'
         })      
       } else {       

        if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success' ;                
            this.setState({ 
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
                  mensagem_email: 'Email já cadastrado.'  
              })                                           
       } else {
        validate.emailState = 'has-success'
        this.setState({ 
            validate,
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
        mensagem_email: 'Email é obrigatório.'  
    })                          
    } else if (e.target.value.length > 0 && validate.emailState == 'has-danger') {
      this.setState({ 
        validate,
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
          mensagem_nome: 'O campo nome é obrigatório.'  
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
        validate.datanascimentoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.'  
         })      
       } else {

          validate.datanascimentoState = 'has-success' ;        
          this.setState({ 
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
    
    
    validateEmail(e) {
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state
       
      if (emailRex.test(e.target.value)) {                         
          validate.emailState = 'has-success'     
         // console.log(' valida email - '+e.target.value);   
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
            this.setState({ mensagem_cpf: 'O campo CPF é inválido' })     
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
              progresso: 25
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
  
    if (e.target.value.length < 10) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' })  
    } else {    
      
      if (e.target.value.length == 13) {
        
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
      
    }  
    this.setState({ validate })
}

verifica_botao(inicio) {
  const { validate } = this.state    
  if (inicio == 1) {
    return (

        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado" p={2}>
              <div className="d-flex justify-content-center">
              <label> Salvar Alterações </label>
              </div>     
        </Box>           
    );   
  } else {
  if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
      && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
      && validate.telefone1State == 'has-success') {
        return (           
          <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados"  p={2} onClick={()=>this.sendSave()}>
          <div className="d-flex justify-content-center">
          <label> Salvar Alterações </label>
          </div>     
          </Box>           
        );
      } else {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado" p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
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
      
      const datapost_alterar = {
        nome: this.state.campNome,              
        email: this.state.campEmail,
        celular: this.state.campTelefone1,    
        data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),      
        cpf: this.state.campCpf,
        perfilId: 8,
       }  

     // console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
      api.put(`/operador/update/${localStorage.getItem('logoperadorId')}`, datapost_alterar)
      .then(response=>{
        if (response.data.success==true) {                        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 8,
            statusId: this.state.campStatusId
          }

          api.put(`/login/update/${localStorage.getItem('logoperadorId')}`,logindata)

        //  localStorage.setItem('lognome', this.state.campNome);  
          //localStorage.setItem('logid', userId);    
          if (localStorage.getItem('logperfil') == 1) {
            this.props.history.push(`/area_administrador`);
          } else if (localStorage.getItem('logperfil') == 8) {
              this.props.history.push(`/area_operador/`);                                  
          }            

        }        
      }).catch(error=>{
        alert("Erro verificar log  ")
      })           

}  

verificar_menu() {   
 // console.log('perfil verificar_menu -'+localStorage.getItem('logperfil'))
 return(
  <div className="d-flex justify-content-around">
          <div className="botao_navegacao">                           
           </div>                  
           <div>
             <div className="titulo_representante">                
                <label>  {this.verifica_nome_operador(this.state.campNome)}, altere seus dados </label>            
             </div>
           </div>   
           
           <div>
              <div className="botao_navegacao">              
              </div>   
           </div>   
         
  </div>
  ); 

}

verificar_menu_lateral() {

  if (localStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (localStorage.getItem('logperfil') == 8) {
   return( 
     <Menu_operador />     
   );
  }

}
verifica_titulo() {
  if ( this.state.perfil == 1) {
    return (            
         <strong> ADMINISTRADOR </strong>
     ); 
  } else {
    return (      
       <strong>{this.state.campNome}</strong>
     ); 
  }            
}

verifica_horario(){
  const d = new Date();
  const hour = d.getHours();

  if (hour < 5) {
    return (
      <strong> boa noite </strong>          
      );        
  } else if (hour < 5) { 
    return (
      <strong> bom dia </strong>          
      );        
  } else if (hour < 8) { 
    return (
      <strong> bom dia </strong>          
      );        
  } else if (hour < 12) { 
    return (
      <strong> bom dia </strong>          
      );        
  } else if (hour < 18) { 
    return (
      <strong> boa tarde </strong>          
      );        
  } else { 
    return (
      <strong> boa noite </strong>          
      );        
  }
}


render(){  

return (
<div>    
<div className="container_alteracao">
   {this.verificar_menu_lateral()}
   <div className="d-flex justify-content"> 
    <div>     
    <div className="titulo_admministrador">        
           <div className="unnamed-character-style-4 descricao_alteracao">                                
               {this.verifica_titulo()}, {this.verifica_horario()} !
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
                  <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">CPF</InputLabel>
                     <OutlinedInput
                        autoComplete="off"         
                        readOnly={this.state.camp_cpf_disabled}                        
                        error={this.state.erro_cpf}
                        helperText={this.state.mensagem_cpf}
                        className="data_operador"                       
                        id="outlined-basic"                      
                        variant="outlined"
                        value={this.state.campCpf}
                        onKeyUp={this.verificaCpf}
                        onFocus={this.verificaCpfonfocus}
                        onBlur={this.verificaCpfonblur}
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
              <div class="p-2"> 
                 <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome</InputLabel>
                     <OutlinedInput          
                        autoComplete="off"                     
                        error={this.state.erro_nome}
                        helperText={this.state.mensagem_cpf}
                        className="data_operador"                       
                        id="outlined-basic"                   
                        variant="outlined"
                        value={this.state.campNome}
                        onBlur={this.verificaNome}
                        onFocus={this.verificaNomeonfocus}
                      onChange={ (e) => {
                        this.nomeChange(e)                       
                        this.validaNomeChange(e)
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
                <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Data de nascimento</InputLabel>
                     <OutlinedInput            
                        autoComplete="off"                    
                        error={this.state.erro_datanascimento}
                        helperText={this.state.mensagem_data_nascimento}
                        className="data_operador"                       
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
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Email</InputLabel>
                     <OutlinedInput              
                        autoComplete="off"                
                        type="email"
                        error={this.state.erro_email}
                        helperText={this.state.mensagem_email}
                        className="data_operador"                       
                        id="outlined-basic"                   
                        variant="outlined"
                        value={this.state.campEmail}
                        onBlur={this.verificaEmail}                     
                        onFocus={this.verificaEmailonfocus}
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
                      labelWidth={50}                      
                    />
                   <FormHelperText error={this.state.erro_email}>
                         {this.state.mensagem_email}
                   </FormHelperText>
                </FormControl>                       
              </div>
              <div class="p-2">
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Telefone</InputLabel>
                     <OutlinedInput        
                        autoComplete="off"                   
                        error={this.state.erro_telefone}
                        helperText={this.state.mensagem_telefone1}
                        className="data_operador"                       
                        id="outlined-basic"                   
                        variant="outlined"
                        value={this.state.campTelefone1}                
                        onBlur={this.verificaTelefone1}            
                        onFocus={this.verificaTelefone1onfocus}
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
export default operadoresComponent;