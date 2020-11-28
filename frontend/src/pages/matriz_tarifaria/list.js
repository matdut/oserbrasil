import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';
import { Input, FormFeedback } from 'reactstrap';
import { Link } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import { visualizarmask } from '../formatacao/visualizarmask';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { valorMask } from '../formatacao/valormask';
import { valorDoublemask } from '../formatacao/valorDoublemask';
import { numeroMask } from '../formatacao/numeromask';

import MaterialTable from 'material-table';
import ReactModal from 'react-modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Data } from '@react-google-maps/api';
//import { Tabs, Tab } from 'react-bootstrap';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import { dataMask } from '../formatacao/datamask';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';
import Menu_matriz from '../matriz_tarifaria/menu_matriz';

//import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const EventoId = localStorage.getItem('logidEvento');
var dateFormat = require('dateformat');

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
    width                  : '560px',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class listaMatrizComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      descricao: '',
      mensagem: '',
      color: 'light',
      campId: '',    
      retorno: '',
      campfaixa_inicial: '',    
      campdata_inicial: '',
      campdata_final: '',
      camphora_inicial: '',
      camphora_final: '',
      campfaixa_final: '',    
      campvalor_km: '',    
      campvalor_tempo: '',      
      mensagem_aguarde: '',
      campbandeira: '',    
      campreceptivo: '',    
      campbilingue: '',    
      camppedagio: '',   
      camptipoId: '',          
      validacao_tipo: false,
      validacao_faixa_1: false,
      validacao_faixa_2: false,
      validacao_bandeira: false,
      validacao_bilingue: false,
      validacao_valorkm: false,
      validacao_receptivo: false,
      validacao_valortempo: false,      
      validacao_datainicio: false,      
      validacao_datafim: false,      
      validacao_hora_inicial: false,
      validacao_hora_final: false,
      erro_faixa_1: false,
      erro_faixa_2: false,
      erro_tipo: false,
      erro_bandeira: false,
      erro_bilingue: false,
      erro_valorkm: false,
      erro_receptivo: false,
      erro_valortempo: false,
      erro_datainicio: false,
      erro_datafim: false,
      erro_hora_inicial: false,
      erro_hora_final: false,
      listTipoTransporte: [],      
      inicio: 1,
      mensagem_tipoId: '',            
      mensagem_faixa_inicial: '',            
      mensagem_faixa_final: '',            
      mensagem_data_inicio: '',            
      mensagem_data_fim: '',            
      mensagem_valor_km: '',            
      mensagem_valor_tempo: '',              
      mensagem_bandeira: '',            
      mensagem_receptivo: '',            
      mensagem_bilingue: '',            
      mensagem_pedagio: '',      
      
      value: "1",

      listaMatriz:[],
      listaMatrizEspeciais:[],
      validate: {
        tipoIdState: '',
        faixa_inicialState: '',
        faixa_finalState: '',
        valor_kmState: '',
        valor_tempoState: '',
        bandeiraState: '',
        receptivoState: '',
        bilingueState: '',
        pedagioState: '',     
      }    
      
    }   

    this.tipoChange = this.tipoChange.bind(this);
    this.faixa_inicialchange = this.faixa_inicialchange.bind(this);
    this.faixa_finalchange = this.faixa_finalchange.bind(this);
    this.valor_kmchange = this.valor_kmchange.bind(this);
    this.valor_tempochange = this.valor_tempochange.bind(this);
    this.bandeirachange = this.bandeirachange.bind(this);
    this.receptivochange = this.receptivochange.bind(this);
    this.bilinguechange = this.bilinguechange.bind(this);
  
    this.verificafaixa_inicialOnblur = this.verificafaixa_inicialOnblur.bind(this);
    this.verificafaixa_finalOnblur = this.verificafaixa_finalOnblur.bind(this);

    this.data_iniciochange = this.data_iniciochange.bind(this);
    this.data_finalchange = this.data_finalchange.bind(this);
    this.hora_iniciochange = this.hora_iniciochange.bind(this);
    this.hora_finalchange = this.hora_finalchange.bind(this);

    this.verificaData_inicio = this.verificaData_inicio.bind(this);
    this.verificaData_fim = this.verificaData_fim.bind(this);
    this.verificahora_inicial = this.verificahora_inicial.bind(this);
    this.verificahora_final = this.verificahora_final.bind(this);    

    this.verificaTipo_veiculo = this.verificaTipo_veiculo.bind(this);
    this.verificafaixa_inicial = this.verificafaixa_inicial.bind(this);
    this.verificafaixa_final = this.verificafaixa_final.bind(this);
    this.verificavalor_km = this.verificavalor_km.bind(this);
    this.verificavalor_tempo = this.verificavalor_tempo.bind(this);
    this.verificabandeira = this.verificabandeira.bind(this);
    this.verificareceptivo = this.verificareceptivo.bind(this);
    this.verificabilingue = this.verificabilingue.bind(this);

    this.validateBilingueChange = this.validateBilingueChange.bind(this);
    this.carrega_matriz = this.carrega_matriz.bind(this);
    this.limpar_campos = this.limpar_campos.bind(this);   
    
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),         
    });     
       
    this.loadMatriz();
    this.loadMatrizEspecial();
  }

  limpar_campos() {
    this.setState({
      validacao_tipo: false,      
      validacao_faixa_1: false,
      validacao_faixa_2: false,
      validacao_bandeira: false,
      validacao_bilingue: false,
      validacao_valorkm: false,
      validacao_receptivo: false,
      validacao_valortempo: false,     
      validacao_datainicio: false,      
      validacao_datafim: false,      
      validacao_hora_inicial: false,
      validacao_hora_final: false,
      campId: '',    
      campfaixa_inicial: '',    
      campdata_inicial: '',
      campdata_final: '',
      camphora_inicial: '',
      camphora_final: '',
      campfaixa_inicial: '',    
      campfaixa_final: '',    
      campvalor_km: '',    
      campvalor_tempo: '',      
      mensagem_aguarde: '',
      campbandeira: '',    
      campreceptivo: '',    
      campbilingue: '',    
      camppedagio: '',   
      camptipoId: '',    
    });        
  } 

  handleOpenModal () {
    this.setState({ 
      showModal: true    
    });
  
   // this.prepareSave();
  }
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,
      incluir: false 
    });
  }

  tipoChange(e) {  
    this.setState({ camptipoId: e.target.value })  
  }
  faixa_inicialchange(e) {
    this.setState({ campfaixa_inicial: numeroMask(e.target.value) })
  }
  faixa_finalchange(e) {
    this.setState({ campfaixa_final: numeroMask(e.target.value) })
  }
  
  valor_kmchange(e) {
    this.setState({ campvalor_km: valorMask(e.target.value) })
  }
  valor_tempochange(e) {
    this.setState({ campvalor_tempo: valorMask(e.target.value) })
  }
  bandeirachange(e) {
    this.setState({ campbandeira: valorMask(e.target.value) })
  }
  bilinguechange(e) {
    this.setState({ campbilingue: numeroMask(e.target.value) })    
  }
  receptivochange(e) {
    this.setState({ campreceptivo: valorMask(e.target.value) })
  }
  data_iniciochange(e) {
    this.setState({ campdata_inicial: dataMask(e.target.value) })
  }
  data_finalchange(e) {
    this.setState({ campdata_final: dataMask(e.target.value) })
  }
  hora_iniciochange(e) {
    this.setState({ camphora_inicial: e.target.value })
  }
  hora_finalchange(e) {
    this.setState({ camphora_final: e.target.value })
  }

  validateBilingueChange(e){
    const { validate } = this.state
     
      if (e.target.value.length > 0) {
          validate.bilingueState = 'has-success'       
          this.setState({ 
            erro_bilingue: false,
            validacao_bilingue: true,
            mensagem_bilingue: '' 
          })            
      }        
  }


  verificaTipo_veiculo(e) {  
    if (this.state.camptipoId == 0) {     
     this.setState({         
       erro_tipo: true,  
       validacao_tipo: false,
       inicio: 1,        
       mensagem_tipoId: ""  
      })            
    } else {      
     this.setState({ 
       erro_tipo: false,  
       validacao_tipo: true,
       inicio: 2,        
       mensagem_tipoId: ""  
      })           
  //    this.verifica_botao(this.state.inicio) 
    }     
}

 verificafaixa_inicial(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {    
      this.setState({ 
        erro_faixa_1: false,
        validacao_faixa_1: false,
        inicio: 1,                
        mensagem_faixa_inicial: ""  
       })            
     } else {     
      validate.faixa_inicialState = 'has-success'
      this.setState({ 
        validate,
        erro_faixa_1: false,
        validacao_faixa_1: true,
        inicio: 2,        
        mensagem_faixa_inicial: ""  
       })            
     //  this.verifica_botao(this.state.inicio)
     }     
}

verificafaixa_inicialOnblur(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {    
      this.setState({ 
        erro_faixa_1: false,
        validacao_faixa_1: false,
        inicio: 1,                
        mensagem_faixa_inicial: ""  
       })            
     } else {     
      validate.faixa_inicialState = 'has-success'
      this.setState({ 
        erro_faixa_1: false,
        validacao_faixa_1: true,
        validate,        
        inicio: 2,        
        mensagem_faixa_inicial: ""  
       })            
     //  this.verifica_botao(this.state.inicio)
     }     
}
verificafaixa_final(e) { 
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {      
      this.setState({ 
        erro_faixa_2: false,
        validacao_faixa_2: false,
        inicio: 1,        
        mensagem_faixa_final: ""  
       })            
     } else {     
      validate.faixa_finalState = 'has-success'
      this.setState({         
        validate,
        erro_faixa_2: false,
        validacao_faixa_2: true,
        inicio: 2,        
        mensagem_faixa_final: ""  
       })            
      // this.verifica_botao(this.state.inicio)
     }        
}
verificafaixa_finalOnblur(e) { 
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {      
      this.setState({ 
        erro_faixa_2: false,
        validacao_faixa_2: false,
        inicio: 1,        
        mensagem_faixa_final: ""  
       })            
     } else {     
      validate.faixa_finalState = 'has-success'
      this.setState({         
        validate,
        erro_faixa_2: false,
        validacao_faixa_2: true,
        inicio: 2,        
        mensagem_faixa_final: ""  
       })            
      // this.verifica_botao(this.state.inicio)
     }        
}
verificavalor_km(e) {  
     if (e.target.value.trim().length == 0) {  
      this.setState({ 
        erro_valorkm: false,
        validacao_valorkm: false,
        inicio: 1,        
        mensagem_valor_km: ""  
       })            
     } else {     
     // validate.faixa_finalState = 'has-success'
      this.setState({         
      //  validate,
        erro_valorkm: false,
        validacao_valorkm: true,
        inicio: 2,        
        mensagem_valor_km: ""  
       })            
       //this.verifica_botao(this.state.inicio)
     }            
}

verificavalor_tempo(e) {
  //const { validate } = this.state
     if (e.target.value.trim().length == 0) {
     // validate.valor_tempoState = "has-danger"
      this.setState({ 
    //    validate,
        erro_valortempo: false,
        validacao_valortempo: false,
        inicio: 1,        
        mensagem_valor_tempo: ""  
       })            
     } else {     
      // validate.faixa_finalState = 'has-success'
       this.setState({         
       //  validate,
         erro_valortempo: false,
         validacao_valortempo: true,
         inicio: 2,        
         mensagem_valor_tempo: ""  
        })            
        //this.verifica_botao(this.state.inicio)
      }              
}
verificabandeira(e) {
 // const { validate } = this.state
     if (e.target.value.trim().length == 0) {
   //   validate.bandeiraState = 'has-danger'
      this.setState({ 
     //   validate,
        erro_bandeira: false,
        validacao_bandeira: false,
        inicio: 1,        
        mensagem_bandeira: ""  
       })            
     } else {     
      // validate.faixa_finalState = 'has-success'
       this.setState({         
       //  validate,
         erro_bandeira: false,
         validacao_bandeira: true,
         inicio: 2,        
         mensagem_bandeira: ""  
        })            
       // this.verifica_botao(this.state.inicio)
      }               
}
verificabilingue(e) {
  //const { validate } = this.state
     if (e.target.value.trim().length == 0) {
    //  validate.bilingueState = 'has-danger'
      this.setState({ 
      //  validate,
        erro_bilingue: false,
        validacao_bilingue: false,
        inicio: 1,        
        mensagem_bilingue: ""  
       })            
     } else {     
      // validate.faixa_finalState = 'has-success'
       this.setState({         
       //  validate,
        erro_bilingue: false,
        validacao_bilingue: true,
         inicio: 2,        
         mensagem_bilingue: ""  
        })            
       // this.verifica_botao(this.state.inicio)
      }       
}
verificareceptivo(e) {
  //const { validate } = this.state
     if (e.target.value.trim().length == 0) {
    //  validate.receptivoState = 'has-danger'
      this.setState({ 
      //  validate,
        erro_receptivo: false,
        validacao_receptivo: false,
        inicio: 1,        
        mensagem_receptivo: ""  
       })            
     } else {     
      // validate.faixa_finalState = 'has-success'
       this.setState({         
       //  validate,
       erro_receptivo: false,
       validacao_receptivo: true,
         inicio: 2,        
         mensagem_receptivo: ""  
        })            
        this.verifica_botao(this.state.inicio)
      }       
}

verificaData_inicio(e) {  
  if (e.target.value.trim().length == 0) {  
   this.setState({ 
     erro_datainicio: false,
     validacao_datainicio: false,     
     mensagem_data_inicio: ""  
    })            
  } else if (e.target.value.trim().length == 10 ) {     
  // validate.faixa_finalState = 'has-success'
  let date_validar = e.target.value;
  var dia = date_validar.substr(0,2);
  var mes = date_validar.substr(3,2);         

  if (dia > 31) {
   this.setState({ 
    erro_datainicio: true,
    validacao_datainicio: false,           
    mensagem_data_inicio: 'Dia é inválido.' 
    })  
  } else if (mes > 12) {
   this.setState({ 
    erro_datainicio: true,
    validacao_datainicio: false,              
    mensagem_data_inicio: 'Mês é inválido.' 
    })  
  } else if ((mes==4||mes==6||mes==9||mes==11) && dia==31) {
   this.setState({ 
    erro_datainicio: true,
    validacao_datainicio: false,              
    mensagem_data_inicio: 'Data do serviço é inválido.' 
    })  
  } else {
   this.setState({ 
    erro_datainicio: false,
    validacao_datainicio: true,            
    inicio: 2,        
    mensagem_data_inicio: ""  
   });   
  }              
  
  }            
}

verificaData_fim(e) {  
  if (e.target.value.trim().length == 0) {  
   this.setState({ 
     erro_datafim: false,
     validacao_datafim: false,     
     mensagem_data_fim: ""  
    })            
  } else if (e.target.value.trim().length == 10 ) {     
    // validate.faixa_finalState = 'has-success'
    let date_validar = e.target.value;
    var dia = date_validar.substr(0,2);
    var mes = date_validar.substr(3,2);         
  
    if (dia > 31) {
     this.setState({ 
      erro_datafim: true,
      validacao_datafim: false,           
      mensagem_data_fim: 'Dia é inválido.' 
      })  
    } else if (mes > 12) {
     this.setState({ 
      erro_datafim: true,
      validacao_datafim: false,            
      mensagem_data_fim: 'Mês é inválido.' 
      })  
    } else if ((mes==4||mes==6||mes==9||mes==11) && dia==31) {
     this.setState({ 
      erro_datafim: true,
      validacao_datafim: false,               
      mensagem_data_fim: 'Data do serviço é inválido.' 
      })  
    } else {
     this.setState({ 
      erro_datafim: false,
      validacao_datafim: true,   
      mensagem_data_fim: ""  
     });   
    }              
    
    }             
}

verificahora_inicial(e) {  
  if (e.target.value.trim().length == 0) {  
   this.setState({ 
     erro_hora_inicial: false,
     validacao_hora_inicial: false,     
     mensagem_data_inicio: ""  
    })            
  } else {     
  // validate.faixa_finalState = 'has-success'
   this.setState({         
   //  validate,
     erro_hora_inicial: false,
     validacao_hora_inicial: true,     
     inicio: 2,        
     mensagem_data_inicio: ""  
    })            
    //this.verifica_botao(this.state.inicio)
  }            
}

verificahora_final(e) {  
  if (e.target.value.trim().length == 0) {  
   this.setState({ 
     erro_hora_final: false,
     validacao_hora_final: false,         
     mensagem_data_inicio: ""  
    })            
  } else {     
  // validate.faixa_finalState = 'has-success'
   this.setState({         
   //  validate,
     erro_hora_final: false,
     validacao_hora_final: true,     
     inicio: 2,        
     mensagem_data_inicio: ""  
    })            
    //this.verifica_botao(this.state.inicio)
  }            
}


  sendUpdate(){           
    
    this.setState({ 
       validacao_faixa_1: false,
       mensagem_aguarde: 'Aguarde, salvando os dados...',            
    }); 

    const datapost = {
      tipoTransporte: this.state.camptipoId,
      faixa_inicial: this.state.campfaixa_inicial,
      faixa_final: this.state.campfaixa_final,
      valor_km: valorDoublemask(this.state.campvalor_km),
      valor_tempo: valorDoublemask(this.state.campvalor_tempo),
      bandeira: valorDoublemask(this.state.campbandeira),
      receptivo: valorDoublemask(this.state.campreceptivo),
      bilingue: this.state.campbilingue,
      pedagio: 0.00
    }          

          console.log('logmatrizId - '+ localStorage.getItem('logmatrizId'));
          console.log('dataPost '+JSON.stringify(datapost, null, "    ")); 
          api.put('/matriz/update/'+localStorage.getItem('logmatrizId'), datapost)          
          .then(response=>{
            console.log('resultado '+JSON.stringify(response.data, null, "    ")); 
            
            if (response.data.success==true) {           
              
              
              this.setState({                   
                mensagem_usuario: 'Tarifa alterada com sucesso!',          
              });     
    
              this.envia_mensagemEdicaoClick();     
              
    
            }        
          }).catch(error=>{
            alert("Erro verificar log  ")
          })
  }  

  sendSave(){           
    
    this.setState({ 
       validacao_faixa_1: false,
       mensagem_aguarde: 'Aguarde, incluindo os dados...',            
    }); 

    const datapost = {
      tipoTransporte: this.state.camptipoId,
      faixa_inicial: this.state.campfaixa_inicial,
      faixa_final: this.state.campfaixa_final,

      valor_km: valorDoublemask(this.state.campvalor_km),
      valor_tempo: valorDoublemask(this.state.campvalor_tempo),
      bandeira: valorDoublemask(this.state.campbandeira),
      receptivo: valorDoublemask(this.state.campreceptivo),
      bilingue: this.state.campbilingue,
      pedagio: 0.00
    }          

          console.log('logmatrizId - '+ localStorage.getItem('logmatrizId'));
          console.log('dataPost '+JSON.stringify(datapost, null, "    ")); 
          api.post('/matriz/create', datapost)          
          .then(response=>{
            console.log('resultado '+JSON.stringify(response.data, null, "    ")); 
            
            if (response.data.success==true) {                                      
  

              this.setState({                   
                mensagem_usuario: 'Tarifa incluída com sucesso!',          
              });     
    
              this.envia_mensagemInclusaoClick();     
              
              
    
            }        
          }).catch(error=>{
            alert("Erro verificar log  ")
          })
  }  


  sendUpdateEspecial(){           
    
    this.setState({ 
       validacao_faixa_1: false,
       validacao_faixa_2: false,
       mensagem_aguarde: 'Aguarde, salvando os dados...',            
    }); 

    const datapost = {
      tipoTransporte: this.state.camptipoId,
      data_inicial: moment(this.state.campdata_inicial, "DD MM YYYY"),
      data_final: moment(this.state.campdata_final, "DD MM YYYY"),
      hora_inicial: this.state.camphora_inicial,
      hora_final: this.state.camphora_final,
      faixa_inicial: this.state.campfaixa_inicial,
      faixa_final: this.state.campfaixa_final,
      valor_km: valorDoublemask(this.state.campvalor_km),
      valor_tempo: valorDoublemask(this.state.campvalor_tempo),
      bandeira: valorDoublemask(this.state.campbandeira),
      receptivo: valorDoublemask(this.state.campreceptivo),
      bilingue: this.state.campbilingue,
      pedagio: 0.00
    }          

          console.log('logmatrizId - '+ localStorage.getItem('logmatrizId'));
          console.log('dataPost '+JSON.stringify(datapost, null, "    ")); 
          api.put('/matrizEspecial/update/'+localStorage.getItem('logmatrizId'), datapost)          
          .then(response=>{
            console.log('resultado '+JSON.stringify(response.data, null, "    ")); 
            
            if (response.data.success==true) {                                      
  

              this.setState({                   
                mensagem_usuario: 'Tarifa Especial alterada com sucesso!',          
              });     
    
              this.envia_mensagemEdicaoEspecialClick();     

//              this.handleCloseModalEspecialE();
    
            }        
          }).catch(error=>{
            alert("Erro verificar log  ")
          })
  }  

  sendSaveEspecial(){           
    
    this.setState({ 
       validacao_faixa_1: false,
       mensagem_aguarde: 'Aguarde, incluindo os dados...',            
    }); 

    const datapost = {
      tipoTransporte: this.state.camptipoId,
      data_inicial: moment(this.state.campdata_inicial, "DD MM YYYY"),
      data_final: moment(this.state.campdata_final, "DD MM YYYY"),
      hora_inicial: moment(this.state.camphora_inicial, "HH MM"),
      hora_inicial: this.state.camphora_inicial,
      hora_final: this.state.camphora_final,
      faixa_inicial: this.state.campfaixa_inicial,
      faixa_final: this.state.campfaixa_final,
      valor_km: valorDoublemask(this.state.campvalor_km),
      valor_tempo: valorDoublemask(this.state.campvalor_tempo),
      bandeira: valorDoublemask(this.state.campbandeira),
      receptivo: valorDoublemask(this.state.campreceptivo),
      bilingue: this.state.campbilingue,
      pedagio: 0.00
    }          

          console.log('logmatrizId - '+ localStorage.getItem('logmatrizId'));
          console.log('dataPost '+JSON.stringify(datapost, null, "    ")); 
          api.post('/matrizEspecial/create', datapost)          
          .then(response=>{
            console.log('resultado '+JSON.stringify(response.data, null, "    ")); 
            
            if (response.data.success==true) {                                      
  

              this.setState({                   
                mensagem_usuario: 'Tarifa Especial incluída com sucesso!',          
              });     
    
              this.envia_mensagemInclusaoEspecialClick();     

              //this.handleCloseModalEspecialI();
    
            }        
          }).catch(error=>{
            alert("Erro verificar log  ")
          })
  }  

  loadFillData(){  
  
    return this.state.listTipoTransporte.map((data)=>{          
      return(
         <MenuItem value={data.descricao}>{data.descricao}</MenuItem>      
      )
    })
  }
  verifica_botao(inicio) {
    const { validate } = this.state   
    //console.log('validate - '+JSON.stringify(this.state, null, "    ")); 

     if (inicio == 1) {
  
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
          </Box>           
      );   
       
      } else {

        if (this.state.validacao_faixa_1 == true && this.state.validacao_faixa_2 == true 
          && this.state.validacao_bandeira == true && this.state.validacao_bilingue == true 
          && this.state.validacao_receptivo == true && this.state.validacao_tipo == true 
          && this.state.validacao_valorkm == true && this.state.validacao_valortempo == true) { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendUpdate()}>
                      <div className="d-flex justify-content-center">
                      <label> Salvar Alterações </label>
                      </div>     
                </Box>           
            );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                    </div>     
              </Box>           
          );   
        }   

      } 
} 
verifica_botao_inclusao(inicio) {
  const { validate } = this.state   
  //console.log('validate - '+JSON.stringify(this.state, null, "    ")); 

   if (inicio == 1) {

    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
              <div className="d-flex justify-content-center">
              <label> Incluir </label>
              </div>     
        </Box>           
    );   
     
    } else {

      if (this.state.validacao_faixa_1 == true && this.state.validacao_faixa_2 == true 
        && this.state.validacao_bandeira == true && this.state.validacao_bilingue == true 
        && this.state.validacao_receptivo == true && this.state.validacao_tipo == true 
        && this.state.validacao_valorkm == true && this.state.validacao_valortempo == true) { 
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSave()}>
                    <div className="d-flex justify-content-center">
                    <label> Incluir </label>
                    </div>     
              </Box>           
          );   
      } else {
        return (
      
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
      }   

    } 
} 


verifica_botao_especial_I(inicio) {
  const { validate } = this.state   
  //console.log('validate - '+JSON.stringify(this.state, null, "    ")); 

   if (inicio == 1) {

    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
              <div className="d-flex justify-content-center">
              <label> Incluir </label>
              </div>     
        </Box>           
    );   
     
    } else {

      if (this.state.validacao_faixa_1 == true && this.state.validacao_faixa_2 == true 
        && this.state.validacao_bandeira == true && this.state.validacao_bilingue == true 
        && this.state.validacao_receptivo == true && this.state.validacao_tipo == true 
        && this.state.validacao_valorkm == true && this.state.validacao_valortempo == true
        && this.state.validacao_datainicio == true && this.state.validacao_datafim == true
        && this.state.validacao_hora_inicial == true && this.state.validacao_hora_final == true ) { 
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSaveEspecial()}>
                    <div className="d-flex justify-content-center">
                    <label> Incluir </label>
                    </div>     
              </Box>           
          );   
      } else {
        return (
      
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
      }   

    } 
} 
verifica_botao_especial_E(inicio) {
  const { validate } = this.state   
  //console.log('validate - '+JSON.stringify(this.state, null, "    ")); 

   if (inicio == 1) {

    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
              <div className="d-flex justify-content-center">
              <label> Salvar Alterações </label>
              </div>     
        </Box>           
    );   
     
    } else {

      if (this.state.validacao_faixa_1 == true && this.state.validacao_faixa_2 == true 
        && this.state.validacao_bandeira == true && this.state.validacao_bilingue == true 
        && this.state.validacao_receptivo == true && this.state.validacao_tipo == true 
        && this.state.validacao_valorkm == true && this.state.validacao_valortempo == true 
        && this.state.validacao_datainicio == true && this.state.validacao_datafim == true
        && this.state.validacao_hora_inicial == true && this.state.validacao_hora_final == true ) { 
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendUpdateEspecial()}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                    </div>     
              </Box>           
          );   
      } else {
        return (
      
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
      }   

    } 
} 

  load_tipotransporte() {
    // console.log('tipo '+this.state.camptipoTransporteId);
  
      api.get(`/tipoTransporte/get/${this.state.camptipoTransporteId}`)
      .then(res=>{
          if (res.data.success) {
            const data = res.data.data[0]              
           
            this.setState({          
              campnometransporte: data.descricao
            })          
          
          }
          else {
            alert("Erro de conexão com o banco de dados")
          }
        })
        .catch(error=>{
          alert("Error server "+error)
        })  
  
    }
  handleDateChange(date) {
    //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
    this.setState({ campdata_evento: date });
  }

  busca_veiculo(veiculo){   
 
    api.get(`/tipoTransporte/get/${veiculo}`)
     .then(res=>{  
    //  console.log(JSON.stringify(res.data.data[0].descricao, null, "    ")); 
      let tipo = res.data.data[0].descricao
         return (
              tipo 
         );       
  
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }

  loadMatriz(){
  
   api.get("/matriz/list")
    .then(res=>{  
      if (res.data.success) {
        const data = res.data.data        
        this.setState({listaMatriz:data})
        //console.log(JSON.stringify(data, null, "    ")); 
        //console.log(JSON.stringify(this.state.listTranslados, null, "    ")); 
      }
    })
    .catch(error=>{
      alert("Error lista matriz "+error)
    })
  }

  loadMatrizEspecial(){
  
    api.get("/matrizEspecial/list")
     .then(res=>{  
       if (res.data.success) {
         const data = res.data.data        
         this.setState({listaMatrizEspeciais:data})
         //console.log(JSON.stringify(data, null, "    ")); 
         //console.log(JSON.stringify(this.state.listTranslados, null, "    ")); 
       }
     })
     .catch(error=>{
       alert("Error lista especial "+error)
     })
   }
 
 
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  
  voltarlistaClick = () => {
  
   // this.props.history.push(`/listaeventocliente/${localStorage.getItem('logid')}`); 
  
  }

  opcao_tabChange = (event, newValue) => {   
    this.setState({        
        value: newValue 
    });    
  };
 
  render()
  {
    return (
      <div>    
             <Menu_administrador />  
             <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo"> Tarifas </div>
              </div>      
            </div>
      <div className="container-fluid margem_left">                                         
            <br/>      
            <TabContext value={this.state.value} className="tabs_padrao">
            <AppBar position="static" color="transparent">
              <TabList onChange={this.opcao_tabChange} aria-label="simple tabs example">           
                <Tab label="Tarifa" value="1" className="tabs_titulo_lista"/>
                <Tab label="Tarifa Especial" value="2" className="tabs_titulo_lista_2"/>            
              </TabList>
            </AppBar>        
          <TabPanel value="1" className="tirar_espaco">         
          <div>
                    <MaterialTable          
                        title=""
                        style={ {width: "96%" }}     
                        columns={[                                                    
                          { title: '', field: '#', width: "55px", minWidth: '55px', maxWidth: '55px', },
                          { title: 'Transporte', field: 'tipoTransporte', width: '250px', minWidth: '250px', maxWidth: '250px',
                          render: rowData => rowData.tipoTransporte.substr(0,20)  },                                     
                          { title: 'Km Inicial', field: 'faixa_inicial', width: '90px', minWidth: '90px', maxWidth: '90px',  align: 'right',
                          render: rowData => rowData.faixa_inicial},
                          { title: 'Km Final', field: 'faixa_final', width: '90px', minWidth: '90px', maxWidth: '90px', align: 'right',
                          render: rowData => rowData.faixa_final}, 
                          { title: 'KM (R$)', field: 'valor_km', width: '90px', minWidth: '90px', maxWidth: '90px', align: 'right' ,
                          render: rowData =>  valorMask(rowData.valor_km) },                        
                          { title: 'Tempo (R$)', field: 'valor_tempo', width: '100px', minWidth: '100px', maxWidth: '100px', align: 'right',
                          render: rowData =>  valorMask(rowData.valor_tempo) },                          
                          { title: 'Bandeirada (R$)', field: 'bandeira', width: '130px', minWidth: '130px', maxWidth: '130px', align: 'right',
                          render: rowData =>  valorMask(rowData.bandeira) },                          
                          { title: 'Receptivo (R$)', field: 'receptivo', width: '150px', minWidth: '150px', maxWidth: '150px', align: 'right',
                          render: rowData =>  valorMask(rowData.receptivo) }, 
                          { title: 'Bilingue (%)', field: 'bilingue', width: '120px', minWidth: '120px', maxWidth: '100px', align: 'center' },                                            
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },              
                        ]}
                        data={this.state.listaMatriz}     
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
                            searchPlaceholder: 'buscar tarifario',        
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
                            actions: 'Ações',
                          },
                        }}        
                        options={{
                          rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                          searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                          //paginationPosition: 'bottom',  
                          searchFieldAlignment: 'left', 
                          exportAllData: true,
                          exportFileName: 'Rel_adm_tarifas',
                          search: true,     
                          searchFieldVariant: 'outlined', 
                          toolbarButtonAlignment: 'right',           
                          paging: false,    
                          maxBodyHeight: '60vh',
                          minBodyHeight: '60vh',   
                           padding: 'dense',   
                           overflowY: 'scroll',
                          // tableLayout: 'fixed',         
                          exportButton: { pdf: true },          
                          actionsColumnIndex: 9,
                         // pageSize: 7,
                          pageSizeOptions: [0],    
                        }}                        
                        actions={[
                          {             
                            icon: 'edit',
                            onClick: (evt, data) => this.handleOpenModal(data)
                          },
                          {
                            icon: 'delete',                                                             
                            tooltip: 'Deleta Tarifa',          
                            onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                          }
                          /*,
                          {
                            icon: 'add',                                                             
                            tooltip: 'Adicionar Tarifas',
                            isFreeAction: true,
                            onClick: (event) => this.handleOpenModalIncluir()
                           //onClick: (event) => this.sendteste()
                          } */
                        ]}
                        /*editable={{                                              
                          onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                const dataDelete = [...this.state.campId];
                                const index = oldData.id;   
                                dataDelete.splice(index, 1);                              
                                resolve()                                
                                this.sendDelete(index)
                              }, 1000)
                            }),
                        }} */
                      />      
             </div>      
             <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize',  outline: 'none'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalIncluir()}>
                            <AddIcon/> <div className="botao_incluir"> Adicionar Tarifas  </div>
                        </Fab>
                      </div>  

            </TabPanel>
            <TabPanel value="2" className="tirar_espaco">            
            <div>
                    <MaterialTable          
                        title=""
                        style={ {width: "96%" }}     
                        columns={[
                          { title: '', field: '#', width: "55px", minWidth: '55px', maxWidth: '55px', },
                          { title: 'Transporte', field: 'tipoTransporte', width: '150px', minWidth: '150px', maxWidth: '150px', 
                          render: rowData => rowData.tipoTransporte.substr(0,20) },                                     
                          { title: 'Km Inicial', field: 'faixa_inicial', width: '88px', minWidth: '88px', maxWidth: '88px', align: 'right',
                          render: rowData => rowData.faixa_inicial},
                          { title: 'Km Final', field: 'faixa_final', width: '88px', minWidth: '88px', maxWidth: '88px', align: 'right' ,
                          render: rowData => rowData.faixa_final}, 
                          { title: 'Dt Inicial', field: 'data_inicial', width: '100px', minWidth: '100px', maxWidth: '100px', align: 'center',  
                          render: rowData => dateFormat(rowData.data_inicial, "UTC:dd/mm/yyyy") },
                          { title: 'Dt Final', field: 'data_final', width: '104px', minWidth: '104px', maxWidth: '104px', align: 'center',
                          render: rowData => dateFormat(rowData.data_final, "UTC:dd/mm/yyyy") },
                          { title: 'Hr Inicial', field: 'hora_inicial', width: '85px', minWidth: '85px', maxWidth: '85px' ,
                          render: rowData => rowData.hora_inicial.substring(0,5)},
                          { title: 'Hr Final', field: 'hora_final', width: '75px', minWidth: '75px', maxWidth: '75px' ,
                          render: rowData => rowData.hora_final.substring(0,5) },                          
                          { title: 'Km (R$)', field: 'valor_km', width: '80px', minWidth: '80px', maxWidth: '80px', align: 'right', 
                          render: rowData =>  valorMask(rowData.valor_km) },                        
                          { title: 'Tempo (R$)', field: 'valor_tempo', width: '98px', minWidth: '98px', maxWidth: '98px', align: 'right' ,
                          render: rowData =>  valorMask(rowData.valor_tempo) },                          
                          { title: 'Bandeirada (R$)', field: 'bandeira', width: '123px', minWidth: '123px', maxWidth: '123px', align: 'right' ,
                          render: rowData =>  valorMask(rowData.bandeira) },                          
                          { title: 'Receptivo (R$)', field: 'receptivo', width: '118px', minWidth: '118px', maxWidth: '118px', align: 'right' ,
                          render: rowData =>  valorMask(rowData.receptivo) }, 
                          { title: 'Bilingue (%)', field: 'bilingue', width: '108px', minWidth: '108px', maxWidth: '108px', align: 'center' },                                                  
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },        
                        ]}
                        data={this.state.listaMatrizEspeciais}     
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
                            searchPlaceholder: 'buscar tarifario',        
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
                            actions: 'Ações',
                          },
                        }}        
                        options={{
                          rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                          searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px", color: "#0F074E"  },
                          //paginationPosition: 'bottom',  
                          searchFieldAlignment: 'left', 
                          exportAllData: true,
                          exportFileName: 'Rel_adm_tarifas_especial',
                          search: true,     
                          searchFieldVariant: 'outlined', 
                          toolbarButtonAlignment: 'right',           
                          paging: false,       
                          maxBodyHeight: '60vh',
                          minBodyHeight: '60vh',   
                          padding: 'dense',   
                          overflowY: 'scroll',
                        //  tableLayout: 'fixed',
                          /*exportButton: true, */            
                          exportButton: { pdf: true },          
                          actionsColumnIndex: 13,
                      //    headerStyle: { position: 'sticky', top: 0 },      
                      //    cellStyle:{ position: 'fixed' },
                         // pageSize: 7,
                          pageSizeOptions: [0],    
                        }}
                        actions={[
                          {             
                            icon: 'edit',
                            onClick: (evt, data) => this.handleOpenModalEspecialE(data)
                          },
                          {
                            icon: 'delete',                                                             
                            tooltip: 'Deleta Tarifa',          
                            onClick: (evt, data) => this.handleOpenModalDeleteEspecial(data)                                     
                          }
                          /*,
                          {
                            icon: 'add',                                                             
                            tooltip: 'Adicionar Tarifas',
                            isFreeAction: true,
                            onClick: (event) => this.handleOpenModalEspecialI()
                           //onClick: (event) => this.sendteste()
                          } */
                        ]}
                       /* editable={{                          
                          onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                const dataDelete = [...this.state.campId];
                                const index = oldData.id;   
                                dataDelete.splice(index, 1);                              
                                resolve()                                
                                this.sendDeleteEspecial(index)
                              }, 1000)
                            }),
                        }} */
                      />      
             </div>      
             <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize',  outline: 'none'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalEspecialI()}>
                            <AddIcon/> <div className="botao_incluir"> Adicionar Tarifas Especial </div>
                        </Fab>
                      </div>  
            </TabPanel>

           </TabContext>          

      <ReactModal 
        isOpen={this.state.showModal}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Editar Tarifa             
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()} className="botao_close_modal_editar_tarifarios">
              <CloseOutlinedIcon />
            </IconButton></div>               
            
            <div className="container_modal_alterado">
               <div className="d-flex justify-content font_modal_padrao">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                      <div class="p-2">  
                      <FormControl className="select_matriz_tipo" variant="outlined">
                        <InputLabel className="label_select_matriz_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_matriz_tipo"
                          error={this.state.erro_tipo} 
                          helperText={this.state.mensagem_tipoId}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.camptipoId}
                          onFocus={this.verificaTipo_veiculo}
                          //onClick={this.verificaTipo_veiculo}
                          onChange={ (e) => {
                            this.tipoChange(e)
                          }}   
                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_tipo? <CheckIcon />: ''}
                            </InputAdornment>
                          }     
                          label="Tipo Transporte"
                          labelWidth={200}
                        >
                          {this.loadFillData()}                    
                        </Select>
                      </FormControl>                                                                    
                      </div>              
                      <div class="p-2">               
                          <div class="d-flex justify-content-start">
                              <div> 
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Km Inicial</InputLabel>
                                  <OutlinedInput
                                   className="input_matriz_direita"
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_faixa_2} 
                                    helperText={this.state.mensagem_faixa_inicial}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campfaixa_inicial}                    
                                    onFocus={this.verificafaixa_inicial}
                                    onKeyUp={this.verificafaixa_inicial}
                                    onChange={ (e) => {
                                      this.faixa_inicialchange(e)                                         
                                    }}             
                                    inputProps={{
                                      maxLength: 10,
                                    }} 
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_faixa_1? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }                                             
                                    labelWidth={100}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.faixa_inicialState}>
                                      {this.state.mensagem_faixa_inicial}
                                  </FormFeedback>                                                                   
                              </div> 
                              
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Km Final</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"                                    
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_faixa_2} 
                                    helperText={this.state.mensagem_faixa_final}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campfaixa_final}                    
                                    onFocus={this.verificafaixa_final}
                                    onKeyUp={this.verificafaixa_final}
                                    onChange={ (e) => {
                                      this.faixa_finalchange(e)
                                    }}          
                                    inputProps={{
                                      maxLength: 10,
                                    }}       
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_faixa_2? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }                             
                                    labelWidth={100}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.faixa_finalState}>
                                      {this.state.mensagem_faixa_final}
                                  </FormFeedback>                                   
                              </div>                        
                          </div>
                      </div> 
                      <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>                                                
                                  <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Valor Km</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_direita"
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_valorkm} 
                                    helperText={this.state.mensagem_valor_km}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campvalor_km}                                 
                                    onFocus={this.verificavalor_km}
                                    onKeyUp={this.verificavalor_km}
                                    onChange={(e) => {
                                      this.valor_kmchange(e)
                                    }}    
                                    inputProps={{
                                      maxLength: 8,
                                    }} 
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_valorkm? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={80}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.valor_kmState}>
                                      {this.state.mensagem_valor_km}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Valor Tempo</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_valortempo} 
                                    helperText={this.state.mensagem_valor_tempo}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'                           
                                    value={this.state.campvalor_tempo}                                  
                                    onFocus={this.verificavalor_tempo}
                                    onKeyUp={this.verificavalor_tempo}
                                    onChange={ (e) => {
                                      this.valor_tempochange(e)                                                
                                    }}            
                                    inputProps={{
                                      maxLength: 8,
                                    }}     
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_valortempo? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={110}
                                  />
                                </FormControl>                       
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.valor_tempoState}>
                                  {this.state.mensagem_valor_tempo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>      
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Valor da Bandeirada</InputLabel>
                                  <OutlinedInput
                                   className="input_matriz_direita"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bandeira} 
                                    helperText={this.state.mensagem_bandeira}   
                                    placeholder=""                            
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbandeira}                                  
                                    onFocus={this.verificabandeira}
                                    onKeyUp={this.verificabandeira}
                                    onChange={(e) => {
                                      this.bandeirachange(e)
                                    }}                                                                          
                                    inputProps={{
                                      maxLength: 8,
                                    }}        
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_bandeira? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={160}
                                  />
                                </FormControl>                                                                          
                                  <FormFeedback 
                                  invalid={this.state.validate.bandeiraState}>
                                      {this.state.mensagem_bandeira}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Valor Receptivo</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_receptivo} 
                                    helperText={this.state.mensagem_receptivo}   
                                    placeholder=""                                                      
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campreceptivo}                                   
                                    onFocus={this.verificareceptivo}
                                    onKeyUp={this.verificareceptivo}
                                    onChange={ (e) => {
                                      this.receptivochange(e)                                                
                                    }}            
                                    inputProps={{
                                      maxLength: 8,
                                    }}          
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_receptivo? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={140}
                                  />
                                </FormControl>                                 
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.receptivoState}>
                                  {this.state.mensagem_receptivo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>  
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">bilingue</InputLabel>
                                  <OutlinedInput                               
                                    className="input_matriz_direita"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bilingue} 
                                    helperText={this.state.mensagem_bilingue}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbilingue}                                   
                                    onFocus={this.verificabilingue}
                                    onKeyUp={this.verificabilingue}
                                    onChange={(e) => {
                                      this.bilinguechange(e)
                                      this.validateBilingueChange(e)
                                    }}                                                                          
                                    inputProps={{
                                      maxLength: 2,
                                    }}      
                                    startAdornment={ 
                                      <InputAdornment position="start">
                                           {this.state.validacao_bilingue? <CheckIcon />: ''}
                                      </InputAdornment>
                                      }
                                    endAdornment={
                                      <InputAdornment position="end">%</InputAdornment>
                                      
                                    }    
                                    labelWidth={120}
                                  />
                                </FormControl>                                                   
                                  <FormFeedback 
                                  invalid={this.state.validate.bilingueState}>
                                      {this.state.mensagem_bilingue}
                                  </FormFeedback>     
                              </div>                    
                      </div>    
                    </div>  
                    </div>                          
                   {this.verifica_botao(this.state.inicio)}     
                </div>
              </div>        
            </div>
     </ReactModal>     

      <ReactModal 
        isOpen={this.state.showModalInclusao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Incluir Tarifa
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalIncluir()} className="botao_close_modal_tarifarios">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_modal_alterado">
            <div className="d-flex justify-content font_modal_padrao">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_modal">
                      <div class="p-2"> 
                      <FormControl className="select_matriz_tipo" variant="outlined">
                        <InputLabel className="select_matriz_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_matriz_tipo"
                          error={this.state.erro_tipo} 
                          helperText={this.state.mensagem_tipoId}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.camptipoId}
                          onFocus={this.verificaTipo_veiculo}
                          //onClick={this.verificaTipo_veiculo}
                          onChange={ (e) => {
                            this.tipoChange(e)
                          }}   

                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_tipo? <CheckIcon />: ''}
                            </InputAdornment>
                          }     
                          label="Tipo Transporte"
                        >
                          {this.loadFillData()}                    
                        </Select>
                      </FormControl>                                                                    
                      </div>              
                      <div class="p-2">               
                          <div class="d-flex justify-content-start">
                              <div> 
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Km Inicial</InputLabel>
                                  <OutlinedInput
                                   className="input_matriz_direita"
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_faixa_2} 
                                    helperText={this.state.mensagem_faixa_inicial}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campfaixa_inicial}                    
                                    onFocus={this.verificafaixa_inicial}
                                    onKeyUp={this.verificafaixa_inicial}
                                    onChange={ (e) => {
                                      this.faixa_inicialchange(e)                                         
                                    }}             
                                    inputProps={{
                                      maxLength: 10,
                                    }} 
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_faixa_1? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }                                             
                                    labelWidth={100}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.faixa_inicialState}>
                                      {this.state.mensagem_faixa_inicial}
                                  </FormFeedback>                                                                   
                              </div> 
                              
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Km Final</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"                                    
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_faixa_2} 
                                    helperText={this.state.mensagem_faixa_final}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campfaixa_final}                    
                                    onFocus={this.verificafaixa_final}
                                    onKeyUp={this.verificafaixa_final}
                                    onChange={ (e) => {
                                      this.faixa_finalchange(e)
                                    }}          
                                    inputProps={{
                                      maxLength: 10,
                                    }}       
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_faixa_2? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }                             
                                    labelWidth={100}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.faixa_finalState}>
                                      {this.state.mensagem_faixa_final}
                                  </FormFeedback>                                   
                              </div>                        
                          </div>
                      </div> 
                      <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>                                                
                                  <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Valor Km</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_direita"
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_valorkm} 
                                    helperText={this.state.mensagem_valor_km}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campvalor_km}                                 
                                    onFocus={this.verificavalor_km}
                                    onKeyUp={this.verificavalor_km}
                                    onChange={(e) => {
                                      this.valor_kmchange(e)
                                    }}    
                                   inputProps={{
                                      maxLength: 8,
                                    }} 
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_valorkm? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={80}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.valor_kmState}>
                                      {this.state.mensagem_valor_km}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Valor Tempo</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_valortempo} 
                                    helperText={this.state.mensagem_valor_tempo}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'                           
                                    value={this.state.campvalor_tempo}                                  
                                    onFocus={this.verificavalor_tempo}
                                    onKeyUp={this.verificavalor_tempo}
                                    onChange={ (e) => {
                                      this.valor_tempochange(e)                                                
                                    }}            
                                    inputProps={{
                                      maxLength: 8,
                                    }} 
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_valortempo? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={110}
                                  />
                                </FormControl>                       
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.valor_tempoState}>
                                  {this.state.mensagem_valor_tempo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>      
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Valor da Bandeirada</InputLabel>
                                  <OutlinedInput
                                   className="input_matriz_direita"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bandeira} 
                                    helperText={this.state.mensagem_bandeira}   
                                    placeholder=""                            
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbandeira}                                  
                                    onFocus={this.verificabandeira}
                                    onKeyUp={this.verificabandeira}
                                    onChange={(e) => {
                                      this.bandeirachange(e)
                                    }}                                                                          
                                    inputProps={{
                                      maxLength: 8,
                                    }} 
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_bandeira? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={160}
                                  />
                                </FormControl>                                                                          
                                  <FormFeedback 
                                  invalid={this.state.validate.bandeiraState}>
                                      {this.state.mensagem_bandeira}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Valor Receptivo</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_receptivo} 
                                    helperText={this.state.mensagem_receptivo}   
                                    placeholder=""                                                      
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campreceptivo}                                   
                                    onFocus={this.verificareceptivo}
                                    onKeyUp={this.verificareceptivo}
                                    onChange={ (e) => {
                                      this.receptivochange(e)                                                
                                    }}            
                                    inputProps={{
                                      maxLength: 8,
                                    }}          
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_receptivo? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={140}
                                  />
                                </FormControl>                                 
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.receptivoState}>
                                  {this.state.mensagem_receptivo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>  
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Bilingue</InputLabel>
                                  <OutlinedInput                                   
                                    className="input_matriz_direita"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bilingue} 
                                    helperText={this.state.mensagem_bilingue}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbilingue}                                   
                                    onFocus={this.verificabilingue}
                                    onKeyUp={this.verificabilingue}
                                    onChange={(e) => {
                                      this.bilinguechange(e)                                    
                                    }}                                                                          
                                    inputProps={{
                                      maxLength: 2,
                                    }}                                     
                                    startAdornment={                                                                            
                                      <InputAdornment position="start">
                                           {this.state.validacao_bilingue? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }         
                                    endAdornment={                                                                            
                                      <InputAdornment position="end">
                                      %
                                      </InputAdornment>
                                     
                                    }    
                                    labelWidth={120}
                                  />
                                </FormControl>                                                   
                                  <FormFeedback 
                                  invalid={this.state.validate.bilingueState}>
                                      {this.state.mensagem_bilingue}
                                  </FormFeedback>     
                              </div>                    
                      </div>    
                    </div>  
                    </div>                     
                   {this.verifica_botao_inclusao(this.state.inicio)}     
                </div>
              </div>        
            </div>
     </ReactModal>    

     <ReactModal 
        isOpen={this.state.showModalEspecialE}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Editar Tarifa Especial            
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalEspecialE()} className="botao_close_modal_tarifarios_esp">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto font_modal">
                      <div class="p-2"> 
                      <FormControl className="select_matriz_tipo" variant="outlined">
                        <InputLabel className="select_matriz_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_matriz_tipo"
                          error={this.state.erro_tipo} 
                          helperText={this.state.mensagem_tipoId}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.camptipoId}
                          onFocus={this.verificaTipo_veiculo}
                          //onClick={this.verificaTipo_veiculo}
                          onChange={ (e) => {
                            this.tipoChange(e)
                          }}   
                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_tipo? <CheckIcon />: ''}
                            </InputAdornment>
                          }     
                          label="Tipo Transporte"
                        >
                          {this.loadFillData()}                    
                        </Select>
                      </FormControl>                                                                    
                      </div>              
                      <div class="p-2">               
                          <div class="d-flex justify-content-start">
                              <div> 
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Km Inicial </InputLabel>
                                  <OutlinedInput
                                   className="input_matriz_direita"
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_faixa_2} 
                                    helperText={this.state.mensagem_faixa_inicial}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campfaixa_inicial}                    
                                    onFocus={this.verificafaixa_inicial}
                                    onKeyUp={this.verificafaixa_inicial}
                                    onChange={ (e) => {
                                      this.faixa_inicialchange(e)                                         
                                    }}             
                                    inputProps={{
                                      maxLength: 10,
                                    }} 
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_faixa_1? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }                                             
                                    labelWidth={100}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.faixa_inicialState}>
                                      {this.state.mensagem_faixa_inicial}
                                  </FormFeedback>                                                                   
                              </div> 
                              
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Km Final </InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"                                    
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_faixa_2} 
                                    helperText={this.state.mensagem_faixa_final}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campfaixa_final}                    
                                    onFocus={this.verificafaixa_final}
                                    onKeyUp={this.verificafaixa_final}
                                    onChange={ (e) => {
                                      this.faixa_finalchange(e)
                                    }}          
                                    inputProps={{
                                      maxLength: 10,
                                    }}       
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_faixa_2? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }                             
                                    labelWidth={100}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.faixa_finalState}>
                                      {this.state.mensagem_faixa_final}
                                  </FormFeedback>                                   
                              </div>                        
                          </div>
                      </div> 
                      <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>                                                
                                  <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Valor Km </InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_direita"
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_valorkm} 
                                    helperText={this.state.mensagem_valor_km}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campvalor_km}                                 
                                    onFocus={this.verificavalor_km}
                                    onKeyUp={this.verificavalor_km}
                                    onChange={(e) => {
                                      this.valor_kmchange(e)
                                    }}    
                                    inputProps={{
                                      maxLength: 8,
                                    }} 
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_valorkm? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={80}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.valor_kmState}>
                                      {this.state.mensagem_valor_km}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Valor Tempo</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_valortempo} 
                                    helperText={this.state.mensagem_valor_tempo}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'                           
                                    value={this.state.campvalor_tempo}                                  
                                    onFocus={this.verificavalor_tempo}
                                    onKeyUp={this.verificavalor_tempo}
                                    onChange={ (e) => {
                                      this.valor_tempochange(e)                                                
                                    }}            
                                    inputProps={{
                                      maxLength: 8,
                                    }}        
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_valortempo? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={110}
                                  />
                                </FormControl>                       
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.valor_tempoState}>
                                  {this.state.mensagem_valor_tempo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>      
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Valor da Bandeirada</InputLabel>
                                  <OutlinedInput
                                   className="input_matriz_direita"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bandeira} 
                                    helperText={this.state.mensagem_bandeira}   
                                    placeholder=""                            
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbandeira}                                  
                                    onFocus={this.verificabandeira}
                                    onKeyUp={this.verificabandeira}
                                    onChange={(e) => {
                                      this.bandeirachange(e)
                                    }}                                                                          
                                    inputProps={{
                                      maxLength: 8,
                                    }}        
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_bandeira? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={160}
                                  />
                                </FormControl>                                                                          
                                  <FormFeedback 
                                  invalid={this.state.validate.bandeiraState}>
                                      {this.state.mensagem_bandeira}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Valor Receptivo</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_receptivo} 
                                    helperText={this.state.mensagem_receptivo}   
                                    placeholder=""                                                      
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campreceptivo}                                   
                                    onFocus={this.verificareceptivo}
                                    onKeyUp={this.verificareceptivo}
                                    onChange={ (e) => {
                                      this.receptivochange(e)                                                
                                    }}            
                                    inputProps={{
                                      maxLength: 8,
                                    }}    
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_receptivo? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={140}
                                  />
                                </FormControl>                                 
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.receptivoState}>
                                  {this.state.mensagem_receptivo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>  
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Bilingue</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_direita"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bilingue} 
                                    helperText={this.state.mensagem_bilingue}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbilingue}                                   
                                    onFocus={this.verificabilingue}
                                    onKeyUp={this.verificabilingue}
                                    onChange={(e) => {
                                      this.bilinguechange(e)
                                      this.validateBilingueChange(e)
                                    }}                                                                          
                                    inputProps={{
                                      maxLength: 2,
                                    }}                                    
                                    startAdornment={                                                                            
                                      <InputAdornment position="start">
                                           {this.state.validacao_bilingue? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }         
                                    endAdornment={                                                                            
                                      <InputAdornment position="end">
                                      %
                                      </InputAdornment>
                                     
                                    }    
                                    labelWidth={120}
                                  />
                                </FormControl>                                                   
                                  <FormFeedback 
                                  invalid={this.state.validate.bilingueState}>
                                      {this.state.mensagem_bilingue}
                                  </FormFeedback>     
                              </div>                                                  
                      </div>    
                    </div>  
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                    <InputLabel className="label_matriz_esquerda" htmlFor="filled-adornment-password">Data Inicial</InputLabel>
                                    <OutlinedInput         
                                        autoComplete="off"                       
                                        error={this.state.erro_datainicio}
                                        helperText={this.state.mensagem_data_inicio}
                                        className="input_matriz_esquerda"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campdata_inicial}
                                        onBlur={this.verificaData_inicio}
                                        onKeyUp={this.verificaData_inicio}
                                        onChange={ (e) => {
                                          this.data_iniciochange(e)                                                             
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_datainicio? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_datainicio}>
                                        {this.state.mensagem_data_inicio}
                                  </FormHelperText>
                                </FormControl>  

                              </div>
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                    <InputLabel className="label_matriz_esquerda" htmlFor="filled-adornment-password">Data Final</InputLabel>
                                    <OutlinedInput         
                                        autoComplete="off"                       
                                        error={this.state.erro_datafim}
                                        helperText={this.state.mensagem_data_fim}
                                        className="input_matriz_esquerda"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campdata_final}
                                        onBlur={this.verificaData_fim}
                                        onKeyUp={this.verificaData_fim}
                                        onChange={ (e) => {
                                          this.data_finalchange(e)                                                                 
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_datafim? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_datafim}>
                                        {this.state.mensagem_data_fim}
                                  </FormHelperText>
                                </FormControl>  

                              </div>
                        </div>
                    </div>          

                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                    <InputLabel className="label_matriz_direita" htmlFor="filled-adornment-password">Hora Inicial</InputLabel>
                                    <OutlinedInput       
                                        type="time"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_inicial}
                                        helperText={this.state.mensagem_data_inicio}
                                        className="input_matriz_direita"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_inicial}
                                        onBlur={this.verificahora_inicial}
                                        onKeyUp={this.verificahora_inicial}
                                        onChange={ (e) => {
                                          this.hora_iniciochange(e)                                                                 
                                        }}       
                                        InputLabelProps={{
                                          shrink: true,
                                        }}                             
                                        inputProps={{
                                          maxLength: 4,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_hora_inicial? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_hora_inicial}>
                                        {this.state.mensagem_data_inicio}
                                  </FormHelperText>
                                </FormControl>  
                              </div>    
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                    <InputLabel className="label_matriz_esquerda" htmlFor="filled-adornment-password">Hora Final</InputLabel>
                                    <OutlinedInput         
                                        type="time"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_final}
                                        helperText={this.state.mensagem_data_inicio}
                                        className="input_matriz_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_final}
                                        onBlur={this.verificahora_final}
                                        onKeyUp={this.verificahora_final}
                                        onChange={ (e) => {
                                          this.hora_finalchange(e)                                                                 
                                        }}                                    
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          maxLength: 4,
                                         
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_hora_final? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_hora_final}>
                                        {this.state.mensagem_data_inicio}
                                  </FormHelperText>
                                </FormControl>  
                              </div>                
                      </div>    
                    </div> 
                    </div>                       
                   {this.verifica_botao_especial_E(this.state.inicio)}     
                </div>
              </div>        
            </div>
     </ReactModal>     

     <ReactModal 
        isOpen={this.state.showModalEspecialI}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Incluir Tarifa Especial         
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalEspecialI()} className="botao_close_modal_tarifarios_esp">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto font_modal">
                      <div class="p-2"> 
                      <FormControl className="select_matriz_tipo" variant="outlined">
                        <InputLabel className="select_matriz_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                         className="text_select_matriz_tipo"                         
                          error={this.state.erro_tipo} 
                          helperText={this.state.mensagem_tipoId}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.camptipoId}
                          onFocus={this.verificaTipo_veiculo}
                          //onClick={this.verificaTipo_veiculo}
                          onChange={ (e) => {
                            this.tipoChange(e)
                          }}   
                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_tipo? <CheckIcon />: ''}
                            </InputAdornment>
                          }     
                          label="Tipo Transporte"
                        >
                          {this.loadFillData()}                    
                        </Select>
                      </FormControl>                                                                    
                      </div>              
                      <div class="p-2">               
                          <div class="d-flex justify-content-start">
                              <div> 
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Faixa Inicial </InputLabel>
                                  <OutlinedInput
                                   className="input_matriz_direita"
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_faixa_2} 
                                    helperText={this.state.mensagem_faixa_inicial}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campfaixa_inicial}                    
                                    onFocus={this.verificafaixa_inicial}
                                    onKeyUp={this.verificafaixa_inicial}
                                    onChange={ (e) => {
                                      this.faixa_inicialchange(e)                                         
                                    }}             
                                    inputProps={{
                                      maxLength: 10,
                                    }} 
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_faixa_1? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }                                             
                                    labelWidth={100}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.faixa_inicialState}>
                                      {this.state.mensagem_faixa_inicial}
                                  </FormFeedback>                                                                   
                              </div> 
                              
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Faixa Final </InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"                                    
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_faixa_2} 
                                    helperText={this.state.mensagem_faixa_final}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campfaixa_final}                    
                                    onFocus={this.verificafaixa_final}
                                    onKeyUp={this.verificafaixa_final}
                                    onChange={ (e) => {
                                      this.faixa_finalchange(e)
                                    }}          
                                    inputProps={{
                                      maxLength: 10,
                                    }}       
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_faixa_2? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }                             
                                    labelWidth={100}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.faixa_finalState}>
                                      {this.state.mensagem_faixa_final}
                                  </FormFeedback>                                   
                              </div>                        
                          </div>
                      </div> 
                      <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>                                                
                                  <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Valor KM </InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_direita"
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_valorkm} 
                                    helperText={this.state.mensagem_valor_km}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campvalor_km}                                 
                                    onFocus={this.verificavalor_km}
                                    onKeyUp={this.verificavalor_km}
                                    onChange={(e) => {
                                      this.valor_kmchange(e)
                                    }}    
                                    inputProps={{
                                      maxLength: 8,
                                    }} 
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_valorkm? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={80}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.valor_kmState}>
                                      {this.state.mensagem_valor_km}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Valor Tempo</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_valortempo} 
                                    helperText={this.state.mensagem_valor_tempo}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'                           
                                    value={this.state.campvalor_tempo}                                  
                                    onFocus={this.verificavalor_tempo}
                                    onKeyUp={this.verificavalor_tempo}
                                    onChange={ (e) => {
                                      this.valor_tempochange(e)                                                
                                    }}            
                                    inputProps={{
                                      maxLength: 8,
                                    }}     
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_valortempo? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={110}
                                  />
                                </FormControl>                       
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.valor_tempoState}>
                                  {this.state.mensagem_valor_tempo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>      
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Valor da Bandeira</InputLabel>
                                  <OutlinedInput
                                   className="input_matriz_direita"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bandeira} 
                                    helperText={this.state.mensagem_bandeira}   
                                    placeholder=""                            
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbandeira}                                  
                                    onFocus={this.verificabandeira}
                                    onKeyUp={this.verificabandeira}
                                    onChange={(e) => {
                                      this.bandeirachange(e)
                                    }}                                                                          
                                    inputProps={{
                                      maxLength: 8,
                                    }}  
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_bandeira? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={160}
                                  />
                                </FormControl>                                                                          
                                  <FormFeedback 
                                  invalid={this.state.validate.bandeiraState}>
                                      {this.state.mensagem_bandeira}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_esquerda" variant="outlined">
                                  <InputLabel className="label_matriz_esquerda" htmlFor="standard-adornment-amount">Valor Receptivo</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_esquerda"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_receptivo} 
                                    helperText={this.state.mensagem_receptivo}   
                                    placeholder=""                                                      
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campreceptivo}                                   
                                    onFocus={this.verificareceptivo}
                                    onKeyUp={this.verificareceptivo}
                                    onChange={ (e) => {
                                      this.receptivochange(e)                                                
                                    }}            
                                    inputProps={{
                                      maxLength: 8,
                                    }}        
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    endAdornment={
                                      <InputAdornment position="end">
                                           {this.state.validacao_receptivo? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }    
                                    labelWidth={140}
                                  />
                                </FormControl>                                 
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.receptivoState}>
                                  {this.state.mensagem_receptivo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>  
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                  <InputLabel className="label_matriz_direita" htmlFor="standard-adornment-amount">Bilingue</InputLabel>
                                  <OutlinedInput
                                    className="input_matriz_direita"
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bilingue} 
                                    helperText={this.state.mensagem_bilingue}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbilingue}                                   
                                    onFocus={this.verificabilingue}
                                    onKeyUp={this.verificabilingue}
                                    onChange={(e) => {
                                      this.bilinguechange(e)
                                      this.validateBilingueChange(e)
                                    }}                                                                          
                                    inputProps={{
                                      maxLength: 2,
                                    }}                                  
                                    startAdornment={                                                                            
                                      <InputAdornment position="start">
                                           {this.state.validacao_bilingue? <CheckIcon />: ''}
                                      </InputAdornment>
                                    }         
                                    endAdornment={                                                                            
                                      <InputAdornment position="end">
                                      %
                                      </InputAdornment>
                                     
                                    }    
                                    labelWidth={120}
                                  />
                                </FormControl>                                                   
                                  <FormFeedback 
                                  invalid={this.state.validate.bilingueState}>
                                      {this.state.mensagem_bilingue}
                                  </FormFeedback>     
                              </div>                                                    
                      </div>    
                    </div>  
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                    <InputLabel className="label_matriz_esquerda" htmlFor="filled-adornment-password">Data Inicial</InputLabel>
                                    <OutlinedInput         
                                        autoComplete="off"                       
                                        error={this.state.erro_datainicio}
                                        helperText={this.state.mensagem_data_inicio}
                                        className="input_matriz_esquerda"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campdata_inicial}
                                        onBlur={this.verificaData_inicio}
                                        onKeyUp={this.verificaData_inicio}
                                        onChange={ (e) => {
                                          this.data_iniciochange(e)                                                                
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_datainicio? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_datainicio}>
                                        {this.state.mensagem_data_inicio}
                                  </FormHelperText>
                                </FormControl>  

                              </div>
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                    <InputLabel className="label_matriz_esquerda" htmlFor="filled-adornment-password">Data Final</InputLabel>
                                    <OutlinedInput         
                                        autoComplete="off"                       
                                        error={this.state.erro_datafim}
                                        helperText={this.state.mensagem_data_fim}
                                        className="input_matriz_esquerda"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campdata_final}
                                        onBlur={this.verificaData_fim}
                                        onKeyUp={this.verificaData_fim}
                                        onChange={ (e) => {
                                          this.data_finalchange(e)                                                              
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_datafim? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_datafim}>
                                        {this.state.mensagem_data_fim}
                                  </FormHelperText>
                                </FormControl>  

                              </div>
                        </div>
                    </div>          

                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_direita" variant="outlined">
                                    <InputLabel className="label_matriz_direita" htmlFor="filled-adornment-password">Hora Inicial</InputLabel>
                                    <OutlinedInput       
                                        type="time"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_inicial}
                                        helperText={this.state.mensagem_data_inicio}
                                        className="input_matriz_direita"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_inicial}
                                        onBlur={this.verificahora_inicial}
                                        onKeyUp={this.verificahora_inicial}
                                        onChange={ (e) => {
                                          this.hora_iniciochange(e)                                                                 
                                        }}       
                                        InputLabelProps={{
                                          shrink: true,
                                        }}                             
                                        inputProps={{
                                          maxLength: 4,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_hora_inicial? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_hora_inicial}>
                                        {this.state.mensagem_data_inicio}
                                  </FormHelperText>
                                </FormControl>  
                              </div>    
                              <div>
                              <FormControl className="input_matriz_esquerda" variant="outlined">
                                    <InputLabel className="label_matriz_esquerda" htmlFor="filled-adornment-password">Hora Final</InputLabel>
                                    <OutlinedInput         
                                        type="time"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_final}
                                        helperText={this.state.mensagem_data_inicio}
                                        className="input_matriz_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_final}
                                        onBlur={this.verificahora_final}
                                        onKeyUp={this.verificahora_final}
                                        onChange={ (e) => {
                                          this.hora_finalchange(e)                                                                 
                                        }}                                    
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          maxLength: 4,
                                         
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_hora_final? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_hora_final}>
                                        {this.state.mensagem_data_inicio}
                                  </FormHelperText>
                                </FormControl>  
                              </div>                
                      </div>    
                    </div> 
                    </div>                        
                   {this.verifica_botao_especial_I(this.state.inicio)}     
                </div>
              </div>        
            </div>
     </ReactModal>       
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
               <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir esta Tarifa? </div>
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
        isOpen={this.state.showMensagemDeleteEspecial}
        style={ConfirmacaodelStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div> 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalDeleteEspecial()} className="botao_close_modal_deletar">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <center><img src="/exclamation.png" /> </center>
            <div className="container_alterado">              
              
             <div className="moldura_modal_delecao">
               <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir esta Tarifa Especial? </div>
               <div>Ao confirmar a exclusão o registro será apagado.  </div>
             </div>     
                <div className="retorno">{this.state.retorno}</div>
            <Box 
               className="botoes_delete_cancelar_modal" p={2} onClick={()=>this.handleCloseModalDeleteEspecial()}>
              <div className="d-flex justify-content-center">
              <label> Cancelar </label>
              </div>     
            </Box>      
            <Box 
               className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDeleteEspecial(this.state.campDeletarId)}>
              <div className="d-flex justify-content-center">
              <label> Excluir </label>
              </div>     
            </Box>      

            </div>
     </ReactModal>          
          <Snackbar                   
                anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
                open={this.state.mensagem_exclusao}                
                autoHideDuration={2000}               
                onClose={this.envia_mensagemExclusaoClose}                
                >
            <Alert onClose={this.envia_mensagemExclusaoClose} severity="error">
                  {this.state.mensagem_usuario}
            </Alert>
          </Snackbar>

          <Snackbar                   
                anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
                open={this.state.mensagem_edicao}                
                autoHideDuration={2000}               
                onClose={this.envia_mensagemEdicaoClose}                
                >
            <Alert onClose={this.mensagem_edicao} severity="success">
                  {this.state.mensagem_usuario}
            </Alert>
          </Snackbar>  

          <Snackbar                   
                anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
                open={this.state.mensagem_edicao_especial}                
                autoHideDuration={2000}               
                onClose={this.envia_mensagemEdicaoEspecialClose}                
                >
            <Alert onClose={this.envia_mensagemEdicaoEspecialClose} severity="success">
                  {this.state.mensagem_usuario}
            </Alert>
          </Snackbar>    

          <Snackbar                   
                anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
                open={this.state.mensagem_inclusao}                
                autoHideDuration={2000}               
                onClose={this.envia_mensagemInclusaoClose}                
                >
            <Alert onClose={this.envia_mensagemInclusaoClose} severity="success">
                  {this.state.mensagem_usuario}
            </Alert>
          </Snackbar>    

          <Snackbar                   
                anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
                open={this.state.mensagem_inclusao_especial}                
                autoHideDuration={2000}               
                onClose={this.envia_mensagemInclusaoEspecialClose}                
                >
            <Alert onClose={this.envia_mensagemInclusaoEspecialClose} severity="success">
                  {this.state.mensagem_usuario}
            </Alert>
          </Snackbar>    
       {// <div className="botao_lista_incluir">
         // <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
           //   <AddIcon/> Incluir Valor Tarifário
         // </Fab>
           //           </div> 
       }
        </div>
      </div>         
    );
  }


  envia_mensagemExclusaoClick = () => {
    this.setState({ 
      mensagem_exclusao: true      
    });

  }      

  envia_mensagemExclusaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_exclusao: false,      
    });        
   
  };   
  
  
  envia_mensagemEdicaoClick = () => {
    this.setState({ 
      mensagem_edicao: true      
    });

  }      

  envia_mensagemEdicaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_edicao: false,      
    });        
   
    this.handleCloseModal();

  };   

  envia_mensagemEdicaoEspecialClick = () => {
    this.setState({ 
      mensagem_edicao_especial: true      
    });

  }      

  envia_mensagemEdicaoEspecialClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_edicao_especial: false,      
    });       
    
    this.handleCloseModalEspecialE();
   
  };   

  envia_mensagemInclusaoClick = () => {
    this.setState({ 
      mensagem_inclusao: true      
    });

  }      

  envia_mensagemInclusaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_inclusao: false,      
    });        
   
     this.handleCloseModalIncluir();
  };   

  envia_mensagemInclusaoEspecialClick = () => {
    this.setState({ 
      mensagem_inclusao_especial: true      
    });

  }      

  envia_mensagemInclusaoEspecialClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_inclusao_especial: false,      
    });        
   
    this.handleCloseModalEspecialI();
  };    



  handleOpenModal(data) { 
    this.setState({ 
      showModal: true,
      mensagem_aguarde: '',
      inicio: 2
    });  
    localStorage.setItem('logmatrizId', data.id);    
     
    this.loadTipoTransporte();
    this.carrega_matriz();


  }
  
  handleCloseModal() {
    this.setState({ 
      showModal: false
    });
  
    this.loadMatriz();

  }

  handleOpenModalIncluir() { 
    this.setState({ 
      showModalInclusao: true,
      mensagem_aguarde: ''
    });              
    this.limpar_campos();
    this.loadTipoTransporte();
    
    

  }
  
  handleCloseModalIncluir() {
    this.setState({ 
      showModalInclusao: false
    });
  
    this.loadMatriz();

  }


  handleOpenModalEspecialI() { 
    this.setState({ 
      showModalEspecialI: true,
      mensagem_aguarde: '',
      inicio: 2
    });  
   // localStorage.setItem('logmatrizId', data.id);    
    this.limpar_campos();
    this.loadTipoTransporte();
   // this.carrega_matriz_especial();

  }
  
  handleCloseModalEspecialI() {
    this.setState({ 
      showModalEspecialI: false
    });
  
    this.loadMatrizEspecial();

  }

  handleOpenModalEspecialE(data) { 
    this.setState({ 
      showModalEspecialE: true,
      mensagem_aguarde: '',
      inicio: 2
    });  
    localStorage.setItem('logmatrizId', data.id);    
     
    this.loadTipoTransporte();
    this.carrega_matriz_especial();

  }
  
  handleCloseModalEspecialE() {
    this.setState({ 
      showModalEspecialE: false
    });
  
    this.loadMatrizEspecial();

  }

  handleOpenModalDelete(data) { 
    this.setState({ 
      showMensagemDelete: true,
      campDeletarId: data.id,
      retorno: '',
      campDescricao: '',
      validacao_descricao: false,
    });  

     
    
  }
 
  
  handleCloseModalDelete() {
    this.setState({ 
      showMensagemDelete: false
    });
  
   
  }

  handleCloseModalDeleteEspecial() {
    this.setState({ 
      showMensagemDeleteEspecial: false
    });
  
   
  }

  handleOpenModalDeleteEspecial(data) { 
    this.setState({ 
      showMensagemDeleteEspecial: true,
      campDeletarId: data.id,
      retorno: '',
      campDescricao: '',
      validacao_descricao: false,
    });  

     
    
  }

  loadTipoTransporte() {
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

  carrega_matriz() { 
    api.get('/matriz/get/'+localStorage.getItem('logmatrizId'))
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        //console.log('data - '+JSON.stringify(data[0].faixa_inicial, null, "    ")); 

        this.setState({
          camptipoId: res.data.data[0].tipoTransporte,    
          campfaixa_inicial: res.data.data[0].faixa_inicial,    
          campfaixa_final: res.data.data[0].faixa_final,    
          campvalor_km: valorMask(res.data.data[0].valor_km),    
          campvalor_tempo: valorMask(res.data.data[0].valor_tempo),      
          campbandeira: valorMask(res.data.data[0].bandeira),    
          campreceptivo: valorMask(res.data.data[0].receptivo),    
          campbilingue: res.data.data[0].bilingue,    
          validacao_faixa_1: true,
          validacao_faixa_2: true,
          validacao_bilingue: true,
          validacao_bandeira: true,
          validacao_receptivo: true,
          validacao_valorkm: true,
          validacao_valortempo: true,          
          validacao_tipo: true,
          inicio: 2
          //camppedagio: valorMask(res.data.data[0].pedagio),    
        })
        this.verifica_botao(this.state.inicio)
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }   

  carrega_matriz_especial() { 
    api.get('/matrizEspecial/get/'+localStorage.getItem('logmatrizId'))
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        //console.log('data - '+JSON.stringify(data[0].faixa_inicial, null, "    ")); 
        this.setState({
          camptipoId: res.data.data[0].tipoTransporte,    
          campdata_inicial: dateFormat(res.data.data[0].data_inicial, "UTC:dd/mm/yyyy"),
          campdata_final: dateFormat(res.data.data[0].data_final, "UTC:dd/mm/yyyy"),    
          camphora_inicial: res.data.data[0].hora_inicial,   
          camphora_final: res.data.data[0].hora_final,    
          campfaixa_inicial: res.data.data[0].faixa_inicial,    
          campfaixa_final: res.data.data[0].faixa_final,    
          campvalor_km: res.data.data[0].valor_km,    
          campvalor_tempo: valorMask(res.data.data[0].valor_tempo),      
          campbandeira: valorMask(res.data.data[0].bandeira),    
          campreceptivo: valorMask(res.data.data[0].receptivo),    
          campbilingue: res.data.data[0].bilingue,    
          validacao_faixa_1: true,
          validacao_faixa_2: true,
          validacao_bilingue: true,
          validacao_bandeira: true,
          validacao_receptivo: true,
          validacao_valorkm: true,
          validacao_valortempo: true,
          validacao_datainicio:true,
          validacao_datafim: true,
          validacao_hora_inicial: true,          
          validacao_hora_final: true,
          validacao_tipo: true,
          inicio: 2
          //camppedagio: valorMask(res.data.data[0].pedagio),    
        })
      
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }   

  onIncluir() {
    this.props.history.push(`/matriz_criar`);   
  } 

  onEditar(data) {

    this.props.history.push(`/matriz_editar/${data.id}`);   
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
    console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/matriz/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {       
        this.loadMatriz();   
        this.setState({  
          //open: true,
          mensagem_usuario: 'Tarifa Excluida com sucesso!'
         });
        this.handleCloseModalDelete(); 
        this.envia_mensagemExclusaoClick();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

  sendDeleteEspecial(userId){
    // url de backend
    console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/matrizEspecial/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {     
        this.loadMatrizEspecial();      
        this.setState({  
         // open: true,
          mensagem_usuario: 'Tarifa Especial Excluida com sucesso!'
         });                   
        this.handleCloseModalDeleteEspecial();   
        this.envia_mensagemExclusaoClick();
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listaMatrizComponent;
