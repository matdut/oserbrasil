import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import api from '../../services/api';
import './operadores.css';

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
      campTelefone1:"",
      campRazao_social: "",
      campCpf:"",       
      camp_cpf_disabled: false,
      camp_nome_disabled: false,
      campStatusId:'',
      campCriador:'',
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
    
    
    this.verificaEmailonfocus = this.verificaEmailonfocus.bind(this);


    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.validaCpfChange = this.validaCpfChange.bind(this);  
    this.validatelefone1Change = this.validatelefone1Change.bind(this);  
    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validaDataNascimentoChange = this.validaDataNascimentoChange.bind(this);  

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_operador = this.busca_operador.bind(this);
   // this.busca_cliente = this.busca_cliente.bind(this);
    this.verificar_menu = this.verificar_menu.bind(this);

    //this.envio_email = this.envio_email.bind(this);   
    
    this.verifica_nome_operador = this.verifica_nome_operador.bind(this);
  }

  componentDidMount(){ 
   
    let userId = this.props.match.params.id;    
    
    localStorage.setItem('logid', userId);
    
    console.log('userID - '+userId)
    console.log('logid - '+localStorage.getItem('logid'));
    console.log('Perfil log - '+localStorage.getItem('logperfil'));    
    
    const logperfil = localStorage.getItem('logperfil');
    

    if (logperfil == 7) { 
      this.setState({      
        campStatusId: 6,
        campCriador: localStorage.getItem('logid'),
        progresso: 0,
        incluir: true,        
        campSenha: '123456',
        inicio: 2
      }); 
      this.busca_cliente();
    }      
    if (localStorage.getItem('logperfil') == 8) {  // operador   
      this.setState({      
        camp_cpf_disabled: true,
     //   camp_nome_disabled: true,
      });   
      this.busca_operador()           
    }

    if (logperfil == 0) {       
      this.busca_operador()      
      this.setState({              
        progresso: 25
      }); 
    }  
    
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

  busca_cliente() {
    const { validate } = this.state
    //console.log('busca cliente metodo e ID '+localStorage.getItem('logid'));
    console.log('busca perfil state - '+localStorage.getItem('logperfil'))  
    api.get(`/empresa/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({           
            campCnpj: res.data.data[0].cnpj,     
            campRazao_social: res.data.data[0].razao_social,                                  
            inicio: 2
          })                 

          if (localStorage.getItem('logperfil') == 8) {
             localStorage.setItem('lograzao_social', this.state.campRazao_social)      
          }   

        //  this.setState({ validate })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão cliente "+error)
      })       
  
  } 
  busca_operador() {
    const { validate } = this.state
    console.log('busca operador ID '+localStorage.getItem('logid'));
    console.log('busca perfil operador state - '+localStorage.getItem('logperfil'));   
    api.get(`/operador/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,
            campData_nascimento: res.data.data[0].data_nascimento,
            campEmail: res.data.data[0].email,      
            campTelefone1: res.data.data[0].celular,            
            campStatusId: res.data.data[0].statusId,
            empresaId: res.data.data[0].empresa.id,
            incluir: false,
            inicio: 2,
          })              
          
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
        alert("Error de conexão operador "+error)
      })       
  
  }
  busca_cpf(e){
   const { validate } = this.state
   const cpflog = e.target.value
   //console.log(`/operador/getOperadorCpf/${cpflog}/${this.state.campCnpj}`);   
  api.get(`/operador/getOperadorCpf/${cpflog}/${this.state.campCnpj}`)
  .then(res=>{
      console.log(JSON.stringify(res.data, null, "    ")); 
      if (res.data.success) {         
         validate.cpfState = 'has-danger'
         this.setState({ 
            mensagem_cpf: 'Operador já cadastrado'  
         });
         this.state.incluir= false

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
      this.busca_email_ja_cadastrado(e.target.value)         
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
          this.busca_email_ja_cadastrado(e.target.value)                
                  
          
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
  console.log('perfil verifica_botao -'+localStorage.getItem('logperfil'))
  if (localStorage.getItem('logperfil') == null) {
    if (inicio == 1) {
      return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                </div>     
          </Box>           
      );   
    } else {
    
      if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
        && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
        && validate.telefone1State == 'has-success') {
          return (           
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_empresa_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
                <label> Próximo </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                  <div className="d-flex justify-content-center">
                    <label> Próximo </label>
                  </div>     
            </Box>           
        );   
        }         
    }
  } else if (localStorage.getItem('logperfil') == 1) {
    if (inicio == 1) {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
          <div className="d-flex justify-content-center">
            <label> Incluir </label>
          </div>     
       </Box>                
      );   
    } else {
      if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
        && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
        && validate.telefone1State == 'has-success') {
          return (           
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_empresa_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
                  <label> Incluir </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
        }         

      }    
  }  else if (localStorage.getItem('logperfil') == 7) {
    if (inicio == 1) {
      return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                <div className="d-flex justify-content-center">
                <label> Incluir </label>
                </div>     
          </Box>           
      );   
    } else {
    if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
        && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
        && validate.telefone1State == 'has-success') {
          return (           
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_empresa_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
            <label> Incluir </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
        }   
      }         
    }  else if (localStorage.getItem('logperfil') == 8) {
      if (inicio == 1) {
        return (
  
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Alterar </label>
                  </div>     
            </Box>           
        );   
      } else {
      if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
          && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
          && validate.telefone1State == 'has-success') {
            return (           
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_empresa_habilitado"  p={2} onClick={()=>this.sendSave()}>
              <div className="d-flex justify-content-center">
              <label> Alterar </label>
              </div>     
              </Box>           
            );
          } else {
            return (
  
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Alterar </label>
                    </div>     
              </Box>           
          );   
          }   
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
  
     const senhaAleatoria = Math.random().toString(36).slice(-8);
     
     if (this.state.incluir) {
      const datapost_incluir = {
        nome: this.state.campNome,              
        email: this.state.campEmail,
        celular: this.state.campTelefone1,    
        data_nascimento: this.state.campData_nascimento,    
        cpf: this.state.campCpf,  
        perfilId: 8,
        empresaId: this.state.campCriador,
        statusId: 7,
        //senha: senhaAleatoria,
        situacaoId: 1
       }           

       console.log('incluir - '+JSON.stringify(datapost_incluir, null, "    ")); 
        api.post('/operador/create',datapost_incluir)
        .then(response=>{
          if (response.data.success) {                       
           
            const logindata = {  
              email: this.state.campEmail,  
              senha: senhaAleatoria,   
              perfilId: 8,
              statusId: 7,
              logid: response.data.data.id
            }

            api.post('/login/create',logindata)

            //const url = response.protocol + '://' + response.get('host')+'/login'            
            const params_email = {
              name: this.state.campNome,   
              email: this.state.campEmail,               
              texto: `Bem vindo(a), ${this.state.campNome} \n Sua senha inicial è ${senhaAleatoria} \n ` 
            }

            
          api.post("/email/send", params_email)         
          
          if (localStorage.getItem('logperfil') == 1) {
             localStorage.setItem('logperfil', 1);
             this.props.history.push('/area_administrador');                 
          } else if (localStorage.getItem('logperfil') == 7) {            
            this.props.history.push(`/area_cliente_empresarial`);       
          } else if (localStorage.getItem('logperfil') == 8) {
            localStorage.setItem('lognome', this.state.campNome);  
            localStorage.setItem('logperfil', 8);
            this.props.history.push('/area_operador');       
          }           
  
          }
          else {
            alert("Error de conexao ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
    } else {
      const datapost_alterar = {
        nome: this.state.campNome,              
        email: this.state.campEmail,
        celular: this.state.campTelefone1,    
        data_nascimento: this.state.campData_nascimento,    
        cpf: this.state.campCpf,
        perfilId: 8,
       }  
       
       const logindata = {  
        email: this.state.campEmail,  
        senha: senhaAleatoria,     
        statusId: 1,
        perfilId: 8,
      }  

      api.put(`/login/update/${localStorage.getItem('logid')}`,logindata)

     // console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
      api.put(`/operador/update/${localStorage.getItem('logid')}`, datapost_alterar)
      .then(response=>{
        if (response.data.success==true) {                        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 8,
            statusId: this.state.campStatusId
          }

          api.put(`/login/update/${localStorage.getItem('logid')}`,logindata)

        //  localStorage.setItem('lognome', this.state.campNome);  
          //localStorage.setItem('logid', userId);
          if (localStorage.getItem('logperfil') == 1) {
            this.props.history.push(`/area_administrador`);
          } else if (localStorage.getItem('logperfil') == 7) {
              this.props.history.push(`/area_cliente_empresarial`);                   
          } else if (localStorage.getItem('logperfil') == 8) {
              this.props.history.push(`/area_operador`);                                  
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

verificar_menu() {   
 // console.log('perfil verificar_menu -'+localStorage.getItem('logperfil'))

  if (localStorage.getItem('logperfil') == 0) {
   
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
                      <Link to='/area_cliente_empresarial'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                        
                  </div>   
               </div>                     
        </div>      
          <br/>    
          <div>        
             <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>      
    </div>           
   );

  } else if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
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
                    <Link to='/lista_individual'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                        
                </div>   
             </div>                     
      </div>      
        <br/>    
        <div>        
           <Progress color="warning" value={this.state.progresso} className="progressbar"/>
        </div>      
  </div>           
      );

  } else if (localStorage.getItem('logperfil') == 7) { // CLIENTE EMPRESARIAL           

    return(
      <div className="d-flex justify-content-around">
              <div className="botao_navegacao">                                
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     <label>  Cadastre os dados do operador </label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                  <Link to='/area_cliente_empresarial'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                                                  
                  </div>   
               </div>   
             
      </div>
      );
  } else if (localStorage.getItem('logperfil') == 8) { // CLIENTE EMPRESARIAL         
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
                  <Link to='/area_operador'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                                                                       
                  </div>   
               </div>   
             
      </div>
      );

  }


}

render(){  

return (
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
                  <label for="inputPassword4">CPF *</label>
                    <Input 
                        disabled={this.state.camp_cpf_disabled}
                        className="input_text_operadores"                        
                        type="text"
                        name="cpf"
                        id="examplcpf"
                        autoComplete='off'
                        autoCorrect='off'
                       //ref={cepInput} 
                        placeholder=""
                        value={this.state.campCpf}
                        valid={ this.state.validate.cpfState === 'has-success' }
                        invalid={ this.state.validate.cpfState === 'has-danger' }
                        onBlur={this.verificaCpfOnblur}
                        onKeyUp={this.verificaCpf}
                       // onFocus={this.verificaCpf}
                        onChange={ (e) => {
                          this.cpfchange(e)                       
                          this.validaCpfChange(e)
                        }}         
                        maxlength="14"                                                                 
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.cpfState}>
                          {this.state.mensagem_cpf}
                      </FormFeedback> 
              </div>
              <div class="p-2"> 
                  <label for="inputEmail4">Nome *</label>
                  <Input      
                      disabled={this.state.camp_nome_disabled}
                      className="input_text_operadores"                  
                      type="text"
                      name="nome"
                      id="examplnome"
                      placeholder=""
                      autoComplete='off'
                      autoCorrect='off'
                      value={this.state.campNome}
                      valid={ this.state.validate.nomeState === 'has-success' }
                      invalid={ this.state.validate.nomeState === 'has-danger' }
                      onBlur={this.verificaNome}
                      onChange={ (e) => {
                        this.nomeChange(e)                       
                        this.validaNomeChange(e)
                      }}    
                      maxlength="120"                                                                      
                    />                                
                    <FormFeedback 
                    invalid={this.state.validate.nomeState}>
                        {this.state.mensagem_nome}
                    </FormFeedback> 
              </div> 
              <div class="p-2">                                
                  <Label for="exampleDatetime">Data de nascimento *</Label>
                  <Input                                    
                    className="input_operadores_date"                  
                    type="date"
                    name="senha2"
                    id="exampleEmail2"                    
                    placeholder=""                    
                    value={this.state.campData_nascimento}
                    valid={ this.state.validate.datanascimentoState === 'has-success' }
                    invalid={ this.state.validate.datanascimentoState === 'has-danger' }
                    onBlur={this.verificaDataNascimento}
                    onChange={ (e) => {
                      this.data_nascimentochange(e)                       
                      this.validaDataNascimentoChange(e)
                    }}  
                    maxlength="10"               
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.datanascimentoState}>
                       {this.state.mensagem_data_nascimento}
                  </FormFeedback>  
              </div>
              <div class="p-2">
                      <label for="email1">Email *</label>
                      <Input         
                        className="input_text_operadores"
                        type="email"
                        ref={this.textInput} 
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campEmail}
                        valid={ this.state.validate.emailState === 'has-success' }
                        invalid={ this.state.validate.emailState === 'has-danger' }
                        onBlur={this.verificaEmail}
                       // onKeyPress={this.verificaEmail}
                        onFocus={this.verificaEmailonfocus}
                        onChange={ (e) => {
                                    this.emailchange(e) 
                                    this.validateEmail(e)
                                    this.validaEmailChange(e)                                
                                  } }
                        maxlength="80"          
                      />                  
                      <FormFeedback 
                      invalid={this.state.validate.emailState}>
                          {this.state.mensagem_email}
                      </FormFeedback> 
              </div>
              <div class="p-2">
                      <label for="inputEmail4">Telefone *</label>                     
                      <Input                        
                        className="input_text_operadores"
                        type="text"
                        name="senha2"
                        id="exampleEmail2"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campTelefone1}
                        valid={ this.state.validate.telefone1State === 'has-success' }
                        invalid={ this.state.validate.telefone1State === 'has-danger' }
                        onBlur={this.verificaTelefone1}
                        onKeyUp={this.verificaTelefone1}
                        onChange={ (e) => {
                          this.telefone1change(e)                       
                          this.validatelefone1Change(e)
                        }}                
                        maxlength="16"                                                          
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.telefone1State}>
                          {this.state.mensagem_telefone1}
                      </FormFeedback>
               </div>
            </div>              
            {this.verifica_botao(this.state.inicio)}             
         </div>                 
   </div>  
</div> 
  );
} 
}
export default operadoresComponent;