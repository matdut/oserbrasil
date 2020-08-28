import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, CardText, CardBody, CardTitle, CardSubtitle, } from 'reactstrap';
import {Link} from 'react-router-dom';
import { cepMask } from '../formatacao/cepmask';
import { numeroMask } from '../formatacao/numeromask';
import { cepremoveMask } from '../formatacao/cepremovemask';

import api from '../../services/api';
import './motorista.css';

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

    this.verificaEstado = this.verificaEstado.bind(this);  
    this.verificaCep = this.verificaCep.bind(this);  
    this.verificaEndereco = this.verificaEndereco.bind(this);  
    this.verificaNumero = this.verificaNumero.bind(this);  
    this.verificaBairro = this.verificaBairro.bind(this);  
    this.verificaCidade = this.verificaCidade.bind(this);  
    this.verificaComplemento = this.verificaComplemento.bind(this);  

    this.validaCepChange = this.validaCepChange.bind(this);  
    this.validaEnderecoChange = this.validaEnderecoChange.bind(this);  
    this.validaNumeroChange = this.validaNumeroChange.bind(this);  
    this.validaBairroChange = this.validaBairroChange.bind(this);  
    this.validaCidadeChange = this.validaCidadeChange.bind(this);  
    this.validaComplementoChange = this.validaComplementoChange.bind(this);  
    this.validaEstadoChange = this.validaEstadoChange.bind(this);  

    this.verifica_botao = this.verifica_botao.bind(this);  
    //this.verifica_cep = this.verifica_cep.bind(this);  
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
      progresso: 30,
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
   console.log('ENTROU AQUI busca_cep_banco')
    const { validate } = this.state

    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log('busca motorista - '+JSON.stringify(res.data, null, "    ")); 
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
            inicio: 2
          })            
          
          this.carrega_estado()

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
          mensagem_cep: 'O campo CEP é obrigatório.'            
        })            
        this.setState({ validate })
    }   
  }  
 }

 verificaNumero(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {
      validate.numeroState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,        
        mensagem_numero: 'O campo Numero é obrigatório.'  
       })            
     }      
 }

 verificaComplemento(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {
      validate.complementoState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,             
        mensagem_complemento: 'O campo Complemento é obrigatório.'  
       })             
     }      
 }

 verificaBairro(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {
      validate.bairroState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,       
        mensagem_bairro: 'O campo Bairro é obrigatório.'  
       })           
     }      
 }
 verificaCidade(e) {
  const { validate } = this.state
     if (e.target.value.trim().length == 0) {
      validate.cidadeState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,
        mensagem_cidade: 'O campo cidade é obrigatório.'  
       })        
     }      
 }
 verificaEndereco(e) {
  const { validate } = this.state
   //console.log('on blur '+e.target.value)
     if (e.target.value.trim().length == 0) {           
      validate.enderecoState = 'has-danger'      
      this.setState({ 
        validate,
        inicio: 1,
        mensagem_endereco: 'O campo Endereço é obrigatório.'  
       })            
     } else {                 
      validate.enderecoState = 'has-success'      
      this.setState({ 
        validate,
        mensagem_endereco: ''  
       })    
     }     
 }
verificaEstado() {
  const { validate } = this.state
    
     if (this.state.campEstadoId == 0) {

      validate.estadoState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,
        mensagem_estado: 'O campo Estado é obrigatório'  
       })      
     } else if (this.state.campEstadoId == "Selecione o estado") {
      validate.estadoState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 2,
        mensagem_estado: 'O campo Estado é obrigatório'  
       })      
     }          
 }


validaEnderecoChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.enderecoState = 'has-danger'
      this.setState({ 
          inicio: 1,
          mensagem_endereco: 'O campo Endereço é obrigatório.' 
      })  
    } else if (e.target.value.trim().length > 0) {
      validate.enderecoState = 'has-success'      
      this.setState({           
        inicio: 2
      })    
    }  
    this.setState({ validate })    
}
validaNumeroChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.numeroState = 'has-danger'
      this.setState({ 
          inicio: 1,
          mensagem_numero: 'O campo Número é obrigatório.' 
      })  
    } else if (e.target.value.trim().length > 0) {
      validate.numeroState = 'has-success'  
      this.setState({           
        inicio: 2
      })
     
    }  
    this.setState({ validate })   
   
}
validaBairroChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.bairroState = 'has-danger'
      this.setState({ 
        inicio: 1,
        mensagem_bairro: 'O campo Bairro é obrigatório.' 
      })  
    } else if (e.target.value.trim().length > 0){
      validate.bairroState = 'has-success'  
      this.setState({           
        inicio: 2
      })      
    }  
    this.setState({ validate })  
}
validaCidadeChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.cidadeState = 'has-danger'
      this.setState({ 
        inicio: 1,
        mensagem_cidade: 'O campo Cidade é obrigatório.' 
      })  
    } else if (e.target.value.trim().length > 0) {
      validate.cidadeState = 'has-success'  
      this.setState({           
        inicio: 2
      })     
    }  
    this.setState({ validate })    
}
validaComplementoChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.complementoState = 'has-danger'
      this.setState({ 
        inicio: 1,
        mensagem_complemento: 'O campo Complemento é obrigatório.' 
      })  
    } else if (e.target.value.trim().length > 0) {
      validate.complementoState = 'has-success'       
      this.setState({           
        inicio: 2
      })     
      this.verifica_botao(this.state.inicio) 
    }  
    this.setState({ validate })
    
}
validaEstadoChange(e){
  const { validate } = this.state
  
    if (e.target.value.trim().length == 0) {
      validate.estadoState = 'has-danger'
      this.setState({ 
         inicio: 1,
         mensagem_estado: 'O campo Estado é obrigatório.' 
      })  
    } else if (e.target.value.trim().length > 0) {
      validate.estadoState = 'has-success'  
      this.setState({           
        inicio: 2
      })     
    }  
    this.setState({ validate })
    
}
validaCepChange(e){
  const { validate } = this.state
  //console.log('teste cep '+e.target.value);
    if (e.target.value.length < 9) {
      this.limpar_endereco()
      validate.cepState = 'has-danger'
      validate.numeroState = ''
      validate.complementoState = ''
      validate.enderecoState = ''
      validate.estadoState = ''
      validate.bairroState = ''
      validate.cidadeState = ''
      this.setState({ 
         inicio: 1,
         mensagem_cep: 'CEP inválido' 
      })  
    } else if (e.target.value.length == 9) {      
            validate.cepState = 'has-success'                  
            this.setState({ 
              busca_cep: e.target.value,
              mensagem_cep: ''                                            
            })
            
        this.handleClick(e);
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
  const { validate } = this.state
 if (localStorage.getItem('logperfil') == 0) { 
    if (inicio == 1) {
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco_motorista"  p={2} >
                <div className="d-flex justify-content-center">
                <label> Próximo </label>
                 </div>     
           </Box>           
       );   
    } else {
    
     // console.log(JSON.stringify(this.state, null, "    "));
      if ( validate.cepState == 'has-success' && validate.bairroState == 'has-success'  
        && validate.cidadeState == 'has-success' && validate.complementoState == 'has-success'
        && validate.enderecoState == 'has-success' && validate.estadoState == 'has-success'
        && validate.numeroState == 'has-success') {

            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco_motorista_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
              <div className="d-flex justify-content-center">
              <label> Próximo </label>
              </div>     
              </Box>           
            );         
      } else {
        return (
  
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco_motorista"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                   </div>     
             </Box>           
         );   
      }          
     }
    } else if (localStorage.getItem('logperfil') == 1) {
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco_motorista"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                   </div>     
             </Box>           
         );   
      } else {
          if ( validate.cepState == 'has-success' && validate.bairroState == 'has-success'  
          && validate.cidadeState == 'has-success' && validate.complementoState == 'has-success'
          && validate.enderecoState == 'has-success' && validate.estadoState == 'has-success'
          && validate.numeroState == 'has-success') {

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco_motorista_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                <label> Próximo </label>
                </div>     
                </Box>           
              );         
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco_motorista"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Próximo </label>
                    </div>     
              </Box>           
          );   
        } 
     }         

    } else if (localStorage.getItem('logperfil') == 3) {
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco_motorista"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                   </div>     
             </Box>           
         );   
      } else {
      if ( validate.cepState == 'has-success' && validate.bairroState == 'has-success'  
      && validate.cidadeState == 'has-success' && validate.complementoState == 'has-success'
      && validate.enderecoState == 'has-success' && validate.estadoState == 'has-success'
      && validate.numeroState == 'has-success') {

          return (
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco_motorista_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
            <div className="d-flex justify-content-center">
            <label> Salvar Alterações </label>
            </div>     
            </Box>           
          );         
    } else {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco_motorista"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                 </div>     
           </Box>           
       );   
    }         
  } 

    }
  } 

  verificar_menu() {   

    if (localStorage.getItem('logperfil') == 0) {
     
     return(
      <div>
      <div className="d-flex justify-content-around">
             <div className="botao_navegacao">
                 <Link to={`/motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
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
  
    } else if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
      return(
        <div>
        <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                   <Link to={`/motorista/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
                 </div>                  
                 <div>
                   <div className="titulo_representante">                
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
  
    } else if (localStorage.getItem('logperfil') == 3) { // CLIENTE INDIVIDUAL OU EMPRESARIAL              
  
      return(
        <div className="d-flex justify-content-around">
              <div className="botao_navegacao">
                 <Link to="/area_motorista"> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     <label>{this.verifica_nome_motorista(this.state.campNome)}, altere seu endereço. </label>             
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <div></div>                      
                  </div>   
               </div>   
        </div>
        );
  
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
        api.put(`/motorista/update/${localStorage.getItem('logid')}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
           
              localStorage.setItem('logprogress', 75);  
             // localStorage.setItem('logid', userId);
             if (localStorage.getItem('logperfil') == 1) {
                this.props.history.push(`/veiculo_motorista/`+localStorage.getItem('logid'));
              } else if (localStorage.getItem('logperfil') == 3) {
                this.props.history.push(`/area_motorista`);                
              } else if (localStorage.getItem('logperfil') == 0) {                 
                 this.props.history.push(`/veiculo_motorista/`+localStorage.getItem('logid'));                                                
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
    <CardBody>
        <div>Endereço</div>
        <CardTitle className="card_mot_endereco">{this.state.campEndereco}</CardTitle>      
        <CardText className="card_mot_endereco">{this.state.campBairro+' , '+this.state.campCidade+' / '+this.state.estado_selecionado}</CardText>      
    </CardBody> 
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
              <label for="inputAddress">Cep *</label>          
                  <Form inline>
                      <Input                   
                      className="input_text"    
                      type="text"
                      name="nome"                
                      id="examplnome"
                      placeholder=""
                      autoComplete='off'
                      autoCorrect='off'
                      value={this.state.campCep}
                      valid={ this.state.validate.cepState === 'has-success' }
                      invalid={ this.state.validate.cepState === 'has-danger' }
                      onblur={this.verificaCep}
                      onKeyUp={this.verificaCep}                      
                   //   onFocus={ (e) => {                        
                   //     this.validaCepChange(e)
                   //   }}    
                      onChange={ (e) => {
                        this.cepchange(e)                       
                        this.validaCepChange(e)
                      }}    
                      maxlength="9"                                                                          
                    />     
                    <div className="naoseiocep">
                        <a className="alink" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei meu CEP</a> 
                    </div>                               
                    <FormFeedback 
                    invalid={this.state.validate.cepState}>
                        {this.state.mensagem_cep}
                    </FormFeedback>                                  
                </Form>    
              </div>
              <div class="p-2">                                
                  <div>
                      {this.mostrar_endereco()}
                      
                  </div>               
              </div> 
              <div class="p-2">               
                  <div class="d-flex justify-content-start">
                       <div>
                       <label for="inputAddress">Número *</label>  
                       <Input
                          className="input_numero"   
                          type="text"
                          name="numero"
                          id="examplnome"
                          placeholder=""
                          autoComplete='off'
                          autoCorrect='off'
                          value={this.state.campNumero}
                          valid={ this.state.validate.numeroState === 'has-success' }
                          invalid={ this.state.validate.numeroState === 'has-danger' }
                          onblur={this.verificaNumero}
                          onKeyUp={this.verificaNumero}
                          onChange={ (e) => {
                            this.numerochange(e)                       
                            this.validaNumeroChange(e)
                          }}      
                          maxlength="6"                                                                    
                        />                                
                        <FormFeedback 
                        invalid={this.state.validate.numeroState}>
                            {this.state.mensagem_numero}
                        </FormFeedback>     
                       </div> 
                       
                       <div>
                          <label className="label_complemento" for="inputAddress">Complemento *</label>
                          <Input
                            className="input_complemento"    
                            type="text"
                            name="complemento"
                            id="examplnome"
                            placeholder=""
                            autoComplete='off'
                            autoCorrect='off'
                            value={this.state.campComplemento}
                            valid={ this.state.validate.complementoState === 'has-success' }
                            invalid={ this.state.validate.complementoState === 'has-danger' }
                            onblur={this.verificaComplemento}
                            onKeyUp={this.verificaComplemento}
                            onChange={ (e) => {
                              this.complementochange(e)                       
                              this.validaComplementoChange(e)
                            }}          
                            maxlength="60"                                                                
                          />                                
                          <FormFeedback className="label_complemento"     
                          invalid={this.state.validate.complementoState}>
                              {this.state.mensagem_complemento}
                          </FormFeedback>       
                       </div>                        
                  </div>
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