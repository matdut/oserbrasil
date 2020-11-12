import React from 'react';
import Box from '@material-ui/core/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../../services/api';
import { Input } from 'reactstrap';
import MaterialTable from 'material-table';
import ReactModal from 'react-modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

//import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
//import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';
import Resizer from 'react-image-file-resizer';
import { Container, Content } from "../../style";

import filesize from "filesize";
/* import Upload from "../../UploadDocumentosModal"; */
//import FileList from "../../FilelistDocInclusao";
/* import FileList from "../../FilelistDocumentoModal"; */
import Upload from "../../UploadDocumentosModal";
import FileList from "../../FilelistDocumentoModal";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_motorista from '../menu_motorista';
import { Backdrop } from '@material-ui/core';
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  
const resizeFile = (file) => new Promise(resolve => {
  Resizer.imageFileResizer(file, 300, 300, 'JPEG', 100, 0,
  uri => {
    resolve(uri);
  },
  'base64'
  );
});

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

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',      
      color: 'light',
      campId: '',
      campCarroId: 0,
      camp_foto_CRVL_url: '',
      campCarro: '',
      campCarroNovo: '',
      campModeloId: 0,
      campModelo: '',
      campModeloNovo: '',
      campPlaca: "",
      campAnodut: '',
      campAno: "",
      campCor: "",
      foto: '',
      campNome: "",
      campApolice: "",
      campNomeSalvar: "",
      campSeguradoraNome: "",
      campDeletarId: '',
      campSeguradoraId: 0,
      campEngate: false,
      campCadeirinhaPequena: false,
      campCadeirinhaGrande: false,
      campCadeiraRodas: false,
      camp_foto_crvl: '',
      camp_foto_CRVL_url: '',
      erro_carro: false,
      erro_modelo: false,
      erro_cor: false,
      erro_placa: false,
      erro_ano: false,
      erro_anodut: false,
      erro_apolice: false,
      erro_seguro: false,
      validacao_carro: false,
      validacao_modelo: false,
      validacao_cor: false,
      validacao_placa: false,
      validacao_ano: false,
      validacao_anodut: false,
      validacao_apolice: false,
      validacao_seguro: false,
      incluir_foto_1: false,
      listaMarcas:[],
      listaModelos:[],      
      listVeiculos:[],
      listSeguradoras:[],
      uploadedCRVL: [],      
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

    this.carroChange = this.carroChange.bind(this);
    this.modeloChange = this.modeloChange.bind(this);
    this.corChange = this.corChange.bind(this);      
    this.placaChange = this.placaChange.bind(this);
    this.anoChange = this.anoChange.bind(this);  
    this.anoDUTChange = this.anoDUTChange.bind(this);  
    this.apoliceChange = this.apoliceChange.bind(this);
    this.seguroChange = this.seguradoraChange.bind(this);  
    this.engateChange = this.engateChange.bind(this);      
    this.cadeirinhapequenaChange = this.cadeirinhapequenaChange.bind(this);  
    this.cadeirinhagrandeChange = this.cadeirinhagrandeChange.bind(this);  
    this.cadeirarodasChange = this.cadeirarodasChange.bind(this);  
    
    this.verificaCarro = this.verificaCarro.bind(this);  
    this.verificaModelo = this.verificaModelo.bind(this);  
    this.verificaCor = this.verificaCor.bind(this);  
    this.verificaAno = this.verificaAno.bind(this);  
    this.verificaAnoDUT = this.verificaAnoDUT.bind(this);  
    this.verificaPlaca = this.verificaPlaca.bind(this);  
    this.verificaApolice = this.verificaApolice.bind(this);  
    this.verificaSeguro = this.verificaSeguro.bind(this);  

    this.validaCarroChange = this.validaCarroChange.bind(this);  
    this.validaModeloChange = this.validaModeloChange.bind(this);  
    this.validaCorChange = this.validaCorChange.bind(this);  
    this.validaAnoChange = this.validaAnoChange.bind(this);  
    this.validaAnoDUTChange = this.validaAnoDUTChange.bind(this);  
    this.validaPlacaChange = this.validaPlacaChange.bind(this);  
    this.validaApoliceChange = this.validaApoliceChange.bind(this);  
    this.validaSeguroChange = this.validaSeguroChange.bind(this);  

    this.buscaMarca = this.buscaMarca.bind(this);  
    this.buscaModelo = this.buscaModelo.bind(this);  
    this.carrega_veiculo = this.carrega_veiculo.bind(this);      
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });


    this.loadMotorista();  
  }

  limpar_campos(){
    this.setState({
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
      campNomeSalvar: "",
      campSeguradoraNome: "",
      campSeguradoraId: 0,
      campEngate: false,
      campCadeirinhaPequena: false,
      campCadeirinhaGrande: false,
      campCadeiraRodas: false,
      camp_foto_crvl: '',
      camp_foto_CRVL_url: '',
      erro_carro: false,
      erro_modelo: false,
      erro_cor: false,
      erro_placa: false,
      erro_ano: false,
      erro_anodut: false,
      erro_apolice: false,
      erro_seguro: false,
      validacao_carro: false,
      validacao_modelo: false,
      validacao_cor: false,
      validacao_placa: false,
      validacao_ano: false,
      validacao_anodut: false,
      validacao_apolice: false,
      validacao_seguro: false,
      incluir_foto_1: false,
      uploadedCRVL: [],      
    });      
  } 
 
  loadMotorista(){
   // const url = baseUrl+"/motorista/list"
   api.get('/veiculo/lista_veiculos/'+localStorage.getItem('logid'))
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listVeiculos:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
 
  carrega_veiculo() {
    const { validate } = this.state;
    api.get(`/veiculo/get/${localStorage.getItem('logVeiculo')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {          

          this.setState({   
            campId: res.data.data[0].id,
            campCarro: res.data.data[0].marca,
            campModelo: res.data.data[0].modelo,
            campCarroId: res.data.data[0].marcaId,
            campModeloId: res.data.data[0].modeloId,
            campApolice: res.data.data[0].apolice,
            campSeguradoraId: res.data.data[0].seguradoraId,
            campPlaca: res.data.data[0].placa,
            campAnodut: res.data.data[0].anodut,            
            campAno: res.data.data[0].ano,
            campCor: res.data.data[0].cor,            
            camp_foto_CRVL_url: res.data.data[0].foto_CRVL_url,
            campEngate: res.data.data[0].engate,
            campCadeirinhaPequena: res.data.data[0].cadeirinha_pequena,       
            campCadeirinhaGrande: res.data.data[0].cadeirinha_grande,       
            campCadeiraRodas: res.data.data[0].cadeira_rodas,                                                
            inicio: 2,
            validacao_ano: true,
            validacao_anodut: true,
            validacao_apolice: true,
            validacao_carro:true,
            validacao_cor: true,
            validacao_modelo:true,
            validacao_placa: true,
            validacao_seguro: true,                   
          })            


          const uploadedCRVL = res.data.data.map(file => ({     
            file: ({
              path: file.foto_CRVL_name
            }),  
            id: file.id,
            name: file.foto_CRVL_name,
            readableSize: filesize(file.foto_CRVL_size),
            progress: 0,
            preview: file.foto_CRVL_url,
            uploaded: false,
            url: file.foto_CRVL_url,
            error: false
          }));        
  
          this.setState({                   
            uploadedCRVL: uploadedCRVL,            
            foto2State: 'has-success'
          });  

           this.buscaSeguradora(res.data.data[0].seguradoraId)
           this.load_modelo_banco(this.state.campCarroId)
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
            incluir: false
          })

          this.setState({ validate })
         

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
  handleClick = () => {
  
    this.props.history.push('/area_motorista'); 

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

  carroChange(e) {             
    const { validate } = this.state     
      validate.modeloState = ''    
      this.setState({ 
        validate,
        erro_carro: false,
        validacao_carro: false,
        campCarroId: e.target.value         
      })       
      
      this.load_modelo_banco(e.target.value);
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
    seguradoraChange(e) {     
      this.setState({
          campSeguradoraId: e.target.value
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

    verificaCarro(e) {
      const { validate } = this.state
         if (this.state.campCarro.length == 0) {
       //  validate.carroState = ''    
          this.setState({ 
            validate,
            erro_carro: false,
            validacao_carro: false,
            mensagem_carro: ''
           })      
         }        
     }
     verificaModelo(e) {
      const { validate } = this.state
         if (e.target.value.length == "") {        
          this.setState({ 
            validate,
            erro_modelo: false,
            validacao_modelo: false,
            mensagem_modelo: ''  
           })      
         }      
     }
     verificaAno(e) {
      const { validate } = this.state
         if (e.target.value.length == 0) {        
          this.setState({ 
            validate,
            erro_ano: false,
            validacao_ano: false,
            mensagem_ano: ''  
           })      
         }      
     }
     verificaAnoDUT(e) {
      const { validate } = this.state
         if (e.target.value.length == 0) {        
          this.setState({ 
            validate,
            erro_anodut: false,
            validacao_anodut: false,
            mensagem_anoDUT: ''  
           })      
         }      
     }
     verificaPlaca(e) {
      const { validate } = this.state
      if (e.target.value.length == 0) {      
        this.setState({ 
          validate,
          erro_placa: false,
          validacao_placa: false,
          mensagem_placa: ''  
         })      
      }      
     }
     verificaCor() {
      const { validate } = this.state
         if (this.state.campCor.length == 0) {        
          this.setState({ 
            validate,
            erro_cor: false,
            validacao_cor: false,
            mensagem_cor: ''  
           })      
         }      
     }
     verificaApolice(e) {
      const { validate } = this.state
         if (e.target.value.length == 0) {        
          this.setState({ 
            validate,
            erro_apolice: false,
            validacao_apolice: false,
            mensagem_apolice: ''  
           })      
         }      
     }
     verificaSeguro() {
      const { validate } = this.state
         if (this.state.campSeguradoraId.length == 0) {        
          this.setState({ 
            validate,
            erro_seguro: false,
            validacao_seguro: false,
            mensagem_seguro: ''  
           })      
         }      
     }
  
     validaCarroChange(e){
      //console.log('onchange - '+JSON.stringify(e.target.value, null, "    "));        
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          //validate.seguroState = 'has-danger'
          this.setState({ 
            erro_carro: false,
            validacao_carro: false,
            mensagem_carro: '' 
          })  
        } else {
          validate.carroState = 'has-success'       
          this.setState({ 
            erro_carro: false,
            validacao_carro: true,
            mensagem_carro: '' 
          })  
        }  
        this.setState({ validate })
  
    }
    validaModeloChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.modeloState = ''
          this.setState({ 
            erro_modelo: false,
            validacao_modelo: false,
            mensagem_carro: '' 
          })          
        } else {
          validate.modeloState = 'has-success'       
          this.setState({ 
            erro_modelo: false,
            validacao_modelo: true,
            mensagem_carro: '' 
          })  
        }  
        this.setState({ validate })
    }
    validaCorChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.corState = ''
          this.setState({ 
            erro_cor: false,
            validacao_cor: false,
            mensagem_cor: '' 
          })  
        } else {
          validate.corState = 'has-success'       
          this.setState({ 
            erro_cor: false,
            validacao_cor: true,
            mensagem_cor: '' 
          })  
        }  
        this.setState({       
          validate })
    }
    validaPlacaChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.placaState = ''
          this.setState({ 
            erro_placa: false,
            validacao_placa: false,
            mensagem_placa: '' 
          })  
        } else if (e.target.value.length > 7) {
          validate.placaState = 'has-success'       
          this.setState({ 
            erro_placa: false,
            validacao_placa: true,
            mensagem_placa: '' 
          })  
        }  
        this.setState({ validate })
    }
    validaAnoChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.anoState = ''
          this.setState({ 
            erro_ano: false,
            validacao_ano: false,
            mensagem_ano: '' 
          })  
        } else {
          validate.anoState = 'has-success'       
          this.setState({ 
            erro_ano: false,
            validacao_ano: true,
            mensagem_ano: '' 
          })  
        }  
        this.setState({ validate })
    }
    validaAnoDUTChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.anoDUTState = ''
          this.setState({ 
            erro_anodut: false,
            validacao_anodut: false,
            mensagem_anoDUT: '' 
          })  
        } else {
          validate.anoDUTState = 'has-success'       
          this.setState({ 
            erro_anodut: false,
            validacao_anodut: true,
            mensagem_anoDUT: '' 
          })  
        }  
        this.setState({ validate })
    }
    validaApoliceChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.apoliceState = ''
          this.setState({ 
            erro_apolice: false,
            validacao_apolice: false,
            mensagem_telefone1: '' 
          })  
        } else {
          validate.apoliceState = 'has-success'       
          this.setState({ 
            erro_apolice: false,
            validacao_apolice: true,
            mensagem_telefone1: '' 
          })  
        }  
        this.setState({ validate })
    }
    validaSeguroChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          //validate.seguroState = 'has-danger'
          this.setState({ 
            erro_seguro: false,
            validacao_seguro: false,
            mensagem_seguro: '' 
          })  
        } else {
          validate.seguroState = 'has-success'       
          this.setState({ 
            erro_seguro: false,
            validacao_seguro: true,
            mensagem_seguro: '' 
          })  
        }  
        this.setState({ validate })
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
     }
  
    buscaModelo(id) {       
    
      console.log('id entrada Modelo - '+id);
      this.state.listaModelos.map((data)=>{          
         if (data.id == id) {
           console.log('buscaModelo - '+data.name); 
           localStorage.setItem('logModelo', data.name)    
         }
       }) 
     
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

     verifica_botao(inicio) {
      const { validate } = this.state  
      /console.log('VERIFICA BOTAO - '+JSON.stringify(this.state, null, "    "));   
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal_scroll"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
      } else {
        
        if (this.state.validacao_ano == true  
          && this.state.validacao_seguro == true && this.state.validacao_cor == true
          && this.state.validacao_anodut == true) {
            return ( 
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal_scroll"  p={2} onClick={()=>this.sendSave()}>
                      <div className="d-flex justify-content-center">
                      <label> Incluir </label>
                      </div>     
                </Box>           
            );    
        } else {
          
          return (
            <Box bgcolor="error.main" color="error.contrastText" className="botoes_desabilitado_modal_scroll" p={2} >
            <div className="d-flex justify-content-center">
                Incluir
            </div>     
            </Box>           
          );
        }     
      }
    
      } 

      verifica_botao_alteracao(inicio) {
        const { validate } = this.state  
        /console.log('VERIFICA BOTAO - '+JSON.stringify(this.state, null, "    "));   
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal_scroll"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                    </div>     
              </Box>           
          );   
        } else {
          
          if (this.state.validacao_ano == true 
            && this.state.validacao_seguro == true && this.state.validacao_cor == true
            && this.state.validacao_anodut == true) {
              return ( 
                <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal_scroll"  p={2} onClick={()=>this.sendUpdate()}>
                        <div className="d-flex justify-content-center">
                        <label> Salvar Alterações </label>
                        </div>     
                  </Box>           
              );    
          } else {
            
            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botoes_desabilitado_modal_scroll" p={2} >
              <div className="d-flex justify-content-center">
                    Salvar Alterações
              </div>     
              </Box>           
            );
          }     
        }
      
        } 

      /* salvando documento */
      onChange = async (file) => { 
        const image = await resizeFile(file);
        return image;
      }
      getBase64(file, success) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          debugger;
          success( reader.result );
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
   /* ----------------------------------------  */
     async sendSave(){

        const { validate } = this.state;               
        this.setState({
           validacao_placa: false, 
           validacao_ano: false, 
           mensagem_aguarde: 'Aguarde, Incluindo os dados...',       
           validate 
        });       

        const file = this.state.uploadedCRVL[0].file;
        console.log(' CRLV - '+JSON.stringify(this.state.uploadedCRVL[0], null, "    ")); 
      /*  const formData1 = {
          foto_url: await this.onChange(file),
          name: this.state.uploadedCRVL[0].name
        } */      

         this.buscaMarca(this.state.campCarroId);
         this.buscaModelo(this.state.campModeloId);
        const datapost = {
          marcaId: this.state.campCarroId, 
          modeloId: this.state.campModeloId,
          marca: localStorage.getItem('logMarca'), 
          modelo: localStorage.getItem('logModelo'),
          seguradoraId: this.state.campSeguradoraId,
          apolice: this.state.campApolice,
          placa: this.state.campPlaca,
          ano: this.state.campAno,
          anodut: this.state.campAnodut,
          cor: this.state.campCor,    
          engate: this.state.campEngate, 
          cadeirinha_pequena: this.state.campCadeirinhaPequena, 
          cadeirinha_grande: this.state.campCadeirinhaGrande, 
          cadeira_rodas: this.state.campCadeiraRodas,
          motoristaId: localStorage.getItem('logid'),
          foto_CRVL_name: this.state.uploadedCRVL[0].name,          
          foto_url: await this.onChange(file),                    
        }          
        console.log('state- '+ JSON.stringify(this.state.incluir, null, "    "));       
        console.log('veiculo motorista - '+ JSON.stringify(datapost, null, "    "));           
      
              api.post("/veiculo/create", datapost)
              .then(resp=>{
               // console.log('response - '+response);
                if (resp.data.success==true) {                        
                    
                 /* const file = this.state.uploadedCRVL[0].file;
 
                  const formData1 = {
                    foto_url: this.onChange(file),
                    name: this.state.uploadedCRVL[0].name
                  } */


                  this.setState({   
                    emailState: '',
                    mensagem_usuario: 'Veículo incluído com sucesso!'
                  });          

  
                  this.verifica_botao(1);

                  this.envia_mensagemClick();   
                  

               //   console.log(' CRLV - '+JSON.stringify(formData1, null, "    ")); 
                  //    formData.append("file", this.state.uploadedCNH[0].file, this.state.uploadedCNH[0].name)                  
                 /*
                  api.put(`/veiculo/documentoCRVL/update/${resp.data.data.id}/${localStorage.getItem('logid')}`, formData1)
                  .then(response=>{

                        

                  }).catch(error=>{
                     alert("Error conxao CNH - "+ error)          
                  })   */

                }
                else {
                  alert("Error conexão ")              
                }
              }).catch(error=>{
                alert("Erro verificar log  ")
              })                   
      }  

      async sendUpdate(){

        const { validate } = this.state;               
        this.setState({
           validacao_placa: false, 
           validacao_ano: false, 
           mensagem_aguarde: 'Aguarde, Alterando os dados...',       
           validate 
        });             
        console.log(' CRLV - '+JSON.stringify(this.state.uploadedCRVL[0], null, "    ")); 
        //console.log(' CRLV - '+JSON.stringify(this.state.uploadedCRVL[0], null, "    "));   
        
    /*    let foto_upload;
        if (this.state.incluir_foto_1 == true) {
           foto_upload = await this.onChange(file);
        } else {
          foto_upload = this.state.uploadedCRVL[0]
        }          */

     let datapost = '';

      if (this.state.incluir_foto_1 == true) {
        
        const file = this.state.uploadedCRVL[0].file;        
         this.buscaMarca(this.state.campCarroId);
         this.buscaModelo(this.state.campModeloId);
        datapost = {
          marcaId: this.state.campCarroId, 
          modeloId: this.state.campModeloId,
          marca: localStorage.getItem('logMarca'), 
          modelo: localStorage.getItem('logModelo'),
          seguradoraId: this.state.campSeguradoraId,
          apolice: this.state.campApolice,
          placa: this.state.campPlaca,
          ano: this.state.campAno,
          anodut: this.state.campAnodut,
          cor: this.state.campCor,    
          engate: this.state.campEngate, 
          cadeirinha_pequena: this.state.campCadeirinhaPequena, 
          cadeirinha_grande: this.state.campCadeirinhaGrande, 
          cadeira_rodas: this.state.campCadeiraRodas,
          motoristaId: localStorage.getItem('logid'),
          foto_CRVL_name: this.state.uploadedCRVL[0].name,          
          foto_url: await this.onChange(file),                    
        }          
      } else {
          this.buscaMarca(this.state.campCarroId);
          this.buscaModelo(this.state.campModeloId);
        datapost = {
          marcaId: this.state.campCarroId, 
          modeloId: this.state.campModeloId,
          marca: localStorage.getItem('logMarca'), 
          modelo: localStorage.getItem('logModelo'),
          seguradoraId: this.state.campSeguradoraId,
          apolice: this.state.campApolice,
          placa: this.state.campPlaca,
          ano: this.state.campAno,
          anodut: this.state.campAnodut,
          cor: this.state.campCor,    
          engate: this.state.campEngate, 
          cadeirinha_pequena: this.state.campCadeirinhaPequena, 
          cadeirinha_grande: this.state.campCadeirinhaGrande, 
          cadeira_rodas: this.state.campCadeiraRodas,
          motoristaId: localStorage.getItem('logid'),         
        }
       }

        console.log('state- '+ JSON.stringify(this.state.incluir, null, "    "));       
        console.log('veiculo motorista - '+ JSON.stringify(datapost, null, "    "));           
        
              api.put(`/veiculo/update/${localStorage.getItem('logVeiculo')}`, datapost)
              .then(resp=>{
                console.log('veiculo - '+ JSON.stringify(resp.data, null, "    "));           
               // console.log('response - '+response);
                if (resp.data.success==true) {                                            
         
                  this.setState({   
                    emailState: '',
                    mensagem_usuario: 'Veículo alterado com sucesso!'
                  });          

  
                  this.verifica_botao(1);

                  this.envia_mensagemClick();         

               

                }
              }).catch(error=>{
                alert("Erro verificar log  ")
              })                   
      }  

      loadSeguradorasData(){
  
        return this.state.listSeguradoras.map((data)=>{          
          return(
            <MenuItem value={data.id}>{data.nome}</MenuItem>             
          )
        })     
      
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

      handleUploadCRVL = files => {         
        this.setState({    
          uploadedCRVL: [],
        });  
     //   console.log(JSON.stringify(' uploadedCRVL - '+this.state.uploadedCRVL[0], null, "    "));   
      
      //  if (files[0].size <= 2047335) {
          const uploadedCRVL = files.map(file => ({
            file,
            //id: uniqueId(),
            name: file.name,
            originalname: file.originalname,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: file.url
          }));  
          
          this.setState({    
            uploadedCRVL: uploadedCRVL,         
            camp_foto_CRVL_url: uploadedCRVL[0].preview,               
            incluir_foto_1: true,
            foto2State: 'has-success',
            mensagem_foto2: ''
          });
              
           
          this.verifica_botao(2)
      
       /* } else {
          this.setState({    
            foto2State: '',
            incluir_foto_2: false,
            mensagem_foto2: 'Foto muito grande, favor adicionar outra '
          });
          this.verifica_botao(2)
        } */ 
       
      }
      

  render()
  {
    const { uploadedCRVL } = this.state; 
    return (
      <div>     
        <div>      
        <Menu_motorista />         
        <div className="titulo_lista">
               <div className="unnamed-character-style-4 descricao_admministrador">                       
                 <div className="titulo_bemvindo"> Veículo </div>
              </div>      
            </div>
          </div>     
       <div className="margem_left">
    
        <br/>
        <div style={{ maxWidth: '100%' }}>
           <MaterialTable          
                            title=""
                            style={ {width: "96%"}}                                  
                            columns={[
                              { title: '', field: '#', width: '40px' },
                              { title: 'Marca', field: 'marca', width: '285px' },
                              { title: 'Modelo', field: 'modelo', width: '285px' },
                              { title: 'Placa', field: 'placa', width: '250px' },
                              { title: 'Ano', field: 'ano', width: '300px' },                                                            
                              { title: '', field: '#', width: '40px' },                              
                              { title: '', field: '', align: 'left', lookup: { 1: 'sadas', 2: 'asdas' }, },         
                            ]}
                            data={this.state.listVeiculos}   
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
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px" , color: "#0F074E"  },
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_motorista',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,          
                              maxBodyHeight: 450,
                              minBodyHeight: 450, 
                              padding: 'dense',   
                              overflowY: 'scroll',
                              //tableLayout: 'fixed',
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 6,
                              //pageSize: 7,
                              pageSizeOptions: [0],    
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModalAlteracao(data)
                              },
                              {
                                icon: 'delete',                                                             
                                tooltip: 'Deleta Veiculo',          
                                onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                              }
                            ]}
                           /* editable={{                          
                              onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                  setTimeout(() => {
                                   // const dataDelete = [...this.state.campId];
                                    const index = oldData.id;   
                                   // dataDelete.splice(index, 1);                              
                                    resolve()                                
                                    this.sendDelete(index)
                                  }, 1000)
                                }),
                            }} */
                          />      
        </div> 

        <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
                            <AddIcon/> <div className="botao_incluir"> Adicionar Veiculos  </div>
                        </Fab>
                      </div> 

        <ReactModal 
        isOpen={this.state.showModalInclusao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Inclusão de Veiculos    
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()} className="botao_close_modal_tipo_veiculo">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                  <div class="p-2">
                    <div class="d-flex justify-content-start">
                            <div> 
                                <div class="p-2">  
                                <FormControl variant="outlined">
                                  <InputLabel className="label_veiculo_motorista" id="demo-simple-select-outlined-label">Marca </InputLabel>
                                  <Select                                                 
                                    autoComplete="off"                     
                                    className="text_veiculo_motorista"                                                
                                    labelId="demo-simple-select-outlined-label"
                                    id="busca"
                                    value={this.state.campCarroId}  
                                    onBlur={this.verificaCarro}
                                    //onFocus={this.verificaCarro}
                                    onChange={ (e) => {
                                      this.carroChange(e)                       
                                      this.validaCarroChange(e)
                                    }}                                                                               
                                    labelWidth={60}   
                                  >          
                                  <MenuItem value={0}>Selecione a marca</MenuItem>                                         
                                    {this.loadMarcaData()}                    
                                    </Select>
                                </FormControl>             
                              </div>
                            </div>                        
                            <div>   
                            <FormControl variant="outlined">
                                <InputLabel className="label_marca_autocomplete_motorista" id="demo-simple-select-outlined-label">Modelo </InputLabel>
                                <Select                                                 
                                  autoComplete="off"                     
                                  className="text_marca_autocomplete_motorista"                                                
                                  labelId="demo-simple-select-outlined-label"
                                  id="busca"
                                  value={this.state.campModeloId}                             
                                  onBlur={this.verificaModelo}
                                  onChange={ (e) => {
                                    this.modeloChange(e)                       
                                    this.validaModeloChange(e)
                                  }}                                                                               
                                  labelWidth={60}   
                                >          
                                <MenuItem value={0}>Selecione o modelo</MenuItem>                                         
                                  {this.loadModelosData()}                    
                                  </Select>
                              </FormControl>                                                                                                                                  
                            </div>                        
                        </div>
                    </div> 
                    <div class="p-2">   
                        <div className="d-flex justify-content-start">
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_placa_text_motorista" htmlFor="filled-adornment-password">Placa</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_placa}
                                    helperText={this.state.mensagem_placa}
                                    className="text_placa_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campPlaca}
                                    onBlur={this.verificaPlaca}                    
                                    onChange={ (e) => {
                                      this.placaChange(e)                       
                                      this.validaPlacaChange(e)
                                    }}         
                                    inputProps={{
                                      maxLength: 9,
                                    }}                                                           
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_placa? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={50}
                                />                  
                                <FormHelperText error={this.state.erro_placa}>
                                      {this.state.mensagem_placa}
                                </FormHelperText>
                              </FormControl>                      
                            </div> 
                            
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_ano_text_motorista" htmlFor="filled-adornment-password">Ano</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_ano}
                                    helperText={this.state.mensagem_ano}
                                    className="text_ano_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campAno}                        
                                    onBlur={this.verificaAno}
                                    onChange={ (e) => {
                                      this.anoChange(e)                       
                                      this.validaAnoChange(e)
                                    }}       
                                    inputProps={{
                                      maxLength: 4,
                                    }}                                                             
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_ano? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={30}
                                />                  
                                <FormHelperText error={this.state.erro_ano}>
                                      {this.state.mensagem_ano}
                                </FormHelperText>
                              </FormControl>                             
                            </div>                        
                        </div>
                    </div> 
                    <div class="p-2">    
                      <div class="d-flex justify-content-start">
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_cor_text_motorista" htmlFor="filled-adornment-password">Cor</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cor}
                                    helperText={this.state.mensagem_cor}
                                    className="text_cor_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campCor}                            
                                    onBlur={this.verificaCor}
                                    onChange={ (e) => {
                                      this.corChange(e)                       
                                      this.validaCorChange(e)
                                    }}                          
                                    inputProps={{
                                      maxLength: 20,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cor? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={30}
                                />                  
                                <FormHelperText error={this.state.erro_cor}>
                                      {this.state.mensagem_cor}
                                </FormHelperText>
                              </FormControl>                          
                            </div>
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_anodut_text_motorista" htmlFor="filled-adornment-password">Ano do DUT</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_anodut}
                                    helperText={this.state.mensagem_anoDUT}
                                    className="text_anodut_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campAnodut}                        
                                    onBlur={this.verificaAnoDUT}
                                    onChange={ (e) => {
                                      this.anoDUTChange(e)                       
                                      this.validaAnoDUTChange(e)
                                    }}                        
                                    inputProps={{
                                      maxLength: 4,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_anodut? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.erro_anodut}>
                                      {this.state.mensagem_anoDUT}
                                </FormHelperText>
                              </FormControl>                           
                            </div>                                                       
                      </div>    
                  </div>      
                  <div class="p-2">   
                  <div class="d-flex justify-content-start">
                            <div>  
                            <FormControl variant="outlined">
                                          <InputLabel className="label_seguradora_modal_motorista" id="demo-simple-select-outlined-label">Seguradora </InputLabel>
                                          <Select                                                 
                                            autoComplete="off"                     
                                            className="text_seguradora_modal_motorista"                                                
                                            labelId="demo-simple-select-outlined-label"
                                            id="busca"
                                            value={this.state.campSeguradoraId}                          
                                            onBlur={this.verificaSeguro}
                                            onChange={ (e) => {
                                              this.seguradoraChange(e)                       
                                              this.validaSeguroChange(e)
                                            }}                                                                                 
                                            labelWidth={110}   
                                          >          
                                          <MenuItem value={0}>Selecione a seguradora</MenuItem>                                         
                                            {this.loadSeguradorasData()}                    
                                            </Select>
                                        </FormControl>                                                                         
                         </div>
                         <div>
                         <FormControl variant="outlined">
                                <InputLabel className="label_apolice_modal_motorista" htmlFor="filled-adornment-password">Número Apólice</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_apolice}
                                    helperText={this.state.mensagem_apolice}
                                    className="text_apolice_mopdal_motorista"                
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campApolice}                           
                                    onBlur={this.verificaApolice}
                                    onChange={ (e) => {
                                      this.apoliceChange(e)                       
                                      this.validaApoliceChange(e)
                                    }}                   
                                    inputProps={{
                                      maxLength: 12,
                                    }}         
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_apolice? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={130}
                                />                  
                                <FormHelperText error={this.state.erro_apolice}>
                                      {this.state.mensagem_apolice}
                                </FormHelperText>
                              </FormControl>    
                         </div>
                  </div>                    
                  </div> 
                  <div class="p-2 espacamento_div">    
                  <div class="d-flex justify-content-start">
                            <div>  
                            <FormControl component="fieldset">
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
                            <FormControl component="fieldset">
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
                            <FormControl component="fieldset">
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
                            <FormControl component="fieldset">
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
                     <div className="borda_documento">                       
                        <div className="titulocrvl"><stronger>CRLV</stronger></div>
                        <div className="descricaocrvl">Certificado de Registro e Licenciamento do Veí­culo</div>
                        <Container>               
                                <div class="d-flex justify-content-start">
                                   <div>
                                   <Content>
                                      {!!uploadedCRVL.length && (
                                          <FileList files={uploadedCRVL} />
                                       )}
                                    </Content>   
                                   </div>
                                   <div>
                                     <Content>
                                         <div>
                                            {this.state.mensagem_foto2} </div>
                                         <Upload onUpload={this.handleUploadCRVL} />                                       
                                     </Content>                                            
                                   </div>
                                 </div>                
                          </Container>                                            
                        
                        </div>     

                </div>            
              <br/>
              <br/>
                </div>
                       
                  {this.verifica_botao(this.state.inicio)}                          
                      
                 </div>
               </div>        
            </div>
     </ReactModal>       
        <ReactModal 
            isOpen={this.state.showModalAlteracao}
            style={customStyles}
            contentLabel="Inline Styles Modal Example"                                  
            ><div className="editar_titulo">Alterar Veículo Motorista 
                <IconButton aria-label="editar" onClick={()=>this.handleCloseModalAlteracao()} className="botao_close_modal_veiculo">
                  <CloseOutlinedIcon />
                </IconButton></div>   

                <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                  <div class="p-2">
                    <div class="d-flex justify-content-start">
                            <div> 
                                <div class="p-2">  
                                <FormControl variant="outlined">
                                  <InputLabel className="label_veiculo_motorista" id="demo-simple-select-outlined-label">Marca </InputLabel>
                                  <Select                                                 
                                    autoComplete="off"                     
                                    className="text_veiculo_motorista"                                                
                                    labelId="demo-simple-select-outlined-label"
                                    id="busca"
                                    value={this.state.campCarroId}  
                                    onBlur={this.verificaCarro}
                                    //onFocus={this.verificaCarro}
                                    onChange={ (e) => {
                                      this.carroChange(e)                       
                                      this.validaCarroChange(e)
                                    }}                                                                               
                                    labelWidth={60}   
                                  >          
                                  <MenuItem value={0}>Selecione a marca</MenuItem>                                         
                                    {this.loadMarcaData()}                    
                                    </Select>
                                </FormControl>             
                              </div>
                            </div>                        
                            <div>   
                            <FormControl variant="outlined">
                                <InputLabel className="label_modelo_autocomplete_motorista" id="demo-simple-select-outlined-label">Modelo </InputLabel>
                                <Select                                                 
                                  autoComplete="off"                     
                                  className="text_modelo_autocomplete_motorista"                                                
                                  labelId="demo-simple-select-outlined-label"
                                  id="busca"
                                  value={this.state.campModeloId}                             
                                  onBlur={this.verificaModelo}
                                  onChange={ (e) => {
                                    this.modeloChange(e)                       
                                    this.validaModeloChange(e)
                                  }}                                                                               
                                  labelWidth={60}   
                                >          
                                <MenuItem value={0}>Selecione o modelo</MenuItem>                                         
                                  {this.loadModelosData()}                    
                                  </Select>
                              </FormControl>                                                                                                                                  
                            </div>                        
                        </div>
                    </div> 
                    <div class="p-2">   
                        <div className="d-flex justify-content-start">
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_placa_text_motorista" htmlFor="filled-adornment-password">Placa</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_placa}
                                    helperText={this.state.mensagem_placa}
                                    className="text_placa_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campPlaca}
                                    onBlur={this.verificaPlaca}                    
                                    onChange={ (e) => {
                                      this.placaChange(e)                       
                                      this.validaPlacaChange(e)
                                    }}         
                                    inputProps={{
                                      maxLength: 9,
                                    }}                                                           
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_placa? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={50}
                                />                  
                                <FormHelperText error={this.state.erro_placa}>
                                      {this.state.mensagem_placa}
                                </FormHelperText>
                              </FormControl>                      
                            </div> 
                            
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_ano_text_motorista" htmlFor="filled-adornment-password">Ano</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_ano}
                                    helperText={this.state.mensagem_ano}
                                    className="text_ano_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campAno}                        
                                    onBlur={this.verificaAno}
                                    onChange={ (e) => {
                                      this.anoChange(e)                       
                                      this.validaAnoChange(e)
                                    }}       
                                    inputProps={{
                                      maxLength: 4,
                                    }}                                                             
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_ano? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={30}
                                />                  
                                <FormHelperText error={this.state.erro_ano}>
                                      {this.state.mensagem_ano}
                                </FormHelperText>
                              </FormControl>                             
                            </div>                        
                        </div>
                    </div> 
                    <div class="p-2">    
                      <div class="d-flex justify-content-start">
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_cor_text_motorista" htmlFor="filled-adornment-password">Cor</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_cor}
                                    helperText={this.state.mensagem_cor}
                                    className="text_cor_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campCor}                            
                                    onBlur={this.verificaCor}
                                    onChange={ (e) => {
                                      this.corChange(e)                       
                                      this.validaCorChange(e)
                                    }}                          
                                    inputProps={{
                                      maxLength: 20,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_cor? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={30}
                                />                  
                                <FormHelperText error={this.state.erro_cor}>
                                      {this.state.mensagem_cor}
                                </FormHelperText>
                              </FormControl>                          
                            </div>
                            <div>
                            <FormControl variant="outlined">
                                <InputLabel className="label_anodut_text_motorista" htmlFor="filled-adornment-password">Ano do DUT</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_anodut}
                                    helperText={this.state.mensagem_anoDUT}
                                    className="text_anodut_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campAnodut}                        
                                    onBlur={this.verificaAnoDUT}
                                    onChange={ (e) => {
                                      this.anoDUTChange(e)                       
                                      this.validaAnoDUTChange(e)
                                    }}                        
                                    inputProps={{
                                      maxLength: 4,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_anodut? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.erro_anodut}>
                                      {this.state.mensagem_anoDUT}
                                </FormHelperText>
                              </FormControl>                           
                            </div>                                                       
                      </div>    
                  </div>      
                  <div class="p-2">   
                  <div class="d-flex justify-content-start">
                            <div>  
                            <FormControl variant="outlined">
                                          <InputLabel className="label_seguradora_modal_motorista" id="demo-simple-select-outlined-label">Seguradora </InputLabel>
                                          <Select                                                 
                                            autoComplete="off"                     
                                            className="text_seguradora_modal_motorista"                                                
                                            labelId="demo-simple-select-outlined-label"
                                            id="busca"
                                            value={this.state.campSeguradoraId}                          
                                            onBlur={this.verificaSeguro}
                                            onChange={ (e) => {
                                              this.seguradoraChange(e)                       
                                              this.validaSeguroChange(e)
                                            }}                                                                                 
                                            labelWidth={110}   
                                          >          
                                          <MenuItem value={0}>Selecione a seguradora</MenuItem>                                         
                                            {this.loadSeguradorasData()}                    
                                            </Select>
                                        </FormControl>                                                                         
                         </div>
                         <div>
                         <FormControl variant="outlined">
                                <InputLabel className="label_apolice_modal_motorista" htmlFor="filled-adornment-password">Número Apólice</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.erro_apolice}
                                    helperText={this.state.mensagem_apolice}
                                    className="text_apolice_mopdal_motorista"                
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campApolice}                           
                                    onBlur={this.verificaApolice}
                                    onChange={ (e) => {
                                      this.apoliceChange(e)                       
                                      this.validaApoliceChange(e)
                                    }}                   
                                    inputProps={{
                                      maxLength: 12,
                                    }}         
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_apolice? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={130}
                                />                  
                                <FormHelperText error={this.state.erro_apolice}>
                                      {this.state.mensagem_apolice}
                                </FormHelperText>
                              </FormControl>    
                         </div>
                  </div>                    
                  </div> 
                  <div class="p-2 espacamento_div">    
                  <div class="d-flex justify-content-start">
                            <div>  
                            <FormControl component="fieldset">
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
                            <FormControl component="fieldset">
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
                            <FormControl component="fieldset">
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
                            <FormControl component="fieldset">
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
                     <div className="borda_documento">                       
                        <div className="titulocrvl"><stronger>CRLV</stronger></div>
                        <div className="descricaocrvl">Certificado de Registro e Licenciamento do Veí­culo</div>
                        <Container>               
                                <div class="d-flex justify-content-start">
                                   <div>
                                   <Content>
                                      <img src={this.state.camp_foto_CRVL_url} variant="circle" 
                                         className="foto_cnh_motorista" onClick={()=>this.handleOpenModalFoto(this.state.camp_foto_CRVL_url)} />                                                        
                                    </Content>                                      
                                   </div>
                                   <div>
                                     <Content>
                                         <div>
                                            {this.state.mensagem_foto2} </div>
                                         <Upload onUpload={this.handleUploadCRVL} />                                       
                                     </Content>                                            
                                   </div>
                                 </div>                
                          </Container>                                            
                        
                        </div>     

                </div>            
              <br/>
              <br/>
                </div>                            
                  {this.verifica_botao_alteracao(this.state.inicio)}                          
                      
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
                    <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Veículo? </div>
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

      </div>   
     </div> 
    );
  }

  handleOpenModalInclusao () { 
    this.setState({ 
      showModalInclusao: true,
      incluir_foto_1: false,
    });      
    this.limpar_campos();
    this.loadSeguradoras();    
    this.carrega_marca_banco();

    
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      incluir_foto_1: false,
      showModalInclusao: false
    });
     
    this.loadMotorista();
   
  }

  handleOpenModalAlteracao (data) { 
    this.setState({ 
      incluir_foto_1: false,
      showModalAlteracao: true,
      mensagem_aguarde: '',
    });  

    console.log('logVeiculo - '+ data.id)
    localStorage.setItem('logVeiculo', data.id);
   
     this.loadSeguradoras();
     this.carrega_marca_banco();
     this.carrega_veiculo();
    
  }
  
  handleCloseModalAlteracao  () {
    this.setState({ 
      incluir_foto_1: false,
      showModalAlteracao: false
    });
    this.loadMotorista();
   
  }

  handleOpenModalFoto(data) { 
    this.setState({      
      showModalFoto: true,    
      foto: data,  
    });      

  //    console.log('url '+data);
      
  }
  
  handleCloseModalFoto  () {
    this.setState({       
      showModalFoto: false,
      foto: ''
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
    
    
  }
  
  handleCloseModalDelete() {
    this.setState({ 
      showMensagemDelete: false
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
    
    this.handleCloseModalAlteracao();
    this.handleCloseModalInclusao();
  
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
      mensagem_alert_exclusao: false      
    });   
  
  };


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
          alert("Erro de conexão")
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      })
    }
   }  

   buscaSeguradoraNome(nome){
  
    if (nome !== null ) {
      //const baseUrl = "http://34.210.56.22:3333"
     //const url = baseUrl+"/seguradora/list"
     console.log('nome busca Seguradora - '+JSON.stringify(nome, null, "    ")); 
      api.get(`seguradora/getNome/${nome}`)
      .then(res=>{
        if (res.data.success) {      
          const data = res.data.data          
          this.setState({
            campNomeSalvar: data[0].id 
          })
        }
        else {
          alert("Erro de conexão")
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      })
    }
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
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  onIncluir() {
    this.props.history.push(`/incluir_veiculos/`+localStorage.getItem('logid'));   
  }  

  onEditar(data) {
    this.props.history.push(`/alterar_veiculos/${data.id}`);   
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId){
 
    api.delete(`/veiculo/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {     

        this.setState({       
          mensagem_usuario: 'Veículo excluído com sucesso!'
         });

        this.loadMotorista();
        this.handleCloseModalDelete();
        this.envia_mensagemExclusaoClick();

      }
    })
    .catch ( error => {
      alert("Error veiculo delete id "+userId)
    })
  }

}

export default listComponent;
