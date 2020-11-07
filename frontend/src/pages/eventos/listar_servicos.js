import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import {Alert, Input } from 'reactstrap';
//import { Tabs, Tab } from 'react-bootstrap';
import MaterialTable from 'material-table';
//import GoogleMapReact from 'google-map-react';
import GooglePlacesAutocomplete, {geocodeByPlaceId} from 'react-google-places-autocomplete';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

import "@reach/combobox/styles.css";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

//import axios from 'axios';
import api from '../../services/api';
import Alert from '@material-ui/lab/Alert';

import { Link } from "react-router-dom";
//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu from '../../pages/cabecalho' ;
import { celularMask } from '../formatacao/celularmask';
import Menu_administrador from '../administrador/menu_administrador';
import { Button } from 'reactstrap';
import './servicos.css';
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";

import { buscaLocal } from '../maps_place';
import { dataMask } from '../formatacao/datamask';

import ReactModal from 'react-modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import parse from 'autosuggest-highlight/parse';
import { cnpjMask } from '../formatacao/cnpjmask';
import throttle from 'lodash/throttle';
import { Input } from 'reactstrap';

import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { containedTabsStylesHook } from '@mui-treasury/styles/tabs';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';

import { valorMask } from '../formatacao/valormask';
import { valorDoublemask } from '../formatacao/valorDoublemask';
import { numeroMask } from '../formatacao/numeromask';
import creditCardType from 'credit-card-type'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { cartaoMask } from '../formatacao/cartaoMask';
import { cartaoAmericanMask } from '../formatacao/cartaoAmericanMask';
import { cartaoDinersMask } from '../formatacao/cartaoDinersMask';
import Cards from 'react-credit-cards';
import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData } from './utils';
import { cyan } from '@material-ui/core/colors';

//const service = new google.maps.DistanceMatrixService();
var dateFormat = require('dateformat');
//var distance = require('google-distance');
//const distanceMatrix = require('distance-matrix-endpoint')
//var distance = require('google-distance');
var distance  = require('google-distance-matrix');


//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');

const libraries = ["places"];

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const containerStyle = {
  position: 'relative',  
  width: '80%',
  height: '45%'
}

const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);
//var dateFormat = require('dateformat');
//const baseUrl = "http://34.210.56.22:3333";

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
    left                   : '60%',      
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100vh',        
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

const customFixoStyles = {
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
    width                  : '520px',
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '99vh',        
    padding                : '0px !important',      
    overflow               : 'hidden',
    WebkitOverflowScrolling: 'hidden',
    position               : 'absolute',
    border: '1px solid #ccc',       
  }
};

const customrotaStyles = {
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
    width                  : '520px',
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '99vh',        
    padding                : '0px !important',      
    overflow               : 'hidden',
    WebkitOverflowScrolling: 'hidden',
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

//const tabsStyles = containedTabsStylesHook.useTabs();
//const tabItemStyles = containedTabsStylesHook.useTabItem();
function Alert2(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class listaservicosComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      eventoId: '',     
      erro_data: false,  
      campservicoId: '',
      campCpf: '',
      mensagem: '',
      color: 'light',
      value: "1",
      opcao: '',      
      inicio: 0,
      tabIndex: "2",
      address: '',
      campeventoId: '',
      campDeletarId: '',
      campNome: '',
      selectedPlace:'',
      camptipoId: '',      
      campordem_servico: '',
      campnome_evento: '',
      campdata_evento: '',       
      campdata_servico: '',
      campqtdpassageiro: '',
      camphora_inicial: '',
      camphora_final: '',
      campTelefone1: '',
      camplocalembarque: '',
      camplocaldesembarque: '',
      campqtddiarias: '',
      campnomemotorista:  '',
      camptelefonemotorista:  '',
      campbilingue: false,
      campreceptivo: false,
      campdistancia: 0,
      camptempo: 0,
      campcartaoid: '',
      campCompanhia_aerea: '',
      campNumero_voo: '',
      campvalor: '0,00',
      campvalor_estimado: '',
      totalviagens: 0,
      valortotalviagens: '0,00',
      valor_oser: '',
      valor_motorista: '',
      erro_nome: false,
      erro_telefone: false,      
      erro_data_servico: false,
      erro_qtdpassageiro: false,
      erro_hora_inicial: false,
      erro_hora_final: false,
      erro_celular1: false,
      erro_cartao: false,
      erro_localembarque: false,
      erro_localdesembarque: false,
      erro_data_evento: false,    
      erro_companhia_aerea: false,
      erro_numero_voo: false,
      erro_nome_motorista: false,
      erro_telefone_motorista: false,
      mensagem_servico: '',
      erro_inclusao: '',
      camptempovalue: '',  
      mensagem_data_evento: '',    
      mensagem_nome: '',
      mensagem_telefone: '',      
      mensagem_data_servico: '',
      mensagem_qtdpassageiro: '',
      mensagem_hora_inicial: '',
      mensagem_hora_final: '',
      mensagem_Telefone1: '',
      mensagem_localembarque: '',
      mensagem_localdesembarque: '',
      mensagem_data_nao_encontrada: '',
      mensagem_nao_possui_registro: '',
      mensagem_cartao: '',
      mensagem_companhia_aerea: false,
      mensagem_numero_voo: false,
      mensagem_nome_motorista: false,
      mensagem_telefone_motorista: false,
      mensagem_error: false,
      valor_bilingue: '',
      valor_receptivo: '',
      listTarifas:[],
      listTarifasEspeciais:[],
      origins: '',     
      destinations:'',
      validacao_tipo: false, 
      validacao_cartao: false,
      validacao_nome_motorista: false,
      validacao_telefone_motorista: false,
      validacao_data_evento: false,      
      validacao_nome: false,     
      validacao_data_servico: false,
      validacao_qtdpassageiro: false,
      validacao_hora_inicial: false,
      validacao_hora_final: false,
      validacao_telefone1: false,
      validacao_localembarque: false,
      validacao_localdesembarque: false,
      validacao_companhia_aerea: false,
      validacao_numero_voo: false,
      mensagem_error_mapa: '',
      eventoId: '',
      controle: 0,
      resultado_bilingue: '',
      resultado_receptivo: '',
      listServicos:[],
      listTipoTransporte:[],
      listTodosOperadores:[],
      listservicoseventos:[],
      listaCartao:[],
      erro_tipo: false,      
      embarque_latitude: '',
      embarque_longitude: '',
      desembarque_latitude: '',
      desembarque_longitude: '',
      possui_tarifa_especial: false,
      possui_tarifa: false,
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',        
      issuer: "",
      focused: "",
    }

    this.nomeChange = this.nomeChange.bind(this);
    this.tipoChange = this.tipoChange.bind(this);
    this.cartaoChange = this.cartaoChange.bind(this);
    this.telefone1change = this.telefone1change.bind(this);  
    this.verificaTelefone1 = this.verificaTelefone1.bind(this);  
    this.validatelefone1Change = this.validatelefone1Change.bind(this);  
    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.verificaNome = this.verificaNome.bind(this);  
    this.verificaNomeonfocus = this.verificaNomeonfocus.bind(this);      
    this.verificahora_inicial = this.verificahora_inicial.bind(this);
    this.nomemotoristaChange = this.nomemotoristaChange.bind(this);
    this.telefonemotoristaChange = this.telefonemotoristaChange.bind(this);

    this.verificaCartao = this.verificaCartao.bind(this);  

    this.calculo_bilingue = this.calculo_bilingue.bind(this);
    this.calculo_receptivo = this.calculo_receptivo.bind(this);

    this.companhia_aereachange = this.companhia_aereachange.bind(this);
    this.numero_voochange = this.numero_voochange.bind(this);

    this.verificaQtdPassageiros = this.verificaQtdPassageiros.bind(this);   

    this.verificaTipo_veiculo = this.verificaTipo_veiculo.bind(this);
    this.receptivochange = this.receptivochange.bind(this);
    this.bilinguechange = this.bilinguechange.bind(this);

    this.qtdDiariaschange = this.qtdDiariaschange.bind(this);
    this.qtdpassageiroschange = this.qtdpassageiroschange.bind(this);

    this.data_servicochange = this.data_servicochange.bind(this);    
    this.hora_inicialchange = this.hora_inicialchange.bind(this);
    this.hora_finalchange = this.hora_finalchange.bind(this);

    //this.mostrar_endereco_selecionado_embarque = this.mostrar_endereco_selecionado_embarque.bind(this);
    //this.mostrar_endereco_selecionado_desembarque = this.mostrar_endereco_selecionado_desembarque.bind(this);
    this.verificaData_Evento = this.verificaData_Evento.bind(this);      
    
    this.validaDataServicoChange = this.validaDataServicoChange.bind(this);      
  }
  

  componentDidMount(){
    
 //  let eventoId = this.props.match.params.id;    
   // console.log('eventoId'+ eventoId);

  // this.interval = setInterval(() => this.tick(), 5000);
//debugger;
    this.setState({
      perfil: localStorage.getItem('logperfil'),
      id: localStorage.getItem('logid'),
      eventoId: this.props.match.params.id          
    });

    localStorage.setItem('logeventoservico',this.props.match.params.id);
    this.loadEventos();    
    this.loadlistServicos();
    this.loadTarifaespecial();
    this.loadTarifa();
    this.valor_total_servicos();
    this.valor_total_viagens();

   // this.teste();
   // this.calculo_rota_total();
  }

 /* teste() {
    const num = 6.647; 
    //O parâmetro da função é o número de casas decimais.
    const numeroFormatado = num.toFixed(1);
    
    console.log(numeroFormatado);
  } 
*/ 
 tick() {
  this.loadEventos();    
  this.loadlistServicos();
  this.loadTarifaespecial();
  this.loadTarifa();
  this.valor_total_servicos();
  this.valor_total_viagens();
 }

 componentWillUnmount() {
  //clearInterval(this.interval);
 }

  valor_total_servicos(){
    let data_formatada = '0.00'

    api.get(`/servicos/totalservicos/${localStorage.getItem('logeventoservico')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success == true) {
         const data = res.data.data  
    
        //   const valor = valorMask(data)
      if (data !== 0) {
        data_formatada = valorMask(data.toFixed(2))
       }
         this.setState({ valortotalviagens: data_formatada});
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }  

   valor_total_viagens(){

    api.get(`/servicos/totalviagens/${localStorage.getItem('logeventoservico')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success == true) {       
         
        const data = res.data.data   
         
      //   const valor = valorMask(data)
         this.setState({ totalviagens: data});
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }  

  loadlistServicos(){
    // const url = baseUrl+"/cliente/list"   
    //debugger;
    api.get(`/servicos/listaservicosevento/${localStorage.getItem('logeventoservico')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success == true) {
         const data = res.data.data    
         this.setState({listservicoseventos:data})
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }


  carrega_servico(data){
    // const url = baseUrl+"/cliente/list"   
    //debugger;
    api.get(`/servicos/get/${data.id}`)
     .then(res=>{
       if (res.data.success == true) {
        this.setState({     
           camptipoId: res.data.data[0].tipoTransporte,
           campeventoId: res.data.data[0].eventoid,
           campNome: res.data.data[0].nome_passageiro,
           campTelefone1: res.data.data[0].telefone_passageiro,
           campqtdpassageiro: res.data.data[0].quantidade_passageiro,
           campdata_servico: dateFormat(res.data.data[0].data_servico, "UTC:dd/mm/yyyy"),
           camphora_inicial: res.data.data[0].hora_inicial.substr(0,5),
           camphora_final: res.data.data[0].hora_final,
           campqtddiarias: res.data.data[0].quantidade_diarias,
           campNumero_voo: res.data.data[0].numero_voo,
           campCompanhia_aerea: res.data.data[0].companhia_aerea,
           camplocalembarque: res.data.data[0].local_embarque,
           camplocaldesembarque: res.data.data[0].local_desembarque,           
           embarque_latitude: res.data.data[0].embarque_latitude,
           embarque_longitude: res.data.data[0].embarque_longitude,
           desembarque_latitude: res.data.data[0].desembarque_latitude,
           desembarque_longitude: res.data.data[0].desembarque_longitude,
           campbilingue: res.data.data[0].motorista_bilingue,
           campreceptivo: res.data.data[0].motorista_receptivo,
           //campmotorista_alocado: res.data.data[0].motorista_alocado,
           campnomemotorista: res.data.data[0].nome_motorista, 
           camptelefonemotorista: res.data.data[0].telefone_motorista, 
           campdistancia: res.data.data[0].km_translado,                     
           camptempovalue: res.data.data[0].tempo_value,
           camptempo: res.data.data[0].tempo_translado,
           campvalor_estimado: res.data.data[0].valor_estimado,        
           campvalor: res.data.data[0].valor_estimado,
           campcartaoid: res.data.data[0].cartaoId,          
            validacao_tipo: true, 
            validacao_cartao: true,          
            validacao_data_evento: true,      
            validacao_nome: true,     
            validacao_data_servico: true,
            validacao_qtdpassageiro: true,
            validacao_hora_inicial: true,
            validacao_hora_final: true,
            validacao_telefone1: true,
            validacao_localembarque: true,
            validacao_localdesembarque: true,                      
            incluir: false,
            inicio: 1,
        });    

           
        if (res.data.data[0].nome_motorista !== "") {
          this.setState({ validacao_nome_motorista: true });
        }
        if (res.data.data[0].telefone_motorista !== "") {
          this.setState({ validacao_telefone_motorista: true });
        }
        if (res.data.data[0].companhia_aerea !== "") {
          this.setState({ validacao_companhia_aerea: true });
        }
        if (res.data.data[0].numero_voo !== "") {
          this.setState({ validacao_numero_voo: true });
        }
         
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }



   handleEmbarqueChange = camplocalembarque => {
  
    geocodeByPlaceId(camplocalembarque.value.place_id)
    .then((results)=>{
      
     // console.log(' camplocalembarque '+JSON.stringify(camplocalembarque, null, "    ")); 
     // console.log(' camplocalembarque results '+JSON.stringify(results[0].geometry.location.lat(), null, "    ")); 
      this.setState({     
        camplocalembarque: camplocalembarque.label,
        embarque_latitude: results[0].geometry.location.lat(),
        embarque_longitude: results[0].geometry.location.lng(),              //  
        inicio: 1,  
      });  

     // console.log(' resultado '+JSON.stringify(this.state, null, "    ")); 

    })
    .catch(error => console.error(error));
    
  };

  handlelocalDesembarqueChange = camplocaldesembarque => {
  
    geocodeByPlaceId(camplocaldesembarque.value.place_id)
    .then((results)=>{
      
      this.setState({
        camplocaldesembarque: camplocaldesembarque.label, 
        desembarque_latitude: results[0].geometry.location.lat(),
        desembarque_longitude: results[0].geometry.location.lng(),                
        inicio: 1,
      });  
   //   console.log(' resultado '+JSON.stringify(this.state, null, "    ")); 
    })
    .catch(error => console.error(error));    
 
  };

/*
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
*/
  
telefone1change(e) {
  this.setState({ campTelefone1: celularMask(e.target.value) })
}

qtdDiariaschange(e) {
  this.setState({ campqtddiarias: e.target.value })
}

qtdpassageiroschange(e) {
  this.setState({ campqtdpassageiro: e.target.value })
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

validaDataServicoChange(e) {    
 //   const { validate } = this.state
       if (e.target.value.length == 0) {     
        this.setState({ 
          erro_data_servico: true,   
          validacao_data_servico: false,      
          mensagem_data_servico: '' 
         })      
       } else if (e.target.value.length == 10) {

         let date_validar = e.target.value;
         var dia = date_validar.substr(0,2);
         var mes = date_validar.substr(3,2);         

         if (dia > 31) {
          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Dia é inválido.' 
           })  
         } else if (mes > 12) {
          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Mês é inválido.' 
           })  
         } else if ((mes==4||mes==6||mes==9||mes==11) && dia==31) {
          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Data do serviço é inválido.' 
           })  
         } else {
          this.setState({ 
            erro_data_servico: false,   
            validacao_data_servico: true,      
            mensagem_data_servico: '',
          });   
         }
         
         
/*
         if (date_validar.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12) {
          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Data do serviço é inválido.' 
           })  
         } else if ((mes==4||mes==6||mes==9||mes==11) && dia==31) {
          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Data do serviço é inválido.' 
           })  
         } else if (mes==2 && (dia>29||(dia==29 && ano%4!=0))) {
          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Data do serviço é inválido.' 
           })  
         } else if (ano < 1900) {
          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Data do serviço é inválido.' 
           })  
         } else {
          this.setState({ 
            erro_data_servico: false,   
            validacao_data_servico: true,      
            mensagem_data_servico: '',
          });   
         }
*/
      
        /* valida data do serviço */        
      
      /*  let ardt = new Array;
        const ExpReg=new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
        ardt=date_validar.split("/");
        
        if ( date_validar.search(ExpReg)==-1){
          this.setState({ erro_data: true }) 
        }
        else if (((ardt[1]==4)||(ardt[1]==6)||(ardt[1]==9)||(ardt[1]==11))&&(ardt[0]>30))
          this.setState({ erro_data: true }) 
        else if ( ardt[1]==2) {
          if ((ardt[0]>28)&&((ardt[2]%4)!=0))
          this.setState({ erro_data: true }) 
          if ((ardt[0]>29)&&((ardt[2]%4)==0))
          this.setState({ erro_data: true }) 
        }

        if (this.state.erro_data == true) {
          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Data do serviço é inválido.' 
           })     
        } else {
          this.setState({ 
            erro_data_servico: false,   
            validacao_data_servico: true,      
            mensagem_data_servico: '',
          });     

        }
         */
    }   
}

verificaNomeonfocus(e) {
  //const { validate } = this.state
  if (e.target.value.length == 0) {
  //  validate.nomeState = ''
    this.setState({ 
    //  validate,       
      erro_nome: false,   
      validacao_nome: false,            
      mensagem_nome: ''  
     })            
  }  
} 

verificaQtdPassageiros(e) {
  if (e.target.value.length == 0) {
    //  validate.nomeState = ''
      this.setState({       
        erro_qtdpassageiro: true,   
        validacao_qtdpassageiro: false,            
        mensagem_qtdpassageiro: ''  
       })            
  } else  if (e.target.value.length > 0) {
    this.setState({       
        erro_qtdpassageiro: false,   
        validacao_qtdpassageiro: true,            
        mensagem_qtdpassageiro: ''  
       })            
  }  
}

verificaCartao(e) {
  debugger;
  if (this.state.campcartaoid.length == 0) {
    //  validate.nomeState = ''
      this.setState({       
        erro_cartao: true,   
        validacao_cartao: false,            
        mensagem_cartao: ''  
       })            
  } else  if (this.state.campcartaoid.length > 0) {
    this.setState({       
      erro_cartao: false,   
      validacao_cartao: true,            
      mensagem_cartao: ''  
    })            
  }  
}


verificaTipo_veiculo(e) {  
  if (this.state.camptipoId.length == 0) {     
   this.setState({         
     erro_tipo: true,  
     validacao_tipo: false,
     inicio: 1,        
     mensagem_tipoId: ""  
    })            
  } else if (this.state.camptipoId.length > 0) {      
   this.setState({ 
     erro_tipo: false,  
     validacao_tipo: true,
     inicio: 1,        
     mensagem_tipoId: ""  
    })           
    
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '') {
      this.buscar_informacao();
    }
   // this.verifica_botao(this.state.inicio) 
  }     
}

bilinguechange(e) {
  this.setState({ campbilingue: e.target.checked });    
  
  this.calculo_bilingue(e);
}
receptivochange(e) {
  this.setState({ campreceptivo: e.target.checked  })
  
  this.calculo_receptivo(e);
}
data_servicochange(e) {
  this.setState({ campdata_servico: dataMask(e.target.value) })

  if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '') {
    this.buscar_informacao();
  }
}
hora_inicialchange(e) {
  this.setState({ camphora_inicial: e.target.value })

  if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '') {
      this.buscar_informacao();
  }
}
hora_finalchange(e) {
  this.setState({ camphora_final: e.target.value })
}


verificaTelefone1onfocus(e){   
  //const { validate } = this.state
 // validate.telefone1State = ''
     this.setState({ 
         // validate,
          erro_telefone: false,
          validacao_telefone1: false, 
          mensagem_telefone1: ''  
      })                    
 } 


validatelefone1Change(e){
  //  const { validate } = this.state
     
      if (e.target.value.length == 0) {
     //   validate.telefone1State = ''
        this.setState({ 
          erro_telefone: false,
          validacao_telefone1: false,
          mensagem_telefone1: '' 
        })  
      } else {          
        
        if (e.target.value.length == 15) {
       //   validate.telefone1State = 'has-success'       

          this.setState({ 
            mensagem_telefone1: '',
            inicio: 1,          
            erro_telefone: false,
            validacao_telefone1: true,   
          });      
          
     //     console.log(' validate '+JSON.stringify(validate, null, "    ")); 
        }          
      }  
     // this.setState({ validate })
    // this.verifica_botao(this.state.inicio)

  }

  verificaTelefone1(e) {   
    //const { validate } = this.state
       if (e.target.value.length < 15) {              
        this.setState({ 
        //  validate,
          inicio: 1,
          erro_telefone: false,          
          validacao_telefone1: false,
          mensagem_telefone1: ''
         })      
       } else {       

        if (e.target.value.length == 15) {
       //     validate.telefone1State = 'has-success' ;                
            this.setState({ 
              erro_telefone: false,                      
              validacao_telefone1: true,
              mensagem_telefone1: '',
              inicio: 1
          });          
        }

       }        
   }


  loadEventos(){
   // const url = baseUrl+"/cliente/list"
   let userId = this.props.match.params.id;  

   //debugger;
   api.get(`/eventos/get/${userId}`)
    .then(res=>{
      if (res.data.success == true) {
        
        //console.log(' Evento - '+ JSON.stringify(res.data, null, "    ") );
        const data = res.data.data      
        this.setState({
          campeventoId: res.data.data[0].id,
          campordem_servico: res.data.data[0].ordem_servico,
          campnome_evento: res.data.data[0].nome_evento,
          campdata_evento: dateFormat(res.data.data[0].data_evento, "UTC:dd/mm/yyyy"),          
        });   
        
        // this.setState({listEventos:data})
      }      
    })
    .catch(error=>{
      alert("Error server"+error)
    })
  }

  loadServicos(){
    // const url = baseUrl+"/cliente/list"
    let userId = this.props.match.params.id;  
 
    debugger;
    api.get(`/eventos/get/${userId}`)
     .then(res=>{
       if (res.data.success == true) {
         
         //console.log(' Evento - '+ JSON.stringify(res.data, null, "    ") );
         const data = res.data.data      
         this.setState({
           campeventoId: res.data.data[0].id,
           campordem_servico: res.data.data[0].ordem_servico,
           campnome_evento: res.data.data[0].nome_evento,
           campdata_evento: dateFormat(res.data.data[0].data_evento, "UTC:dd/mm/yyyy"),        
           embarque_longitude:  res.data.data[0].embarque_longitude, 
           desembarque_longitude:  res.data.data[0].desembarque_longitude, 
         });   
         
         // this.setState({listEventos:data})
       }      
     })
     .catch(error=>{
       alert("Error server"+error)
     })
   }
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  
  tipoChange(e) {  
    this.setState({ camptipoId: e.target.value })      
  }

  cartaoChange(e) {  
    this.setState({ campcartaoid: e.target.value })  
  }

  nomeChange(e) {  
    this.setState({ campNome: e.target.value })  
  }

  nomemotoristaChange(e) {  
    this.setState({ campnomemotorista: e.target.value })  
  }

  telefonemotoristaChange(e) {  
    this.setState({ camptelefonemotorista: celularMask(e.target.value)  })  
  }

  companhia_aereachange(e) {
    this.setState({ campCompanhia_aerea: e.target.value })  
  }

  numero_voochange(e) {
    this.setState({ campNumero_voo: e.target.value })  
  }

  verifica_menu() {

    if (this.state.perfil == 1) {
      return ( 
        <div>
            <Menu_administrador />                
         </div>   
       ); 
    } else if (this.state.perfil == 2) {
      return ( 
        <div>
            <Menu_cliente_individual />                
         </div>   
       ); 
    } else if (this.state.perfil == 7) {
      return ( 
        <div>
            <Menu_cliente_empresarial />                
         </div>   
       ); 
    } else if (this.state.perfil == null){
        return (
          <Menu />
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

  sendAtualizar(){      
   

     this.handleCloseModalEmbarque();
     this.handleCloseModalDesembarque();

  }  
  sendSave(){        
     
    this.setState({                
      validacao_data_servico: false,
      validacao_nome: false,   
    //  valor_oser: '0.192',
    //  valor_motorista: '0.768',         
    });

    debugger;

    if (this.state.incluir == true) {

          // this.calculo_bilingue();
          // this.calculo_receptivo();      

           const datapost_incluir = {
              tipoEventoId: this.state.tabIndex, 
              eventoId: this.state.campeventoId, 
              tipoTransporte: this.state.camptipoId,
              nome_passageiro: this.state.campNome, 
              telefone_passageiro: this.state.campTelefone1,
              quantidade_passageiro: this.state.campqtdpassageiro,  
              data_servico: moment(this.state.campdata_servico, "DD MM YYYY"),
              quantidade_diarias: this.state.campqtddiarias, 
              hora_inicial: this.state.camphora_inicial,  
              hora_final: this.state.camphora_final,  
              local_embarque: this.state.camplocalembarque, 
              local_desembarque: this.state.camplocaldesembarque, 
              embarque_latitude: this.state.embarque_latitude, 
              embarque_longitude: this.state.embarque_longitude, 
              desembarque_latitude: this.state.desembarque_latitude, 
              desembarque_longitude: this.state.desembarque_longitude, 
              //motorista_alocado: this.state.motorista_alocado, 
              distancia_value: this.state.campdistancia, 
              tempo_value: this.state.camptempovalue,
              companhia_aerea: this.state.campCompanhia_aerea,
              numero_voo: this.state.campNumero_voo, 
              motorista_bilingue: this.state.campbilingue, 
              motorista_receptivo: this.state.campreceptivo, 
              nome_motorista: this.state.campnomemotorista, 
              telefone_motorista: this.state.camptelefonemotorista, 
              km_translado: this.state.campdistancia, 
              tempo_translado: this.state.camptempo,
              cartaoId: this.state.campcartaoid,        
              valor_estimado: valorDoublemask(this.state.campvalor),    
              valor_oser: (parseFloat('0.192') * valorDoublemask(this.state.campvalor)).toFixed(2),
              valor_motorista: (parseFloat('0.768') * valorDoublemask(this.state.campvalor)).toFixed(2),                     
              //motivo_cancelamento: this.state.campNome,
              logid: localStorage.getItem('logid'),
              perfilId: 7,               
            }           
         
            // console.log('criar serviço - '+JSON.stringify(datapost_incluir, null, "    ")); 
             api.post('/servicos/create',datapost_incluir)
             .then(respevento=>{    
               if (respevento.data.success == true) {          

                //debugger;
                //console.log(`/servicos/totalservicos/${this.state.campeventoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`); 

                //api.get(`/servicos/totalservicos/${this.state.campeventoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
                //  .then(res=>{
                    
                  //  if (res.data.success == true) {
                    const total_estimado =  valorDoublemask(this.state.campvalor);
                    const valortotalviagens = valorDoublemask(this.state.valortotalviagens);
                    const total_visgens =  parseFloat(this.state.totalviagens) + parseFloat(1);
                    const valor_total = parseFloat(total_estimado) + parseFloat(valortotalviagens)

                      const datapost_alterar = {
                         logid: localStorage.getItem('logid'),
                         perfilId: 7,    
                         viagens_total: total_visgens,
                         valor_total: valor_total, 
                      }

                  //    console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
                      api.put(`/eventos/update/${this.state.campeventoId}`, datapost_alterar)
                      .then(respevento1=>{
                        if (respevento1.data.success==true) {    

                          this.setState({                
                            mensagem_usuario: 'Serviço incluído com sucesso!'
                           });
                        
                           this.verifica_botao(1);
                           this.handleCloseModalInclusao();
                           this.loadlistServicos();
                           this.valor_total_servicos();
                           this.valor_total_viagens();
                           this.envia_mensagemClick();  

                        } 
                        })                        
                        .catch(error=>{
                          alert("Error server 2 "+error)
                        })                    
                }              
              }).catch(error=>{
               alert("Erro sevico log  "+ error)
             })               
   
       //  console.log(' logperfil '+localStorage.getItem('logperfil'));   
      
   } else {
     const datapost_alterar = {     
      tipoEventoId: this.state.tabIndex, 
     // eventoId: this.state.campeventoId, 
      tipoTransporte: this.state.camptipoId,
      nome_passageiro: this.state.campNome, 
      telefone_passageiro: this.state.campTelefone1,
      quantidade_passageiro: this.state.campqtdpassageiro,  
      data_servico: moment(this.state.campdata_servico, "DD MM YYYY"),
      quantidade_diarias: this.state.campqtddiarias, 
      hora_inicial: this.state.camphora_inicial,  
      hora_final: this.state.camphora_final,  
      local_embarque: this.state.camplocalembarque, 
      local_desembarque: this.state.camplocaldesembarque, 
      embarque_latitude: this.state.embarque_latitude, 
      embarque_longitude: this.state.embarque_longitude, 
      desembarque_latitude: this.state.desembarque_latitude, 
      desembarque_longitude: this.state.desembarque_longitude, 
      distancia_value: this.state.campdistancia, 
      tempo_value: this.state.camptempovalue,
      //motorista_alocado: this.state.motorista_alocado, 
      companhia_aerea: this.state.campCompanhia_aerea,
      numero_voo: this.state.campNumero_voo, 
      motorista_bilingue: this.state.campbilingue, 
      motorista_receptivo: this.state.campreceptivo, 
      nome_motorista: this.state.campnomemotorista, 
      telefone_motorista: this.state.camptelefonemotorista, 
      km_translado: this.state.campdistancia, 
      tempo_translado: this.state.camptempo,
      cartaoId: this.state.campcartaoid,        
      valor_estimado: valorDoublemask(this.state.campvalor),    
      valor_oser: (parseFloat('0.192') * valorDoublemask(this.state.campvalor)).toFixed(2),
      valor_motorista: (parseFloat('0.768') * valorDoublemask(this.state.campvalor)).toFixed(2),                     
      //motivo_cancelamento: this.state.campNome,
      logid: localStorage.getItem('logid'),
      perfilId: 7,               
      }       

     console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
     api.put(`/servicos/update/${this.state.campservicoId}`, datapost_alterar)
     .then(response=>{

       if (response.data.success==true) {                    
         
               this.setState({                
                mensagem_usuario: 'Serviço alterado com sucesso!'
               });
            
               this.verifica_botao(1);
               this.handleCloseModalAlteracaoServico();
               this.loadlistServicos();
               this.valor_total_servicos();
               this.valor_total_viagens();
               this.envia_mensagemClick();  

       }
     }).catch(error=>{
       alert("Error 34 ")
     })

   }      
}  

verificar_tipo_servico() {

  if (this.state.tabIndex == 2 ) {
    return (
       <div className="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d">                              
                               <div className="checkbox_modal_descricao">Receptivo</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e"> 
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value={this.state.campreceptivo}
                                    control={<Switch color="primary" checked={this.state.campreceptivo} 
                                        onChange={this.receptivochange}                                        
                                        />}                                    
                                    labelPlacement="end"
                                  />                       
                                </FormGroup>
                           </div>
                        </div> 
    );            
  }
}

verifica_rota(inicio) {
  const { validate } = this.state 

  console.log(' inicio verifica_rota - '+JSON.stringify(this.state, null, "    "))

  if (inicio == 1) {
    
    /* this.state.validacao_tipo == true ||     
    || this.state.validacao_localembarque == true || this.state.validacao_localdesembarque == true 
          || this.state.validacao_qtdpassageiro == true
          || this.state.validacao_Telefone1 == true
     */
      if (this.state.camplocalembarque !== "" || this.state.camplocaldesembarque !== "") { 
        //this.state.validacao_hora_inicial == true  && this.state.validacao_hora_final == true  ) { 
        return (
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendAtualizar()}>
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


  verifica_botao(inicio) {
    const { validate } = this.state 

    //console.log(' inicio verifica_botao - '+JSON.stringify(this.state, null, "    "))

    if (inicio == 1) {
      
      /* this.state.validacao_tipo == true ||     
      || this.state.validacao_localembarque == true || this.state.validacao_localdesembarque == true 
            || this.state.validacao_qtdpassageiro == true
            || this.state.validacao_Telefone1 == true
       */
        if (this.state.validacao_tipo == true && this.state.validacao_qtdpassageiro == true && this.state.validacao_data_servico == true 
          && this.state.validacao_nome == true && this.state.validacao_telefone1 == true && 
          this.state.validacao_hora_inicial == true && this.state.validacao_localembarque == true && 
          this.state.validacao_localdesembarque == true && this.state.campcartaoid !== '' && this.state.mensagem_servico === "") { 
          //this.state.validacao_hora_inicial == true  && this.state.validacao_hora_final == true  ) { 
          return (
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_evento_modal"  p={2} onClick={()=>this.sendSave()}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar </label>
                    </div>     
              </Box>           
          );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_evento_modal"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar </label>
                    </div>     
              </Box>           
          );                   
        }
    } else {
      return (
        
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_evento_modal"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar </label>
                </div>     
          </Box>           
      );                   
    } 

  }  
 
  verifica_botao_maps(inicio) {
    const { validate } = this.state 

    if (inicio == 1) {
      
        if (this.state.validacao_ordem_servico == true || this.state.validacao_data_evento == true 
          || this.state.validacao_nome_evento == true ) { 
          return (
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_evento_modal"  p={2} onClick={()=>this.sendLocalSave()}>
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



  /*
  obtendo_latitude_longitude() {
  
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '') {
   
      this.setState({ 
        campdistancia: '', 
        camptempovalue: '',
        camptempo: '',                   
      });    

       distance.apiKey = 'AIzaSyBcFfTH-U8J-i5To2vZ3V839pPaeZ59bQ4';
       distance.get(
        {
          origin: this.state.camplocalembarque.label,
          destination: this.state.camplocaldesembarque.label,
          mode: 'driving',
          units: 'metric',
          language : 'pt-BR',          
        },
        function(err, data) {
          this.setState({ 
            campdistancia: (data.rows[0].elements[0].distance.value / 1000).toFixed(0), 
            camptempovalue: (data.rows[0].elements[0].duration.value / 60).toFixed(0),
            camptempo: this.formatar_valor(data.rows[0].elements[0].duration.text),                   
          });    
      });    
      } 

  }
  */
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  
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

  teste_mensagem() {

    if (this.state.mensagem_servico !== "") {
      return (
        <div class="p-2 font_mensagem_erro"> 
          <Collapse in={this.state.mensagem_error}>
          <Alert
            severity="error" 
            action={
              <IconButton
                aria-label="close"
                color="primary"
                size="small"
                onClick={() => {
                  this.setState({        
                    mensagem_error: false
                  });
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
          {this.state.mensagem_servico}
          </Alert>
        </Collapse>        
      </div>        
      );   
    }
  }

  verificaNome() {
    const { validate } = this.state
       if (this.state.campNome.length == 0) {        
        this.setState({ 
       //   validate,
          erro_nome: false,   
          validacao_nome: false,    
          mensagem_nome: ''  
         })      
       } else {         

        this.setState({ 
          erro_nome: false,   
          validacao_nome: true,    
          mensagem_nome: ''
       });  

       }         
   }

  validaNomeChange(e){
  //  const { validate } = this.state
    
      if (e.target.value.length == 0) {      
        this.setState({ 
          erro_nome: false,   
          validacao_nome: false,    
          mensagem_nome: '' 
        })  
      } else if (e.target.value.length > 0) {              
        this.setState({ 
          erro_nome: false,   
          validacao_nome: false,    
          mensagem_nome: '',
          inicio: 1
         })  
      }  
    //  this.setState({ validate })  
  }

  verificaData_Evento(e) {    
    if (e.target.value.length == 0) {        
     this.setState({                   
       inicio: 1,
       erro_data_evento: false,   
       validacao_data_evento: false,    
      })            
    } else if (e.target.value.length == 10) {        
  
      let date_validar = e.target.value;
      var dia = date_validar.substr(0,2);
      var mes = date_validar.substr(3,2);         
  
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
         mensagem_data_evento: 'Mês é inválido.' 
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
  render()
  {
    //const [value1, setValue1] = useState(null);
    return (
      <div>   

          {this.verifica_menu()}
          <div className="titulo_lista_servicos">     
            <div className="unnamed-character-style-4 descricao_admministrador">      
            <table>
             <tr>
                <td colSpan="2" className="espaco_voltar">
                <a href={"/lista_evento/list"}><img src="/voltar@2x.png" width="14" height="27"/></a>
                </td> 
              <td> <div className="titulo_bemvindo">  {this.state.campnome_evento} </div>
              <div>
              <a onClick={()=>this.handleOpenModalAlteracaoEvento()} className="font_link_alterar">           
                  Editar Evento  
             </a>  
             </div>
            </td> </tr>
            </table>                      
              
            </div>      
           </div>

          <div className="titulo_admministrador">
          <div className="unnamed-character-style-4 descricao_admministrador_servico">          
              
            <div class="p-2">               
                <div class="d-flex justify-content-start titulo_area_descricao_servico">
                      <div> 
                          <img src='/icon-calendar-157837097.jpg' style={{ width: '30px', height: '30px', marginTop: '17px' }}/>                           
                      </div>                      
                      <div class="p-2">
                        <div className="servico_titulo">Ordem Serviço</div>                        
                        <div className="servico_descricao_evento">{this.state.campordem_servico}</div>                                                     
                      </div>   
                      <div class="p-2">
                        <div className="servico_titulo">Data Evento</div>       
                        <div className="servico_descricao_evento">{this.state.campdata_evento}</div>                             
                      </div>
                      <div className="area_evento_4_empresa"> 
                        <img src='/tour.png' style={{ width: '30px', height: '30px', marginTop: '17px' }}/>                
                      </div>
                      <div class="p-2"> 
                      <div className="servico_titulo">Total de Viagens</div>       
                                 <div className="servico_descricao_evento">{this.state.totalviagens}</div>          
                      </div>
                      <div className="area_evento_4_empresa"> 
                        <img src='/Group_1157.png' style={{ width: '30px', height: '30px', marginTop: '17px' }}/>                
                      </div>
                      <div class="p-2"> 
                      <div className="servico_titulo">Custos</div>       
                       <div className="servico_descricao_evento">R$ {this.state.valortotalviagens}</div>  
                      </div>
                  </div>  
              </div>         
          </div> 
        </div>
        <div className="container-fluid margem_left">       
      <div className="selecao_tabs">       
      <TabContext value={this.state.value} className="tabs_padrao">
        <AppBar position="static" color="transparent">
          <TabList onChange={this.opcao_tabChange} aria-label="simple tabs example">
            <Tab label="Ativos" value="1" className="tabs_titulo_lista"/>          
            <Tab label="Finalizados" value="2" className="tabs_titulo_lista_2"/>          
          </TabList>
        </AppBar>
        
        <TabPanel value="1" className="tirar_espaco">
           <div style={{ maxWidth: '96%' }}>
                        <MaterialTable          
                            title=""
                            //style=""
                            columns={[
                              { title: '', field: '', width: '50px', minWidth: '50px', maxWidth: '50px', align: 'center' },   
                              { title: 'Dt Inclusão', field: 'createdAt', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => dateFormat(rowData.createdAt, "UTC:dd/mm/yyyy") },
                              { title: '', field: 'tipoEventoId', width: '60px', minWidth: '60px', maxWidth: '60px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.tipoEventoId == 1 ? 
                              <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Diária</div> : <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Translado</div> },                              
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', align: 'center' },   
                              { title: 'Nome do Passageiro', field: 'nome_passageiro', width: '300px', minWidth: '300px', maxWidth: '300px' },
                              { title: 'Dt Serviço', field: 'data_servico', width: '90px', minWidth: '90px', maxWidth: '90px', render: rowData => dateFormat(rowData.data_servico, "UTC:dd/mm/yyyy") },
                              { title: 'Horário', field: 'hora_inicial', width: '60px', minWidth: '60px', maxWidth: '60px',  render: rowData => rowData.hora_inicial.substring(0,5) },                                                                                  
                              { title: 'Passageiros', field: 'quantidade_passageiro', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },                                                                                  
                              { title: 'Distância', field: 'km_translado', width: '80px', minWidth: '80px', maxWidth: '80px', align: 'right' },                                                                                  
                              { title: 'Tempo', field: 'tempo_translado', width: '90px', minWidth: '90px', maxWidth: '90px', align: 'right' },
                              { title: 'Valor Total', field: 'valor_estimado', width: '100px', minWidth: '100px', maxWidth: '100px', align: 'right', render: rowData => valorMask(rowData.valor_estimado) },   
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', align: 'center' },   
                              { title: '', field: 'motorista_bilingue', width: '70px', minWidth: '70px', maxWidth: '70px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_bilingue == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Bilingue</div> : "" },                               
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', align: 'center' },   
                              { title: '', field: 'motorista_receptivo', width: '70px', minWidth: '70px', maxWidth: '70px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_receptivo == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px'}}>Receptivo</div> : "" },                                                             
                              { title: 'Alocado', field: '', width: '50px', minWidth: '50px', maxWidth: '50px', align: 'center', render: rowData => rowData.alocado == true ?  <img src='/bola-verde.png' style={{ width: '20px', height: '20px' }}/>  : <img src='/bola-cinza.jpg' style={{ width: '30px', height: '20px' }} onClick={()=>this.handleOpenModalMotorista()}  /> },
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', lookup: { 1: 'sadas', 2: 'asdas' },                              
                             },            
                            ]}
                            data={this.state.listservicoseventos}   
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
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_eventos_Ativos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,     
                              maxBodyHeight: 450,
                              minBodyHeight: 450, 
                              padding: 'dense',   
                              overflowY: 'scroll',
                             // maxBodyHeight: 400,
                             // resizable: false,
                              //headerStyle: { position: 'sticky', top: 0 },
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 16,
                             // pageSize: 7,
                              pageSizeOptions: [0],                 
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                tooltip: 'editar',                                
                                onClick: (evt, data) => this.handleOpenModalAlteracaoServico(data)
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
           <div style={{ maxWidth: '100%' }}>
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '', width: '50px', minWidth: '50px', maxWidth: '50px', align: 'center' },   
                              { title: 'Dt Inclusão', field: 'createdAt', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => dateFormat(rowData.createdAt, "UTC:dd/mm/yyyy") },
                              { title: '', field: 'tipoEventoId', width: '60px', minWidth: '60px', maxWidth: '60px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.tipoEventoId == 1 ? 
                              <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Diária</div> : <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Translado</div> },                              
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', align: 'center' },   
                              { title: 'Nome do Passageiro', field: 'nome_passageiro', width: '300px', minWidth: '300px', maxWidth: '300px' },
                              { title: 'Dt Serviço', field: 'data_servico', width: '90px', minWidth: '90px', maxWidth: '90px', render: rowData => dateFormat(rowData.data_servico, "UTC:dd/mm/yyyy") },
                              { title: 'Horário', field: 'hora_inicial', width: '60px', minWidth: '60px', maxWidth: '60px',  render: rowData => rowData.hora_inicial.substring(0,5) },                                                                                  
                              { title: 'Passageiros', field: 'quantidade_passageiro', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },                                                                                  
                              { title: 'Distância', field: 'km_translado', width: '80px', minWidth: '80px', maxWidth: '80px', align: 'right' },                                                                                  
                              { title: 'Tempo', field: 'tempo_translado', width: '90px', minWidth: '90px', maxWidth: '90px', align: 'right' },
                              { title: 'Valor Total', field: 'valor_estimado', width: '100px', minWidth: '100px', maxWidth: '100px', align: 'right', render: rowData => valorMask(rowData.valor_estimado) },   
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', align: 'center' },   
                              { title: '', field: 'motorista_bilingue', width: '70px', minWidth: '70px', maxWidth: '70px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_bilingue == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Bilingue</div> : "" },                               
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', align: 'center' },   
                              { title: '', field: 'motorista_receptivo', width: '70px', minWidth: '70px', maxWidth: '70px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_receptivo == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px'}}>Receptivo</div> : "" },                                                             
                              { title: 'Alocado', field: '', width: '50px', minWidth: '50px', maxWidth: '50px', align: 'center', render: rowData => rowData.alocado == true ?  <img src='/bola-verde.png' style={{ width: '20px', height: '20px' }}/>  : <img src='/bola-cinza.jpg' style={{ width: '30px', height: '20px' }} onClick={()=>this.handleOpenModalMotorista()}  /> },
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', lookup: { 1: 'sadas', 2: 'asdas' },                              
                             },                 
                            ]}
                            data={this.state.listServicos}   
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
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_eventos_Ativos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,     
                              maxBodyHeight: 450,
                              minBodyHeight: 450, 
                              padding: 'dense',   
                              overflowY: 'scroll',
                             // maxBodyHeight: 400,
                             // resizable: false,
                              //headerStyle: { position: 'sticky', top: 0 },
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 14,
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
      </TabContext>        

   </div> 
        </div>
             <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize',  outline: 'none' }} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
                            <AddIcon/> <div className="botao_incluir"> Adicionar Serviços </div>
                        </Fab>
                      </div>    

       <ReactModal 
        isOpen={this.state.showModalAlteracaoEvento}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Alterar Eventos
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalAlteracaoEvento()} className="botao_close_incluir_evento_modal">
              <CloseOutlinedIcon />
            </IconButton></div>             
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
                              maxLength: 10,
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
                                      maxLength: 50,
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

                    {this.verifica_botao(this.state.inicio)}       

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
               <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Serviço? </div>
               <div className="titulo_moldura_modal_delecao_2">Ao confirmar a exclusão o registro será apagado.  </div>
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
        isOpen={this.state.showMostraMotorista}
        style={ConfirmacaodelStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div> 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalMotorista()} className="botao_close_modal_deletar">
              <CloseOutlinedIcon />
            </IconButton></div>                  
            <div className="container_alterado">             
            
           

            </div>
         </ReactModal>           
         <ReactModal 
        isOpen={this.state.showModalAlteracaoServico}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
              <div className="container-fluid">
                  <div className="row">
                    <div className="col-10 altura_titulo">
                         Alterar Serviços          
                    </div>
                    <div className="col-1">
                      <IconButton aria-label="editar" onClick={()=>this.handleCloseModalAlteracaoServico()} >
                        <CloseOutlinedIcon />
                      </IconButton></div>        
                      {this.teste_mensagem()}  
                    </div>                               
                  </div>
                </div>            
          <div>
          <div className="row modal-body">    
          
              <div class="p-2">  
              <TabContext value={this.state.tabIndex} className="tabs_padrao">
              <div>                  
                <AppBar position="static" color="transparent" >
                  <TabList onChange={(e, index) => this.setState({ tabIndex: index })} aria-label="simple tabs example">
                    <Tab label="Translado" value="2" className="tabs_titulo_lista"/>          
                    <Tab label="Diária" value="1" className="tabs_titulo_lista_2"/>          
                  </TabList>
                </AppBar>
              </div>
          
                <TabPanel value="2" className="tirar_espaco_modal">
                <div class="p-2">  
                <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_modal_tipo"
                          error={this.state.erro_tipo} 
                          helperText={this.state.mensagem_tipoId}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.camptipoId}
                          onFocus={this.verificaTipo_veiculo}
                          onClick={this.verificaTipo_veiculo}
                          onChange={ (e) => {
                            this.tipoChange(e)
                          }}   
                          
                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_tipo? <CheckIcon />: ''}
                            </InputAdornment>
                          }     
                          label="Tipo Transporte"
                          labelWidth={240}
                        >
                          {this.loadFillTipoData()}                    
                        </Select>
                      </FormControl>                                                                  
               </div>            
               <div class="p-2">
                  <FormControl variant="outlined" className="data_text_servico">
                              <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome do Passageiro</InputLabel>
                              <OutlinedInput
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_nome}
                                  helperText={this.state.mensagem_cpf}
                                  className="data_text_servico"                           
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
                                labelWidth={100}
                              />                         
                        </FormControl>    
               </div>
               <div class="p-2">  
                   <div class="d-flex justify-content-start">
                       <div>   
                       <FormControl variant="outlined" className="input_modal_direita">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Telefone</InputLabel>
                          <OutlinedInput   
                              autoComplete="off"           
                              readOnly={this.state.camp_telefone_disabled}            
                              error={this.state.erro_telefone}
                              helperText={this.state.mensagem_telefone1}
                              className="input_modal_direita"                       
                              id="outlined-basic"                   
                              variant="outlined"
                              value={this.state.campTelefone1}                
                              onBlur={this.verificaTelefone1}                            
                              onChange={ (e) => {
                                this.telefone1change(e)                       
                                this.validatelefone1Change(e)
                              }}                                      
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_telefone1? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={80}                      
                          />
                        <FormHelperText error={this.state.erro_telefone}>
                              {this.state.mensagem_telefone1}
                        </FormHelperText>
                      </FormControl>        
                      
                      </div>
                      <div>
                      <FormControl variant="outlined" className="input_modal_esquerda">
                              <InputLabel className="label_modal_esquerda" 
                                    htmlFor="filled-adornment-password">Número Total de Passageiros</InputLabel>
                              <OutlinedInput      
                                  autoComplete="off"                                                      
                                  error={this.state.erro_qtdpassageiro}
                                  helperText={this.state.mensagem_qtdpassageiro}
                                  className="input_modal_esquerda"                      
                                  id="outlined-basic"                   
                                  variant="outlined"
                                  value={this.state.campqtdpassageiro}          
                                  onBlur={this.verificaQtdPassageiros}
                                  onFocus={this.verificaQtdPassageiros}                        
                                  onChange={ (e) => {
                                    this.qtdpassageiroschange(e)                                                           
                                  }}                                    
                                  inputProps={{
                                    maxLength: 3,
                                  }}     
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_qtdpassageiro? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={180}                      
                              />
                            <FormHelperText error={this.state.erro_qtdpassageiro}>
                                  {this.state.mensagem_qtdpassageiro}
                            </FormHelperText>
                          </FormControl>  
                      </div>
                  </div>        
              </div> 
              <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl variant="outlined" className="input_modal_direita">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Data do Serviço</InputLabel>
                          <OutlinedInput   
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_data_servico}
                                  helperText={this.state.mensagem_data_servico}
                                  className="input_modal_direita"                           
                                  id="nome_incluir"                   
                                  variant="outlined"
                                  value={this.state.campdata_servico}                                              
                                  onChange={ (e) => {
                                    this.data_servicochange(e)                   
                                    this.validaDataServicoChange(e)                                              
                                  }}  
                                  inputProps={{
                                    maxLength: 10,
                                  }}                      
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_data_servico? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={150}
                              />  
                                  <FormHelperText error={this.state.erro_data_servico}>
                                        {this.state.mensagem_data_servico}
                                  </FormHelperText>                       
                        </FormControl>                                
                              </div>    
                              <div>
                              <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Hora do Serviço</InputLabel>
                                    <OutlinedInput         
                                        type="time"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_inicial}
                                        helperText={this.state.mensagem_hora_inicial}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_inicial}                                      
                                        onKeyUp={this.verificahora_inicial} 
                                        onChange={ (e) => {
                                          this.hora_inicialchange(e)                                                                 
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
                                        {this.state.mensagem_hora_inicial}
                                  </FormHelperText>
                                </FormControl>  
                              </div>                
                      </div>    
                    </div>

                </TabPanel>
                <TabPanel value="1" className="tirar_espaco_modal">
                <div class="p-2">  
                <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_modal_tipo"
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
                          labelWidth={240}
                        >
                          {this.loadFillTipoData()}                    
                        </Select>
                      </FormControl>                                                                    
               </div>            
               <div class="p-2">
               <FormControl variant="outlined" className="data_text_servico">
                              <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome do Passageiro</InputLabel>
                              <OutlinedInput
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_nome}
                                  helperText={this.state.mensagem_cpf}
                                  className="data_text_servico"                           
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
                                labelWidth={100}
                              />                         
                        </FormControl>        
               </div>
               <div class="p-2">  
                   <div class="d-flex justify-content-start">
                       <div>   
                       <FormControl variant="outlined" className="input_modal_direita">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Telefone</InputLabel>
                          <OutlinedInput   
                              autoComplete="off"           
                              readOnly={this.state.camp_telefone_disabled}            
                              error={this.state.erro_telefone}
                              helperText={this.state.mensagem_telefone1}
                              className="input_modal_direita"                       
                              id="outlined-basic"                   
                              variant="outlined"
                              value={this.state.campTelefone1}                
                              onBlur={this.verificaTelefone1}                            
                              onChange={ (e) => {
                                this.telefone1change(e)                       
                                this.validatelefone1Change(e)
                              }}                                      
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_telefone1? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={80}                      
                          />
                        <FormHelperText error={this.state.erro_telefone}>
                              {this.state.mensagem_telefone1}
                        </FormHelperText>
                      </FormControl>    
                      
                      </div>
                      <div>
                      <FormControl variant="outlined" className="input_modal_esquerda">
                              <InputLabel className="label_modal_esquerda" 
                                    htmlFor="filled-adornment-password">Número Total de Passageiros</InputLabel>
                              <OutlinedInput      
                                  autoComplete="off"                                                      
                                  error={this.state.erro_qtdpassageiro}
                                  helperText={this.state.mensagem_qtdpassageiro}
                                  className="input_modal_esquerda"                      
                                  id="outlined-basic"                   
                                  variant="outlined"
                                  value={this.state.campqtdpassageiro}          
                                  onBlur={this.verificaQtdPassageiros}
                                  onFocus={this.verificaQtdPassageiros}                        
                                  onChange={ (e) => {
                                    this.qtdpassageiroschange(e)                                                           
                                  }}                                    
                                  inputProps={{
                                    maxLength: 3,
                                  }}     
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_qtdpassageiro? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={180}                      
                              />
                            <FormHelperText error={this.state.erro_qtdpassageiro}>
                                  {this.state.mensagem_qtdpassageiro}
                            </FormHelperText>
                          </FormControl> 
                      </div>
                  </div>        
              </div> 
              <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                          <FormControl variant="outlined" className="input_modal_direita">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Data do Serviço</InputLabel>
                          <OutlinedInput   
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_data_servico}
                                  helperText={this.state.mensagem_data_inicio}
                                  className="input_modal_direita"                           
                                  id="nome_incluir"                   
                                  variant="outlined"
                                  value={this.state.campdata_servico}                                              
                                  onChange={ (e) => {
                                    this.data_servicochange(e)                   
                                    this.validaDataServicoChange(e)                                              
                                  }}  
                                  inputProps={{
                                    maxLength: 10,
                                  }}                      
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_data_servico? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={150}
                              />                                                
                        </FormControl>               
                              </div>    
                              <div>
                              <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Hora Inicial</InputLabel>
                                    <OutlinedInput         
                                        type="time"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_inicial}
                                        helperText={this.state.mensagem_hora_inicial}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_inicial}                                       
                                        onChange={ (e) => {
                                          this.hora_inicialchange(e)                                                                 
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
                                        {this.state.mensagem_hora_inicial}
                                  </FormHelperText>
                                </FormControl>  
                              </div>                
                      </div>    
                    </div>
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_modal_direita" variant="outlined">
                                    <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Hora Final</InputLabel>
                                    <OutlinedInput    
                                        type="time"       
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_final}
                                        helperText={this.state.mensagem_hora_final}
                                        className="input_modal_direita"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_final}                                    
                                        onChange={ (e) => {
                                          this.hora_finalchange(e)                                                                 
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_hora_final? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_hora_final}>
                                        {this.state.mensagem_hora_final}
                                  </FormHelperText>
                                </FormControl>  
                              </div>    
                              <div>
                              <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Qtd de Diárias</InputLabel>
                                    <OutlinedInput         
                                        type="text"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_final}
                                        helperText={this.state.mensagem_data_inicio}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campqtddiarias}                                     
                                        onChange={ (e) => {
                                          this.qtdDiariaschange(e)                                                                 
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
                </TabPanel>

               </TabContext>
              </div>
              <div className="alinha_campos">              
                    <div class="p-2">           
                    <table style={{width: '70%'}}>
                      <tr><td> 
                           <div className="checkbox_modal_descricao">Local de Embarque</div>
                           </td>                            
                           <td className="font_link_alterar"> 
                               <a onClick={()=>this.handleOpenModalEmbarque()} className="font_link_alterar">Alterar</a> 
                           </td> 
                           </tr>
                        <tr>
                          <td rowSpan="2">                           
                           <div style={{width: '70%'}}>
                               { this.mostrar_endereco_selecionado_embarque() } 
                               
                              </div>
                           </td>
                         </tr>   
                    </table>
                  </div>
                  
                    <div class="p-2">
                    <table style={{width: '70%'}}>
                      <tr><td> 
                           <div className="checkbox_modal_descricao">Local de Desembarque</div>
                           </td>                            
                           <td className="font_link_alterar"> 
                               <a onClick={()=>this.handleOpenModalDesembarque()} className="font_link_alterar">Alterar</a> 
                           </td> 
                           </tr>
                        <tr>
                          <td rowSpan="2">
                          { this.mostrar_endereco_selecionado_desembarque() }                           
                           </td>
                         </tr>   
                    </table>
                  
                    </div>              

                    <div class="p-2">
                    <div className="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d">                                                             
                               <div className="checkbox_modal_descricao">Motorista deve fala Inglês?</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e">                             
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value={this.state.campbilingue}
                                    control={<Switch color="primary" checked={this.state.campbilingue} 
                                        onChange={this.bilinguechange}
                                     //   onBlur={this.calculo_bilingue}
                                        />}                                    
                                    labelPlacement="end"
                                  />                       
                                </FormGroup>
                           </div>
                        </div> 
                    </div>

                    <div class="p-2">
                      {this.verificar_tipo_servico()}
                    </div>
                    <div class="p-2">
                    <table style={{width: '70%'}}>
                      <tr><td> 
                           <div className="checkbox_modal_dados_voo">Dados do vôo</div>
                           </td>         
                           </tr>                       
                     </table>     
                     <br/>
                     <table style={{width: '70%'}}>      
                       <tr>
                          <td className="input_modal_voo">
                          <FormControl className="input_modal_direita" variant="outlined">
                                    <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Companhia Aérea</InputLabel>
                                    <OutlinedInput    
                                        type="text"       
                                        autoComplete="off"                       
                                        error={this.state.erro_companhia_aerea}
                                        helperText={this.state.mensagem_companhia_aerea}
                                        className="input_modal_direita"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campCompanhia_aerea}                                    
                                        onChange={ (e) => {
                                          this.companhia_aereachange(e)                                                                 
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_companhia_aerea? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_companhia_aerea}>
                                        {this.state.mensagem_companhia_aerea}
                                  </FormHelperText>
                                </FormControl>  
                           </td>
                           <td className="input_modal_voo">
                           <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Número do Vôo</InputLabel>
                                    <OutlinedInput         
                                        type="text"  
                                        autoComplete="off"                       
                                        error={this.state.erro_numero_voo}
                                        helperText={this.state.mensagem_numero_voo}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campNumero_voo}                                     
                                        onChange={ (e) => {
                                          this.numero_voochange(e)                                                                 
                                        }}                                    
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          maxLength: 10,
                                         
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_numero_voo? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_numero_voo}>
                                        {this.state.mensagem_numero_voo}
                                  </FormHelperText>
                                </FormControl>  

                           </td>
                         </tr>   
                    </table>      
                    </div>               

                    <div class="p-2">                      
                      <table style={{width: '70%'}}>
                      <tr><td> 
                           <div className="checkbox_modal_dados_voo">Motorista Preferencial</div>
                           </td>   
                           </tr>                       
                     </table>     
                     <br/>
                     <table style={{width: '70%'}}>      
                       <tr>
                          <td className="input_modal_voo">
                          <FormControl className="input_modal_direita" variant="outlined">
                                    <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Nome</InputLabel>
                                    <OutlinedInput    
                                        type="text"       
                                        autoComplete="off"                       
                                        error={this.state.erro_nome_motorista}
                                        helperText={this.state.mensagem_nome_motorista}
                                        className="input_modal_direita"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campnomemotorista}                                    
                                        onChange={ (e) => {
                                          this.nomemotoristaChange(e)                                                                 
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_nome_motorista? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_nome_motorista}>
                                        {this.state.mensagem_nome_motorista}
                                  </FormHelperText>
                                </FormControl>  
                           </td>
                           <td className="input_modal_voo">
                           <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Telefone</InputLabel>
                                    <OutlinedInput         
                                        type="text"  
                                        autoComplete="off"                       
                                        error={this.state.erro_telefone_motorista}
                                        helperText={this.state.mensagem_telefone_motorista}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camptelefonemotorista}                                     
                                        onChange={ (e) => {
                                          this.telefonemotoristaChange(e)                                                                 
                                        }}                                    
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          maxLength: 4,
                                         
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_telefone_motorista? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_telefone_motorista}>
                                        {this.state.mensagem_telefone_motorista}
                                  </FormHelperText>
                                </FormControl>  
                           </td>
                         </tr>   
                    </table>    
                    </div>
                    <div class="p-2">
                      <div className="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d">                              
                               <div className="checkbox_modal_descricao">Cartão Escolhido</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e"> 
                                <a onClick={()=>this.handleOpenModalInclusaoCartao()} className="font_link_alterar">Adicionar</a> 
                           </div>
                        </div>                       
                     <br/>                       
                        <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Cartão</InputLabel>
                        <Select
                          className="text_select_modal_tipo"
                          error={this.state.erro_cartao} 
                          helperText={this.state.mensagem_cartao}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.campcartaoid}
                          onFocus={this.verificaCartao}
                          //onClick={this.verificaTipo_veiculo}
                          onChange={ (e) => {
                            this.cartaoChange(e)
                          }}   
                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_cartao? <CheckIcon />: ''}
                            </InputAdornment>
                          }                             
                          labelWidth={240}
                        >
                          {this.loadFillData()}                    
                        </Select>
                      </FormControl>    
                    </div>
                </div>
           </div> 
           <div className="container-fluid">
                   <div>
                    <div className="botao_servico_fixo">
                          <table className="margin_total_servicos">
                              <tr className="titulo_total_servicos"><td className="tamanho_coluna">Distância Total</td>
                                <td className="tamanho_coluna_tempo">Tempo Total</td>
                                <td className="tamanho_coluna">Valor Total</td></tr>                
                              <tr className="resultado_total_servicos">
                                                  <td>{this.state.campdistancia} km</td>
                                <td>{this.state.camptempo}</td>
                                <td>R$ {this.state.campvalor}</td>
                                </tr>               
                          </table>
                      {this.verifica_botao(this.state.inicio)}         
                        </div>        
                    </div>                    
           </div> 

      
           
        </div>   
       </ReactModal>  


       <ReactModal 
        isOpen={this.state.showModalInclusao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
             <div className="container-fluid">
                  <div className="row">
                    <div className="col-10 altura_titulo">
                       Incluir Serviços                       
                    </div>
                    <div className="col-1">
                      <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()} >
                        <CloseOutlinedIcon />
                      </IconButton></div>        
                         {this.teste_mensagem()}  
                    </div>                               
                  </div>
                </div> 
          <div>
          <div className="row modal-body">                      
              <div class="p-2">             
              <TabContext value={this.state.tabIndex} className="tabs_padrao">
              <div>                
  
                  <AppBar position="static" color="transparent" >
                    <TabList onChange={(e, index) => this.setState({ tabIndex: index })} aria-label="simple tabs example">
                      <Tab label="Translado" value="2" className="tabs_titulo_lista"/>          
                      <Tab label="Diária" value="1" className="tabs_titulo_lista_2"/>          
                    </TabList>
                  </AppBar>

              </div>
         
                <TabPanel value="2" className="tirar_espaco_modal">
                <div class="p-2">  
                <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_modal_tipo"
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
                          labelWidth={240}
                        >
                          {this.loadFillTipoData()}                    
                        </Select>
                      </FormControl>                                                                  
               </div>            
               <div class="p-2">
                  <FormControl variant="outlined" className="data_text_servico">
                              <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome do Passageiro</InputLabel>
                              <OutlinedInput
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_nome}
                                  helperText={this.state.mensagem_cpf}
                                  className="data_text_servico"                           
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
                                labelWidth={100}
                              />                         
                        </FormControl>    
               </div>
               <div class="p-2">  
                   <div class="d-flex justify-content-start">
                       <div>   
                       <FormControl variant="outlined" className="input_modal_direita">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Telefone</InputLabel>
                          <OutlinedInput   
                              autoComplete="off"           
                              readOnly={this.state.camp_telefone_disabled}            
                              error={this.state.erro_telefone}
                              helperText={this.state.mensagem_telefone1}
                              className="input_modal_direita"                       
                              id="outlined-basic"                   
                              variant="outlined"
                              value={this.state.campTelefone1}                
                              onBlur={this.verificaTelefone1}                            
                              onChange={ (e) => {
                                this.telefone1change(e)                       
                                this.validatelefone1Change(e)
                              }}                                      
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_telefone1? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={80}                      
                          />
                        <FormHelperText error={this.state.erro_telefone}>
                              {this.state.mensagem_telefone1}
                        </FormHelperText>
                      </FormControl>        
                      
                      </div>
                      <div>
                      <FormControl variant="outlined" className="input_modal_esquerda">
                              <InputLabel className="label_modal_esquerda" 
                                    htmlFor="filled-adornment-password">Número Total de Passageiros</InputLabel>
                              <OutlinedInput      
                                  autoComplete="off"                                                      
                                  error={this.state.erro_qtdpassageiro}
                                  helperText={this.state.mensagem_qtdpassageiro}
                                  className="input_modal_esquerda"                      
                                  id="outlined-basic"                   
                                  variant="outlined"
                                  value={this.state.campqtdpassageiro}          
                                  onBlur={this.verificaQtdPassageiros}
                                  onFocus={this.verificaQtdPassageiros}                        
                                  onChange={ (e) => {
                                    this.qtdpassageiroschange(e)                                                           
                                  }}                                    
                                  inputProps={{
                                    maxLength: 3,
                                  }}     
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_qtdpassageiro? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={180}                      
                              />
                            <FormHelperText error={this.state.erro_qtdpassageiro}>
                                  {this.state.mensagem_qtdpassageiro}
                            </FormHelperText>
                          </FormControl>  
                      </div>
                  </div>        
              </div> 
              <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl variant="outlined" className="input_modal_direita">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Data do Serviço</InputLabel>
                          <OutlinedInput   
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_data_servico}
                                  helperText={this.state.mensagem_data_servico}
                                  className="input_modal_direita"                           
                                  id="nome_incluir"                   
                                  variant="outlined"
                                  value={this.state.campdata_servico}                                              
                                  onChange={ (e) => {
                                    this.data_servicochange(e)                   
                                    this.validaDataServicoChange(e)                                              
                                  }}  
                                  inputProps={{
                                    maxLength: 10,
                                  }}                      
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_data_servico? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={150}
                              />  
                                  <FormHelperText error={this.state.erro_data_servico}>
                                        {this.state.mensagem_data_servico}
                                  </FormHelperText>                       
                        </FormControl>                                
                              </div>    
                              <div>
                              <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Hora do Serviço</InputLabel>
                                    <OutlinedInput         
                                        type="time"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_inicial}
                                        helperText={this.state.mensagem_hora_inicial}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_inicial}                                      
                                        onKeyUp={this.verificahora_inicial} 
                                        onChange={ (e) => {
                                          this.hora_inicialchange(e)                                                                 
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
                                        {this.state.mensagem_hora_inicial}
                                  </FormHelperText>
                                </FormControl>  
                              </div>                
                      </div>    
                    </div>

                </TabPanel>
                <TabPanel value="1" className="tirar_espaco_modal">
                <div class="p-2">  
                <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_modal_tipo"
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
                          labelWidth={240}
                        >
                          {this.loadFillTipoData()}                    
                        </Select>
                      </FormControl>                                                                    
               </div>            
               <div class="p-2">
               <FormControl variant="outlined" className="data_text_servico">
                              <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome do Passageiro</InputLabel>
                              <OutlinedInput
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_nome}
                                  helperText={this.state.mensagem_cpf}
                                  className="data_text_servico"                           
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
                                labelWidth={100}
                              />                         
                        </FormControl>        
               </div>
               <div class="p-2">  
                   <div class="d-flex justify-content-start">
                       <div>   
                       <FormControl variant="outlined" className="input_modal_direita">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Telefone</InputLabel>
                          <OutlinedInput   
                              autoComplete="off"           
                              readOnly={this.state.camp_telefone_disabled}            
                              error={this.state.erro_telefone}
                              helperText={this.state.mensagem_telefone1}
                              className="input_modal_direita"                       
                              id="outlined-basic"                   
                              variant="outlined"
                              value={this.state.campTelefone1}                
                              onBlur={this.verificaTelefone1}                            
                              onChange={ (e) => {
                                this.telefone1change(e)                       
                                this.validatelefone1Change(e)
                              }}                                      
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_telefone1? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={80}                      
                          />
                        <FormHelperText error={this.state.erro_telefone}>
                              {this.state.mensagem_telefone1}
                        </FormHelperText>
                      </FormControl>    
                      
                      </div>
                      <div>
                      <FormControl variant="outlined" className="input_modal_esquerda">
                              <InputLabel className="label_modal_esquerda" 
                                    htmlFor="filled-adornment-password">Número Total de Passageiros</InputLabel>
                              <OutlinedInput      
                                  autoComplete="off"                                                      
                                  error={this.state.erro_qtdpassageiro}
                                  helperText={this.state.mensagem_qtdpassageiro}
                                  className="input_modal_esquerda"                      
                                  id="outlined-basic"                   
                                  variant="outlined"
                                  value={this.state.campqtdpassageiro}          
                                  onBlur={this.verificaQtdPassageiros}
                                  onFocus={this.verificaQtdPassageiros}                        
                                  onChange={ (e) => {
                                    this.qtdpassageiroschange(e)                                                           
                                  }}                                    
                                  inputProps={{
                                    maxLength: 3,
                                  }}     
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_qtdpassageiro? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={180}                      
                              />
                            <FormHelperText error={this.state.erro_qtdpassageiro}>
                                  {this.state.mensagem_qtdpassageiro}
                            </FormHelperText>
                          </FormControl> 
                      </div>
                  </div>        
              </div> 
              <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                          <FormControl variant="outlined" className="input_modal_direita">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Data do Serviço</InputLabel>
                          <OutlinedInput   
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_data_servico}
                                  helperText={this.state.mensagem_data_inicio}
                                  className="input_modal_direita"                           
                                  id="nome_incluir"                   
                                  variant="outlined"
                                  value={this.state.campdata_servico}                                              
                                  onChange={ (e) => {
                                    this.data_servicochange(e)                   
                                    this.validaDataServicoChange(e)                                              
                                  }}  
                                  inputProps={{
                                    maxLength: 10,
                                  }}                      
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_data_servico? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={150}
                              />                                                
                        </FormControl>               
                              </div>    
                              <div>
                              <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Hora Inicial</InputLabel>
                                    <OutlinedInput         
                                        type="time"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_inicial}
                                        helperText={this.state.mensagem_hora_inicial}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_inicial}                                       
                                        onChange={ (e) => {
                                          this.hora_inicialchange(e)                                                                 
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
                                        {this.state.mensagem_hora_inicial}
                                  </FormHelperText>
                                </FormControl>  
                              </div>                
                      </div>    
                    </div>
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_modal_direita" variant="outlined">
                                    <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Hora Final</InputLabel>
                                    <OutlinedInput    
                                        type="time"       
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_final}
                                        helperText={this.state.mensagem_hora_final}
                                        className="input_modal_direita"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camphora_final}                                    
                                        onChange={ (e) => {
                                          this.hora_finalchange(e)                                                                 
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_hora_final? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_hora_final}>
                                        {this.state.mensagem_hora_final}
                                  </FormHelperText>
                                </FormControl>  
                              </div>    
                              <div>
                              <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Qtd de Diárias</InputLabel>
                                    <OutlinedInput         
                                        type="text"  
                                        autoComplete="off"                       
                                        error={this.state.erro_hora_final}
                                        helperText={this.state.mensagem_data_inicio}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campqtddiarias}                                     
                                        onChange={ (e) => {
                                          this.qtdDiariaschange(e)                                                                 
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
                </TabPanel>

               </TabContext>
              </div>
              <div className="alinha_campos">              
                    <div class="p-2">           
                    <table style={{width: '70%'}}>
                      <tr><td> 
                           <div className="checkbox_modal_descricao">Local de Embarque</div>
                           </td>                            
                           <td className="font_link_alterar"> 
                               <a onClick={()=>this.handleOpenModalEmbarque()} className="font_link_alterar">Alterar</a> 
                           </td> 
                           </tr>
                        <tr>
                          <td rowSpan="2">                           
                           <div style={{width: '70%'}}>
                               { this.mostrar_endereco_selecionado_embarque() } 
                               
                              </div>
                           </td>
                         </tr>   
                    </table>
                  </div>
                  
                    <div class="p-2">
                    <table style={{width: '70%'}}>
                      <tr><td> 
                           <div className="checkbox_modal_descricao">Local de Desembarque</div>
                           </td>                            
                           <td className="font_link_alterar"> 
                               <a onClick={()=>this.handleOpenModalDesembarque()} className="font_link_alterar">Alterar</a> 
                           </td> 
                           </tr>
                        <tr>
                          <td rowSpan="2">
                          { this.mostrar_endereco_selecionado_desembarque() }                           
                           </td>
                         </tr>   
                    </table>
                  
                    </div>              

                    <div class="p-2">
                    <div className="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d">                                                             
                               <div className="checkbox_modal_descricao">Motorista deve fala Inglês?</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e">                             
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    value={this.state.campbilingue}
                                    control={<Switch color="primary" checked={this.state.campbilingue} 
                                        onChange={this.bilinguechange}
                                     //   onBlur={this.calculo_bilingue}
                                        />}                                    
                                    labelPlacement="end"
                                  />                       
                                </FormGroup>
                           </div>
                        </div> 
                    </div>

                    <div class="p-2">
                      {this.verificar_tipo_servico()}
                    </div>
                    <div class="p-2">
                    <table style={{width: '70%'}}>
                      <tr><td> 
                           <div className="checkbox_modal_dados_voo">Dados do vôo</div>
                           </td>         
                           </tr>                       
                     </table>     
                     <br/>
                     <table style={{width: '70%'}}>      
                       <tr>
                          <td className="input_modal_voo">
                          <FormControl className="input_modal_direita" variant="outlined">
                                    <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Companhia Aérea</InputLabel>
                                    <OutlinedInput    
                                        type="text"       
                                        autoComplete="off"                       
                                        error={this.state.erro_companhia_aerea}
                                        helperText={this.state.mensagem_companhia_aerea}
                                        className="input_modal_direita"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campCompanhia_aerea}                                    
                                        onChange={ (e) => {
                                          this.companhia_aereachange(e)                                                                 
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_companhia_aerea? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_companhia_aerea}>
                                        {this.state.mensagem_companhia_aerea}
                                  </FormHelperText>
                                </FormControl>  
                           </td>
                           <td className="input_modal_voo">
                           <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Número do Vôo</InputLabel>
                                    <OutlinedInput         
                                        type="text"  
                                        autoComplete="off"                       
                                        error={this.state.erro_numero_voo}
                                        helperText={this.state.mensagem_numero_voo}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campNumero_voo}                                     
                                        onChange={ (e) => {
                                          this.numero_voochange(e)                                                                 
                                        }}                                    
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          maxLength: 10,
                                         
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_numero_voo? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_numero_voo}>
                                        {this.state.mensagem_numero_voo}
                                  </FormHelperText>
                                </FormControl>  

                           </td>
                         </tr>   
                    </table>      
                    </div>               

                    <div class="p-2">                      
                      <table style={{width: '70%'}}>
                      <tr><td> 
                           <div className="checkbox_modal_dados_voo">Motorista Preferencial</div>
                           </td>   
                           </tr>                       
                     </table>     
                     <br/>
                     <table style={{width: '70%'}}>      
                       <tr>
                          <td className="input_modal_voo">
                          <FormControl className="input_modal_direita" variant="outlined">
                                    <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Nome</InputLabel>
                                    <OutlinedInput    
                                        type="text"       
                                        autoComplete="off"                       
                                        error={this.state.erro_nome_motorista}
                                        helperText={this.state.mensagem_nome_motorista}
                                        className="input_modal_direita"                 
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.campnomemotorista}                                    
                                        onChange={ (e) => {
                                          this.nomemotoristaChange(e)                                                                 
                                        }}                                    
                                        inputProps={{
                                          maxLength: 10,
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_nome_motorista? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_nome_motorista}>
                                        {this.state.mensagem_nome_motorista}
                                  </FormHelperText>
                                </FormControl>  
                           </td>
                           <td className="input_modal_voo">
                           <FormControl className="input_modal_esquerda" variant="outlined">
                                    <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Telefone</InputLabel>
                                    <OutlinedInput         
                                        type="text"  
                                        autoComplete="off"                       
                                        error={this.state.erro_telefone_motorista}
                                        helperText={this.state.mensagem_telefone_motorista}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        value={this.state.camptelefonemotorista}                                     
                                        onChange={ (e) => {
                                          this.telefonemotoristaChange(e)                                                                 
                                        }}                                    
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        inputProps={{
                                          maxLength: 15,
                                         
                                        }} 
                                      endAdornment={
                                        <InputAdornment position="end">
                                            {this.state.validacao_telefone_motorista? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_telefone_motorista}>
                                        {this.state.mensagem_telefone_motorista}
                                  </FormHelperText>
                                </FormControl>  
                           </td>
                         </tr>   
                    </table>    
                    </div>
                    <div class="p-2">
                      <div className="d-flex justify-content-start">
                           <div className="coluna_modal_separacao_d">                              
                               <div className="checkbox_modal_descricao">Cartão Escolhido</div>
                            </div>                               
                           <div className="coluna_modal_separacao_e"> 
                                <a onClick={()=>this.handleOpenModalInclusaoCartao()} className="font_link_alterar">Adicionar</a> 
                           </div>
                        </div>                       
                     <br/>                       
                        <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Cartão</InputLabel>
                        <Select
                          className="text_select_modal_tipo"
                          error={this.state.erro_cartao} 
                          helperText={this.state.mensagem_cartao}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.campcartaoid}
                          onFocus={this.verificaCartao}
                          onClick={this.verificaCartao}
                          onChange={ (e) => {
                            this.cartaoChange(e)
                          }}   
                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_cartao? <CheckIcon />: ''}
                            </InputAdornment>
                          }                             
                          labelWidth={240}
                        >
                          {this.loadFillData()}                    
                        </Select>
                      </FormControl>    
                    </div>
                </div>
           </div> 
           <div className="container-fluid">
                   <div>
                    <div className="botao_servico_fixo">
                          <table className="margin_total_servicos">
                              <tr className="titulo_total_servicos"><td className="tamanho_coluna">Distância Total</td>
                                <td className="tamanho_coluna_tempo">Tempo Total</td>
                                <td className="tamanho_coluna">Valor Total</td></tr>                
                              <tr className="resultado_total_servicos">
                                                  <td>{this.state.campdistancia} km</td>
                                <td>{this.state.camptempo}</td>
                                <td>R$ {this.state.campvalor}</td>
                                </tr>               
                          </table>
                      {this.verifica_botao(this.state.inicio)}         
                        </div>        
                    </div>                    
           </div> 
           
        </div>   
       </ReactModal>      
       <ReactModal 
        isOpen={this.state.showModalInclusaoCartao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
        <div className="container-fluid">
             <div className="row">
               <div className="col-9 altura_titulo">
                    Incluir Cartão Crédito
               </div>
               <div className="col-1">
               <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusaoCartao()}>
              <CloseOutlinedIcon />
            </IconButton></div>                    
               </div>                    
             </div>
           </div>                 
            <div className="container_modal_alterado">
               <div className="d-flex justify-content">        
                 <div className="App-payment">  
                 <div class="d-flex flex-column espacamento_caixa_modal_cartao">              
                      <div class="p-2">                        
                        <Cards
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}                            
                          />
                      </div>   
                      
                      <div class="p-2">                     
                      <input
                            type="tel"
                            name="number"
                            autoComplete="off"   
                            className="cartao_campo"
                            placeholder="Número do cartao"                                                        
                          //  onBlur={this.verifica_cartao}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            pattern="[\d| ]{16,22}" 
                            size="40"                           
                            required
                          />
                      </div>      
                      <div class="p-2">          
                      <input
                            type="text"
                            name="name"
                            size="40"  
                            autoComplete="off"   
                            className="cartao_campo"
                            placeholder="Nome" 
                            minlength="11" maxlength="33"                        
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}  
                            required                          
                          /> 
                      </div>      
                      <div class="p-2">          
                          <div className="d-flex justify-content-start">
                            <div>
                                <input
                                      type="text"
                                      name="expiry"
                                      size="20"  
                                      autoComplete="off"   
                                      className="cartao_campo data_valid"
                                      placeholder="Data validade"
                                      pattern="\d\d/\d\d"
                                      required
                                      onChange={this.handleInputChange}
                                      onFocus={this.handleInputFocus}
                                    />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  name="cvc"
                                  size="20"  
                                  autoComplete="off"   
                                  className="cartao_campo cvc_valid"
                                  placeholder="CVC"
                                  pattern="\d{3,4}"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>      
                            </div>   
                          </div>
                        </div>
                        {this.botao_modal(2)}     
                      </div>
                    </div>        
                 </div>
     </ReactModal>       

       <ReactModal 
        isOpen={this.state.showModalEmbarque}
        style={customrotaStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
        <div className="container-fluid">
             <div className="row">
               <div className="col-9 altura_titulo">
               Local Embarque
               </div>
               <div className="col-1">
               <IconButton aria-label="editar" onClick={()=>this.handleCloseModalEmbarque()}>
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
                      <GooglePlacesAutocomplete                                                                                  
                                apiKey="AIzaSyBcFfTH-U8J-i5To2vZ3V839pPaeZ59bQ4"                                                                 
                                country="br"
                                query={{                                  
                                  language: 'br', // language of the results
                                  components: "country:br", // default: 'geocode'
                                }} 
                                selectProps={{          
                                  autoFocus:true,
                                  placeholder: "Qual o endereço?",                                  
                                  value: this.state.camplocalembarque.label,
                                  onChange: this.handleEmbarqueChange,                                 
                                  styles: {                                  
                                    input: (provided) => ({
                                      ...provided,
                                      color: 'blue',
                                      width: '400px',
                                    }),
                                    option: (provided) => ({
                                      ...provided,
                                      color: 'blue',
                                    }),
                                    singleValue: (provided) => ({
                                      ...provided,
                                      color: 'blue',
                                    }),
                                  },
                                }}
                                />                      
                                <br/>
                                  { this.mostrar_endereco_selecionado_embarque() }        
                               <br/>                            
                               <br/>
                               { this.mostrar_mapa_embarque() }       
                                                              

                      </div>
                      <div className="posicao_2">                             
                     </div>                      
                    </div>                        
                    {this.verifica_rota(this.state.inicio)}     
                 </div>
               </div>    
            </div>
     </ReactModal>    
     <ReactModal 
        isOpen={this.state.showModalDesembarque}
        style={customrotaStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
        <div className="container-fluid">
             <div className="row">
               <div className="col-9 altura_titulo">
               Local Desembarque
               </div>
               <div className="col-1">
               <IconButton aria-label="editar" onClick={()=>this.handleCloseModalDesembarque()}>
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
                      <GooglePlacesAutocomplete                                                                                  
                                apiKey="AIzaSyBcFfTH-U8J-i5To2vZ3V839pPaeZ59bQ4"                                                                 
                                country="br"
                                query={{                                  
                                  language: 'br', // language of the results
                                  components: "country:br", // default: 'geocode'                                  
                                }} 
                                selectProps={{                                            
                                  autoFocus:true,
                                  placeholder: "Qual o endereço?",                                  
                                  value: this.state.camplocaldesembarque,
                                  onChange: this.handlelocalDesembarqueChange,                                
                                  styles: {                                  
                                    input: (provided) => ({
                                      ...provided,
                                      color: 'blue',
                                      width: '400px',
                                    }),
                                    option: (provided) => ({
                                      ...provided,
                                      color: 'blue',
                                    }),
                                    singleValue: (provided) => ({
                                      ...provided,
                                      color: 'blue',
                                    }),
                                  },
                                }}
                                />  
                                  <br/>
                                  { this.mostrar_endereco_selecionado_desembarque() }      
                               <br/>
                               <br/>
                            
                          { this.mostrar_mapa_desembarque() }                                        
                   
                      </div>
                      <div className="posicao_2">            

              </div>                      
                    </div>                        
                {this.verifica_rota(this.state.inicio)}     
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
            <Alert2 onClose={this.envia_mensagemClose} severity="success">
                  {this.state.mensagem_usuario}
            </Alert2>
        </Snackbar>     
     

     </div>   

    );
  }
  

  mostrar_endereco_selecionado_embarque() {
    
    
    if (this.state.camplocalembarque !== "") {
      
      return (

        <Grid container alignItems="center">
                            <Grid item>
          <LocationOnIcon styles={useStyles.icon} />
        </Grid>        
            <Grid item xs>
              <div className="descricao_modal_servico">
                 {this.state.camplocalembarque}                            
              </div>   
                 <Typography variant="body2" color="textSecondary">                                   
                 </Typography>
             </Grid>
       </Grid>              
    
      );
    }

  }

  mostrar_mapa_embarque() {
    //if (this.state.controle == 0) {
      debugger;
      if (this.state.camplocalembarque !== "") {     
        if (this.state.embarque_latitude !== null && this.state.embarque_longitude !== null) {
    
        return (
          <div style={{width: '70%'}}>
            <Map google={this.props.google}
            id="map-canvas"
            initialCenter={{
              lat: this.state.embarque_latitude,
              lng: this.state.embarque_longitude
            }}
            style={containerStyle}                                        
            zoom={11}
           // onClick={this.onMapClicked}
            >
            <Marker
              title={this.state.camplocalembarque}
              name={this.state.camplocalembarque}
              position={{lat: this.state.embarque_latitude, lng: this.state.embarque_longitude}}                                      
              icon={{
                url: `/location-thumbnail.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />

            <InfoWindow onClose={this.onInfoWindowClose}>

            </InfoWindow>
            </Map>            

           

            <DistanceMatrixService          
              options={{                      
                        destinations: [{lat: this.state.embarque_latitude, lng: this.state.embarque_longitude}],
                        origins: [{lat: this.state.desembarque_latitude, lng: this.state.desembarque_longitude}],                    
                        travelMode: "DRIVING",                                      
                      }}
              callback={this.distanceCallback}
          /> 
 
         
           </div>    
         
        );
          }
      }
   // }
  }

  sendSaveCartao(){        
    /*
        if (visaRegex.test('4509 9535 6623 3704')) {       
          this.setState({ 
            tipo_cartao: 'visa'
          });  
        } else if (masterRegex.test(this.state.number)) {       
          this.setState({ 
            tipo_cartao: 'master'
          });  
        }  */
    
        let cartao = creditCardType(this.state.number).filter((card) => {        
          return card.type
       });
    
       debugger;
        const datapost = {
          numero: this.state.number,              
          nome: this.state.name,              
          data_vencimento: moment(this.state.expiry, "MM YY"),
          codigo_seguranca: this.state.cvc,      
          logid: localStorage.getItem('logid'), 
          perfilId: localStorage.getItem('logperfil'), 
          bandeira: cartao[0].type,  
          statusId: 1, 
        }               
        
          console.log('datapost1 - '+JSON.stringify(datapost, null, "    "));  
    
              api.post('/cartao/create',datapost)
              .then(response=>{
                if (response.data.success == true) {   
    
                    this.setState({                   
                        mensagem_usuario: 'Cartão incluido com sucesso!',          
                    });          
                    
                    this.loadCartaoCliente();
                   // this.handleCloseModalInclusaoCartao();   
                    this.envia_mensagemClick();    
                    //this.handleCloseModalInclusaoCartao();   
              }
        
              }).catch(error=>{
                alert("Erro verificar log  ")
              })
        
      }  

  botao_modal(inicio) {
    const { validate } = this.state   

     if (inicio == 1) {
  
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Incluir </label>
                </div>     
          </Box>           
      );   
       
      } else {

        if (this.state.cvc !== '' && this.state.name !== '' && this.state.expiry !== '' && this.state.number !== '' ) { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSaveCartao()}>
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

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }
     
    this.setState({ [target.name]: target.value });
  };

  loadTarifaespecial() {
    api.get(`/matrizEspecial/list`)
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listTarifasEspeciais:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })
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

    this.loadlistServicos();
     
  }


  handleOpenModalMotorista(data) { 
    this.setState({ 
      showMostraMotorista: true,    
    });     
    
  }
  
  handleCloseModalMotorista() {
    this.setState({ 
      showMostraMotorista: false
    });    

    this.loadlistServicos();
     
  }

  loadTarifa() {
    api.get(`/matriz/list`)
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listTarifas:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }   

  calculo_bilingue(e) {
    /*  Y = X * % bilíngue   */
  //  debugger;
   let valor_total_calculado = '';
   let valor_bilingue = '';

   /*
   if (this.state.valor_bilingue == "") {  
       this.buscar_informacao();
   } 
*/

   if (this.state.campvalor !== "" && this.state.valor_bilingue !== "") {  
      if (e.target.checked == true) {
       
        valor_total_calculado = parseFloat(this.state.campvalor.replace(',','.'));
        valor_bilingue = this.state.valor_bilingue;
        
        const resultado_b =  (parseFloat(valor_bilingue) * valor_total_calculado);
        const resultado_c =  (resultado_b / 100).toFixed(2);
        const resultado_d = (parseFloat(valor_total_calculado) + parseFloat(resultado_c))

        this.setState({
          resultado_bilingue: resultado_c,  
          campvalor: resultado_d.toFixed(2),
          })
      } 
      
      else {

        valor_total_calculado = parseFloat(this.state.campvalor);

        const resultado_d = (valor_total_calculado - parseFloat(this.state.resultado_bilingue));

        this.setState({          
          campvalor: resultado_d.toFixed(2),
          resultado_bilingue: '',  
        }) 

      }        
  }

  }

  calcular_distancia() { 
    
    debugger;
    const origins = this.state.camplocalembarque;
    const destinations = this.state.camplocaldesembarque;  

    if (origins !== '' && destinations !== '') {
     
      distance.matrix(
        {
            origins: [origins],
            destinations: [destinations],
           // travelMode: google.maps.TravelMode.DRIVING,
            //unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
        }, 
        this.distanceCallback()
      );

    }  
  }
  calculo_receptivo(e) {
    /* Z = X + valor receptivo + Y + pedágio    */    
    debugger;
    let valor_total_calculado = '';
    let valor_receptivo = '';

 /*   if (this.state.valor_receptivo == "") {  
      this.buscar_informacao();
    } 
*/
    if (this.state.campvalor !== "" && this.state.valor_receptivo !== "") {      
      if (e.target.checked == true) {

          valor_total_calculado = parseFloat(this.state.campvalor.replace(',','.'));
          valor_receptivo = this.state.valor_receptivo;

          const resultado_d = (parseFloat(valor_total_calculado) + parseFloat(valor_receptivo))        

        this.setState({
          resultado_receptivo: valor_receptivo,  
          campvalor: resultado_d.toFixed(2)
          })
        } else {

          valor_total_calculado = parseFloat(this.state.campvalor);      

          const resultado_d = (valor_total_calculado - parseFloat(this.state.resultado_receptivo));
          this.setState({
            campvalor: resultado_d.toFixed(2),
            resultado_receptivo: '',              
          })
        }  
      }

  }
  

  buscar_informacao() {   
  
    debugger;
    this.setState({ 
      possui_tarifa: false,
      possui_tarifa_especial: false,
      campvalor: '0,00',
      campvalor_estimado: 0,
      valor_bilingue: 0,
      valor_receptivo: 0,          
      mensagem_error: '',
    })  


    if (this.state.tabIndex == 1) {
     debugger;

     const tempo = parseFloat(this.state.camphora_final) - parseFloat(this.state.camphora_inicial);

      this.setState({ 
        controle: 1,
        campdistancia: 50, 
        camptempovalue: tempo,
        camptempo: this.formatar_valor(this.state.camptempovalue),          
      });

    }


   /* const datapost_alterar = {
    } */
  
   /* aqui teste */
   // api.get(`/eventos/update/${localStorage.getItem('logid')}`, datapost_alterar)
   // .then(response=>{
   //   if (response.data.success==true) {         
    
      this.state.listTarifasEspeciais.map((data)=>{   
      
       const teste_data = moment(this.state.campdata_servico, "DD/MM/YYYY");
       const formatar_data = teste_data.format("YYYY-MM-DD");

       const data_servico_date = new Date(formatar_data);
       const data_inicial_date = new Date(data.data_inicial);
       const data_final_date = new Date(data.data_final);      
       debugger;              
// this.state.camptipoId == data.tipoTransporte &&  
            if (this.state.camptipoId == data.tipoTransporte &&  
                 data_servico_date.getTime() >= data_inicial_date.getTime() && 
                 data_servico_date.getTime() <= data_final_date.getTime() && 
                 this.state.camphora_inicial >= data.hora_inicial.substring(0,5) && 
                 this.state.camphora_inicial <= data.hora_final.substring(0,5)) {  
               
                  if (this.state.campdistancia >= Number(data.faixa_inicial)   
                   && this.state.campdistancia <= Number(data.faixa_final)) {    
    
                      /*  X = (QTD Km * valor Km) + (tempo do Serviço * valor tempo) + valor Bandeirada  */

                      /* se ele achar o registro ele procura a distancia pelo km inicial e final */

                      /* se ele nao encontrar avisar ao usuario que  */            
                  
                      const valor_distancia_1 = (this.state.campdistancia * data.valor_km).toFixed(1) 
                      
                      const valor_tempo_1 = (this.state.camptempovalue * data.valor_tempo).toFixed(1) 
                      
                      const valor_total = (parseFloat(valor_distancia_1) + parseFloat(valor_tempo_1) + parseFloat(data.bandeira)); 

                      this.setState({ 
                        possui_tarifa_especial: true,
                        campvalor: valorMask(valor_total.toFixed(2)),
                        campvalor_estimado: valorMask(valor_total.toFixed(2)),
                        valor_bilingue: data.bilingue,
                        valor_receptivo: data.receptivo,
                        mensagem_error: false,
                        mensagem_servico: '',
                      })  
                    } 
                    else {
                      if (this.state.possui_tarifa_especial == false)  {
                          this.setState({                             
                            //campvalor: '0,00',       
                            mensagem_error: true,
                            mensagem_servico: 'Tarifas Especial para esse percurso não definida. Contatar Administrador !',    
                            validacao_cartao: false,
                            campcartaoid: '',            
                            valor_bilingue: 0,
                            valor_receptivo: 0,                                                                      
                          });     
                          this.teste_mensagem();
                        }    
                    }
              
            //console.log(' formula - '+JSON.stringify((this.state.campdistancia * data.valor_km) + (this.state.camptempovalue * data.valor_tempo) + data.bandeira, null, "    ")); 
             }             
      })   
     
      /* senao encontrar o registro na tarifa especial ele procura na tarifa  */
      if (this.state.possui_tarifa_especial == false && this.state.mensagem_error == '') { 
        this.state.listTarifas.map((data)=>{
        // console.log(JSON.stringify(data, null, "    ")); 
            
         // if (this.state.possui_tarifa == false) {
              if (this.state.camptipoId == data.tipoTransporte &&                
                  this.state.campdistancia >= Number(data.faixa_inicial) &&  
                  this.state.campdistancia <= Number(data.faixa_final)) {
                    debugger;   
                  /*  X = (QTD Km * valor Km) + (tempo do Serviço * valor tempo) + valor Bandeirada  */         
                  const valor_distancia_1 = (this.state.campdistancia * data.valor_km).toFixed(1); 
                  
                  const valor_tempo_1 = (this.state.camptempovalue * data.valor_tempo).toFixed(1); 
                  
                  const valor_total = (parseFloat(valor_distancia_1) + parseFloat(valor_tempo_1) + parseFloat(data.bandeira));                   
            
                  debugger;
                  this.setState({ 
                    possui_tarifa: true,
                    campvalor: valorMask(valor_total.toFixed(2)),
                    campvalor_estimado: valorMask(valor_total.toFixed(2)),
                    valor_bilingue: data.bilingue,
                    valor_receptivo: data.receptivo,
                    mensagem_error: false,
                    mensagem_servico: '',
                  })  
                  //console.log(' formula - '+JSON.stringify((this.state.campdistancia * data.valor_km) + (this.state.camptempovalue * data.valor_tempo) + data.bandeira, null, "    ")); 
              } 
              else {
               if (this.state.possui_tarifa == false)  {
                  this.setState({ 
                    mensagem_servico: 'Tarifas para esse percurso não definida. Contatar Administrador !',
                    mensagem_error: true,
                    //campvalor: '0,00',                  
                    validacao_cartao: false,
                    campcartaoid: '',
                    valor_bilingue: 0,
                    valor_receptivo: 0,                                                   
                  });                       
                  this.teste_mensagem();
                }
              } 
      //    }    

        })   

      }
      if (this.state.possui_tarifa_especial == false && this.state.possui_tarifa == false && this.state.mensagem_error === "") {

        this.setState({ 
           mensagem_servico: 'Dados não encontrados. Contatar Administrador !',
           mensagem_error: true,
           campvalor: '0,00',
           validacao_cartao: false,
           campcartaoid: '',
           campvalor_estimado: 0,
           valor_bilingue: 0,
           valor_receptivo: 0,
           campdistancia: '0',
           camptempo: '0',     
           inicio: 1
           //mensagem_usuario: 'Dados não encontrados, favor comunicar o administrador'
        }); 
        this.teste_mensagem();
       // this.limpar_campos();
        this.handleCloseModalDesembarque();
       // this.envia_mensagemClick();
      }  
    
  }

  distanceCallback = (response) => {
    //console.log("Hello");
    //console.log(response);

  
  debugger;
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' ) {
        if (response !== null && response.rows[0].elements[0].distance !== this.state.distance) {
          const origin = response.originAddresses[0];
          const destination = response.destinationAddresses[0];

        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
          
          this.setState({ 
            mensagem_error_mapa: `É melhor entrar em um avião. Não há estradas entre `+ origin +` e `+ destination
          });
                
        } else if (response.rows[0].elements[0].status === "OK") {
          debugger;
            this.setState({ 
              controle: 1,
              campdistancia: (response.rows[0].elements[0].distance.value / 1000).toFixed(0), 
              camptempovalue: (response.rows[0].elements[0].duration.value / 60).toFixed(0),
              camptempo: this.formatar_valor(response.rows[0].elements[0].duration.text),            
            });
            if (this.state.campdistancia !== 0 && this.state.camptempo !== 0) {        
              this.buscar_informacao();
            }
          } else  {
            this.setState({ 
              mensagem_error_mapa: 'Erro encontrado'
            });
          } 

          } else {
            console.log("response: ", response);
          }
     }
  //  }
  };

  mostrar_mapa_desembarque() {

  //if (this.state.controle == 0) {
  // debugger;
    if (this.state.camplocaldesembarque !== "") {      
      if (this.state.desembarque_latitude !== null && this.state.desembarque_longitude !== null) {
             
      return (
        <div style={{width: '80%'}}>
          <Map google={this.props.google}                              
          initialCenter={{
            lat: this.state.desembarque_latitude,
            lng: this.state.desembarque_longitude
          }}                    
          style={containerStyle}                                        
          zoom={11}          
         // onClick={this.onMapClicked}
          >
          <Marker
          title={this.state.camplocaldesembarque}
          name={this.state.camplocaldesembarque}
          position={{lat: this.state.desembarque_latitude, lng: this.state.desembarque_longitude}}                                      
          icon={{
            url: `/location-thumbnail.png`,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          />

          <InfoWindow onClose={this.onInfoWindowClose}>

          </InfoWindow>
          </Map>               
          

          <DistanceMatrixService          
              options={{                      
                        destinations: [{lat: this.state.embarque_latitude, lng: this.state.embarque_longitude}],
                        origins: [{lat: this.state.desembarque_latitude, lng: this.state.desembarque_longitude}],                    
                        travelMode: "DRIVING",                                      
                      }}
              callback={this.distanceCallback}
          /> 
        
         
          
       </div>        
      );
    
        
        }   

  }
  
  }
  
  formatar_valor(texto) {

    return (

        texto.replace('hora', 'h').replace('minutos','m').replace('hs','h').replace('mins','m')

    );

  } 

  mostrar_endereco_selecionado_desembarque() {
 
    if (this.state.camplocaldesembarque !== "") { 
      return (     
       
        <Grid container alignItems="center">
        <Grid item>
          <LocationOnIcon styles={useStyles.icon} />
          </Grid>        
          <Grid item xs>
          <div className="descricao_modal_servico">
              {this.state.camplocaldesembarque}    
          </div>                              
          <Typography variant="body2" color="textSecondary">                                   
          </Typography>
          </Grid>
        </Grid>              
      );
    }

  }
  loadOperadoresData(){  
  
    return this.state.listTodosOperadores.map((data)=>{          
      return(
         <MenuItem value={data.id}>{data.email}</MenuItem>      
      )
    })
  }
  onIncluir() {
    this.props.history.push(`/servicos_evento/${localStorage.getItem('logid')}`);   
  }

  loadCartaoCliente(){ 
   
    api.get(`/cartao/list_cartao_cliente/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaCartao:data})
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }   

   loadFillTipoData() {
    return this.state.listTipoTransporte.map((data)=>{          
      return(
         <MenuItem value={data.descricao}>{data.descricao}</MenuItem>      
      )
    })
   }

  loadFillData(){  
  
    return this.state.listaCartao.map((data)=>{          
      return(
      <MenuItem value={data.id}>
           {this.verifica_bandeira(data.bandeira)} {this.verifica_formatacao(data.bandeira, data.numero)}
      </MenuItem>      
      )
    })
  }

  handleOpenModalAlteracaoEvento() {     
    this.setState({ 
      showModalAlteracaoEvento: true,      
      campeventoId: '',      
      incluir: false,
    });  

   // this.carrega_evento();
    
  }
  
  handleCloseModalAlteracaoEvento () {
    this.setState({ 
      showModalAlteracaoEvento: false
    }); 
    
   
  }


  handleOpenModalAlteracaoServico(data) {     
    this.setState({ 
      showModalAlteracaoServico: true,      
      campservicoId: data.id,    
      possui_tarifa_especial: false,
      possui_tarifa: false,  
      incluir: false,
    });  

   this.limpar_campos();     
   this.loadTarifaespecial();
   this.loadTarifa();
   this.loadTipoTransporte();     
   this.loadCartaoCliente();
   this.carrega_servico(data);
    
  }
  
  handleCloseModalAlteracaoServico() {
    this.setState({ 
      showModalAlteracaoServico: false
    }); 
    
   
  }


  carrega_teste() {
  
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
  

  handleOpenModalCompartilhar() { 
    this.setState({ 
      showModalCompartilhar: true,      
      address: '',
    //  mudar_estilo: customStyles_2,
    });      
    
  }
  
  handleCloseModalCompartilha () {
    this.setState({ 
      showModalCompartilhar: false,
      //mudar_estilo: customStyles,
    }); 
    
   
  }


  handleOpenModalEmbarque() { 
    this.setState({ 
      showModalEmbarque: true,      
      camplocalembarque: '',      
    //  mudar_estilo: customStyles_2,
    });      
    
  }
  
  handleCloseModalEmbarque() {
    this.setState({ 
      showModalEmbarque: false,
      validacao_localembarque: true
      //mudar_estilo: customStyles,
    }); 
    
  //  this.obtendo_latitude_longitude();
  }

  handleOpenModalDesembarque() { 
    this.setState({ 
      showModalDesembarque: true,      
      camplocaldesembarque: '',      
      controle: 0,
    //  mudar_estilo: customStyles_2,
    });           
    
  }
  
  handleCloseModalDesembarque() {
    this.setState({ 
      showModalDesembarque: false,  
      validacao_localdesembarque: true,
    });  
   //debugger;
    //this.obtendo_latitude_longitude();
  }

  handleOpenModal1Compartilhar() { 
    this.setState({ 
      showModal1Compartilhar: true,          
    });      
    
  }
  
  handleCloseModal1Compartilha () {
    this.setState({ 
      showModalCompartilhar: false,
      //mudar_estilo: customStyles,
    }); 
    
   
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

  limpar_campos() {
    this.setState({   
      campDeletarId: '',
      campNome: '',
      selectedPlace:'',
      camptipoId: '',      
      campcartaoid: '',
      //campordem_servico: '',          
      campdata_servico: '',
      campqtdpassageiro: '',
      camphora_inicial: '',
      camphora_final: '',
      campTelefone1: '',
      camplocalembarque: '',
      camplocaldesembarque: '',
      campqtddiarias: '',
      campbilingue: false,
      campreceptivo: false,
      campdistancia: 0,
      camptempo: 0,
      campCompanhia_aerea: '',
      campNumero_voo: '',
      campvalor: '0,00',
      campvalor_estimado: '',
      valor_oser: '',
      valor_motorista: '',
      erro_nome: false,
      erro_telefone: false,      
      erro_data_servico: false,
      erro_qtdpassageiro: false,
      erro_hora_inicial: false,
      erro_hora_final: false,
      erro_celular1: false,
      erro_localembarque: false,
      erro_localdesembarque: false,
      erro_data_evento: false,    
      erro_companhia_aerea: false,
      erro_numero_voo: false,
      erro_cartao: false,
      camptempovalue: '',  
      mensagem_data_evento: '',    
      mensagem_nome: '',
      mensagem_telefone: '',      
      mensagem_data_servico: '',
      mensagem_qtdpassageiro: '',
      mensagem_hora_inicial: '',
      mensagem_hora_final: '',
      mensagem_Telefone1: '',
      mensagem_localembarque: '',
      mensagem_localdesembarque: '',
      mensagem_data_nao_encontrada: '',
      mensagem_nao_possui_registro: '',
      mensagem_companhia_aerea: false,
      mensagem_numero_voo: false,
      mensagem_cartao: false,
      valor_bilingue: '',
      valor_receptivo: '',
      listTarifas:[],
      listTarifasEspeciais:[],
      origins: '',
      destinations:'',
      validacao_cartao: false,
      validacao_data_evento: false,      
      validacao_nome: false,     
      validacao_data_servico: false,
      validacao_qtdpassageiro: false,
      validacao_hora_inicial: false,
      validacao_hora_final: false,
      validacao_telefone1: false,
      validacao_localembarque: false,
      validacao_localdesembarque: false,
      validacao_companhia_aerea: false,
      validacao_numero_voo: false,
      controle: 0,
      resultado_bilingue: '',
      resultado_receptivo: '',
      erro_tipo: false,
      validacao_tipo: false, 
      embarque_latitude: '',
      embarque_longitude: '',
      desembarque_latitude: '',
      desembarque_longitude: '',
      possui_tarifa_especial: false,
      possui_tarifa: false,
    });  
  }


  handleOpenModalInclusao () { 
    this.setState({ 
      showModalInclusao: true,      
      incluir: true,      
      possui_tarifa_especial: false,
      possui_tarifa: false,
      inicio: 1,
    });  

    this.limpar_campos();     
    this.loadCartaoCliente();
    this.loadTarifaespecial();
    this.loadTarifa();
    this.loadTipoTransporte();
  //  this.limpar_campos();     
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false
    }); 
    
   
  }

  handleOpenModalInclusaoCartao () { 
    this.setState({ 
      showModalInclusaoCartao: true,      
      incluir: true,      
    });  

    
  }
  
  handleCloseModalInclusaoCartao () {
    this.setState({ 
      showModalInclusaoCartao: false
    }); 
    
   
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
    
    this.handleCloseModalInclusaoCartao();     
  };       
  
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
  
  verifica_formatacao(bandeira, data) {
 
    if (bandeira == 'visa') {
       return (
         '****.****'+cartaoMask(data).substring(9,data.length)
       );
    } else if (bandeira == 'mastercard') {
      return (
         '****.****'+cartaoMask(data).substring(9,data.length)
       );
    } else if (bandeira == 'american-express') {
        return (
         '****.******.'+cartaoAmericanMask(data).substring(11,data.length)
         );
    } else if (bandeira == 'diners-club') {
     return (
       '****.******.'+cartaoDinersMask(data).substring(11,data.length)    
      );
   } else if (bandeira == 'discover') {
     return (
       '****.****'+cartaoMask(data).substring(9,data.length)  
      );
   } else if (bandeira == 'maestro') {
     return (
       '****.****'+cartaoMask(data).substring(9,data.length)  
      );
   } else if (bandeira == 'jcb') {
     return (
       '****.****'+cartaoMask(data).substring(9,data.length)  
      );
   }  else {
     return (
       '****.****'+cartaoMask(data.numero).substring(9,data.length)
     );
   }    
   }
   
   verifica_bandeira(bandeira) {
   
     if (bandeira == 'visa') {
        return (
         <img src='/visa.jpg' style={{ width: '40px', height: '20px' }}/>
        );
     } else if (bandeira == 'mastercard') {
       return (
         <img src='/master_card.png' style={{ width: '40px', height: '20px' }}/>
        );
     } else if (bandeira == 'discover') {
         return (
           <img src='/discover.png' style={{ width: '40px', height: '20px' }}/>
          );
     } else if (bandeira == 'diners-club') {
       return (
         <img src='/dinerrs.png' style={{ width: '60px', height: '40px' }}/>
        );
     } else if (bandeira == 'american-express') {
       return (
         <img src='/america_express.jpg' style={{ width: '60px', height: '40px' }}/>
        );
     } else if (bandeira == 'maestro') {
       return (
         <img src='/EloFundo.png' style={{ width: '40px', height: '20px' }}/>
        );
     } else if (bandeira == 'jcb') {
       return (
         <img src='/jcb.jpg' style={{ width: '40px', height: '20px' }}/>
        );
     }      
   
   }

  sendDelete(userId){
    // url de backend
    console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/servicos/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        this.setState({  
          //open: true,
          mensagem_usuario: 'Serviço Excluido com sucesso!'
         });
        this.loadlistServicos()
        this.handleCloseModalDelete(); 
        this.envia_mensagemClick();
        
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}


//export default listaservicosComponent;

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBcFfTH-U8J-i5To2vZ3V839pPaeZ59bQ4')
})(listaservicosComponent)

