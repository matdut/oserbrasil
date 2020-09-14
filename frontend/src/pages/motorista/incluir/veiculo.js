import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import Autocomplete1 from 'react-autocomplete';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Menu_motorista from '../menu_motorista';
import Menu_administrador from '../../administrador/menu_administrador';

import api from '../../../services/api';
import '../motorista.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
//const cep_empresa = localStorage.getItem('logcep');     
//const userId = localStorage.getItem('logid');
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
    this.carrega_veiculo = this.carrega_veiculo.bind(this);      
    
  }

  componentDidMount(){      

    let userId = this.props.match.params.id;

    if (userId !== 0) {
      localStorage.setItem('logid', userId);     
    
    } 

    if (localStorage.getItem('logVeiculo') > 0) {
       this.carrega_veiculo();                       
    } else {
      this.setState({ 
        incluir: true
      })
    }
    
    this.carrega_motorista() 
    this.setState({          
      perfillog: localStorage.getItem('logperfil')
    });  

    this.setState({      
      progresso: 50
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
    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
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

   carrega_veiculo() {
    const { validate } = this.state;
    api.get(`/veiculo/get/${localStorage.getItem('logVeiculo')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {          

          this.setState({   
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
            inicio: 2       
          })            

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
  if (inicio == 1) {
    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
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
sendUpdate(){
  //this.state.listaMarcas[this.state.campCarro].name,
  //this.state.listaModelos[this.state.campModelo].name  
 // this.buscaSeguradoraNome(this.state.campSeguradoraNome);

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
    motoristaId: localStorage.getItem('logid')
  }          
  console.log('state- '+ JSON.stringify(this.state.incluir, null, "    "));       
  console.log('veiculo motorista - '+ JSON.stringify(datapost, null, "    "));       
  
      if (this.state.incluir == true) {        

        api.post("/veiculo/create", datapost)
        .then(response=>{
         // console.log('response - '+response);
          if (response.data.success==true) {                        
          
          //   console.log('VEICULO SUCESSO ');
              localStorage.setItem('logVeiculo', response.data.data.id)

              if (localStorage.getItem('logperfil') == 1) {
                this.props.history.push(`/documentos_motorista_incluir/`+localStorage.getItem('logid')); 
              } else if (localStorage.getItem('logperfil') == 3) {
                this.props.history.push(`/area_motorista`);                
              } else if (localStorage.getItem('logperfil') == 0) {                 
                this.props.history.push(`/documentos_motorista_incluir/`+localStorage.getItem('logid'));                  
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
        api.put(`/veiculo/update/${localStorage.getItem('logid')}`, datapost)
          .then(response=>{
            if (response.data.success==true) {                        
            
                if (localStorage.getItem('logperfil') == 1) {
                  this.props.history.push(`/documentos_motorista_incluir/`+localStorage.getItem('logid')); 
                } else if (localStorage.getItem('logperfil') == 3) {
                  this.props.history.push(`/area_motorista`);                
                } else if (localStorage.getItem('logperfil') == 0) {                 
                  this.props.history.push(`/documentos_motorista_incluir/`+localStorage.getItem('logid'));                  
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

  if (localStorage.getItem('logperfil') == 0) {
   
   return(
    <div>
     <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={`/endereco_motorista_incluir/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
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

  } else if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
    return(
      <div>
      <div className="d-flex justify-content-around">
                <div className="botao_navegacao">
                  <Link to={`/endereco_motorista_incluir/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
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

  } else if (localStorage.getItem('logperfil') == 3) { // CLIENTE MOTORISTA

    return(
      <div>
      <div className="d-flex justify-content-around">
                <div className="botao_navegacao">              
                </div>                  
                <div>
                  <div className="titulo_representante">                
                  <div> {this.verifica_nome_motorista(this.state.campNome)}, altere o seu veículo.</div>      
                  </div>
                </div>   
                
                <div>
                   <div className="botao_navegacao">                    
                   </div>   
                </div>   
              
           </div>                        
    </div>    
      );

  }


}
verificar_menu_lateral() {

  if (localStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (localStorage.getItem('logperfil') == 3) {
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
                       <label for="inputAddress">Marca *</label>
                          <Input 
                              disabled = {this.state.dado_cadastral_disabled}   
                              type="select" 
                              name="select"                               
                              id="exampleSelect" 
                              className="autocomplete_marca"                              
                              value={this.state.campCarroId}
                              valid={ this.state.validate.carroState === 'has-success' }
                              invalid={ this.state.validate.carroState === 'has-danger' }
                              onBlur={this.verificaCarro}
                              //onFocus={this.verificaCarro}
                              onChange={ (e) => {
                                this.carroChange(e)                       
                                this.validaCarroChange(e)
                              }}                                                          >
                              <option selected>Selecione a marca</option>               
                              {this.loadMarcaData()}      
                          </Input>                         
                          <FormFeedback 
                            invalid={this.state.validate.carroState}>
                                {this.state.mensagem_carro}
                          </FormFeedback>                                            
                       </div> 
                       
                       <div>         
                       <label className="texto_modelo" for="inputAddress">Modelo *</label>
                          <Input 
                              disabled = {this.state.dado_cadastral_disabled}   
                              type="select" 
                              className="autocomplete_modelo"
                              name="select"                               
                              id="exampleSelect" 
                              value={this.state.campModeloId}
                              valid={ this.state.validate.modeloState === 'has-success' }
                              invalid={ this.state.validate.modeloState === 'has-danger' }
                              onBlur={this.verificaModelo}
                              onChange={ (e) => {
                                this.modeloChange(e)                       
                                this.validaModeloChange(e)
                              }}                                                          >
                              <option selected>Selecione o modelo</option>               
                              { this.loadModelosData() }      
                          </Input>
                          <FormFeedback 
                            invalid={this.state.validate.modeloState}>
                                {this.state.mensagem_modelo}
                          </FormFeedback>                             
                       </div>                        
                  </div>
              </div> 
              <div class="p-2">               
                  <div className="d-flex justify-content-start">
                       <div>
                       <label for="inputAddress" className="titulo_placa">Placa *</label>
                      <Input                    
                        type="text"
                        name="nome"
                        className="texto_placa"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campPlaca}
                        valid={ this.state.validate.placaState === 'has-success' }
                        invalid={ this.state.validate.placaState === 'has-danger' }
                        onBlur={this.verificaPlaca}
                       // onFocus={this.verificaPlaca}
                        onChange={ (e) => {
                          this.placaChange(e)                       
                          this.validaPlacaChange(e)
                        }}    
                        maxlength="8"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.placaState}>
                          {this.state.mensagem_placa}
                      </FormFeedback>    
                       </div> 
                       
                       <div>
                       <label for="inputAddress" className="titulo_ano">Ano *</label>
                      <Input              
                        type="text"
                        name="nome"
                        className="texto_ano"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campAno}
                        valid={ this.state.validate.anoState === 'has-success' }
                        invalid={ this.state.validate.anoState === 'has-danger' }
                        onBlur={this.verificaAno}
                        onChange={ (e) => {
                          this.anoChange(e)                       
                          this.validaAnoChange(e)
                        }}    
                        maxlength="4"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.anoState}>
                          {this.state.mensagem_ano}
                      </FormFeedback>    
                       </div>                        
                  </div>
              </div> 
              <div class="p-2">    
                <div class="d-flex justify-content-start">
                       <div>
                       <label for="inputAddress">Cor *</label>
                      <Input                    
                        type="text"
                        className="texto_cor"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campCor}
                        valid={ this.state.validate.corState === 'has-success' }
                        invalid={ this.state.validate.corState === 'has-danger' }
                        onBlur={this.verificaCor}
                        onChange={ (e) => {
                          this.corChange(e)                       
                          this.validaCorChange(e)
                        }}    
                        maxlength="20"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.corState}>
                          {this.state.mensagem_cor}
                      </FormFeedback>    
                       </div>
                       <div>
                       <label for="inputAddress" className="titulo_ano">Ano do DUT *</label>
                      <Input           
                        className="texto_ano"         
                        type="text"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campAnodut}
                        valid={ this.state.validate.anoDUTState === 'has-success' }
                        invalid={ this.state.validate.anoDUTState === 'has-danger' }
                        onBlur={this.verificaAnoDUT}
                        onChange={ (e) => {
                          this.anoDUTChange(e)                       
                          this.validaAnoDUTChange(e)
                        }}    
                        maxlength="4"                                                                     
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.anoDUTState}>
                          {this.state.mensagem_anoDUT}
                      </FormFeedback>    
                       </div>                                                       
                </div>    
            </div>      
            <div class="p-2">     
            <label for="inputAddress">Seguradora *</label>
                <Input 
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="select" 
                    name="select" 
                    className="seguro_select"
                    id="exampleSelect" 
                    value={this.state.campSeguradoraId}
                    valid={ this.state.validate.seguroState === 'has-success' }
                    invalid={ this.state.validate.seguroState === 'has-danger' }
                    onBlur={this.verificaSeguro}
                    onChange={ (e) => {
                      this.seguradoraChange(e)                       
                      this.validaSeguroChange(e)
                    }}                                                          >
                     <option selected>Selecione a seguradora</option>               
                     {this.loadSeguradorasData()}      
                </Input>
                <FormFeedback 
                  invalid={this.state.validate.seguroState}>
                       {this.state.mensagem_seguro}
                </FormFeedback>                                        
            </div> 
            <div class="p-2">    
            <label for="inputAddress" className="texto_apolice">Número Apólice *</label>
                        <Input                            
                            type="text"
                            className="texto_apolice"
                            name="nome"
                            id="examplnome"
                            placeholder=""
                            autoComplete='off'
                            autoCorrect='off'
                            value={this.state.campApolice}
                            valid={ this.state.validate.apoliceState === 'has-success' }
                            invalid={ this.state.validate.apoliceState === 'has-danger' }
                            onBlur={this.verificaApolice}
                            onChange={ (e) => {
                              this.apoliceChange(e)                       
                              this.validaApoliceChange(e)
                            }}    
                            maxlength="10"                                                                      
                          />                                
                          <FormFeedback 
                          invalid={this.state.validate.apoliceState}>
                              {this.state.mensagem_apolice}
                          </FormFeedback> 

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