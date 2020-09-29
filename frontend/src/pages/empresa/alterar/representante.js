import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../../formatacao/celularmask';
import { cpfMask } from '../../formatacao/cpfmask';
import api from '../../../services/api';
import Menu_cliente_empresarial from '../../empresa/menu_cliente_empresarial';
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

import '../empresarial.css';
var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');

//const userId = localStorage.getItem('logid');
const andamento_cadastro = localStorage.getItem('logprogress');   

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = { 
      campId: 0,         
      campNome: "",
      logempresa: "",
      logrepresentante: "",
      campData_nascimento:"",
      campEmailAnterior: '',
      campEmail:"",    
      campEmailAnterior:"",    
      campTelefone1:"",
      campCpf:"",
      campStatusId: '',
      mensagem_nome: '',      
      camprazao_social: '',
      mensagem_cpf: '',  
      camp_cpf_disabled: false,
      camp_nome_disabled: false,
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
    this.verificaCpfonblur = this.verificaCpfonblur.bind(this);  
    this.verificaTelefone1 = this.verificaTelefone1.bind(this);  
    this.verificaNome = this.verificaNome.bind(this);  
    this.verificaDataNascimento = this.verificaDataNascimento.bind(this);  

    this.verificaCpfonfocus = this.verificaCpfonfocus.bind(this); 
    this.verificaNomeonfocus = this.verificaNomeonfocus.bind(this); 
    this.verificaEmailonfocus = this.verificaEmailonfocus.bind(this);   
    this.verificaTelefone1onfocus = this.verificaTelefone1onfocus.bind(this);   

    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.validaCpfChange = this.validaCpfChange.bind(this);  
    this.validatelefone1Change = this.validatelefone1Change.bind(this);  
    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validaDataNascimentoChange = this.validaDataNascimentoChange.bind(this);  

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_cliente = this.busca_cliente.bind(this);         

    this.verifica_nome_empresa = this.verifica_nome_empresa.bind(this);

  }

  componentDidMount(){ 
   // localStorage.clear();
   moment.locale('pt-br');
   let userId = this.props.match.params.id;        

   localStorage.setItem('logid', userId); //logid da empresa 

   if (localStorage.getItem('logperfil') == null) {
     localStorage.setItem('logperfil', 0);
   }

   if (localStorage.getItem('logid') == 0) { // esta vindo do create 
      //localStorage.setItem('logperfil', 0);
     // localStorage.setItem('logrepresentante', 0);
      localStorage.setItem('logsenha', '');
      localStorage.setItem('logcepbanco', '');
      this.setState({              
         incluir: true 
      });    
   } 

   if (localStorage.getItem('logrepresentante') !== 0) {
    this.setState({      
      camp_cpf_disabled: true,
    //  camp_nome_disabled: true,
      progresso: 25
    });   
    this.busca_cliente()
   }
    
   if (localStorage.getItem('logperfil') == 0 && localStorage.getItem('logid') == 0) {
    this.setState({      
      progresso: 0, 
      campStatusId: 6
    });   
   } 

  }

  verifica_nome_empresa(n){
    let nome_titulo = n.substring(0,n.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = n
    }
    return(    
          nome_titulo          
       );  
  }   

  busca_cliente() {
    const { validate } = this.state  
    api.get(`/empresa/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        //console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
          const dataF = new Data(res.data.data[0].data_nascimento);  
          this.setState({ 
            logrepresentante: res.data.data[0].cliente.id,
            camprazao_social: res.data.data[0].razao_social,
            campCpf: res.data.data[0].cliente.cpf,
            campNome: res.data.data[0].cliente.nome,
            campData_nascimento: dateFormat(res.data.data[0].cliente.data_nascimento, "UTC:dd/mm/yyyy"),
            campEmail: res.data.data[0].cliente.email,                         
            campEmailAnterior: res.data.data[0].cliente.email,              
            campTelefone1: res.data.data[0].cliente.celular,
            campCnpj: res.data.data[0].cnpj,
            campStatusId: res.data.data[0].cliente.statusId, 
            incluir: false,           
            inicio: 2,
            validacao_cpf: true,
            validacao_datanascimento: true,
            validacao_email: true,
            validacao_nome: true,
            validacao_telefone: true,
          })  
     
          localStorage.setItem('logrepresentante', this.state.logrepresentante)
          localStorage.setItem('lograzao_social', res.data.data[0].razao_social)
          this.setState({                  
            progresso: 25
          });   
          
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
  
          this.setState({ validate })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão cliente "+error)
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
    } else if (e.target.value.length == 14)  {
      console.log('é valido - '+e.target.value);
      this.busca_cpf(e);// se existir não deixa cadastrar 
      
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
            validacao_telefone: true,    
            mensagem_telefone1: ''  
        })                   
   } 

  busca_cpf(e){
  const { validate } = this.state
  api.get(`/cliente/getClienteCpf/${e.target.value}`)
  .then(res=>{
  
      if (res.data.data.length > 0) {
         
         validate.cpfState = 'has-danger'
         this.setState({ 
          erro_cpf: true,   
          validacao_cpf: false,    
          mensagem_cpf: 'Representante já cadastrado'  
         });

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
       } else if (e.target.value.length == 14) {
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
        this.setState({         
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
        validate.nomeState = 'has-danger'
        this.setState({ 
          validate,
          erro_nome: true,   
          validacao_nome: false,    
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
          erro_datanascimento: true,   
          validacao_datanascimento: false,    
          mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.'  
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
    
    
    validateEmail(e) {
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state
      //if (e.target.value.length < 18) {
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
        validate.emailState = ''
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
            validacao_cpf: true,    
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
          this.setState({ 
            erro_telefone: true,   
            validacao_telefone: false,    
            mensagem_telefone1: 'O campo Telefone é obrigatório.' 
          })  
        } else {          
          
          if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success'       
            this.setState({ 
              erro_telefone: false,   
              validacao_telefone: true,    
              mensagem_telefone1: '',
              inicio: 2 
            })  
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
        validacao_nome: true,    
        mensagem_nome: '' 
      })  
    } else if (e.target.value.length > 0) {      
      validate.nomeState = 'has-success'       
      this.setState({ 
        erro_nome: false,   
        validacao_nome: true,    
        mensagem_nome: '' 
      })  
    }  
    this.setState({ validate })  
}
validaDataNascimentoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length < 10) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ 
        erro_datanascimento: true,   
        validacao_datanascimento: false,    
        mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' 
      })  
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

sendSave(){        
  const { validate } = this.state;       
  validate.cpfState= '';
  this.setState({ 
     mensagem_aguarde: 'Aguarde, alterando os dados...',
     validate 
  }); 

  const datapost = {
    nome: this.state.campNome,              
    email: this.state.campEmail,
    celular: this.state.campTelefone1,    
    data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),     
    cpf: this.state.campCpf,
    statusId: this.state.campStatusId,
    perfilId: 7,    
    situacaoId: 1
  }    

      console.log('Alterar - '+JSON.stringify(datapost, null, "    ")); 
      api.put(`/cliente/update/${localStorage.getItem('logrepresentante')}`, datapost)
      .then(response=>{
        if (response.data.success==true) {                        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 7,
            statusId: this.state.campStatusId
          }

          api.put(`/login/update/${localStorage.getItem('logrepresentante')}`,logindata)
         
          if (localStorage.getItem('logperfil') == 1) {
            this.props.history.push(`/area_administrador/`);             
          } else {               
             this.props.history.push(`/area_cliente_empresarial`);                              
          } 

        }
        else {
          alert("Error 34 ")              
        }
      }).catch(error=>{
        alert("Error 34 ")
      })

}  

verificar_menu(perfil) {   

  return(
    <div>
    <div className="d-flex justify-content-around">
        <div className="botao_navegacao">     
        </div>                  
        <div>
          <div className="titulo_representante">                
            <label>  Representante da Empresa  </label>            
          </div>
        </div>   
        
        <div>
          <div className="botao_navegacao">
              <Link to='/tipo'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                        
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
  } else if (localStorage.getItem('logperfil') == 7) {
   return( 
     <Menu_cliente_empresarial />     
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
               <h5> {localStorage.getItem('lograzao_social')} </h5>               
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
                        className="cpf_incluir_text"                       
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
                        className="nome_incluir_text"                       
                        id="outlined-basic"                   
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
              <div class="p-2">   
                <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Data de nascimento</InputLabel>
                     <OutlinedInput         
                        autoComplete="off"                       
                        error={this.state.erro_datanascimento}
                        helperText={this.state.mensagem_data_nascimento}
                        className="data_text"                       
                        id="outlined-basic"                   
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
              <div class="p-2">
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Email</InputLabel>
                     <OutlinedInput        
                        autoComplete="off"                      
                        type="email"
                        error={this.state.erro_email}
                        helperText={this.state.mensagem_email}
                        className="data_text"                       
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
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Telefone</InputLabel>
                     <OutlinedInput     
                        autoComplete="off"                      
                        error={this.state.erro_telefone}
                        helperText={this.state.mensagem_telefone1}
                        className="data_text"                       
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
            <div className="mensagem_aguarde">
              <FormHelperText>
                  {this.state.mensagem_aguarde}
              </FormHelperText>       
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