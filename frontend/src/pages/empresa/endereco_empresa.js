import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, CardBody, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { cepMask } from '../formatacao/cepmask';
import { numeroMask } from '../formatacao/numeromask';
import { cepremoveMask } from '../formatacao/cepremovemask';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu_administrador from '../administrador/menu_administrador';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import * as moment from 'moment';
import 'moment/locale/pt-br';


import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import { Data } from '@react-google-maps/api';


import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


import api from '../../services/api';
import './empresarial.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
const cep_empresa = localStorage.getItem('logcep');     
//const userId = localStorage.getItem('logid');
const dataendereco = localStorage.getItem('logdataCliente');

const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campCep: '',    
      campBairro: '',
      campEndereco: '',
      campComplemento:'',
      campNumero:'',
      campCidade:'',
      campEstadoId:0,
      campNome: '',    
      inicio: 1,
      progresso: '',    
      estado_selecionado: '',
      mensagem_cep: '',  
      mensagem_endereco: '',  
      mensagem_numero: '',  
      mensagem_complemento: '',      
      mensagem_estado: '',  
      mensagem_cidade: '',  
      mensagem_bairro: '',       
      cep_encontrado: '',
      erro_cep: false,
      erro_numero: false,
      erro_complemento: false,
      validacao_cep: false,
      validacao_numero: false,
      validacao_complemento: false,
      busca_cep: '',     
      listEndereco:[], 
      listEstados:[],
      validate: {
        cepState: '',
        enderecoState: '',
        numeroState: '',     
        complementoState: '',
        bairroState: '',          
        cidadeState: '',     
        estadoState: '',     
      }    
    }
          
    this.cepchange = this.cepchange.bind(this);
    this.enderecochange = this.enderecochange.bind(this);
    this.numerochange = this.numerochange.bind(this);
    this.complementochange = this.complementochange.bind(this);
    this.bairrochange = this.bairrochange.bind(this);
    this.cidadechange = this.cidadechange.bind(this);   
    this.estadoChange = this.estadoChange.bind(this);    
    this.handleClick = this.handleClick.bind(this);
    this.limpar_endereco = this.limpar_endereco.bind(this);

    this.verificaCep = this.verificaCep.bind(this);  
    this.verificaNumero = this.verificaNumero.bind(this);  
    this.verificaComplemento = this.verificaComplemento.bind(this);  

    this.validaCepChange = this.validaCepChange.bind(this);  
    this.validaNumeroChange = this.validaNumeroChange.bind(this);  
    this.validaComplementoChange = this.validaComplementoChange.bind(this);  

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.verifica_cep = this.verifica_cep.bind(this);  
    this.cep_preenchido = this.cep_preenchido.bind(this);
    this.busca_cep_banco = this.busca_cep_banco.bind(this);

    this.verifica_nome_empresarial = this.verifica_nome_empresarial.bind(this);
    
  }

  componentDidMount(){    
    //console.log('CEP 1 - '+cepremoveMask(localStorage.getItem('logcep')))
    this.setState({      
      progresso: 65,
      campCep: localStorage.getItem('logcep') 
    });  
   
    let userId = this.props.match.params.id;

    localStorage.setItem('logid', userId);      
    
    this.limpar_endereco();    
    this.loadEstados();
    
    console.log('logcep ' + localStorage.getItem('logcep'))
    console.log('logcepbanco' + localStorage.getItem('logcepbanco'))
    console.log('logid' + localStorage.getItem('logid'))
    
    //if (localStorage.getItem('logid') !== 0) {     
      this.busca_cep_banco();            
    //}  

    //this.handleClick();
  }

  mostrar_endereco() {

    if (this.state.campEndereco !== "") {
    return (
      <div> 
          <div className="titulo_endereceo_alterar">Endereço</div>             
          <div className="descricao_endereco_endereço">
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
  verifica_nome_empresarial(nome){
    let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = nome
    }
    return(    
          nome_titulo          
       );  
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

  busca_cep_banco(e) {
    console.log('ENTROU AQUI busca_cep_banco')
    const { validate } = this.state

    api.get(`/empresa/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log('busca empresa - '+JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
  
              this.setState({ 
                campEndereco: res.data.data[0].endereco,
                campNumero: res.data.data[0].numero,
                campComplemento: res.data.data[0].complemento,
                campCidade: res.data.data[0].cidade,
                campBairro: res.data.data[0].bairro,
                campEstadoId: res.data.data[0].estadoId,      
                campNome: res.data.data[0].cliente.nome,  
                campCep: res.data.data[0].cep,   
                campCnpj: res.data.data[0].cnpj,   
                inicio: 2,
                validacao_cep: true,              
                validacao_numero: true,                                
              })      
              
              if (this.state.campCnpj == ''){
                this.setState({ 
                  campCpf: null 
                })  
              }                

              if (this.state.campCep == null) {
                this.setState({ 
                  campCep: ''
                })  
              }
              if (this.state.campEndereco == null) {
                this.setState({ 
                  campEndereco: ''
                })  
              }
              if (this.state.campNumero == null) {
                this.setState({ 
                  campNumero: ''
                })  
              }
              if (this.state.campBairro == null) {
                this.setState({ 
                  campBairro: ''
                })  
              }
              if (this.state.campCidade == null) {
                this.setState({ 
                  campCidade: ''
                })  
              }
              if (this.state.campComplemento == null) {
                this.setState({ 
                  campComplemento: ''
                })  
              }
              
              if (this.state.campEstadoId == null) {
                this.setState({ 
                  campEstadoId: 0
                })  
              } 

              if (this.state.campEstadoId !== 0) {
                this.carrega_estado()
              }
 

              if (this.state.campCep !== "" ) {
                validate.cepState = 'has-success'      
              } 
              if (this.state.campEndereco !== "") {
                validate.enderecoState = 'has-success'      
              } 
              if (this.state.campNumero !== "") {
                validate.numeroState = 'has-success'      
              }        
              if (this.state.campBairro !== "") {
                validate.bairroState = 'has-success'      
              }        
              if (this.state.campCidade !== "") {
                validate.cidadeState = 'has-success'      
              }        
              if (this.state.campComplemento !== "")  {
                validate.complementoState = 'has-success'      
                this.setState({ validacao_complemento: true })                
              }
              if (this.state.campEstadoId !== 0) {
                validate.estadoState = 'has-success'      
              }         
      
              this.setState({ validate })
                

        /*  if (validate.estadoState !== 'has-success' && validate.cidadeState !== 'has-success' 
          && validate.bairroState !== 'has-success' && validate.enderecoState !== 'has-success'           
          && localStorage.getItem('logcep') !== null) {

            this.cep_preenchido(cepremoveMask(localStorage.getItem('logcep')))  
          }*/

        } else {          
             console.log('ENTROU AQUI não achou empresa')
             this.cep_preenchido(cepremoveMask(localStorage.getItem('logcep')));          
        }
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
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
cepchange(e) {
  this.setState({ campCep: cepMask(e.target.value) })
 // if (this.state.campCep.length > 0) {
 //   this.handleClick(e)
 // }
}
enderecochange(e) {
  this.setState({ campEndereco: e.target.value })
}

numerochange(e) {
  this.setState({ campNumero: numeroMask(e.target.value) })
}
complementochange(e) {
  this.setState({ campComplemento: e.target.value })
}
bairrochange(e) {
  this.setState({ campBairro: e.target.value })
}
cidadechange(e) {
  this.setState({ campCidade: e.target.value })
}

limpar_endereco() {
  this.setState({ 
    campEndereco: "",
    campNumero: "",
    campComplemento:"",
    campCelular:"",
    campCidade:"",
    campEstadoId:0,
    estadoSelecionado: "",   
    campBairro:"", 
    mensagem_cep: '',  
    mensagem_endereco: '',  
    mensagem_numero: '',  
    mensagem_complemento: '',      
    mensagem_estado: '',  
    mensagem_cidade: '',  
    mensagem_bairro: '',      
    validate: {     
      enderecoState: '',
      numeroState: '',     
      complementoState: '',
      bairroState: '',          
      cidadeState: '',     
      estadoState: '',     
    }      
  });
 } 

 handleClick(e) {    
  const base = e.target.value;
  const estadoId = "";
  const { validate } = this.state
  
  console.log('BASE '+JSON.stringify(base.replace('-',''), null, "    "));                

  if (base.length > 0) {
   buscadorcep(base.replace('-','')).
     then(endereco => { 

      console.log('Busca '+JSON.stringify(endereco, null, "    "));                  

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
                  console.log(JSON.stringify(res.data, null, "    "));                  

                  
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
                    campComplemento: endereco.complemento
                  }); 

                  //console.log(JSON.stringify(this.state, null, "    "));
                } else {  
              
                  validate.cepState = 'has-danger'
                  this.setState({             
                      validate,
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

cep_preenchido(cep) {    
  const base = cep;
  const estadoId = "";
  const { validate } = this.state
  
  console.log('BASE '+JSON.stringify(base.replace('-',''), null, "    "));                

  if (base.length > 0) {
   buscadorcep(base.replace('-','')).
     then(endereco => {           
      console.log('Busca uF '+JSON.stringify(endereco, null, "    "));                
      api.get(`/estado/get/${endereco.uf}`)
      .then(res=>{        
        //validate.enderecoState = ''  
        //validate.cidadeState = ''  
        //validate.bairroState = ''  
        //validate.estadoState = ''  
        //validate.complementoState = ''  
        //validate.numeroState = ''  
        //console.log(JSON.stringify(res.data.data.length, null, "    "));          

        if (res.data.success) {      
         // console.log(JSON.stringify(res.data, null, "    "));          
         
          if (endereco.cep !== "") {
          validate.cepState = 'has-success'         
          }          
          if (endereco.logradouro !== "") {
             validate.enderecoState = 'has-success'         
          }          
          //validate.cepState = 'has-success'
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
            validate,                
            cep_encontrado: 'encontrado',
            campCep: endereco.cep,
            campEndereco: endereco.logradouro,
            campCidade: endereco.localidade,
            campBairro: endereco.bairro,
            campEstadoId: res.data.data[0].id, // endereco.uf,           
            estado_selecionado: endereco.uf,
            campComplemento: endereco.complemento
          }); 

          //console.log(JSON.stringify(this.state, null, "    "));
        } else {  
       
          validate.cepState = 'has-danger'
          this.setState({             
              validate,
              cep_encontrado: '',
              erro_cep: false,
              validacao_cep: false,
              mensagem_cep: 'O cep não encontrado', 
              campCep: "",
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

verificaCepKeyPress(e) {
  const { validate } = this.state
  //var code = e.keyCode || e.which;

     if (e.target.value.trim().length == 9) {
        if (e.key !== 'Enter') {      
          validate.cepState = 'has-success'                  
          this.setState({ 
            validate,
            erro_cep: false,
            validacao_cep: true,
            busca_cep: e.target.value,
            mensagem_cep: ''                                            
          })
          
          this.handleClick(e);
        }       
     }
 }

verificaCep(e) {
  const { validate } = this.state
  //var code = e.keyCode || e.which;
  if (e.key !== 'Enter') {

     if (e.target.value.trim().length == 0) {
        this.limpar_endereco()
        validate.numeroState = ''     
        validate.complementoState = ''
        validate.bairroState = ''          
        validate.cidadeState = ''     
        validate.estadoState = ''
        validate.enderecoState = ''
        validate.cepState = 'has-danger'
        this.setState({           
          validate,
          inicio: 1,       
          erro_cep: false,
          validacao_cep: false,
          mensagem_cep: ''            
        })            
        this.setState({ validate })
     } else if (e.target.value.trim().length < 9) {
        this.limpar_endereco()
        validate.numeroState = ''     
        validate.complementoState = ''
        validate.bairroState = ''          
        validate.cidadeState = ''     
        validate.estadoState = ''
        validate.enderecoState = ''
        this.setState({           
          validate,
          inicio: 1,    
          erro_cep: true,
          validacao_cep: false,   
          mensagem_cep: 'O campo CEP é obrigatório.'            
        })            
     }    
  }
 }

 verificaNumero(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {
      validate.numeroState = ''
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
      validate.complementoState = ''
      this.setState({ 
        validate,
        inicio: 1,            
        erro_complemento: false,
        validacao_complemento: false, 
        mensagem_complemento: ''  
       })             
     }      
 }

validaNumeroChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.numeroState = ''
      this.setState({ 
          inicio: 1,
          erro_numero: false,
          validacao_numero: false,
          mensagem_numero: '' 
      })  
    } else if (e.target.value.trim().length > 0) {
      validate.numeroState = 'has-success'  
      this.setState({       
        erro_numero: false,
        validacao_numero: true,    
        inicio: 2
      })
     
    }  
    this.setState({ validate })   
   
}

validaComplementoChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.complementoState = ''
      this.setState({ 
        inicio: 1,
        erro_complemento: false,
        validacao_complemento: false,
        mensagem_complemento: '' 
      })  
    } else if (e.target.value.trim().length > 0) {
      validate.complementoState = 'has-success'       
      this.setState({           
        erro_complemento: false,
        validacao_complemento: true,
        inicio: 2
      })     
      this.verifica_botao(this.state.inicio) 
    }  
    this.setState({ validate })
    
}

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
            
        this.handleClick(e);
      }  
    }      
    this.setState({ validate })
}

loadFillData(){
  //console.log(JSON.stringify(this.state.listEstados, null, "    ")); 
  //console.log(JSON.stringify(this.state.campEstadoId, null, "    ")); 
  
  return this.state.listEstados.map((data)=>{          
    return(
      <option key={data.nome} value={data.id}>{data.nome} </option>
    )
  })
}
verifica_cep() {

   if (this.state.cep_encontrado.length > 0) {
      
     return (
        <div className="endereco_cep">            
           <div className="texto_endereco">
             <div className="titulo_endereco">Endereço</div> 
             <div className="endereco">
              {this.state.campEndereco}    
              {this.state.campBairro}  {this.state.campCidade}  {this.state.estado_selecionado}
             </div>
           </div>
        </div>
     );
   
   } 
}

verifica_botao(inicio) {
  const { validate } = this.state

  if (inicio == 1) {
    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2} >
              <div className="d-flex justify-content-center">
              <label> Salvar Alterações </label>
              </div>     
        </Box>           
    );   
  } else {
  
  // console.log(JSON.stringify(this.state, null, "    "));
    if ( validate.cepState == 'has-success' && validate.bairroState == 'has-success'  
      && validate.cidadeState == 'has-success' && validate.enderecoState == 'has-success' 
      && validate.estadoState == 'has-success' && validate.numeroState == 'has-success') {

          return (
            <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados"  p={2} onClick={()=>this.sendUpdate()}>
            <div className="d-flex justify-content-center">
            <label> Salvar Alterações </label>
            </div>     
            </Box>           
          );         
    } else {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
          </Box>           
      );   
    }          
  } 
         
  } 

sendUpdate(){        
 
  const datapost = {
    endereco: this.state.campEndereco,
    numero: this.state.campNumero,
    complemento: this.state.campComplemento,
    cidade: this.state.campCidade,
    bairro: this.state.campBairro,
    estadoId: this.state.campEstadoId,      
    cep: this.state.campCep,    
  }          
    
        console.log(JSON.stringify(datapost, null, "    ")); 
        api.put(`/empresa/update/${localStorage.getItem('logid')}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
               
                if (localStorage.getItem('logperfil') == 1) {
                  this.props.history.push(`/empresa_senha/`+localStorage.getItem('logid')); 
                } else if (localStorage.getItem('logperfil') == 2) {
                  this.props.history.push(`/area_cliente_individual`);       
                } else if (localStorage.getItem('logperfil') == 7) {
                  this.props.history.push(`/area_cliente_empresarial`);                                  
                } else if (localStorage.getItem('logperfil') == 0) {
                  this.props.history.push(`/empresa_senha/`+localStorage.getItem('logid'));      
                }                
            
          }
          else {
            alert("Error 34 ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })          
}  

verificar_menu() {   
  return(
    <div>
      <div className="d-flex justify-content-around">
        <div className="botao_navegacao">
            <Link to={`/empresa_dados/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
        </div>                  
      <div>           
        <div className="titulo_representante">                
            <label>Qual o endereço da Empresa? </label>             
        </div>
      </div>   
      
      <div>
        <div className="botao_navegacao">
            <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                            
        </div>   
      </div>   
    
  </div>    
  <br/>
    <div className="barra_incluir">
       <Progress color="warning" value={this.state.progresso} className="progressbar"/>
    </div>
 </div>             
 );
}

verificar_menu_lateral() {

  if (localStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (localStorage.getItem('logperfil') == 7) {
   return( 
     <Menu_cliente_empresarial />     
   );
  }

}
verifica_titulo() {
  if ( this.state.perfil == 1) {
    return (            
         <strong> ADMINISTRADOR </strong>
     ); 
  } else {
    return (      
       <strong>{this.state.campNome}</strong>
     ); 
  }            
}

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

render(){  

return (
<div>    
<div className="container_alteracao">
  {this.verificar_menu_lateral()}
<div className="d-flex justify-content">  
   <div>     
   <div className="titulo_admministrador">        
           <div className="unnamed-character-style-4 descricao_alteracao">         
           <h5> {localStorage.getItem('lograzao_social')} </h5>                                                                
               {this.verifica_titulo()}, {this.verifica_horario()} !
            </div>             
            
              <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '42vh', width: '42vh' }} />
              </Container>

              <br/>
              <br/>
              <br/>
          </div> 
          
          <div class="d-flex flex-column espacamento_caixa_texto">
              <div class="p-2"> 
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Cep</InputLabel>
                     <OutlinedInput 
                        autoComplete="off"                                   
                        type="text"                       
                        error={this.state.erro_cep}
                        helperText={this.state.mensagem_cep}
                        className="data_text"              
                        id="cep_incluir"                      
                        variant="outlined"
                        value={this.state.campCep}
                        onblur={this.verificaCep}
                        onKeyUp={this.verificaCep}   
                        onChange={ (e) => {
                          this.cepchange(e)                       
                          this.validaCepChange(e)
                        }}                         
                        maxlength="9"     
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_cep? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}
                    />
                     <div className="naoseiocep_alterar">
                        <a className="alink" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei meu CEP</a> 
                    </div> 
                   <FormHelperText error={this.state.erro_cep}>
                         {this.state.mensagem_cep}
                   </FormHelperText>
                  </FormControl>                  
              </div>
              <div class="p-2">                                
                  <div>
                      {this.mostrar_endereco()}                      
                  </div>               
              </div> 
              <div class="p-2">               
                     <FormControl variant="outlined">
                        <InputLabel className="label_text" htmlFor="filled-adornment-password">Número</InputLabel>
                        <OutlinedInput 
                            autoComplete="off"                                   
                            type="text"                       
                            error={this.state.erro_numero}
                            helperText={this.state.mensagem_numero}
                            className="data_text"                         
                            id="numero_incluir"                      
                            variant="outlined"
                            value={this.state.campNumero}
                            onblur={this.verificaNumero}
                            onKeyUp={this.verificaNumero}
                            onChange={ (e) => {
                              this.numerochange(e)                       
                              this.validaNumeroChange(e)
                            }}                          
                            maxlength="9"     
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_numero? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={90}
                        />                        
                      <FormHelperText error={this.state.erro_numero}>
                            {this.state.mensagem_numero}
                      </FormHelperText>
                      </FormControl>                             
                </div>                        
                <div class="p-2">               
                       <FormControl variant="outlined">
                        <InputLabel className="label_text" htmlFor="filled-adornment-password">Complemento</InputLabel>
                        <OutlinedInput 
                            autoComplete="off"                                   
                            type="text"                       
                            error={this.state.erro_complemento}
                            className="data_text"                  
                            id="complemento_incluir"                      
                            variant="outlined"
                            value={this.state.campComplemento}
                            onblur={this.verificaComplemento}
                            onKeyUp={this.verificaComplemento}
                            onChange={ (e) => {
                              this.complementochange(e)                       
                              this.validaComplementoChange(e)
                            }}                                                              
                          endAdornment={
                            <InputAdornment position="end">
                                {this.state.validacao_complemento? <CheckIcon />: ''}
                            </InputAdornment>
                          }
                          labelWidth={130}
                        />                        
                      <FormHelperText error={this.state.erro_complemento}>
                            {this.state.mensagem_complemento}
                      </FormHelperText>
                      </FormControl>                          
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