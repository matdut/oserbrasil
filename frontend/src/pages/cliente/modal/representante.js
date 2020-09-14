import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../../formatacao/celularmask';
import { cpfMask } from '../../formatacao/cpfmask';
import api from '../../../services/api';
import { dataMask } from '../../formatacao/datamask';
import '../individual.css';
import Menu_cliente_individual from '../../cliente/menu_cliente_individual';
import Menu_administrador from '../../administrador/menu_administrador';

import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
//import { format } from 'date-fns-tz';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Moment from 'moment';

import FormHelperText from '@material-ui/core/FormHelperText';

import CheckIcon from '@material-ui/icons/Check';

import TextField from '@material-ui/core/TextField';


var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
const andamento_cadastro = localStorage.getItem('logprogress'); 

class cliente_alterarComponent extends React.Component{  
//const cliente_alterar = ({ files }) => (

  constructor(props){
    super(props);      
    this.state = { 
      campId: 0,     
      campNome: "",
      campData_nascimento:"",      
      campEmail:"",      
      campTelefone1:"",
      campCpf:"",  
      showModal: true,     
      camp_cpf_disabled: false,
      camp_nome_disabled: false,
      camp_datanasc_disabled: false,
      camp_email_disabled: false,
      camp_telefone_disabled: false,
      mensagem_salvo: '',
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
      listaStatus: [],   
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

    this.carrega_status();
    this.busca_cliente();
    
    if (localStorage.getItem('logperfil') == 1) {
      this.setState({ 
        camp_cpf_disabled: true,
        camp_nome_disabled: true,
        camp_datanasc_disabled: false,
        camp_email_disabled: true,
        camp_telefone_disabled: true,
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

  handleCloseModal () {
    this.setState({ 
      showModal: false,  
    });
  }

  busca_cliente() {
    const { validate } = this.state
   // console.log('busca cliente metodo e ID '+localStorage.getItem('logid'));
   // console.log('busca perfil state - '+localStorage.getItem('logperfil'));  
    console.log(`/cliente/get/${localStorage.getItem('logid')}`);  
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,
            campData_nascimento: Moment(res.data.data[0].data_nascimento).format('DD/MM/YYYY'),
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
            mensagem_cpf: 'Representante já cadastrado'  
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
  
  verificaTelefone1(e) {
   
    const { validate } = this.state
       if (e.target.value.length < 15) {          
        validate.telefone1State = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,
          mensagem_telefone1: 'O campo Telefone é obrigatório.'
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

   verificaEmailonfocus(e){   
    const { validate } = this.state
      if (e.target.value.length == 0) {
        validate.emailState = ''
        this.setState({ 
            validate,
            mensagem_email: ''  
        })                   
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
    
    busca_email_ja_cadastrado(email) {
      const { validate } = this.state
      api.get(`/login/getEmail/${email}`)
      .then(res=>{          
        console.log(' resultado cliente - '+JSON.stringify(res.data, null, "    "));        
        if (res.data.success) {

            validate.emailState = 'has-danger'
            this.setState({ 
                validate,
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
    } /*else {    
      
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

  //const conversaodate = Moment("04/12/1974").format('YYYY/MM/DD');
  //console.log('data 1 - '+JSON.stringify(dateFormat("23/08/2020", 'YYYY/MM/DD'), null, "    "));  
 // console.log('data 3 - '+JSON.stringify(Moment("1994-07-01").format('DD-MM-YYYY'), null, "    ")); 
 // console.log('data 4 - '+JSON.stringify(Moment("1994-07-01").format('YYYY-MM-DD'), null, "    ")); 
  const datapost = {
      nome: this.state.campNome,              
      email: this.state.campEmail,
      celular: this.state.campTelefone1,    
      data_nascimento: Moment(this.state.campData_nascimento).format('YYYY-MM-DD'),    
      cpf: this.state.campCpf,    
      perfilId: 2,
      statusId: this.state.campStatusId,
      situacaoId: 1
 } 
      console.log('datapost - '+JSON.stringify(datapost, null, "    ")); 
      console.log(' this.state.incluir - '+JSON.stringify(this.state.incluir, null, "    ")); 

     if (this.state.incluir) {      
        console.log('incluir 1 - '+JSON.stringify(datapost, null, "    ")); 
        api.post('/cliente/create',datapost)
        .then(response=>{
          if (response.data.success) {                        
            
            const logindata = {  
              email: this.state.campEmail,  
              perfilId: 2,
              statusId: this.state.campStatusId,
              logid: response.data.data.id
            }

            console.log('logindata 1- '+JSON.stringify(logindata, null, "    ")); 
            api.post('/login/create',logindata)

          //console.log('logprogress - '+ this.state.progresso);          
          localStorage.setItem('lognome', this.state.campNome);  
          localStorage.setItem('logid', response.data.data.id);
         
         if (localStorage.getItem('logperfil') == 1) {
            localStorage.setItem('logperfil', 1);
            this.props.history.push(`/cliente_senha/`+localStorage.getItem('logid'));   
         } else if (localStorage.getItem('logperfil') == 2) {
             this.props.history.push(`/area_cliente_individual`);
         } else if (localStorage.getItem('logperfil') == 7) {  
             this.props.history.push(`/area_cliente_empresarial`);                              
         } else if (localStorage.getItem('logperfil') == 0) {
             this.props.history.push(`/cliente_senha/`+localStorage.getItem('logid'));   
         }             
  
          }
          else {
            alert("Error 34 ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
    } else {   
      console.log(`/cliente/update/${localStorage.getItem('logid')}`); 
      api.put(`/cliente/update/${localStorage.getItem('logid')}`, datapost)
      .then(response=>{
        if (response.data.success==true) {        
          
          const logindata = {  
            email: this.state.campEmail,  
            perfilId: 2,
            statusId: this.state.campStatusId
          }
          
          //console.log('logindata 5- '+JSON.stringify(logindata, null, "    ")); 
          //console.log(`/login/update/${localStorage.getItem('logid')}`); 
          api.put(`/login/update/${localStorage.getItem('logid')}`,logindata)
          
          localStorage.setItem('lognome', this.state.campNome);  


          this.setState({ mensagem_salvo: "Dados salvo com sucesso" })
          
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
          console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
          alert("Error na Criação verificar log")              
        }
      }).catch(error=>{
        alert("Error save cliente - "+error)
      })

    }      
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

statusChange(e, data){
  console.log('status cliente '+e.target.value);
  const status =  e.target.value;         
  const datapost = {
    statusId: e.target.value         
  }    
  api.put(`/login/update/${data}`, datapost)
  
  api.put(`/cliente/update/${data}`, datapost)
  .then(response =>{

    if (response.data.success) {

     this.setState({ campStatusId: status })
    //   this.loadCliente();
    //  this.loadFillData();  
    }  
    
  })
  .catch ( error => {
    alert("Erro de Conexão")
  })
}
loadStatus(){
  
  return this.state.listaStatus.map((data)=>{          
    return(
      <option key={data.descricao} value={data.id}>{data.descricao} </option>
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

validar_delete(email, id) {
     
  api.get(`/eventos/listaeventocliente/${id}/${localStorage.getItem('logperfil')}`)
  .then(response =>{

    const registros = response.data.data;
    if (registros.length > 0) {
     // console.log('id - '+response.data);
   //  console.log( JSON.stringify(response.data, null, "    ") );       
     alert('Cliente tem Evento(s) associado(s), não pode ser excluído');     
     
    } else {
      this.sendDelete(email, id);
    } 
  })
  .catch ( error => {
    alert("Erro de Conexão "+error)
  })

}

sendDelete(email, userId){  


  api.delete(`/login/delete/${email}`)     
  //console.log(`/login/delete/${email}`)

  api.delete(`/cliente/delete/${userId}`)
  .then(response =>{

    if (response.data.success) {       
      //this.loadCliente()

    } else {      
      this.setState({ 
        color: 'danger',
        mensagem: 'Seus dados não foram apagados :)'
      })                     
    }
  })
  .catch ( error => {
    alert("Error "+error)
  })
}
render(){  

return (
<div>    
<div className="container_alterado">
  <div className="d-flex justify-content"> 
    <div>     
            <div class="d-flex flex-column espacamento_caixa_texto">
              <div class="p-2">              
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="filled-adornment-password">CPF</InputLabel>
                     <OutlinedInput
                        readOnly={this.state.camp_cpf_disabled}                        
                        error={this.state.erro_cpf}
                        helperText={this.state.mensagem_cpf}
                        className="cpf_text"                       
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
                    <InputLabel htmlFor="filled-adornment-password">Nome</InputLabel>
                     <OutlinedInput      
                        readOnly={this.state.camp_nome_disabled}                     
                        error={this.state.erro_nome}
                        helperText={this.state.mensagem_cpf}
                        className="cpf_text"                       
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
                    <InputLabel htmlFor="filled-adornment-password">Data de nascimento</InputLabel>
                     <OutlinedInput                       
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
                        maxlength={8}      
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
                    <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                     <OutlinedInput       
                        readOnly={this.state.camp_email_disabled}                                   
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
                    <InputLabel htmlFor="filled-adornment-password">Telefone</InputLabel>
                     <OutlinedInput           
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
               <div class="p-2">
                  <div class="d-flex justify-content-start">
                       <div> 
                           <Input                             
                              type="select" 
                              name="select"                               
                              id="exampleSelect" 
                              className="autocomplete_marca"                              
                              value={this.state.campStatusId}                                                                   
                              onChange={ (e) => {
                                this.statusChange(e, localStorage.getItem('logid'))                                                
                              }}                                                          >
                              <option selected>Selecione o status</option>               
                              {this.loadStatus()}   
                          </Input>                                                                
                       </div>                       
                       <div className="alignright">
                       <IconButton aria-label="delete" onClick={()=>this.onDelete(this.state.campEmail, localStorage.getItem('logid'))}>
                          <DeleteIcon />
                        </IconButton>    
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
</div> 
  );
} 
}
export default cliente_alterarComponent;