import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Input, Button } from 'reactstrap';
//import { Tabs, Tab } from 'react-bootstrap';
import MaterialTable from 'material-table';
import { dataMask } from '../formatacao/datamask';

//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";
//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu_operador from '../operadores/menu_operador';
import Menu from '../../pages/cabecalho' ;
import { valorMask } from '../formatacao/valormask';
import Menu_administrador from '../administrador/menu_administrador';
import ReactModal from 'react-modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import Select from '@material-ui/core/Select';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { valorDoublemask } from '../formatacao/valorDoublemask';

//import { Alert } from 'reactstrap';
const nome = sessionStorage.getItem('lognome');  
const perfil = sessionStorage.getItem('logperfil');
var dateFormat = require('dateformat');
//const baseUrl = "http://34.210.56.22:3333";

const useStyles = withStyles((theme) => ({
  root: {
    flexGrow: 1,
   // backgroundColor: theme.palette.background.paper,
  },
}));


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
    left                   : '64%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100%',    
  //  width                  : '49%',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

const customStyles_2 = {
  overlay: {    
    position: 'revert',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
   // backgroundColor: 'rgba(0, 0, 0, 0.65)'
   // backgroundColor: 'rgba(255, 255, 255, 0.75)'
  }, 
  content : {
    top                    : '0px',
    left                   : '66%', 
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


const ConfirmacaodelStyles = {
  overlay: {
    backgroundColor: 'papayawhip',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
   // backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '50%',
    left                   : '66%',   
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '50%',    
    width                  : '550px',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

const StyledButton = withStyles({
  root: {
    background: '#FF840A',
    borderRadius: 23,
    color: 'white',
    mensagem: '',    
    height: 48,
    padding: '0 30px',  
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

//const [opcao, setOpcao] = React.useState('1');

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class listaeventosComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      eventoId: '', 
      mensagem: '',
      dataEvento:{}, 
      campcliente_cnpj: '', 
      campcliente_nome: '', 
      campordem_servico: '', 
      campnome_evento: '', 
      campdata_evento: '',       
      camptipoTransporteId: '', 
      campvalor_total: '',
      campTipo_cliente: "",
      mensagem_ordem_servico: '',
      mensagem_nome_evento: '',
      mensagem_evento: '',     
      mensagem_data_evento: false,    
      campOperadorId: '',
      mudar_estilo: customStyles,
      inicio: 0, 
      value: "1",      
      mensagem_tipo_transporte: '',
      erro_ordem_servico: false,
      erro_nome_evento: false,
      erro_data_evento: false,      
      erro_tipo_transporte: false,
      erro_email: false,
      validacao_ordem_servico: false,
      validacao_nome_evento: false,
      validacao_data_evento: false,      
      validacao_tipo_transporte: false,
      validacao_email: false,
      ordem_servico_disabled: false,
      nome_evento_disabled: false,
      data_evento_disabled: false,      
      tipo_transporte_disabled: false,     
      incluir: false,      
      campEmail:"",   
      mensagem_email: '',
      loading: false,
      color: 'light',      
      listEventos:[],
      listOperadores:[],
      listTodosOperadores:[],
      listservicosevento:[],
      listaeventodelete:[],
      listaeventosexcluidos:[],
      listEventosADM:[],
      validate: {
        nomeState: '',      
        datanascimentoState: '',   
        emailState: '',
        cpfState: '',     
        telefone1State: '',     
      }    
    }

    this.emailchange = this.emailchange.bind(this);
    this.verificaEmail = this.verificaEmail.bind(this);    
    this.validaEmailChange = this.validaEmailChange.bind(this);    
//    this.opcao_tabChange = this.opcao_tabChange.bind(this);       

    this.operadorChange = this.operadorChange.bind(this);   

    this.verificaOrdem_servico = this.verificaOrdem_servico.bind(this);    
    this.verificaNome_Evento = this.verificaNome_Evento.bind(this);      
    this.verificaData_Evento = this.verificaData_Evento.bind(this);      

  }

  componentDidMount(){
    //let userId = this.props.match.params.id;  

   // sessionStorage.setItem('logid',userId)
   this.interval = setInterval(() => this.tick(), 1000);
    this.setState({
      perfil: sessionStorage.getItem('logperfil'),
      id: sessionStorage.getItem('logid')   
    });

    if (sessionStorage.getItem('logperfil') > 1) {       
       this.loadlistEventos();  
       this.loadeventosexcluidos();
       this.atualiza_evento();
    } else {
        this.loadlistEventosADM();
    }  

    
  }

  tick() {
    this.loadlistEventos();  
   // this.loadOperadores();  
   // this.loadTodosOperadores();
  }

  atualiza_evento() {
    debugger;
    let totalservicos = 0;
    let totalviagens = 0;
    api.get(`/servicos/totalservicos/${sessionStorage.getItem('logeventoservico')}/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
    .then(resservico=>{
      if (resservico.data.success == true) {
        totalservicos = resservico.data.data;  

        api.get(`/servicos/totalviagens/${sessionStorage.getItem('logeventoservico')}/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
        .then(resviagem=>{
          if (resviagem.data.success == true) {       
            
           totalviagens = resviagem.data.data;   

           const datapost_alterar_valores = {                
            viagens_total: totalviagens,
            valor_total: totalservicos,              
          }           
      
           api.put(`/eventos/update/${sessionStorage.getItem('logeventoservico')}`, datapost_alterar_valores);

          }
        })
        .catch(error=>{
          console.log('valor_total_viagens'+error);        
        })

      }
    })
    .catch(error=>{
      console.log('valor_total_servicos'+error);        
    
    })
  
  
  }

  componentWillUnmount() {
    clearInterval(this.interval);
   }

  loadservicoseventos(userId) {
   // debugger;
    api.get(`/servicos/getEvento/${userId}`)
    .then(resp =>{
     // console.log('criando loadservicoseventos  - '+JSON.stringify(resp.data, null, "    ")); 
      if (resp.data.success) {
        const data = resp.data.data

        this.setState({
          listservicosevento:data,
          loading: false,
        })
      }
    })
    .catch ( error => {
      console.log('loadservicoseventos'+error);    
 
    })    
  } 

  loadeventodelete(userId) {
  //  debugger;
    api.get(`/eventos/get/${userId}`)
    .then(resp =>{
      //console.log('criando loadeventodelete  - '+JSON.stringify(resp.data, null, "    ")); 
      if (resp.data.success) {
        const data = resp.data.data

        this.setState({listaeventodelete:data})
      }
    })
    .catch ( error => {
      console.log('loadeventodelete'+error);    
     
    })    
  } 

  loadeventosexcluidos() {
   //  debugger;
     api.get(`/historicoEventos/listaeventoexcluidos/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
     .then(resp =>{
   
       if (resp.data.success) {
         const data = resp.data.data
 
         this.setState({listaeventosexcluidos:data})
       }
     })
     .catch ( error => {
      console.log('loadeventosexcluidos'+error);    
     
     })    
   } 

   valor_total_servicos(){
    let data_formatada = '0.00'

    api.get(`/servicos/totalservicos/${sessionStorage.getItem('logeventoservico')}/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success == true) {
         const data = res.data.data  
    
        //   const valor = valorMask(data)
      if (data !== 0) {
        data_formatada = valorMask(data.toFixed(2))
       }
         this.setState({ 
           valortotalviagens: data_formatada,
           valor_total_alterado: data.toFixed(2),
          });
       }
     })
     .catch(error=>{
      console.log('valor_total_servicos'+error);  
     
     })
   }  

   valor_total_viagens(){

    api.get(`/servicos/totalviagens/${sessionStorage.getItem('logeventoservico')}/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success == true) {       
         
        const data = res.data.data   
         
      //   const valor = valorMask(data)
         this.setState({ totalviagens: data});
       }
     })
     .catch(error=>{
      console.log('valor_total_viagens'+error);  
   
     })
   }  

  
  limpar_campos() {
    this.setState({
      eventoId: '', 
      mensagem: '',
      dataEvento:{}, 
      campcliente_cnpj: '', 
      campcliente_nome: '', 
      campordem_servico: '', 
      campnome_evento: '', 
      campdata_evento: '',       
      camptipoTransporteId: '', 
      campvalor_total: '',
      campTipo_cliente: "",
      mensagem_ordem_servico: '',
      mensagem_nome_evento: '',
      mensagem_evento: '',     
      campOperadorId: '',
      erro_ordem_servico: false,
      erro_nome_evento: false,
      erro_data_evento: false,      
      erro_tipo_transporte: false,
      validacao_ordem_servico: false,
      validacao_nome_evento: false,
      validacao_data_evento: false,      
      validacao_tipo_transporte: false,
    });  
  }

  
  loadOperadores() {
    api.get(`/operador/listaempresa/`+sessionStorage.getItem('logid'))
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listOperadores:data})
      }     
    })
    .catch(error=>{
      console.log('loadOperadores'+error);  
   
    })
  }   

  loadTodosOperadores() {
    api.get(`/operador/list`)
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listTodosOperadores:data})
      }     
    })
    .catch(error=>{
      console.log('loadTodosOperadores'+error);  
    
    })
  }   

  loadOperadoresData(){  
  
    return this.state.listTodosOperadores.map((data)=>{          
      return(
         <MenuItem value={data.id}>{data.nome}</MenuItem>      
      )
    })
  }

  
  loadlistEventos(){
   // const url = baseUrl+"/cliente/list"   
   
   api.get(`/eventos/listaeventocliente/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data    
        this.setState({
          listEventos:data,
          loading: false,
        })
      }
    })
    .catch(error=>{
      console.log('loadlistEventos'+error);  
 
    })
  }

  loadlistEventosADM(){
    // const url = baseUrl+"/cliente/list"   
    
    api.get(`/eventos/list`)
     .then(res=>{
       if (res.data.success) {
         const data = res.data.data    
         this.setState({listEventos:data})
       }
     })
     .catch(error=>{
      console.log('loadlistEventosADM'+error);  
 
     })
   }
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  verificar_translados() {
   // if (this.li) 
      
   
  }

  verificaEmail(e){   
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.emailState = ''
      this.setState({ 
        validate,
        erro_email: false,
        validacao_email: false,
        mensagem_email: ''  
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

  operadorChange(e) {
    this.setState({ campOperadorId: e.target.value })
  }

  emailchange(e) {
    this.setState({ campEmail: e.target.value })
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
        } else {
          console.log(`valida email - ${email}`);
          api.get(`/emailOperador/getEmail/${email}`)
          .then(response=>{       
            console.log(' resultado - '+JSON.stringify(response.data, null, "    "));        
            console.log(' resultado length - '+JSON.stringify(response.data.data.length, null, "    "));        
              if (response.data.data.length > 0) {                                  
              validate.emailState = '';
              this.setState({      
                  erro_email: true,   
                  validacao_email: false,                             
                  mensagem_email: 'Convite já foi enviado para este email',                    
                  validate,
              });                

              } else {      

                  this.setState({         
                    erro_email: false,   
                    validacao_email: true,    
                    inicio: 2,
                    mensagem_email: ''  
                })
              } 
            })        
            .catch(error=>{
              console.log('emailOperador'+error) 
              
            })           
        }        
      })        
      .catch(error=>{
        alert("Erro de login "+error)
      })                   
    }
    
    validateEmail(e) {
      const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state
      
        if (emailRex.test(e.target.value)) {                         
          this.setState({ 
            erro_email: false,
            validacao_email: true,
            inicio: 2
          });    
            //console.log(' valida email - '+e.target.value);   
            //console.log(' valida email - '+this.state.campEmail);   
            this.busca_email_ja_cadastrado(e.target.value)                
                    
            
        } else {         
          this.setState({ 
            validate,
            erro_email: false,
            validacao_email: false,
            mensagem_email: '' })  
        }
       
        this.setState({ validate })
    }    

  sendEmail(){        
  const { validate } = this.state;       
      validate.cpfState= '';
      this.setState({ 
        validacao_email: false,
        mensagem_aguarde: 'Aguarde, enviando o convite...',       
        validate 
      }); 
  
  const email_envio = this.state.campEmail;

      const operadordata = {  
        email: this.state.campEmail,    
        empresaId: sessionStorage.getItem('logid'),     
        statusId: 8,
        perfilId: sessionStorage.getItem('logperfil'),
        gerenciar_eventos: this.state.campgerencia_eventos, 
        monitorar_eventos: this.state.campMonitorar_eventos,   
        representante_legal: this.state.camprepresentante_legal,        
      }    
      
      api.get(`/emailOperador/getemail/${this.state.campEmail}`)
      .then(res1=>{             

        if (res1.data.data.length == 0) {    
      
          api.post(`/emailOperador/create`, operadordata)
          .then(res=>{             
          // console.log(' resultado - '+JSON.stringify(res.data, null, "    "));       
            //   url: `http://localhost:3000/operadores/${res.data.data.id}`,   
            //url: `http://www.oser.app.br:21497/operadores/${res.data.data.id}`,
            if (res.data.success == true) {    
        
              const params_email = {    
                email: email_envio,         
             //  url: `http://localhost:3000/operadores_incluir/${res.data.data.id}/${res.data.data.email}`,     
                url: `http://www.oser.app.br:21497/operadores_incluir/${res.data.data.id}/${res.data.data.email}`,     
                texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
              }      
            // console.log(' resultado - '+JSON.stringify(params_email, null, "    "));    
                
             api.post("/email/send", params_email);         

             this.setState({                          
                mensagem_usuario: 'Mensagem para operador enviada com sucesso!',                      
             }); 
            
             this.verifica_botao(1);
             this.enviar_botao_modal(1);         

             this.handleCloseModalCompartilha();
             this.envia_mensagemClick();             
     
            }       
          })        
          .catch(error=>{
            console.log('Erro de conexão'+error) 
          
          })        

        } else {      

          const params_email = {    
            email: email_envio,            
            url: `http://www.oser.app.br:21497/operadores_incluir/${res1.data.data.id}/${res1.data.data.email}`,     
           // url: `http://localhost:3000/operadores_incluir/${res1.data.data.id}/${res1.data.data.email}`,     
            texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
          }      
            
          api.post("/email/send", params_email)       
                  
          this.setState({                          
            mensagem_usuario: 'Mensagem para operador enviada com sucesso!',                      
         }); 
        
         this.verifica_botao(1);
         this.enviar_botao_modal(1);         

         this.envia_mensagemClick();    
        }
      
      })        
      .catch(error=>{
        console.log('Erro de conexão'+error) 
      })      
    
    }


    sendSave(){        
     
      this.setState({                
        validacao_ordem_servico: false,
        validacao_nome_evento: false,
        validacao_data_evento: false,
      });

      if (this.state.incluir == true) {

             const datapost_incluir = {
               cpf: sessionStorage.getItem('logcpf'), 
               nome: sessionStorage.getItem('lognome'), 
               cnpj: sessionStorage.getItem('logcnpj'),
               razao_social: sessionStorage.getItem('lograzao_social'),
               logid: sessionStorage.getItem('logid'),
               perfilId: sessionStorage.getItem('logperfil'),    
               ordem_servico: this.state.campordem_servico, 
               nome_evento: this.state.campnome_evento, 
               viagens_total: 0,
               data_evento: moment(this.state.campdata_evento, "DD MM YYYY"), 
               statusId: 1,          
              }           
           
             
              console.log('criar evento - '+JSON.stringify(datapost_incluir, null, "    ")); 
              debugger;
               api.post('/eventos/create',datapost_incluir)
               .then(respevento=>{    
                 if (respevento.data.success == true) {          
           
                   sessionStorage.setItem('logeventoId',respevento.data.data.id );                                     
                   console.log('campOperadorId -'+ this.state.campOperadorId);  

                   if (this.state.campOperadorId !== "") { 
                   
                    const datapost_operador = {
                      operadorId: this.state.campOperadorId, 
                      eventoId: sessionStorage.getItem('logeventoId'),
                      statusId: 1 
                     }        

                    console.log('criar operadorevento - '+JSON.stringify(datapost_operador, null, "    ")); 
                    api.post('/operadorevento/create', datapost_operador);            
                          
                   }
                 }  
               }).catch(error=>{
                 console.log(error) 
                // alert("Erro verificar log  "+ error)
               })  

               this.setState({                
                mensagem_usuario: 'Evento incluído com sucesso!'
               });
            
               this.verifica_botao(1);
               this.handleCloseModalInclusao();
               this.envia_mensagemClick();    
     
           console.log(' logperfil '+sessionStorage.getItem('logperfil'));
 
       /*    if (sessionStorage.getItem('logperfil') == 1) {
              sessionStorage.setItem('logperfil', 1);
              this.props.history.push('/area_administrador');                 
           } else if (sessionStorage.getItem('logperfil') == 7) {            
             this.props.history.push("/lista_evento_servico/"+sessionStorage.getItem('logeventoId'));       
           } else if (sessionStorage.getItem('logperfil') == 8) {
             sessionStorage.setItem('lognome', this.state.campNome);  
             sessionStorage.setItem('logperfil', 8);
             this.props.history.push('/area_operador');       
           }            */
        
     } else {
       const datapost_alterar = {     
         logid: sessionStorage.getItem('logid'),
         perfilId: sessionStorage.getItem('logperfil'),    
         ordem_servico: this.state.campordem_servico,         
         nome_evento: this.state.campnome_evento, 
         data_evento: moment(this.state.campdata_evento, "DD MM YYYY"),   
         statusId: 1,      
        }           
       console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
       api.put(`/eventos/update/${sessionStorage.getItem('logid')}`, datapost_alterar)
       .then(response=>{
         if (response.data.success==true) {                                  
     
            this.setState({                
              mensagem_usuario: 'Evento alterado com sucesso!'
            });
        
           this.verifica_botao(1);
           this.handleCloseModalInclusao();
           this.envia_mensagemClick();    

            this.props.history.push(`/lista_evento/list`);                              
 
         }
         else {
 //console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
           alert("Error na Criação verificar log")              
         }
       }).catch(error=>{
         console.log(error) 
     
       })
 
     }      
 }  

 enviar_botao_modal(inicio) {

  const { validate } = this.state 
   // console.log(JSON.stringify(this.state, null, "    "));
    console.log(JSON.stringify(validate, null, "    "));

   if (inicio == 1) {

    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
              <div className="d-flex justify-content-center">
              <label> Enviar </label>
              </div>     
        </Box>           
    );   
     
    } else {

      if (this.state.validacao_email == true) { 
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendEmail()}>
                    <div className="d-flex justify-content-center">
                    <label> Enviar </label>
                    </div>     
              </Box>           
          );   
      } else {
        return (
      
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Enviar </label>
                  </div>     
            </Box>           
        );   
      }   

    } 
} 
 

   

    verifica_botao(inicio) {
      const { validate } = this.state 
  
      if (inicio == 1) {
        
          if (this.state.validacao_ordem_servico == true && this.state.validacao_data_evento == true 
            && this.state.validacao_nome_evento == true ) { 
            return (
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_evento_modal"  p={2} onClick={()=>this.sendSave()}>
                      <div className="d-flex justify-content-center">
                      <label> Incluir </label>
                      </div>     
                </Box>           
            );   
          } else {
            return (
          
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_evento_modal"  p={2}>
                      <div className="d-flex justify-content-center">
                      <label> Incluir </label>
                      </div>     
                </Box>           
            );                   
          }
      } else {
        return (
          
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_evento_modal"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );                   
      } 
  
    }  

  verifica_menu() {

    if (sessionStorage.getItem('logperfil') == 1) {
      return ( 
        <div>
            <Menu_administrador />                
         </div>   
       ); 
    } else if (sessionStorage.getItem('logperfil') == 2) {
      return ( 
        <div>
            <Menu_cliente_individual />                
         </div>   
       ); 
    } else if (sessionStorage.getItem('logperfil') == 8) {
        return ( 
          <div>
              <Menu_operador />                
           </div>   
         );    
    } else if (sessionStorage.getItem('logperfil') == 7) {
      return ( 
        <div>
            <Menu_cliente_empresarial />                
         </div>   
       ); 
    } else if (sessionStorage.getItem('logperfil') == null){
        return (
          <Menu />
        );
  
    }          
  }     

  autorizacao_inclusao() {
 
    if (sessionStorage.getItem('logperfil') > 1){
      return (
        <div className="botao_lista_incluir">
        <Fab style={{ textTransform: 'capitalize',  outline: 'none'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
            <AddIcon/> <div className="botao_incluir"> Adicionar Eventos </div>
        </Fab>
      </div>    
      );
    } 

  }

  verificaOrdem_servico(e) {    
       if (e.target.value.length == 0) {        
        this.setState({                   
          inicio: 1,
          erro_ordem_servico: false,   
          validacao_ordem_servico: false,    
         })            
       } else if (e.target.value.length > 0) {        
        this.setState({                   
          inicio: 1,
          erro_ordem_servico: false,   
          validacao_ordem_servico: true,    
         })            
       } 
   }  

   verificaNome_Evento(e) {    
    if (e.target.value.length == 0) {        
     this.setState({                   
       inicio: 1,
       erro_nome_evento: false,   
       validacao_nome_evento: false,    
      })            
    } else if (e.target.value.length > 0) {        
     this.setState({                   
       inicio: 1,
       erro_nome_evento: false,   
       validacao_nome_evento: true,    
      })            
    } 
}  

verificaData_Evento(e) {

     let date_validar = e.target.value;
     var dia = date_validar.substr(0,2);
     var mes = date_validar.substr(3,2);   
     var ano = date_validar.substr(6,4);    

       if (e.target.value.length == 0) {     
        this.setState({ 
          erro_data_evento: true,   
          validacao_data_evento: false,      
          mensagem_data_evento: '' 
         })      
       } else if (e.target.value.length == 10) {

        debugger;       
      
        if ( mes == '02' && dia == 29 && (!Number.isInteger(ano / 4)) ){
         
            this.setState({ 
              erro_data_evento: true,   
              validacao_data_evento: false,      
              mensagem_data_evento: 'Dia é inválido.' 
             
             })  

        } else if ( mes == '02' && dia == 30) {

          this.setState({ 
            erro_data_evento: true,   
              validacao_data_evento: false,      
              mensagem_data_evento: 'Dia é inválido.' 
           })  

        } else if ( mes == '02' && dia == 31) {

            this.setState({ 
              erro_data_evento: true,   
              validacao_data_evento: false,      
              mensagem_data_evento: 'Dia é inválido.' 
             })  

        }  
        else {
      
          dia = date_validar.substr(0,2);
          mes = date_validar.substr(3,2);         

         if (dia > 31) {
          this.setState({ 
            erro_data_evento: true,   
            validacao_data_evento: false,      
            mensagem_data_evento: 'Dia é inválido.'             
           })  
         } else if (mes > 12) {
          this.setState({ 
            erro_data_evento: true,   
            validacao_data_evento: false,      
            mensagem_data_evento: 'Dia é inválido.'     
           })  
         } else if ((mes==4||mes==6||mes==9||mes==11) && dia==31) {
          this.setState({ 
            erro_data_evento: true,   
            validacao_data_evento: false,             
            mensagem_data_evento: 'Data do serviço é inválido.' 
           })  
         } else {
          this.setState({ 
            erro_data_evento: false,   
            validacao_data_evento: true,      
            mensagem_data_evento: '',
          });   
         }
        }
    } 
}  

  verifica_titulo() {
    if ( this.state.perfil == 1) {
      return (            
        'ADMINISTRADOR' 
       ); 
    } else {
      return (      
        sessionStorage.getItem('lognome')
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

  opcao_tabChange = (event, newValue) => {   
    this.setState({        
        value: newValue 
    });    
  };

  verificar_permissao() {
    if (sessionStorage.getItem('logperfil') == 7) {
      return (
        <div class="p-2">  
        <div class="d-flex justify-content-start">
            <div>                  
               <FormControl variant="outlined" className="select_evento_operador">
                 <InputLabel id="demo-simple-select-outlined-label">Operadores</InputLabel>
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
            <Button className="botao_evento_operador_compartilha" color="primary" variant="contained"                         
                       onClick={()=>this.handleOpenModalCompartilhar()}>
               Adicionar Operador  <i class="fas fa-users"></i>
            </Button>    
            </div>
        </div>       
   </div>   
      );
    }

  }

  render()
  {
  
    
    return (
      <div>
       <div>
       {this.verifica_menu()}
       <div className="titulo_lista">
               <div className="unnamed-character-style-4 descricao_admministrador">                       
                 <div className="titulo_bemvindo"> Eventos </div>
              </div>      
            </div>
          </div>
        <br/>  
       <div className="margem_left">       
    
     <div className="container-fluid">   
     <div>
      <TabContext value={this.state.value} className="tabs_padrao">
        <AppBar position="static" color="transparent">
          <TabList onChange={this.opcao_tabChange} aria-label="simple tabs example">           
            <Tab label="Ativos" value="1" className="tabs_titulo_lista"/>
            <Tab label="Finalizados" value="2" className="tabs_titulo_lista_2"/>            
            <Tab label="Excluídos" value="3" className="tabs_titulo_lista_2"/>            
          </TabList>
        </AppBar>
        <TabPanel value="1" className="tirar_espaco">
        <div>
                        <MaterialTable          
                            title=""   
                            isLoading={this.state.loading}
                           // style={{ maxBodyHeight: '60vh', minBodyHeight: '60vh' }}                      
                            columns={[
                              { title: '', field: '', width: '55px', minWidth: '55px', maxWidth: '55px' },
                              { title: 'Dt Inclusão', field: 'createdAt', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => dateFormat(rowData.createdAt, "UTC:dd/mm/yyyy") },
                             
                              { title: 'Ordem de Serviço', field: 'ordem_servico', width: '150px', minWidth: '150px', maxWidth: '150px'  },
                              { title: 'Nome do Evento', field: 'nome_evento', width: '380px', minWidth: '380px', maxWidth: '380px', 
                              render: rowData => rowData.nome_evento.substr(0,50) },
                              { title: 'Data do Evento', field: 'data_evento', width: '120px', minWidth: '120px', maxWidth: '120px', 
                              render: rowData => dateFormat(rowData.data_evento, "UTC:dd/mm/yyyy") },      
                              { title: 'Total de Serviços', field: 'viagens_total', width: '150px', minWidth: '150px', maxWidth: '150px', align: 'right',
                              render: rowData => rowData.viagens_total == "" ? '0' : rowData.viagens_total  }, 
                              { title: 'Valor Total', field: 'valor_total', width: '110px', minWidth: '110px', maxWidth: '110px', align: 'right',
                              render: rowData => rowData.valor_total == null? '0,00' : valorMask(rowData.valor_total) },
                              { title: '', field: '', align: 'left', width: '150px', lookup: { 1: 'sadas', 2: 'asdas' },                              
                             },            
                            ]}
                            data={this.state.listEventos}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir',
                                addTooltip: 'Adicionar Valores Tarifários',
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
                                searchPlaceholder: 'Buscar evento',        
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
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "20px", color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_eventos_ativos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,         
                              maxBodyHeight: '60vh',
                              minBodyHeight: '60vh',   
                              padding: 'dense',   
                              overflowY: 'scroll',                             
                             // tableLayout: 'auto',
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 8,
                             // pageSize: 7,
                              pageSizeOptions: [0],          
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                tooltip: 'editar',                                
                                onClick: (evt, data) => this.onEditar(data)
                              },
                              {
                                icon: 'delete',                                                             
                                tooltip: 'Deleta Evento',          
                                onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                              }
                              /*,
                              {
                                icon: 'add',                                                             
                                tooltip: 'Adiciona Eventos',
                                isFreeAction: true,
                                onClick: (event) => this.handleOpenModalInclusao()
                              } */
                            ]}
                            
                          />      
                </div>    
        </TabPanel>
        <TabPanel value="2" className="tirar_espaco">
        <div>
                        <MaterialTable          
                            title=""
                              
                            columns={[
                              { title: '', field: '', width: '55px', minWidth: '55px', maxWidth: '55px' },
                              { title: 'Dt Finalização', field: 'createdAt', width: '130px', minWidth: '130px', maxWidth: '130px', render: rowData => dateFormat(rowData.createdAt, "UTC:dd/mm/yyyy") },
                              { title: 'Dt Inclusão', field: 'createdAt', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => dateFormat(rowData.createdAt, "UTC:dd/mm/yyyy") },
                              { title: 'Ordem de Serviço', field: 'ordem_servico', width: '150px', minWidth: '150px', maxWidth: '150px'  },
                              { title: 'Nome do Evento', field: 'nome_evento', width: '350px', minWidth: '350px', maxWidth: '350px', 
                              render: rowData => rowData.nome_evento.substr(0,50) },
                              { title: 'Data do Evento', field: 'data_evento', width: '120px', minWidth: '120px', maxWidth: '120px', 
                              render: rowData => dateFormat(rowData.data_evento, "UTC:dd/mm/yyyy") },      
                              { title: 'Total de Serviços', field: 'viagens_total', width: '150px', minWidth: '150px', maxWidth: '150px', align: 'right',
                              render: rowData => rowData.viagens_total == "" ? '0' : rowData.viagens_total  }, 
                              { title: 'Valor Total', field: 'valor_total', width: '110px', minWidth: '110px', maxWidth: '110px', align: 'right',
                              render: rowData => rowData.valor_total == null? '0,00' : valorMask(rowData.valor_total) },
                              { title: '', field: '',  align: 'left', width: '150px', lookup: { 1: 'sadas', 2: 'asdas' },                              
                             },          
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
                                searchPlaceholder: 'Buscar evento',        
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
                                actions: '',
                              },
                            }}        
                            options={{
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "20px", color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_eventos_finalizados',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,         
                              maxBodyHeight: '60vh',
                              minBodyHeight: '60vh',   
                              padding: 'dense',   
                              overflowY: 'scroll',
                            //  tableLayout: 'fixed',
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 8,
                             // pageSize: 7,
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
        </TabPanel> 
        <TabPanel value="3" className="tirar_espaco">
        <div>
                        <MaterialTable          
                            title=""                              
                            columns={[
                              { title: '', field: '', width: '55px', minWidth: '55px', maxWidth: '55px' },
                              { title: 'Dt Exclusão', field: 'createdAt', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => dateFormat(rowData.createdAt, "UTC:dd/mm/yyyy") },
                              { title: 'Responsável exclusão', field: 'nome_responsavel', width: '180px', minWidth: '180px', maxWidth: '180px'  },
                              { title: 'Dt Inclusão', field: 'createdAt', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => dateFormat(rowData.createdAt, "UTC:dd/mm/yyyy") },
                              { title: 'Ordem de Serviço', field: 'ordem_servico', width: '150px', minWidth: '150px', maxWidth: '150px'  },
                              { title: 'Nome do Evento', field: 'nome_evento', width: '350px', minWidth: '350px', maxWidth: '350px', 
                              render: rowData => rowData.nome_evento.substr(0,50) },
                              { title: 'Data do Evento', field: 'data_evento', width: '120px', minWidth: '120px', maxWidth: '120px', 
                              render: rowData => dateFormat(rowData.data_evento, "UTC:dd/mm/yyyy") },      
                              { title: 'Total de Serviços', field: 'viagens_total', width: '150px', minWidth: '150px', maxWidth: '150px', align: 'right',
                              render: rowData => rowData.viagens_total == "" ? '0' : rowData.viagens_total  }, 
                              { title: 'Valor Total', field: 'valor_total', width: '110px', minWidth: '110px', maxWidth: '110px', align: 'right',
                              render: rowData => rowData.valor_total == null? '0,00' : valorMask(rowData.valor_total) },
                              { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' },                                
                             },   
                            ]}
                            data={this.state.listaeventosexcluidos}   
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
                                searchPlaceholder: 'Buscar evento',        
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
                                actions: '',
                              },
                            }}        
                            options={{
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "20px", color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_eventos_finalizados',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,         
                              maxBodyHeight: '60vh',
                              minBodyHeight: '60vh',   
                              padding: 'dense',   
                              overflowY: 'scroll',
                            //  tableLayout: 'fixed',
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 7,
                             // pageSize: 7,
                              pageSizeOptions: [0],                    
                            }}   
                            actions={[
                              {             
                                icon: '',
                                tooltip: '',                              
                              }
                            ]}                        
                          />     
                           
                </div>      
        </TabPanel>      
      </TabContext>        
      </div>    
   </div> 
       
       {this.autorizacao_inclusao()}
               
       <br/>
       <ReactModal 
        isOpen={this.state.showMensagemDelete}
        style={ConfirmacaodelStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div> 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalDelete()} className="botao_close_modal_deletar">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <center><img src="/exclamation.png" /> </center>
            <div className="container_alterado">              
              
             <div className="moldura_modal_delecao">
               <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Evento? </div>
               <div>Ao confirmar a exclusão o registro será apagado.  </div>
             </div>     
                              <div className="retorno">{this.state.retorno}</div>
            <Box 
               className="botoes_delete_cancelar_modal" p={2} onClick={()=>this.handleCloseModalDelete()}>
              <div className="d-flex justify-content-center">
              <label> Cancelar </label>
              </div>     
            </Box>      
            <Box 
               className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDelete(this.state.campDeletarId)}>
              <div className="d-flex justify-content-center">
              <label> Excluir </label>
              </div>     
            </Box>      

            </div>
     </ReactModal>     
       <ReactModal 
        isOpen={this.state.showModalInclusao}
        style={this.state.mudar_estilo}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
        <div className="container-fluid">
             <div className="row">
               <div className="col-8 altura_titulo">
               Incluir Eventos
               </div>
               <div className="col-4">
               <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()}>
              <CloseOutlinedIcon />
            </IconButton></div>                    
               </div>                    
             </div>
           </div>            
            <div className="container_modal_alterado">
                <div class="d-flex flex-column espacamento_modal">
                  <div class="p-2">      
                              
                      <FormControl variant="outlined" disabled={this.state.ordem_servico_disabled}>
                        <InputLabel className="label_text" htmlFor="filled-adornment-password">Número de ordem</InputLabel>
                        <OutlinedInput
                            autoComplete="off"         
                            readOnly={this.state.ordem_servico_disabled}                        
                            error={this.state.erro_ordem_servico}
                            helperText={this.state.mensagem_ordem_servico}
                            className="data_operador"                       
                            id="outlined-basic"                      
                            variant="outlined"
                            value={this.state.campordem_servico} 
                            onKeyUp={this.verificaOrdem_servico}
                            onChange={(value)=> this.setState({campordem_servico:value.target.value})}                                 
                            inputProps={{
                              maxLength: 7,
                            }}
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_ordem_servico? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={140}
                        />
                      <FormHelperText error={this.state.erro_ordem_servico}>
                            {this.state.mensagem_ordem_servico}
                      </FormHelperText>
                      </FormControl>     
                  </div>
                  <div class="p-2">      
                              
                              <FormControl variant="outlined" disabled={this.state.nome_evento_disabled}>
                                <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome do Evento</InputLabel>
                                <OutlinedInput
                                    autoComplete="off"         
                                    readOnly={this.state.nome_evento_disabled}                        
                                    error={this.state.erro_nome_evento}
                                    helperText={this.state.mensagem_nome_evento}
                                    className="data_operador"                       
                                    id="outlined-basic"                      
                                    variant="outlined"
                                    value={this.state.campnome_evento} 
                                    onKeyUp={this.verificaNome_Evento}
                                    onChange={(value)=> this.setState({campnome_evento:value.target.value})}         
                                    inputProps={{
                                      maxLength: 100,
                                    }}            
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_nome_evento? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={140}
                                />
                              <FormHelperText error={this.state.erro_nome_evento}>
                                    {this.state.mensagem_nome_evento}
                              </FormHelperText>
                              </FormControl>     
                          </div>
                        <div class="p-2">                                    
                              <FormControl variant="outlined" disabled={this.state.data_evento_disabled}>
                                <InputLabel className="label_text" htmlFor="filled-adornment-password">Data do Evento</InputLabel>
                                <OutlinedInput
                                    autoComplete="off"         
                                    readOnly={this.state.data_evento_disabled}                        
                                    error={this.state.erro_data_evento}
                                    helperText={this.state.mensagem_data_evento}
                                    className="data_operador"                       
                                    id="outlined-basic"                      
                                    variant="outlined"
                                    value={this.state.campdata_evento}                    
                                    onKeyUp={this.verificaData_Evento}
                                    onChange={(value)=> this.setState({ campdata_evento: dataMask(value.target.value)})}       
                                    inputProps={{
                                      maxLength: 10,
                                    }}     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_data_evento? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={140}
                                />
                              <FormHelperText error={this.state.erro_data_evento}>
                                    {this.state.mensagem_data_evento}
                              </FormHelperText>
                              </FormControl>     
                          </div>                                                  
                           {this.verificar_permissao()}  

                    {this.verifica_botao(this.state.inicio)}       

                 </div>
            </div>  
       </ReactModal>   
       <ReactModal 
        isOpen={this.state.showModalCompartilhar}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
        <div className="container-fluid">
             <div className="row">
               <div className="col-9 altura_titulo">
               Solicitar Inclusão do operador 
               </div>
               <div className="col-1">
               <IconButton aria-label="editar" onClick={()=>this.handleCloseModalCompartilha()}>
              <CloseOutlinedIcon />
            </IconButton></div>                    
               </div>                    
             </div>
           </div>                   
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_modal_motorista">                                   
                      <div class="p-2">   
                      <FormControl variant="outlined">
                          <InputLabel className="label_text" htmlFor="filled-adornment-password">Email</InputLabel>
                          <OutlinedInput    
                              autoComplete="off"                     
                              error={this.state.erro_email}
                              helperText={this.state.mensagem_email}
                              className="data_operador"                       
                              id="outlined-basic"                   
                              variant="outlined"
                              value={this.state.campEmail}                                         
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
                            labelWidth={80}                      
                          />
                        <FormHelperText error={this.state.erro_email}>
                              {this.state.mensagem_email}
                        </FormHelperText>
                      </FormControl>                         
                      </div>
                      <div className="posicao_2">    
                      <div class="p-2">                        
                          <div className="checkbox_titulo">Permissões de Acesso </div>
                      </div>                         
                      </div>     
                      <div className="posicao_2">
                      <div class="p-2">                        
                        <div class="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d"> 
                               <div className="checkbox_subtitulo">Permissão de Representante Legal</div> 
                               <div className="checkbox_descricao">É permitido realizar todas as funcionalidades disponiveis na conta da sua empresa.</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e">                                                  

                           <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value={this.state.camprepresentante_legal}
                                    control={<Switch color="primary" checked={this.state.camprepresentante_legal} 
                                        onChange={this.handlerepresentantelegalChange}/>}                                    
                                    labelPlacement="end"
                                  />                       
                           </FormGroup>
                               
                           </div>
                        </div>     
                      </div>
                      <div class="p-2">                        
                        <div className="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d"> 
                               <div className="checkbox_subtitulo">Gerenciar Eventos</div> 
                               <div className="checkbox_descricao">É permitido criar, alterar, excluir e gerenciar eventos na conta da sua empresa.</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e"> 
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value={this.state.campgerencia_eventos}
                                    control={<Switch color="primary" checked={this.state.campgerencia_eventos} 
                                        onChange={this.handlegerenciaChange}/>}                                    
                                    labelPlacement="end"
                                  />                       
                                </FormGroup>
                           </div>
                        </div>     
                      </div>
                      <div class="p-2">                        
                        <div class="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d"> 
                               <div className="checkbox_subtitulo">Monitorar Eventos</div> 
                               <div className="checkbox_descricao">É permitido Listar e Monitorar eventos na conta da sua empresa.</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e"> 
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    className="checkbox_esquerdo_operador"
                                    value={this.state.campMonitorar_eventos}
                                    control={<Switch color="primary" checked={this.state.campMonitorar_eventos} 
                                        onChange={this.handlemonitorar_eventosChange}/>}                                    
                                    labelPlacement="end"
                                  />                       
                                </FormGroup>
                           </div>
                        </div>                      
                </div>
              </div>              
                    </div>                        
                    {this.enviar_botao_modal(this.state.inicio)}          

                 </div>
               </div>    
            </div>
     </ReactModal>           

            <Snackbar                   
                anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
                open={this.state.mensagem_alert}                
                autoHideDuration={2000}               
                onClose={this.envia_mensagemClose}                
                >
            <Alert onClose={this.envia_mensagemClose} severity="success">
                  {this.state.mensagem_usuario}
            </Alert>
          </Snackbar>
          <Snackbar                   
                anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
                open={this.state.mensagem_alert_exclusao}                
                autoHideDuration={2000}               
                onClose={this.envia_mensagemExclusaoClose}                
                >
            <Alert onClose={this.envia_mensagemExclusaoClose} severity="error">
                  {this.state.mensagem_usuario}
            </Alert>
          </Snackbar>

        <ReactModal 
        isOpen={this.state.showModalAlteracao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Alterar Eventos
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalAlteracao()} className="botao_close_modal_cartao">
              <CloseOutlinedIcon />
            </IconButton></div>          

       </ReactModal>     
       
    
       </div>  
      </div>   
    );
  }
  onEditar(data) {    
     sessionStorage.setItem('logeventoId', data.id);
     this.props.history.push(`/lista_evento_servico/${data.id}`);        
  }
  onAdicionar() {
    this.props.history.push(`/criar_eventos/${sessionStorage.getItem('logid')}`);   
  }

  envia_mensagemClick = () => {
    this.setState({ 
      mensagem_alert: true      
    });

  }      

  envia_mensagemClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_alert: false      
    });   
    
    this.loadlistEventos();    
  
  };

  handleOpenModalInclusao () { 
    this.setState({ 
      showModalInclusao: true,        
      incluir: true,
    });  

    this.limpar_campos();     
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false
    }); 
    
   
  }

  envia_mensagemExclusaoClick = () => {
    this.setState({ 
      mensagem_alert_exclusao: true      
    });

  }      

  envia_mensagemExclusaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    this.setState({ 
      mensagem_alert_exclusao: false      
    });   
  
  };

  handleOpenModalCompartilhar() { 
    this.setState({ 
      showModalCompartilhar: true,      
    //  mudar_estilo: customStyles_2,
    });      
    
  }
  
  handleCloseModalCompartilha () {
    this.setState({ 
      showModalCompartilhar: false,
      //mudar_estilo: customStyles,
    }); 
    
   
  }


  handleOpenModalAlterar() { 
    this.setState({ 
      showModalAlteracao: true,      
    });  

    //this.limpar_campos();     
    
  }
  
  handleCloseModalAlterar () {
    this.setState({ 
      showModalAlteracao: false
    }); 
    
   
  }

  handleOpenModalDelete(data) { 
    this.setState({ 
      showMensagemDelete: true,
      campDeletarId: data.id,
      retorno: '',
      campDescricao: '',
      validacao_descricao: false,
    });  

    //console.log('resultado '+JSON.stringify(data.id, null, "    ")); 
    //console.log('modal id - '+data.id)  
     
    
  }
  
  handleCloseModalDelete() {
    this.setState({ 
      showMensagemDelete: false
    });   
  }
  

  loadFillData(){

    return this.state.listEventos.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.ordem_servico}</td>
          <td>{data.nome_evento}</td>
          <td>{ dateFormat(data.data_evento, "dd/mm/yyyy")}</td>
          <td>
            <div style={{width:"250px"}}>               
            <IconButton aria-label="delete" onClick={()=>this.onIncluir(data)}>
                <AddIcon />
            </IconButton>             
              {'   '}       
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data.email, data.id)}>
                <DeleteIcon />
              </IconButton>
            </div>            
          </td>          
        </tr>
      )
    })
  }
  onIncluir(data) {  
    this.props.history.push(`/lista_evento_servico/${data.id}`);   
  }

  onDelete(id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
    } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId){
    // url de backend
    //console.log('deletar o id - '+userId);
    //const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    //funcao para pegar os serviços e eventos e colocar na tabela historico
    
   // for (let i = 0; i < (this.state.listservicosevento.length); i++) {
        
   // }

  // this.loadservicoseventos(userId);
  // this.loadeventodelete(userId);
   
   debugger;
   api.get(`/servicos/getEvento/${userId}`)
    .then(res =>{
    debugger;
     if (res.data.success == true) {
       debugger;
      const servicos = res.data.data; 
      this.setState({listservicosevento: servicos}); 
  //   console.log('criando loadservicoseventos  - '+JSON.stringify(res.data, null, "    ")); 
 //   if (res.data.success) {
     for (let i = 0; i < (this.state.listservicosevento.length); i++) {
       
        const datapost_incluir = {
          tipoEventoId: this.state.listservicosevento[i].tipoEventoId, 
          eventoId: this.state.listservicosevento[i].eventoId, 
          tipoTransporte: this.state.listservicosevento[i].tipoTransporte,
          nome_passageiro: this.state.listservicosevento[i].nome_passageiro, 
          nome_responsavel: sessionStorage.getItem('lognome'),
          telefone_passageiro: this.state.listservicosevento[i].telefone_passageiro,
          quantidade_passageiro: this.state.listservicosevento[i].quantidade_passageiro,  
          data_servico: this.state.listservicosevento[i].data_servico,
          quantidade_diarias: this.state.listservicosevento[i].quantidade_diarias, 
          hora_inicial: this.state.listservicosevento[i].hora_inicial,  
          hora_final: this.state.listservicosevento[i].hora_final,  
          local_embarque: this.state.listservicosevento[i].local_embarque, 
          local_desembarque: this.state.listservicosevento[i].local_desembarque, 
          embarque_latitude: this.state.listservicosevento[i].embarque_latitude, 
          embarque_longitude: this.state.listservicosevento[i].embarque_longitude, 
          desembarque_latitude: this.state.listservicosevento[i].desembarque_latitude, 
          desembarque_longitude: this.state.listservicosevento[i].desembarque_longitude,      
          distancia_value: this.state.listservicosevento[i].distancia_value, 
          tempo_value: this.state.listservicosevento[i].tempo_value,
          companhia_aerea: this.state.listservicosevento[i].companhia_aerea,
          numero_voo: this.state.listservicosevento[i].numero_voo, 
          motorista_bilingue: this.state.listservicosevento[i].motorista_bilingue, 
          valor_bilingue: this.state.listservicosevento[i].valor_bilingue,
          valor_receptivo: this.state.listservicosevento[i].valor_receptivo,
          motorista_receptivo: this.state.listservicosevento[i].motorista_receptivo, 
          nome_motorista: this.state.listservicosevento[i].nome_motorista, 
          telefone_motorista: this.state.listservicosevento[i].telefone_motorista, 
          km_translado: this.state.listservicosevento[i].km_translado, 
          tempo_translado: this.state.listservicosevento[i].tempo_translado,
          cartaoId: this.state.listservicosevento[i].cartaoId,        
          valor_estimado: this.state.listservicosevento[i].valor_estimado,    
          valor_oser: this.state.listservicosevento[i].valor_oser,
          valor_motorista: this.state.listservicosevento[i].valor_motorista,  
          logid: this.state.listservicosevento[i].logid,
          servico_pai_id: this.state.listservicosevento[i].servico_pai_id,
          perfilId: this.state.listservicosevento[i].perfilId,  

        }  
        api.post('/historicoServicos/create', datapost_incluir);
      }  

      api.delete(`/servicos/deleteevento/${userId}`)
      }

         api.get(`/eventos/get/${userId}`)
            .then(res=>{

            if (res.data.success == true) {
              const eventos = res.data.data         
           console.log('criando loadeventodelete - '+JSON.stringify(res.data, null, "    "));     
            debugger;
                const datapost_evento_incluir = {
                  id: eventos[0].id,
                  eventoId: eventos[0].id,
                  logid: eventos[0].logid,
                  nome_responsavel: sessionStorage.getItem('lognome'),
                  perfilId: eventos[0].perfilId,    
                  ordem_servico: eventos[0].ordem_servico, 
                  nome_evento: eventos[0].nome_evento, 
                  viagens_total: eventos[0].viagens_total,
                  valor_total: eventos[0].valor_total, 
                  data_evento: eventos[0].data_evento, 
                  statusId: eventos[0].statusId,          
                }           
                
                api.post('/historicoEventos/create',datapost_evento_incluir);
              //   this.setState({listaeventodelete: data});             
              //debugger;
             
                api.delete(`/eventos/delete/${userId}`)
                .then(response =>{
                  if (response.data.success) {       
                    debugger;                   

                    this.loadlistEventos();
                    this.loadeventosexcluidos();
            
                    this.setState({       
                      mensagem_usuario: 'Evento excluído com sucesso!'
                      });
            
                    this.handleCloseModalDelete();
                    this.envia_mensagemExclusaoClick();
            
                  }
                })
                .catch ( error => {
                  alert("Error 325 ")
                })
        
              }
         }).catch ( error => {
           alert("Error loadeventodelete "+error)
         })
     
    //  })
    // }
    })
    .catch ( error => {
      alert("Error loadservicoseventos "+error)
    })     
  
    
    
  }

}

export default listaeventosComponent;
