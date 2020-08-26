import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import Autocomplete1 from 'react-autocomplete';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api';
import './motorista.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
//const cep_empresa = localStorage.getItem('logcep');     
//const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campCarro: "",
      campModelo: "",
      campPlaca: "",
      campAno: "",
      campCor: "",
      campNome: "",
      campApolice: "",
      campSeguradoraNome: "",
      perfillog: null,
      campSeguradoraId: 0,
      lista:[],
      listEstados:[],
      listaMarcas:[],
      listaModelos:[],
      listSeguradoras:[],      
        mensagem_carro: '',  
        mensagem_placa: '',  
        mensagem_cor: '',  
        mensagem_ano: '',  
        mensagem_apolice: '',  
        mensagem_seguro: '',  
        mensagem_modelo: '', 
      validate: {         
        carroState: '',          
        modeloState: '',          
        corState: '',     
        placaState: '',     
        anoState: '',     
        apoliceState: '',     
        seguroState: '',     
      }    
    }
   
    this.carroChange = this.carroChange.bind(this);
    this.modeloChange = this.modeloChange.bind(this);
    this.corChange = this.corChange.bind(this);      
    this.placaChange = this.placaChange.bind(this);
    this.anoChange = this.anoChange.bind(this);  
    this.apoliceChange = this.apoliceChange.bind(this);
    this.seguroChange = this.seguroChange.bind(this);  
    
    this.verificaCarro = this.verificaCarro.bind(this);  
    this.verificaModelo = this.verificaModelo.bind(this);  
    this.verificaCor = this.verificaCor.bind(this);  
    this.verificaAno = this.verificaAno.bind(this);  
    this.verificaPlaca = this.verificaPlaca.bind(this);  
    this.verificaApolice = this.verificaApolice.bind(this);  
    this.verificaSeguro = this.verificaSeguro.bind(this);  

    this.validaCarroChange = this.validaCarroChange.bind(this);  
    this.validaModeloChange = this.validaModeloChange.bind(this);  
    this.validaCorChange = this.validaCorChange.bind(this);  
    this.validaAnoChange = this.validaAnoChange.bind(this);  
    this.validaPlacaChange = this.validaPlacaChange.bind(this);  
    this.validaApoliceChange = this.validaApoliceChange.bind(this);  
    this.validaSeguroChange = this.validaSeguroChange.bind(this);  
  }

  componentDidMount(){      

    let userId = this.props.match.params.id;

    if (userId !== 0) {
      localStorage.setItem('logid', userId);
    }
    this.setState({          
      perfillog: localStorage.getItem('logperfil')
    });  

    this.setState({      
      progresso: 50
    });  

    this.loadSeguradoras()
    this.loadmarcas()    

  
    this.carrega_motorista()
  
  }

  verifica_nome_motorista(nome){
    return(    
         nome.substring(0,nome.indexOf(" "))                          
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
  
    if (id !== null) {
      //const baseUrl = "http://34.210.56.22:3333"
      //const url = baseUrl+"/seguradora/list"
      api.get(`seguradora/get/${id}`)
      .then(res=>{
        if (res.data.success) {
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

  carrega_motorista() {
    const { validate } = this.state;
    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {
           
          this.setState({   
            campCarro: res.data.data[0].carro,
            campModelo: res.data.data[0].modelo,
            campPlaca: res.data.data[0].placa,
            campAno: res.data.data[0].ano,
            campCor: res.data.data[0].cor,
            campApolice: res.data.data[0].apolice,
            campSeguradoraId: res.data.data[0].seguradoraId,
            campNome: res.data.data[0].nome, 
            campSeguradoraNome: this.buscaSeguradora(res.data.data[0].seguradoraId),
            inicio: 1       
          })  

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

       /*   if (this.state.campCarro == "") {
            const datamarca = {
              id: 0, 
              name: ' '
            }
            this.setState({   
              campCarro: datamarca
            })
          } */
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
          if (this.state.campCor !== "") {
            validate.corState = 'has-success'      
          }   
          if (this.state.campApolice !== "") {
            validate.apoliceState = 'has-success'      
          }   
          if (this.state.campSeguradoraId !== 0) {
            validate.seguroState = 'has-success'      
          }             

          this.setState({ validate })
        }  
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
    }
 
 /*   carroChange(e) {     
        console.log('opcao selecionada '+e.target.value)
         this.setState({ campCarro: e.target.value }) 
         this.loadmodelo(e.target.id);
    }*/
    
  carroChange(e) {
    if (e != null) {    
       this.setState({ campCarro: e.name }) 
       this.loadmodelo(e.id);
    }
  }
  modeloChange(e) {   
    if (e != null) {
       this.setState({ campModelo: e.name })
    }   
  }
  corChange(e) {
    this.setState({ campCor: e.target.value })
  }
  anoChange(e) {
    this.setState({ campAno: e.target.value })
  }
  placaChange(e) {
    this.setState({ campPlaca: e.target.value })
  }
  apoliceChange(e) {
    this.setState({ campApolice: e.target.value })
  }
  seguroChange(e) {
    if (e != null) {
       this.setState({ campSeguradoraId: e.id })
    }   
  }

  verificaCarro() {
    const { validate } = this.state
       if (this.state.campCarro.length == 0) {
        validate.carroState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_carro: 'O campo Carro é obrigatório.'  
         })      
       }      
   }
   verificaModelo() {
    const { validate } = this.state
       if (this.state.campModelo.length == 0) {
        validate.modeloState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_modelo: 'O campo Modelo é obrigatório.'  
         })      
       }      
   }
   verificaAno() {
    const { validate } = this.state
       if (this.state.campAno.length == 0) {
        validate.anoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_ano: 'O campo Ano é obrigatório.'  
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
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.carroState = 'has-danger'
        this.setState({ mensagem_carro: 'O campo Carro é obrigatório.' })  
      } else {
        validate.carroState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaModeloChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.modeloState = 'has-danger'
        this.setState({ mensagem_modelo: 'O campo Modelo é obrigatório.' })  
      } else {
        validate.modeloState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaCorChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.corState = 'has-danger'
        this.setState({ mensagem_cor: 'O campo Cor é obrigatório.' })  
      } else {
        validate.corState = 'has-success'       
      }  
      this.setState({ 
        inicio: 2,
        validate })
  }
  validaPlacaChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.placaState = 'has-danger'
        this.setState({ mensagem_placa: 'O campo Placa é obrigatório.' })  
      } else {
        validate.placaState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaAnoChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.anoState = 'has-danger'
        this.setState({ mensagem_ano: 'O campo Ano é obrigatório.' })  
      } else {
        validate.anoState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaApoliceChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.apoliceState = 'has-danger'
        this.setState({ mensagem_telefone1: 'O campo Apolice é obrigatório.' })  
      } else {
        validate.apoliceState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaSeguroChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.seguroState = 'has-danger'
        this.setState({ mensagem_seguro: 'O campo Seguro é obrigatório.' })  
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
      console.log(JSON.stringify(val.data, null, "    "));
      if (val.data !== null) {

        this.setState({ 
          listaMarcas: val.data     
        });  
        
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

 loadmodelo(modelo) {
  const { validate } = this.state  
    console.log('modelo')
    console.log(`http://fipeapi.appspot.com/api/1/carros/veiculos/${modelo}.json`)

    api.get(`http://fipeapi.appspot.com/api/1/carros/veiculos/${modelo}.json`)
    .then((val)=>{      
      if (val.data !== null) {

        this.setState({ 
          lista: val.data     
        });  

        console.log(JSON.stringify(this.state.lista, null, "    "));

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
   if (localStorage.getItem('logperfil') == 0) {
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo"  p={2} onClick={()=>this.sendUpdate()}>
                    <div className="d-flex justify-content-center">
                        Próximo
                    </div>     
              </Box>           
          );   
        } else {

          if (validate.anoState == 'has-success' && validate.apoliceState == 'has-success' 
               && validate.corState == 'has-success') {
              return ( 
                <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                        <div className="d-flex justify-content-center">
                            Próximo
                        </div>     
                  </Box>           
              );    
          } else {
            
            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_veiculo" p={2} onClick={()=>this.sendUpdate()}>
              <div className="d-flex justify-content-center">
                  Próximo
              </div>     
              </Box>           
            );
          }     
        }
      } else  if (localStorage.getItem('logperfil') == 1) {    
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo"  p={2} onClick={()=>this.sendUpdate()}>
                    <div className="d-flex justify-content-center">
                    <label> Próximo </label>
                    </div>     
              </Box>           
          );   
        } else {

          if (validate.carroState == '' && validate.modeloState  == '' 
            && validate.anoState == 'has-success' && validate.apoliceState == 'has-success' 
            && validate.seguroState == '' && validate.corState == 'has-success') {
              return ( 
                <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                        <div className="d-flex justify-content-center">
                        <label> Próximo </label>
                        </div>     
                  </Box>           
              );    
          } else {
            
            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_veiculo" p={2} onClick={()=>this.sendUpdate()}>
              <div className="d-flex justify-content-center">
              <label> Próximo </label>
              </div>     
              </Box>           
            );
          }     
        }
      } else  if (localStorage.getItem('logperfil') == 3) {    
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo"  p={2} onClick={()=>this.sendUpdate()}>
                    <div className="d-flex justify-content-center">
                     <label> Salvar Alterações </label>
                    </div>     
              </Box>           
          );   
        } else {

          if (validate.carroState == '' && validate.modeloState  == '' 
            && validate.anoState == 'has-success' && validate.apoliceState == 'has-success' 
            && validate.seguroState == '' && validate.corState == 'has-success') {
              return ( 
                <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_veiculo_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                        <div className="d-flex justify-content-center">
                        <label> Salvar Alterações </label>
                        </div>     
                  </Box>           
              );    
          } else {
            
            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_veiculo" p={2} onClick={()=>this.sendUpdate()}>
              <div className="d-flex justify-content-center">
              <label> Salvar Alterações </label>
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
  
    // var users = [];   
    //console.log('Estado - '+this.state.campEstadoId); 
  
   }

sendUpdate(){        
 
  const datapost = {
    carro: this.state.campCarro,
    modelo: this.state.campModelo,
    placa: this.state.campPlaca,
    ano: this.state.campAno,
    cor: this.state.campCor,
    apolice: this.state.campApolice,
    seguradoraId: this.state.campSeguradoraId
  }     
  
      console.log(JSON.stringify(datapost, null, "    "));        
      api.put(`/motorista/update/${localStorage.getItem('logid')}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
           
              if (localStorage.getItem('logperfil') == 1) {
                this.props.history.push(`/documentos_motorista/`+localStorage.getItem('logid')); 
              } else if (localStorage.getItem('logperfil') == 3) {
                this.props.history.push(`/area_motorista`);                
              } else if (localStorage.getItem('logperfil') == 0) {                 
                this.props.history.push(`/documentos_motorista/`+localStorage.getItem('logid'));                  
              }      
          }
          else {
            alert("Error conexão ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })        
}  

verificar_menu() {   

  if (localStorage.getItem('logperfil') == 0) {
   
   return(
    <div>
     <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={`/endereco_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
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
                  <Link to={`/endereco_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
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
                  <Link to={`/endereco_motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
                </div>                  
                <div>
                  <div className="titulo_representante">                
                  <div> {this.verifica_nome_motorista(this.state.campNome)}, altere o seu veículo.</div>      
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
                       <Autocomplete
                          value={this.state.listaMarcas}
                          onChange={(event, newValue) => {
                            this.carroChange(newValue);
                          }}  

                         /* inputValue={this.state.campCarro }
                          onInputChange={(event, newInputValue) => {
                            this.carroChange(newInputValue);
                          }} */                         

                          getOptionLabel={(option) => option.name}                                                  
                          id="controllable-states-demo"
                          options={this.state.listaMarcas}
                          style={{ width: 220 }}
                          debug
                          renderInput={(params) => 
                          <TextField {...params} label="Marca" InputLabelProps={{
                            shrink: true,
                          }}/>}
                        />                           
                       </div> 
                       
                       <div>            
                       <Autocomplete
                          id="combo-box-demo"
                          className="autocomplete_modelo"
                          value={this.state.listaMarcas}
                          options={this.state.lista}
                          getOptionLabel={(option) => option.name}
                          style={{ width: 220 }}                             
                          onChange={(event, newInputValue) => {
                            this.modeloChange(newInputValue);
                          }}
                          debug
                        /*  inputValue={this.state.campModelo}
                          onInputChange={(event, newInputValue) => {
                            this.modeloChange(newInputValue);
                          }}                          */
                          renderInput={(params) => 
                          <TextField {...params} 
                             label="Modelo" 
                             margin="normal"
                             InputLabelProps={{
                              shrink: true,
                            }}                            
                             />}
                        />    
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
                        onChange={ (e) => {
                          this.placaChange(e)                       
                          this.validaPlacaChange(e)
                        }}    
                        maxlength="20"                                                                      
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
                </div>    
            </div>      
            <div class="p-2">                       
            <Autocomplete
                          id="combo-box-demo"
                          className="seguradora_texto"
                          options={this.state.listSeguradoras}
                          getOptionLabel={(option) => option.nome}
                          style={{ width: 220 }}  
                          value={this.state.campSeguradoraNome}                           
                          onChange={(event, newInputValue) => {
                            this.seguroChange(newInputValue);
                          }}  
                         /* inputValue={this.state.campSeguradoraNome}
                          onInputChange={(event, newInputValue) => {
                            this.modeloChange(newInputValue);
                          }}  */                        
                          debug
                          renderInput={(params) => 
                          <TextField {...params} 
                             label="Seguradora" 
                             margin="normal"
                             InputLabelProps={{
                              shrink: true,
                            }}                            
                             />}
                        />          
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
  );
} 
}
export default empresarialComponent;