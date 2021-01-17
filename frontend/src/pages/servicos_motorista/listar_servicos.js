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

var campdistancia_global = '';
var camptempovalue_global = '';
var camptempo_global = ''; 


//const service = new window.google.maps.DistanceMatrixService();
var dateFormat = require('dateformat');

//const distanceMatrix = require('distance-matrix-endpoint')
//var distance = require('google-distance');
var distance  = require('google-distance-matrix');
var nome_motorista_1 = ''
var telefone_motorista_1 = ''

//import { Alert } from 'reactstrap';
const nome = sessionStorage.getItem('lognome');  
const perfil = sessionStorage.getItem('logperfil');

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
      sessionStorage.setItem('logservicoid', this.state.campservicoId);
      data = await api.get(`/servicos/MaxDataServicoFilho/${sessionStorage.getItem('logservicoid')}/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`);
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

var estado_selecionado_mapa_global = '';
var tipoTransporte_global = '';
var bilingue_global = false;
var chave_aleatoria_motorista_global = Math.random().toString(36).slice(-8);
var camplocalembarque_old = '';
var camplocaldesembarque_old = '';

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
      listaMotivos:[],
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
      campmotivoId: '',
      campDeletarId: 0,
      deletar_servico: '',
    }
  }

  componentDidMount(){
    this.interval = setInterval(() => this.tickservicomotorista(), 1000);
    this.setState({
      perfil: sessionStorage.getItem('logperfil'),
      id: sessionStorage.getItem('logid'),
      eventoId: this.props.match.params.id          
    });

    sessionStorage.setItem('logeventoservico',this.props.match.params.id);    

     this.loadlistServicosNovos();
     this.loadlistServicosAtivos(); 
  }

  loadlistServicosNovos(){    
    api.get(`/envioservicoMotorista/list/${sessionStorage.getItem('logid')}`)
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
       alert("Error server envioservicoMotorista "+error)
     })
   }

   loadlistServicosAtivos(){    
    api.get(`/motorista_servico/getMotoristaServicoAtivos/${sessionStorage.getItem('logid')}`)
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


   loadlistaMotivos(){    
    api.get(`/mensagens_motorista/list`)
     .then(res=>{
       if (res.data.success == true) {       

         const data = res.data.data    
         this.setState({
          listaMotivos:data,
           loading: false,
          })
       }
     })
     .catch(error=>{
       alert("Error server loadlistServicos "+error)
     })
   }


   tickservicomotorista() {
  //  if (this.state.value == 1) {
      this.loadlistServicosNovos();
    //} else {
      this.loadlistServicosAtivos(); 
   // } 
   
  
   }

   loadFillTipoData() {
    return this.state.listaMotivos.map((data)=>{          
      return(
         <MenuItem value={data.descricao}>{data.descricao}</MenuItem>      
      )
    })
   }

   async cancelar_servico(row) {
     debugger
   // var servico_id = servicoId;
    //var motorista_cancelado = row.motorista_id;  
    sessionStorage.setItem('motorista_cancelado', row.motoristaId);
  
    const respdelecao = await api.delete(`/motorista_servico/delete/${row.servico.id}`);

      if (respdelecao.data.success == true) { 
          this.loadlistServicosAtivos(); 

          const motorista_alocado = {
            motorista_alocado: false,  
          } 

          api.put(`/servicos/update/${row.servico.id}`, motorista_alocado);
        
        ///  const respservico = await api.get(`/servicos/get/${row.servico.id}`)
        
        
            // if (respservico.data.success == true) { 
            
             this.loadlistServicosNovos();   
            this.handleCloseModalMotivo();              
                        
            this.procurar_motorista_servico(row.servico,'CANCELAMENTO');
              // this.refreshPage();
            // }
      }
   }

   async procurar_motorista_servico(servico, tipo_solicitacao) { 
    // tipo_solicitacao: inclusao, alteracao / reenvio 
    //bloquear_cartao com o valor total mais a porcentagem de acrescimo
    debugger;
    var distribuir_servico_motorista = false;
    possui_motorista = false;     

   // alert(`${tipo_solicitacao}`)
    // alert('distribuir_servico - '+sessionStorage.getItem('distribuir_servico'));   
        
    if (tipo_solicitacao == 'REENVIO') { 

      sessionStorage.setItem('logTipo', '');
      sessionStorage.setItem('distribuir_servico', true);
      api.delete(`/envioservicoMotorista/delete/${servico.id}`);   
      distribuir_servico_motorista = true     

    } else if (tipo_solicitacao == 'INCLUSAO') {  
 
      sessionStorage.setItem('logServicoIncluido', '');
      sessionStorage.setItem('logTipo', '');
      sessionStorage.setItem('distribuir_servico', true);
      distribuir_servico_motorista = true;      
    
    } else if (tipo_solicitacao == 'CANCELAMENTO') {   
     // this.loadlistServicosAtivos(); 
      sessionStorage.setItem('distribuir_servico', true);
         

    } else if (tipo_solicitacao == 'ALTERACAO') {
      sessionStorage.setItem('logServicoAlteracao', '');  
      sessionStorage.setItem('logTipo', '');    
      
      api.delete(`/envioservicoMotorista/delete/${servico.id}`);    
      
      //se algum motorista aceitou o servico 
      //Se faltarem 6 ou mais horas para o inicio do serviço que teve
      // os dados alterados, não será cobrado do Cliente o valor do serviço 
      //e o (s) Motorista (s) não será remunerado;

          if (servico.motorista_alocado == true) {

                const data_hora_atual = new Date();
                const data_servico_alteracao = dateFormat(servico.data_servico, "UTC:dd/mm/yyyy");  

                const data_moment_alt = moment(data_servico_alteracao, "DD/MM/YYYY");
                const formatar_data = data_moment_alt.format("YYYY-MM-DD");    
                const hora_ini_alt = servico.hora_inicial;
                const dataatual_alt = new Date(`${formatar_data} ${hora_ini_alt}`);
                
                var data_seis_horas_menos = moment(
                  dataatual_alt, "D/M/YYYY h:m"
                ).subtract(             
                'hours', 6
                );   
                
                var data_atual = moment(
                  data_hora_atual, "D/M/YYYY h:m"
                );

                if (data_atual.getTime() >= data_seis_horas_menos.getTime() ) {
                    alert(' data_atual '+ data_atual);
                    alert(' data_seis_horas_menos '+ data_seis_horas_menos);

                } else if (data_atual.getTime() <= data_seis_horas_menos.getTime() ) {
                    //Se faltarem menos que 6 horas antes do inicio do serviço que teve os dados alterados
                  //, será cobrado do Cliente o valor do serviço bloqueado no cartão de crédito 
                  //e o Motorista será remunerado pelo valor que lhe couber; Usar a rotina 

                  alert(' data_atual '+ data_atual);
                  alert(' data_seis_horas_menos '+ data_seis_horas_menos);
                }

          } 
    
    }          

    if (sessionStorage.getItem('distribuir_servico') == 'true') {
        sessionStorage.setItem('distribuir_servico', false);

    //  alert('entrou na  distribuir_servico_motorista ');

        const data_servico = dateFormat(servico.data_servico, "UTC:dd/mm/yyyy");
      
        const data_moment = moment(data_servico, "DD/MM/YYYY");
        const formatar_data = data_moment.format("YYYY-MM-DD");    
        const data_servico_date = new Date(formatar_data);
        const data_servico_ini = servico.data_servico;                                   
    
        const hora_ini = servico.hora_inicial;
        //hora_ini = hora_ini.substring(0,5); 
      
        const dataatual = new Date(`${formatar_data} ${hora_ini}`);

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
            var bilingue = '';

            if (servico.motorista_bilingue == '') {
              bilingue = bilingue_global
            } else {
              bilingue = servico.motorista_bilingue
            }

            if (bilingue == false) {
              bilingue = 0
            } else {
              bilingue = 1
            }

        //    var qtd_motoristas = 0;    
            var estado_motorista = '';        
            if (servico.estado_selecionado_mapa == '') {
              estado_motorista = estado_selecionado_mapa_global
            } else {
              estado_motorista = servico.estado_selecionado_mapa;
            }
            var tipoTransporte = '';
            if (servico.camptipoId == '') {
              tipoTransporte = tipoTransporte_global
            } else {
              tipoTransporte = servico.tipoTransporte;
            }
                  
            var verifica_possui_servico = false;
          
            debugger;
            //verificar motorista preferido //
            if (estado_motorista == 'Rio') {
              estado_motorista = 'RJ'   
            }  

            
          // alert(`/motorista/getMotoristaServico/${estado_motorista}/${bilingue}`);
          api.get(`/motorista/getSelecionaMotorista/${estado_motorista}/${bilingue}`)                    
          .then(respMotorista=>{

              debugger;
              if (respMotorista.data.success == true) {  

                  debugger      
                  total_motorista = respMotorista.data.data.length;
                  motorista_incluido = 0;
                  var mot_sel = respMotorista.data.data;
                  var motorista_cancelado = sessionStorage.getItem('motorista_cancelado');

                  mot_sel.map((mot)=>{          
                    var distribui_moto = mot.id;   

                  if ( motorista_cancelado.toString() !== distribui_moto.toString()) {   
                    sessionStorage.setItem('motorista_cancelado', '');
                //    qtd_motoristas = qtd_motoristas + 1;
                    //Não estar alocado em outro serviço 3 horas antes ou 3 horas depois da hora inicial do serviço atual.
                    // verifica_possui_servico();
                    
                    api.get(`/motorista_servico/getMotoristaServico/${mot.id}/${tipoTransporte}`)                  
                    .then(respservico=>{   
                        
                        debugger                 
                        if (respservico.data.success == true) {   
                          const response_data = respservico.data.data[0];      
                              
                                  const data_servico = dateFormat(response_data.servico.data_servico, "UTC:dd/mm/yyyy");  
                                  const data_teste = moment(data_servico, "DD/MM/YYYY");
                                  const formatar_data = data_teste.format("YYYY-MM-DD");    
                                  const data_servico_banco = new Date(formatar_data);
                                  var hora_banco = servico.hora_inicial.substring(0,5);                   

                                  if (data_servico_banco.getTime() == data_servico_date.getTime() &&
                                      hora_banco <= hora_maior_tres &&
                                      hora_banco >= hora_menor_tres) {

                                          debugger;
                                          verifica_possui_servico = true;
                                          motorista_incluido = motorista_incluido + 1;
                                      //    this.finalizando_processo_busca();

                                  } else {
                                      debugger
                                  //   motorista_incluido = motorista_incluido + 1;
                                      this.verifica_veiculo_motorista_selecionados(mot.id, tipoTransporte, servico);

                                  }                                             
                        } else {

                            debugger
                          //  motorista_incluido = motorista_incluido + 1;
                            this.verifica_veiculo_motorista_selecionados(mot.id, tipoTransporte, servico);

                        }     


                      }).catch(error=>{
                        alert("Error motorista_servico getMotoristaServico  -"+error)
                       });    
                    }
                  })        
                
              
              // alert('Reenvio para os motoristas realizado com sucesso');
      
              } else {
                alert("Não foi encontrado motorista disponível, para atender a esse serviço no momento ")
                sessionStorage.setItem('logServicoIncluido', ''); 
                /*   this.setState({                              
                  mensagem_servico: "Não foi encontrado motorista disponível, para atender a esse serviço no momento"
                })*/
              }  

            }).catch(error=>{
                alert("Error motorista getSelecionaMotorista -"+error)
            });   
          }
     
  } 
  
  async verifica_veiculo_motorista_selecionados(motorista_id, tipoTransporte, servico){
    debugger
    motorista_incluido = motorista_incluido + 1;

    debugger;  
    //verificar se o motorista tem o veiculo selecionado 
    //console.log(`/veiculo/getVeiculoSelecionado/${motoristas.id}/${tipoTransporte}`);   
    const respveiculo = await api.get(`/motorista/getMotVeiculoTipo/${motorista_id}/${tipoTransporte}`)                    
   // .then(respveiculo=>{   

      debugger;   
      if (respveiculo.data.success == true) {     
        
        const datapost_motorista = {
          servicoId: servico.id,
          tipoEventoId: servico.tipoEventoId,          
          data_servico: servico.data_servico,        
          hora_inicial: servico.hora_inicial,           
          local_embarque: servico.local_embarque,          
          motorista_id: motorista_id   
        }  
        api.post('/envioservicoMotorista/create',datapost_motorista);            
                  
      } 

    
      ///  sessionStorage.set('mensagem_motorista_alocado', 'Por favor aguarde. Procurando Motorista para atender seu serviço!');

   

  }

   async aceitou_servico(row) {
      //alert("aceitou o serviço "+row.servicoId);
     debugger
      var servico_id = row.servicoId;
      var motorista_id = row.motorista_id;
      var data_servico_ini = row.data_servico;
      var hora_servico = row.hora_inicial;
      hora_servico = hora_servico.substring(0,5);     
      
      const data_servico = dateFormat(data_servico_ini, "UTC:dd/mm/yyyy");    
      const data_moment = moment(data_servico, "DD/MM/YYYY");
      const formatar_data = data_moment.format("YYYY-MM-DD");    
      const data_servico_date = new Date(formatar_data);

      const dataatual = new Date(`${formatar_data} ${hora_servico}`);
          
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
      //  motoristumId: motorista_id,
      }    
  
      debugger;
    //  console.log(' motorista_servico - '+JSON.stringify(datapost, null, "    "))  
      api.post(`/motorista_servico/create`, datapost);
  
     //verificar se possui algum outro servico no intervalo de 3 horas a mais ou a menos 
     // se tiver excluir da tabela envioservicoMotorista
      const respservico = await api.get(`/envioservicoMotorista/getMotorista/${motorista_id}`)                  
     //.then(respservico=>{   
  
        if (respservico.data.success == true) {                  
                        
         // const response_data = respservico.data.data[0];
  
           respservico.data.data.map((motorista_enviado)=>{  
               
              const data_servico_b = dateFormat(motorista_enviado.data_servico, "UTC:dd/mm/yyyy");  
              const data_teste = moment(data_servico_b, "DD/MM/YYYY");
              const formatar_data = data_teste.format("YYYY-MM-DD");    
              const data_servico_banco = new Date(formatar_data);
              var hora_banco = motorista_enviado.hora_inicial.substring(0,5);       
             
  
              debugger
              if (data_servico_banco.getTime() == data_servico_date.getTime() &&
              hora_banco <= hora_maior_tres &&
              hora_banco >= hora_menor_tres) {  
  
                  api.delete(`/envioservicoMotorista/delete_servico_motorista/${motorista_enviado.servicoId}/${motorista_id}`);
              
              }
  
            })   
        }
     // })      
        
          this.refreshPage();
       // }   
      
      // incluir motorista na tabela motorista_servico
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
refreshPage() {
  window.location.reload(false);
}
opcao_tabChange = (event, newValue) => {   
  this.setState({        
      value: newValue 
  });    
};
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
componentWillUnmount() {
  clearInterval(this.interval);   

 }

 handleMotivoCancalementoChange = (event, newValue) => {
  this.setState({     
    campmotivoId: event.target.value, 
   });   
  
};

  render()
  {   
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
                          { title: '', field: 'tipoEventoId', width: '70px', minWidth: '70px', maxWidth: '70px', 
                          cellStyle:{ fontSize: 10, textAlign: "center"}, render: rowData => rowData.tipoEventoId == 1 ? 
                          <div style={{fontSize: 10, backgroundColor: '#FF964F', color: '#FDFDFE', borderRadius: '50px' }}>Diária</div> : <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '50px' }}>Translado</div> },                              
                          { title: '', field: '', width: '10px', minWidth: '10px', maxWidth: '10px'}, 
                          { title: 'Origem', field: 'local_embarque', width: '290px', minWidth: '290px', maxWidth: '290px' },
           
                          { title: '', field: 'motorista_bilingue', width: '50px', minWidth: '50px', maxWidth: '50px', align:"center", 
                          cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_bilingue == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px'}}>Bilingue</div> : "" },   
                          { title: '', field: '', width: '2px', minWidth: '2px', maxWidth: '2px'},
                          { title: '', field: 'motorista_receptivo', width: '50px', minWidth: '50px', maxWidth: '50px', align:"center",  
                          cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_receptivo == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px'}}>Receptivo</div> : "" },  
                          { title: '', field: '', width: '320px', minWidth: '320px', maxWidth: '320px'},
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' },                             
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
                          exportButton: { pdf: true },          
                          actionsColumnIndex: 11,
                         // pageSize: 9,
                         // pageSizeOptions: [0],                 
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
                                         
                          { title: '', field: 'tipoEventoId', width: '70px', minWidth: '70px', maxWidth: '70px',
                          cellStyle:{ fontSize: 10, textAlign: "center"}, render: rowData => rowData.servico.tipoEventoId == 1 ? 
                          <div style={{fontSize: 10, backgroundColor: '#FF964F', color: '#FDFDFE', borderRadius: '50px' }}>Diária</div> : <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '50px' }}>Translado</div> },                              
                          { title: '', field: '', width: '10px', minWidth: '10px', maxWidth: '10px'},  
                          { title: 'Nome Passageiro', field: 'servico.nome_passageiro', width: '160px', minWidth: '160px', maxWidth: '160px' },
                          { title: 'Qtd Pass', field: 'servico.quantidade_passageiro', width: '100px', minWidth: '100px', maxWidth: '100px', align: 'center' },     

                          { title: 'Origem', field: 'servico.local_embarque', width: '230px', minWidth: '230px', maxWidth: '230px', render: rowData => rowData.servico.local_embarque.substring(0,33)  },
                          { title: 'Destino', field: 'servico.local_desembarque', width: '250px', minWidth: '250px', maxWidth: '250px', render: rowData => rowData.servico.local_desembarque.substring(0,36) },
                                                                              
                          { title: '', field: 'servico.motorista_bilingue', width: '50px', minWidth: '50px', maxWidth: '50px', align:"center", 
                          cellStyle:{ fontSize: 10}, render: rowData => rowData.servico.motorista_bilingue == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Bilingue</div> : "" },                               
                          { title: '', field: '', width: '2px', minWidth: '2px', maxWidth: '2px'},  
                          { title: '', field: 'servico.motorista_receptivo', width: '50px', minWidth: '50px', maxWidth: '50px', align:"center", 
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
                          actionsColumnIndex: 12,
                         // pageSize: 9,
                         // pageSizeOptions: [0],                     
                        }}
                        actions={[
                          {
                            icon: 'save',
                            tooltip: 'Cancelar Serviço',
                            onClick: (event, rowData) => this.handleOpenModalMotivo(rowData) //this.cancelar_servico(rowData)
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
               <div className="titulo_moldura_modal_delecao">Deseja cancelar o atendimento desse serviço? </div>
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
               className="botoes_delete_excluir_modal" p={2} onClick={()=>this.handleOpenModalMotivo()}>
              <div className="d-flex justify-content-center">
              <label> Excluir </label>
              </div>     
            </Box>      

            </div>
         </ReactModal>       
     <ReactModal 
        isOpen={this.state.showMensagemMotivo}
        style={ConfirmacaodelStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div> 
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalMotivo()} className="botao_close_modal_deletar">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <center><img src="/exclamation.png" /> </center>
            <div className="container_alterado">
              
             <div className="moldura_modal_delecao">
           <div className="titulo_moldura_modal_motivo_delecao"> Por favor, informe o motivo do cancelamento desse serviço? </div>
       

             <FormControl className="select_modal_tipo" variant="outlined">
                        <InputLabel className="label_select_modal_tipo" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          className="text_select_modal_tipo"                          
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.campmotivoId}                
                          onChange={ this.handleMotivoCancalementoChange }                             
                           
                          label="Motivo Cancelamento"
                          labelWidth={240}
                        >
                          {this.loadFillTipoData()}                    
                        </Select>
                      </FormControl>    
                      </div>              
                              <div className="retorno">{this.state.retorno}</div>
            <Box 
               className="botoes_delete_cancelar_modal" p={2} onClick={()=>this.handleCloseModalMotivo()}>
              <div className="d-flex justify-content-center">
              <label> Cancelar </label>
              </div>     
            </Box>      
            <Box 
               className="botoes_delete_excluir_modal" p={2} onClick={()=>this.cancelar_servico(this.state.deletar_servico)}>
              <div className="d-flex justify-content-center">
              <label> Excluir </label>
              </div>     
            </Box>      

            </div>
         </ReactModal>      


      
    </div> 
   </div>
   </div>
    );
  }

  handleOpenModalDelete(data) { 

    this.setState({ 
      showMensagemDelete: true,
      deletar_servico: data,
      campDeletarId: data.id,      
    });           
  }
  
  handleCloseModalDelete() {
    this.setState({ 
      showMensagemDelete: false
    });    

    this.loadlistServicosNovos();
    this.loadlistServicosAtivos();      
  }

  handleOpenModalMotivo(data) { 

    this.setState({ 
      showMensagemMotivo: true,
      deletar_servico: data,      
    });      
    
    this.loadlistaMotivos();
    
  }
  
  handleCloseModalMotivo() {
    this.setState({ 
      showMensagemMotivo: false
    });    

    //this.handleCloseModalDelete();
     
  }
  
}

export default listaservicosComponent;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));