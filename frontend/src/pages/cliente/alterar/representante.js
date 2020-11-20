import React  from 'react';
import Box from '@material-ui/core/Box';
import { celularMask } from '../../formatacao/celularmask';
import { cpfMask } from '../../formatacao/cpfmask';
import api from '../../../services/api';
import '../individual.css';
import Menu_cliente_individual from '../../cliente/menu_cliente_individual';
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
const andamento_cadastro = localStorage.getItem('logprogress'); 

class cliente_alterarComponent extends React.Component{  

  constructor(props){
    super(props);  
    this.textInput = React.createRef();
    this.state = { 
      campId: 0,     
      campNome: "",
      campData_nascimento:"",
      campEmail:"",    
      campEmailAnterior: '',  
      campTelefone1:"",
      campCpf:"",       
      campCpfanterior:"",       
      camp_cpf_disabled: false,
      camp_nome_disabled: false,
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
      mensagem_aguarde: '',
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

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_cpf = this.busca_cpf.bind(this);  
    this.busca_cliente = this.busca_cliente.bind(this);
    this.verificar_menu = this.verificar_menu.bind(this);    

    this.verifica_nome_individual = this.verifica_nome_individual.bind(this);  
  }

  componentDidMount(){ 
    moment.locale('pt-br');
    let userId = this.props.match.params.id;    
    
    localStorage.setItem('logid', userId);
   // const perfillog = localStorage.getItem('logperfil');
    const logid = localStorage.getItem('logid');

    if (localStorage.getItem('logperfil') == null) {
      localStorage.setItem('logperfil', 0);
    }
    if (localStorage.getItem('logid') == 0) { // esta vindo do create      
      localStorage.setItem('logrepresentante', 0);
      localStorage.setItem('logsenha', '');
      localStorage.setItem('logcepbanco', '');
      this.setState({              
        campStatusId: 6,
         progresso: 0      
      }); 
   } else {  // esta vindo do administrador ou cliente empresarial
      this.setState({              
        progresso: 25
      });    
   } 

    if (localStorage.getItem('logperfil') == 2) {
      this.setState({      
        camp_cpf_disabled: true,
      //  camp_nome_disabled: true,
      });   
    }
   
    
    if ( logid !== 0 ) {
      this.busca_cliente();      
    } else {
      this.setState({      
         incluir: true 
      });   
    }
    
  }

  verifica_nome_individual(nome){
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
   // console.log('busca cliente metodo e ID '+localStorage.getItem('logid'));
   // console.log('busca perfil state - '+localStorage.getItem('logperfil'));  
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {

        //  const dataF = new Data(res.data.data[0].data_nascimento);          
          
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campCpfanterior: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,
            campData_nascimento: dateFormat(res.data.data[0].data_nascimento, "UTC:dd/mm/yyyy"),
            campEmail: res.data.data[0].email,      
            campEmailAnterior: res.data.data[0].email,      
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
  busca_cpf(e){
    const { validate } = this.state
   api.get(`/cliente/getClienteCpf/${e.target.value}`)
   .then(res=>{
       console.log(JSON.stringify(res.data, null, "    ")); 
       if (res.data.success) {
          
          validate.cpfState = 'has-danger'
          this.setState({ 
             erro_cpf: true,
             mensagem_cpf: 'Representante já cadastrado'  
          });
          this.state.incluir= false
 
         this.setState({ validate })
       } else {
           validate.cpfState = 'has-success'
           this.setState({ 
             erro_cpf: false, 
             validacao_cpf: true,        
             mensagem_cpf: '',
             incluir: true   
           });
           
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
     
      if (this.state.campCpfanterior !== this.state.campCpf) {
        console.log('é valido - '+e.target.value);
        this.busca_cpf(e);// se existir não deixa cadastrar 
      }  
      
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
          erro_cpf: false, 
          validacao_cpf: false,    
          mensagem_cpf: ''  
         })            
       }  
   }  

   verificaCpfonblur(e) {
    const { validate } = this.state
       if (e.target.value.length < 14) {
        validate.cpfState = ''       
        this.setState({ 
          validate,                 
          inicio: 1,
          erro_cpf: true, 
          validacao_cpf: false,    
          mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       } else if (e.target.value.length == 14){                
         if (this.state.campCpfanterior !== this.state.campCpf) {
              console.log('é valido - '+e.target.value);
              this.busca_cpf(e);// se existir não deixa cadastrar 
         }  
       }  
   }
  
  verificaTelefone1(e) {  
    const { validate } = this.state
       if (e.target.value.length < 15) {                  
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
              erro_cpf: false, 
              validacao_cpf: true,    
              mensagem_telefone1: ''
          });           
        }

       }        
   }

   verificaEmailonfocus(e){   
    const { validate } = this.state
      if (e.target.value.length == 0) {      
        this.setState({ 
            validate,
            erro_email: false, 
            validacao_cpf: false,    
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
      if (e.target.value.length == 0) {      
       this.setState({ 
            validate,
            erro_telefone: false, 
            validacao_telefone: false,    
            mensagem_telefone1: ''  
        })               
      }    
   } 

  verificaEmail(e){   
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.emailState = 'has-danger'
      this.setState({ 
        validate,
        erro_email: false, 
        validacao_cpf: false,    
        mensagem_email: ''  
    })                          
    } else if (e.target.value.length > 0 && validate.emailState == 'has-danger') {
    this.setState({ 
      validate,
      erro_email: true, 
      validacao_cpf: false,    
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
        this.setState({ 
          validate,
          erro_datanascimento: false, 
          validacao_datanascimento: false,    
          mensagem_data_nascimento: ''  
         })      
       } else if (this.state.campData_nascimento.length == 10) {

        let date_validar = this.state.campData_nascimento;
        var dia = date_validar.substr(0,2);
        var mes = date_validar.substr(3,2);         
    
        if (dia > 31) {
         this.setState({ 
          erro_datanascimento: true,   
          validacao_datanascimento: false,             
          mensagem_data_nascimento: 'Dia é inválido.' 
          })  
        } else if (mes > 12) {
         this.setState({ 
          erro_datanascimento: true,   
          validacao_datanascimento: false,             
          mensagem_data_nascimento: 'Mês é inválido.' 
          })  
        } else if ((mes==4||mes==6||mes==9||mes==11) && dia==31) {
         this.setState({ 
          erro_datanascimento: true,   
          validacao_datanascimento: false,             
          mensagem_data_nascimento: 'Data do serviço é inválido.' 
          })  
        } else {
         this.setState({ 
          erro_datanascimento: false,   
          validacao_datanascimento: true,             
          mensagem_data_nascimento: '',
         });   
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
           
           console.log('email anterior '+this.state.campEmailAnterior);
           console.log('email atual '+ e.target.value);
           
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
            erro_email: false, 
            validacao_email: true,    
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
              mensagem_telefone1: '',
              inicio: 2,
              progresso: 25 
            })  
          }          
        }  
        this.setState({ validate })
        this.verifica_botao(this.state.inicio)
    }
    
validaNomeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {   
      this.setState({ 
        erro_nome: false, 
        validacao_telefone: false,    
        mensagem_nome: '' 
      })  
    } else if (e.target.value.length > 0) {      
      validate.nomeState = ''       
      this.setState({ 
        erro_nome: false, 
        validacao_telefone: true,    
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
        validacao_telefone: false,    
        mensagem_data_nascimento: '' 
      })  
    }
    
    /*else {    
      
      if (e.target.value.length == 1) {
        
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
      perfilId: 2,
      statusId: this.state.campStatusId,
      situacaoId: 1
 }      

      console.log('Alterar - '+JSON.stringify(datapost, null, "    ")); 
      api.put(`/cliente/update/${localStorage.getItem('logid')}`, datapost)
      .then(response=>{
        if (response.data.success==true) {        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 2,
            statusId: this.state.campStatusId
          }

          api.put(`/login/update/${localStorage.getItem('logid')}`,logindata)
          
          localStorage.setItem('lognome', this.state.campNome);  
          //localStorage.setItem('logid', userId);
       
          if (localStorage.getItem('logperfil') == 1) {
            localStorage.setItem('logperfil', 1);
            this.props.history.push(`/area_administrador/`);   
         } else if (localStorage.getItem('logperfil') == 2) {
             this.props.history.push(`/area_cliente_individual`);
         } else if (localStorage.getItem('logperfil') == 7) {  
             this.props.history.push(`/area_cliente_empresarial`);                              
         } else if (localStorage.getItem('logperfil') == 0) {
             this.props.history.push(`/cliente_senha/`+localStorage.getItem('logid'));   
         }             
           

        }
        else {
          console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
          alert("Error na Criação verificar log")              
        }
      }).catch(error=>{
        alert("Error 34 ")
      })

         
}  

verificar_menu() {   
 // console.log('perfil verificar_menu -'+localStorage.getItem('logperfil'))

  return(
    <div className="d-flex justify-content-around">
            <div className="botao_navegacao">                                           
             </div>                                  
             <div>
               <div className="titulo_representante_cliente">                                 
                 <label> {this.verifica_nome_individual(this.state.campNome)}, altere seus dados</label>            
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
  } else if (localStorage.getItem('logperfil') == 2) {
   return( 
     <Menu_cliente_individual />     
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
render(){  

return (
<div>    
<div>
 {this.verificar_menu_lateral()}
<div> 
    <div>     
    <div className="container-fluid titulo_lista margem_left">                   
           <div className="unnamed-character-style-4 descricao_admministrador">                                
                 <div className="titulo_bemvindo"> Dados do Perfil </div>             
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
                  <FormControl variant="outlined" disabled={this.state.camp_cpf_disabled}>
                    <InputLabel className="label_cliente_individual" htmlFor="filled-adornment-password">CPF</InputLabel>
                     <OutlinedInput
                        autoComplete="off"         
                        readOnly={this.state.camp_cpf_disabled}                        
                        error={this.state.erro_cpf}
                        helperText={this.state.mensagem_cpf}
                        className="data_cliente_individual"                       
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
                    <InputLabel className="label_cliente_individual" htmlFor="filled-adornment-password">Nome</InputLabel>
                     <OutlinedInput          
                        autoComplete="off"                     
                        error={this.state.erro_nome}
                        helperText={this.state.mensagem_cpf}
                        className="data_cliente_individual"                       
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
                    <InputLabel className="label_cliente_individual" htmlFor="filled-adornment-password">Data de nascimento</InputLabel>
                     <OutlinedInput                  
                        autoComplete="off"              
                        error={this.state.erro_datanascimento}
                        helperText={this.state.mensagem_data_nascimento}
                        className="data_cliente_individual"                       
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
                    <InputLabel className="label_cliente_individual" htmlFor="filled-adornment-password">Email</InputLabel>
                     <OutlinedInput    
                        autoComplete="off"                          
                        type="email"
                        error={this.state.erro_email}
                        helperText={this.state.mensagem_email}
                        className="data_cliente_individual"                       
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
                            maxLength: 40,
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
                    <InputLabel className="label_cliente_individual" htmlFor="filled-adornment-password">Telefone</InputLabel>
                     <OutlinedInput      
                        autoComplete="off"                     
                        error={this.state.erro_telefone}
                        helperText={this.state.mensagem_telefone1}
                        className="data_cliente_individual"                       
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
   </div>  
   
 </div>
</div> 
  );
} 
}
export default cliente_alterarComponent;