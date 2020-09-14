import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { cepMask } from '../formatacao/cepmask';
import { numeroMask } from '../formatacao/numeromask';
import { cepremoveMask } from '../formatacao/cepremovemask';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu_administrador from '../administrador/menu_administrador';


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

  
  verifica_nome_empresarial(nome){
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
                campNome: res.data.data[0].razao_social,  
                campCep: res.data.data[0].cep,   
                campCnpj: res.data.data[0].cnpj,   
                inicio: 2
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
          mensagem_cep: 'O campo CEP é obrigatório.'            
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
          mensagem_cep: 'O campo CEP é obrigatório.'            
        })            
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
      validate.enderecoState = ''
      this.setState({ 
          inicio: 1,
          mensagem_endereco: '' 
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
      validate.estadoState = ''
      this.setState({ 
         inicio: 1,
         mensagem_estado: '' 
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
         mensagem_cep: 'CEP inválido' 
      })  
    } else if (e.target.value.length == 9) {
      console.log('tecla '+e.key)
      if (e.key !== 'Enter') {      
            validate.cepState = 'has-success'                  
            this.setState({ 
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
  if (localStorage.getItem('logperfil') == 0) { 
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2} >
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
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
                  </Box>           
                );         
          } else {
            return (
      
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2}>
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
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2} >
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
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
                  </Box>           
                );         
          } else {
            return (
      
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2}>
                      <div className="d-flex justify-content-center">
                      <label> Próximo </label>
                      </div>     
                </Box>           
            );   
          }          
        }
      } else if (localStorage.getItem('logperfil') == 7) {   
        if (inicio == 1) {
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2} >
                    <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
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
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
                  </Box>           
                );         
          } else {
            return (
      
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2}>
                      <div className="d-flex justify-content-center">
                      <label> Salvar Alterações </label>
                      </div>     
                </Box>           
            );   
          }          
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

  if (localStorage.getItem('logperfil') == 0) {
   
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
      <div>
         <Progress color="warning" value={this.state.progresso} className="progressbar"/>
      </div>
   </div>             
   );

  } else if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
    return(
      <div className="d-flex justify-content-around">
      <div className="botao_navegacao">   
      </div>                  
      <div>           
        <div className="titulo_representante">                
            <label>Qual o endereço da Empresa? </label>             
        </div>
      </div>   
      
      <div>
         <div className="botao_navegacao">
         <div></div>                             
         </div>   
      </div>   
    
 </div>    
      );

  } else if (localStorage.getItem('logperfil') == 7) { // CLIENTE INDIVIDUAL OU EMPRESARIAL              

      return(
        <div className="d-flex justify-content-around">
                 <div className="botao_navegacao">               
                 </div>                  
                 <div>           
                   <div className="titulo_representante">                        
                      <label> {this.verifica_nome_empresarial(this.state.campNome)}, altere seu endereço </label>             
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


render(){  

return (
<div>    
<div className="container_alterado">
  {this.verificar_menu_lateral()}
<div className="d-flex justify-content">  
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
                      //onKeyPress={this.verificaCep}                      
                     // onFocus={ (e) => {                        
                     //   this.validaCepChange(e)
                     // }}    
                      onChange={ (e) => {
                        this.cepchange(e)                       
                        this.validaCepChange(e)
                      }}    
                      maxlength="9"                                                                          
                    />     
                    <div className="naoseiocep">
                        <a className="alink" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei o cep</a> 
                    </div>                               
                    <FormFeedback 
                    invalid={this.state.validate.cepState}>
                        {this.state.mensagem_cep}
                    </FormFeedback>                                  
                </Form>    
              </div>
              <div class="p-2"> 
                <label for="inputAddress">Endereço *</label>              
                  <Input
                      className="input_text_empresa"      
                      type="text"
                      name="endereco"
                      id="examplnome"
                      placeholder=""
                      autoComplete='off'
                      autoCorrect='off'
                      value={ this.state.campEndereco}
                      valid={ this.state.validate.enderecoState === 'has-success' }
                      invalid={ this.state.validate.enderecoState === 'has-danger' }
                      onBlur={this.verificaEndereco}
                      //onFocus={this.verificaEndereco}
                      onKeyUp={this.verificaEndereco}
                      onChange={ (e) => {
                        this.enderecochange(e)                       
                        this.validaEnderecoChange(e)
                      }}           
                      maxlength="100"                                                               
                    />                                
                    <FormFeedback 
                    invalid={this.state.validate.enderecoState}>
                        {this.state.mensagem_endereco}
                    </FormFeedback>   
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
              <div class="p-2">    
                 <div class="d-flex justify-content-start">
                       <div>
                          <label for="inputEmail4">Bairro *</label>                                                        
                            <Input
                            className="input_bairro"    
                            type="text"
                            name="bairro"
                            id="examplnome"
                            placeholder=""
                            autoComplete='off'
                            autoCorrect='off'
                            value={this.state.campBairro}
                            valid={ this.state.validate.bairroState === 'has-success' }
                            invalid={ this.state.validate.bairroState === 'has-danger' }
                            onBlur={this.verificaBairro}
                            onKeyUp={this.verificaBairro}
                            onChange={(e) => {
                              this.bairrochange(e)                       
                              this.validaBairroChange(e)
                            }}                                                                          
                            maxlength="75"
                          />                                
                          <FormFeedback 
                          invalid={this.state.validate.bairroState}>
                              {this.state.mensagem_bairro}
                          </FormFeedback>     
                       </div>
                     <div>
                      <label className="label_cidade" for="inputAddress">Cidade *</label>
                      <Input
                        className="input_cidade"   
                        type="text"
                        name="numero"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campCidade}
                        valid={ this.state.validate.cidadeState === 'has-success' }
                        invalid={ this.state.validate.cidadeState === 'has-danger' }
                        onBlur={this.verificaCidade}
                        onKeyUp={this.verificaCidade}
                        onChange={ (e) => {
                          this.cidadechange(e)                       
                          this.validaCidadeChange(e)
                        }}            
                        maxlength="50"                                                              
                      />                                
                      <FormFeedback className="label_cidade"
                      invalid={this.state.validate.cidadeState}>
                          {this.state.mensagem_cidade}
                      </FormFeedback>  
                     </div>                                        
               </div>    
            </div>      
              <div class="p-2">    
                 <div class="d-flex justify-content-start">                   
                   <div>
                        <label>Estado *</label>
                        <Input 
                            className="input_empresa_estado"    
                            type="select" 
                            name="select" 
                            id="exampleSelect" 
                            autoComplete='off'
                            autoCorrect='off'
                            value={this.state.campEstadoId}
                            valid={ this.state.validate.estadoState === 'has-success' }
                            invalid={ this.state.validate.estadoState === 'has-danger' }
                            onBlur={this.verificaEstado}
                            onKeyUp={this.verificaEstado}
                            //onFocus={this.verificaEstado}
                            onChange={ (e) => {
                              this.estadoChange(e)                       
                              this.validaEstadoChange(e)
                            }}                                                          >
                            <option selected>Selecione o estado</option>               
                            {this.loadFillData()}                   
                        </Input>
                        <FormFeedback 
                          invalid={this.state.validate.estadoState}>
                              {this.state.mensagem_estado}
                        </FormFeedback>        
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