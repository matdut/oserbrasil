import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, CardText, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import {Link} from 'react-router-dom';
import { cepMask } from '../../formatacao/cepmask';
import { numeroMask } from '../../formatacao/numeromask';
import { cepremoveMask } from '../../formatacao/cepremovemask';

import api from '../../../services/api';
import '../motorista.css';
import menu_motorista_auxiliar from '../menu_motorista_auxiliar';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';

import Select from '@material-ui/core/Select';
import 'moment/locale/pt-br';

import FormHelperText from '@material-ui/core/FormHelperText';

import CheckIcon from '@material-ui/icons/Check';

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
      perfillog: null,
      campCnpj: '',  
      inicio: 1,
      estado_selecionado: '',
      progresso: '',    
      mensagem_cep: '',  
      mensagem_endereco: '',  
      mensagem_numero: '',  
      mensagem_complemento: '',      
      mensagem_estado: '',  
      mensagem_cidade: '',  
      mensagem_bairro: '',       
      cep_encontrado: '',
      busca_cep: '',     
      listEndereco:[], 
      listEstados:[],
      erro_cep: false,
      erro_numero: false,
      erro_complemento: false,
      validacao_cep: false,
      validacao_numero: false,
      validacao_complemento: false,
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
    this.cep_preenchido = this.cep_preenchido.bind(this);
    this.busca_cep_banco = this.busca_cep_banco.bind(this);

    this.verifica_nome_motorista = this.verifica_nome_motorista.bind(this);
    this.verificar_menu = this.verificar_menu.bind(this);      
    
  }

  componentDidMount(){    
    const { validate } = this.state    
    validate.estadoState = ''    

    let userId = this.props.match.params.id;
    
    if (userId !== 0) {
      localStorage.setItem('logid', userId);      
    } else {
      localStorage.setItem('logperfil', 0);      
    }    

    this.setState({      
      validate,
      progresso: 15,
      perfillog: localStorage.getItem('logperfil'),    
      campCep: localStorage.getItem('logcep') 
    });  
    this.limpar_endereco();    
    this.loadEstados();       

    if (localStorage.getItem('logid') !== 0) { 
      this.busca_cep_banco();    
    }
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

  busca_cep_banco(e) {   
    const { validate } = this.state

    api.get(`/motoristaAuxiliar/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log('busca motorista Auxiliar - '+JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({ 
            campEndereco: res.data.data[0].endereco,
            campNumero: res.data.data[0].numero,
            campComplemento: res.data.data[0].complemento,
            campCidade: res.data.data[0].cidade,
            campBairro: res.data.data[0].bairro,
            campEstadoId: res.data.data[0].estadoId,      
            campNome: res.data.data[0].nome,  
            campCep: res.data.data[0].cep,   
            campCnpj: res.data.data[0].cnpj,  
            progresso: 30, 
            inicio: 2,                 
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
            this.setState({ validacao_cep: true })                     
          } 
          if (this.state.campEndereco !== "") {
            validate.enderecoState = 'has-success'      
          } 
          if (this.state.campNumero !== "") {
            validate.numeroState = 'has-success'      
            this.setState({ validacao_numero: true })         
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
             this.cep_preenchido(cepremoveMask(localStorage.getItem('logcep')));          
        }
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
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
  
  //console.log('BASE '+JSON.stringify(base.replace('-',''), null, "    "));                

  if (base.length > 0) {
   buscadorcep(base.replace('-','')).
     then(endereco => {           
      //console.log('Busca uF '+JSON.stringify(endereco.uf, null, "    "));                
      api.get(`/estado/get/${endereco.uf}`)
      .then(res=>{        
        validate.enderecoState = ''  
        validate.cidadeState = ''  
        validate.bairroState = ''  
        validate.estadoState = ''  
        validate.complementoState = ''  
        validate.numeroState = ''  
        //console.log(JSON.stringify(res.data.data.length, null, "    "));          

        if (res.data.success) {      
          console.log(JSON.stringify(res.data, null, "    "));          
          
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
          if (endereco.uf !== null) {
            validate.estadoState = 'has-success'
          }           
          if (endereco.complemento !== null) {
            validate.complementoState = 'has-success'
          }           
          
          this.setState({                    
            cep_encontrado: 'encontrado',
            campCep: endereco.cep,
            campEndereco: endereco.logradouro,
            campCidade: endereco.localidade,
            campBairro: endereco.bairro,
            campEstadoId: res.data.data[0].id, // endereco.uf,           
            estado_selecionado: endereco.uf,
            campComplemento: endereco.complemento,
            progresso: 30, 
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
              progresso: 15, 
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
        validate.cepState = 'has-danger'
        this.setState({           
          inicio: 1,    
          erro_cep: false,
          validacao_cep: false,   
          mensagem_cep: 'O campo CEP é obrigatório.'            
        })            
        this.setState({ validate })
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
        erro_numero: true,
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
        erro_complemento: true,
        validacao_complemento: false,     
        mensagem_complemento: ''  
       })             
     }      
 }

validaNumeroChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.numeroState = 'has-danger'
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
      this.setState({ 
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

verifica_botao(inicio) {
  const { validate } = this.state;
  if (inicio == 1) {
    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2} >
              <div className="d-flex justify-content-center">
              <label> Próximo </label>
               </div>     
         </Box>           
     );   
  } else {
  
   // console.log(JSON.stringify(this.state, null, "    "));
   if (this.state.validacao_cep == true && this.state.validacao_numero == true) {

          return (
            <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados"  p={2} onClick={()=>this.sendUpdate()}>
            <div className="d-flex justify-content-center">
            <label> Próximo </label>
            </div>     
            </Box>           
          );         
    } else {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Próximo </label>
                 </div>     
           </Box>           
       );   
    }          
   } 
  } 

  verificar_menu() {   

    return(
      <div>
      <div className="d-flex justify-content-around">
             <div className="botao_navegacao">
                 <Link to={`/motorista_incluir/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_endereco_motorista">                
                     <label>{this.verifica_nome_motorista(this.state.campNome)}, agora fale onde você mora. </label>             
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <Link to='/'><img className="botao_close espacamento_seta" src="../close_black.png"/> </Link>                            
                  </div>   
               </div>  
         
         </div>      
                         <br/>    
                         <div>        
                             <Progress color="warning" value={this.state.progresso} className="progressbar"/>
                         </div>       
      </div>                          
     );
  
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
  debugger

        console.log(JSON.stringify(datapost, null, "    ")); 
        api.put(`/motoristaAuxiliar/update/${localStorage.getItem('logid')}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
           
              localStorage.setItem('logprogress', 75);  
             // localStorage.setItem('logid', userId);
             if (localStorage.getItem('logperfil') == 1) {
                this.props.history.push(`/documentos_aux_motorista_incluir/`+localStorage.getItem('logid'));
              } else if (localStorage.getItem('logperfil') == 9) {
                this.props.history.push(`/area_motorista_auxiliar`);                
              } else if (localStorage.getItem('logperfil') == 0) {                 
                 this.props.history.push(`/documentos_aux_motorista_incluir/`+localStorage.getItem('logid'));                                                
              }              
  
          }
          else {
            alert("Error conexao ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
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
              <FormControl variant="outlined">
                    <InputLabel className="label_cep_incluir_motorista" htmlFor="filled-adornment-password">Cep</InputLabel>
                     <OutlinedInput 
                        autoComplete="off"                                   
                        type="text"                       
                        error={this.state.erro_cep}
                        helperText={this.state.mensagem_cep}
                        className="cep_incluir_motorista"                       
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
                      labelWidth={30}
                    />
                     <div className="naoseiocep">
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
                  <div class="d-flex justify-content-start">
                       <div>
                       <FormControl variant="outlined">
                        <InputLabel className="label_numero_incluir_motorista" htmlFor="filled-adornment-password">Número</InputLabel>
                        <OutlinedInput 
                            autoComplete="off"                                   
                            type="text"                       
                            error={this.state.erro_numero}
                            helperText={this.state.mensagem_numero}
                            className="numero_incluir_motorista"                       
                            id="numero_incluir"                      
                            variant="outlined"
                            value={this.state.campNumero}
                            onblur={this.verificaNumero}
                            onKeyUp={this.verificaNumero}
                            onChange={ (e) => {
                              this.numerochange(e)                       
                              this.validaNumeroChange(e)
                            }}                          
                            inputProps={{
                              maxLength: 8,
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
                        <InputLabel className="label_complemento_incluir_motorista" htmlFor="filled-adornment-password">Complemento</InputLabel>
                        <OutlinedInput 
                            autoComplete="off"                                   
                            type="text"                       
                            error={this.state.erro_complemento}
                            helperText={this.state.mensagem_complemento}
                            className="complemento_incluir_motorista"                       
                            id="complemento_incluir"                      
                            variant="outlined"
                            value={this.state.campComplemento}
                            onblur={this.verificaComplemento}
                            onKeyUp={this.verificaComplemento}
                            onChange={ (e) => {
                              this.complementochange(e)                       
                              this.validaComplementoChange(e)
                            }}                                  
                            inputProps={{
                              maxLength: 50,
                            }}      
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