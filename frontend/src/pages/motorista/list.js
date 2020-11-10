import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';
import { Input } from 'reactstrap';

import { numeroMask } from '../formatacao/numeromask';
import ReactModal from 'react-modal';
import Box from '@material-ui/core/Box';
import MaterialTable from 'material-table';
//import { Tabs, Tab } from 'react-bootstrap';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Tabs from '@material-ui/core/Tabs';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Data } from '@react-google-maps/api';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { dataMask } from '../formatacao/datamask';

import { cepMask } from '../formatacao/cepmask';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
import Avatar from '@material-ui/core/Avatar';

var dateFormat = require('dateformat');
const buscadorcep = require('buscadorcep');

var myURL = window.URL || window.webkitURL;
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  


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

const FotoStyles = {
  overlay: {    
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: '85%',
    //backgroundColor: 'rgba(255, 255, 255, 0.75)'
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  content : {
    top                    : '10px',
    left                   : '36%',    
    right                  : '50%',
    bottom                 : '80px',  
    height                 : '60%',    
    width                  : '350px',    
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
/*
let columns = [
  { id: '1', label: '', minWidth: 80, align: 'left' },
  { id: 'status', label: 'Status', minWidth: 80, align: 'left' },
  { id: 'cpf', label: 'Cpf', minWidth: 100, align: 'left'},
  { id: 'nome', label: 'Nome', minWidth: 200, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 90, align: 'left' },
  { id: 'telefone', label: 'Telefone', minWidth: 60, align: 'left' },
  { id: 'acao', label: '', minWidth: 100, align: 'left' },
];
*/
class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      campNome: "",
      foto: '',
      campData_nascimento:"",
      campSeguradoraNome: '',
      mensagem_usuario: '',
      mensagem_alert: false,
      campMotorista_bilingue: false,
      campEmail:"",      
      campTelefone1:"",
      campCpf:"", 
      campCNH: "",       
      campDeletarId: '',
      campDeletarEmail: '',
      camp_foto_url: '',
      camp_foto_CNH_url: '',
      camp_foto_crvl: '',
      camp_foto_CRVL_url: '',
      disabled_seguradora: false,
      disabled_ano: false,
      disabled_anodut: false,
      disabled_apolice: false,
      disabled_cor: false,
      disabled_marca: false,
      disabled_modelo: false,
      disabled_placa: false,      
      disabled_cadeira_rodas: false,
      disabled_engate: false,
      disabled_cadeira_p: false,
      disabled_cadeira_g: false,
      campCep: '',
      campNome: '',
      campEndereco: '',
      campBairro: '',
      campNumero: '',
      campComplemento:"",
      campData_CNH: "", 
      campStatusId: '',     
      campVeiculoId: '',    
      campCarroId: 0,
      campCarro: '',
      campCarroNovo: '',
      campModeloId: 0,
      campModelo: '',
      campModeloNovo: '',
      campPlaca: "",
      campAnodut: '',
      campAno: "",
      campCor: "",
      campNome: "",
      campApolice: "",
      value: "1",
      campNomeSalvar: "",
      campSeguradoraNome: "",  
      estado_selecionado: '',
      seleciona_bilingue: 0,
      mensagem_nome: '',  
      mensagem_cpf: '',  
      mensagem_email: '',  
      mensagem_telefone1: '',
      mensagem_data_nascimento: '',        
      mensagem_numero_carteira: '',    
      mensagem_datavalidade: '',    
      mensagem_carro: '',  
      mensagem_placa: '',  
      mensagem_cor: '',  
      mensagem_ano: '',  
      mensagem_anoDUT: '',  
      mensagem_apolice: '',  
      mensagem_seguro: '',  
      mensagem_modelo: '', 
      mensagem_numero_carteira: '',    
      mensagem_datavalidade: '',    
      erro_cpf: false,
      erro_nome: false,
      erro_datanascimento: false,
      erro_email: false,
      erro_telefone: false,
      erro_marca: false,
      erro_dataCNH: false,
      erro_numero_carteira: false,
      validacao_marca:false,
      validacao_cep: false,
      validacao_numero: false,
      validacao_complemento: false,
      validacao_cpf: false,
      validacao_nome: false,
      validacao_datanascimento: false,
      validacao_email: false,
      validacao_telefone: false,  
      validacao_numero_carteira: false,
      validacao_dataCNH: false,
      color: 'light',
      listMotorista:[],
      listaMarcas:[],
      listaModelos:[],
      listMotoristaExcluidos:[],
      listMotoristaCadIncompletos:[],
      listMotoristaConvite:[],
      listaStatus:[],
      listSeguradoras:[],      
      listaVeiculos:[],
      loading: true,
      validate: {         
        carroState: '',          
        modeloState: '',          
        corState: '',     
        placaState: '',     
        anoState: '',     
        anoDUTState: '',     
        apoliceState: '',     
        seguroState: '',     
      }    
    }

    this.busca_motorista = this.busca_motorista.bind(this);
    this.carroChange = this.carroChange.bind(this);
    this.modeloChange = this.modeloChange.bind(this);

    this.cepchange = this.cepchange.bind(this);
    this.validaCepChange = this.validaCepChange.bind(this);      

    this.verificaCep = this.verificaCep.bind(this);  
    this.numerochange = this.numerochange.bind(this);
    this.complementochange = this.complementochange.bind(this);

    this.validaNumeroChange = this.validaNumeroChange.bind(this);      
    this.validaComplementoChange = this.validaComplementoChange.bind(this);    
    this.verificaNumero = this.verificaNumero.bind(this);  
    this.verificaComplemento = this.verificaComplemento.bind(this);  

    this.emailchange = this.emailchange.bind(this);
    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.verificaEmailonfocus = this.verificaEmailonfocus.bind(this);   

    this.engateChange = this.engateChange.bind(this);      
    this.cadeirinhapequenaChange = this.cadeirinhapequenaChange.bind(this);  
    this.cadeirinhagrandeChange = this.cadeirinhagrandeChange.bind(this);  
    this.cadeirarodasChange = this.cadeirarodasChange.bind(this);  

    this.handleChange = this.handleChange.bind(this);   
    this.veiculoChange = this.veiculoChange.bind(this);
    this.verificaSeguro = this.verificaSeguro.bind(this);  

    this.Data_validadeChange = this.Data_validadeChange.bind(this);
    this.verificaCnh = this.verificaCnh.bind(this);  
    this.verificaDataValidade = this.verificaDataValidade.bind(this);  
    this.verificaCnhonblur = this.verificaCnhonblur.bind(this);   
    this.validaCnhChange = this.validaCnhChange.bind(this);  

  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    
    if (localStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else {
        this.loadMotorista();  
        this.loadMotoristaExcluidos();         
        this.loadMotoristaCadIncompletos();         
        this.carrega_status();  
        this.carrega_marca_banco();
        this.loadSeguradoras();
        this.loadMotoristaConvite();
    }    
   
  }

  emailchange(e) {
    this.setState({ campEmail: e.target.value })
  }

  verificaNumero(e) {
    const { validate } = this.state
       if (e.target.value.trim().length == 0) {     
        this.setState({ 
          validate,
          inicio: 1,   
          erro_numero: false,
          validacao_numero: false,     
          mensagem_numero: ''  
         })            
       }      
   }
  
   verificaComplemento(e) {
    const { validate } = this.state
       if (e.target.value.trim().length == 0) {      
        this.setState({ 
          validate,     
          erro_complemento: false,
          validacao_complemento: false,                
          mensagem_complemento: ''  
         })             
       }      
   }
  
   validaNumeroChange(e){
    const { validate } = this.state
    
      if (e.target.value.trim().length == 0) {     
        this.setState({ 
            inicio: 1,
            erro_numero: false,
            validacao_numero: false,     
            mensagem_numero: '' 
        })  
      } else if (e.target.value.trim().length > 0) {
        validate.numeroState = 'has-success'  
        this.setState({                   
          inicio: 2,
          erro_numero: false,
          validacao_numero: true,     
        })      
        
      }  
      this.setState({ validate })   
     
  }
  validaComplementoChange(e){
    const { validate } = this.state
    
      if (e.target.value.trim().length == 0) {     
        this.setState({         
          erro_complemento: false,
          validacao_complemento: false,     
          mensagem_complemento: '' 
        })  
      } else if (e.target.value.trim().length > 0) {    
        this.setState({      
          erro_numero: false,
          validacao_numero: true,                
        })          
      }  
      this.setState({ validate })
      
  }

  Cnhchange(e) {
    this.setState({ campCNH: e.target.value })
  }

  Data_validadeChange(e) {
    this.setState({ campData_CNH: dataMask(e.target.value) })
  }

  numerochange(e) {
    this.setState({ campNumero: numeroMask(e.target.value) })
  }
  complementochange(e) {
    this.setState({ campComplemento: e.target.value })
  }

  verificaDataValidade() {
    const { validate } = this.state
       if (this.state.campData_CNH.length == 0) {     
        this.setState({ 
          validate,
          erro_dataCNH: true,
          validacao_dataCNH: false,
          mensagem_datavalidade: ''  
         })      
       } else {

          validate.data_validadeState = 'has-success' ;        
          this.setState({ 
            erro_dataCNH: false,
            validacao_dataCNH: true,
            mensagem_datavalidade: ''
          });     

       }        
   }

  verificaCnhonblur(e) {
    const { validate } = this.state
       if (this.state.campCNH.length == 0) {
        validate.numero_carteiraState = 'has-danger'
        this.setState({ 
          validate,
          erro_numero_carteira: true,
          validacao_numero_carteira: false,
          mensagem_numero_carteira: 'O campo Número CNH é obrigatório.'  
         })      
       } else {
        validate.numero_carteiraState = 'has-success' ;        

        this.setState({ 
          erro_numero_carteira: false,
          validacao_numero_carteira: true,
          mensagem_numero_carteira: ''
       });  

       }      
   }
   validaCnhChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.numero_carteiraState = ''
        this.setState({ 
          erro_numero_carteira: false,
          validacao_numero_carteira: false,
          mensagem_numero_carteira: '' 
        })  
      } else if (e.target.value.length > 0) {      
        validate.numero_carteiraState = 'has-success'       
        this.setState({ 
          erro_numero_carteira: false,
          validacao_numero_carteira: true,
          mensagem_numero_carteira: '' 
        })  
      }  
      this.setState({ validate })  
  }
   verificaCnh(e) {
    const { validate } = this.state
       if (this.state.campCNH.length == 0) {
       // validate.numero_carteiraState = 'has-danger'
        this.setState({ 
          validate,
          erro_numero_carteira: false,
          validacao_numero_carteira: false,
          mensagem_numero_carteira: ''  
         })      
       } else {
        validate.numero_carteiraState = 'has-success' ;        

        this.setState({ 
          erro_numero_carteira: false,
          validacao_numero_carteira: true,
          mensagem_numero_carteira: ''
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
                    mensagem_email: ''  
                })
              } 
            })        
            .catch(error=>{
              alert("Erro de conexão "+error)
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
            erro_email: false,
            validacao_email: false,
            mensagem_email: '' })  
        }

        this.setState({ validate })
    }       

  loadSeguradoras(){  
    //const baseUrl = "http://34.210.56.22:3333"
    //const url = baseUrl+"/seguradora/list"
    api.get('/seguradora/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listSeguradoras:data})
      }
      else {
        alert("Erro de conexão loadSeguradoras")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
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
    
  carrega_estado() {
    api.get('/estado/getNome/'+this.state.campEstadoId)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({ estado_selecionado:data[0].nome})
      }
      else {
        alert('Lista vazia')
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }

  carroChange(e) {             
    const { validate } = this.state
     console.log('carrochange value - '+e.target.value )          
      validate.modeloState = ''    
      this.setState({ 
        validate,
        campCarroId: e.target.value         
      })       
      
    //  this.load_modelo_banco(e.target.value);
  }

  loadMarcaData(){   
    return this.state.listaMarcas.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.name}</MenuItem>              
      )
    })     
  
   }

   loadModelosData(){
  
    return this.state.listaModelos.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.name}</MenuItem>           
      )
    })     
  
   }

   loadSeguradorasData(){
  
    return this.state.listSeguradoras.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.nome}</MenuItem>             
      )
    })     
  
   }

   buscaSeguradora(id){
  
    if (id !== null && id !== undefined) {
      //const baseUrl = "http://34.210.56.22:3333"
     //const url = baseUrl+"/seguradora/list"
      api.get(`seguradora/get/${id}`)
      .then(res=>{
        if (res.data.success) {
          console.log(JSON.stringify(res.data, null, "    ")); 
          const data = res.data.data
          this.setState({
            campSeguradoraNome: data[0].nome 
          })
        }
        else {
          alert("Erro de conexão buscaSeguradora")
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      })
    }
   }  

   carrega_marca_banco(){
    const { validate } = this.state   
    api.get('/marca/list')
    .then((val)=>{    
     
      if (val.data.data !== null) {
        const data = val.data.data
        this.setState({ 
          listaMarcas: data     
        });       
      }  

     }).catch(error=>{
        validate.cnpjState = 'has-danger'
        this.setState({           
            mensagem_carro: 'Lista não encontrada' 
        })  
    })

  }

  verificaSeguro() {
    const { validate } = this.state
       if (this.state.campSeguradoraId.length == 0) {
        validate.seguroState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_seguro: 'O campo Seguro é obrigatório.'  
         })      
       }      
   }

  carrega_motorista_veiculo() {
    const { validate } = this.state;
    console.log('logVeiculo - '+JSON.stringify(localStorage.getItem('logVeiculo'), null, "    ")); 
    api.get(`/veiculo/get/${localStorage.getItem('logVeiculo')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {          

          this.setState({   
            campCarro: res.data.data[0].marca,
            campModelo: res.data.data[0].modelo,
            campCarroId: res.data.data[0].marcaId,
            campModeloId: res.data.data[0].modeloId,
            campApolice: res.data.data[0].apolice,
            camp_foto_CRVL_url: res.data.data[0].foto_CRVL_url,
            campSeguradoraId: res.data.data[0].seguradoraId,
            campPlaca: res.data.data[0].placa,
            campAnodut: res.data.data[0].anodut,            
            campAno: res.data.data[0].ano,
            campCor: res.data.data[0].cor,
            campEngate: res.data.data[0].engate,
            campCadeirinhaPequena: res.data.data[0].cadeirinha_pequena,       
            campCadeirinhaGrande: res.data.data[0].cadeirinha_grande,       
            campCadeiraRodas: res.data.data[0].cadeira_rodas,             
            campVeiculoId: localStorage.getItem('logVeiculo'),                                    
            inicio: 2,
            
          })            

           this.buscaSeguradora(res.data.data[0].seguradoraId)
          // this.load_modelo_banco(this.state.campCarroId)
           localStorage.setItem('lognome', this.state.campNome);  


          if (this.state.campCarro == null) {
            this.setState({   
              campCarro: ''
            })
          }  
          if (this.state.campModelo == null) {
            this.setState({   
              campModelo: ''
            })
          }  
          if (this.state.campPlaca == null) {
            this.setState({   
              campPlaca: ''
            })
          }  
          if (this.state.campAno == null) {
            this.setState({   
              campAno: ''
            })
          }  
          if (this.state.campAnodut == null) {
            this.setState({   
              campAnodut: ''
            })
          }  
          if (this.state.campCor == null) {
            this.setState({   
              campCor: ''
            })
          }  
          if (this.state.campApolice == null) {
            this.setState({   
              campApolice: ''
            })
          }  
          if (this.state.campSeguradoraId == null) {
            this.setState({   
              campSeguradoraId: 0
            })
          }  

          if (this.state.campCarro !== "") {
            validate.carroState = 'has-success'      
          }
          if (this.state.campPlaca !== "") {
            validate.placaState = 'has-success'      
          }
          if (this.state.campModelo !== "") {
            validate.modeloState = 'has-success'      
          }
          if (this.state.campAno !== "") {
            validate.anoState = 'has-success'      
          }
          if (this.state.campAnodut !== "") {
            validate.anoDUTState = 'has-success'      
          }
          if (this.state.campCor !== "") {
            validate.corState = 'has-success'      
          }   
          if (this.state.campApolice !== "") {
            validate.apoliceState = 'has-success'      
          }   
          if (this.state.campSeguradoraId !== 0) {
            validate.seguroState = 'has-success'      
          }             

          this.setState({ 
            validate,
            incluir: false
          })
         

        } else {
          this.setState({ 
            incluir: true
          })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão carrega_veiculo "+error)
      })   
    }

  load_modelo_banco(marca_id){
    const { validate } = this.state   
    api.get(`/modelo/get/${marca_id}`)
    .then((val)=>{
//          console.log(JSON.stringify(val.data, null, "    ")); 
    //  console.log('Marca - ' + JSON.stringify(val))
      if (val.data.data !== null) {
        const data = val.data.data
        this.setState({ 
          listaModelos: data     
        });  
      }  

     }).catch(error=>{
        validate.cnpjState = 'has-danger'
        this.setState({           
            mensagem_carro: 'Lista não encontrada' 
        })  
    })

  }

   buscaMarca(id) { 
    //let marca_saida = ''      
    console.log('id entrada Marca - '+id);
      this.state.listaMarcas.map((data)=>{          
         if (data.id == id) {
            console.log('buscaMarca - '+data.name);     
            localStorage.setItem('logMarca', data.name)
           // marca_saida = data.name                   
         }

       }) 
     /*  console.log('id saida Marca - '+marca_saida);
       this.setState({           
        campCarroNovo: marca_saida    
      })*/  

   }

   buscaModelo(id) {       
   // let modelo_saida = ''      
    console.log('id entrada Modelo - '+id);
    this.state.listaModelos.map((data)=>{          
       if (data.id == id) {
         console.log('buscaModelo - '+data.name); 
         localStorage.setItem('logModelo', data.name)
         //modelo_saida = data.name                       
       }
     }) 
   /*  console.log('id saida Modelo - '+modelo_saida);
     this.setState({           
      campModeloNovo: modelo_saida     */
   
 }

 modeloChange(e) {   
  console.log('modelochange value - '+e.target.value )  
  //let modelo = e.target.value   
  //console.log('modeloId value - '+this.state.campModeloId)  
  //const { validate } = this.state
  //console.log('listaModelos - '+JSON.stringify(modelo, null, "    ")); 
  this.setState({ 
      campModeloId: e.target.value,                 
    //  campModelo: this.state.listaModelos[this.state.campModeloId].name
  })    

}
cepchange(e) {
  this.setState({ campCep: cepMask(e.target.value) })
 // if (this.state.campCep.length > 0) {
 //   this.handleClick(e)
 // }
}

handleCepClick(e) {    
  const base = e.target.value;
  const estadoId = "";
  const { validate } = this.state
  
  console.log('BASE '+JSON.stringify(base.replace('-',''), null, "    "));                

  if (base.length > 0) {
   buscadorcep(base.replace('-','')).
     then(endereco => { 

      //console.log('Busca '+JSON.stringify(endereco, null, "    "));                  

          api.get(`/estado/get/${endereco.uf}`)
          .then(res=>{        
            validate.enderecoState = ''  
            validate.cidadeState = ''  
            validate.bairroState = ''  
            validate.estadoState = ''  
            validate.numeroState = ''  
            validate.complementoState = ''            


            if (res.data.data.length !== 0) {
              //console.log(JSON.stringify(res.data.data.length, null, "    "));          

                if (res.data.success) {      
                  //console.log(JSON.stringify(res.data, null, "    "));                  
                  
                  if (endereco.logradouro !== "") {
                    validate.enderecoState = 'has-success'         
                  }
                  if (endereco.localidade !== "") {
                    validate.cidadeState = 'has-success'
                  }
                  if (endereco.bairro !== "") {
                    validate.bairroState = 'has-success'
                  } 
                  if (endereco.uf !== "") {
                    validate.estadoState = 'has-success'
                  }           
                  if (endereco.complemento !== "") {
                    validate.complementoState = 'has-success'         
                  }
                  
                  this.setState({                    
                    cep_encontrado: 'encontrado',
                    campCep: endereco.cep,
                    campEndereco: endereco.logradouro,
                    campCidade: endereco.localidade,
                    campComplemento: '',
                    campBairro: endereco.bairro,
                    campEstadoId: res.data.data[0].id, // endereco.uf,           
                    estado_selecionado: endereco.uf,
                    campComplemento: endereco.complemento,
                    validacao_numero: false,
                    validacao_complemento: false,
                  }); 

                  //console.log(JSON.stringify(this.state, null, "    "));
                } else {  
              
                  validate.cepState = 'has-danger'
                  this.setState({             
                      validate,
                      erro_cep: true,
                      validacao_cep: false,
                      cep_encontrado: '',
                      mensagem_cep: 'O cep não encontrado', 
                      campCep: "",
                      campEndereco: "",
                      campCidade: "",
                      campBairro: "",
                      campEstadoId: 0, 
                      estado_selecionado: ""
                  })            

                } 
              } else {

                validate.cepState = 'has-danger'
                    this.setState({             
                        validate,
                        cep_encontrado: '',
                        erro_cep: true,
                        validacao_cep: false,
                        mensagem_cep: 'O cep não encontrado', 
                       // campCep: "",
                        campEndereco: "",
                        campCidade: "",
                        campBairro: "",
                        campEstadoId: 0, 
                        estado_selecionado: ""
                    })            
      
              }  
          })        
          .catch(error=>{
            alert("Error server "+error)
          })        
         //console.log(JSON.stringify(this.state, null, "    ")); 
        // this.estadoChange = this.estadoChange.bind(this); 
      });
      
    //}
    }  else {
       this.limpar_endereco();
    }

};

validaCepChange(e){
  const { validate } = this.state
  //console.log('teste cep '+e.target.value);
    if (e.target.value.length == 0) {
      //this.limpar_endereco()
      validate.cepState = 'has-danger'
      validate.numeroState = ''
      validate.complementoState = ''
      validate.enderecoState = ''
      validate.estadoState = ''
      validate.bairroState = ''
      validate.cidadeState = ''
      this.setState({ 
         inicio: 1,
         erro_cep: true,
         validacao_cep: false,
         mensagem_cep: 'CEP inválido' 
      })  
    } else if (e.target.value.length == 9) {     
      if (e.key !== 'Enter') {      
            validate.cepState = 'has-success'                  
            this.setState({ 
              erro_cep: false,
              validacao_cep: true,
              busca_cep: e.target.value,
              mensagem_cep: ''                                            
            })
            
        this.handleCepClick(e);
      }  
    }      
    this.setState({ validate })
}

verificaCep(e) {
  const { validate } = this.state
  //console.log('verificaCep - '+JSON.stringify(this.state, null, "    "));
  if (e.target.value.length == 0) {
     if (e.target.value.trim().length == 0) {
        this.limpar_endereco()
        validate.numeroState = ''     
        validate.complementoState = ''
        validate.bairroState = ''          
        validate.cidadeState = ''     
        validate.estadoState = ''
        validate.enderecoState = ''    
        this.setState({           
          inicio: 1,    
          erro_cep: false,
          validacao_cep: false,   
          mensagem_cep: ''            
        })            
        this.setState({ validate })
    }   
  }  
 }


corChange(e) {
  this.setState({ campCor: e.target.value })
}
anoChange(e) {
  this.setState({ campAno: e.target.value })
}
anoDUTChange(e) {
  this.setState({ campAnodut: e.target.value })
}
placaChange(e) {
  this.setState({ campPlaca: e.target.value })
}
apoliceChange(e) {
  this.setState({ campApolice: e.target.value })
}
seguradoraChange(event) {     
  this.setState({
      campSeguradoraId: event.target.value
  });    
}
engateChange(e) {
  this.setState({ campEngate: e.target.checked })
}
cadeirinhapequenaChange(e) {
  this.setState({ campCadeirinhaPequena: e.target.checked })
}
cadeirinhagrandeChange(e) {
  this.setState({ campCadeirinhaGrande: e.target.checked })
}
cadeirarodasChange(e) {
  this.setState({ campCadeiraRodas: e.target.checked })
}

  busca_motorista() {
    const { validate } = this.state   
    console.log(`/motorista/get/${localStorage.getItem('logeditid')}`);
    api.get(`/motorista/get/${localStorage.getItem('logeditid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,
            campData_nascimento: dateFormat(res.data.data[0].data_nascimento, "UTC:dd/mm/yyyy"),            
            campEmail: res.data.data[0].email,      
            camp_foto_url: res.data.data[0].foto_url,
            camp_foto_CNH_url: res.data.data[0].foto_CNH_url, 
            campTelefone1: res.data.data[0].celular,
            campCnpj: res.data.data[0].cnpj,   
            campStatusId: res.data.data[0].statusId,
            campCNH: res.data.data[0].numero_carteira,   
            campData_CNH: dateFormat(res.data.data[0].data_validade, "UTC:dd/mm/yyyy"),   
            campMotorista_bilingue: res.data.data[0].bilingue,   
            campCidade: res.data.data[0].cidade,
            campComplemento: res.data.data[0].complemento,
            campNumero: res.data.data[0].numero,
            campBairro: res.data.data[0].bairro,
            campEstado: res.data.data[0].estadoId,
            campEstadoId: res.data.data[0].estadoId,
            campEndereco: res.data.data[0].endereco,          
            campCep: res.data.data[0].cep,     
            incluir: false, 
            inicio: 2,
            validacao_cpf: true,
            validacao_nome: true,
            validacao_datanascimento: true,
            validacao_email: true,
            validacao_telefone: true,
            validacao_numero: true,
            validacao_cep: true,
            validacao_complemento: true,
          })                           

          if (this.state.campEstadoId !== 0) {
            this.carrega_estado()
          }
  
         // this.carrega_veiculos();

          this.setState({ validate })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão motorista "+error)
      })       
  
  }

   loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <option key={data.descricao} value={data.id}>{data.descricao} </option>
      )
    })     
  
   }

   loadVeiculos(){
  
    return this.state.listaVeiculos.map((data)=>{          
      return(
        <option key={data.modelo} value={data.id}> {data.modelo} </option>
      )
    })     
  
   }

   statusChange(e) {
    this.setState({ campStatusId: e.target.value })
  } 
 
 
   carrega_status(){ 
   
    api.get('/status/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaStatus:data})
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

   carrega_veiculos(){ 
   
    api.get(`/veiculo/lista_veiculos/${localStorage.getItem('logeditid')}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaVeiculos:data})
      }  
      
      this.seleciona_carro();
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  loadMotorista(){
   // const url = baseUrl+"/motorista/list"
   api.get('/motorista/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listMotorista:data})
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }

  loadMotoristaConvite(){
    // const url = baseUrl+"/motorista/list"
    api.get('/emailOperador/listMotorista')
     .then(res=>{
       if (res.data.success) {
         const data = res.data.data
         this.setState({listMotoristaConvite:data})
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }

  loadMotoristaExcluidos(){
    // const url = baseUrl+"/motorista/list"
    api.get('/motorista/listExcluidos')
     .then(res=>{
       if (res.data.success) {
         const data = res.data.data
         this.setState({listMotoristaExcluidos:data})
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }

   loadMotoristaCadIncompletos(){
    // const url = baseUrl+"/motorista/list"
    api.get('/motorista/listarIncompletos')
     .then(res=>{
       if (res.data.success) {
         const data = res.data.data
         this.setState({
           listMotoristaCadIncompletos:data,
           loading: false,
          })
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }
 
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }

  handleOpenModal(data) {
    this.setState({ 
      showModal: true,            
      mensagem_aguarde: '',
    });    
    localStorage.setItem('logeditid', data.id);     
    //console.log('buscar_cliente ');
    this.busca_motorista();   
    this.carrega_veiculos();     
    
    //localStorage.setItem('logVeiculo', this.state.listaVeiculos[0].id);
    //this.carrega_motorista_veiculo();      
    
    if (localStorage.getItem('logperfil') == 1) {
      this.setState({ 
        camp_cpf_disabled: true,
        camp_nome_disabled: true,
        camp_datanasc_disabled: false,
        camp_email_disabled: true,
        camp_telefone_disabled: false,
        disabled_seguradora: true,
        disabled_ano: true,
        disabled_anodut: false,
        disabled_apolice: true,
        disabled_cor: true,
        disabled_marca: true,
        disabled_modelo: false,
        disabled_placa: true,  
        disabled_cadeira_g: false,
        disabled_cadeira_p: false,
        disabled_cadeira_rodas: false,
        disabled_engate: false,
      });
    }

   // this.prepareSave();
  }  
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,  
      campStatusId: 0,  
    });
    localStorage.setItem('logeditid', '');
    
    this.loadMotoristaExcluidos();
    this.loadMotorista();     
  //  this.carrega_status();  
    
  }

  mostrar_endereco() {

    if (this.state.campEndereco !== "") {
    return (    
       <div> 
          <div className="titulo_modal_editar">Endereço</div>             
          <div className="descricao_modal_endereço">
            {this.state.campEndereco} <br/>
            {this.state.campBairro+' , '+this.state.campCidade+' / '+this.state.estado_selecionado} 
          </div> 
      </div>            
    );
  
    } else {
      return (
        ""
      );
    }
  }

  sendSave(){        

    this.setState({ 
      validacao_cpf: false,
      validacao_datanascimento: false,
      mensagem_aguarde: 'Aguarde, salvando os dados...',            
    }); 
 
    const datapost = {
      nome: this.state.campNome,              
      email: this.state.campEmail,
      celular: this.state.campTelefone1,    
      data_nascimento: moment(this.state.campData_nascimento, "DD MM YYYY"),         
      cpf: this.state.campCpf,
      data_validade: moment(this.state.campData_CNH, "DD MM YYYY"), 
      numero_carteira: this.state.campCNH,    
      bilingue: this.state.campMotorista_bilingue,   
      perfilId: 3,
      statusId: this.state.campStatusId,
      situacaoId: 1
    }             
     
       console.log('Alterar - '+JSON.stringify(datapost, null, "    ")); 
        api.put(`/motorista/update/${localStorage.getItem('logeditid')}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
            
            this.buscaMarca(this.state.campCarroId);
           // this.load_modelo_banco(this.state.campCarroId);
          //  this.buscaModelo(this.state.campModeloId);

           api.get(`/modelo/getModelo/${this.state.campModeloId}`)
           .then((modelo)=>{     

              const veiculoupdate = {
                marcaId: this.state.campCarroId, 
                modeloId: this.state.campModeloId,
                marca: localStorage.getItem('logMarca'), 
                modelo: modelo.data.data[0].name,
                seguradoraId: this.state.campSeguradoraId,
                apolice: this.state.campApolice,
                placa: this.state.campPlaca,
                ano: this.state.campAno,
                anodut: this.state.campAnodut,
                cor: this.state.campCor
              }        

              console.log('veiculo - '+JSON.stringify(veiculoupdate, null, "    ")); 
              api.put(`/veiculo/update/${localStorage.getItem('logVeiculo')}`, veiculoupdate)
              .then(response=>{
                if (response.data.success==true) {                  

                        const logindata = {  
                          email: this.state.campEmail,  
                          perfilId: 3,
                          statusId: this.state.campStatusId
                        }
              
                        api.put(`/login/update/${localStorage.getItem('logeditid')}`,logindata);  
                        localStorage.setItem('lognome', this.state.campNome);           

                        this.setState({                                                     
                          mensagem_usuario: 'Motorista alterado com sucesso!',          
                        });  
              
              
                        this.envia_mensagemClick();    
                       // this.handleCloseModal();

                      }         
               }).catch(error=>{
                  alert("Error 34 ")
               })

              }).catch(error=>{
                alert("Error 34 ")
             })

          }
          else {
            console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
            alert("Error na Criação verificar log")              
          }
        }).catch(error=>{
          alert("Error 34 ")
        })
  
  }  
 
  verifica_botao(inicio) {
    const { validate } = this.state    
    if (inicio == 1) {
      return (
       <div>                  
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal_scroll" p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
          </Box>           
      </div>     
      );   
    } else {
    if (this.state.validacao_cep == true && this.state.validacao_cpf == true && this.state.validacao_nome == true
        && this.state.validacao_datanascimento == true) {
          return (    
            <div>                                          
                  <Box  bgcolor="error.main" color="error.contrastText" className="botoes_habilitados_modal_scroll"  p={2} onClick={()=>this.sendSave()}>
                    <div className="d-flex justify-content-center">
                          <label> Salvar Alterações </label>                          
                    </div>                    
                  </Box>                                                  
            </div>       
          );
        } else {
          return (
            <div>              
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal_scroll" p={2}>
                    <div className="d-flex justify-content-center">
                      <label> Salvar Alterações </label>
                    </div>     
              </Box>           
            </div>
        );   
        }   
      }      
  
   
  } 

  seleciona_carro() {
    console.log('lista veiculo - '+this.state.listaVeiculos.length);
     if (this.state.listaVeiculos.length > 0) {
     //   console.log('Lista'+JSON.stringify(this.state.listaVeiculos[0].id, null, "    ")); 
        localStorage.setItem('logVeiculo', this.state.listaVeiculos[0].id);
        this.carrega_motorista_veiculo();
     }
  }

  sendteste(){        


    this.setState({   
        mensagem_usuario: 'Mensagem Enviada com sucesso'
    });          

    this.envia_mensagemInclusaoClick();      

   } 

   enviar_botao_modal(inicio) {
    const { validate } = this.state 
     // console.log(JSON.stringify(this.state, null, "    "));
     // console.log(JSON.stringify(inicio, null, "    "));

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
        
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendEnvioEmail()}>
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

sendEnvioEmail(){        
  const { validate } = this.state;       
  validate.cpfState= '';
  this.setState({ 
    validacao_cpf:false,
    validacao_email:false,
     mensagem_aguarde: 'Aguarde, enviando o convite...',       
     validate 
  }); 
  
  const email_envio = this.state.campEmail;

      const operadordata = {  
        email: this.state.campEmail,    
        empresaId: '',     
        statusId: 8,
        perfilId: 3
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
                url: `http://www.oser.app.br:21497/motorista_incluir_convite/${res.data.data.email}`,     
                texto: `Sr(a), Motorista(a) \n Seu link de acesso ao sistema è `, 
              }      
            // console.log(' resultado - '+JSON.stringify(params_email, null, "    "));    
                
              api.post("/email/send", params_email);                        
             

             this.setState({                          
                mensagem_usuario: 'Mensagem Enviada com sucesso',                      
             }); 
            
             
             this.enviar_botao_modal(1);         

             this.envia_mensagemInclusaoClick();     

             // this.handleCloseModalInclusao();
     
            }       
          })        
          .catch(error=>{
            alert("Erro de conexão "+error)
          })        

        }
      
      })        
      .catch(error=>{
        alert("Erro de conexão "+error)
      })        
 
}

/*
abre_foto(foto) {
  const a = document.createElement("a");
  const myURL = URL.createObjectURL(foto);
  a.href = myURL;
  a.click();
}
*/

opcao_tabChange = (event, newValue) => {   
  this.setState({        
      value: newValue 
  });    
};

  render()
  {
    return (
      <div>    
       <div>
          <Menu_administrador />  
          <div className="container-fluid titulo_lista margem_left">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo"> Motorista </div>                     
              </div>      
            </div>

       </div>       
       <div className="container-fluid margem_left">                
        <br/>      

        <TabContext value={this.state.value} className="tabs_padrao">
            <AppBar position="static" color="transparent">
              <TabList onChange={this.opcao_tabChange} aria-label="simple tabs example">           
                <Tab label="Ativos" value="1" className="tabs_titulo_lista"/>
                <Tab label="Excluidos" value="2" className="tabs_titulo_lista_2"/>            
                <Tab label="Cadastro Incompleto" value="3" className="tabs_titulo_lista_2"/>            
                <Tab label="Convites" value="4" className="tabs_titulo_lista_2"/>            
              </TabList>
            </AppBar>        
          <TabPanel value="1" className="tirar_espaco">               
          <div>
                        <MaterialTable          
                            title=""
                            isLoading={this.state.loading}
                            style={{
                              border: "0px solid gray",
                              maxWidth: "94vw",
                              overflowY: "hidden",
                              overflowX: "hidden",
                              marginTop: "0px",
                              marginLeft: "0px",
                            }}
                            columns={[
                              { title: '', field: '#', width: "50px", minWidth: '50px', maxWidth: '50px' },
                              { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px' },
                              { title: 'CPF', field: 'cpf', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => rowData.cpf}, 
                              { title: 'Nome', field: 'nome', width: '313px', minWidth: '313px', maxWidth: '313px', render: rowData => rowData.nome.substr(0,35)},                             
                              { title: 'Email', field: 'email', width: '260px', minWidth: '260px',  maxWidth: '260px', render: rowData => rowData.email.substr(0,35) }, 
                              { title: 'Telefone', field: 'celular', width: '100px', minWidth: '100px', maxWidth: '100px', fontSize: 5 },  
                              { title: '', field: 'bilingue', width: '100px', minWidth: '100px', maxWidth: '100px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.bilingue == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px'}}>Bilingue</div> : "" },                               
                              { title: '', field: '', align: 'left', width: '150px', lookup: { 1: 'sadas', 2: 'asdas' }, },              
                            ]}
                            data={this.state.listMotorista}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                              },
                              toolbar: {
                                searchTooltip: 'Pesquisar',
                                searchPlaceholder: 'Buscar motorista',        
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
                              exportFileName: 'Rel_adm_motorista_ativos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,          
                              maxBodyHeight: 450,
                              minBodyHeight: 450, 
                              padding: 'dense',   
                              overflowY: 'scroll',
                             // tableLayout: 'fixed',
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 7,
                             // pageSize: 9,
                              pageSizeOptions: [0],      
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                              /*,
                              {
                                icon: 'add',                                                             
                                tooltip: 'Adiciona Motorista',
                                isFreeAction: true,
                                onClick: (event) => this.handleOpenModalEnvio()
                               //onClick: (event) => this.sendteste()
                              } */
                            ]}
                          />      
                </div>      
          </TabPanel>       
          <TabPanel value="2" className="tirar_espaco">               
          <div style={{ maxWidth: '100%' }}>
                        <MaterialTable          
                            title=""
                            style={ {width: "96%"}}                                    
                            columns={[
                              { title: '', field: '#', width: "50px", minWidth: '50px', maxWidth: '50px' },
                              { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px' },
                              { title: 'CPF', field: 'cpf', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => rowData.cpf}, 
                              { title: 'Nome', field: 'nome', width: '313px', minWidth: '313px', maxWidth: '313px', render: rowData => rowData.nome.substr(0,35)},                             
                              { title: 'Email', field: 'email', width: '260px', minWidth: '260px',  maxWidth: '260px', render: rowData => rowData.email.substr(0,35) }, 
                              { title: 'Telefone', field: 'celular', width: '100px', minWidth: '100px', maxWidth: '100px' },                                                                                                                 
                              { title: '', field: '', align: 'left', width: '150px', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                            ]}
                            data={this.state.listMotoristaExcluidos}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                              },
                              toolbar: {
                                searchTooltip: 'Pesquisar',
                                searchPlaceholder: 'Buscar motorista',         
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
                              exportFileName: 'Rel_adm_motorista_excluidos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,                           
                              padding: 'dense',   
                              overflowY: 'scroll',
                            //  tableLayout: 'fixed',
                            maxBodyHeight: 450,
                            minBodyHeight: 450, 
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 6,
                             // pageSize: 9,
                              pageSizeOptions: [0],      
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              },
                              {
                                icon: 'delete',                                                             
                                tooltip: 'Deleta Motorista',          
                                onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                              }
                            ]}
                          />      
                </div>      
          </TabPanel>       
          <TabPanel value="3" className="tirar_espaco">    
          <div style={{ maxWidth: '100%'}}>
                        <MaterialTable          
                            title=""
                            style={ {width: "96%"}}                                     
                            columns={[
                              { title: '', field: '#', width: "50px", minWidth: '50px', maxWidth: '50px' },
                              { title: 'Status', field: 'status.descricao', width: '165px', minWidth: '165px', maxWidth: '165px' },
                              { title: 'CPF', field: 'cpf', width: '100px', minWidth: '100px', maxWidth: '100px', render: rowData => rowData.cpf}, 
                              { title: 'Nome', field: 'nome', width: '313px', minWidth: '313px', maxWidth: '313px', render: rowData => rowData.nome.substr(0,35)},                             
                              { title: 'Email', field: 'email', width: '260px', minWidth: '260px',  maxWidth: '260px', render: rowData => rowData.email.substr(0,35) }, 
                              { title: 'Telefone', field: 'celular', width: '100px', minWidth: '100px', maxWidth: '100px' },                                                                                                                 
                              { title: '', field: '', align: 'left', width: '150px', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                            ]}
                            data={this.state.listMotoristaCadIncompletos}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                              },
                              toolbar: {
                                searchTooltip: 'Pesquisar',
                                searchPlaceholder: 'Buscar motorista',         
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
                              exportFileName: 'Rel_adm_motorista_excluidos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,
                              maxBodyHeight: 450,
                              minBodyHeight: 450, 
                              padding: 'dense',   
                              overflowY: 'scroll',
                          //    tableLayout: 'fixed',                            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 6,
                             // pageSize: 9,
                              pageSizeOptions: [0],      
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              },
                              {             
                                icon: 'mail',
                                tooltip: 'Enviar',
                                onClick: (evt, data) => this.onEnvioSenhaEmail(data)
                              },
                              {
                                icon: 'delete',                                                             
                                tooltip: 'Deleta Motorista',          
                                onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                              }
                            ]}
                          />      
                </div>      
          </TabPanel>            
          <TabPanel value="4" className="tirar_espaco">    
          <div style={{ maxWidth: '100%'}}>
                    <MaterialTable          
                        title=""
                        style={ {width: "96%"}}                                  
                        columns={[
                          { title: '', field: '#', width: "50px", minWidth: '50px', maxWidth: '50px' },
                          { title: 'Status', field: 'status.descricao', width: '200px' },               
                          { title: 'Email', field: 'email', width: '420px' },                                           
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                        ]}
                        data={this.state.listMotoristaConvite}   
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
                            searchPlaceholder: 'buscar operador',        
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
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportFileName: 'Relatorio_motorista_convites',
                              search: true,     
                              exportAllData: true,                              
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',  
                              //resizable: false,
                              paging: false,          
                              maxBodyHeight: 450,
                              minBodyHeight: 450, 
                              padding: 'dense',   
                              overflowY: 'scroll',
                              //tableLayout: 'fixed',     
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 4,
                              //pageSize: 7,
                              pageSizeOptions: [0],       
                        }}
                        actions={[
                          {             
                            icon: 'mail',
                            tooltip: 'Enviar',
                            onClick: (evt, data) => this.onEnvioEmail(data)
                          },
                          {
                            icon: 'delete',                                                             
                            tooltip: 'Deleta Convite',          
                            onClick: (evt, data) => this.handleOpenModalConviteDelete(data)                                     
                          }
                        ]}
                       /* editable={{                          
                          onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                //const dataDelete = [...oldData.id];
                                const index = oldData.id;   
                              //  dataDelete.splice(index, 1);                              
                                resolve()                                
                                this.sendDelete(index)
                              }, 1000)
                            }),
                        }}*/
                      />                              
            </div>      
          </TabPanel>              
        </TabContext>          
           <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize',  outline: 'none'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalEnvio()}>
                            <AddIcon/> <div className="botao_incluir"> Adicionar Motorista  </div>
                        </Fab>
                      </div>  
        <ReactModal 
            isOpen={this.state.showModal}
            style={customStyles}
            contentLabel="Inline Styles Modal Example"                                  
            ><div className="editar_titulo">  Editar Motorista 
                <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()} className="botao_close_modal">
                  <CloseOutlinedIcon />
                </IconButton></div>                           

          <div className="container_alterado">
            <div className="d-flex justify-content">        
             <div>     
                <div class="d-flex flex-column espacamento_caixa_modal">
                  <div class="p-2">  
                    <div class="d-flex justify-content-start">
                        <div>
                            <Avatar alt={localStorage.getItem('lognome')} 
                          src={this.state.camp_foto_url} variant="circle" className="avatar_tamanho"/>            
                        </div>  

                        <div>
                           <FormControl variant="outlined">
                              <InputLabel className="label_cpf_modal_motorista" htmlFor="filled-adornment-password">CPF</InputLabel>
                              <OutlinedInput 
                                  className="text_cpf_modal_motorista"         
                                  autoComplete="off"                                   
                                  type="text"                       
                                  error={this.state.erro_cpf}
                                  helperText={this.state.mensagem_cpf}                     
                                  id="cep_incluir"                      
                                  variant="outlined"
                                  value={this.state.campCpf}                                  
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_cpf? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={50}
                              />  
                           </FormControl>   
                           <br/>
                           <FormControl variant="outlined">
                              <InputLabel className="label_text_motorista" htmlFor="filled-adornment-password">Nome</InputLabel>
                              <OutlinedInput
                                  autoComplete="off"
                                  type="text"                       
                                  error={this.state.erro_nome}
                                  helperText={this.state.mensagem_cpf}
                                  className="nome_modal_motorista"                       
                                  id="nome_incluir"                   
                                  variant="outlined"
                                  value={this.state.campNome}                            
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_nome? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={50}
                              />                         
                        </FormControl>                           
                            <br/>
                            <FormControl variant="outlined" className="buscar_status_modal">
                              <InputLabel className="label_modal_motorista" id="demo-simple-select-outlined-label">Status </InputLabel>
                              <Select                                                 
                                autoComplete="off"                     
                                className="data_modal_motorista"                                                
                                labelId="demo-simple-select-outlined-label"
                                id="busca"
                                value={this.state.campStatusId}                                    
                                onChange={ (e) => {
                                  this.statusChange(e)
                                }}                  
                                labelWidth={60}          
                              >                                            
                                {this.loadStatus()}                    
                                </Select>
                            </FormControl>        
                        </div>  
                    </div>
                  </div>
                  <div class="p-2">                                
              <div class="d-flex justify-content-start">
                  <div>
                  <FormControl variant="outlined">
                    <InputLabel  className="label_veiculo_motorista" htmlFor="filled-adornment-password">Número da CNH</InputLabel>
                     <OutlinedInput 
                         className="text_veiculo_motorista"        
                        autoComplete="off"                                   
                        type="text"                       
                        error={this.state.erro_numero_carteira}
                        helperText={this.state.mensagem_numero_carteira}                     
                        id="cep_incluir"                      
                        variant="outlined"
                        value={this.state.campCNH}
                        onBlur={this.verificaCnhonblur}
                        onKeyUp={this.verificaCnh}
                      // onFocus={this.verificaCpf}
                        onChange={ (e) => {
                          this.Cnhchange(e)                       
                          this.validaCnhChange(e)
                        }}       
                        inputProps={{
                          maxLength: 12,
                        }}                                                   
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_numero_carteira? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                     
                      labelWidth={140}
                    />                
                   <FormHelperText error={this.state.erro_numero_carteira}>
                         {this.state.mensagem_numero_carteira}
                   </FormHelperText>
                  </FormControl>                     
                  </div>
                  <div>
                  <FormControl variant="outlined">
                    <InputLabel className="label_motorista_dividido_esquerdo" htmlFor="filled-adornment-password">Data de validade</InputLabel>
                     <OutlinedInput    
                        autoComplete="off"                     
                        error={this.state.erro_dataCNH}
                        helperText={this.state.mensagem_datavalidade}
                        className="text_motorista_dividido_esquerdo"                       
                        id="data_incluir"                   
                        variant="outlined"
                        value={this.state.campData_CNH}
                        onBlur={this.verificaDataValidade}
                        onChange={ (e) => {
                          this.Data_validadeChange(e)                       
                          this.validaDataValidadeChange(e)
                        }}                                        
                        inputProps={{
                          maxLength: 10,
                        }}
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_dataCNH? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={140}                      
                    />
                   <FormHelperText error={this.state.erro_dataCNH}>
                         {this.state.mensagem_datavalidade}
                   </FormHelperText>
                </FormControl>  
                  </div>
                </div>      
              </div>
                  <div class="p-2">
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                          <InputLabel className="label_email_motorista" htmlFor="filled-adornment-password">Email</InputLabel>
                          <OutlinedInput    
                              autoComplete="off"      
                              readOnly={this.state.camp_email_disabled}                                   
                              type="email"
                              error={this.state.erro_email}
                              helperText={this.state.mensagem_email}
                              className="text_email_modal"                       
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
                    <div class="d-flex justify-content-start">
                        <div>
                        <FormControl variant="outlined" className="posicao_caixa_texto">
                            <InputLabel className="label_telefone_motorista" htmlFor="filled-adornment-password">Telefone</InputLabel>
                            <OutlinedInput   
                                autoComplete="off"           
                                readOnly={this.state.camp_telefone_disabled}            
                                error={this.state.erro_telefone}
                                helperText={this.state.mensagem_telefone1}
                                className="text_telefone_2_modal"                       
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

                         <div>
                         <FormControl variant="outlined" className="posicao_caixa_texto">
                            <InputLabel className="label_data_nascimento_motorista" htmlFor="filled-adornment-password">Data de Nascimento</InputLabel>
                            <OutlinedInput      
                                autoComplete="off"                    
                                readOnly={this.state.camp_datanasc_disabled}                     
                                error={this.state.erro_datanascimento}
                                helperText={this.state.mensagem_data_nascimento}
                                className="text_data_nascimento_2_modal"                       
                                id="outlined-basic"                   
                                variant="outlined"
                                value={this.state.campData_nascimento}
                                onBlur={this.verificaDataNascimento}
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
                              labelWidth={140}                      
                            />
                          <FormHelperText error={this.state.erro_datanascimento}>
                                {this.state.mensagem_data_nascimento}
                          </FormHelperText>
                        </FormControl>  
                         </div> 
                         <div>
                         <FormControl component="fieldset">
                            <FormGroup aria-label="position" row>
                              <FormControlLabel
                                readOnly='true'
                                className="bilingue_texto"
                                value={this.state.campMotorista_bilingue}
                                control={<Switch color="primary" checked={this.state.campMotorista_bilingue} 
                                //onChange={this.handleChange}
                                />}
                                label="Bilingue?"
                                labelPlacement="start"
                              />                       
                            </FormGroup>
                          </FormControl>      
                         </div>
                    </div>
                  </div>
                  <div class="p-2">  
                   <div className="sub_titulo_modal_editor"> Endereço </div>                
                   </div>             
              
              <div class="p-2">
                <div class="d-flex justify-content-start">
                  <div>      
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                          <InputLabel className="label_cep_motorista" htmlFor="filled-adornment-password">Cep</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_cep}
                              helperText={this.state.mensagem_cep}
                              className="text_cep_modal"                       
                              id="cep_incluir"                      
                              variant="outlined"
                              value={this.state.campCep}
                              onblur={this.verificaCep}
                              onKeyUp={this.verificaCep}   
                              onChange={ (e) => {
                                this.cepchange(e)                       
                                this.validaCepChange(e)
                              }}                         
                              inputProps={{
                                maxLength: 9,
                              }}
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_cep? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={50}
                          />
                          <div className="naoseiocep_modal">
                              <a className="alink" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei meu CEP</a> 
                          </div> 
                        <FormHelperText error={this.state.erro_cep}>
                              {this.state.mensagem_cep}
                        </FormHelperText>
                        </FormControl>         
                     </div>
                        <div>
                           {this.mostrar_endereco()}       
                        </div>
                   </div>                     
                </div>
                <div class="p-2">
                  <div class="d-flex justify-content-start">
                    <div>
                    <FormControl variant="outlined" className="posicao_caixa_texto">
                        <InputLabel className="label_numero_motorista" htmlFor="filled-adornment-password">Número</InputLabel>
                        <OutlinedInput   
                            autoComplete="off"           
                            error={this.state.erro_numero}
                            helperText={this.state.mensagem_numero}
                            className="text_numero_modal"                                    
                            id="numero_incluir"                      
                            variant="outlined"
                            value={this.state.campNumero}
                            onblur={this.verificaNumero}
                            onKeyUp={this.verificaNumero}
                            onChange={ (e) => {
                              this.numerochange(e)                       
                              this.validaNumeroChange(e)
                            }}           
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_numero? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={80}                      
                        />
                        <FormHelperText error={this.state.erro_numero}>
                                {this.state.mensagem_numero}
                          </FormHelperText>
                    </FormControl>                           
                    </div>
                    <div> 
                    <FormControl variant="outlined">
                        <InputLabel className="label_complemento_text_motorista" htmlFor="filled-adornment-password">Complemento</InputLabel>
                        <OutlinedInput 
                            autoComplete="off"                                   
                            type="text"                       
                            error={this.state.erro_complemento}
                            helperText={this.state.mensagem_complemento}                                    
                            id="complemento_incluir"   
                            className="text_complemento_modal"                                 
                            variant="outlined"
                            value={this.state.campComplemento}
                            onblur={this.verificaComplemento}
                            onKeyUp={this.verificaComplemento}
                            onChange={ (e) => {
                              this.complementochange(e)                       
                              this.validaComplementoChange(e)
                            }}                                  
                            maxlength="9"     
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_complemento? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={110}
                        />                        
                      <FormHelperText error={this.state.erro_complemento}>
                            {this.state.mensagem_complemento}
                      </FormHelperText>
                      </FormControl>    
                    </div>
                  </div> 
                </div>                  
                <div class="p-2">  
                   <div className="sub_titulo_modal_editor"> Detalhes do Veículos </div>                
                </div>                 
                <div class="p-2">               
                        <div class="d-flex justify-content-start">
                            <div> 
                                <div class="p-2">  
                    <FormControl disabled={this.state.disabled_modelo} variant="outlined">
                        <InputLabel className="label_veiculo_motorista" id="demo-simple-select-outlined-label">Modelo </InputLabel>
                                  <Select                                                 
                                    autoComplete="off"                     
                                    className="text_veiculo_motorista"                                                
                                    labelId="demo-simple-select-outlined-label"
                                    id="busca"
                                    value={this.state.campVeiculoId}                                                                    
                                    //onFocus={this.seleciona_carro()}
                                    onChange={ (e) => {
                                      this.veiculoChange(e)
                                    }}                  
                                    labelWidth={60}          
                                  >                                            
                                    {this.loadVeiculos()}                    
                                    </Select>
                                </FormControl>                     
                              </div>
                            </div>                        
                            <div>   
                              <FormControl disabled={this.state.disabled_marca} variant="outlined">
                                  <InputLabel className="label_marca_autocomplete_motorista" id="demo-simple-select-outlined-label">Marca </InputLabel>
                                  <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_marca_autocomplete_motorista"                               
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campCarro}                                                                    
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={50}
                                />
                              </FormControl>                                                                                                                                       
                            </div>                        
                        </div>
                    </div> 
                    <div class="p-2">   
                        <div className="d-flex justify-content-start">
                            <div>
                            <FormControl disabled={this.state.disabled_placa} variant="outlined">
                                <InputLabel className="label_placa_text_motorista" htmlFor="filled-adornment-password">Placa</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_placa_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campPlaca}
                                    onBlur={this.verificaPlaca}                    
                                    onChange={ (e) => {
                                      this.placaChange(e)                                                           
                                    }}                         
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={50}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>                      
                            </div> 
                            
                            <div>
                            <FormControl disabled={this.state.disabled_ano} variant="outlined">
                                <InputLabel className="label_ano_text_motorista" htmlFor="filled-adornment-password">Ano</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_ano_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campAno}                        
                                    onBlur={this.verificaAno}
                                    onChange={ (e) => {
                                      this.anoChange(e)                                                          
                                    }}                         
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={30}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>                             
                            </div>                        
                        </div>
                    </div> 
                    <div class="p-2">    
                      <div class="d-flex justify-content-start">
                            <div>
                            <FormControl disabled={this.state.disabled_cor} variant="outlined">
                                <InputLabel className="label_cor_text_motorista" htmlFor="filled-adornment-password">Cor</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_cor_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campCor}                            
                                    onBlur={this.verificaCor}
                                    onChange={ (e) => {
                                      this.corChange(e)                                                            
                                    }}                          
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={30}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>                          
                            </div>
                            <div>
                            <FormControl disabled={this.state.disabled_anodut} variant="outlined">
                                <InputLabel className="label_anodut_text_motorista" htmlFor="filled-adornment-password">Ano do DUT</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_anodut_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campAnodut}                        
                                    onBlur={this.verificaAnoDUT}
                                    onChange={ (e) => {
                                      this.anoDUTChange(e)                                                           
                                    }}                        
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>                           
                            </div>                                                       
                      </div>    
                  </div>      
                  <div class="p-2">   
                  <div class="d-flex justify-content-start">
                            <div>  
                          <FormControl disabled={this.state.disabled_seguradora} variant="outlined">
                                          <InputLabel className="label_seguradora_modal_motorista" id="demo-simple-select-outlined-label">Seguradora </InputLabel>
                                          <OutlinedInput                                           
                                            autoComplete="off"                                   
                                            type="text"                       
                                            error={this.state.erro_cep}
                                            helperText={this.state.mensagem_cep}
                                            className="text_seguradora_modal_motorista"                                  
                                            id="cep_incluir"                      
                                            variant="outlined"
                                            value={this.state.campSeguradoraNome}                                                                    
                                          endAdornment={
                                            <InputAdornment position="end">
                                                {this.state.validacao_cep? <CheckIcon />: ''}
                                            </InputAdornment>
                                          }
                                          labelWidth={100}
                                        />
                                      </FormControl>                                                      
                         </div>
                         <div>
                         <FormControl disabled={this.state.disabled_apolice} variant="outlined">
                                <InputLabel className="label_apolice_modal_motorista" htmlFor="filled-adornment-password">Número Apólice</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cep}
                                    helperText={this.state.mensagem_cep}
                                    className="text_apolice_mopdal_motorista"                
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campApolice}                           
                                    onBlur={this.verificaApolice}
                                    onChange={ (e) => {
                                      this.apoliceChange(e)                                                            
                                    }}                   
                                    maxlength="9"     
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cep? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={130}
                                />                  
                                <FormHelperText error={this.state.erro_cep}>
                                      {this.state.mensagem_cep}
                                </FormHelperText>
                              </FormControl>    
                         </div>
                  </div>                    
                  </div> 
                  <div class="p-2 espacamento_div">    
                  <div class="d-flex justify-content-start">
                            <div>  
                            <FormControl disabled={this.state.disabled_engate} component="fieldset">
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel                                    
                                    className="checkbox_direito_operador"
                                    value={this.state.campEngate}
                                    control={<Switch color="primary" checked={this.state.campEngate} 
                                          onChange={this.engateChange}/>}
                                          label="Engate"
                                          labelPlacement="end"                           
                                  />   
                                </FormGroup>               
                              </FormControl>  
                            </div>
                            <div>
                            <FormControl disabled={this.state.disabled_cadeira_p} component="fieldset">
                            <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    className="checkbox_esquerda_operador"
                                    value={this.state.campCadeirinhaPequena}
                                    control={<Switch color="primary" checked={this.state.campCadeirinhaPequena} 
                                          onChange={this.cadeirinhapequenaChange}/>}
                                          label="Cadeirinha até 2 anos"
                                          labelPlacement="end"                           
                                  />   
                                </FormGroup>               
                              </FormControl> 
                            </div>
                    </div>   

                  </div>  
                  <div class="p-2 espacamento_div">    
                      <div class="d-flex justify-content-start">
                            <div>  
                            <FormControl disabled={this.state.disabled_cadeira_rodas} component="fieldset">
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    className="checkbox_direito_operador"
                                    value={this.state.campCadeiraRodas}
                                    control={<Switch color="primary" checked={this.state.campCadeiraRodas} 
                                          onChange={this.cadeirarodasChange}/>}
                                          label="Cadeira de Rodas"
                                          labelPlacement="end"                           
                                  />   
                                </FormGroup>               
                              </FormControl> 
                            </div>         
                            <div>  
                            <FormControl disabled={this.state.disabled_cadeira_g} component="fieldset">
                                <FormGroup aria-label="position" row>
                                  <FormControlLabel
                                    className="checkbox_esquerda_operador"
                                    value={this.state.campCadeirinhaGrande}
                                    control={<Switch color="primary" checked={this.state.campCadeirinhaGrande} 
                                          onChange={this.cadeirinhagrandeChange}/>}
                                          label="Cadeirinha maoir de 2 anos"
                                          labelPlacement="end"                           
                                  />   
                                </FormGroup>               
                                </FormControl>                       
                            </div>                       
              </div>   
                       
            </div>    

                <div class="p-2">  
                   <div className="sub_titulo_modal_editor"> Documentos </div>                
                </div>  
                <div class="p-2">  
                  <div class="d-flex justify-content-start">
                    <div>
                       <div className="titulo_motorista_modal">CNH</div>
                       <div className="sub_titulo_motorista_modal">Carteira Nacional de Habilitação</div>    
                       <br/>                          
                        <img src={this.state.camp_foto_CNH_url} variant="circle" 
                        className="foto_cnh_motorista" onClick={()=>this.handleOpenModalFoto(this.state.camp_foto_CNH_url)}  />                      
                    </div>
                    <div>
                    <div>
                       <div className="titulo_motorista_modal">CRLV</div>
                       <div className="sub_titulo_motorista_modal_crvl">Certificado de Registro e Licenciamento do Veículo</div>                                 
                      
                         <img src={this.state.camp_foto_CRVL_url} 
                            variant="circle" className="foto_cnh_motorista" onClick={()=>this.handleOpenModalFoto(this.state.camp_foto_CRVL_url)} />
                      
                    </div>
                       
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
        isOpen={this.state.showModalEnvio}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Envio Convites Motoristas
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalEnvio()} className="botao_close_modal_motorista">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                      <div class="p-2">  
                      <FormControl variant="outlined">
                          <InputLabel className="label_text" htmlFor="filled-adornment-password">Email</InputLabel>
                          <OutlinedInput    
                              autoComplete="off"                     
                              error={this.state.erro_email}
                              helperText={this.state.mensagem_email}
                              className="email_convite"                       
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
                        </div>                        
                        {this.enviar_botao_modal(this.state.inicio)}     
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
                          <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Motorista? </div>
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
                    className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDelete(this.state.campDeletarId, this.state.campDeletarEmail)}>
                    <div className="d-flex justify-content-center">
                    <label> Excluir </label>
                    </div>     
                  </Box>      

                  </div>
          </ReactModal>  

          <ReactModal 
              isOpen={this.state.showConviteDelete}
              style={ConfirmacaodelStyles}
              contentLabel="Inline Styles Modal Example"                                  
              ><div> 
                  <IconButton aria-label="editar" onClick={()=>this.handleCloseModalConviteDelete()} className="botao_close_modal_deletar">
                    <CloseOutlinedIcon />
                  </IconButton></div>       
                  <center><img src="/exclamation.png" /> </center>
                  <div className="container_alterado">              
                    
                  <div className="moldura_modal_delecao">
                          <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Convite? </div>
                    <div>Ao confirmar a exclusão o registro será apagado.  </div>
                  </div>     
                     <div className="retorno">{this.state.retorno}</div>
                  <Box 
                    className="botoes_delete_cancelar_modal" p={2} onClick={()=>this.handleCloseModalConviteDelete()}>
                    <div className="d-flex justify-content-center">
                    <label> Cancelar </label>
                    </div>     
                  </Box>      
                  <Box 
                    className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDeleteConvite(this.state.campDeletarId)}>
                    <div className="d-flex justify-content-center">
                    <label> Excluir </label>
                    </div>     
                  </Box>      

                  </div>
          </ReactModal>  

     <ReactModal 
        isOpen={this.state.showModalFoto}
        style={FotoStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Foto / Documentos
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalFoto()} className="botao_close_modal_foto_doc">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                      <div class="p-2">  
                             <img src={this.state.foto} variant="circle" className="foto_size_modal"/>
                       </div>
                    </div>        
                 </div>
              </div>
            </div>     
     </ReactModal>       
        <Snackbar 
        anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}       
        open={this.state.mensagem_alert} 
        autoHideDuration={2000} onClose={this.envia_mensagemInclusaoClose}>
        <Alert onClose={this.envia_mensagemInclusaoClose} severity="success">
               {this.state.mensagem_usuario}
        </Alert>
      </Snackbar>   

      <Snackbar 
        anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}       
        open={this.state.mensagem_alert_edicao} 
        autoHideDuration={2000} onClose={this.envia_mensagemClose}>
        <Alert onClose={this.envia_mensagemClose} severity="success">
               {this.state.mensagem_usuario}
        </Alert>
      </Snackbar>  

      <Snackbar 
        anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}       
        open={this.state.mensagem_alert_exclusao} 
        autoHideDuration={2000} onClose={this.envia_mensagemExclusaoClose}>
        <Alert onClose={this.envia_mensagemExclusaoClose} severity="error">
               {this.state.mensagem_usuario}
        </Alert>
      </Snackbar>   

      </div>   
    </div>  
    );
  }
  onIncluir() {
    this.props.history.push(`/motorista_incluir/0`);   
  }

  handleChange = (event) => {
    this.setState({ 
      campMotorista_bilingue: event.target.checked
    });
    
    //console.log(' checkedA - '+JSON.stringify(this.state.checkedA, null, "    "));   
  };

  handleOpenModalEnvio () {
    const { validate } = this.state 
    validate.emailState = '';
    this.setState({ 
      showModalEnvio: true,
      campEmail: '',
      campEmailAnterior: '', 
      erro_email: false,   
      validacao_email: false,
      validate   
    });  
     
    
  }
  
  handleCloseModalEnvio () {
    this.setState({ 
      showModalEnvio: false,
      mensagem_aguarde: '',
      incluir: false 
    });

    this.loadMotoristaConvite();
   
  }

  

  handleOpenModalFoto(data) { 
    this.setState({      
      showModalFoto: true,    
      foto: data,  
    });      
    
  }
  
  handleCloseModalFoto  () {
    this.setState({       
      showModalFoto: false,
      foto: ''
    });    
   
  }

  envia_mensagemInclusaoClick = () => {
    this.setState({ 
      mensagem_alert: true      
    });

  }    

  envia_mensagemInclusaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_alert: false      
    });    

    this.handleCloseModalEnvio();      
  };


  envia_mensagemClick = () => {
    this.setState({ 
      mensagem_alert_edicao: true      
    });

  }    

  handleOpenModalDelete(data) { 
    this.setState({ 
      showMensagemDelete: true,
      campDeletarId: data.id,    
      campDeletarEmail: data.email,      
      retorno: '',
      campDescricao: '',
      validacao_descricao: false,
    });  
    console.log('delete - '+JSON.stringify(data, null, "    ")); 
    
  }
  
  handleCloseModalDelete() {
    this.setState({ 
      showMensagemDelete: false
    });   


  }


  handleOpenModalConviteDelete(data) { 
    this.setState({ 
      showConviteDelete: true,
      campDeletarId: data.id,      
      retorno: '',
      campDescricao: '',
      validacao_descricao: false,
    });  
    
    
  }
  
  handleCloseModalConviteDelete() {
    this.setState({ 
      showConviteDelete: false
    });   


  }
  
  envia_mensagemClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_alert_edicao: false      
    });    

    this.loadMotorista();
    this.loadMotoristaExcluidos();
    this.loadMotoristaCadIncompletos();
    this.loadMotoristaConvite();
    this.handleCloseModal();      
  };

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
      mensagem_alert_exclusao: false,
      listMotorista: [],     
      listMotoristaCadIncompletos: [],
      listMotoristaConvite: [],
      listMotoristaExcluidos: [],
    });   

    this.loadMotorista();
    this.loadMotoristaExcluidos();
    this.loadMotoristaCadIncompletos();
    this.loadMotoristaConvite();  

  };

  
  onEnvioSenhaEmail(data) {
    const senhaAleatoria = Math.random().toString(36).slice(-8);
   
    const datapost = {
      logid: data.id, 
      perfilId: 3,
      senha: senhaAleatoria
    }        
   //console.log('cliente id - '+data.id);

   api.put(`/login/update/${data.id}`, datapost)

   const params_email = {    
     email: data.email,
     url: `http://www.oser.app.br:21497/motorista_incluir/${data.id}`,                      
     //url: `http://www.oser.app.br:21497/login`,        
     texto: `Sr(a) ${data.nome}, termine o seu cadastro acessando o link abaixo` // \n Sua senha provisória é: ${senhaAleatoria} `,      
   }      

   api.post("/email/send", params_email)    

   this.setState({   
     emailState: '',
     mensagem_usuario: 'Mensagem para o motorista enviada com sucesso!'
   });               

   this.envia_mensagemClick();          
}

 
  veiculoChange(e){    
    this.setState({ 
      campVeiculoId: e.target.value 
    })     
    
    console.log('veiculo - '+ e.target.value);
    localStorage.setItem('logVeiculo', e.target.value);
    this.carrega_motorista_veiculo();      
    
  }

  onEnvioEmail(data) {
    
    api.get(`/emailOperador/getemail/${data.email}`)
    .then(res1=>{   

      const params_email = {    
        email: data.email,                      
        url: `http://www.oser.app.br:21497/motorista_incluir_convite/${data.email}`,     
        texto: `Sr(a), Motorista(a) \n Seu link de acesso ao sistema è `, 
      }

      api.post("/email/send", params_email)    

      this.setState({   
        emailState: '',
        mensagem_usuario: 'Mensagem Enviada com sucesso'
      });               

      this.envia_mensagemInclusaoClick();         


    })
    .catch ( error => {
      alert("Error 325 ")
    })

}

  onDelete(data, id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(data, id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }


  sendDeleteConvite(id){
 
    api.delete(`/emailOperador/delete/${id}`)
    .then(response =>{
      if (response.data.success) {     

        this.setState({       
          mensagem_usuario: 'Convite motorista excluído com sucesso!'
         });

        this.loadMotorista();
        this.loadMotoristaConvite();
        this.loadMotoristaCadIncompletos();
        this.handleCloseModalConviteDelete();
        this.envia_mensagemExclusaoClick();

      }
    })
    .catch ( error => {
      alert("Error motorista convite ")
    })
  }



  sendDelete(id, email){
  

    api.delete(`/login/delete/${email}`)    
    
    api.delete(`/motorista/delete/${id}`)
    .then(response =>{
      if (response.data.success) {       

        this.setState({       
          mensagem_usuario: 'Motorista excluído com sucesso!'
         });  

         this.loadMotorista();
         this.loadMotoristaConvite();
         this.loadMotoristaCadIncompletos();
         this.loadMotoristaConvite();      
         this.handleCloseModalDelete();
         this.envia_mensagemExclusaoClick();

      }
    })
    .catch ( error => {
      alert("Error motorista delete ")
    })
  }

 /* sendDelete(data, userId){ 
        
    api.delete(`/login/delete/${data.email}`)    

    api.delete(`/veiculo/deleteMotorista/${userId}`)    

    api.delete(`/motorista/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
      
        this.loadMotorista()
        this.loadFillData()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }
*/
}

export default listComponent;
