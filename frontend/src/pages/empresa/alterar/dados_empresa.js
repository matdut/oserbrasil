import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Spinner, Select, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import { cepremoveMask } from '../../formatacao/cepremovemask';
import { cnpjremoveMask } from '../../formatacao/cnpjremovemask';
import { cnpjMask } from '../../formatacao/cnpjmask';
import api from '../../../services/api';
import '../empresarial.css';
import Menu_cliente_empresarial from '../../empresa/menu_cliente_empresarial';
import Menu_administrador from '../../administrador/menu_administrador';

import FormHelperText from '@material-ui/core/FormHelperText';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import { dataMask } from '../../formatacao/datamask';

import { Data } from '@react-google-maps/api';

const andamento_cadastro = sessionStorage.getItem('logprogress');     
//const userId = sessionStorage.getItem('logid');
const { cnpj } = require('cpf-cnpj-validator');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campCnpj:"",
      campRazao_social: "",
      campNome_fantasia:"",
      campCep: '',
      campEndereco: '',
      campBairro: '',
      campNumero: '',
      encontrou_cnpj: true,
      campEstado: '',   
      campNome: '',   
      campo_cnpj_disabled:false,
      campo_razao_social_disabled:false,
      campo_nome_fantasia_disabled:false,
      campComplemento: '',
      campCidade: '',
      erro_cnpj: false,
      erro_razaosocial: false,
      erro_nomefantasia: false,
      validacao_cnpj: false,
      validacao_razaosocial: false,
      validacao_nomefantasia: false,
      inicio: 1,
      incluir: true, 
      progresso: "",    
      mensagem_CNPJ: '',      
      mensagem_razao_social: '',  
      mensagem_nome_fantasia: '',  
      consulta_cnpj:'', 
      dataCliente: [],
      validate: {
        razao_socialState: '',    
        cnpjState: '',     
        nome_fantasiaState: '',     
      }    
    }

          
    this.cnpjchange = this.cnpjchange.bind(this);     
    this.nomefantasiachange = this.nomefantasiachange.bind(this);      
    this.loadcnpj = this.loadcnpj.bind(this);   
    this.razaosocialchange = this.razaosocialchange.bind(this);   

    this.verificaNome = this.verificaNome.bind(this);  
    this.verificanomefantasia = this.verificanomefantasia.bind(this);   
    this.verificacnpj = this.verificacnpj.bind(this);   
    this.verificarazaosocial = this.verificarazaosocial.bind(this);       

    this.verificacnpjonfocus = this.verificacnpjonfocus.bind(this);       

    this.validaNomeChange = this.validaNomeChange.bind(this);  
    this.validatecnpjChange = this.validatecnpjChange.bind(this);   
    this.validatenomefantasiaChange = this.validatenomefantasiaChange.bind(this);   
    this.validaterazaosocialChange = this.validaterazaosocialChange.bind(this); 
    

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.verificaSaidacnpj = this.verificaSaidacnpj.bind(this);      

    this.verifica_nome_empresa = this.verifica_nome_empresa.bind(this);
    
  }

  componentDidMount(){  
    const { validate } = this.state
  
    this.setState({      
      progresso: 30
    });    
    //console.log('logprogress - '+ sessionStorage.getItem('logprogress'));  
    validate.cnpjState = ''
    validate.razao_socialState = ''
    validate.nome_fantasiaState = ''

    let userId = this.props.match.params.id;

    sessionStorage.setItem('logid', userId);           
    
    this.setState({      
      validate      
    });   
         
    //console.log('logid -'+sessionStorage.getItem('logid'))
    
    //if (sessionStorage.getItem('logid') !== 0) {         

    if (sessionStorage.getItem('logid') !== 0) {
   
      this.busca_cliente()
      
    }
     
    //}
    
    if (sessionStorage.getItem('logperfil') == 7) {
      this.setState({      
          campo_cnpj_disabled: true,
          campo_razao_social_disabled:true,
          campo_nome_fantasia_disabled: true 
      });   

    } else if (sessionStorage.getItem('logperfil') == 0) {
      this.setState({              
        incluir: true 
     });    
    }
    //this.verifica_base_cnpj()
    //this.cnpjInput.focus();
  }

  verifica_nome_empresa(n){
    let nome_titulo = n.substring(0,n.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = n
    }
    return(    
          nome_titulo          
       );  
  } 
  limpar_cnpj_nao_encontrado() {
    this.setState({      
      campCnpj: "",          
      campRazao_social: "",
      campNome_fantasia:"",      
    });
   } 

   busca_cliente(e) {
    const { validate } = this.state
    api.get(`/empresa/get/${sessionStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {           

          this.setState({ 
            campCnpj: cnpjMask(res.data.data[0].cnpj),          
            campRazao_social: res.data.data[0].razao_social,
            campNome_fantasia: res.data.data[0].nome_fantasia,                  
            campCidade: res.data.data[0].cidade,
            campComplemento: res.data.data[0].complemento,
            campNumero: res.data.data[0].numero,
            campBairro: res.data.data[0].bairro,
            campEstado: res.data.data[0].estadoId,
            campEndereco: res.data.data[0].endereco,          
            campCep: res.data.data[0].cep,        
            campNome: res.data.data[0].cliente.nome,            
            inicio: 2,
            incluir: false,                         
          })     
          
          console.log('state '+ JSON.stringify(this.state));
          if (sessionStorage.getItem('logperfil') == 2) { 
            this.setState({ 
              endereco: "/area_cliente_individual" 
            });  
          } else if (sessionStorage.getItem('logperfil') == 7) {                      
              this.setState({ 
                endereco: "/area_cliente_empresarial" 
              });                  
          }                        

          if (this.state.campCnpj == null) {
            this.setState({ 
              campCnpj: ''
            })
          }             
          if (this.state.campRazao_social == null){
            this.setState({ 
              campRazao_social: ''
            })
          }
          if (this.state.campNome_fantasia == null){
            this.setState({ 
              campNome_fantasia: ''
            })
          }


          if (this.state.campCnpj !== "") {
            validate.cnpjState = 'has-success'
            this.setState({ 
              validacao_cnpj: true
            })
          }             
          if (this.state.campRazao_social !== ""){
            validate.razao_socialState = 'has-success'      
            this.setState({ 
              validacao_razaosocial: true
            })
          }
          if (this.state.campNome_fantasia !== "") {
            validate.nome_fantasiaState = 'has-success'      
            this.setState({ 
              validacao_nomefantasia: true
            })
          }          
  
          this.setState({ validate, inicio: 2 })
        } 
      })        
      .catch(error=>{
        alert("Error de conexão busca empresa "+error)
      })       
  
  }
   verificaNome() {
    const { validate } = this.state
       if (this.state.campNome.length == 0) {
        validate.nomeState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_nome: 'O campo nome é obrigatório.'  
         })      
       } else {
        this.setState({ 
          progresso: this.state.progresso + 5 
       });  

       }     
   }

   verificaSaidacnpj(e) {
    const { validate } = this.state
      
      if (e.target.value.trim().length == 0) {  
      validate.cnpjState = 'has-danger'
      validate.razao_socialState = ''
      validate.nome_fantasiaState = ''

        this.setState({ 
          validate,
          inicio: 1,  
          encontrou_cnpj: true, 
          campRazao_social: '',
          campNome_fantasia: '',
          mensagem_nome_fantasia: '',  
          mensagem_razao_social: '',  
          mensagem_CNPJ: 'O campo CNPJ é obrigatório'  
         })        
         
      } 
   }

   verificacnpjonfocus(e) {
    const { validate } = this.state         
       if (e.target.value.trim().length == 0){
          this.limpar_cnpj_nao_encontrado()
          validate.nome_fantasiaState = ''     
          validate.razao_socialState = ''
            validate.cnpjState = ''
            this.setState({ 
              validate,
              encontrou_cnpj: true, 
              campRazao_social: '',
              campNome_fantasia:'',
              campCnpj:'',
              mensagem_CNPJ: '',
              inicio: 1           
              })                                         
        } 
   }
   verificacnpj(e) {
    const { validate } = this.state         
        if (e.target.value.trim().length == 0) {
          validate.nome_fantasiaState = ''     
          validate.razao_socialState = ''
          this.setState({ 
            validate,
            encontrou_cnpj: true, 
            campRazao_social: '',
            campNome_fantasia:'',
            campCnpj:'',
            mensagem_CNPJ: '',
            inicio: 1           
            })     
        } else if (e.target.value.length == 18) {   
              this.setState({ 
                encontrou_cnpj: false 
              })       
                ///validate.cnpjState = ''
                  this.setState({ 
                  mensagem_CNPJ: '',
                  inicio: 2           
                  })  
                  console.log(' verifica '+e.target.value)                 
                  // verifica se é um número válido
                  if (cnpj.isValid(e.target.value)) {
                      //cnpj válido   
                      console.log(' CNPJ VALIDO '+e.target.value)            
                      this.verifica_base_cnpj(e)
      
                  } else {
                    console.log(' CNPJ INVALIDO '+e.target.value)
                    validate.cnpjState = 'has-danger'
                    this.setState({ 
                      mensagem_CNPJ: 'O campo CNPJ é inválido.',
                      encontrou_cnpj: true, 
                      inicio: 1           
                      })                                         
                  }                                 
                  this.setState({ validate })    
            }         
   }
  
  verificarazaosocial(e) {
    const { validate } = this.state      
       
       if (e.target.value.length == 0) {
  
        validate.razao_socialState = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,      
          mensagem_razao_social: 'O campo Razão Social é obrigatório'  
         })      
       } else {
        this.setState({ 
          inicio: 2,      
       });  

       }    
   }
  
  verificanomefantasia(e) {
    const { validate } = this.state
      
       if (e.target.value.length == 0) {  
        this.setState({ 
          inicio: 2,   
       });  
       } else if (e.target.value.length > 0)  {
        validate.nome_fantasiaState = 'has-success'
        this.setState({ 
          validate,          
          inicio: 2,      
          //mensagem_razao_social: 'wqqwqweqe'  
          //mensagem_razao_social: 'O campo Razão Social é obrigatório'  
         })                    

       }    
   }

   verifica_botao(inicio) {
    const { validate } = this.state
    if (inicio == 1) {
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
          </Box>           
      );   
    } else {    
    
          if (validate.cnpjState == 'has-success' && validate.razao_socialState == 'has-success') {            

              return (
                <Box bgcolor="error.main" color="error.contrastText" className="botoes_habilitados"  p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                </div>     
                </Box>           
              );
          }  else {
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
  
  cnpjchange(e) {
    this.setState({ campCnpj: cnpjMask(e.target.value) })
  
  }
  razaosocialchange(e) {
    this.setState({ campRazao_social: e.target.value })
  }
  nomefantasiachange(e) {
    this.setState({ campNome_fantasia: e.target.value })
  }
  
  
  validatecnpjChange(e){
    const { validate } = this.state
    
      console.log('TAMANHO - '+e.target.value.length)
      if (e.target.value.length == 0) {
        validate.cnpjState = ''
        this.setState({ 
           mensagem_CNPJ: '',
           encontrou_cnpj: false, 
           inicio: 1           
        })  
      } else if (e.target.value.length == 18) {   
        this.setState({ 
          encontrou_cnpj: false 
        })
        if (e.key !== 'Enter') {
          ///validate.cnpjState = ''
            this.setState({ 
            mensagem_CNPJ: '',
            inicio: 2           
            })  
            console.log(' verifica '+e.target.value)                 
            // verifica se é um número válido
            if (cnpj.isValid(e.target.value)) {
                //cnpj válido   
                console.log(' CNPJ VALIDO '+e.target.value)            
                this.verifica_base_cnpj(e)

            } else {
              console.log(' CNPJ INVALIDO '+e.target.value)
              validate.cnpjState = 'has-danger'
              this.setState({ 
                mensagem_CNPJ: 'O campo CNPJ é inválido.',
                encontrou_cnpj: true, 
                inicio: 1           
                })                                         
            }                     
        }  
      }  
        
      this.setState({ validate })
  }

  verifica_base_cnpj(e) {
  const { validate } = this.state
 // console.log('verifica_base_cnpj cnpj - '+cnpjremoveMask(e.target.value))         
  //let userId = this.props.match.params.id;  
  api.get(`/empresa/getEmpresaCnpj/${cnpjremoveMask(e.target.value)}/${sessionStorage.getItem('logcpfrep')}`)
  .then(res=>{
      console.log(JSON.stringify(res.data, null, "    ")); 
      if (res.data.success) {

        validate.cnpjState = 'has-danger' 
        this.setState({ 
          inicio: 1,         
          mensagem_CNPJ: 'O campo CNPJ já cadastrado.' 
        }) 
        
        this.setState({ 
           validate,
           encontrou_cnpj: true 
        })
      } else {
        console.log('nao encontrou base '+JSON.stringify(res.data, null, "    ")); 
        this.loadcnpj(e)
      }
    })        
    .catch(error=>{
      alert("Error de conexão cliente/get "+error)
    })   
  }
  validatenomefantasiaChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.nome_fantasiaState = ''
        this.setState({ 
          inicio:1,
          mensagem_nome_fantasia: '' 
        })  
      } else {
        validate.nome_fantasiaState = ''       
        this.setState({           
          inicio: 2
        })
       // this.verifica_botao(this.state.inicio)
      }  
      this.setState({ validate })
  }
  validaNomeChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.razao_socialState = ''
        this.setState({ 
          inicio: 1,
          mensagem_razao_social: '' 
        })  
      } else if (e.target.value.length > 0) {
        validate.razao_socialState = 'has-success'      
        this.setState({           
          inicio: 2
        })
        this.verifica_botao(this.state.inicio)
      }  
      this.setState({ validate })  
  }

sendUpdate(){        
  const { validate } = this.state;       
  validate.cpfState= '';
  this.setState({ 
     mensagem_aguarde: 'Aguarde, alterando os dados...',
     validate 
  }); 

  const datapost = {    
    razao_social: this.state.campRazao_social,              
    cnpj: cnpjremoveMask(this.state.campCnpj),
    nome_fantasia: this.state.campNome_fantasia,
    cidade: this.state.campCidade,
    complemento: this.state.campComplemento,
    numero: this.state.campNumero,
    bairro: this.state.campBairro,    
    endereco: this.state.campEndereco,
    estadoId: this.state.campEstado,    
    cep: this.state.campCep,
    clienteId: sessionStorage.getItem('logrepresentante')
  }          
    
      //  console.log(' dados empresa - '+JSON.stringify(datapost, null, "    "));        
        api.put(`/empresa/update/${sessionStorage.getItem('logid')}`, datapost)
        .then(response=>{
         // console.log(' resultado empresa - '+JSON.stringify(response.data, null, "    "));        
          if (response.data.success==true) {           
            
            sessionStorage.setItem('lograzao_social', this.state.campRazao_social);              
           // console.log('Atualiza perfil id - '+sessionStorage.getItem('logperfil')); 
            //sessionStorage.setItem('logid', response.data.data.id);
            if (sessionStorage.getItem('logperfil') == 1) {
              this.props.history.push(`/area_administrador/`);            
            } else {
              this.props.history.push(`/area_cliente_empresarial`);                                  
            }
  
          }
          else {
            alert("Error de conexao - ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })          
}  
validaterazaosocialChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.razao_socialState = 'has-danger'
      this.setState({ mensagem_razao_social: 'O campo Razão Social é obrigatório.' })  
    } else if (e.target.value.length > 0) {
      validate.razao_socialState = 'has-success'             
    }  
    this.setState({ validate })
}
loadcnpj(e) {
  const { validate } = this.state
  if (this.state.campCnpj.length > 0) { 

    //console.log(' recebe valores - '+JSON.stringify(this.state , null, "    "));                 

    //console.log('Consulta CNPJ 1 - '+this.state.campCnpj); 
    //console.log('Consulta CNPJ target - '+e.target.value); 
    console.log('Consulta CNPJ - '+cnpjremoveMask(this.state.campCnpj));   
    //const cnpj_consulta = cnpjremoveMask(this.state.campCnpj);
   let cnpj = `https://cors-anywhere.herokuapp.com/http://www.receitaws.com.br/v1/cnpj/${cnpjremoveMask(this.state.campCnpj)}`;
   //let cnpj = `http://www.receitaws.com.br/v1/cnpj/${cnpjremoveMask(this.state.campCnpj)}`;
    console.log(`campCNPJ - ${cnpj}`);
   // console.log(cnpj);
    api.get(cnpj)
    .then((val)=>{
      if (val.data !== null) {
        console.log('Saida Receita - '+JSON.stringify(val, null, "    "));

        if (val.data.situacao == "ATIVA") {
         console.log('SITUACAO - '+ val.data.situacao);       
         console.log(JSON.stringify(val.data , null, "    "));             

          let estado = ''
          console.log('val.data.uf - '+val.data.uf)       
         
          if (val.data.uf.length > 0) {
              api.get(`/estado/get/${val.data.uf}`)
              .then(res=>{      
                estado = res.data.data[0].id                   
                
                console.log('UF - '+ estado)
                
                this.setState({ 
                  campRazao_social: val.data.nome,              
                  //campEmail: atualiza_email,
                  campNome_fantasia: val.data.fantasia,                                               
                  //campEmailTeste: atualiza_email,
                  campBairro: val.data.bairro,
                  campCidade: val.data.municipio,
                  campEndereco: val.data.logradouro,
                  campComplemento: val.data.complemento,
                  campEstado: estado,
                  campNumero: val.data.numero,
                  campCep: cepremoveMask(val.data.cep),           
                  encontrou_cnpj: true,      
                });    

                sessionStorage.setItem('logcepbanco', this.state.campCep);  
                if (this.state.campCnpj !== "") {
                  validate.cnpjState = 'has-success'      
                }
                if (this.state.campRazao_social !== "") {
                  validate.razao_socialState = 'has-success'      
                }
                if (this.state.campNome_fantasia !== "") {
                  validate.nome_fantasiaState = 'has-success'      
                }              

                this.setState({ 
                  validate,              
                  inicio: 2,
                  mensagem_CNPJ: ''
                })   
                
                console.log('campEstado - '+this.state.campEstado)
              })        
              .catch(error=>{
                alert("Error de conexão  "+error)
              })   
             }
                         
              //console.log('Saida localizacao - '+JSON.stringify(this.state , null, "    "));
        
        } else {
          validate.cnpjState = 'has-danger'
          this.setState({ 
            mensagem_CNPJ: 'CNPJ não regular da receita federal', 
            encontrou_cnpj: true 
          })  
        }
      } else {
        validate.cnpjState = 'has-danger'
        this.setState({ 
          mensagem_CNPJ: 'CNPJ não encontrado na receita federal', 
          encontrou_cnpj: true  
        })  
      }
     // console.log('callapi: ' + JSON.stringify(val))
    }).catch(error=>{
      validate.cnpjState = 'has-success'
      this.setState({           
          mensagem_CNPJ: '',           
          encontrou_cnpj: true  
       })  
    })
     //})
  //.catch((error) => console.log('callapi:'+ JSON.stringify(error)));
  }
 }

 verificar_menu() {   

  return(
    <div>
    <div className="d-flex justify-content-around">
        <div className="botao_navegacao">
          <Link to={`/empresa/`+sessionStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
        </div>                  
        <div>
          <div className="titulo_representante">                
            <label> Dados da Empresa </label>             
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
analisando_retorno() {

  if (this.state.encontrou_cnpj !== true) {    
    return (
        <Spinner color="info" />                          
    );
  }
}

verificar_menu_lateral() {

  if (sessionStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (sessionStorage.getItem('logperfil') == 7) {
   return( 
     <Menu_cliente_empresarial />     
   );
  }

}

verifica_titulo() {
  if ( this.state.perfil == 1) {
    return (            
      'ADMINISTRADOR' 
     ); 
  } else {
    return (      
      sessionStorage.getItem('lognome')
     ); 
  }            
}

verifica_horario(){
  const d = new Date();
  const hour = d.getHours();

  if (hour < 5) {
    return (
      'boa noite'
      );        
  } else if (hour < 5) { 
    return (
      'bom dia' 
      );        
  } else if (hour < 8) { 
    return (
      'bom dia'          
      );        
  } else if (hour < 12) { 
    return (
      'bom dia'          
      );        
  } else if (hour < 18) { 
    return (
      'boa tarde'          
      );        
  } else { 
    return (
       'boa noite'          
      );        
  }
}

render(){  

return (
<div>    
<div>
 {this.verificar_menu_lateral()}
   <div>  
    
    <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo">Dados da Empresa </div>         
              </div>      
            </div>      

            <div className="d-flex flex-column espacamento_caixa_texto_ajuste">
            <div>                
              </div>
              <div class="p-2"> 
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">CNPJ</InputLabel>
                     <OutlinedInput
                        autoComplete="off"         
                        readOnly={this.state.campo_cnpj_disabled}                        
                        error={this.state.erro_cnpj}
                        helperText={this.state.mensagem_CNPJ}
                        className="data_text"              
                        id="outlined-basic"                      
                        variant="outlined"
                        value={this.state.campCnpj}
                        onBlur={this.verificaSaidacnpj}
                        onFocus={this.verificacnpjonfocus}                   
                        onKeyUp={this.verificacnpj}                   
                        onChange={ (e) => {
                          this.cnpjchange(e)                       
                          this.validatecnpjChange(e)
                        }}   
                        inputProps={{
                          maxLength: 18,
                        }}          
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_cnpj? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={50}
                    />
                   <FormHelperText error={this.state.erro_cnpj}>
                         {this.state.mensagem_CNPJ}
                   </FormHelperText>
                  </FormControl>                 
              </div>
              <div class="p-2"> 
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Razão Social</InputLabel>
                     <OutlinedInput
                        autoComplete="off"         
                        readOnly={this.state.campo_razao_social_disabled}                        
                        error={this.state.erro_razaosocial}
                        helperText={this.state.mensagem_razao_social}
                        className="data_text"  
                        id="outlined-basic"                      
                        variant="outlined"
                        value={this.state.campRazao_social}                      
                        onBlur={this.verificarazaosocial}
                        onKeyUp={this.verificarazaosocial}
                        onChange={ (e) => {
                          this.razaosocialchange(e)                       
                          this.validaterazaosocialChange(e)
                        }}   
                        inputProps={{
                          maxLength: 18,
                        }}          
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_razaosocial? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={110}
                    />
                   <FormHelperText error={this.state.erro_razaosocial}>
                         {this.state.mensagem_razao_social}
                   </FormHelperText>
                  </FormControl>                     
              </div> 
              <div class="p-2">    
              <FormControl variant="outlined">
                    <InputLabel className="label_text" htmlFor="filled-adornment-password">Nome Fantasia</InputLabel>
                     <OutlinedInput
                        autoComplete="off"         
                        readOnly={this.state.campo_nome_fantasia_disabled}                        
                        error={this.state.erro_nomefantasia}
                        helperText={this.state.mensagem_nome_fantasia}
                        className="data_text"      
                        id="outlined-basic"                      
                        variant="outlined"
                        value={this.state.campNome_fantasia}                      
                        onBlur={this.verificanomefantasia}
                        onKeyUp={this.verificanomefantasia}                
                        onChange={ (e) => {
                          this.nomefantasiachange(e)                       
                          this.validatenomefantasiaChange(e)
                        }}                                  
                      endAdornment={
                        <InputAdornment position="end">
                             {this.state.validacao_nomefantasia? <CheckIcon />: ''}
                        </InputAdornment>
                      }
                      labelWidth={140}
                    />
                   <FormHelperText error={this.state.erro_nomefantasia}>
                         {this.state.mensagem_nome_fantasia}
                   </FormHelperText>
                  </FormControl>                        
              </div>                     
            </div>      
            <div className="mensagem_aguarde">
              <FormHelperText>
                  {this.state.mensagem_aguarde}
              </FormHelperText>       
            </div>            
            {this.verifica_botao(this.state.inicio)}             
         </div>            
     </div>             
   </div>  

  );
} 
}
export default empresarialComponent;