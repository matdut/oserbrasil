import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
//import { cepMask } from '../../formatacao/cepmask';
import api from '../../../services/api';
import '../individual.css';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import Menu_cliente_individual from '../../cliente/menu_cliente_individual';
import Menu_administrador from '../../administrador/menu_administrador';
import FormHelperText from '@material-ui/core/FormHelperText';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\$%\^&\*])(?=.{8,})");
//const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

const minimooitocaracterRegex = new RegExp("(?=.{8,})");
const umaletramaiusculaRegex = new RegExp("(?=.*?[A-Z])");
const umnumeroRegex = new RegExp("(?=.*[0-9])");
const umncaracterespecialRegex = new RegExp("(?=.*?[#?!@$%^&*-])");
//const controleRegex = new RegExp("(?=.{8,})(?=.*?[A-Z])(?=.*\d)[A-Za-z\d](?=.*?[#?!@$%^&*-])");

const andamento_cadastro = localStorage.getItem('logprogress');     
//const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');
//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {     
      hiddenSenha: true,  
      hiddenSenhaConfirma: true,  
      campSenha:"",      
      campSenhaTeste:"",    
      campNome: "",
      campStatusId: '',  
      mensagem_senha_erro: '',
      color: 'light',
      campRazao_social: "",
      campcnpj: "",
      inicio: 1,        
      validacao_inicial: 2, 
      showPassword: false,
      validaSenha: false,
      validaSenhaConfirma: false,
      mensagem_senha: '',  
      mensagem_confirm_senha: '',       
      mensagem_oitocaracteres: '',
      mensagem_umnumero: '',
      mensagem_umaletramaiuscula: '',
      mensagem_caracterespecial: '',  
      mensagem_aguarde: '',
      backgroundColor: "#4285F4",      
      validate: {
        senhaState: '',
        senhatesteState: '',
        oitocaracteresState: '',
        umnumeroState: '',
        umaletramaiusculaState: '',
        caracterespecialState: '',
        senhaoitodigitos: false,
        senhaumaletramaiuscula: false,
        senhaumnumero: false,
        senhaumnespecial: false,
      }    
    }        
    this.senhachange = this.senhachange.bind(this);
    this.senhatestechange = this.senhatestechange.bind(this);

    this.verificaSenha = this.verificaSenha.bind(this);  
    this.verificaSenhaTeste = this.verificaSenhaTeste.bind(this);  

    this.validaSenhaChange = this.validaSenhaChange.bind(this);    
    this.validaSenhaTesteChange = this.validaSenhaTesteChange.bind(this);        

    this.controle_oito_caracteres = this.controle_oito_caracteres.bind(this);    
    this.controle_umaletramaiuscula = this.controle_umaletramaiuscula.bind(this);    
    this.controle_um_numero = this.controle_um_numero.bind(this);    
    this.controle_caracter_especial = this.controle_caracter_especial.bind(this);    
    this.analyzeSenha = this.analyzeSenha.bind(this);
    this.analyzeSenhaTeste = this.analyzeSenhaTeste.bind(this);
    this.limpar_campos = this.limpar_campos.bind(this);
    this.verifica_nome = this.verifica_nome.bind(this);
    this.limpa_validacoes = this.limpa_validacoes.bind(this);
    this.carrega_cliente = this.carrega_cliente.bind(this);
    this.validacoes_mensagens = this.validacoes_mensagens.bind(this);

    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);    

    this.toggleSenhaShow = this.toggleSenhaShow.bind(this);
    this.toggleSenhaTesteShow = this.toggleSenhaTesteShow.bind(this);

    this.verificaSenhaonBlur = this.verificaSenhaonBlur.bind(this);        
    
  }

  componentDidMount(){  

    this.setState({      
      progresso: 50
    });      
 
    let userId = this.props.match.params.id;      

    if (localStorage.getItem('loperfil') == 0) {
      this.setState({      
        inicio: 1,
        validacao_inicial: 1       
      })        
      this.validacoes_mensagens(this.state.validacao_inicial)  
    }
   // const perfillog = localStorage.getItem('loperfil');
   this.carrega_senha()

   //localStorage.setItem('logid', userId);     
   this.carrega_cliente()     

  }

  toggleSenhaShow() {
    this.setState({ hiddenSenha: !this.state.hiddenSenha });
  }
  toggleSenhaTesteShow() {
    this.setState({ hiddenSenhaConfirma: !this.state.hiddenSenhaConfirma });
  }

  carrega_senha() {
    const { validate } = this.state;
    api.get(`/login/getSenha/${localStorage.getItem('logid')}/2`) 
    .then(res=>{
      if (res.data.success) {
        this.setState({     
            campSenha: res.data.data[0].senha,
            campSenhaTeste: res.data.data[0].senha,
        })      

        if (this.state.campSenha == null) {
          this.setState({ 
            campSenha: ""
          })  
        }  
        
        if (this.state.campSenha !== "") {
          validate.oitocaracteresState = 'has-success' 
          validate.umaletramaiusculaState = 'has-success' 
          validate.umnumeroState = 'has-success'             
          this.setState({ 
            validate,
            inicio: 2       
          })  
          this.verifica_botao(this.state.inicio)    
          this.validacoes_mensagens(this.state.validacao_inicial)  
        }

      } 
    })        
    .catch(error=>{
      alert("Error de conexão login "+error)
    })     
  }

  
  carrega_cliente() {
    const { validate } = this.state;
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({                        
            campNome: res.data.data[0].nome,         
            inicio: 1       
          })            

        }  
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
    }
  limpar_campos() {
    this.state = {       
      campSenha:"",      
      campSenhaTeste:"",    
      inicio: 1,    
      mensagem_senha: '',  
      mensagem_confirm_senha: '',       
      mensagem_oitocaracteres: '',
      mensagem_umnumero: '',
      mensagem_umaletramaiuscula: '',
      mensagem_caracterespecial: '',  
      showPassword: false,
      backgroundColor: "#4285F4",      
      validate: {
        senhaState: '',
        senhatesteState: '',
        oitocaracteresState: '',
        umnumeroState: '',
        umaletramaiusculaState: '',
        caracterespecialState: '',
        senhaoitodigitos: false,
        senhaumaletramaiuscula: false,
        senhaumnumero: false,
        senhaumnespecial: false,
      }    
    } 
  }

  limpa_validacoes() {
   
    if (this.state.campSenha.length == 0) {
      this.limpar_senha()
    }   
  
   //console.log(' valor - '+this.state.campSenha.length);

  }

  limpar_senha() {
    //console.log('LIMPA_SENHA ');
    this.state = {       
      campSenha: "",      
      campSenhaTeste:"",      
      inicio: 1,    
      validate: {
        senhaState: '',
        senhatesteState: '',
        oitocaracteresState: '',
        umnumeroState: '',
        umaletramaiusculaState: '',
        caracterespecialState: '',
        senhaoitodigitos: false,
        senhaumaletramaiuscula: false,
        senhaumnumero: false,
        senhaumnespecial: false,
      }              
    }  
    this.verifica_botao(this.state.inicio)    
  }
/*
  inicial_oito_caracteres() {   
    return (
      <div className="alerta_senha"><i className="fa fa-check-circle"  aria-hidden="true"></i> Míniomo 8 caracteres.</div>
    );  
   }
   
   inicial_umaletramaiuscula() {
   return (
      <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos uma letra maiúscula.</div>
   );  
   }
   
   inicial_caracter_especial() {
     return (
         <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos um caracter especial (?!@$%#&).</div>
     );  
   }
   
   inicial_um_numero() {
   return (
      <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos um número.</div>
    );  
   }                       
*/
  analyzeSenha(event) {
    //console.log('ENTROU SENHA') 
    const { validate } = this.state;
    this.setState({                   
      inicio: 2,
      validaSenha: false,
      validacao_inicial: 2
    });           
   //console.log('Senha '+event.target.value)
   
    if (event.target.value.length == 0) {
       // console.log('CHAMA LIMPA - ');    
         const { validate } = this.state;
         validate.oitocaracteresState = ''
         validate.umaletramaiusculaState= '' 
         validate.umnumeroState = ''         
        
        this.limpar_senha();        
    } else if (event.target.value.length > 0) {
    
 /*     //console.log('maior que 8 ')
      if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
      && validate.umnumeroState == 'has-success' && validate.caracterespecialState == 'has-success') {
        this.setState({ 
          validaSenha: false
        })  
      } else {
        validate.senhaState= 'has-danger' 
        this.setState({ 
          validate,
          validaSenha: true,
          mensagem_senha: 'erro na senha'                                  

        })  
      }
        
    } else {    */
    //console.log('LETRA - '+event.target.value);
    //if (strongRegex.test(event.target.value)) { 
      if (minimooitocaracterRegex.test(event.target.value)) {       

              validate.oitocaracteresState= 'has-success'
              this.setState({ 
                //backgroundColor: "#FF840A",                
                mensagem_oitocaracteres: '',
                senhaoitodigitos: true 
              });   

              this.controle_oito_caracteres();      
      } 
      if (umaletramaiusculaRegex.test(event.target.value)) {
              
              validate.umaletramaiusculaState= 'has-success'
              this.setState({ 
              // backgroundColor: "#aqua",                
                senhaumaletramaiuscula: true,
                mensagem_umaletramaiuscula: ''
              });        
              this.controle_umaletramaiuscula();
      }      
      if (umnumeroRegex.test(event.target.value)) {
              validate.umnumeroState = 'has-success'
              this.setState({ 
              // backgroundColor: "#aqua",              
                mensagem_umnumero: '', 
                senhaumnumero: true,
                umnumeroState: 'has-success'
              });        
              this.controle_um_numero();                        
      }   
      this.setState({ validate });   
     
    }      
  
  
/*
      if (this.state.oitocaracteresState == "" || this.state.umaletramaiusculaState == "" || 
        this.state.caracterespecialState == "" || this.state.umnumeroState == "") {
          this.limpar_campos()
      } */
      /* else {
            this.setState({ 
              backgroundColor: "#707070",
              mensagem_oitocaracteres: '', 
              mensagem_umaletramaiuscula: '', 
              mensagem_caracterespecial: '', 
              mensagem_umnumero: '', 
              oitocaracteresState: '',
              umaletramaiusculaState: '',
              caracterespecialState: '',
              umnumeroState: ''
            });        
      }  */  
  //  }
  }
  /*
  analyze(event) {
    if (minimooitocaracterRegex.test(event.target.value)) {    
        this.setState({ 
          mensagem_umaletramaiuscula: '',
          umaletramaiusculaState: 'has-success'
           //backgroundColor: "#0F9D58" 
        });   
    } 
  */  
    /* else if (umaletramaiusculaRegex.test(event.target.value)) {
        this.setState({ 
          mensagem_oitocaracteres: '',
          oitocaracteresState: 'has-success'
           // backgroundColor: "#F4B400" 
        });
    } else if(umnumeroRegex.test(event.target.value)) {
        this.setState({ 
          mensagem_umnumero: '',
          umnumeroState: 'has-success'
           //backgroundColor: "#F4B400"
        });        
    } else if(umncaracterespecialRegex.test(event.target.value)) {
        this.setState({ 
          mensagem_caracterespecial: '',
          caracterespecialState: 'has-success'
           //backgroundColor: "#F4B400"
        });                
    } 
     
    else {
        this.setState({ 
          mensagem_caracterespecial: '',
          umaletramaiusculaState: 'has-success',
          oitocaracteresState: 'has-success',
          umnumeroState: 'has-success',
          caracterespecialState: 'has-success',
        });
     }
  } */

  analyzeSenhaTeste(event) {
    const { validate } = this.state;        
    //console.log('ENTROU TESTE')   
    this.setState({                   
      inicio: 1,
      validacao_inicial: 2
    });   
    
    if (event.target.value.length == 0) {
      // console.log('CHAMA LIMPA - ');    
        const { validate } = this.state;
        validate.oitocaracteresState = ''
        validate.umaletramaiusculaState= '' 
        validate.umnumeroState = '' 
        validate.caracterespecialState = ''
        
       this.limpar_senha();        
   } else if (event.target.value.length > 0) {     
   /*  //console.log('maior que 8 ')
     if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
     && validate.umnumeroState == 'has-success' && validate.caracterespecialState == 'has-success') {
       this.setState({ 
         validaSenha: false
       })  
     } else {
       validate.senhaState= 'has-danger' 
       this.setState({ 
         validate,
         validaSenha: true,
         mensagem_senha: 'erro na senha'                                  

       })  
     }     
    } else {       */
    //console.log('LETRA - '+event.target.value);
    //if (strongRegex.test(event.target.value)) { 
      if (minimooitocaracterRegex.test(event.target.value)) {       

              validate.oitocaracteresState= 'has-success'
              this.setState({ 
                //backgroundColor: "#FF840A",                
                mensagem_oitocaracteres: '', 
              });   

              this.controle_oito_caracteres();      
              if (event.target.value.length >= 8 ) {
                console.log('senhateste 8 caracter '+this.state.campSenhaTeste)                
                this.setState({                   
                  inicio: 2,
                  validacao_inicial: 2,
                  progresso: 100                
                });       
               // console.log('Senha1 - '+event.target.value); 
               // console.log('Senha2 - '+this.state.campSenha); 
                if (this.state.campSenha == event.target.value) {               
                   
                    this.validacoes_mensagens(this.state.validacao_inicial) 
                    this.verifica_botao(this.state.inicio)
                }       
              }                  
      } 
      if (umaletramaiusculaRegex.test(event.target.value)) {
              
              validate.umaletramaiusculaState= 'has-success'
              this.setState({ 
              // backgroundColor: "#aqua",
                validate,
                mensagem_umaletramaiuscula: ''
              });        
              this.controle_umaletramaiuscula();
      }      
      if (umnumeroRegex.test(event.target.value)) {
              validate.umnumeroState = 'has-success'
              this.setState({ 
              // backgroundColor: "#aqua",
                validate,
                mensagem_umnumero: '', 
                umnumeroState: 'has-success'
              });        
              this.controle_um_numero();                        
      }   
      this.setState({ validate });   
    }      
  } 

  senhachange(e) {
    this.setState({ campSenha: e.target.value })
  }
  
  senhatestechange(e) {
    this.setState({ campSenhaTeste: e.target.value })
  }
  
  verificaSenha(event){
    const { validate } = this.state    
    if (event.target.value.length == 0) {      
      this.setState({ 
        validate,
        inicio: 1,
        validacao_inicial: 1,
        mensagem_senha: 'O campo Senha é obrigatório'  
      })        
      this.validacoes_mensagens(this.state.validacao_inicial)
    }        
  }
  verificaSenhaonBlur(event){
    const { validate } = this.state
    if (event.target.value.length == 0) {      
      this.setState({ 
        validate,
        inicio: 1,
        validacao_inicial: 1,
        mensagem_senha: 'O campo Senha é obrigatório'  
      })  
      this.validacoes_mensagens(this.state.validacao_inicial)
    } else {
      validate.oitocaracteresState= ''
      validate.umaletramaiusculaState= ''
      validate.umnumeroState= ''      
      this.setState({ 
        validate,
        inicio: 1,
        validacao_inicial: 1,
      });  
      this.validacoes_mensagens(this.state.validacao_inicial)
    }   
    
  } 

  verificaSenhaTeste(event){
    const { validate } = this.state
    this.setState({         
      mensagem_senha_erro: '',
      color: 'light',
    });
    if (event.target.value.length == 0) {
      this.setState({ 
        validate,
        inicio: 1,
        validacao_inicial: 1,
        mensagem_confirm_senha: 'O campo Senha é obrigatório'  
      })  
      this.validacoes_mensagens(this.state.validacao_inicial)
      
    } else if (event.target.value.length > 7) {      
     
      if (this.state.campSenha !== event.target.value) {
        validate.oitocaracteresState= ''
        validate.umaletramaiusculaState= ''
        validate.umnumeroState= ''      
        this.setState({ 
          validate,
          color: 'danger',
          inicio: 1,          
          mensagem_senha_erro: 'As senhas não conferem',  
          validacao_inicial: 1,
        });  
        this.validacoes_mensagens(this.state.validacao_inicial)
      }  
    }  
       
    
    /*else if (event.target.value.length >= 8) {
      console.log('LENGTH == 8');
      validate.oitocaracteresState = ''        
      validate.umaletramaiusculaState= ''
      validate.umnumeroState= ''
      validate.caracterespecialState= ''
      this.setState({ 
        validate,
        inicio: 1,
        validacao_inicial: 1,
        mensagem_confirm_senha: '',     
        mensagem_oitocaracteres: '',
        mensagem_umaletramaiuscula: '',
        mensagem_caracterespecial: '',
        mensagem_umnumero: '',
       });               

       this.validacoes_mensagens(this.state.validacao_inicial)
      }   */
  } 
  /*

  verificaSenhaTeste(event){
  const { validate } = this.state
   
    if (event.target.value.length > 0) { 
      // alert('verificasenha');
        this.analyzeSenhaTeste(event.target.value);  
        
    } else {
  
            validate.senhatesteState = 'has-danger'
            this.setState({ 
                validate,
                mensagem_confirm_senha: 'O campo Senha é obrigatório'  
          }) 
                    
    }  
  
  } 
*/
  validaSenhaChange(e) {
    const { validate } = this.state
    //console.log('cpf - '+e.target.value)
    if (e.target.value.length > 0) {
      //validate.senhaState = 'has-success'     

      this.analyzeSenha(e.target.value);

    } else {
      validate.senhatesteState = 'has-danger'
      this.setState({ mensagem_confirm_senha: 'O campo Senha é obrigatório' })  
    }
    this.setState({ validate })
  }  
  
  validaSenhaTesteChange(e) {
    const { validate } = this.state
    
    
      if (e.target.value !== null) {
        //validate.senhatesteState = 'has-success'         
        this.analyzeSenhaTeste(e.target.value);
        
      } else {
        validate.senhatesteState = 'has-danger'
        this.setState({ mensagem_confirm_senha: 'O campo Senha é obrigatório' })  
      }
    this.setState({ validate })
  }  
  
sendUpdate(){    
  const { validate } = this.state;       
  validate.senhaState= '';
  this.setState({ 
     mensagem_aguarde: 'Aguarde, salvando os dados...',       
     validate 
  }); 

  const datapost = {  
    statusId: 1,  
  }       

  if (localStorage.getItem('logperfil') == 0) {
     localStorage.setItem('logperfil', 2);
  } 

  const logindata = {  
    perfilId: localStorage.getItem('logperfil'),
    senha: this.state.campSenha,     
    statusId: 1
  }  
  //console.log('logid - '+JSON.stringify(localStorage.getItem('logid'), null, "    ")); 
  //console.log('logperfil - '+JSON.stringify(localStorage.getItem('logperfil'), null, "    ")); 
       
     api.put(`/cliente/update/${localStorage.getItem('logid')}`, datapost)        
        .then(response=>{
          if (response.data.success==true) {                       
           
            api.put(`/login/update/${localStorage.getItem('logid')}`,logindata)  
               
                if (localStorage.getItem('logperfil') == 1) {
                  this.props.history.push(`/lista_individual`);                   
                } else {          
                  localStorage.setItem('logperfil', 2);    
                  this.props.history.push('/area_cliente_individual');                
                }        
               
          }
          else {
            alert("Erro de conexao ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
}  

controle_oito_caracteres() {   
  const { validate } = this.state;
    console.log(JSON.stringify(validate, null, "    "));  
    
    if (validate.oitocaracteresState == 'has-success') {
       return (
        <div className="alerta_senha_confirmado"><i className="fa fa-check-circle"  aria-hidden="true"></i> Mínimo 8 caracteres.</div>
        );  
    } else {
      return (
         <div className="alerta_senha"><i className="fa fa-check-circle"  aria-hidden="true"></i> Mínimo 8 caracteres.</div>
       );  
    }
}

controle_umaletramaiuscula() {
  const { validate } = this.state;
   
  if (validate.umaletramaiusculaState == 'has-success') {
    return (
     <div className="alerta_senha_confirmado"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos uma letra maiúscula.</div>
     );  
  } else {
   return (
      <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos uma letra maiúscula.</div>
    );  
 }
}

controle_caracter_especial() {
  const { validate } = this.state;
  if (validate.caracterespecialState == 'has-success') {
    return (
     <div className="alerta_senha_confirmado"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos um caracter especial (?!@$%#&).</div>
     );  
 } else {
   return (
      <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos um caracter especial (?!@$%#&).</div>
    );  
 }
}

controle_um_numero() {
  const { validate } = this.state;
  if (validate.umnumeroState == 'has-success') {
    return (
     <div className="alerta_senha_confirmado"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos um número.</div>
     );  
 } else {
   return (
      <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos um número.</div>
    );  
 }
}

verifica_botao(inicio) {
  const { validate } = this.state;
  
  if (inicio == 1) {
    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2} >
              <div className="d-flex justify-content-center">
              <label> Salvar </label>
              </div>     
        </Box>           
    );   
  } else {
  
      if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
            && validate.umnumeroState == 'has-success' ) {
      
          if (this.state.campSenha !== '' && this.state.campSenhaTeste !== '' 
              && this.state.campSenha == this.state.campSenhaTeste) {
             
            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados"  p={2} onClick={()=>this.sendUpdate()}>
              <div className="d-flex justify-content-center">
              <label> Salvar </label>
              </div>     
              </Box>           
            );
          } else {
            return (

              <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2} >
                      <div className="d-flex justify-content-center">
                      <label> Salvar </label>
                      </div>     
                </Box>                        
                
            );     
          }

        } else {
    
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2} >
                    <div className="d-flex justify-content-center">
                    <label> Salvar </label>
                    </div>     
              </Box>        
              
              
          );   
        }    
  }
 
} 

validacoes_mensagens(controle){
  
  if (controle == 1) {     

    return (     
      <div>
        <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Mínimo 8 caracteres.</div>
        <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos um número.</div>
        <div className="alerta_senha"><i className="fa fa-check-circle" aria-hidden="true"></i> Deve ter ao menos uma letra maiúscula.</div>                        
      </div>   
    );

  } else {
   return ( 
     <div>
        {this.controle_oito_caracteres()}
        {this.controle_um_numero()}
        {this.controle_umaletramaiuscula()}     
     </div>
   );  
  }

}

verifica_nome(nome){
  let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
  if (nome_titulo == "") {
    nome_titulo = nome
  }
  return(    
        nome_titulo          
     );  
} 

handleClickShowPassword() {
  if (this.state.showPassword == true) {
    this.setState({ showPassword: false });   
  } else {
    this.setState({ showPassword: true });   
  }  
};

handleMouseDownPassword = (event) => {
  event.preventDefault();
};

verificar_menu() {   

  return(
    <div>
    <div className="d-flex justify-content-around">
             <div className="botao_navegacao">
                <Link to={`/cliente_incluir/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante_cliente">                
                  <label>{this.verifica_nome(this.state.campNome)}, Cadastre a sua senha de acesso  </label>       
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                            
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

verificar_menu_lateral() {

  if (localStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (localStorage.getItem('logperfil') == 2) {
   return( 
     <Menu_cliente_individual />     
   );
  }

}

render(){  

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
          <div class="d-flex flex-column espacamento_caixa_texto_senha">
              <div class="p-2">    
              <FormControl variant="filled">
                  <InputLabel className="label_cliente_individual" htmlFor="filled-adornment-password">Senha</InputLabel>
                  <FilledInput
                    className="data_cliente_individual"  
                    autoComplete='off'
                    autoCorrect='off'
                    error={this.state.validaSenha}
                    id="filled-adornment-password"
                    type={this.state.hiddenSenha ? "password" : "text"}           
                    value={this.state.campSenha}
                    valid={ this.state.validate.senhaState === 'has-success' }
                    invalid={ this.state.validate.senhaState === 'has-danger' }                        
                    onBlur={this.verificaSenhaonBlur}
                    onKeyUp={this.verificaSenha}
                    onFocus={ (e) => {                     
                      this.analyzeSenha(e)
                     }}      
                    onChange={ (e) => {
                                  this.senhachange(e)                       
                                  this.analyzeSenha(e)
                    }}       
                    maxlength="10"        
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.toggleSenhaShow}
                          onMouseDown={this.handleMouseDownPassword}
                          edge="end"
                        >
                       {this.state.hiddenSenha ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                   <FormFeedback 
                    invalid={this.state.validate.senhaState}>
                        {this.state.mensagem_senha}
                    </FormFeedback>  
                </FormControl>                                         
              </div>
              <div class="p-2">                    
                <FormControl variant="filled">
                    <InputLabel className="label_cliente_individual" htmlFor="filled-adornment-password">Confirme a senha</InputLabel>
                    <FilledInput
                      className="data_cliente_individual"  
                      id="filled-adornment-password"
                      type={this.state.hiddenSenhaConfirma ? "password" : "text"}           
                      value={this.state.campSenhaTeste}
                      valid={this.state.validate.senhatesteState === 'has-success' }
                      invalid={this.state.validate.senhatesteState === 'has-danger' }                       
                      onKeyUp={this.verificaSenhaTeste}                           
                      onFocus={this.verificaSenha}          
                      autoComplete='off'
                      autoCorrect='off'
                      error={false}                      
                      helperText="Senha Incorreta, não atende aos requisitos abaixo"
                      onChange={ (e) => {
                        this.senhatestechange(e)                       
                        this.analyzeSenhaTeste(e)
                      }}                           
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.toggleSenhaTesteShow}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.hiddenSenhaConfirma ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                     <FormFeedback 
                      invalid={this.state.validate.senhatesteState}>
                          {this.state.mensagem_confirm_senha}
                     </FormFeedback>  
                  </FormControl>                   
              </div> 
              <div class="p-2">           

                 {this.validacoes_mensagens(this.state.validacao_inicial)}    

              </div> 
              <Alert className="mensagem_erro" color={this.state.color}>
               {this.state.mensagem_senha_erro}
              </Alert>                
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
                  <Typography component="div" style={{ backgroundColor: '#white', height: '244px' }} />
              </Container>            
         </div>                     
   </div>  
 </div>  
</div> 
  );
} 
}
export default empresarialComponent;