import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Button, Alert } from 'reactstrap';
import Autocomplete1 from 'react-autocomplete';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Menu_motorista from '../menu_motorista';
import Menu_administrador from '../../administrador/menu_administrador';
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

import api from '../../../services/api';
import '../motorista.css';

const andamento_cadastro = sessionStorage.getItem('logprogress');     
//const cep_empresa = sessionStorage.getItem('logcep');     
//const userId = sessionStorage.getItem('logid');
const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campCarroId: 0,
      campCarro: '',
      campCarroNovo: '',
      campModeloId: 0,
      campModelo: '',
      campModeloNovo: '',
      camptipo_veiculo: '',
      campEngate: false,
      campCadeirinhaPequena: false,
      campCadeirinhaGrande: false,
      campCadeiraRodas: false,
      campPlaca: "",
      campAnodut: '',
      campAno: "",
      campCor: "",
      campNome: "",
      campApolice: "",
      campNomeSalvar: "",
      campSeguradoraNome: "",
      perfillog: null,
      campSeguradoraId: 0,
      incluir: false,
      inicio: 1,   
      lista:[],
      listEstados:[],
      listaMarcas:[],
      listaModelos:[],
      listSeguradoras:[],      
      listTipoTransporte:[],
      erro_carro: false,
      erro_modelo: false,
      erro_cor: false,
      erro_placa: false,
      erro_ano: false,
      erro_anodut: false,
      erro_apolice: false,
      erro_seguro: false,
      erro_tipo_veiculo: false,
      validacao_carro: false,
      validacao_modelo: false,
      validacao_cor: false,
      validacao_placa: false,
      validacao_ano: false,
      validacao_anodut: false,
      validacao_apolice: false,
      validacao_seguro: false,
      validacao_tipo_veiculo: false,
        mensagem_carro: '',  
        mensagem_placa: '',  
        mensagem_cor: '',  
        mensagem_ano: '',  
        mensagem_anoDUT: '',  
        mensagem_apolice: '',  
        mensagem_seguro: '',  
        mensagem_modelo: '', 
        mensagem_tipo_veiculo: '',
      validate: {         
        carroState: '',          
        modeloState: '',        
        tipoState: '',  
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
    this.tipoChange = this.tipoChange.bind(this);
   
    this.verificaTipo_veiculo = this.verificaTipo_veiculo.bind(this);  
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

    this.carrega_motorista = this.carrega_motorista.bind(this);      
    this.carrega_veiculo = this.carrega_veiculo.bind(this);      
    
  }

  componentDidMount(){      

    let userId = this.props.match.params.id;

    if (userId !== 0) {
      sessionStorage.setItem('logid', userId);     
    
    } 

    if (sessionStorage.getItem('logVeiculo') > 0) {
       this.carrega_veiculo();                       
    } else {
      this.limpar_campos();
      
      this.load_veiculo();  
      this.setState({ 
        incluir: true
      })
    }
    
    this.carrega_motorista() 
    this.setState({          
      perfillog: sessionStorage.getItem('logperfil')
    });  

    this.setState({      
      progresso: 50
    });  

    this.loadSeguradoras();
    this.loadTipoTransporte();
   
   this.carrega_marca_banco()
    //}
    //this.verifica_botao(2)
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

  limpar_campos(){
    this.setState({           
      campCarroId: 0,
      campCarro: '',
      campCarroNovo: '',
      campModeloId: 0,
      campModelo: '',
      campModeloNovo: '',
      campEngate: false,
      campCadeirinhaPequena: false,
      campCadeirinhaGrande: false,
      campCadeiraRodas: false,
      campPlaca: "",
      campAnodut: '',
      campAno: "",
      campCor: "",
      campNome: "",
      campApolice: "",
      campNomeSalvar: "",
      campSeguradoraNome: "",
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

 
  verifica_nome_motorista(nome){
    let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = nome
    }
    return(    
          nome_titulo          
       );  
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
          alert("Erro de conexão buscaSeguradoraNome")
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      })
    }
   }  

   carrega_motorista() {
    const { validate } = this.state;
    api.get(`/motorista/get/${sessionStorage.getItem('logid')}`)
    .then(res=>{
      if (res.data.success == true) {          

        this.setState({   
          campNome: res.data.data[0].nome,
          inicio: 2       
        })              
      }   
    })        
    .catch(error=>{
      alert("Error de conexão carrega_motorista "+error)
    })       

  }   

  load_veiculo() {   
    const { validate } = this.state;
    api.get(`/veiculo/getMotoristaVeiculos/${sessionStorage.getItem('logid')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {          

          this.setState({   
            campCarro: res.data.data[0].marca,
            campModelo: res.data.data[0].modelo,
            campCarroId: res.data.data[0].marcaId,
            campModeloId: res.data.data[0].modeloId,
            camptipo_veiculo: res.data.data[0].tipoTransporte,
            campApolice: res.data.data[0].apolice,
            campSeguradoraId: res.data.data[0].seguradoraId,
            campPlaca: res.data.data[0].placa,
            campAnodut: res.data.data[0].anodut,            
            campAno: res.data.data[0].ano,
            campCor: res.data.data[0].cor,       
            campEngate: res.data.data[0].engate,       
            campCadeirinhaPequena: res.data.data[0].cadeirinha_pequena,       
            campCadeirinhaGrande: res.data.data[0].cadeirinha_grande,       
            campCadeiraRodas: res.data.data[0].cadeira_rodas,                
            inicio: 2,    
            validacao_ano: true,
            validacao_anodut: true,
            validacao_apolice: true,
            validacao_carro: true,
            validacao_cor: true,
            validacao_modelo: true, 
            validacao_placa: true,
            validacao_seguro: true,
            validacao_tipo_veiculo: true,
          })            

           this.buscaSeguradora(res.data.data[0].seguradoraId)
           this.load_modelo_banco(this.state.campCarroId)
           sessionStorage.setItem('lognome', this.state.campNome);  


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

   carrega_veiculo() {
    const { validate } = this.state;
    api.get(`/veiculo/get/${sessionStorage.getItem('logVeiculo')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {          

          this.setState({   
            campCarro: res.data.data[0].marca,
            campModelo: res.data.data[0].modelo,
            camptipo_veiculo: res.data.data[0].tipoTransporte,
            campCarroId: res.data.data[0].marcaId,
            campModeloId: res.data.data[0].modeloId,
            campApolice: res.data.data[0].apolice,
            campSeguradoraId: res.data.data[0].seguradoraId,
            campPlaca: res.data.data[0].placa,
            campAnodut: res.data.data[0].anodut,            
            campAno: res.data.data[0].ano,
            campCor: res.data.data[0].cor,       
            campEngate: res.data.data[0].engate,       
            campCadeirinhaPequena: res.data.data[0].cadeirinha_pequena,       
            campCadeirinhaGrande: res.data.data[0].cadeirinha_grande,       
            campCadeiraRodas: res.data.data[0].cadeira_rodas,                
            inicio: 2,    
            validacao_ano: true,
            validacao_anodut: true,
            validacao_apolice: true,
            validacao_carro: true,
            validacao_cor: true,
            validacao_modelo: true, 
            validacao_placa: true,
            validacao_seguro: true,
            validacao_tipo_veiculo: true,
          })            

           this.buscaSeguradora(res.data.data[0].seguradoraId)
           this.load_modelo_banco(this.state.campCarroId)
           sessionStorage.setItem('lognome', this.state.campNome);  


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
    
 /* carroChange(e) {
    if (e != null) {    
       this.setState({ 
         campCarro: e.name
        }) 
       this.loadmodelo(e.id);
    } else {
      this.setState({ campCarro: '' }) 
    }
  } */
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
  tipoChange(e) {  
    this.setState({ camptipo_veiculo: e.target.value })  
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
  /* 
  seguroChange(e) {    
    if (e != null) {
       this.setState({ 
         campSeguradoraNome: e.nome,         
         campSeguradoraId: e.id,  
         //campSeguradoraNome: this.buscaSeguradora(e.id) 
        })
    } else {
      this.setState({ campSeguradoraNome: '' }) 
    } 
  }*/

  verificaCarro(e) {
    const { validate } = this.state
       if (this.state.campCarro.length == 0) {
     //  validate.carroState = ''    
        this.setState({ 
          validate,
          erro_carro: false,
          validacao_carro: false,
          mensagem_carro: '',
          inicio: 2, 
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
          mensagem_modelo: '',
          inicio: 2,   
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
          mensagem_ano: '',
          inicio: 2,   
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
          mensagem_anoDUT: '',
          inicio: 1,   
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
        mensagem_placa: '',
        inicio: 2,   
       })      
    }   
   }
   verificaTipo_veiculo(e) {
    const { validate } = this.state
    if (this.state.camptipo_veiculo == '') {      
      this.setState({ 
        validate,
        erro_tipo_veiculo: false,
        validacao_tipo_veiculo: false,
        mensagem_tipo_veiculo: '',
        inicio: 1,   
       })      
    } else {
      this.setState({ 
        validate,
        erro_tipo_veiculo: false,
        validacao_tipo_veiculo: true,
        mensagem_tipo_veiculo: '',
        inicio: 2,   
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
          mensagem_cor: '',
          inicio: 1,   
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
          mensagem_apolice: '',
          inicio: 2,   
         })      
       } else {
        this.setState({ 
          validate,
          erro_apolice: false,
          validacao_apolice: true,
          mensagem_apolice: '',
          inicio: 2,   
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
          mensagem_seguro: '',
          inicio: 1,   
         })      
       } else {
        this.setState({ 
          validate,
          erro_seguro: false,
          validacao_seguro: true,
          mensagem_seguro: '',
          inicio: 2,   
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
          mensagem_carro: '' ,
          inicio: 1, 
        })  
      } else {
        validate.carroState = 'has-success'       
        this.setState({ 
          erro_carro: false,
          validacao_carro: true,
          mensagem_carro: '',
          inicio: 2,  
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
          mensagem_carro: '' ,
          inicio: 1, 
        })          
      } else {
        validate.modeloState = 'has-success'       
        this.setState({ 
          erro_modelo: false,
          validacao_modelo: true,
          mensagem_carro: '',
          inicio: 2,  
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
          mensagem_cor: '',
          inicio: 1,  
        })  
      } else {
        validate.corState = 'has-success'       
        this.setState({ 
          erro_cor: false,
          validacao_cor: true,
          mensagem_cor: '',
          inicio: 2,  
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
          mensagem_placa: '',
          inicio: 1,  
        })  
      } else if (e.target.value.length == 7) {
        validate.placaState = 'has-success'       
        this.setState({ 
          erro_placa: false,
          validacao_placa: true,
          mensagem_placa: '',
          inicio: 2,  
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
          mensagem_ano: '',
          inicio: 1, 
        })  
      } else {
        validate.anoState = 'has-success'       
        this.setState({ 
          erro_ano: false,
          validacao_ano: true,
          mensagem_ano: '',
          inicio: 2,  
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
          mensagem_anoDUT: '',
          inicio: 1,  
        })  
      } else {
        validate.anoDUTState = 'has-success'       
        this.setState({ 
          erro_anodut: false,
          validacao_anodut: true,
          mensagem_anoDUT: '',
          inicio: 2,  
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
          mensagem_telefone1: '' ,
          inicio: 1, 
        })  
      } else {
        validate.apoliceState = 'has-success'       
        this.setState({ 
          erro_apolice: false,
          validacao_apolice: true,
          mensagem_telefone1: '',
          inicio: 2,  
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
          mensagem_seguro: '',
          inicio: 1,  
        })  
      } else {
        validate.seguroState = 'has-success'       
        this.setState({ 
          erro_seguro: false,
          validacao_seguro: true,
          mensagem_seguro: '',
          inicio: 2, 
        })  
      }  
      this.setState({ validate })
  }
  loadEstados(){
  
    api.get('/estado/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listEstados:data})
      }
      else {
        alert('Lista vazia')
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  limpar_cnpj_nao_encontrado() {
    this.setState({      
      campCnpj:"",          
      campNome: "",
      campNome_fantasia:"",      
    });
   } 

   estadoChange(event) {     
    this.setState({        
        campEstadoId: event.target.value
    });    
 } 

 loadmarcas() {
  const { validate } = this.state  
    
    api.get('http://fipeapi.appspot.com/api/1/carros/marcas.json')
    .then((val)=>{
      
      if (val.data !== null) {
    //    console.log('teste - '+JSON.stringify(val.data, null, "    "));
        this.setState({ 
          lista: val.data     
        });  
  //      console.log('listaMarcas - '+JSON.stringify(this.state, null, "    "));    
      } 
    
     // console.log('callapi: ' + JSON.stringify(val))
    }).catch(error=>{
      validate.cnpjState = 'has-danger'
        this.setState({           
            mensagem_carro: 'Lista não encontrada wqqwq' 
        })  
    })
     //})
  //.catch((error) => console.log('callapi:'+ JSON.stringify(error)));  
 }

 loadmodelo(modelo) {
  const { validate } = this.state  
    console.log('modelo')
//    console.log(`http://fipeapi.appspot.com/api/1/carros/veiculos/${modelo}.json`)

    api.get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${modelo}.json`)
    .then((val)=>{      
      if (val.data !== null) {

        this.setState({ 
          listaModelos: val.data     
        });  

       // console.log(JSON.stringify(this.state.lista, null, "    "));

      } else {
         validate.cnpjState = 'has-danger'
         this.setState({ mensagem_CNPJ: 'Lista não encontrada' })  
      }
        
     // console.log('callapi: ' + JSON.stringify(val))
    }).catch(error=>{
      validate.cnpjState = 'has-danger'
      this.setState({           
          mensagem_CNPJ: 'Lista não encontrada' 
       })  
    })
     //})
  //.catch((error) => console.log('callapi:'+ JSON.stringify(error)));  
 }

loadFillData(){
  
  return this.state.listaVeiculos.map((data)=>{          
    return(
      <option key={data.name} value={data.name}>{data.name} </option>
    )
  })
}
loadtipoTransporte(){  
  
  return this.state.listTipoTransporte.map((data)=>{          
    return(
       <MenuItem value={data.descricao}>{data.descricao}</MenuItem>      
    )
  })
}
verifica_botao(inicio) {
  const { validate } = this.state  
  console.log(' validate '+ JSON.stringify(validate)); 
    
   /*  if (this.state.validacao_carro == true && this.state.validacao_modelo == true
      && this.state.validacao_ano == true && this.state.validacao_apolice == true
      && this.state.validacao_seguro == true && this.state.validacao_cor == true
      && this.state.validacao_anodut == true) { */ 
    if (this.state.validacao_ano == true && this.state.validacao_seguro == true 
          && this.state.validacao_cor == true && this.state.validacao_anodut == true
          && this.state.validacao_tipo_veiculo == true) {
        return ( 
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
            </Box>           
        );    
    } else {
      
      return (
        <Box bgcolor="error.main" color="error.contrastText" className="botoes_desabilitado" p={2} >
        <div className="d-flex justify-content-center">
            Próximo
        </div>     
        </Box>           
      );
    }     
  

  } 

  loadSeguradorasData(){
  
    return this.state.listSeguradoras.map((data)=>{          
      return(
        <MenuItem value={data.id}>{data.nome}</MenuItem>             
      )
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

   buscaMarca(id) { 
    //let marca_saida = ''      
    console.log('id entrada Marca - '+id);
      this.state.listaMarcas.map((data)=>{          
         if (data.id == id) {
            console.log('buscaMarca - '+data.name);     
            sessionStorage.setItem('logMarca', data.name)
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
         sessionStorage.setItem('logModelo', data.name)
         //modelo_saida = data.name                       
       }
     }) 
   /*  console.log('id saida Modelo - '+modelo_saida);
     this.setState({           
      campModeloNovo: modelo_saida     */
   
 }
sendUpdate(){
  //this.state.listaMarcas[this.state.campCarro].name,
  //this.state.listaModelos[this.state.campModelo].name  
 // this.buscaSeguradoraNome(this.state.campSeguradoraNome);

 debugger;
   this.buscaMarca(this.state.campCarroId);
   this.buscaModelo(this.state.campModeloId);
  const datapost = {
    marcaId: this.state.campCarroId, 
    modeloId: this.state.campModeloId,
    marca: sessionStorage.getItem('logMarca'), 
    modelo: sessionStorage.getItem('logModelo'),
    tipoTransporte: this.state.camptipo_veiculo,
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
    motoristaId: sessionStorage.getItem('logid')
  }          

  console.log('state- '+ JSON.stringify(this.state.incluir, null, "    "));       
  console.log('veiculo motorista - '+ JSON.stringify(datapost, null, "    "));       
  debugger;
      if (this.state.incluir == true) {        

        api.post("/veiculo/create", datapost)
        .then(response=>{
         // console.log('response - '+response);
         // if (response.data.success==true) {                        
          
            debugger;
          //   console.log('VEICULO SUCESSO ');
              sessionStorage.setItem('logVeiculo', response.data.data.id)

              if (sessionStorage.getItem('logperfil') == 1) {
                this.props.history.push(`/documentos_motorista_incluir/`+sessionStorage.getItem('logid')); 
              } else if (sessionStorage.getItem('logperfil') == 3) {
                this.props.history.push(`/area_motorista`);                
              } else if (sessionStorage.getItem('logperfil') == 0) {                 
                this.props.history.push(`/documentos_motorista_incluir/`+sessionStorage.getItem('logid'));                  
              }      
      //    }
        
        }).catch(error=>{
          alert("Erro verificar log  "+error)
        })        
      } else {      

        console.log(JSON.stringify(datapost, null, "    "));        
        api.put(`/veiculo/update/${sessionStorage.getItem('logid')}`, datapost)
          .then(response=>{
            if (response.data.success==true) {                        
            
                if (sessionStorage.getItem('logperfil') == 1) {
                  this.props.history.push(`/documentos_motorista_incluir/`+sessionStorage.getItem('logid')); 
                } else if (sessionStorage.getItem('logperfil') == 3) {
                  this.props.history.push(`/area_motorista`);                
                } else if (sessionStorage.getItem('logperfil') == 0) {                 
                  this.props.history.push(`/documentos_motorista_incluir/`+sessionStorage.getItem('logid'));                  
                }      
                
            }
            else {
              alert("Error conexão ")              
            }
          }).catch(error=>{
            alert("Erro verificar log  ")
          })        
     }   
     
     if (sessionStorage.getItem('logperfil') == 1) {
      this.props.history.push(`/documentos_motorista_incluir/`+sessionStorage.getItem('logid')); 
    } else if (sessionStorage.getItem('logperfil') == 3) {
      this.props.history.push(`/area_motorista`);                
    } else if (sessionStorage.getItem('logperfil') == 0) {                 
      this.props.history.push(`/documentos_motorista_incluir/`+sessionStorage.getItem('logid'));                  
    }   
}  

verificar_menu() {   
  return(
    <div>
     <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={`/endereco_motorista_incluir/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                    <div> {this.verifica_nome_motorista(this.state.campNome)}, cadastre o seu veículo.</div>
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                            
                  </div>   
               </div>   
             
          </div>              
          <div>
                <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>
   </div>         
   );

}
verificar_menu_lateral() {

  if (sessionStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (sessionStorage.getItem('logperfil') == 3) {
   return( 
     <Menu_motorista />     
   );
  }

}

render(){  

return (
<div>    
<div>
<div className="d-flex justify-content"> 
<div className="d-flex justify-content-start"> 
      <div className="area_direita">   
          <div>   
            <img className="titulo_logo" src="../logo.png"/>
         </div>      
      </div>    
   </div>
   <div className="area_esquerda">     
         {this.verificar_menu()}        
          <div class="d-flex flex-column espacamento_caixa_texto">              
              <div class="p-2">               
                  <div class="d-flex justify-content-start">
                       <div> 
                       <FormControl variant="outlined">
                            <InputLabel className="label_marca_direita_motorista" id="demo-simple-select-outlined-label">Marca </InputLabel>
                            <Select                                                 
                              autoComplete="off"                     
                              className="text_marca_direita_motorista"                                                
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
                       <div>   
                       <FormControl variant="outlined">
                            <InputLabel className="label_marca_esquerda_motorista" id="demo-simple-select-outlined-label">Modelo </InputLabel>
                            <Select                                                 
                              autoComplete="off"                     
                              className="text_marca_esquerda_motorista"                                                
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
                              <InputLabel className="label_tipo_direita_motorista" id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                              <Select
                                className="text_tipo_direita_motorista"
                                error={this.state.erro_tipo_veiculo} 
                                helperText={this.state.mensagem_tipo_veiculo}
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={this.state.camptipo_veiculo}
                                onFocus={this.verificaTipo_veiculo}
                                //onClick={this.verificaTipo_veiculo}
                                onChange={ (e) => {
                                  this.tipoChange(e)
                                }}   

                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_tipo_veiculo? <CheckIcon />: ''}
                                  </InputAdornment>
                                }     
                                label="Tipo Transporte"
                              >
                                {this.loadtipoTransporte()}                    
                              </Select>
                            </FormControl>  
                       </div>
                       <div>
                       <FormControl variant="outlined">
                          <InputLabel className="label_placa_direita_motorista" htmlFor="filled-adornment-password">Placa</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_placa}
                              helperText={this.state.mensagem_placa}
                              className="text_placa_direita_motorista"                       
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
                          <InputLabel className="label_placa_esquerda_motorista" htmlFor="filled-adornment-password">Ano</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_ano}
                              helperText={this.state.mensagem_ano}
                              className="text_placa_esquerda_motorista"                       
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
                          <InputLabel className="label_marca_direita_motorista" htmlFor="filled-adornment-password">Cor</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_cor}
                              helperText={this.state.mensagem_cor}
                              className="text_marca_direita_motorista"                       
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
                          <FormHelperText error={this.state.erro_cep}>
                                {this.state.mensagem_cor}
                          </FormHelperText>
                        </FormControl>                          
                       </div>
                       <div>
                       <FormControl variant="outlined">
                          <InputLabel className="label_marca_esquerda_motorista" htmlFor="filled-adornment-password">Ano do DUT</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_anodut}
                              helperText={this.state.mensagem_anoDUT}
                              className="text_marca_esquerda_motorista"                       
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
                                          <InputLabel className="label_marca_direita_motorista" id="demo-simple-select-outlined-label">Seguradora </InputLabel>
                                          <Select                                                 
                                            autoComplete="off"                     
                                            className="text_marca_direita_motorista"                                                
                                            labelId="demo-simple-select-outlined-label"
                                            id="busca"
                                            value={this.state.campSeguradoraId}                          
                                            onBlur={this.verificaSeguro}
                                            onChange={ (e) => {
                                              this.seguradoraChange(e)                       
                                              this.validaSeguroChange(e)
                                            }}  
                                            endAdornment={
                                              <InputAdornment position="end">
                                                  {this.state.validacao_seguro? <CheckIcon />: ''}
                                              </InputAdornment>
                                            }                                                                               
                                            labelWidth={110}   
                                          >          
                                          <MenuItem value={0}>Selecione a seguradora</MenuItem>                                         
                                            {this.loadSeguradorasData()}                    
                                            </Select>
                                        </FormControl>
                     </div>
                     <div>
                     <FormControl variant="outlined">
                          <InputLabel className="label_marca_esquerda_motorista" htmlFor="filled-adornment-password">Número Apólice</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_apolice}
                              helperText={this.state.mensagem_apolice}
                              className="text_marca_esquerda_motorista"                
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
            <div class="p-2">    
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
            <div class="p-2">    
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
            </div>       
            {this.verifica_botao(this.state.inicio)}                                       
    </div>                 
   </div>  
 </div>  
</div> 
  );
} 
}
export default empresarialComponent;