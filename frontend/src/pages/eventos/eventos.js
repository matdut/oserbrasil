import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import { cnpjMask } from '../formatacao/cnpjmask';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import Menu_administrador from '../administrador/menu_administrador';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_operador from '../operadores/menu_operador';

import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { valorMask } from '../formatacao/valormask';

import api from '../../services/api';
import './eventos.css';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Modal from 'react-modal';
import Icon from '@material-ui/core/Icon';

var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
//const nodemailer = require('nodemailer');
const andamento_cadastro = localStorage.getItem('logprogress'); 
//var sendmail = require('../sendmail')({silent: true})

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class operadoresComponent extends React.Component{  

  constructor(props){
    super(props);  
    this.textInput = React.createRef();
    this.state = { 
      dataEvento:{},       
      campordem_servico: '', 
      campnome_evento: '', 
      campdata_evento: '',    
      campOperadorId: '',
      adicionou_operador: false,
    //  camptipoTransporteId: '', 
      campvalor_total: '',      
      nome: "",
      perfil: "",   
      criador_logado_Id: "",      
      listEstados:[],
      camptipoEventoId: '',
   //   listTipoTransporte:[],    
      mensagem_email: '',     
      listTipoEvento: [],
      listOperadores: [],
      mensagem_ordem_servico: '',  
      mensagem_nome_evento: '',  
      mensagem_data_evento: '',  
      mensagem_valor_total: '',      
      incluir: true, 
      inicio: 1,
      progresso: 0,     
      showModal: false, 
      validate: {
        ordem_servicoState: '',      
        nome_eventoState: '',   
        data_eventoState: '',     
        emailState: '',     
      //  tipo_transporteState: '',   
      }    
    }
   
    //this.tipoChange = this.tipoChange.bind(this);    
    this.ordem_servicoChange = this.ordem_servicoChange.bind(this);    
    this.nome_eventoChange = this.nome_eventoChange.bind(this);    
    this.data_eventoChange = this.data_eventoChange.bind(this);    

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_operador = this.busca_operador.bind(this);
   // this.busca_cliente = this.busca_cliente.bind(this);
    this.verificar_menu = this.verificar_menu.bind(this);

    this.verifica_nome_evento = this.verifica_nome_evento.bind(this);  
    this.verifica_ordem_servico = this.verifica_ordem_servico.bind(this);  
    this.verifica_data_evento = this.verifica_data_evento.bind(this);   

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.operadorChange = this.operadorChange.bind(this);    
    

    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.emailchange = this.emailchange.bind(this);

    this.handlegerenciaChange = this.handlegerenciaChange.bind(this);
    this.handlegerenciatodosChange = this.handlegerenciatodosChange.bind(this);
    this.handleincluiCartaoChange = this.handleincluiCartaoChange.bind(this);
    this.handlevisualizaEventosChange = this.handlevisualizaEventosChange.bind(this);
    this.handleefetuaPagamentoChange = this.handleefetuaPagamentoChange.bind(this);
    this.handleincluiOperadoresChange = this.handleincluiOperadoresChange.bind(this);
    //this.envio_email = this.envio_email.bind(this);   
    
    this.verifica_nome_operador = this.verifica_nome_operador.bind(this);
  }

  componentDidMount(){ 
   
    let userId = this.props.match.params.id;    
    
    localStorage.setItem('logid', userId);
          
    //const logperfil = localStorage.getItem('logperfil');
   // this.loadTipoTransporte();

    if (localStorage.getItem('logperfil') == 2) {      
       this.busca_cliente();
    }      
    if (localStorage.getItem('logperfil') == 7) {        
      this.busca_empresa()           
    }

    if (localStorage.getItem('logperfil') == 8) {       
      this.busca_operador()      
      this.setState({              
        progresso: 25
      }); 
    }  
   // this.loadTipoEvento();
    this.loadOperadores();
    
  }

  tipoChange(e) {  
    this.setState({ camptipoEventoId: e.target.value })  
  }

  loadOperadores() {
    api.get(`/operador/listaempresa/`+localStorage.getItem('logid'))
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listOperadores:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }   
  loadTipoEvento() {
    api.get('/tipoevento/list')
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listTipoEvento:data})
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
  handlegerenciatodosChange = (event) => {
    this.setState({ 
      campgerencia_todos_eventos: event.target.checked
    });
  };
  handleincluiCartaoChange = (event) => {
    this.setState({ 
      campinclui_cartao: event.target.checked
    });
  };
  handleincluiOperadoresChange = (event) => {
    this.setState({ 
      campinclui_operadores: event.target.checked
    });
  };
  handleefetuaPagamentoChange = (event) => {
    this.setState({ 
      campefetua_pagamentos: event.target.checked
    });
  };
  handlevisualizaEventosChange = (event) => {
    this.setState({ 
      campvisualiza_eventos: event.target.checked
    });
  };

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
      //  this.busca_email_ja_cadastrado(e.target.value)                
        this.setState({ 
          validate,
          inicio: 2 })            
        
    } else {
      validate.emailState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_email: '' })  
    }
  
    this.setState({ validate })
  
  }   
  
  verifica_botao_modal() {
    const { validate } = this.state 

    if (localStorage.getItem('logperfil') == 7) {  
      
        if (validate.emailState == 'has-success') { 
          return (
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_modal_evento_habilitado"  p={2} onClick={()=>this.sendEmail()}>
                    <div className="d-flex justify-content-center">
                    <label> Enviar </label>
                    </div>     
              </Box>           
          );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_modal_evento"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Enviar </label>
                    </div>     
              </Box>           
          );                   
        }
    } 

  }  
  operadorChange(e) {
    this.setState({ campOperadorId: e.target.value })
  }

  emailchange(e) {
    this.setState({ campEmail: e.target.value })
  }
  verifica_nome_evento(){    
      const { validate } = this.state
         if (this.state.campnome_evento.length == 0) {
          validate.nome_eventoState = 'has-danger'
          this.setState({ 
            validate,
            mensagem_nome_evento: 'O campo nome do evento é obrigatório.'  
           })      
         } else {
          validate.nome_eventoState = 'has-success' ;        
  
          this.setState({ 
            mensagem_nome_evento: ''
         });  
  
         }              
  } 
  verifica_ordem_servico(){    
    const { validate } = this.state
       if (this.state.campordem_servico.length == 0) {
        validate.ordem_servicoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_ordem_servico: 'O campo Ordem de serviço é obrigatório.'  
         })      
       } else {
        validate.ordem_servicoState = 'has-success' ;        

        this.setState({ 
          mensagem_ordem_servico: ''
       });  

       }                     
} 
verifica_data_evento(){    
  const { validate } = this.state
     if (this.state.campdata_evento.length == 0) {
      validate.data_eventoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_data_evento: 'O campo Data do evento é obrigatório.'  
       })      
     } else {
      validate.data_eventoState = 'has-success' ;        

      this.setState({ 
        mensagem_data_evento: ''
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
    
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({           
            campCpf: cpfMask(res.data.data[0].cpf),     
            campNome: res.data.data[0].nome,                                  
            inicio: 1
          })                         
        } 
      })        
      .catch(error=>{
        alert("Error de conexão cliente "+error)
      })       
  
  } 
  busca_empresa() {
    
    api.get(`/empresa/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({           
            campCpf: cnpjMask(res.data.data[0].cnpj),     
            campNome: res.data.data[0].razao_social,                                  
            inicio: 1
          })                         
        } 
      })        
      .catch(error=>{
        alert("Error de conexão empresa "+error)
      })       
  
  } 
  busca_operador() {
    //const { validate } = this.state  
    api.get(`/operador/get/${localStorage.getItem('logid')}`)
    .then(res=>{
      //  console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,                       
            inicio: 1,
          })                

        } 
      })        
      .catch(error=>{
        alert("Error de conexão operador "+error)
      })       
  
  }
  
 // tipoChange(e) {
  //  this.setState({ camptipoTransporteId: e.target.value })
 // }
  ordem_servicoChange(e) {
    this.setState({ campordem_servico: e.target.value })
  }
  nome_eventoChange(e) {
    this.setState({ campnome_evento: e.target.value })
  }
  data_eventoChange(event) {         
    const { validate } = this.state
    //if (this.state.campdata_evento.length > 0) {    
       
      validate.data_eventoState = 'has-success' ;        

      this.setState({ 
        validate,
        mensagem_data_evento: '',
        campdata_evento: event.target.value,
        inicio: 2
      });  

   // }      
   
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

   /*loadTipoTransporte() {
    api.get('/tipoTransporte/list')
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listTipoTransporte:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  } 

  loadFillData(){  
  
    return this.state.listTipoTransporte.map((data)=>{          
      return(
         <MenuItem value={data.id}>{data.descricao}</MenuItem>      
      )
    })
  }
 */
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
  
  if (localStorage.getItem('logperfil') == 1) {
    if (inicio == 1) {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
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
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_evento_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
                  <label> Incluir </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
        }         

      }    
    }  else if (localStorage.getItem('logperfil') == 2) {
      if (inicio == 1) {
        return (
  
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
      } else {
        if (validate.data_eventoState == 'has-success' && validate.nome_eventoState == 'has-success'  
        && validate.ordem_servicoState == 'has-success') {
            return (           
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_evento_habilitado"  p={2} onClick={()=>this.sendSave()}>
              <div className="d-flex justify-content-center">
              <label> Incluir </label>
              </div>     
              </Box>           
            );
          } else {
            return (
  
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
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

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                <div className="d-flex justify-content-center">
                <label> Incluir </label>
                </div>     
          </Box>           
      );   
    } else {
      if (validate.data_eventoState == 'has-success' && validate.nome_eventoState == 'has-success'  
      && validate.ordem_servicoState == 'has-success') {
          return (           
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_evento_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
            <label> Incluir </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
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
  
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Alterar </label>
                  </div>     
            </Box>           
        );   
      } else {
        if (validate.data_eventoState == 'has-success' && validate.nome_eventoState == 'has-success'  
        && validate.ordem_servicoState == 'has-success') {
            return (           
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_evento_habilitado"  p={2} onClick={()=>this.sendSave()}>
              <div className="d-flex justify-content-center">
              <label> Alterar </label>
              </div>     
              </Box>           
            );
          } else {
            return (
  
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Alterar </label>
                    </div>     
              </Box>           
          );   
          }   
        }         
    }    
} 
handleOpenModal () {
  this.setState({ 
    showModal: true    
  });

  this.prepareSave();
}

handleCloseModal () {
  this.setState({ 
    showModal: false,
    incluir: false 
  });
}

sendEmail(){        
  const email_envio = this.state.campEmail
  const operadordata = {  
    email: this.state.campEmail,    
    empresaId: localStorage.getItem('logid'),      
    eventoId: localStorage.getItem('logeventoId'),
    statusId: 6,
    gerenciar_eventos: this.state.campgerencia_eventos, 
    gerenciar_todos_eventos: this.state.campgerencia_todos_eventos, 
    incluir_cartao: this.state.campinclui_cartao, 
    visualizar_eventos: this.state.campvisualiza_eventos,
    efetuar_pagamentos: this.state.campefetua_pagamentos, 
    incluir_outors_operadores: this.state.campinclui_operadores,    
  }  
  console.log(' resultado envio - '+JSON.stringify(operadordata, null, "    "));     
  api.post(`/emailOperador/create`, operadordata)
  .then(res=>{             

    //url: `http://localhost:3000/operadores/${res.data.data.id}`,        
    //
    if (res.data.success == true) {
      
      const params_email = {    
        email: email_envio,       
        url: `http://www.oser.app.br:21497/operadores/${res.data.data.id}/${res.data.data.email}`,  
        texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
      }      
      console.log(' resultado - '+JSON.stringify(params_email, null, "    "));    
        
      api.post("/email/send", params_email)       
     
      this.handleCloseModal();
     // if (localStorage.getItem('logperfil') == 7) {              
      //  this.props.history.push(`/criar_eventos/`+localStorage.getItem('logid'));               
     // }  
    }      
  })        
  .catch(error=>{
    alert("Erro de conexão "+error)
  })        

}

prepareSave(){

  
  this.setState({ adicionou_operador: true });

  const datapost_incluir = {
    logid: localStorage.getItem('logid'),
    perfilId: localStorage.getItem('logperfil'),    
    ordem_servico: this.state.campordem_servico, 
    nome_evento: this.state.campnome_evento, 
    data_evento: this.state.campdata_evento,           
   }           

    api.post('/eventos/create',datapost_incluir)
    .then(respevento=>{    
      if (respevento.data.success == true) {          

        localStorage.setItem('logeventoId',respevento.data.data.id );
          
      }  
    }).catch(error=>{
      alert("Erro verificar log  ")
    }) 
}

sendSave(){        
     
     if (this.state.incluir == true) {

          if (this.state.adicionou_operador !== true) {

            const datapost_incluir = {
              logid: localStorage.getItem('logid'),
              perfilId: localStorage.getItem('logperfil'),    
              ordem_servico: this.state.campordem_servico, 
              nome_evento: this.state.campnome_evento, 
              data_evento: this.state.campdata_evento,           
             }           
          
              api.post('/eventos/create',datapost_incluir)
              .then(respevento=>{    
                if (respevento.data.success == true) {          
          
                  localStorage.setItem('logeventoId',respevento.data.data.id );
                    
                }  
              }).catch(error=>{
                alert("Erro verificar log  ")
              }) 

          }  
    
          console.log(' logperfil '+localStorage.getItem('logperfil'));

          if (localStorage.getItem('logperfil') == 1) {
             localStorage.setItem('logperfil', 1);
             this.props.history.push('/area_administrador');                 
          } else if (localStorage.getItem('logperfil') == 7) {            
            this.props.history.push("/lista_evento_servico/"+localStorage.getItem('logid'));       
          } else if (localStorage.getItem('logperfil') == 8) {
            localStorage.setItem('lognome', this.state.campNome);  
            localStorage.setItem('logperfil', 8);
            this.props.history.push('/area_operador');       
          }           
       
    } else {
      const datapost_alterar = {     
        logid: localStorage.getItem('logid'),
        perfilId: localStorage.getItem('logperfil'),    
        ordem_servico: this.state.campordem_servico, 
        nome_evento: this.state.campnome_evento, 
        data_evento: this.state.campdata_evento,     
       }           
      console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
      api.put(`/eventos/update/${localStorage.getItem('logid')}`, datapost_alterar)
      .then(response=>{
        if (response.data.success==true) {                                  
    
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

  if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
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
        <div>        
           <Progress color="warning" value={this.state.progresso} className="progressbar"/>
        </div>      
  </div>           
      );
 } else  if (localStorage.getItem('logperfil') == 2) {  //CLIENTE INDIVIDUAL
      return(
        <div>
        <div className="d-flex justify-content-around">
             <div className="botao_navegacao">                               
               </div>                  
               <div>
                 <div className="titulo_representante">                
                   <label> Cadastre o seu Evento </label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">                                 
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
                     <label>  Cadastre os dados do Evento  </label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                  <div></div>                            
                  </div>   
               </div>   
             
      </div>
      );
  } else if (localStorage.getItem('logperfil') == 8) { // OPERADOR
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
                  <div></div>                            
                  </div>   
               </div>   
             
      </div>
      );

  }


}

loadFillData(){  
  
  return this.state.listTipoEvento.map((data)=>{          
    return(
       <MenuItem value={data.id}>{data.descricao}</MenuItem>      
    )
  })
}

loadOperadoresData(){  
  
  return this.state.listOperadores.map((data)=>{          
    return(
       <MenuItem value={data.id}>{data.email}</MenuItem>      
    )
  })
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
   } else if (localStorage.getItem('logperfil') == 7) {
    return( 
      <Menu_cliente_empresarial />     
    );
   } else if (localStorage.getItem('logperfil') == 8) {
    return( 
      <Menu_operador />     
    );
   }

}

render(){  

return (
<div>    
<div className="container_alterado">
  {this.verificar_menu_lateral()}  
<div className="d-flex justify-content"> 
   <div className="area_esquerda">     
         {this.verificar_menu()}        
          <div class="d-flex flex-column espacamento_caixa_texto">   
              <div class="p-2">               
                  <div class="d-flex justify-content-start">
                       <div> 
                       <label for="inputAddress">CPF / CNPJ </label>
                       <Input                    
                          disabled= {true}
                          type="text"
                          name="nome"
                          className="texto_placa"
                          id="examplnome"
                          placeholder=""
                          autoComplete='off'
                          autoCorrect='off'
                          value={this.state.campCpf}                                                                                                             
                      />                                                   
                       </div> 
                       
                       <div>         
                       <label className="label_modelo_1" for="inputAddress">Nome </label>
                       <Input    
                          disabled= {true}                 
                          type="text"
                          name="nome"
                          className="texto_modelo_1"
                          id="examplnome"
                          placeholder=""
                          autoComplete='off'
                          autoCorrect='off'
                          value={this.state.campNome}                                                                
                      />                                  
                       </div>                        
                  </div>
              </div> 
              <div class="p-2">               
              <label for="inputAddress" className="titulo_placa">Ordem de Serviço *</label>
                      <Input                    
                        type="text"
                        name="nome"
                        className="texto_evento"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campordem_servico}
                        valid={ this.state.validate.ordem_servicoState === 'has-success' }
                        invalid={ this.state.validate.ordem_servicoState === 'has-danger' }
                        onBlur={this.verifica_ordem_servico}                   
                        onChange={ (e) => {
                          this.ordem_servicoChange(e)                       
                        }}    
                        maxlength="10"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.ordem_servicoState}>
                          {this.state.mensagem_ordem_servico}
                      </FormFeedback>                   
              </div> 
              <div class="p-2">    
                    <label for="inputAddress" className="titulo_placa">Nome Evento *</label>
                      <Input              
                        type="text"
                        name="nome"
                        className="texto_evento"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campnome_evento}
                        valid={ this.state.validate.nome_eventoState === 'has-success' }
                        invalid={ this.state.validate.nome_eventoState === 'has-danger' }
                        onBlur={this.verifica_nome_evento}                       
                        onChange={ (e) => {
                          this.nome_eventoChange(e)
                        }}    
                        maxlength="250"     
                        fullwidth                                                                 
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.nome_eventoState}>
                          {this.state.mensagem_nome_evento}
                      </FormFeedback>   
               </div>
               <div class="p-2">                          
                    <label for="inputAddress" className="texto_placa">Data do Evento *</label>
                      <Input           
                        className="texto_placa"       
                        type="date"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campdata_evento}
                        valid={ this.state.validate.data_eventoState === 'has-success' }
                        invalid={ this.state.validate.data_eventoState === 'has-danger' }                    
                        onChange={ (e) => {
                          this.data_eventoChange(e)                       
                        }}    
                        maxlength="20"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.data_eventoState}>
                          {this.state.mensagem_data_evento}
                      </FormFeedback>    
              
                 </div>  

            <div class="p-2">   
            <div class="d-flex justify-content-start">
                  <div>              
                          <FormControl variant="outlined" className="select_evento_operador">
                            <InputLabel id="demo-simple-select-outlined-label">Operadores *</InputLabel>
                            <Select
                              error={this.state.erro_tipo} 
                              helperText={this.state.mensagem_tipoId}
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={this.state.campOperadorId}                                    
                              onChange={ (e) => {
                                this.operadorChange(e)
                              }}                  
                              labelWidth={140}          
                            >
                              <MenuItem value={0}></MenuItem>      
                              {this.loadOperadoresData()}                    
                            </Select>
                          </FormControl>    
                       </div>
            <div>
                <Button className="botao_evento_operador" color="primary" variant="contained"                         
                            onClick={()=>this.handleOpenModal()}>
                    Adicionar Operador  <Icon className="fa fa-plus-circle" />
                    </Button>       
                   <Modal 
                        isOpen={this.state.showModal}
                        style={customStyles}
                        contentLabel="Minimal Modal Example"
                      >
                        <Button color="primary" variant="contained"                         
                            onClick={()=>this.handleCloseModal()}>Close Modal</Button>    
                        <br/> 
                        <br/>       
                        <div class="p-2">   
                        <div class="d-flex justify-content-start">
                          
                          <div>              
                              <label for="email1" className="input_email">Email *</label>
                                <Input
                                  className="input_email_1"                               
                                  type="email"                  
                                  placeholder=""
                                  autoComplete='off'
                                  autoCorrect='off'
                                  valid={ this.state.validate.emailState === 'has-success' }
                                  invalid={ this.state.validate.emailState === 'has-danger' }        
                                  value={this.state.campEmail}                                                                      
                                  onChange={ (e) => {
                                              this.emailchange(e) 
                                              this.validateEmail(e)
                                              this.validaEmailChange(e)                                
                                            } }
                                  maxlength="100"          
                                />   
                                <FormFeedback 
                                invalid={this.state.validate.emailState}>
                                    {this.state.mensagem_email}
                                </FormFeedback>  
                          </div>     
                        </div>     
                      </div>                 
                      <br/>       
                      <FormControl component="fieldset">
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value={this.state.campgerencia_eventos}
                              control={<Switch color="primary" checked={this.state.campgerencia_eventos} 
                                  onChange={this.handlegerenciaChange}/>}
                              label="Gerenciar Eventos"
                              labelPlacement="end"
                            />                       
                          </FormGroup>
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value={this.state.campefetua_pagamentos}
                              control={<Switch color="primary" checked={this.state.campefetua_pagamentos} 
                                  onChange={this.handleefetuaPagamentoChange}/>}
                              label="Efetuar Pagamentos"
                              labelPlacement="end"
                            />                       
                          </FormGroup>
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value={this.state.campinclui_cartao}
                              control={<Switch color="primary" checked={this.state.campinclui_cartao} 
                                  onChange={this.handleincluiCartaoChange}/>}
                              label="Incluir cartão de Crédito"
                              labelPlacement="end"
                            />                       
                          </FormGroup>
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value={this.state.campinclui_operadores}
                              control={<Switch color="primary" checked={this.state.campinclui_operadores} 
                                  onChange={this.handleincluiOperadoresChange}/>}
                              label="Incluir Outros Operadores"
                              labelPlacement="end"
                            />                       
                          </FormGroup>
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value={this.state.campgerencia_todos_eventos}
                              control={<Switch color="primary" checked={this.state.campgerencia_todos_eventos} 
                                  onChange={this.handlegerenciatodosChange}/>}
                              label="Gerenciar Todos os Eventos"
                              labelPlacement="end"
                            />                       
                          </FormGroup>
                          <FormGroup aria-label="position" row>
                            <FormControlLabel
                              value={this.state.campvisualiza_eventos}
                              control={<Switch color="primary" checked={this.state.campvisualiza_eventos} 
                                onChange={this.handlevisualizaEventosChange}/>}
                              label="Somente Visualizar Evento"
                              labelPlacement="end"
                            />                       
                          </FormGroup>
                        </FormControl>   
                        {this.verifica_botao_modal()}                                           
                      </Modal>  
                  </div>
                </div>      
              </div>

            </div>       
            {this.verifica_botao(this.state.inicio)}                                       
    </div>             
   </div>  
 </div>  
</div> 
  );
} 
}
export default operadoresComponent;