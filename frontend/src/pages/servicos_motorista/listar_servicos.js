import React, { useEffect, useState }  from 'react';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import {Alert, Input } from 'reactstrap';
//import { Tabs, Tab } from 'react-bootstrap';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import GoogleMapReact from 'google-map-react';
import Avatar from '@material-ui/core/Avatar';

//import GoogleMap from './GoogleMap';
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
//import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_motorista from '../motorista/menu_motorista';
import Menu from '../../pages/cabecalho' ;
import { celularMask } from '../formatacao/celularmask';
import Menu_administrador from '../administrador/menu_administrador';
import { Button } from 'reactstrap';
import './servicos.css';
//import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";

import { dataMask } from '../formatacao/datamask';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
import { isThisHour } from 'date-fns';

var campdistancia_global = ''
var camptempovalue_global = ''
var camptempo_global = '' 

//const service = new window.google.maps.DistanceMatrixService();
var dateFormat = require('dateformat');

//const distanceMatrix = require('distance-matrix-endpoint')
//var distance = require('google-distance');
var distance  = require('google-distance-matrix');
var nome_motorista_1 = ''
var telefone_motorista_1 = ''

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');

const libraries = ["places"];

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

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));


const busca_motorista = async () => {

  debugger;
  api.get(`/motorista/get/${this.state.campMotoristaId}`)
   .then(res=>{

    const data = res.data.data;
    nome_motorista_1 = data.nome;
    telefone_motorista_1 = data.celular;
         
   })  

}

var hora_inicial ='';
var hora_final ='';

//var ultima_data = '';
//const [ultima_data, setUtima_data] = useState('');
 // com Async Await

 /*
useEffect(() => {
  async function getmaxDataServico() {
    try {
      localStorage.setItem('logservicoid', this.state.campservicoId);
      data = await api.get(`/servicos/MaxDataServicoFilho/${localStorage.getItem('logservicoid')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`);
     // setItems(data);
     setUtima_data(data);
    // return ultima_data

    } catch (error) {
      alert("Ocorreu um erro ao buscar max data");
    }
  }
  getmaxDataServico();
}, []);
8*/

var campseltipoveiculo = '';
var possui_tarifa_nova = false;
var possui_tarifa_especial_nova = false;
var motorista_incluido = 0;
var total_motorista = 0;
var possui_motorista = false;

const containerStyle = {
  position: 'relative',  
  width: '80%',
  height: '45%'
}

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
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100vh',       
   // width                  : '40%',    
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
    left                   : '64%',              
    right                  : '0%',
   // width                  : '40%',   
    bottom                 : 'auto',  
    height                 : '100vh',        
    padding                : '0px !important',      
    overflow               : 'hidden',
    WebkitOverflowScrolling: 'hidden',
    position               : 'absolute',
    border: '1px solid #ccc',       
  }
};

const MotoristaStyles = {
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
    top                    : '50%',
    left                   : '64%',   
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '50%',    
   // width                  : '560px',    
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
    left                   : '64%',   
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '50%',    
   // width                  : '560px',    
    padding                : '0px !important',      
    overflow               : 'hidden',
    WebkitOverflowScrolling: 'hidden',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};


function formatar_valor2 (texto) {

  return (

      texto.replace('hora', 'h').replace('minutos','m').replace('hs','h').replace('mins','m')

  );

}

//function carrega_resultado(resultado, selecao_tipo) {
 
  
//}

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
      hora_formatada: '', 
      inicio: 0,
      tabIndex: "2",
      processo: 1,
      campselecaotipo: false,
      //tabAlteracaoIndex: '2',
     // tabInclusaoIndex: '2',
      obter_rota_nova: false,
      address: '',
      campeventoId: '',
      campDeletarId: '',
      campNome: '',
      selectedPlace:'',
      data_maior_filho: '',
      camptipoId: '',      
      campordem_servico: '',
      campnome_evento: '',
      campdata_evento: '',       
      campdata_servico: '',
      campqtdpassageiro: '',
      camphora_inicial: '',
      camphora_final: '',
      campMotoristaId: '',
      quantidade_diarias: false,
      campTelefone1: '',
      campservico_pai_id: '',
      camptipoevento: '',
      camplocalembarque: '',
      camplocaldesembarque: '',
      campqtddiarias: '',
      campnomemotorista:  '',
      camptelefonemotorista:  '',
      nome_motorista_visualizacao: false,
      telefone_motorista_visualizacao: false,
      campbilingue: false,
      campreceptivo: false,
      data_servico_pai_old: '',
      campdistancia: 0,
      verificaPai: '',
      valor_estimado_filho: '',
      distancia_filho: '',
      tempo_filho: '',
      quantidade_diarias: 0,
      eventoid: 0,
      quantidade_diarias: 0,
      camptempo: 0,      
      campcartaoid: '',
      campCompanhia_aerea: '',
      campNumero_voo: '',
      campvalor: '0,00',     
      camppedagio: '',     
      campvalor_estimado: '',
      totalviagens: 0,
      ultima_data_filho: '',
      valortotalviagens: '0,00',
      valor_oser: '',
      loading: true,
      valor_motorista: '',
      erro_nome: false,
      estado_selecionado_mapa: '',
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
      erro_qtd_diarias: false,
      novo_motorista_incluir: false,
      max_data_filho: '',
      mensagem_servico: '',
      erro_inclusao: '',
      camptempovalue: '',  
      estado_busca: '',
      camptempopaivalue: '',  
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
      mensagem_qtd_diarias: false,
      mensagem_cartao: '',
      mensagem_companhia_aerea: false,
      mensagem_numero_voo: false,
      mensagem_nome_motorista: false,
      mensagem_telefone_motorista: false,
      mensagem_error: false,
      possui_filho: false,
      valor_bilingue: '',
      valor_receptivo: '',
      valor_total_filho: 0,      
      km_total_filho: 0,
      tempo_total_filho: 0,
      listTarifas:[],
      listTarifasEspeciais:[],
      listDiarias:[],
      listDiariaEspeciais:[],
      listservicosfilho: [],
      translado:false,
      diaria: false,
      origins: '',     
      h: '',
      min: '',
      destinations:'',
      showMostraMotorista: false,
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
      validacao_qtd_diarias: false,
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
      listaFilhos:[],
      listaservicosexcluidos:[],
      listaCartao:[],
      listTodosMotoristasAtivos:[],
      listaFilhosAlteracao:[],
      listaMotoristasPreferencial:[],
      listaServicoAceito:[],
      erro_tipo: false,      
      embarque_latitude: '',
      embarque_longitude: '',
      desembarque_latitude: '',
      desembarque_longitude: '',
      possui_tarifa_especial: false,
      possui_tarifa: false,
      data_alteracao_servico: '',
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',        
      issuer: "",
      focused: "",
      loading: true,
    }

    this.nomeChange = this.nomeChange.bind(this);
    this.tipoChange = this.tipoChange.bind(this);
    this.motoristaChange = this.motoristaChange.bind(this);
    this.cartaoChange = this.cartaoChange.bind(this);
    this.telefone1change = this.telefone1change.bind(this);  
    this.verificaTelefone1 = this.verificaTelefone1.bind(this);  
    this.validatelefone1Change = this.validatelefone1Change.bind(this);  
    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.verificaNome = this.verificaNome.bind(this);  
    this.verificaNomeonfocus = this.verificaNomeonfocus.bind(this);      
    this.verificahora_inicial = this.verificahora_inicial.bind(this);
    
    this.verificafocushora_inicial = this.verificafocushora_inicial.bind(this);
    this.verificafocushora_final = this.verificafocushora_final.bind(this);

    this.verificahora_final = this.verificahora_final.bind(this);
    this.verificaqtddiaria = this.verificaqtddiaria.bind(this);

    //this.callbackFunc = this.callbackFunc.bind(this)
    this.nomemotoristaChange = this.nomemotoristaChange.bind(this);
    this.telefonemotoristaChange = this.telefonemotoristaChange.bind(this);
    //this.data_format = this.data_format.bind(this);
    
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
    this.verificaData_Evento = this.verificaData_Evento.bind(this);      
    
    this.validaDataServicoChange = this.validaDataServicoChange.bind(this);          
  }
   
  componentDidMount(){
        
 //  let eventoId = this.props.match.params.id;    
   // console.log('eventoId'+ eventoId);

  // this.interval = setInterval(() => this.tickservico(), 1000);
//debugger;
    this.setState({
      perfil: localStorage.getItem('logperfil'),
      id: localStorage.getItem('logid'),
      eventoId: this.props.match.params.id          
    });

    localStorage.setItem('logeventoservico',this.props.match.params.id);    

    this.loadlistServicosNovos();
    this.loadlistServicosAtivos(); 
   /* this.loadEvento();    
    this.loadlistServicos();
    this.loadTarifaespecial();
    this.loadTarifa();
    this.loadDiarias();
    this.loadDiariaespecial();
    this.valor_total_servicos();
    this.valor_total_viagens();
    this.loadlistServicosExcluidos();  */
    
  //  this.atualiza_evento();
   // this.teste();
   // this.calculo_rota_total();;
  }

 
  motoristaChange(e) {
   
    this.setState({ 
      campMotoristaId: e.target.value,    
    });

    if (e.target.value == 0) {
      this.setState({ 
        campnomemotorista: '',
        camptelefonemotorista: '', 
        nome_motorista_visualizacao: true,
        telefone_motorista_visualizacao: true,    
        validacao_telefone_motorista: false,
        validacao_nome_motorista: false,    
      });
    } else {
      this.busca_motorista_novo(e.target.value);
    }  
  }

  busca_motorista_novo(valor1) {
    debugger;
    this.state.listTodosMotoristasAtivos.map((data1)=>{          
       if (data1.id === valor1 ) {
        this.setState({
          camptelefonemotorista: data1.celular,
          campnomemotorista: data1.nome
        })
       }
    })
  }
 

  loadMotoristaData(){  
  
    return this.state.listaMotoristasPreferencial.map((data)=>{          
      return(
      <MenuItem value={data.id}>{data.nome}</MenuItem>      
      )
    })
  }

  loadMotoristasPreferencial() {
    api.get(`/motorista/list`)
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

     //   this.setState({listaMotoristasPreferencial:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }   

  refreshPage() {
    window.location.reload(false);
  }

  atualiza_evento() {
    debugger;
    let totalservicos = 0;
    let totalviagens = 0;
    api.get(`/servicos/totalservicos/${localStorage.getItem('logeventoservico')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
    .then(resservico=>{
      if (resservico.data.success == true) {
        totalservicos = resservico.data.data;  

        api.get(`/servicos/totalviagens/${localStorage.getItem('logeventoservico')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
        .then(resviagem=>{
          if (resviagem.data.success == true) {       
            
           totalviagens = resviagem.data.data;   

           const datapost_alterar_valores = {                
            viagens_total: totalviagens,
            valor_total: totalservicos,              
          }           
      
           api.put(`/eventos/update/${localStorage.getItem('logeventoservico')}`, datapost_alterar_valores);

          }
        })
        .catch(error=>{
          alert("Error server valor_total_viagens"+error)
        })

      }
    })
    .catch(error=>{
      alert("Error server valor_total_servicos "+error)
    })
  
  
  }
 

 /* teste() {
    const num = 6.647; 
    //O parâmetro da função é o número de casas decimais.
    const numeroFormatado = num.toFixed(1);
    
    console.log(numeroFormatado);
  } 
*/ 
 tickservico() {
  //this.loadServicos();    
  this.loadlistServicosNovos();
  //this.loadTarifaespecial();
  //this.loadTarifa();
  //this.valor_total_servicos();
  //this.valor_total_viagens();
 }

 componentWillUnmount() {
 // clearInterval(this.interval);
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
     //  debugger;
         this.setState({           
           valortotalviagens: data_formatada,
           valor_total_alterado: data.toFixed(2),
          });
       }
     })
     .catch(error=>{
       alert("Error server valor_total_servicos "+error)
     })
   }  

   valor_total_viagens(){

    api.get(`/servicos/totalviagens/${localStorage.getItem('logeventoservico')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success == true) {       
         
        const data = res.data.data   
        debugger;
      //   const valor = valorMask(data)
         this.setState({ totalviagens: data});
       }
     })
     .catch(error=>{
       alert("Error server valor_total_viagens"+error)
     })
   }  

  loadlistServicosNovos(){    
    api.get(`/envioservicoMotorista/list/${localStorage.getItem('logid')}`)
     .then(res=>{
       if (res.data.success == true) {       

         const data = res.data.data    
         this.setState({
           listservicoseventos:data,
           loading: false,
          })
       }
     })
     .catch(error=>{
       alert("Error server loadlistServicos "+error)
     })
   }

   loadlistServicosAtivos(){    
    api.get(`/motorista_servico/getMotoristaServico/${localStorage.getItem('logid')}`)
     .then(res=>{
       if (res.data.success == true) {       

         const data = res.data.data    
         this.setState({
           listaServicoAceito:data,
           loading: false,
          })
       }
     })
     .catch(error=>{
       alert("Error server loadlistServicos "+error)
     })
   }

   loadlistServicosExcluidos(){
    // const url = baseUrl+"/cliente/list"   
    //debugger;
    api.get(`/historicoServicos/listaservicosexcluidos/${localStorage.getItem('logeventoservico')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success == true) {
         const data = res.data.data    
         this.setState({
          listaservicosexcluidos:data,
           loading: false,
          })
       }
     })
     .catch(error=>{
       alert("Error server loadlistServicosExcluidos "+error)
     })
   }
   
   
   procura_filho() {

    let [responseData, setResponseData] = React.useState('')
    // fetches data
    const fetchData = (e) => {
        e.preventDefault()

        localStorage.setItem('logservicoid', this.state.campservicoId);
        api.get(`/servicos/MaxDataServicoFilho/${localStorage.getItem('logservicoid')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
        .then((response)=>{
            setResponseData(response.data.data)
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
   }


  carrega_servico(data){
    // const url = baseUrl+"/cliente/list"   
    //debugger;
    api.get(`/servicos/get/${data.id}`)
     .then(res=>{
       if (res.data.success == true) {
         hora_inicial = res.data.data[0].hora_inicial.substr(0,5)
         hora_final = res.data.data[0].hora_final.substr(0,5)
        this.setState({     
           camptipoId: res.data.data[0].tipoTransporte,           
           tabIndex: res.data.data[0].tipoEventoId.toString(),
         //  tabIndex: res.data.data[0].tipoEventoId,
          // tabInclusaoIndex: res.data.data[0].tipoEventoId,
          // tabAlteracaoIndex: res.data.data[0].tipoEventoId,
           campeventoId: res.data.data[0].eventoid,
           campNome: res.data.data[0].nome_passageiro,
           campTelefone1: res.data.data[0].telefone_passageiro,
           campqtdpassageiro: res.data.data[0].quantidade_passageiro,
           campdata_servico: dateFormat(res.data.data[0].data_servico, "UTC:dd/mm/yyyy"),
           camphora_inicial: res.data.data[0].hora_inicial.substr(0,5),
           camphora_final: res.data.data[0].hora_final.substr(0,5),
           campqtddiarias: res.data.data[0].quantidade_diarias,
           qtddiarias_old: res.data.data[0].quantidade_diarias,
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
           valor_bilingue: res.data.data[0].valor_bilingue,
           valor_receptivo: res.data.data[0].valor_receptivo, 
           campMotoristaId: res.data.data[0].motorista_id,      
           campnomemotorista: res.data.data[0].nome_motorista, 
           camptelefonemotorista: res.data.data[0].telefone_motorista, 
           campdistancia: res.data.data[0].km_translado,                     
           camptempovalue: res.data.data[0].tempo_value,
           camptempo: res.data.data[0].tempo_translado,
           campvalor_estimado: res.data.data[0].valor_estimado,        
           campvalor: res.data.data[0].valor_estimado,
           campcartaoid: res.data.data[0].cartaoId,       
           campservico_pai_id: res.data.data[0].servico_pai_id,      
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
            validacao_qtd_diarias: true,           
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

  
   handleEmbarqueFocusChange = camplocalembarque => {     
          
      this.setState({     
        estado_selecionado_mapa: '',
        camplocalembarque: '',
        embarque_latitude: '',
        embarque_longitude: '',  
        inicio: 1,  
      });  

       
  };
   

  handleDesembarqueFocusChange = camplocaldesembarque => {     
          
    this.setState({     
       estado_selecionado_mapa: '',
       camplocaldesembarque: '',
       desembarque_latitude: '',
       desembarque_longitude: '',  
      inicio: 1,  
    });  

     
};
   handleEmbarqueChange = camplocalembarque => {     
    
    geocodeByPlaceId(camplocalembarque.value.place_id)
    .then((results)=>{     
      
      this.setState({     
        estado_selecionado_mapa: results[0].address_components[3].short_name,
        camplocalembarque: camplocalembarque.label,
        embarque_latitude: results[0].geometry.location.lat().toString(),
        embarque_longitude: results[0].geometry.location.lng().toString(),  
        inicio: 1,  
      });  

      console.log(' resultado geocodeByPlaceId '+JSON.stringify(this.state, null, "    ")); 

    })
    .catch(error => console.error(error));
    
  };

  handlelocalDesembarqueChange = camplocaldesembarque => {
  
    geocodeByPlaceId(camplocaldesembarque.value.place_id)
    .then((results)=>{
      //console.log(' resultado '+JSON.stringify(results[0], null, "    ")); 
      this.setState({
       // estado_selecionado_mapa: results[0].address_components[3].short_name,
        camplocaldesembarque: camplocaldesembarque.label, 
        desembarque_latitude: results[0].geometry.location.lat().toString(),
        desembarque_longitude: results[0].geometry.location.lng().toString(),                
        inicio: 1,
      });  
   //   console.log(' resultado '+JSON.stringify(this.state, null, "    ")); 
    })
    .catch(error => console.error(error));    
 
  };
  
telefone1change(e) {
  this.setState({ campTelefone1: celularMask(e.target.value) })
}

qtdDiariaschange(e) {
  this.setState({ campqtddiarias: e.target.value })
}

qtdpassageiroschange(e) {
  this.setState({ campqtdpassageiro: e.target.value })
}

load_motorista(motorista_id){
  const { validate } = this.state   
  debugger;
  api.get(`/motorista/get/${motorista_id}`)
  .then((val)=>{

    //if (val.data.data !== null) {
      const data = val.data.data
      this.setState({ 
        campnomemotorista: data.nome,
        camptelefonemotorista: data.celular   
      });  
   // }  

   }).catch(error=>{
      validate.cnpjState = 'has-danger'
      this.setState({           
          mensagem_carro: 'Lista não encontrada' 
      })  
  })

}

verificafocushora_inicial(e) {  
  debugger
  if (e.target.value.trim().length > 4) {     
    this.setState({ 
      camphora_inicial: '00:00',
     })   
  } 
}  

verificafocushora_final(e) {  
  if (e.target.value.trim().length > 4) {     
    this.setState({ 
      camphora_final: '',
     })   
  } 
}  

verificahora_inicial(e) {  
  debugger;
  if (e.target.value.trim().length == 0) {  
   this.setState({ 
     erro_hora_inicial: false,
     validacao_hora_inicial: false,     
     mensagem_data_inicio: ""  
    })            
  } else if (e.target.value.trim().length > 4) {     
  // validate.faixa_finalState = 'has-success'
 // debugger;
   this.setState({         
   //  validate,
     erro_hora_inicial: false,
     validacao_hora_inicial: true,     
     inicio: 2,        
     mensagem_data_inicio: ""  
    })    
  
//debugger
 

  }            
}

verificahora_final(e) {  
  if (e.target.value.trim().length == 0) {  
   this.setState({ 
     erro_hora_final: false,
     validacao_hora_final: false,     
     mensagem_hora_final: ""  
    })            
  } else if (e.target.value.trim().length > 4) {     
  // validate.faixa_finalState = 'has-success'
  debugger;
   this.setState({         
   //  validate,
    erro_hora_final: false,
    validacao_hora_final: true,     
     inicio: 2,        
     mensagem_hora_final: ""  
    })  

  }            
}

verificaqtddiaria(e) {  
  if (e.target.value.trim().length == 0) {  
   this.setState({ 
     erro_qtd_diarias: true,
     validacao_qtd_diarias: false,     
     mensagem_qtd_diarias: ""  
    })            
  } else if (e.target.value.trim().length > 0) {     
    debugger;
  // validate.faixa_finalState = 'has-success'  
     if (this.state.campqtddiarias < this.state.qtddiarias_old) {
      
      this.setState({ 
        erro_qtd_diarias: true,
        validacao_qtd_diarias: false,
        mensagem_qtd_diarias: 'Exclua diária na lista',
        inicio: 1,   
       // campqtddiarias: this.state.qtddiarias_old,
      })

     } else { 
       
      this.setState({         
          //  validate,
            erro_qtd_diarias: false,
            validacao_qtd_diarias: true,            
            inicio: 2,        
            mensagem_qtd_diarias: ""  
            })            

            if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
              Promise.all([
                this.calcular_trajeto()
              ])    
            }
     } 
  }            
}

validaDataServicoChange(e) {    
 //   const { validate } = this.state
    let date_validar = e.target.value;
    var dia = date_validar.substr(0,2);
    var mes = date_validar.substr(3,2);   
    var ano = date_validar.substr(6,4);    

       if (e.target.value.length == 0) {     
        this.setState({ 
          erro_data_servico: true,   
          validacao_data_servico: false,      
          mensagem_data_servico: '' 
         })      
       } else if (e.target.value.length == 10) {

        debugger;       
      
        if ( mes == '02' && dia == 29 && (!Number.isInteger(ano / 4)) ){
         
            this.setState({ 
              erro_data_servico: true,   
              validacao_data_servico: false,      
              mensagem_data_servico: 'Dia é inválido.' 
             })  

        } else if ( mes == '02' && dia == 30) {

          this.setState({ 
            erro_data_servico: true,   
            validacao_data_servico: false,      
            mensagem_data_servico: 'Dia é inválido.' 
           })  

        } else if ( mes == '02' && dia == 31) {

            this.setState({ 
              erro_data_servico: true,   
              validacao_data_servico: false,      
              mensagem_data_servico: 'Dia é inválido.' 
             })  

        }  
        else {
      
          dia = date_validar.substr(0,2);
          mes = date_validar.substr(3,2);         

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
  //debugger;
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
     campselecaotipo: true,
     mensagem_servico: '',
     mensagem_tipoId: ""  
    })        
    
    debugger;   
    console.log('verificaTipo_veiculo ');
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
      //Promise.all([
       this.calcular_trajeto();
    //  ])    
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

  if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
   // Promise.all([
      this.calcular_trajeto()
    //])    
  }
}
hora_inicialchange(e) {
  this.setState({ camphora_inicial: e.target.value });
  hora_inicial= e.target.value;
  
    if (e.target.value.length > 4) {   
      
        if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
          Promise.all([
            this.calcular_trajeto()
          ])    
        }        
    }
 
}

hora_finalchange(e) {
  this.setState({ camphora_final: e.target.value });
  hora_final= e.target.value;

  console.log(' hora final '+e.target.value)
  console.log(' var hora final '+hora_final)
  if (e.target.value.length > 4) {   
    debugger;
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
      Promise.all([
        this.calcular_trajeto()
      ])    
   }
  } 
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


validatelefone1Change(e) {
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

loadEvento(){
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
           validacao_nome_evento: true,
           validacao_ordem_servico: true,
           validacao_data_evento: true,
         });   
         
         // this.setState({listEventos:data})
       }      
     })
     .catch(error=>{
       alert("Error server"+error)
     });
}
  

handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

}
  

tipoChange(e) {  
    this.setState({ camptipoId: e.target.value })      
/*
    debugger;
    //console.log('tipoChange ');    
    
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
      //Promise.all([
       this.calcular_trajeto();
    //  ])    
    } 
    */
    
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
    } else if (this.state.perfil == 3) {
      return ( 
        <div>
            <Menu_motorista />                
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

 
 

  sendAtualizarembarque(){      
   
   /// debugger;
    Promise.all([
      this.obtendo_distancia_rota_nova() 
    ])    
    
     this.handleCloseModalEmbarque();
    // this.handleCloseModalDesembarque();

  }  

  sendAtualizardesembarque(){      
   
    /// debugger;
    Promise.all([
      this.obtendo_distancia_rota_nova() 
    ])     
 
      //this.handleCloseModalEmbarque();
      this.handleCloseModalDesembarque();
 
   } 

  atualizando_o_pai() {

  }
  maior_data_filho = async () => {
    //  e.preventDefault()
     debugger;
      api.get(`/servicos/MaxDataServicoFilho/${this.state.campservicoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)                    
      .then(respMaxdata=>{
             debugger;
        if (respMaxdata.data.success == true) {
             this.setState({ ultima_data_filho: respMaxdata.data.data});
        }      
    
        }).catch(error=>{
            alert("Erro sevico log  "+ error)
        })  
     } 

  maior_data_filho_teste(data) {
  //  e.preventDefault()
   debugger;
    api.get(`/servicos/MaxDataServicoFilho/${data}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)                    
    .then(respMaxdata=>{
           debugger;
      if (respMaxdata.data.success == true) {
           this.setState({ ultima_data_filho: respMaxdata.data.data});
      }      
  
      }).catch(error=>{
          alert("Erro sevico log  "+ error)
      })  
   } 

 criar_filhos = async () => {
   debugger;
  let data_filho = '';
  const url = `/servicos/busca_filho/${this.state.campservicoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`;
  api.get(url)
  .then( (resultado) =>
     data_filho = resultado.data.data[0].data_servico
    // console.log('resultado '+ resultado.data.data)
      
  ).catch((error) => 
    console.log('error - '+error)
  )
 

  //var data1 = this.maior_data_filho();

  debugger;
    let valor_total_filhos = (parseFloat(valorDoublemask(this.state.campvalor))/ parseInt(this.state.campqtddiarias)).toFixed(2);
    let adicionafilho = Number(this.state.campqtddiarias) - Number(this.state.qtddiarias_old);   
         
    var data_alteracao_servico_v = dateFormat(data_filho, "UTC:dd/mm/yyyy");
         data_alteracao_servico_v = moment(data_alteracao_servico_v, "DD MM YYYY");

            debugger;
          // criar os filhos se tiver
            for(let i=0; i < adicionafilho; i++){
              debugger;
              this.setState({
                data_alteracao_servico: data_alteracao_servico_v.add(1, "days")
              })                        
                        const datapost_filho = {
                            tipoEventoId: this.state.tabIndex, 
                            eventoId: localStorage.getItem('logeventoservico'), 
                            tipoTransporte: this.state.camptipoId,
                            nome_passageiro: this.state.campNome, 
                            telefone_passageiro: this.state.campTelefone1,
                            quantidade_passageiro: this.state.campqtdpassageiro,  
                            data_servico: moment(this.state.data_alteracao_servico, "DD MM YYYY"),
                            quantidade_diarias: this.state.campqtddiarias, 
                            hora_inicial: this.state.camphora_inicial,  
                            hora_final: this.state.camphora_final,  
                          //  local_embarque: '', 
                            //local_desembarque: '', 
                            embarque_latitude: this.state.embarque_latitude, 
                            embarque_longitude: this.state.embarque_longitude, 
                            desembarque_latitude: this.state.desembarque_latitude, 
                            desembarque_longitude: this.state.desembarque_longitude, 
                            //motorista_alocado: this.state.motorista_alocado, 
                            distancia_value: this.state.km_total_filho, 
                          // tempo_value: this.state.tempo_total_filho,
                            companhia_aerea: this.state.campCompanhia_aerea,
                            numero_voo: this.state.campNumero_voo, 
                            motorista_bilingue: this.state.campbilingue, 
                            motorista_receptivo: this.state.campreceptivo, 
                            nome_motorista: this.state.campnomemotorista, 
                            telefone_motorista: this.state.camptelefonemotorista, 
                            km_translado: this.state.km_total_filho, 
                            tempo_translado: this.state.tempo_total_filho,
                            cartaoId: this.state.campcartaoid,        
                            valor_estimado: valorDoublemask(valor_total_filhos),    
                          //  valor_oser: (parseFloat('0.192') * valorDoublemask(valor_total_filhos)).toFixed(2),
                          //  valor_motorista: (parseFloat('0.768') * valorDoublemask(valor_total_filhos)).toFixed(2),                     
                            //motivo_cancelamento: this.state.campNome,
                            servico_pai_id: this.state.campservicoId,
                            logid: localStorage.getItem('logid'),
                            perfilId: 7,               
                        }                                
                      
                      console.log('criando os filhos  - '+JSON.stringify(datapost_filho, null, "    ")); 
                      api.post('/servicos/create',datapost_filho);                                      

                  }                        
  }
  
 
  atualiza_pai = async () => {  
    
    debugger;
    const datapost_alterar_pai = {     
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
      valor_bilingue: this.state.valor_bilingue,
      valor_receptivo: this.state.valor_receptivo,
      //motorista_alocado: this.state.motorista_alocado, 
      companhia_aerea: this.state.campCompanhia_aerea,
      numero_voo: this.state.campNumero_voo, 
      motorista_bilingue: this.state.campbilingue, 
      motorista_receptivo: this.state.campreceptivo, 
      motorista_id: this.state.campMotoristaId,   
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
      
      debugger;
      console.log('Update pai - '+JSON.stringify(datapost_alterar_pai, null, "    ")); 
      
      try {
     
       api.put(`/servicos/update/${this.state.campservicoId}`, datapost_alterar_pai)
       .then(response=>{
          if (response.data.success==true) {      
            console.log('atualizando o pai ');

          }
         })   
      } catch(err) {
          console.log('erro '+ err);
      }
        
  } 


  cria_filhos() {
debugger
                      let valor_total_filhos = (parseFloat(valorDoublemask(this.state.campvalor))/ parseInt(this.state.campqtddiarias)).toFixed(2);
                      let adicionafilho = Number(this.state.campqtddiarias) - Number(this.state.qtddiarias_old);   
                      let data_alteracao_servico_v = dateFormat(this.state.ultima_data_filho, "UTC:dd/mm/yyyy");
                           data_alteracao_servico_v = moment(data_alteracao_servico_v, "DD MM YYYY");
                  
                              debugger;
                            // criar os filhos se tiver
                              for(let i=0; i < adicionafilho; i++){
                                debugger;
                                  
                              ///  this.setState({
                                         data_alteracao_servico_v = data_alteracao_servico_v.add(1, "days")
                            ///    })                        
                                          const datapost_filho = {
                                              tipoEventoId: this.state.tabIndex, 
                                              eventoId: localStorage.getItem('logeventoservico'), 
                                              tipoTransporte: this.state.camptipoId,
                                              nome_passageiro: this.state.campNome, 
                                              telefone_passageiro: this.state.campTelefone1,
                                              quantidade_passageiro: this.state.campqtdpassageiro,  
                                              data_servico: moment(data_alteracao_servico_v, "DD MM YYYY"),
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
                                              distancia_value: this.state.km_total_filho, 
                                            // tempo_value: this.state.tempo_total_filho,
                                              companhia_aerea: this.state.campCompanhia_aerea,
                                              numero_voo: this.state.campNumero_voo, 
                                              motorista_bilingue: this.state.campbilingue, 
                                              motorista_receptivo: this.state.campreceptivo, 
                                              motorista_id: this.state.campMotoristaId,   
                                              nome_motorista: this.state.campnomemotorista, 
                                              telefone_motorista: this.state.camptelefonemotorista, 
                                              km_translado: this.state.km_total_filho, 
                                              tempo_translado: this.state.tempo_total_filho,
                                              cartaoId: this.state.campcartaoid,        
                                              valor_estimado: valorDoublemask(valor_total_filhos),    
                                            //  valor_oser: (parseFloat('0.192') * valorDoublemask(valor_total_filhos)).toFixed(2),
                                            //  valor_motorista: (parseFloat('0.768') * valorDoublemask(valor_total_filhos)).toFixed(2),                     
                                              //motivo_cancelamento: this.state.campNome,
                                              servico_pai_id: this.state.campservicoId,
                                              logid: localStorage.getItem('logid'),
                                              perfilId: 7,               
                                          }                                
                                        
                                          try {
                                            api.post('/servicos/create',datapost_filho)
                                            .then(response=>{
                                              if (response.data.success==true) {      
                                                console.log('criando o filho ');
                                    
                                              }
                                             })     
                                         } catch(err) {
                                             console.log('erro '+ err);
                                         }                                    
                                                                                                              
                  
                                    }    
  }


  atualizar_todos_filhos = async () => {
 
  //  let saida = false;
      const datapost_filho_alteracao_1 = {
          //tipoEventoId:  this.state.camptipoId,                             
          tipoTransporte: this.state.camptipoId,
          nome_passageiro: this.state.campNome, 
          telefone_passageiro: this.state.campTelefone1,
          quantidade_passageiro:this.state.campqtdpassageiro,                              
          quantidade_diarias: 1, 
          hora_inicial: this.state.camphora_inicial,  
          hora_final: this.state.camphora_final,         
          local_embarque: 'a combinar', 
          local_desembarque: 'a combinar', 
          embarque_latitude: this.state.embarque_latitude, 
          embarque_longitude: this.state.embarque_longitude, 
          desembarque_latitude: this.state.desembarque_latitude, 
          desembarque_longitude: this.state.desembarque_longitude,                             
          companhia_aerea: this.state.campCompanhia_aerea,
          numero_voo: this.state.campNumero_voo, 
          motorista_bilingue: this.state.campbilingue, 
          motorista_receptivo: this.state.campreceptivo, 
          motorista_id: this.state.campMotoristaId,   
          nome_motorista: this.state.campnomemotorista, 
          telefone_motorista: this.state.camptelefonemotorista, 
          cartaoId: this.state.campcartaoid,                                                            
        // valor_estimado: this.state.listservicosfilho[i].valor_estimado,    
      }       
     debugger;

      try {
        api.put(`/servicos/update_filhos/${this.state.campservicoId}`, datapost_filho_alteracao_1)
        .then(response=>{
          if (response.data.success==true) {      
            console.log('atualizando o pai ');

          }
         })   
      } catch(err) {
          console.log('erro '+ err);
      }    

      console.log('Update filho - '+JSON.stringify(datapost_filho_alteracao_1, null, "    ")); 
     
      
   // return saida;  
  }

  resolverDepoisDe2Segundos(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }
 
  async getUsers(){
    return new Promise((resolve, reject) => {
      api.get(`/servicos/MaxDataServicoFilho/${localStorage.getItem('logservicoid')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
      .then(({ data }) => resolve(data))
    });
  }

  criando_filhos_old1 = async () => {
    var data_ultima = api.get(`/servicos/MaxDataServicoFilho/${localStorage.getItem('logservicoid')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`);
  //  this.setState({ ultima_data_filho: data_ultima});
    data_ultima.then(data => {
      debugger;
      return data;
    })
 // return data_ultima;
  };

  

  senUpdate() {

    const datapost_alterar = {     
      logid: localStorage.getItem('logid'),
      perfilId: localStorage.getItem('logperfil'),    
      ordem_servico: this.state.campordem_servico,         
      nome_evento: this.state.campnome_evento, 
      data_evento: moment(this.state.campdata_evento, "DD MM YYYY"),   
      statusId: 1,      
     }           
    
    api.put(`/eventos/update/${localStorage.getItem('logeventoservico')}`, datapost_alterar)
    .then(response=>{
      if (response.data.success==true) {                                  
  
         this.setState({                
           mensagem_usuario: 'Evento alterado com sucesso!'
         });
     
        //this.verifica_botao(1);
        //this.listservicoseventos();
        this.loadlistServicos();
        this.handleCloseModalAlteracaoEvento();
        this.envia_mensagemClick();                     

      }
    }).catch(error=>{
      alert("Error 34 ")
    })
 


  } 

  /*
  ultima_data_filho() {
   // api.get(`/servicos/MaxDataEvento/${this.state.campservicoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
    api.get(`/servicos/busca_filho/${this.state.campservicoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
    .then(respdataservico=>{    

      if (respdataservico.data.success == true) {    
        this.setState({  
          max_data_filho: respdataservico.data.data       
        });       
      }  
      
    })                        
    .catch(error=>{
      alert("Error server 2 "+error)
    })      
  }
  */

 atualiza_filhos_data_servico() {
   debugger;
 
   var data_alteracao_servico_filho = moment(this.state.campdata_servico, "DD MM YYYY");

  // var alterardatafilhos = this.state.quantidade_diarias;
  
   api.get(`/servicos/busca_filho/${this.state.campservicoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
   .then(response=>{

    
    if (response.data.success==true) {      

      const data = response.data.data

      this.setState({listaFilhosAlteracao:data})
      
    }

    this.state.listaFilhosAlteracao.map((filhos)=>{

      data_alteracao_servico_filho = data_alteracao_servico_filho.add(1, "days");
      
      const data_filho = {           
        data_servico: moment(data_alteracao_servico_filho, "DD MM YYYY"),
      }  

      api.put(`/servicos/update/${filhos.id}`, data_filho)
      .then(resppai=>{    

        debugger;
        if (resppai.data.success == true) {              

           console.log('filhos - data servico '+moment(data_alteracao_servico_filho, "DD MM YYYY"));            
        }

      }).catch(error=>{
        alert("Error server 2 "+error)
      })        
    
      })  
 
    });
 }

  sendSave(){             

    this.setState({                
      validacao_data_servico: false,
      validacao_nome: false,   
      validacao_data_evento: false, 
      mensagem_aguarde: 'Aguarde, alterando os dados...',     
      validacao_telefone1: false,
    //  valor_oser: '0.192',
    //  valor_motorista: '0.768',         
    });
  
  ///  this.verifica_botao(1);     

  debugger;

    if (this.state.incluir == true) {

      debugger;
          // this.calculo_bilingue();
          // this.calculo_receptivo();   
        
        // busca_motorista();
         
            const datapost_incluir = {
              tipoEventoId: this.state.tabIndex, 
              eventoId: localStorage.getItem('logeventoservico'), 
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
              km_translado: this.state.campdistancia, 
              tempo_translado: this.state.camptempo,
              companhia_aerea: this.state.campCompanhia_aerea,
              numero_voo: this.state.campNumero_voo, 
              motorista_bilingue: this.state.campbilingue, 
              valor_bilingue: this.state.valor_bilingue,
              valor_receptivo: this.state.valor_receptivo,
              motorista_receptivo: this.state.campreceptivo, 
              motorista_id: this.state.campMotoristaId,    
              nome_motorista: this.state.campnomemotorista, 
              telefone_motorista: this.state.camptelefonemotorista, 
             
              cartaoId: this.state.campcartaoid,        
              valor_estimado: valorDoublemask(this.state.campvalor),    
              valor_oser: (parseFloat('0.192') * valorDoublemask(this.state.campvalor)).toFixed(2),
              valor_motorista: (parseFloat('0.768') * valorDoublemask(this.state.campvalor)).toFixed(2),                     
              //motivo_cancelamento: this.state.campNome,
              logid: localStorage.getItem('logid'),
              servico_pai_id: 0,
              perfilId: 7,               
            }           
         
            // console.log('criar serviço - '+JSON.stringify(datapost_incluir, null, "    ")); 
             api.post('/servicos/create',datapost_incluir)
             .then(respevento=>{    

               if (respevento.data.success == true) {          

            //    debugger;
                const data = respevento.data.data;
                const pai_servico = data.id;

                let valor_total_filhos = (parseFloat(data.valor_estimado) / parseInt(this.state.campqtddiarias)).toFixed(2);
              
                if (this.state.campqtddiarias > 1) {
                    let data_alteracao_servico = moment(this.state.campdata_servico, "DD MM YYYY");                   

                    debugger;
                    for(let i=0; i < this.state.campqtddiarias - 1; i++){

                           data_alteracao_servico = data_alteracao_servico.add(1, "days");
                            const datapost_filho = {
                                tipoEventoId: this.state.tabIndex, 
                                eventoId: localStorage.getItem('logeventoservico'), 
                                tipoTransporte: this.state.camptipoId,
                                nome_passageiro: this.state.campNome, 
                                telefone_passageiro: this.state.campTelefone1,
                                quantidade_passageiro: this.state.campqtdpassageiro,  
                                data_servico: moment(data_alteracao_servico, "DD MM YYYY"),
                                quantidade_diarias: 1, 
                                hora_inicial: this.state.camphora_inicial,  
                                hora_final: this.state.camphora_final,  
                                local_embarque: 'a combinar', 
                                local_desembarque: 'a combinar', 
                                embarque_latitude: this.state.embarque_latitude, 
                                embarque_longitude: this.state.embarque_longitude, 
                                desembarque_latitude: this.state.desembarque_latitude, 
                                desembarque_longitude: this.state.desembarque_longitude, 
                                //motorista_alocado: this.state.motorista_alocado, 
                                distancia_value: this.state.km_total_filho, 
                               // tempo_value: this.state.tempo_total_filho,
                                companhia_aerea: this.state.campCompanhia_aerea,
                                numero_voo: this.state.campNumero_voo, 
                                motorista_bilingue: this.state.campbilingue, 
                                motorista_receptivo: this.state.campreceptivo, 
                                motorista_id: this.state.campMotoristaId,   
                                nome_motorista: this.state.campnomemotorista, 
                                telefone_motorista: this.state.camptelefonemotorista, 
                                km_translado: this.state.km_total_filho, 
                                tempo_translado: this.state.tempo_total_filho,
                                cartaoId: this.state.campcartaoid,        
                                valor_estimado: valorDoublemask(valor_total_filhos),    
                              //  valor_oser: (parseFloat('0.192') * valorDoublemask(valor_total_filhos)).toFixed(2),
                              //  valor_motorista: (parseFloat('0.768') * valorDoublemask(valor_total_filhos)).toFixed(2),                     
                                //motivo_cancelamento: this.state.campNome,
                                servico_pai_id: pai_servico,
                                logid: localStorage.getItem('logid'),
                                perfilId: 7,               
                             }                                
                          
                      //   console.log('criando os filhos  - '+JSON.stringify(datapost_filho, null, "    ")); 
                          api.post('/servicos/create',datapost_filho)                         
                          .then(respfilho=>{    

                            if (respfilho.data.success == true) {       
                              const data1 = respfilho.data.data;
                              data_alteracao_servico = moment(data1.data_servico, "DD MM YYYY");                            
                            }  

                          })                        
                          .catch(error=>{
                            alert("Error server 2 "+error)
                          })     
                      }


                   }
              // debugger;
                //console.log(`/servicos/totalservicos/${this.state.campeventoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`); 

                //api.get(`/servicos/totalservicos/${this.state.campeventoId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
                //  .then(res=>{
                    
                  //  if (res.data.success == true) {
                    const total_estimado =  data.valor_estimado;
                    const valortotalviagens = valorDoublemask(this.state.valortotalviagens);
                    const total_visgens =  parseFloat(this.state.totalviagens) + parseFloat(1);
                    const valor_total = parseFloat(total_estimado) + parseFloat(valortotalviagens)

                      const datapost_alterar = {
                         logid: localStorage.getItem('logid'),
                         perfilId: 7,    
                         viagens_total: total_visgens,
                         valor_total: valor_total, 
                      }

                      
                      api.put(`/eventos/update/${this.state.campeventoId}`, datapost_alterar)
                      .then(respevento1=>{
                        if (respevento1.data.success==true) {    

                          this.setState({                
                            mensagem_usuario: 'Serviço incluído com sucesso!'
                           });
                        
                           debugger;
                           this.verifica_botao(1);
                           this.handleCloseModalInclusao();
                           this.loadlistServicos();
                           this.valor_total_servicos();
                           this.valor_total_viagens();
                           this.envia_mensagemClick();  
                           this.atualiza_evento();
                           this.refreshPage();  

                         // this.props.history.push(`/lista_evento_servico/${localStorage.getItem('logeventoservico')}`);  

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
      
   } else { //Alteração
    
    if (this.state.tabIndex == 1) {

   debugger;
    if (this.state.campservico_pai_id == 0) {        

      debugger;
      const datapost_alterar_pai = {     
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
        valor_bilingue: this.state.valor_bilingue,
        valor_receptivo: this.state.valor_receptivo,
        //motorista_alocado: this.state.motorista_alocado, 
        companhia_aerea: this.state.campCompanhia_aerea,
        numero_voo: this.state.campNumero_voo, 
        motorista_bilingue: this.state.campbilingue, 
        motorista_receptivo: this.state.campreceptivo, 
        motorista_id: this.state.campMotoristaId,   
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

        debugger;
        //console.log('valor_total_filhos_2 '+ valor_total_filhos_2);
       //console.log('tempo_value '+ this.state.camptempovalue);       
        if (this.state.data_servico_pai_old !== this.state.campdata_servico) {
             this.atualiza_filhos_data_servico();
        }
       //alterando a data_servico do pai, criar funcao atualizando data_servico dos filhos 
        
       //

      api.put(`/servicos/update/${this.state.campservicoId}`, datapost_alterar_pai)
      .then(resppai=>{    

        if (resppai.data.success == true) {         
          
          let valor_total_filhos_2 = ( valorDoublemask(this.state.campvalor) / parseInt(this.state.campqtddiarias)).toFixed(2);

          let tempo_filho_value = this.state.camptempo
  
          if (this.state.tempo_total_filho == 0) {
            tempo_filho_value = tempo_filho_value
          } else {
            tempo_filho_value = this.state.tempo_total_filho  
          }

          const datapost_filho_alteracao_1 = {
            //tipoEventoId:  this.state.camptipoId,                             
            tipoTransporte: this.state.camptipoId,
            nome_passageiro: this.state.campNome, 
            telefone_passageiro: this.state.campTelefone1,
            quantidade_passageiro:this.state.campqtdpassageiro,                              
            quantidade_diarias: 1, 
            hora_inicial: this.state.camphora_inicial,  
            hora_final: this.state.camphora_final,         
            local_embarque: 'a combinar', 
            local_desembarque: 'a combinar', 
            tempo_value: this.state.camptempovalue,
            tempo_translado: tempo_filho_value, 
            embarque_latitude: this.state.embarque_latitude, 
            embarque_longitude: this.state.embarque_longitude, 
            desembarque_latitude: this.state.desembarque_latitude, 
            desembarque_longitude: this.state.desembarque_longitude,                             
            companhia_aerea: this.state.campCompanhia_aerea,
            numero_voo: this.state.campNumero_voo, 
            motorista_bilingue: this.state.campbilingue, 
            motorista_receptivo: this.state.campreceptivo,
            motorista_id: this.state.campMotoristaId,   
            nome_motorista: this.state.campnomemotorista, 
            telefone_motorista: this.state.camptelefonemotorista, 
            cartaoId: this.state.campcartaoid,   
            valor_estimado: valorDoublemask(valor_total_filhos_2),      
           /// valor_estimado: (parseInt(this.state.campqtddiarias) / parseFloat(this.state.campvalor)).toFixed(2),                                                       
           // valor_estimado: this.state.listservicosfilho[i].valor_estimado,    
        }   

          api.put(`/servicos/update_filhos/${this.state.campservicoId}`, datapost_filho_alteracao_1)
          .then(respfilho=>{    
    
            if (respfilho.data.success == true) {    

              this.setState({                
                mensagem_usuario: 'Serviço Alterado com sucesso!'
               });
         
               this.refreshPage();                 
               this.handleCloseModalAlteracaoServico();
               this.refreshPage();
               this.envia_mensagemClick(); 


            }
          });    

        }
      });  

     /* const atualizacao_pais_callback = async () => {
        const pai = await api.put(`/servicos/update/${this.state.campservicoId}`, datapost_alterar_pai)
    //    const filho = await api.put(`/servicos/update_filhos/${this.state.campservicoId}`, datapost_filho_alteracao_1)
        Promise.all(
          pai.map(async (product) => {
            const filhoId = await api.put(`/servicos/update_filhos/${this.state.campservicoId}`, datapost_filho_alteracao_1);
          })
        )
      
        //console.log(products);
      }
      atualizacao_pais_callback();   
    */
       
      /* pegar os filhos e atualizar */
    //  this.atualizar_todos_filhos();          
    /*          
      if (this.state.campqtddiarias > this.state.qtddiarias_old) {                          
        Promise.all([  
            this.cria_filhos()                   
        ])      
      } */       
                
        
    } else {

        const datapost_filho_alteracao_1 = {
          //tipoEventoId:  this.state.camptipoId,                             
          tipoTransporte: this.state.camptipoId,
          nome_passageiro: this.state.campNome, 
          data_servico: moment( this.state.campdata_servico, "DD MM YYYY"),
          telefone_passageiro: this.state.campTelefone1,
          quantidade_passageiro:this.state.campqtdpassageiro,                              
          quantidade_diarias: this.state.campqtddiarias, 
          distancia_value: this.state.campdistancia, 
          tempo_value: this.state.camptempovalue,
          km_translado: this.state.campdistancia, 
          tempo_translado: this.state.camptempo,
          hora_inicial: this.state.camphora_inicial,  
          hora_final: this.state.camphora_final,  
          local_embarque: this.state.camplocalembarque, 
          local_desembarque: this.state.camplocaldesembarque, 
          embarque_latitude: this.state.embarque_latitude, 
          embarque_longitude: this.state.embarque_longitude, 
          desembarque_latitude: this.state.desembarque_latitude, 
          desembarque_longitude: this.state.desembarque_longitude,                             
          companhia_aerea: this.state.campCompanhia_aerea,
          numero_voo: this.state.campNumero_voo, 
          motorista_bilingue: this.state.campbilingue, 
          motorista_receptivo: this.state.campreceptivo, 
          motorista_id: this.state.campMotoristaId,   
          nome_motorista: this.state.campnomemotorista, 
          telefone_motorista: this.state.camptelefonemotorista, 
          cartaoId: this.state.campcartaoid,                                                            
        // valor_estimado: this.state.listservicosfilho[i].valor_estimado,    
      }       
     debugger;

     // console.log('Update filho - '+JSON.stringify(datapost_filho_alteracao_1, null, "    ")); 
     api.put(`/servicos/update_filhos/${this.state.campservicoId}`, datapost_filho_alteracao_1)
     .then(resppai=>{    

       if (resppai.data.success == true) {       

          this.setState({                
            mensagem_usuario: 'Serviço Alterado com sucesso!'
          });
    
          this.refreshPage();                 
          this.handleCloseModalAlteracaoServico();
          // this.refreshPage();
          this.envia_mensagemClick();   

       }
      });

      }          
    } else { // translados

          const datapost_translado_alteracao_1 = {
            //tipoEventoId:  this.state.camptipoId,                             
            tipoTransporte: this.state.camptipoId,
            nome_passageiro: this.state.campNome, 
            data_servico: moment( this.state.campdata_servico, "DD MM YYYY"),
            telefone_passageiro: this.state.campTelefone1,
            quantidade_passageiro:this.state.campqtdpassageiro,                              
            quantidade_diarias: this.state.campqtddiarias, 
            hora_inicial: this.state.camphora_inicial,  
            hora_final: this.state.camphora_final,  
            distancia_value: this.state.campdistancia, 
            tempo_value: this.state.camptempovalue,
            km_translado: this.state.campdistancia, 
            tempo_translado: this.state.camptempo,
            local_embarque: this.state.camplocalembarque, 
            local_desembarque: this.state.camplocaldesembarque, 
            embarque_latitude: this.state.embarque_latitude, 
            embarque_longitude: this.state.embarque_longitude, 
            desembarque_latitude: this.state.desembarque_latitude, 
            desembarque_longitude: this.state.desembarque_longitude,                             
            companhia_aerea: this.state.campCompanhia_aerea,
            numero_voo: this.state.campNumero_voo, 
            motorista_bilingue: this.state.campbilingue, 
            motorista_receptivo: this.state.campreceptivo, 
            motorista_id: this.state.campMotoristaId,   
            nome_motorista: this.state.campnomemotorista, 
            telefone_motorista: this.state.camptelefonemotorista, 
            cartaoId: this.state.campcartaoid,   
            valor_estimado: valorDoublemask(this.state.campvalor),                                                             
          // valor_estimado: this.state.listservicosfilho[i].valor_estimado,    
        }  
        
        api.put(`/servicos/update/${this.state.campservicoId}`, datapost_translado_alteracao_1)
        .then(resppai=>{    
  
          if (resppai.data.success == true) {       

            this.setState({                
              mensagem_usuario: 'Serviço Alterado com sucesso!'
            });
      
            this.refreshPage();                 
            this.handleCloseModalAlteracaoServico();
          // this.refreshPage();
            this.envia_mensagemClick();   

          }
        });    
       

       
    }          
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

async getData(){
  const res = api.get(`/servicos/MaxDataServicoFilho/${localStorage.getItem('logservicoid')}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`);
  console.log(res.data.json());
}

verifica_rota_embarque(inicio) {
  const { validate } = this.state 

//  console.log(' inicio verifica_rota - '+JSON.stringify(this.state, null, "    "))

  if (inicio == 1) {
    
    /* this.state.validacao_tipo == true ||     
    || this.state.validacao_localembarque == true || this.state.validacao_localdesembarque == true 
          || this.state.validacao_qtdpassageiro == true
          || this.state.validacao_Telefone1 == true
     */
      if (this.state.camplocalembarque !== "" || this.state.camplocaldesembarque !== "") { 
        //this.state.validacao_hora_inicial == true  && this.state.validacao_hora_final == true  ) { 
        return (
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendAtualizarembarque()}>
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

verifica_rota_desembarque(inicio) {
  const { validate } = this.state 

//  console.log(' inicio verifica_rota - '+JSON.stringify(this.state, null, "    "))

  if (inicio == 1) {
    
    /* this.state.validacao_tipo == true ||     
    || this.state.validacao_localembarque == true || this.state.validacao_localdesembarque == true 
          || this.state.validacao_qtdpassageiro == true
          || this.state.validacao_Telefone1 == true
     */
      if (this.state.camplocalembarque !== "" || this.state.camplocaldesembarque !== "") { 
        //this.state.validacao_hora_inicial == true  && this.state.validacao_hora_final == true  ) { 
        return (
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendAtualizardesembarque()}>
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

delay() {
  // `delay` returns a promise
  return new Promise(function(resolve, reject) {
    // Only `delay` is able to resolve or reject the promise
    setTimeout(function() {
      resolve(42); // After 3 seconds, resolve the promise with value 42
    }, 3000);
  });
}

  verifica_botao(inicio) {
    const { validate } = this.state 

   // console.log(' inicio verifica_botao - '+JSON.stringify(this.state, null, "    "))
   
      
      /* this.state.validacao_tipo == true ||     
      || this.state.validacao_localembarque == true || this.state.validacao_localdesembarque == true 
            || this.state.validacao_qtdpassageiro == true
            || this.state.validacao_Telefone1 == true
       */
        if (this.state.validacao_qtdpassageiro == true && this.state.validacao_data_servico == true 
          && this.state.validacao_nome == true && this.state.validacao_telefone1 == true && 
          this.state.validacao_hora_inicial == true && this.state.validacao_localembarque == true && 
          this.state.validacao_localdesembarque == true && this.state.campcartaoid !== '' && this.state.mensagem_servico === "") { 
          //this.state.validacao_hora_inicial == true  && this.state.validacao_hora_final == true  ) { 
         if (this.state.tabIndex == 1) {

            if (this.state.validacao_qtd_diarias == true) {     
              
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
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_evento_modal"  p={2} onClick={()=>this.sendSave()}>
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
 
  verifica_botao_evento(inicio) {
    const { validate } = this.state 
   

    if (inicio == 1) {
      
      /* this.state.validacao_tipo == true ||     
      || this.state.validacao_localembarque == true || this.state.validacao_localdesembarque == true 
            || this.state.validacao_qtdpassageiro == true
            || this.state.validacao_Telefone1 == true
       */
        if (this.state.validacao_ordem_servico == true && this.state.validacao_nome_evento == true 
          && this.state.validacao_data_evento == true) { 
          //this.state.validacao_hora_inicial == true  && this.state.validacao_hora_final == true  ) { 
          return (
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_evento_modal"  p={2} onClick={()=>this.senUpdate()}>
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

  
  obtendo_distancia_rota_nova = () => { 
    debugger 

    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && this.state.obter_rota_nova == false) {    
      var origem = this.state.camplocalembarque;
      var destino = this.state.camplocaldesembarque;   
      this.setState({                
       obter_rota_nova: true,
      });
   
      function CalculaDistancia(origem, destino) {
        return new Promise(function(resolve, reject) {
          var service = new window.google.maps.DistanceMatrixService();
          debugger
          service.getDistanceMatrix({
            origins: [origem],
            destinations: [destino],
            travelMode: window.google.maps.TravelMode.DRIVING
          }, 
          function(response, status) {
            if (status == window.google.maps.DistanceMatrixStatus.OK) {
                resolve(response);               
            } else {
                reject(status);
            }
          }); 
        });
      }
                                                
      CalculaDistancia(origem, destino)
        .then(function(response) {
         
          debugger
          if (response.rows[0].elements[0].status !== "NOT_FOUND") {
              campdistancia_global = (response.rows[0].elements[0].distance.value / 1000).toFixed(0)
              camptempovalue_global = (response.rows[0].elements[0].duration.value / 60).toFixed(0)
              camptempo_global = response.rows[0].elements[0].duration.text 
          }
         }, function(status) {
           console.log('Não foi possível realizar a operação! Status: ' + status);
      });
    
    }
  }

  
 
  obtendo_distancia_rota = () => { 
    debugger   
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '') {

      var origin1 = new window.google.maps.LatLng(55.930385, -3.118425);
      var origin2 = this.state.camplocalembarque;
      var destinationA = this.state.camplocaldesembarque;
      var destinationB = new window.google.maps.LatLng(50.087692, 14.421150);

    // const origin1 = new window.google.maps.LatLng(this.state.embarque_latitude.toString(),this.state.embarque_longitude.toString());
    // const destino1 = new window.google.maps.LatLng(this.state.desembarque_latitude.toString(),this.state.desembarque_longitude.toString());
         
      var service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin2],
          destinations: [destinationA],      
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
         // avoidHighways: false,
         // avoidTolls: false,
        //  unitSystem: 'metric',    
        }, function(response, status) {
          
          debugger;
          console.log(' RESPONSE1 - '+JSON.stringify(response, null, "    "))       
          if (status !== "OK") {
              alert("Error was: " + status);
          } else {
                debugger;
                console.log(' RESPONSE2 - '+JSON.stringify(response, null, "    "))       

                campdistancia_global = (response.rows[0].elements[0].distance.value / 1000).toFixed(0)
                camptempovalue_global = (response.rows[0].elements[0].duration.value / 60).toFixed(0)                
                camptempo_global = response.rows[0].elements[0].duration.text 

                console.log(' camptempovalue_global - '+JSON.stringify(camptempovalue_global, null, "    "))  
                console.log(' camptempo_global - '+JSON.stringify(camptempo_global, null, "    "))              
            }         
        
        });     
    }  
      
  }

  envio_convite_motorista_selecionado(servico){

    debugger;

    api.get(`/motorista_selecionados/getChave/${this.state.chave_aleatoria_motorista}`)                    
    .then(respMotorista=>{

    if (respMotorista.data.success == true) {      
     
      debugger;
      respMotorista.data.data.map((data)=>{

          const datapost_motorista = {
            servicoId: servico.id,
            tipoEventoId: servico.tipoEventoId, 
            eventoId: servico.eventoId, 
            tipoTransporte: servico.tipoTransporte,
            nome_passageiro: servico.nome_passageiro, 
            telefone_passageiro: servico.telefone_passageiro,
            quantidade_passageiro: servico.quantidade_passageiro,  
            data_servico: servico.data_servico,
            quantidade_diarias: servico.quantidade_diarias, 
            hora_inicial: servico.hora_inicial,  
            hora_final: servico.hora_final,  
            local_embarque: servico.local_embarque, 
            local_desembarque: servico.local_desembarque, 
            embarque_latitude: servico.embarque_latitude, 
            embarque_longitude: servico.embarque_longitude, 
            desembarque_latitude: servico.desembarque_latitude, 
            desembarque_longitude: servico.desembarque_longitude, 
            distancia_value: servico.distancia_value, 
            tempo_value: servico.tempo_value,
            km_translado: servico.km_translado, 
            tempo_translado: servico.tempo_translado,
            companhia_aerea: servico.companhia_aerea,
            numero_voo: servico.numero_voo, 
            motorista_bilingue: servico.motorista_bilingue, 
            valor_bilingue: servico.valor_bilingue,
            valor_receptivo: servico.valor_receptivo,
            motorista_receptivo: servico.motorista_receptivo,         
            nome_motorista: servico.nome_motorista, 
            telefone_motorista: servico.telefone_motorista, 
            motorista_id: data.motoristaId,        
            logid: servico.logid,
            perfilId: 3,               
          }  
         debugger;

         console.log(' envioservicoMotorista/create '+JSON.stringify(datapost_motorista, null, "    ")); 
          api.post('/envioservicoMotorista/create',datapost_motorista);   
        });

        debugger;
        api.delete(`/motorista_selecionados/delete/${this.state.chave_aleatoria_motorista}`);                    
      } 
    });  
  }

 // procurar_motorista_servico = async () => { 

  verifica_motorista_selecionados(motorista_id, tipoTransporte){
    motorista_incluido = motorista_incluido + 1;

    const datapost_motorista = {     
      motoristaId: motorista_id,
      chave_acesso: this.state.chave_aleatoria_motorista, 
    }      

    debugger;  
    //verificar se o motorista tem o veiculo selecionado 
    //console.log(`/veiculo/getVeiculoSelecionado/${motoristas.id}/${tipoTransporte}`);   
    api.get(`/veiculo/getVeiculoSelecionado/${motorista_id}/${tipoTransporte}`)                    
    .then(respveiculo=>{   

      debugger;   
      if (respveiculo.data.success == true) {          
        //
        debugger;   
        api.post('/motorista_selecionados/create',datapost_motorista);
        possui_motorista = true;   
    //    this.setState({ motorista_incluido: this.state.motorista_incluido + 1 });      

       // this.finalizando_processo_busca();
                  
      }  

  }).catch(error=>{
    alert("Error getVeiculoSelecionado"+error)
  });

  }

  finalizando_processo_busca() {

    debugger;

    if ( motorista_incluido == total_motorista ) {
      if (possui_motorista == true) {
         this.envio_convite_motorista_selecionado();    
          motorista_incluido = 0;
      } else {
       // this.envio_convite_motorista_selecionado();    
        alert("Não foi encontrado motorista disponível, para atender a esse serviço no momento ")
      }
    }      

  }

  procurar_motorista_servico() { 
    //bloquear_cartao com o valor total mais a porcentagem de acrescimo
    debugger;
    possui_motorista = false; 

    const teste_data = moment(this.state.campdata_servico, "DD/MM/YYYY");
    const formatar_data = teste_data.format("YYYY-MM-DD");    
    const data_servico_date = new Date(formatar_data);
   // var controle_motorista = 0;

    var data_servico = dateFormat(this.state.campdata_servico, "UTC:dd/mm/yyyy");
    var hora_ini = this.state.camphora_inicial.substring(0,5);   
  
    const dataatual = new Date(`${data_servico} ${hora_ini}`);

     var data_tres_horas_mais = moment(
       dataatual, "D/M/YYYY h:m"
     ).add(             
      'hours', 3
     );    

    var hora_maior_tres = data_tres_horas_mais.format("HH:mm");

    var data_tres_horas_menos = moment(
      dataatual, "D/M/YYYY h:m"
    ).subtract(             
      'hours', 3
    );   
   
     var hora_menor_tres = data_tres_horas_menos.format("HH:mm");   
   
   // const data_servico_date = new Date(formatar_data);
    
    // Não ter outro serviço no mesmo dia e horário.
    //Não estar alocado em outro serviço 3 horas antes ou 3 horas depois da hora inicial do serviço atual.
   
    //O serviço não ter sido aceito por outro motorista.
    //Não ter ele mesmo cancelado esse serviço.

    //var retorno = false;
    // se cartao ok 
        var bilingue_result = 0;
        if (this.state.campbilingue == true) {
          bilingue_result = 1; 
        } 
        var bilingue = bilingue_result;
        var estado_motorista = this.state.estado_selecionado_mapa;
        var tipoTransporte = this.state.camptipoId;        
       
        var verifica_possui_servico = false;
      
        debugger;
        api.get(`/motorista/getMotoristaServico/${estado_motorista}/${bilingue}`)                    
        .then(respMotorista=>{

          debugger;
          if (respMotorista.data.success == true) {  

            debugger
          // var count_motoristas = respMotorista.data.data.length; 
          // for(let i=0; i < respMotorista.data.data.length - 1; i++){
          // respMotorista.data.map((selecao)=>{
            total_motorista = respMotorista.data.data.length;
            motorista_incluido = 0;
            var mot_sel = respMotorista.data.data;

             mot_sel.map((mot)=>{             
             
              //Não estar alocado em outro serviço 3 horas antes ou 3 horas depois da hora inicial do serviço atual.
              // verifica_possui_servico();
              
                api.get(`/motorista_servico/getMotoristaServico/${mot.id}`)                    
                .then(respservico=>{   
                  
                  debugger
                
                  if (respservico.data.success == true) {     
                     
                     const response_data = respservico.data.data[0];

                     console.log(' respservico.data.data '+JSON.stringify(respservico.data.data, null, "   "));
       
                     const data_teste = response_data.servico.data_servico;            
                     //var teste_data_banco = moment(data_teste, "DD/MM/YYYY");
                    // var formatar_data_banco = teste_data_banco.format("YYYY-MM-DD");                       
                     var data_servico_banco = new Date(data_teste);
                     
                    debugger;
                  
                    var hora_banco = response_data.servico.hora_inicial.substring(0,5);                   

                      if (data_servico_banco.getTime() == data_servico_date.getTime() &&
                           hora_banco >= hora_menor_tres &&
                           hora_banco <= hora_maior_tres) {

                            debugger;
                            verifica_possui_servico = true;
                            motorista_incluido = motorista_incluido + 1;

                         //   this.finalizando_processo_busca();

                      } else {
                        debugger
                     //   motorista_incluido = motorista_incluido + 1;
                       this.verifica_motorista_selecionados(mot.id, tipoTransporte);

                      }                    
                  } else {
                     debugger
                  //  motorista_incluido = motorista_incluido + 1;
                    this.verifica_motorista_selecionados(mot.id, tipoTransporte);

                  }     


                }).catch(error=>{
                  alert("Error getMotoristaServico -"+error)
                });    

            })

           
  
          } else {
            alert("Não foi encontrado motorista disponível, para atender a esse serviço no momento ")
         /*   this.setState({                              
               mensagem_servico: "Não foi encontrado motorista disponível, para atender a esse serviço no momento"
            })*/
          }  

        }).catch(error=>{
           alert("Error getMotoristaServico -"+error)
        });   

     
  } 

 cancelar_servico(row) {
  var servico_id = row.servicoId;
  var motorista_cancelado = row.motorista_id;

  api.delete(`/motorista_servico/delete/${servico_id}`);

  api.get(`/servicos/get/${servico_id}`)
  .then(respservico=>{    

      if (respservico.data.success == true) { 
        this.carrega_servico(respservico.data.data[0]);
        
        this.procurar_motorista_servico();
        
      }
    });    
 }

 aceitou_servico(row) {
    //alert("aceitou o serviço "+row.servicoId);
   
    var servico_id = row.servicoId;
    var motorista_id = row.motorista_id;

    debugger;
    const motorista_alocado = {
      motorista_alocado: true,  
    } 
    api.put(`/servicos/update/${servico_id}`, motorista_alocado);

    //excluir os servicos enviados aos motoristas 
    api.delete(`/envioservicoMotorista/delete_servico/${servico_id}`);
    
        const datapost = {
          motoristaId: motorista_id,              
          servicoId: servico_id,
          statusId: 1,
          motoristumId: motorista_id,
        }    

        debugger;
      //  console.log(' motorista_servico - '+JSON.stringify(datapost, null, "    "))  
        api.post(`/motorista_servico/create`, datapost);
        debugger;

      
        this.refreshPage();
     // }   
    
    // incluir motorista na tabela motorista_servico
 }

 selecione_tipo_servico(index){
    
  this.setState({ 
      tabIndex: this.state.tabIndex
  });

  if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '' ) {
    Promise.all([
      this.calcular_trajeto()
    ])     
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

  handleTipoTranspChange = (event, newValue) => {
    this.setState({     
      camptipoId: event.target.value, 
      erro_tipo: false,  
      validacao_tipo: true,
    });  

    campseltipoveiculo = event.target.value;
  //  setAge(event.target.value);

    debugger;
    //console.log('tipoChange ');    
    
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
      //Promise.all([
      this.calcular_trajeto();
    //  ])    
    } 
    
  };
   
  opcao_tabChange = (event, newValue) => {   
    this.setState({        
        value: newValue 
    });    
  };

  teste_mensagem() {

    if (this.state.mensagem_servico !== "") {
      return (
        <Alert severity="error">{this.state.mensagem_servico}</Alert>
             
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
          validacao_nome: true,    
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
          <div className="titulo_lista">     
            <div className="unnamed-character-style-4 descricao_admministrador">      
            <div className="titulo_bemvindo"> Serviços </div>
              
            </div>      
           </div>
<br/>
       
     
      <div className="margem_left">   
      <div className="container-fluid">   
      <TabContext value={this.state.value} className="tabs_padrao">
        <AppBar position="static" color="transparent">
          <TabList onChange={this.opcao_tabChange} aria-label="simple tabs example">
            <Tab label="Novos" value="1" className="tabs_titulo_lista"/>          
            <Tab label="Ativos" value="2" className="tabs_titulo_lista_2"/>                 
          </TabList>
        </AppBar>
        
        <TabPanel value="1" className="tirar_espaco">
        <div>
          
                        <MaterialTable          
                            title=""
                          //  isLoading={this.state.loading}       
                            //style=""                     
                            columns={[
                              { title: '', field: '', width: '55px', minWidth: '55px', maxWidth: '55px'},
                              { title: 'Data Serviço', field: 'data_servico', width: '120px', minWidth: '120px', maxWidth: '120px', render: rowData => dateFormat(rowData.data_servico, "UTC:dd/mm/yyyy") },
                              { title: 'Hora Serviço', field: 'hora_inicial', width: '120px', minWidth: '120px', maxWidth: '120px', render: rowData => rowData.hora_inicial.substring(0,5) },  
                              { title: '', field: 'tipoEventoId', width: '50px', minWidth: '50px', maxWidth: '50px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.tipoEventoId == 1 ? 
                              <div style={{fontSize: 10, backgroundColor: '#FF964F', color: '#FDFDFE', borderRadius: '50px' }}>Diária</div> : <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '50px' }}>Translado</div> },                              
                       
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', align: 'center' },   
                              { title: 'Origem', field: 'local_embarque', width: '290px', minWidth: '290px', maxWidth: '290px' },
                              { title: '', field: '', width: '55px', minWidth: '55px', maxWidth: '55px' },                                                           
                              { title: '', field: 'motorista_bilingue', width: '45px', minWidth: '45px', maxWidth: '45px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_bilingue == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Bilingue</div> : "" },   
                              { title: '', field: 'motorista_receptivo', width: '45px', minWidth: '45px', maxWidth: '45px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_receptivo == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px'}}>Receptivo</div> : "" },  
                              { title: '', field: '', width: '100px', minWidth: '100px', maxWidth: '100px' }, 
                              { title: '', field: '', width: '280px', minWidth: '280px', maxWidth: '280px', lookup: { 1: 'sadas', 2: 'asdas' },                              
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
                                searchPlaceholder: 'Buscar Serviço',        
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
                            parentChildData={(row, rows) => rows.find(a => a.id === row.servico_pai_id) }
                     
                            options={{      
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_servicos_ativos',
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
                              actionsColumnIndex: 10,
                             // pageSize: 9,
                              pageSizeOptions: [0],                
                            }}
                            actions={[                             
                              {
                                icon: 'save',
                                tooltip: 'Aceitar Serviço',
                                onClick: (event, rowData) => this.aceitou_servico(rowData)
                              }
                            
                            ]}
                            components={{
                              Action: props => (
                                <Button
                                  onClick={(event) => props.action.onClick(event, props.data)}
                                  color="primary"
                                  variant="contained"
                                  style={{textTransform: 'none', width: 120, borderRadius: '10px', fontSize: 10, fontFamily: 'Effra'}}
                                  size="sm"
                                >
                                 Aceitar Serviço
                                </Button>
                              ),
                            }}
                            
                          />      
                </div>    
        </TabPanel>      
        <TabPanel value="2" className="tirar_espaco">
           <div>
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '', width: '55px', minWidth: '55px', maxWidth: '55px' }, 
                              { title: 'Dt Serviço', field: 'servico.data_servico', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => dateFormat(rowData.servico.data_servico, "UTC:dd/mm/yyyy") },
                              { title: 'Hr Serviço', field: 'servico.hora_inicial', width: '110px', minWidth: '110px', maxWidth: '110px',  render: rowData => rowData.servico.hora_inicial.substring(0,5) }, 
                                             
                              { title: '', field: 'tipoEventoId', width: '50px', minWidth: '50px', maxWidth: '50px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.servico.tipoEventoId == 1 ? 
                              <div style={{fontSize: 10, backgroundColor: '#FF964F', color: '#FDFDFE', borderRadius: '50px' }}>Diária</div> : <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '50px' }}>Translado</div> },                              
                              { title: '', field: '', width: '5px', minWidth: '5px', maxWidth: '5px', align: 'center' },   
                              { title: 'Nome Passageiro', field: 'servico.nome_passageiro', width: '180px', minWidth: '180px', maxWidth: '180px' },
                              { title: 'Qtd Passageiros', field: 'servico.quantidade_passageiro', width: '130px', minWidth: '130px', maxWidth: '130px', align: 'center' },     

                              { title: 'Origem', field: 'servico.local_embarque', width: '230px', minWidth: '230px', maxWidth: '230px', render: rowData => rowData.servico.local_embarque.substring(0,40)  },
                              { title: 'Destino', field: 'servico.local_desembarque', width: '190px', minWidth: '190px', maxWidth: '190px', render: rowData => rowData.servico.local_desembarque.substring(0,30) },
                                                                                  
                              { title: '', field: 'servico.motorista_bilingue', width: '45px', minWidth: '45px', maxWidth: '45px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.servico.motorista_bilingue == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Bilingue</div> : "" },                               
                           
                              { title: '', field: 'servico.motorista_receptivo', width: '45px', minWidth: '45px', maxWidth: '45px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.servico.motorista_receptivo == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px'}}>Receptivo</div> : "" },                                                             
                          
                              { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' },                                 
                             },                 
                            ]}
                            data={this.state.listaServicoAceito}   
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
                                searchPlaceholder: 'Buscar Serviço',        
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
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_servicos_ativos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,          
                              maxBodyHeight: '60vh',
                              minBodyHeight: '60vh',      
                              padding: 'dense',   
                              overflowY: 'scroll',     
                              //overflowY: 'scroll',
                              //overflowX: 'hidden',
                              //WebkitOverflowScrolling: 'hidden',
                             // tableLayout: 'fixed',
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 11,
                             // pageSize: 9,
                              pageSizeOptions: [0],                     
                            }}
                            actions={[
                              {
                                icon: 'save',
                                tooltip: 'Cancelar Serviço',
                                onClick: (event, rowData) => this.cancelar_servico(rowData)
                              }
                        
                            ]}
                            components={{
                              Action: props => (
                                <Button
                                  onClick={(event) => props.action.onClick(event, props.data)}
                                  color="primary"
                                  variant="contained"
                                  style={{textTransform: 'none', width: 120, borderRadius: '10px', fontSize: 10, fontFamily: 'Effra'}}
                                  size="sm"
                                >
                                 Cancelar Serviço
                                </Button>
                              ),
                            }}
                            
                          />                              
                           
                </div>    
        </TabPanel>               
      </TabContext>        
      
   </div> 
        </div>
             

       <ReactModal 
        isOpen={this.state.showModalAlteracaoEvento}
        style={customFixoStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Alterar Eventos
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalAlteracaoEvento()} className="botao_close_incluir_evento_modal">
              <CloseOutlinedIcon />
            </IconButton></div>             
            <div className="container_modal_alterado">
                <div className="d-flex flex-column espacamento_modal">
                  <div className="p-2">      
                              
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
                  <div className="p-2">      
                              
                              <FormControl variant="outlined" disabled={this.state.nome_evento_disabled}>
                                <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome do Evento</InputLabel>
                                <OutlinedInput
                                    autoComplete="off"  
                                    multiline="true"  
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
                        <div className="p-2">                                    
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
                          <div className="p-2">  
                             <div className="d-flex justify-content-start">
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
                                    Adicionar Operador  <i className="fas fa-users"></i>
                                 </Button>    
                                 </div>
                             </div>       
                        </div>     

                    {this.verifica_botao_evento(this.state.inicio)}       

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
               className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDelete(this.state.campDeletarId, this.state.eventoId)}>
              <div className="d-flex justify-content-center">
              <label> Excluir </label>
              </div>     
            </Box>      

            </div>
         </ReactModal>
         <ReactModal 
        isOpen={this.state.showmorotistadados}
        style={MotoristaStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div> 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseMotorista()} className="botao_close_modal_deletar">
              <CloseOutlinedIcon />
            </IconButton></div>       
          
            <div className="container_alterado">
              
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
         </ReactModal>   

         <ReactModal 
        isOpen={this.state.showMostraMotorista}
        style={ConfirmacaodelStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div> 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalMotorista()} className="botao_close_modal_deletar">
              <CloseOutlinedIcon />
            </IconButton></div>       
           
            <div className="container_alterado_4">
              
                         <div>
                            <Avatar alt={localStorage.getItem('lognome')} 
                          src={this.state.camp_foto_url} variant="circle" className="avatar_tamanho"/>            
                        </div>                  

            </div>
         </ReactModal>
       
                 
         <ReactModal 
        isOpen={this.state.showModalAlteracaoServico}
        style={customFixoStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
              <div className="container-fluid">
                  <div className="row">
                    <div className="col-9 altura_titulo">
                         Alterar Serviços          
                    </div>
                    <div className="col-3">
                      <IconButton aria-label="editar" onClick={()=>this.handleCloseModalAlteracaoServico()} >
                        <CloseOutlinedIcon />
                      </IconButton></div>        
                      {this.teste_mensagem()}  
                    </div>                               
                  </div>
                </div>            
          <div>
          <div className="row modal-body">    
          
              <div className="p-2">  
              <TabContext value={this.state.tabIndex} className="tabs_padrao">
              <div>                  
                <AppBar position="static" color="transparent" >
                  <TabList onChange={(e, index) => this.selecione_tipo_servico(index)}  
                           aria-label="simple tabs example">
                    <Tab label="Translado" disabled={this.state.translado} value="2" className="tabs_titulo_lista"/>          
                    <Tab label="Diária" disabled={this.state.diaria} value="1" className="tabs_titulo_lista_2"/>          
                  </TabList>
                </AppBar>
              </div>
          
                <TabPanel value="2" className="tirar_espaco_modal">
                <div className="p-2">  
                <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_modal_tipo"
                          error={this.state.erro_tipo}                           
                          helperText={this.state.mensagem_tipoId}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.camptipoId}
                           
                        //  onSelect={this.verificaTipo_veiculo}
                       //   onFocus={this.verificaTipo_veiculo}
                        //  onClick={this.verificaTipo_veiculo}
                          onChange={ this.handleTipoTranspChange }                             
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
               <div className="p-2">
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
               <div className="p-2">  
                   <div className="d-flex justify-content-start">
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
              <div className="p-2">    
                        <div className="d-flex justify-content-start">
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
                                     //   onfocus={this.verificafocushora_inicial}                                 
                                        onKeyPress={this.verificahora_inicial} 
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
                <div className="p-2">  
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
               <div className="p-2">
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
               <div className="p-2">  
                   <div className="d-flex justify-content-start">
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
              <div className="p-2">    
                        <div className="d-flex justify-content-start">
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
                                     //   onfocus={this.verificafocushora_inicial}                                 
                                        onKeyPress={this.verificahora_inicial} 
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
                    <div className="p-2">    
                        <div className="d-flex justify-content-start">
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
                                        onKeyPress={this.verificahora_final}         
                                        //onfocus={this.verificafocushora_final}    
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
                                        readOnly={this.state.quantidade_diarias}               
                                        error={this.state.erro_qtd_diarias}
                                        helperText={this.state.mensagem_qtd_diarias}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"                    
                                        onKeyUp={this.verificaqtddiaria}                        
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
                                            {this.state.validacao_qtd_diarias? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_qtd_diarias}>
                                        {this.state.mensagem_qtd_diarias}
                                  </FormHelperText>
                                </FormControl>  
                              </div>                
                      </div>    
                    </div>
                </TabPanel>

               </TabContext>
              </div>
              <div className="alinha_campos">              
                    <div className="p-2">           
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
                  
                    <div className="p-2">
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

                    <div className="p-2">
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

                    <div className="p-2">
                      {this.verificar_tipo_servico()}
                    </div>
                    <div className="p-2">
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

                    <div className="p-2">                      
                    <div class="d-flex justify-content-start">
                                 <div>                  
                                    <FormControl variant="outlined" className="select_evento_operador">
                                      <InputLabel id="demo-simple-select-outlined-label">Motoristas</InputLabel>
                                      <Select
                                        error={this.state.erro_tipo} 
                                        helperText={this.state.mensagem_tipoId}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.campMotoristaId}                                    
                                        onChange={ (e) => {
                                          this.motoristaChange(e)
                                        }}                  
                                        labelWidth={140}          
                                      >
                                        <MenuItem value={0}></MenuItem>      
                                        {this.loadMotoristaData()}                    
                                      </Select>
                                    </FormControl>                                                                
                                 </div>
                                 <div>
                                 <Button className="botao_evento_operador_compartilha" color="primary" variant="contained"                         
                                            onClick={()=>this.handleOpenMotorista()}>
                                    Adicionar Motorista  <i class="fas fa-users"></i>
                                 </Button>    
                                 </div>
                             </div>      
                    </div>
                    <div className="p-2">
                    <div className="d-flex justify-content-start">
                        <div className="checkbox_modal_dados_voo">Motorista Preferido</div>
                    </div>
        </div>
        <div className="p-2">
                    
            <div className="d-flex justify-content-start">
                  <div>
                  <FormControl className="input_modal_direita" variant="outlined">
                  <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Nome Motorista</InputLabel>
                  <OutlinedInput    
                      type="text"       
                      autoComplete="off"    
                      disabled={this.state.nome_motorista_visualizacao}                   
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
                        maxLength: 40,
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
                  </div>
                  <div>
                  <FormControl className="input_modal_esquerda" variant="outlined">
                  <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Telefone</InputLabel>
                  <OutlinedInput         
                      type="text"  
                      autoComplete="off"   
                      disabled={this.state.telefone_motorista_visualizacao}                             
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
                  </div>
             </div> 

        </div>
                    <div className="p-2">
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
                     <div className="mensagem_aguarde">
                      <FormHelperText>
                          {this.state.mensagem_aguarde}
                      </FormHelperText>       
                    </div>   
                    <div className="botao_servico_fixo">
                          <table className="margin_total_servicos">
                              <tr className="titulo_total_servicos"><td className="tamanho_coluna">Distância Total</td>
                                <td className="tamanho_coluna_tempo">Tempo Total</td>
                                <td className="tamanho_coluna">Valor Total</td></tr>                
                              <tr className="resultado_total_servicos">
                                                  <td>{this.state.campdistancia} km</td>
                               <td>{ this.state.camptempo}</td>
                                <td>R$ { valorMask(this.state.campvalor)}</td>
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
        style={customFixoStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
             <div className="container-fluid">
                  <div className="row">
                    <div className="col-9 altura_titulo">
                       Incluir Serviços                       
                    </div>
                    <div className="col-3">
                      <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()} >
                        <CloseOutlinedIcon />
                      </IconButton></div>        
                         {this.teste_mensagem()}  
                    </div>                               
                  </div>
                </div> 
          <div>
          <div className="row modal-body">                      
              <div className="p-2">             
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
                <div className="p-2">  
                <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_modal_tipo"
                          error={this.state.erro_tipo} 
                          helperText={this.state.mensagem_tipoId}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.camptipoId}                        
                         // onSelect={this.verificaTipo_veiculo}
                         // onFocus={this.verificaTipo_veiculo}
                         // onMouseUp={this.verificaTipo_veiculo}
                         // onClick={this.verificaTipo_veiculo}
                          onChange={ this.handleTipoTranspChange }                            
                          
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
               <div className="p-2">
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
               <div className="p-2">  
                   <div className="d-flex justify-content-start">
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
              <div className="p-2">    
                        <div className="d-flex justify-content-start">
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
                                        onKeyPress={this.verificahora_inicial} 
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
                <div className="p-2">  
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
               <div className="p-2">
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
               <div className="p-2">  
                   <div className="d-flex justify-content-start">
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
              <div className="p-2">    
                        <div className="d-flex justify-content-start">
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
                    <div className="p-2">    
                        <div className="d-flex justify-content-start">
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
                                        onKeyUp={this.verificahora_final}                 
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
                                        error={this.state.erro_qtd_diarias}
                                        helperText={this.state.mensagem_qtd_diarias}
                                        className="input_modal_esquerda"
                                        id="outlined-basic"                   
                                        variant="outlined"
                                        onKeyUp={this.verificaqtddiaria}     
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
                                            {this.state.validacao_qtd_diarias? <CheckIcon />: ''}
                                        </InputAdornment>
                                      }
                                      labelWidth={180}                      
                                    />
                                  <FormHelperText error={this.state.erro_qtd_diarias}>
                                        {this.state.mensagem_qtd_diarias}
                                  </FormHelperText>
                                </FormControl>  
                              </div>                
                      </div>    
                    </div>
                </TabPanel>

               </TabContext>
              </div>
              <div className="alinha_campos">              
                    <div className="p-2">           
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
                           <div>
                               { this.mostrar_endereco_selecionado_embarque() } 
                               
                              </div>
                           </td>
                         </tr>   
                    </table>
                  </div>
                  
                    <div className="p-2">
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

                    <div className="p-2">
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

                    <div className="p-2">
                      {this.verificar_tipo_servico()}
                    </div>
                    <div className="p-2">
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

                    <div className="p-2">    
                         <div class="d-flex justify-content-start">
                                 <div>  
                                 <FormControl variant="outlined" className="select_evento_operador">
                                      <InputLabel id="demo-simple-select-outlined-label">Motoristas</InputLabel>
                                      <Select
                                        error={this.state.erro_tipo} 
                                        helperText={this.state.mensagem_tipoId}
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.campMotoristaId}                                    
                                        onChange={ (e) => {
                                          this.motoristaChange(e)
                                        }}                  
                                        labelWidth={140}          
                                      >
                                        <MenuItem value={0}></MenuItem>      
                                        {this.loadMotoristaData()}                    
                                      </Select>
                                    </FormControl>   
                                                                                                
                                 </div>
                                 <div>
                                 <Button className="botao_evento_operador_compartilha" color="primary" variant="contained"                         
                                            onClick={()=>this.handleOpenMotorista()}>
                                    Adicionar Motorista  <i class="fas fa-users"></i>
                                 </Button>    
                                 </div>
                             </div>                      
                     
                    </div>
                    <div className="p-2">
                    
                    <div className="d-flex justify-content-start">
                          <div>
                          <FormControl className="input_modal_direita" variant="outlined">
                          <InputLabel className="label_modal_direita" htmlFor="filled-adornment-password">Nome Motorista</InputLabel>
                          <OutlinedInput    
                              type="text"       
                              disabled={this.state.nome_motorista_visualizacao}
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
                                maxLength: 40,
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
                          </div>
                          <div>
                          <FormControl className="input_modal_esquerda" variant="outlined">
                          <InputLabel className="label_modal_esquerda" htmlFor="filled-adornment-password">Telefone</InputLabel>
                          <OutlinedInput         
                              type="text"  
                              disabled={this.state.telefone_motorista_visualizacao}
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
                          </div>
                     </div> 
        
                </div>
                    <div className="p-2">
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
                              <tr className="titulo_total_camptemposervicos"><td className="tamanho_coluna">Distância Total</td>
                                <td className="tamanho_coluna_tempo">Tempo Total</td>
                                <td className="tamanho_coluna">Valor Total</td></tr>                
                              <tr className="resultado_total_servicos">
                                                  <td>{this.state.campdistancia} km</td>
                                <td>{ this.state.camptempo}</td>
                                <td>R$ { valorMask(this.state.campvalor)}</td>
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
                 <div className="d-flex flex-column espacamento_caixa_modal_cartao">              
                      <div className="p-2">                        
                        <Cards
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}                            
                          />
                      </div>   
                      
                      <div className="p-2">                     
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
                      <div className="p-2">          
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
                      <div className="p-2">          
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
        <div >
             <div className="row">
               <div className="col-10 altura_titulo">
               Local Embarque
               </div>
               <div className="col-2">
               <IconButton aria-label="editar" onClick={()=>this.handleCloseModalEmbarque()}>
              <CloseOutlinedIcon />
            </IconButton></div>                    
               </div>                    
             </div>
           </div> 
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div className="d-flex flex-column espacamento_modal_motorista">                                   
                      <div className="p-2">         
                                     
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
                                  value: this.state.camplocalembarque,
                                  onKeyDown: this.handleEmbarqueFocusChange,
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
                    {this.verifica_rota_embarque(this.state.inicio)}     
                 </div>
               </div>    
            </div>
     </ReactModal>    
     <ReactModal 
        isOpen={this.state.showModalDesembarque}
        style={customrotaStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> 
        <div className="container">
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
                 <div className="d-flex flex-column espacamento_modal_motorista">                                   
                      <div className="p-2">   
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
                                  onKeyDown: this.handleDesembarqueFocusChange,
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
                {this.verifica_rota_desembarque(this.state.inicio)}     
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
          <Grid item xs className="descricao_modal_servico">
        
          {this.state.camplocalembarque}                            
     
          <Typography variant="body2" color="textSecondary">                                   
          </Typography>
          </Grid>
        </Grid>        
               
    
      );
    }

  }

  mostrar_endereco_selecionado_desembarque() {
 
    if (this.state.camplocaldesembarque !== "") { 
      return (     
       
        <Grid container alignItems="center">
        <Grid item>
          <LocationOnIcon styles={useStyles.icon} />
          </Grid>        
          <Grid item xs className="descricao_modal_servico">
         
              {this.state.camplocaldesembarque}    
                              
          <Typography variant="body2" color="textSecondary">                                   
          </Typography>
          </Grid>
        </Grid>              
      );
    }

  }

 /*
  calculando_distancia_api() {
   
    if (this.state.camplocalembarque !== "" && this.state.camplocaldesembarque !== "") {

      if (this.state.embarque_latitude !== "" && this.state.embarque_longitude !== "" &&
          this.state.desembarque_latitude !== "" && this.state.desembarque_longitude !== "") {      
         
        
         var embarque_latitude = this.state.embarque_latitude;
         var embarque_longitude = this.state.embarque_longitude;  
         var desembarque_latitude = this.state.desembarque_latitude;
         var desembarque_longitude = this.state.desembarque_longitude;  

         var link_api = `http://rotasbrasil.com.br/apiRotas/coordenadas/?pontos=${embarque_longitude},${embarque_latitude};${desembarque_longitude},${desembarque_latitude}&veiculo=auto&eixo=2&paradas=true&token=50a2b61bdd69bba0adba3e5f8160dcd7`
  
         debugger;
          api.get(link_api)
          .then((val)=>{

            console.log('guia rotas  - '+JSON.stringify(val.rotas, null, "    "));            

          }).catch(error=>{           
            console.log('error '+error)
        })
   
    } 
  }
}
*/
  displayMarkers = () => {
    //return this.state.embarque_latitude.map((store, index) => {
      return <Marker key={0} id={0} position={{
      lat: this.state.embarque_latitude,
      lng: this.state.embarque_longitude
    }
  }

    icon={{
      url: `/location-thumbnail.png`,
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(15, 15),
      scaledSize: new window.google.maps.Size(30, 30),
    }}
   />
   // })
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  mostrar_mapa_embarque() {
    //if (this.state.controle == 0) {  

    if (this.state.camplocalembarque !== "") {     
        if (this.state.embarque_latitude !== '' && this.state.embarque_longitude !== '') {
  
          return (
     

          <Map 
               google={this.props.google}
               zoom={18}  
               style={containerStyle}  
               initialCenter={{
                 lat: this.state.embarque_latitude,
                 lng: this.state.embarque_longitude
               }}
               center={{
                 lat: this.state.embarque_latitude,
                 lng: this.state.embarque_longitude
               }}
             >
               <Marker 
                  title={this.state.camplocalembarque}
                  name={this.state.camplocalembarque}
                 position={{
                   lat: this.state.embarque_latitude,
                   lng: this.state.embarque_longitude
                 }} />

           { this.obtendo_distancia_rota_nova() }

          </Map>      
   
   
         
      
         
          );
          }
      }
   // }
  }


  sendSaveCartao(){          
    
        let cartao = creditCardType(this.state.number).filter((card) => {        
          return card.type
       });
    
    //   debugger;
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
        
        //  console.log('datapost1 - '+JSON.stringify(datapost, null, "    "));  
    
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
      campdata_servico: data.data_servico,
      nome_passageiro: data.nome_passageiro,
      camptipoevento: data.tipoEventoId, 
      verificaPai: data.servico_pai_id,
      eventoid: data.eventoId,
      camptipoevento: data.tipoEventoId,
      valor_estimado_filho: data.valor_estimado,
      distancia_filho: data.km_translado,
      quantidade_diarias: data.quantidade_diarias,
      tempo_filho: this.formatar_total_segundos(parseInt(data.tempo_translado.substring(0,2)),data.tempo_translado.substring(3,5)),
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

  handleOpenMotorista() { 

    //if (this.state.novo_motorista_incluir == false) {
    this.setState({ 
      //showmorotistadados: true,
      campnomemotorista: '',
      camptelefonemotorista: '',
      campMotoristaId: '',
      nome_motorista_visualizacao: false,
      telefone_motorista_visualizacao: false,
      validacao_nome_motorista: false,
      validacao_telefone_motorista: false,
      novo_motorista_incluir: true
     
    })
 /* } else {
    this.setState({ 
      //showmorotistadados: true,
      novo_motorista_incluir: false,
      nome_motorista_visualizacao: true,
      telefone_motorista_visualizacao: true,
     
    })
     }
*/
 
     
    
  }
  
  handleCloseMotorista() {
    this.setState({ 
      showmorotistadados: false
    });    

 
     
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


  loadDiarias() {
    api.get(`/diaria/list`)
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listDiarias:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }   

  loadDiariaespecial() {
    api.get(`/diariaEspecial/list`)
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listDiariaEspeciais:data})
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
   let valor_total = valorDoublemask(this.state.campvalor);

   /*
   if (this.state.valor_bilingue == "") {  
       this.buscar_informacao();
   } 
*/
debugger;
   if (valor_total !== "" && this.state.valor_bilingue !== "") {  
      if (e.target.checked == true) {
       
        debugger;
        valor_total_calculado = parseFloat(valor_total).toFixed(2);
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

        valor_total_calculado = parseFloat(valor_total);

        const resultado_d = (valor_total_calculado - parseFloat(this.state.resultado_bilingue));

        this.setState({          
          campvalor: resultado_d.toFixed(2),
          resultado_bilingue: '',  
        }) 

      }        
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

          valor_total_calculado = parseFloat(this.state.campvalor).toFixed(2);
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

  formatar_total_segundos(h,min) {
    return parseInt(h*60) + parseInt(min);
   }
   
  
  separa_hora_minuto(separar) {

    



  }

  

  calcula_hora() {
  
    function formatar_segundos(h,min) {
      return parseInt(h*60) + parseInt(min);
     }
     
     //debugger;
     const pos_hora_inicial = hora_inicial.indexOf(":", 0);
     const pos_hora_final = hora_final.indexOf(":", 0);

     //console.log('pos_hora_inicial '+ hora_inicial);
  //   console.log('pos_hora_final '+ hora_final);

     const hora_inicial_1 = formatar_segundos(parseInt(hora_inicial.substring(0,pos_hora_inicial)),hora_inicial.substring(pos_hora_inicial + 1,5));
     const hora_final_1 = formatar_segundos(parseInt(hora_final.substring(0,pos_hora_final)),hora_final.substring(pos_hora_final + 1,5));
    
     //console.log('hora_inicial_1 '+ hora_inicial_1);
    //console.log('hora_final_1 '+ hora_final_1);

     let diferenca = (hora_final_1-hora_inicial_1);

    // console.log('diferenca '+ diferenca);

     let camp_tempo_calculado = this.formatar_minuto(parseInt(this.state.campqtddiarias) * parseInt(diferenca));
     let camp_tempo_nao_formatado = parseInt(diferenca);
     let camp_filho_tempo = this.formatar_minuto(diferenca);

    // console.log('camp_tempo_calculado - '+camp_tempo_calculado)
     console.log('camp_tempo_nao_formatado - '+camp_tempo_nao_formatado)

     this.setState({
      camptempo: camp_tempo_calculado,     
      tempo_total_filho: camp_filho_tempo,     
      km_total_filho: 50,
      camptempovalue: diferenca,
      camptempopaivalue: diferenca,
     // campdistancia: 50,
      })    
      
      if (this.state.tabIndex == 1) {
        camptempovalue_global = camp_tempo_nao_formatado
      }

  }

  formatar_minuto(m) {
    const h = Math.floor(m/60);
    const min = Math.floor((m - (h*60)));   

    return h + "h "+ min + "min " ; 
  }   

  verifica_tarifa(contagem_tarifa, campdistancia_inicio){
    let entrou = false;
    debugger;
 /* senao encontrar o registro na tarifa especial ele procura na tarifa  */
 if (possui_tarifa_especial_nova == false) { 
    let contagem = 0
  

    this.state.listTarifas.map((data)=>{
  // console.log(JSON.stringify(data, null, "    "));         
    let valor_total_alterado = 0;
    let valor_total = 0; 
    let valor_distancia_1 = 0; 
    let valor_tempo_1 = 0;
    let valor_bandeirada = 0;
    let distanciapai = 0;        
    contagem = contagem + 1;
    debugger;
    let camptempovalue = camptempovalue_global;
    if (camptempovalue === 0) {
      camptempovalue = this.state.camptempovalue         
    }

    // if (this.state.possui_tarifa == false) {
    //  debugger;
          if (campseltipoveiculo == data.tipoTransporte &&                
            campdistancia_inicio >= Number(data.faixa_inicial) &&  
            campdistancia_inicio <= Number(data.faixa_final)) {

       //       debugger; 
              /*  X = (QTD Km * valor Km) + (tempo do Serviço * valor tempo) + valor Bandeirada  */      
       
              if (this.state.tabIndex == 1) {
                this.incrementState();

                this.calcula_hora();

                debugger;
                camptempovalue = camptempovalue_global;                 

                distanciapai = parseInt(this.state.campqtddiarias) * parseInt(campdistancia_inicio);
                console.log(' distanciapai - '+distanciapai);

                valor_distancia_1 = parseInt(this.state.campqtddiarias) * (campdistancia_inicio * data.valor_km).toFixed(1)
                console.log(' valor_distancia_1 - '+valor_distancia_1);

                valor_tempo_1 = parseInt(this.state.campqtddiarias) * (camptempovalue * data.valor_tempo).toFixed(1); 
                console.log(' valor_tempo_1 - '+valor_tempo_1);

                valor_bandeirada = parseInt(this.state.campqtddiarias) * parseFloat(data.bandeira);
                console.log(' valor_bandeirada - '+valor_bandeirada);


              } else {
              
                distanciapai = parseInt(campdistancia_inicio);

                valor_distancia_1 = (campdistancia_inicio * data.valor_km).toFixed(1);
              
                valor_tempo_1 = (camptempovalue * data.valor_tempo).toFixed(1); 

                valor_bandeirada = parseFloat(data.bandeira);
              }    

              valor_total = (parseFloat(valor_distancia_1) + parseFloat(valor_tempo_1) + parseFloat(valor_bandeirada)); 
              entrou = true;   

              possui_tarifa_nova = true;
            
              this.setState((state) => {
                state.possui_tarifa = true
                state.campvalor = valorMask(valor_total.toFixed(2))
                state.campvalor_estimado = valorMask(valor_total.toFixed(2))
                state.valor_bilingue = data.bilingue
                state.valor_receptivo = data.receptivo
                state.campdistancia = distanciapai                     
                state.camptempovalue = camptempovalue // this.state.camptempopaivalue
                state.processo = 1
                state.mensagem_error = false
                state.mensagem_servico = ''
              //  state.camptempo= this.formatar_valor(valor_tempo_1)
              })  
              //console.log(' formula - '+JSON.stringify((this.state.campdistancia * data.valor_km) + (this.state.camptempovalue * data.valor_tempo) + data.bandeira, null, "    ")); 
          } else if (contagem == contagem_tarifa && possui_tarifa_nova == false && entrou == false)  {
            this.setState((state) => {                       
              state.campvalor = '0,00';      
              state.mensagem_error = true
              state.mensagem_servico = 'Tarifas para esse percurso não definida. Contatar Administrador !'   
              state.validacao_cartao = false
              state.inicio = 1
              state.processo = 2
            // campcartaoid: '',            
            // valor_bilingue: 0,
            // valor_receptivo: 0,                                                                      
            });     
            this.teste_mensagem();                            
      }
  //    }    


    })   

}
  }


  incrementState() {
    this.setState((state) => {             
      return {campqtddiarias: state.campqtddiarias}
    });
  }

  verifica_diaria(contagem_tarifa, campdistancia_inicio){
    let entrou = false;
    debugger;
 /* senao encontrar o registro na tarifa especial ele procura na tarifa  */
 if (possui_tarifa_especial_nova == false) { 
    let contagem = 0
   
    this.state.listDiarias.map((data)=>{
  // console.log(JSON.stringify(data, null, "    "));         
    let valor_total_alterado = 0;
    let valor_total = 0; 
    let valor_distancia_1 = 0; 
    let valor_tempo_1 = 0;
    let valor_bandeirada = 0;
    let distanciapai = 0;        
    contagem = contagem + 1;
    let camptempovalue = camptempovalue_global;
    if (camptempovalue === 0) {
      camptempovalue = this.state.camptempovalue         
    }

    // if (this.state.possui_tarifa == false) {
    //  debugger;
          if (this.state.camptipoId == data.tipoTransporte &&                
            campdistancia_inicio >= Number(data.faixa_inicial) &&  
            campdistancia_inicio <= Number(data.faixa_final)) {

       //       debugger; 
              /*  X = (QTD Km * valor Km) + (tempo do Serviço * valor tempo) + valor Bandeirada  */      
       
              if (this.state.tabIndex == 1) {
                this.incrementState();

                this.calcula_hora();

                debugger;
                camptempovalue = camptempovalue_global;                 

                distanciapai = parseInt(this.state.campqtddiarias) * parseInt(campdistancia_inicio);
                console.log(' distanciapai - '+distanciapai);

                valor_distancia_1 = parseInt(this.state.campqtddiarias) * (campdistancia_inicio * data.valor_km).toFixed(1)
                console.log(' valor_distancia_1 - '+valor_distancia_1);

                valor_tempo_1 = parseInt(this.state.campqtddiarias) * (camptempovalue * data.valor_tempo).toFixed(1); 
                console.log(' valor_tempo_1 - '+valor_tempo_1);

                valor_bandeirada = parseInt(this.state.campqtddiarias) * parseFloat(data.bandeira);
                console.log(' valor_bandeirada - '+valor_bandeirada);


              } else {
              
                distanciapai = parseInt(campdistancia_inicio);

                valor_distancia_1 = (campdistancia_inicio * data.valor_km).toFixed(1);
              
                valor_tempo_1 = (camptempovalue * data.valor_tempo).toFixed(1); 

                valor_bandeirada = parseFloat(data.bandeira);
              }    

              valor_total = (parseFloat(valor_distancia_1) + parseFloat(valor_tempo_1) + parseFloat(valor_bandeirada)); 
              entrou = true;   
            
              possui_tarifa_nova = true;
              this.setState((state) => {
                state.possui_tarifa = true
                state.campvalor = valorMask(valor_total.toFixed(2))
                state.campvalor_estimado = valorMask(valor_total.toFixed(2))
                state.valor_bilingue = data.bilingue
                state.valor_receptivo = data.receptivo
                state.campdistancia = distanciapai                     
                state.camptempovalue = camptempovalue // this.state.camptempopaivalue
                state.processo = 1
                state.mensagem_error = false
                state.mensagem_servico = ''
              //  state.camptempo= this.formatar_valor(valor_tempo_1)
              })  
              //console.log(' formula - '+JSON.stringify((this.state.campdistancia * data.valor_km) + (this.state.camptempovalue * data.valor_tempo) + data.bandeira, null, "    ")); 
          } else if (contagem == contagem_tarifa && possui_tarifa_nova == false && entrou == false)  {
            this.setState((state) => {                       
              state.campvalor = '0,00';      
              state.mensagem_error = true
              state.mensagem_servico = 'Tarifas para esse percurso não definida. Contatar Administrador !'   
              state.validacao_cartao = false
              state.inicio = 1
              state.processo = 2
            // campcartaoid: '',            
            // valor_bilingue: 0,
            // valor_receptivo: 0,                                                                      
            });     
            this.teste_mensagem();                            
      }
  //    }    


    })   

}
  }
  
  verifica_tarifa_especial(contagem_tarifaEspecial, campdistancia_inicio) {
    let contagemespecial = 0;

    this.state.listTarifasEspeciais.map((data)=>{   
      
      const teste_data = moment(this.state.campdata_servico, "DD/MM/YYYY");
      const formatar_data = teste_data.format("YYYY-MM-DD");    
      const data_servico_date = new Date(formatar_data);
      const data_inicial_date = new Date(data.data_inicial);
      const data_final_date = new Date(data.data_final);       
     
      let valor_total = 0; 
      let valor_distancia_1 = 0; 
      let valor_tempo_1 = 0;
      let valor_bandeirada = 0;       
      let distanciapai = 0;    
      let camptempovalue = camptempovalue_global;

      contagemespecial = contagemespecial + 1;     
      if (camptempovalue === 0) {
        camptempovalue = camptempo_global         
      }

           if (this.state.camptipoId == data.tipoTransporte &&  
                data_servico_date.getTime() >= data_inicial_date.getTime() && 
                data_servico_date.getTime() <= data_final_date.getTime() && 
                this.state.camphora_inicial >= data.hora_inicial.substring(0,5) && 
                this.state.camphora_inicial <= data.hora_final.substring(0,5)) {  
              
                 if (campdistancia_inicio >= Number(data.faixa_inicial)   
                  && campdistancia_inicio <= Number(data.faixa_final)) {    
   
                     /*  X = (QTD Km * valor Km) + (tempo do Serviço * valor tempo) + valor Bandeirada  */
                     /* se ele achar o registro ele procura a distancia pelo km inicial e final */
                     /* se ele nao encontrar avisar ao usuario que  */        
                  
                  /*   this.setState((state) => {         
                          campqtddiarias = state.campqtddiarias,
                          campdistancia_inicio = state.campdistancia_inicio,
                          camptempovalue = state.camptempovalue                         
                       });
                   */
                       this.incrementState();

                     if (this.state.tabIndex == 1) {

                        this.calcula_hora();                        

                        distanciapai = parseInt(this.state.campqtddiarias) * parseInt(campdistancia_inicio);
                          
                        valor_distancia_1 = parseInt(this.state.campqtddiarias) * (campdistancia_inicio * data.valor_km).toFixed(1)

                        valor_tempo_1 = parseInt(this.state.campqtddiarias) * (camptempovalue * data.valor_tempo).toFixed(1); 

                        valor_bandeirada = parseInt(this.state.campqtddiarias) * parseFloat(data.bandeira);


                        //valor_total_filhos = parseInt(campdistancia_inicio) + (campdistancia_inicio * data.valor_km) + parseFloat(data.bandeira);

                     } else {
                       
                       distanciapai = parseInt(campdistancia_inicio);

                       valor_distancia_1 = (campdistancia_inicio * data.valor_km).toFixed(1);
                     
                       valor_tempo_1 = (camptempovalue * data.valor_tempo).toFixed(1); 

                       valor_bandeirada = parseFloat(data.bandeira);
                     }    

                     valor_total = (parseFloat(valor_distancia_1) + parseFloat(valor_tempo_1) + parseFloat(valor_bandeirada)); 
          
                     
                      possui_tarifa_especial_nova = true;

                     this.setState((state) => {        
                      state.possui_tarifa_especial = true
                      state.processo = 1
                      state.campvalor = valorMask(valor_total.toFixed(2))
                      state.campvalor_estimado = valorMask(valor_total.toFixed(2))                          
                      state.valor_bilingue = data.bilingue
                      state.valor_receptivo = data.receptivo
                      state.campdistancia = distanciapai 
                      state.camptempovalue = this.formatar_valor(camptempovalue) //this.state.camptempopaivalue
                   //   state.camptempo= this.formatar_valor(valor_tempo_1)
                      state.mensagem_error = false
                      state.mensagem_servico = ''
                     })  
                   } else if (possui_tarifa_especial_nova == false)  {
                        this.setState((state) => {                              
                           //campvalor: '0,00',    
                           state.campvalor = '0,00';      
                           state.mensagem_error = true
                           state.mensagem_servico = 'Tarifas Especial para esse percurso não definida. Contatar Administrador !'   
                           state.validacao_cartao = false
                           state.inicio = 1
                           state.processo = 1
                          // campcartaoid: '',            
                          // valor_bilingue: 0,
                          // valor_receptivo: 0,                                                                      
                         });     
                         this.teste_mensagem();                            
                   }
             
           //console.log(' formula - '+JSON.stringify((this.state.campdistancia * data.valor_km) + (this.state.camptempovalue * data.valor_tempo) + data.bandeira, null, "    ")); 
            } else {
              this.setState((state) => {    
                state.processo = 1
                state.possui_tarifa_especial = false                                                                         
              });  
            }            
     })   
  }

  verifica_diaria_especial(contagem_tarifaEspecial, campdistancia_inicio) {
    let contagemespecial = 0;

    this.state.listDiariaEspeciais.map((data)=>{   
      
      const teste_data = moment(this.state.campdata_servico, "DD/MM/YYYY");
      const formatar_data = teste_data.format("YYYY-MM-DD");    
      const data_servico_date = new Date(formatar_data);
      const data_inicial_date = new Date(data.data_inicial);
      const data_final_date = new Date(data.data_final);       
     
      let valor_total = 0; 
      let valor_distancia_1 = 0; 
      let valor_tempo_1 = 0;
      let valor_bandeirada = 0;       
      let distanciapai = 0;    
      let camptempovalue = camptempovalue_global;

      contagemespecial = contagemespecial + 1;     
      if (camptempovalue === 0) {
        camptempovalue = camptempo_global         
      }

           if (campseltipoveiculo == data.tipoTransporte &&  
                data_servico_date.getTime() >= data_inicial_date.getTime() && 
                data_servico_date.getTime() <= data_final_date.getTime() && 
                this.state.camphora_inicial >= data.hora_inicial.substring(0,5) && 
                this.state.camphora_inicial <= data.hora_final.substring(0,5)) {  
              
                 if (campdistancia_inicio >= Number(data.faixa_inicial)   
                  && campdistancia_inicio <= Number(data.faixa_final)) {    
   
                     /*  X = (QTD Km * valor Km) + (tempo do Serviço * valor tempo) + valor Bandeirada  */
                     /* se ele achar o registro ele procura a distancia pelo km inicial e final */
                     /* se ele nao encontrar avisar ao usuario que  */        
                  
                  /*   this.setState((state) => {         
                          campqtddiarias = state.campqtddiarias,
                          campdistancia_inicio = state.campdistancia_inicio,
                          camptempovalue = state.camptempovalue                         
                       });
                   */
                       this.incrementState();

                     if (this.state.tabIndex == 1) {

                        this.calcula_hora();                        

                        distanciapai = parseInt(this.state.campqtddiarias) * parseInt(campdistancia_inicio);
                          
                        valor_distancia_1 = parseInt(this.state.campqtddiarias) * (campdistancia_inicio * data.valor_km).toFixed(1)

                        valor_tempo_1 = parseInt(this.state.campqtddiarias) * (camptempovalue * data.valor_tempo).toFixed(1); 

                        valor_bandeirada = parseInt(this.state.campqtddiarias) * parseFloat(data.bandeira);


                        //valor_total_filhos = parseInt(campdistancia_inicio) + (campdistancia_inicio * data.valor_km) + parseFloat(data.bandeira);

                     } else {
                       
                       distanciapai = parseInt(campdistancia_inicio);

                       valor_distancia_1 = (campdistancia_inicio * data.valor_km).toFixed(1);
                     
                       valor_tempo_1 = (camptempovalue * data.valor_tempo).toFixed(1); 

                       valor_bandeirada = parseFloat(data.bandeira);
                     }    

                     valor_total = (parseFloat(valor_distancia_1) + parseFloat(valor_tempo_1) + parseFloat(valor_bandeirada)); 
          
                     possui_tarifa_especial_nova = true;
                     this.setState((state) => {        
                      state.possui_tarifa_especial = true
                      state.processo = 1
                      state.campvalor = valorMask(valor_total.toFixed(2))
                      state.campvalor_estimado = valorMask(valor_total.toFixed(2))                          
                      state.valor_bilingue = data.bilingue
                      state.valor_receptivo = data.receptivo
                      state.campdistancia = distanciapai 
                      state.camptempovalue = this.formatar_valor(camptempovalue) //this.state.camptempopaivalue
                   //   state.camptempo= this.formatar_valor(valor_tempo_1)
                      state.mensagem_error = false
                      state.mensagem_servico = ''
                     })  
                   } else if (possui_tarifa_especial_nova == false)  {
                        this.setState((state) => {                              
                           //campvalor: '0,00',    
                           state.campvalor = '0,00';      
                           state.mensagem_error = true
                           state.mensagem_servico = 'Tarifas Especial para esse percurso não definida. Contatar Administrador !'   
                           state.validacao_cartao = false
                           state.inicio = 1
                           state.processo = 1
                          // campcartaoid: '',            
                          // valor_bilingue: 0,
                          // valor_receptivo: 0,                                                                      
                         });     
                         this.teste_mensagem();                            
                   }
             
           //console.log(' formula - '+JSON.stringify((this.state.campdistancia * data.valor_km) + (this.state.camptempovalue * data.valor_tempo) + data.bandeira, null, "    ")); 
            } else {
              this.setState((state) => {    
                state.processo = 1
                state.possui_tarifa_especial = false                                                                         
              });  
            }            
     })   
  }

  calcular_trajeto_diaria = () => {  
    let contagem_diaria=0;
    let contagem_diariaEspecial=0;
    let campdistancia_inicio = 0;   
    campseltipoveiculo = this.state.camptipoId;

    possui_tarifa_especial_nova = false;
    possui_tarifa_nova = false;

    campdistancia_inicio = 50;     
    this.setState({      
      campdistancia: parseInt(this.state.campqtddiarias) * parseInt(campdistancia_inicio),
    })

    this.setState({                           
      possui_tarifa:false,
      possui_tarifa_especial: false,    
      mensagem_error: false,      
      hora_formatada: '',
      camptempovalue: camptempovalue_global,
      camptempo: this.formatar_valor(camptempo_global),          
    });

    contagem_diaria = this.state.listDiarias.length;
    contagem_diariaEspecial = this.state.listDiariaEspeciais.length; 

    this.verifica_diaria_especial(contagem_diariaEspecial, campdistancia_inicio)

    this.verifica_diaria(contagem_diaria, campdistancia_inicio)

  }

  calcular_trajeto_translado = () => {  

    let contagem_tarifa=0;
    let contagem_tarifaEspecial=0;
    let campdistancia_inicio = 0;   

    campdistancia_inicio = campdistancia_global;
    possui_tarifa_nova = false;
    possui_tarifa_especial_nova = false;
   
    this.setState({       
      campdistancia: parseInt(campdistancia_inicio),                    
      possui_tarifa:false,
      possui_tarifa_especial: false,    
      mensagem_error: false, 
      hora_formatada: '',
      camptempovalue: camptempovalue_global,
      camptempo: this.formatar_valor(camptempo_global),          
    });

    contagem_tarifa = this.state.listTarifas.length;
    contagem_tarifaEspecial = this.state.listTarifasEspeciais.length;

    this.verifica_tarifa_especial(contagem_tarifaEspecial, campdistancia_inicio)

    this.verifica_tarifa(contagem_tarifa, campdistancia_inicio)

  }

  calcular_trajeto = () => {   

  console.log('entrou no calcular_trajeto')

  this.setState({
    mensagem_servico: '',
    mensagem_error: false,    
  });  
  

    if (this.state.tabIndex == 1) {

      this.calcular_trajeto_diaria()      
     
    } else {          
     
      this.calcular_trajeto_translado()
    }        
   
  }
  
  /*
  distanceCallback = (response) => {
  console.log("Hello");
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
            
        //  console.log('this.state.tabIndex '+this.state.tabIndex);
     //   debugger;
           if (this.state.tabIndex == 2) {
            this.setState({     
               controle: 1,
               campdistancia: (response.rows[0].elements[0].distance.value / 1000).toFixed(0), 
               camptempovalue: (response.rows[0].elements[0].duration.value / 60).toFixed(0),
               camptempo: this.formatar_valor(response.rows[0].elements[0].duration.text)            
              });
            } else if (this.state.tabIndex == 1) {
              this.setState({      
                controle: 1,
             //   campdistancia: 0, 
             //   camptempovalue: 0,
                camptempo: ''           
              });
            }       
            
            if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
                 console.log('calcular_trajeto - '+JSON.stringify(this.state, null, "    ")); 
           
                this.calcular_trajeto();
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
  */

  mostrar_mapa_desembarque() {

  //if (this.state.controle == 0) {
  debugger;

 
  if (this.state.camplocaldesembarque !== "") {      
      if (this.state.desembarque_latitude !== '' && this.state.desembarque_longitude !== '') {

      //this.calculando_distancia_api();     
      
      return (
        <Map 
        google={this.props.google}
        zoom={18}  
        style={containerStyle}  
        initialCenter={{
          lat: this.state.desembarque_latitude,
          lng: this.state.desembarque_longitude
        }}
        center={{
          lat: this.state.desembarque_latitude,
          lng: this.state.desembarque_longitude
        }}
      >
        <Marker 
           title={this.state.camplocaldesembarque}
           name={this.state.camplocaldesembarque}
          position={{
            lat: this.state.desembarque_latitude,
            lng: this.state.desembarque_longitude
          }} />

        { this.obtendo_distancia_rota_nova() }

   </Map>          
      
      );
    
        
        }   

  }
  
  }
  
  formatar_valor(texto) {

    return (

        texto.replace('hora', 'h').replace('hours', 'h').replace('minutos','m').replace('hs','h').replace('mins','m')

    );

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
         <div id="externo"> 
            <div className="interno2">
              {this.verifica_formatacao(data.bandeira, data.numero)}
            </div>
            <div className="interno">
              {this.verifica_bandeira(data.bandeira)}
            </div>
           
         </div>             
      </MenuItem>      
      )
    })
  }

  handleOpenModalAlteracaoEvento() {     
    this.setState({ 
      showModalAlteracaoEvento: true,      
      mensagem_servico: '',           
      incluir: false,
      inicio: 1,
    });  

     //this.carrega_evento();
    
  }
  
  handleCloseModalAlteracaoEvento () {
    this.setState({ 
      showModalAlteracaoEvento: false
    }); 
    
    this.loadlistServicos();
  }


  handleOpenModalAlteracaoServico(data) {    
   // debugger;
    this.setState({ 
      showModalAlteracaoServico: true,      
      campservicoId: data.id,  
      campservico_pai_id: data.servico_pai_id,      
      possui_tarifa_especial: false,
      quantidade_diarias: true,
      mensagem_aguarde: '',
      mensagem_servico: '',   
      mensagem_qtd_diarias: false,
      erro_qtd_diarias: false,
      qtddiarias_old: 0,
      possui_tarifa: false,  
      nome_motorista_visualizacao: true,
      telefone_motorista_visualizacao: true,          
      data_servico_pai_old: data.data_servico,
      incluir: false,    
    });     

    if (this.state.tabIndex == 1) {
      this.setState({ 
        diaria: true,
        translado: false, 
      });
    }
    if (this.state.tabIndex == 2) {
      this.setState({ 
        translado: true,
        diaria: false, 
      });
  }
      
    debugger;

   this.limpar_campos();   
   this.loadTarifaespecial();
   this.loadTarifa();
   this.loadTipoTransporte();     
   this.loadCartaoCliente();
   this.carrega_servico(data);
   this.loadMotoristasPreferencial();
  // this.busca_motorista_alterar(data.nome_motorista);
   this.maior_data_filho_teste(data.id);
  
    
  }
  
  handleCloseModalAlteracaoServico() {
    this.setState({ 
      showModalAlteracaoServico: false,
      mensagem_aguarde: '',
    }); 
    
    //this.valor_total_servicos();
    //this.valor_total_viagens();
    //this.loadlistServicos();
    //this.loadlistServicosExcluidos();
    //this.atualiza_evento();
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
      camplocalembarque: this.state.camplocalembarque,      
      controle: 0,
      obter_rota_nova: false,
    //  mudar_estilo: customStyles_2,
    });      
    
  }
  
  handleCloseModalEmbarque() {
    this.setState({ 
      showModalEmbarque: false,
      validacao_localembarque: true
      //mudar_estilo: customStyles,
    }); 
    debugger;
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
      Promise.all([
        this.calcular_trajeto()
      ])    
    }
  //  this.obtendo_latitude_longitude();
  }

  handleOpenModalDesembarque() { 
    this.setState({ 
      showModalDesembarque: true,      
      camplocaldesembarque: this.state.camplocaldesembarque,      
      controle: 0,   
      obter_rota_nova: false,   
    //  mudar_estilo: customStyles_2,
    });        
   
    
  }
  
  handleCloseModalDesembarque() {
    this.setState({ 
      showModalDesembarque: false,  
      validacao_localdesembarque: true,
    });  

    debugger;
    if (this.state.camplocalembarque !== '' && this.state.camplocaldesembarque !== '' && campdistancia_global !== '') {
      Promise.all([
        this.calcular_trajeto()
      ])    
    }
   
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
      campMotoristaId: '',
      campqtddiarias: '',
      campbilingue: false,
      campreceptivo: false,
      campdistancia: 0,
      camptempo: 0,
      campCompanhia_aerea: '',
      campNumero_voo: '',
      campnomemotorista: '',
      camptelefonemotorista: '',
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
      erro_nome_motorista: false,
      erro_telefone_motorista: false,
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
      mensagem_nome_motorista: '',
      mensagem_telefone_motorista: '',
      mensagem_companhia_aerea: '',
      mensagem_numero_voo: '',
      mensagem_cartao: '',
      mensagem_servico: '',   
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
      validacao_qtd_diarias: false,
      validacao_hora_inicial: false,
      validacao_hora_final: false,
      validacao_telefone1: false,
      validacao_localembarque: false,
      validacao_localdesembarque: false,
      validacao_companhia_aerea: false,
      validacao_numero_voo: false,
      validacao_nome_motorista: false,
      validacao_telefone_motorista: false,
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
      campeventoId: localStorage.getItem('logeventoservico'),
      incluir: true,      
      quantidade_diarias: false,
      possui_tarifa_especial: false,
      campMotoristaId:'',
      mensagem_aguarde: '',
      mensagem_servico: '',   
      possui_tarifa: false,
      nome_motorista_visualizacao: true,
      telefone_motorista_visualizacao: true,
      qtddiarias_old: 0,
      inicio: 1,
      tabIndex: "2",
    });  

    this.limpar_campos();     
    this.loadCartaoCliente();
    this.loadTarifaespecial();
    this.loadTarifa();
    this.loadTipoTransporte();
    this.loadMotoristasPreferencial();
  //  this.limpar_campos();     
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false,
      mensagem_aguarde:'',
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

  atualiza_pai_delecao(paiId) {

     debugger;
    let tempo_pai = '';

    api.get(`/servicos/getEventoPai/${this.state.eventoid}/${paiId}`)
    .then(reseventopai =>{
      if (reseventopai.data.success == true) {
  
        debugger;

        const pos_tempo_translado_h = reseventopai.data.data[0].tempo_translado.indexOf("h", 0);
        const pos_tempo_translado_m = reseventopai.data.data[0].tempo_translado.indexOf("m", 0);
        const result_hora = parseInt(reseventopai.data.data[0].tempo_translado.substring(0,pos_tempo_translado_h));
        const result_min = reseventopai.data.data[0].tempo_translado.substring(pos_tempo_translado_h + 2, pos_tempo_translado_m);
       tempo_pai = this.formatar_total_segundos(result_hora,result_min);
       
       tempo_pai = this.formatar_minuto(tempo_pai - Number(this.state.tempo_filho));
  
       const datapost_alterar = {                
         quantidade_diarias: reseventopai.data.data[0].quantidade_diarias - 1,    
         km_translado: reseventopai.data.data[0].km_translado - this.state.distancia_filho, 
         tempo_translado: tempo_pai,                  
         valor_estimado: reseventopai.data.data[0].valor_estimado - this.state.valor_estimado_filho,
       }  
  
       api.put(`/servicos/update/${reseventopai.data.data[0].id}`, datapost_alterar);
  
      }
     })
     .catch ( error => {
       alert("Error servicos/getEventoPai/ "+error)
     })   
  }

  deletar_servicos = async (userId) => {

  
    if (this.state.camptipoevento == 1) { // Diaria
      if (this.state.verificaPai == 0) { // verifica se e pai deleta os filhos     
       
       debugger;
     // const data_servico_deletar = ;
       
       api.delete(`/servicos/deletePaieFilhos/${this.state.campDeletarId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}/${this.state.eventoid}/${this.state.nome_passageiro}`)
       .then(resppai =>{
         if (resppai.data.success) {
           this.setState({  
             //open: true,
             mensagem_usuario: 'Serviço Pai e filhos Excluido com sucesso!'
            });
    
           this.valor_total_servicos();
           this.valor_total_viagens();
           this.loadlistServicos();
           this.loadlistServicosExcluidos();                
           this.atualiza_evento();

           this.handleCloseModalDelete(); 
           this.envia_mensagemClick();            
         
         }    
       })
       .catch ( error => {
         alert("Error servicos/deletePaieFilhos/ "+error)
       })

      } else {
      
          // recalcular o valor do pai com o filho excluido
         // this.state.valor_estimado_filho
         // this.state.distancia_filho
         // this.state.quantidade_diarias
         // this.state.tempo_filho

           this.atualiza_pai_delecao(this.state.verificaPai);

           api.delete(`/servicos/delete/${userId}`)
           .then(resppai =>{
             if (resppai.data.success) {
               this.setState({  
                 //open: true,
                 mensagem_usuario: 'Serviço Excluido com sucesso!'
               });
                       
               this.valor_total_servicos();
               this.valor_total_viagens();
               this.loadlistServicos();
               this.loadlistServicosExcluidos();                
               this.atualiza_evento();

               this.handleCloseModalDelete(); 
               this.envia_mensagemClick();            
                 
             }    
           })
           .catch ( error => {
             alert("Error servicos/deletePaieFilhos/ "+error)
           })
          
         }   
   } else {
  
   api.delete(`/servicos/delete/${userId}`)
   .then(response =>{
     if (response.data.success) {
       this.setState({  
         //open: true,
         mensagem_usuario: 'Serviço Excluido com sucesso!'
        });
      //  debugger;
     
       this.valor_total_servicos();
       this.valor_total_viagens();
       this.loadlistServicos();
       this.loadlistServicosExcluidos();
       this.atualiza_evento();
            
      
       this.handleCloseModalDelete(); 
       this.envia_mensagemClick();
       
     
    }    
   })
   .catch ( error => {
     alert("Error servicos/delete/ "+error)
   })

   }  

  }
  criar_historico  = async (servicos, userId) => {

    const datapost_incluir = {
      id: servicos[0].id,
      tipoEventoId: servicos[0].tipoEventoId, 
      eventoId: servicos[0].eventoId, 
      tipoTransporte: servicos[0].tipoTransporte,
      nome_passageiro: servicos[0].nome_passageiro, 
      telefone_passageiro: servicos[0].telefone_passageiro,
      quantidade_passageiro: servicos[0].quantidade_passageiro,  
      data_servico: servicos[0].data_servico,
      quantidade_diarias: servicos[0].quantidade_diarias, 
      hora_inicial: servicos[0].hora_inicial,  
      hora_final: servicos[0].hora_final,  
      local_embarque: servicos[0].local_embarque, 
      local_desembarque: servicos[0].local_desembarque, 
      embarque_latitude: servicos[0].embarque_latitude, 
      embarque_longitude: servicos[0].embarque_longitude, 
      desembarque_latitude: servicos[0].desembarque_latitude, 
      desembarque_longitude: servicos[0].desembarque_longitude,      
      distancia_value: servicos[0].distancia_value, 
      tempo_value: servicos[0].tempo_value,
      companhia_aerea: servicos[0].companhia_aerea,
      numero_voo: servicos[0].numero_voo, 
      motorista_bilingue: servicos[0].motorista_bilingue, 
      valor_bilingue: servicos[0].valor_bilingue,
      valor_receptivo: servicos[0].valor_receptivo,
      motorista_receptivo: servicos[0].motorista_receptivo, 
      nome_motorista: servicos[0].nome_motorista, 
      telefone_motorista: servicos[0].telefone_motorista, 
      km_translado: servicos[0].km_translado, 
      tempo_translado: servicos[0].tempo_translado,
      cartaoId: servicos[0].cartaoId,        
      valor_estimado: servicos[0].valor_estimado,    
      valor_oser: servicos[0].valor_oser,
      valor_motorista: servicos[0].valor_motorista,  
      logid: servicos[0].logid,
      servico_pai_id: servicos[0].servico_pai_id,
      perfilId: servicos[0].perfilId,               
    }  
    debugger;

    if (this.state.verificaPai !== 0) {  
         api.post('/historicoServicos/create', datapost_incluir);
    
    } else if (this.state.verificaPai == 0)  {// verifica se e pai cria os filhos    
         api.post('/historicoServicos/create', datapost_incluir);

         debugger;
         
         api.get(`/servicos/busca_filho/${userId}/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
         .then(response=>{
                  
          if (response.data.success==true) {      

            const data1 = response.data.data
      
            this.setState({listaFilhosAlteracao:data1})
            
          }
      
          this.state.listaFilhosAlteracao.map((filhos)=>{
            debugger;
      
           api.post('/historicoServicos/create', filhos);          
            
       
          });
               
        }).catch ( error => {
          alert("Error servicos/get ")
        });

      }        
      
      this.deletar_servicos(userId);

}

sendDelete(userId, eventoId){
    // url de backend
   // console.log('deletar o id - '+userId);
    
    debugger;
    api.get(`/servicos/get/${userId}`)
    .then(res =>{
      if (res.data.success == true) {
      
       const servicos = res.data.data;
  debugger
       this.criar_historico(servicos, userId);
      } 
       
    });

   // debugger
   
  //  .catch ( error => {
    //  alert("Error servicos/get ")
  // })


  
}
}


//export default listaservicosComponent;

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBcFfTH-U8J-i5To2vZ3V839pPaeZ59bQ4'), 
  
})(listaservicosComponent)


