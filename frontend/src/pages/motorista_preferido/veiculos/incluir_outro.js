import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Button, Alert } from 'reactstrap';
import Autocomplete1 from 'react-autocomplete';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import api from '../../../services/api';
import './veiculo.css';
import Select from '@material-ui/core/Select';

import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import CheckIcon from '@material-ui/icons/Check';

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
        mensagem_carro: '',  
        mensagem_placa: '',  
        mensagem_cor: '',  
        mensagem_ano: '',  
        mensagem_anoDUT: '',  
        mensagem_apolice: '',  
        mensagem_seguro: '',  
        mensagem_modelo: '', 
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
  }

  componentDidMount(){      

    let userId = this.props.match.params.id;

    if (userId !== 0) {
      sessionStorage.setItem('logid', userId);         
    } 

    if (sessionStorage.getItem('logperfil') == 3) {
      this.setState({ 
        incluir: true
      })
    }      
    this.carrega_motorista() 
    this.setState({          
      perfillog: sessionStorage.getItem('logperfil')
    });  

    this.setState({      
      progresso: 0
    });  

    this.loadSeguradoras()
   // this.loadmarcas();
    
    //if (this.state.listaMarcas.length == 0) {
   this.carrega_marca_banco()
    //}
    //this.verifica_botao(2)
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
        alert("Erro de conexão")
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
      alert("Error de conexão  "+error)
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
  anoChange(e) {
    this.setState({ campAno: e.target.value })
  }
  anoDUTChange(e) {
    this.setState({ 
       campAnodut: e.target.value, 
       progresso: 50 
    })
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
          mensagem_carro: ''
         })      
       }        
   }
   verificaModelo(e) {
    const { validate } = this.state
       if (e.target.value.length == "") {
        validate.modeloState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_modelo: 'O campo Modelo é obrigatório.'  
         })      
       }      
   }
   verificaAno(e) {
    const { validate } = this.state
       if (e.target.value.length == 0) {
        validate.anoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_ano: 'O campo Ano é obrigatório.'  
         })      
       }      
   }
   verificaAnoDUT(e) {
    const { validate } = this.state
       if (e.target.value.length == 0) {
        validate.anoDUTState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_anoDUT: 'Ano do DUT é obrigatório.'  
         })      
       }      
   }
   verificaPlaca(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.placaState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_placa: 'O campo Placa é obrigatório.'  
       })      
    }      
   }
   verificaCor() {
    const { validate } = this.state
       if (this.state.campCor.length == 0) {
        validate.corState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_cor: 'O campo Cor é obrigatório.'  
         })      
       }      
   }
   verificaApolice(e) {
    const { validate } = this.state
       if (e.target.value.length == 0) {
        validate.apoliceState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_apolice: 'O campo Apolice é obrigatório.'  
         })      
       }      
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

   validaCarroChange(e){
    //console.log('onchange - '+JSON.stringify(e.target.value, null, "    "));        
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        //validate.seguroState = 'has-danger'
        this.setState({ mensagem_carro: '' })  
      } else {
        validate.carroState = 'has-success'       
      }  
      this.setState({ validate })

  }
  validaModeloChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.modeloState = ''
        //this.setState({ mensagem_modelo: 'O campo Modelo é obrigatório.' })  
      } else {
        validate.modeloState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaCorChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.corState = ''
        this.setState({ mensagem_cor: '' })  
      } else {
        validate.corState = 'has-success'       
      }  
      this.setState({       
        validate })
  }
  validaPlacaChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.placaState = ''
        this.setState({ mensagem_placa: '' })  
      } else if (e.target.value.length == 7) {
        validate.placaState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaAnoChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.anoState = ''
        this.setState({ mensagem_ano: '' })  
      } else {
        validate.anoState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaAnoDUTChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.anoDUTState = ''
        this.setState({ mensagem_anoDUT: '' })  
      } else {
        validate.anoDUTState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaApoliceChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.apoliceState = ''
        this.setState({ mensagem_telefone1: '' })  
      } else {
        validate.apoliceState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaSeguroChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        //validate.seguroState = 'has-danger'
        this.setState({ mensagem_seguro: '' })  
      } else {
        validate.seguroState = 'has-success'       
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

verifica_botao(inicio) {
  const { validate } = this.state  
   //console.log(JSON.stringify(this.state, null, "    "));
   // console.log(JSON.stringify(inicio, null, "    "));
   console.log(JSON.stringify(this.state, null, "    ")); 
   if (sessionStorage.getItem('logperfil') == 0) {
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Próximo </label>
                    </div>     
              </Box>           
          );   
        } else {
          
          if (validate.carroState == 'has-success' && validate.modeloState  == 'has-success' 
            && validate.anoState == 'has-success' && validate.apoliceState == 'has-success' 
            && validate.seguroState == 'has-success' && validate.corState == 'has-success'
            && validate.anoDUTState == 'has-success') {
              return ( 
                <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                        <div className="d-flex justify-content-center">
                        <label> Próximo </label>
                        </div>     
                  </Box>           
              );    
          } else {
            
            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_veiculo" p={2} >
              <div className="d-flex justify-content-center">
                  Próximo
              </div>     
              </Box>           
            );
          }     
        }
      } else  if (sessionStorage.getItem('logperfil') == 1) {    
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Próximo </label>
                    </div>     
              </Box>           
          );   
        } else {

          if (validate.carroState == 'has-success' && validate.modeloState  == 'has-success' 
            && validate.anoState == 'has-success' && validate.apoliceState == 'has-success' 
            && validate.seguroState == 'has-success' && validate.corState == 'has-success'
            && validate.anoDUTState == 'has-success') {
              return ( 
                <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                        <div className="d-flex justify-content-center">
                        <label> Próximo </label>
                        </div>     
                  </Box>           
              );    
          } else {
            
            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_veiculo" p={2}>
              <div className="d-flex justify-content-center">
              <label> Próximo </label>
              </div>     
              </Box>           
            );
          }     
        }
      } else  if (sessionStorage.getItem('logperfil') == 3) {    
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo"  p={2} >
                    <div className="d-flex justify-content-center">
                     <label> Próximo </label>
                    </div>     
              </Box>           
          );   
        } else {

          if (validate.carroState == 'has-success' && validate.modeloState  == 'has-success' 
          && validate.anoState == 'has-success' && validate.apoliceState == 'has-success' 
          && validate.seguroState == 'has-success' && validate.corState == 'has-success'
          && validate.anoDUTState == 'has-success') {
              return ( 
                <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                        <div className="d-flex justify-content-center">
                        <label> Próximo </label>
                        </div>     
                  </Box>           
              );    
          } else {
            
            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_veiculo" p={2}>
              <div className="d-flex justify-content-center">
              <label> Próximo </label>
              </div>     
              </Box>           
            );
          }     
        }
      }  
  } 

  loadSeguradorasData(){
  
    return this.state.listSeguradoras.map((data)=>{          
      return(
        <option key={data.nome} value={data.id}>{data.nome} </option>
      )
    })     
  
   }

   loadMarcaData(){
    console.log(' marcas - '+JSON.stringify(this.state.listaMarcas, null, "    "));           
    return this.state.listaMarcas.map((data)=>{          
      return(
        <option key={data.name} value={data.id}>{data.name} </option>
      )
    })     
  
   }

   loadModelosData(){
  
    return this.state.listaModelos.map((data)=>{          
      return(
        <option key={data.name} value={data.id}>{data.name} </option>
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

   this.buscaMarca(this.state.campCarroId);
   this.buscaModelo(this.state.campModeloId);
  const datapost = {
    marcaId: this.state.campCarroId, 
    modeloId: this.state.campModeloId,
    marca: sessionStorage.getItem('logMarca'), 
    modelo: sessionStorage.getItem('logModelo'),
    seguradoraId: this.state.campSeguradoraId,
    apolice: this.state.campApolice,
    placa: this.state.campPlaca,
    ano: this.state.campAno,
    anodut: this.state.campAnodut,
    cor: this.state.campCor,    
    motoristaId: sessionStorage.getItem('logid')
  }         
  
      if (this.state.incluir == true) {        

        api.post("/veiculo/create", datapost)
        .then(response=>{
          console.log('response - '+response);
          if (response.data.success==true) {                        
          
          //   console.log('VEICULO SUCESSO ');
              sessionStorage.setItem('logVeiculo', response.data.data.id)

              if (sessionStorage.getItem('logperfil') == 1) {
                this.props.history.push(`/documentos_motorista/`+sessionStorage.getItem('logid')); 
              } else if (sessionStorage.getItem('logperfil') == 3) {
                this.props.history.push(`/incluir_documentos/`+sessionStorage.getItem('logid'));                                
              }      
          }
          else {
            alert("Error conexão ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })        
      } else {      

        console.log(JSON.stringify(datapost, null, "    "));        
        api.put(`/veiculo/update/${sessionStorage.getItem('logid')}`, datapost)
          .then(response=>{
            if (response.data.success==true) {                        
            
                if (sessionStorage.getItem('logperfil') == 1) {
                  this.props.history.push(`/documentos_motorista/`+sessionStorage.getItem('logid')); 
                } else if (sessionStorage.getItem('logperfil') == 3) {
                  this.props.history.push(`/area_motorista`);                
                } else if (sessionStorage.getItem('logperfil') == 0) {                 
                  this.props.history.push(`/documentos_motorista/`+sessionStorage.getItem('logid'));                  
                }      
            }
            else {
              alert("Error conexão ")              
            }
          }).catch(error=>{
            alert("Erro verificar log  ")
          })        
     }    
}  

verificar_menu() {   

  if (sessionStorage.getItem('logperfil') == 0) {
   
   return(
    <div>
     <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={`/endereco_motorista/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                    <div> {this.verifica_nome_motorista(this.state.campNome)}, cadastre o seu veículo.</div>
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
    
                  </div>   
               </div>   
             
          </div>              
          <div>
                <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>
   </div>         
   );

  } else if (sessionStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
    return(
      <div>
      <div className="d-flex justify-content-around">
                <div className="botao_navegacao">
                  <Link to={`/endereco_motorista/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
                </div>                  
                <div>
                  <div className="titulo_representante">                
                  <div> {this.verifica_nome_motorista(this.state.campNome)}, cadastre o seu veículo.</div>       
                  </div>
                </div>   
                
                <div>
                   <div className="botao_navegacao">
    
                   </div>   
                </div>   
              
           </div>              
           <div>
                 <Progress color="warning" value={this.state.progresso} className="progressbar"/>
           </div>
    </div>    
      );

  } else if (sessionStorage.getItem('logperfil') == 3) { // CLIENTE MOTORISTA

    return(
      <div>
      <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={`/endereco_motorista/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                    <div> {this.verifica_nome_motorista(this.state.campNome)}, cadastre o seu veículo.</div>
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
    
                  </div>   
               </div>   
             
          </div>              
          <div>
                <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>        
    </div>    
      );

  }


}

render(){  

return (
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
                            <InputLabel className="label_marca_autocomplete_motorista" id="demo-simple-select-outlined-label">Marca </InputLabel>
                            <Select                                                 
                              autoComplete="off"                     
                              className="text_marca_autocomplete_motorista"                                                
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
                              error={this.state.erro_cep}
                              helperText={this.state.mensagem_cep}
                              className="text_placa_motorista"                       
                              id="cep_incluir"                      
                              variant="outlined"
                              value={this.state.campPlaca}
                              onBlur={this.verificaPlaca}                    
                              onChange={ (e) => {
                                this.placaChange(e)                       
                                this.validaPlacaChange(e)
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
                       <FormControl variant="outlined">
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
                                this.validaAnoChange(e)
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
                       <FormControl variant="outlined">
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
                                this.validaCorChange(e)
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
                       <FormControl variant="outlined">
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
                                this.validaAnoDUTChange(e)
                              }}                        
                              maxlength="9"     
                            endAdornment={
                              <InputAdornment position="end">
                                  {this.state.validacao_cep? <CheckIcon />: ''}
                              </InputAdornment>
                            }
                            labelWidth={80}
                          />                  
                          <FormHelperText error={this.state.erro_cep}>
                                {this.state.mensagem_cep}
                          </FormHelperText>
                        </FormControl>                           
                       </div>                                                       
                </div>    
            </div>      
            <div class="p-2">     
            <FormControl variant="outlined">
                            <InputLabel className="label_seguradora_autocomplete_motorista" id="demo-simple-select-outlined-label">Seguradora </InputLabel>
                            <Select                                                 
                              autoComplete="off"                     
                              className="text_seguradora_autocomplete_motorista"                                                
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
            <div class="p-2">    
            <FormControl variant="outlined">
                          <InputLabel className="label_apolice_text_motorista" htmlFor="filled-adornment-password">Número Apólice</InputLabel>
                          <OutlinedInput 
                              autoComplete="off"                                   
                              type="text"                       
                              error={this.state.erro_cep}
                              helperText={this.state.mensagem_cep}
                              className="text_apolice_motorista"                
                              id="cep_incluir"                      
                              variant="outlined"
                              value={this.state.campApolice}                           
                              onBlur={this.verificaApolice}
                              onChange={ (e) => {
                                this.apoliceChange(e)                       
                                this.validaApoliceChange(e)
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
            {this.verifica_botao(this.state.inicio)}                                       
    </div>                 
   </div>  
</div> 
  );
} 
}
export default empresarialComponent;