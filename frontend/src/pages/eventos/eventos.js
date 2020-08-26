import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import { cnpjMask } from '../formatacao/cnpjmask';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { valorMask } from '../formatacao/valormask';

import api from '../../services/api';
import './eventos.css';

var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
//const nodemailer = require('nodemailer');
const andamento_cadastro = localStorage.getItem('logprogress'); 
//var sendmail = require('../sendmail')({silent: true})

class operadoresComponent extends React.Component{  

  constructor(props){
    super(props);  
    this.textInput = React.createRef();
    this.state = { 
      dataEvento:{},       
      campordem_servico: '', 
      campnome_evento: '', 
      campdata_evento: '',    
      camptipoTransporteId: '', 
      campvalor_total: '',      
      nome: "",
      perfil: "",   
      criador_logado_Id: "",      
      listEstados:[],
      listTipoTransporte:[],    
      mensagem_ordem_servico: '',  
      mensagem_nome_evento: '',  
      mensagem_data_evento: '',  
      mensagem_valor_total: '',      
      incluir: false, 
      inicio: 1,
      progresso: 0,      
      validate: {
        ordem_servicoState: '',      
        nome_eventoState: '',   
        data_eventoState: '',     
        tipo_transporteState: '',   
      }    
    }
   
    this.tipoChange = this.tipoChange.bind(this);    
    this.ordem_servicoChange = this.ordem_servicoChange.bind(this);    
    this.nome_eventoChange = this.nome_eventoChange.bind(this);    
    this.data_eventoChange = this.data_eventoChange.bind(this);    

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.busca_operador = this.busca_operador.bind(this);
   // this.busca_cliente = this.busca_cliente.bind(this);
    this.verificar_menu = this.verificar_menu.bind(this);

    //this.envio_email = this.envio_email.bind(this);   
    
    this.verifica_nome_operador = this.verifica_nome_operador.bind(this);
  }

  componentDidMount(){ 
   
    let userId = this.props.match.params.id;    
    
    localStorage.setItem('logid', userId);
    
    console.log('userID - '+userId)
    console.log('logid - '+localStorage.getItem('logid'));
    console.log('Perfil log - '+localStorage.getItem('logperfil'));    
    
    //const logperfil = localStorage.getItem('logperfil');
    this.loadTipoTransporte();

    if (localStorage.getItem('logperfil') == 2) {      
       this.busca_cliente();
    }      
    if (localStorage.getItem('logperfil') == 7) {  
      
      this.busca_empresa()           
    }

    if (localStorage.getItem('logperfil') == 8) {       
      this.busca_operador()      
      this.setState({              
        progresso: 25
      }); 
    }  
    
  }

  verifica_nome_operador(nome){
    let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
    if (nome_titulo == "") {
      nome_titulo = nome
    }
    return(    
          nome_titulo          
       );  
  } 

  busca_cliente() {
    
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
       // console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({           
            campCpf: cpfMask(res.data.data[0].cpf),     
            campNome: res.data.data[0].nome,                                  
            inicio: 1
          })                         
        } 
      })        
      .catch(error=>{
        alert("Error de conexão cliente "+error)
      })       
  
  } 
  busca_empresa() {
    
    api.get(`/empresa/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({           
            campCpf: cnpjMask(res.data.data[0].cnpj),     
            campNome: res.data.data[0].razao_social,                                  
            inicio: 1
          })                         
        } 
      })        
      .catch(error=>{
        alert("Error de conexão empresa "+error)
      })       
  
  } 
  busca_operador() {
    //const { validate } = this.state  
    api.get(`/operador/get/${localStorage.getItem('logid')}`)
    .then(res=>{
      //  console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({ 
            campCpf: res.data.data[0].cpf,
            campNome: res.data.data[0].nome,                       
            inicio: 1,
          })                

        } 
      })        
      .catch(error=>{
        alert("Error de conexão operador "+error)
      })       
  
  }
  
  tipoChange(e) {
    this.setState({ camptipoTransporteId: e.target.value })
  }
  ordem_servicoChange(e) {
    this.setState({ campordem_servico: e.target.value })
  }
  nome_eventoChange(e) {
    this.setState({ campnome_evento: e.target.value })
  }
  data_eventoChange(event) {     
    this.setState({        
        campdata_evento: event.target.value
    });    
  } 
 
  verificaEmailonfocus(e){   
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.emailState = ''
      this.setState({ 
          validate,
          mensagem_email: ''  
      })                   
    } else {
      this.busca_email_ja_cadastrado(e.target.value)         
    }            
   } 

  verificaCpfOnblur(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
       validate.cpfState = 'has-danger'
       this.setState({ 
        validate,               
        inicio: 1,
        mensagem_cpf: 'O campo CPF é obrigatório'  
       })            
    }   
  }  
  verificaCpf(e) {
    const { validate } = this.state
       if (e.target.value.length == 0) {
        //validate.cpfState = 'has-danger'
        validate.datanascimentoState = ''
        validate.emailState = ''
        validate.nomeState = ''
        validate.telefone1State = ''
        this.setState({ 
          validate,       
          campNome: '',
          campData_nascimento: '',
          campEmail: '',
          campTelefone1: '',
          inicio: 1,
         // mensagem_cpf: 'O campo CPF é obrigatório'  
         })            
       } else if (e.target.value.length == 14) {
        if (cpf.isValid(e.target.value)) {
          //cpf válido 
          console.log('é valido - '+e.target.value);
          this.busca_cpf(e);// se existir não deixa cadastrar
        }
         
       }  
   }
  
  verificaTelefone1(e) {  
    const { validate } = this.state
       if (e.target.value.length == 0) {          
        //validate.telefone1State = 'has-danger'
        this.setState({ 
          validate,
          inicio: 1,
          //mensagem_telefone1: 'O campo Telefone é obrigatório.'
         })      
       } else {       

        if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success' ;                
            this.setState({ 
              mensagem_telefone1: ''
          });           
        }

       }        
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

  loadFillData(){  
  
    return this.state.listTipoTransporte.map((data)=>{          
      return(
         <MenuItem value={data.id}>{data.descricao}</MenuItem>      
      )
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
        validate.nomeState = 'has-success' ;        

        this.setState({ 
          mensagem_nome: ''
       });  

       }         
   }
  verificaDataNascimento() {
    const { validate } = this.state
       if (this.state.campData_nascimento.length == 0) {
        validate.datanascimentoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.'  
         })      
       } else {

          validate.datanascimentoState = 'has-success' ;        
          this.setState({ 
            mensagem_data_nascimento: ''
          });     

       }        
   }
    
    validaCpfChange(e){
      const { validate } = this.state
      
        if (e.target.value.length == 0) {
          validate.cpfState = ''
          this.setState({ mensagem_cpf: '' })  
        } else if (e.target.value.length == 14) {          
          //valida o cpf 
           console.log('e.target.value - '+e.target.value);
           if (cpf.isValid(e.target.value)) {
               //cpf válido 
               console.log('é valido - '+e.target.value);
               this.busca_cpf(e);// se existir não deixa cadastrar

           } else {
            validate.cpfState = 'has-danger'       
            this.setState({ mensagem_cpf: 'O campo CPF é inválido' })     
           } 
        //  this.busca_cpf(e) 
        //  validate.cpfState = 'has-success'       
        //  this.setState({ mensagem_cpf: '' })  
        }  
        this.setState({ validate })
    }
    
    validatelefone1Change(e){
      const { validate } = this.state
       
        if (e.target.value.length == 0) {
          validate.telefone1State = ''
          //this.setState({ mensagem_telefone1: 'O campo Telefone é obrigatório.' })  
        } else {          
          
          if (e.target.value.length == 15) {
            validate.telefone1State = 'has-success'       
            this.setState({ mensagem_telefone1: '' })  

            this.setState({ 
              inicio: 2,
              progresso: 25
            });             
          }          
        }  
        this.setState({ validate })
        this.verifica_botao(this.state.inicio)
    }
    
validaNomeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length > 0) {
      validate.nomeState = ''
      //this.setState({ mensagem_nome: '' })  
   // } else if (e.target.value.length > 10) {      
   //   validate.nomeState = 'has-success'       
   //   this.setState({ mensagem_nome: '' })  
    }  
    this.setState({ validate })  
}
validaDataNascimentoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length < 10) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' })  
    } else {    
      
      if (e.target.value.length == 13) {
        
        //var data_nascimento = new Date(e.target.value).toString;  
        //console.log('e.target.value.length - '+e.target.value.length);
        if (dateFormat(e.target.value) ) {
          validate.datanascimentoState = 'has-success' ;        
          this.setState({ 
            mensagem_data_nascimento: '',  
            progresso: 5 
          });  

        } else {
         // console.log('DATA NASCIMENTO - '+this.state.campData_nascimento)
          validate.datanascimentoState = 'has-danger'
          this.setState({ 
            validate,
            mensagem_data_nascimento: 'Formato inválido'  
          })      
        }    
      } else if (e.target.value.length > 10) {
        validate.datanascimentoState = 'has-danger'
          this.setState({ 
            validate,
            mensagem_data_nascimento: 'Formato inválido'  
          })      
      }
      
    }  
    this.setState({ validate })
}

verifica_botao(inicio) {
  const { validate } = this.state    
  console.log('perfil verifica_botao -'+localStorage.getItem('logperfil'))
  
  if (localStorage.getItem('logperfil') == 1) {
    if (inicio == 1) {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
          <div className="d-flex justify-content-center">
            <label> Incluir </label>
          </div>     
       </Box>                
      );   
    } else {
      if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
        && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
        && validate.telefone1State == 'has-success') {
          return (           
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_evento_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
                  <label> Incluir </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
        }         

      }    
    }  else if (localStorage.getItem('logperfil') == 2) {
      if (inicio == 1) {
        return (
  
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
      } else {
      if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
          && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
          && validate.telefone1State == 'has-success') {
            return (           
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_evento_habilitado"  p={2} onClick={()=>this.sendSave()}>
              <div className="d-flex justify-content-center">
              <label> Incluir </label>
              </div>     
              </Box>           
            );
          } else {
            return (
  
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Incluir </label>
                    </div>     
              </Box>           
          );   
          }   
        }         
  }  else if (localStorage.getItem('logperfil') == 7) {
    if (inicio == 1) {
      return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                <div className="d-flex justify-content-center">
                <label> Incluir </label>
                </div>     
          </Box>           
      );   
    } else {
    if (validate.data_eventoState == 'has-success' && validate.nome_eventoState == 'has-success'  
        && validate.ordem_servicoState == 'has-success' && validate.nomeState == 'has-success' 
        && validate.telefone1State == 'has-success') {
          return (           
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_evento_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
            <label> Incluir </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
        }   
      }         
    }  else if (localStorage.getItem('logperfil') == 8) {
      if (inicio == 1) {
        return (
  
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Alterar </label>
                  </div>     
            </Box>           
        );   
      } else {
      if (validate.cpfState == 'has-success' && validate.datanascimentoState == 'has-success'  
          && validate.emailState == 'has-success' && validate.nomeState == 'has-success' 
          && validate.telefone1State == 'has-success') {
            return (           
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_evento_habilitado"  p={2} onClick={()=>this.sendSave()}>
              <div className="d-flex justify-content-center">
              <label> Alterar </label>
              </div>     
              </Box>           
            );
          } else {
            return (
  
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_evento" p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Alterar </label>
                    </div>     
              </Box>           
          );   
          }   
        }         
    }    
} 

sendSave(){        
     
     if (this.state.incluir == true) {
      const datapost_incluir = {
        logid: localStorage.getItem('logid'),
        perfilId: localStorage.getItem('logperfil'),    
        ordem_servico: this.state.campordem_servico, 
        nome_evento: this.state.campnome_evento, 
        data_evento: this.state.campdata_evento,         
        tipoTransporteId: this.state.camptipoTransporteId, 
        //statusId: 7,      
       // situacaoId: 1
       }           

       console.log('incluir - '+JSON.stringify(datapost_incluir, null, "    ")); 
        api.post('/evento/create',datapost_incluir)
        .then(response=>{
          if (response.data.success) {                       
          
          if (localStorage.getItem('logperfil') == 1) {
             localStorage.setItem('logperfil', 1);
             this.props.history.push('/area_administrador');                 
          } else if (localStorage.getItem('logperfil') == 7) {            
            this.props.history.push(`/area_cliente_empresarial`);       
          } else if (localStorage.getItem('logperfil') == 8) {
            localStorage.setItem('lognome', this.state.campNome);  
            localStorage.setItem('logperfil', 8);
            this.props.history.push('/area_operador');       
          }           
  
          }
          else {
            alert("Error de conexao ")              
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
    } else {
      const datapost_alterar = {     
        perfilId: localStorage.getItem('logperfil'),    
        ordem_servico: this.state.campordem_servico, 
        nome_evento: this.state.campnome_evento, 
        data_evento: this.state.campdata_evento,         
        tipoTransporteId: this.state.camptipoTransporteId, 
       }           
      console.log('Alterar - '+JSON.stringify(datapost_alterar, null, "    ")); 
      api.put(`/evento/update/${localStorage.getItem('logid')}`, datapost_alterar)
      .then(response=>{
        if (response.data.success==true) {                                  
    
          if (localStorage.getItem('logperfil') == 1) {
            this.props.history.push(`/area_administrador`);
          } else if (localStorage.getItem('logperfil') == 7) {
              this.props.history.push(`/area_cliente_empresarial`);                   
          } else if (localStorage.getItem('logperfil') == 8) {
              this.props.history.push(`/area_operador`);                                  
          }            

        }
        else {
//console.log('criar - '+JSON.stringify(datapost, null, "    ")); 
          alert("Error na Criação verificar log")              
        }
      }).catch(error=>{
        alert("Error 34 ")
      })

    }      
}  

verificar_menu() {   
 // console.log('perfil verificar_menu -'+localStorage.getItem('logperfil'))

  if (localStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
    return(
      <div>
      <div className="d-flex justify-content-around">
           <div className="botao_navegacao">                 
               <Link to='/area_administrador'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
             </div>                  
             <div>
               <div className="titulo_representante">                
                 <label>  Olá, Fale um pouco sobre você!</label>            
               </div>
             </div>   
             
             <div>
                <div className="botao_navegacao">                                     
                </div>   
             </div>                     
      </div>      
        <br/>    
        <div>        
           <Progress color="warning" value={this.state.progresso} className="progressbar"/>
        </div>      
  </div>           
      );
 } else  if (localStorage.getItem('logperfil') == 2) {  //CLIENTE INDIVIDUAL
      return(
        <div>
        <div className="d-flex justify-content-around">
             <div className="botao_navegacao">                 
                 <Link to='/area_cliente_individual'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                   <label> Cadastre o seu Evento </label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">                                 
                  </div>   
               </div>                     
        </div>      
          <br/>    
          <div>        
             <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>      
    </div>           
        );     

  } else if (localStorage.getItem('logperfil') == 7) { // CLIENTE EMPRESARIAL           

    return(
      <div className="d-flex justify-content-around">
              <div className="botao_navegacao">                 
                 <Link to="/area_cliente_empresarial"> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     <label>  Cadastre os dados do Evento  </label>            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                  <div></div>                            
                  </div>   
               </div>   
             
      </div>
      );
  } else if (localStorage.getItem('logperfil') == 8) { // OPERADOR
    return(
      <div className="d-flex justify-content-around">
              <div className="botao_navegacao">                 
                 <Link to="/area_operador"> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                    <label>  {this.verifica_nome_operador(this.state.campNome)}, altere seus dados </label>            
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
                       <label for="inputAddress">CPF / CNPJ </label>
                       <Input                    
                          disabled= {true}
                          type="text"
                          name="nome"
                          className="texto_placa"
                          id="examplnome"
                          placeholder=""
                          autoComplete='off'
                          autoCorrect='off'
                          value={this.state.campCpf}                                                                                                             
                      />                                                   
                       </div> 
                       
                       <div>         
                       <label className="label_modelo_1" for="inputAddress">Nome </label>
                       <Input    
                          disabled= {true}                 
                          type="text"
                          name="nome"
                          className="texto_modelo_1"
                          id="examplnome"
                          placeholder=""
                          autoComplete='off'
                          autoCorrect='off'
                          value={this.state.campNome}                                                                
                      />                                  
                       </div>                        
                  </div>
              </div> 
              <div class="p-2">               
               
                       <label for="inputAddress" className="titulo_placa">Nome Evento *</label>
                      <Input              
                        type="text"
                        name="nome"
                        className="texto_evento"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campnome_evento}
                        valid={ this.state.validate.nome_eventoState === 'has-success' }
                        invalid={ this.state.validate.nome_eventoState === 'has-danger' }
                        onBlur={this.verificaAno}                       
                        onChange={ (e) => {
                          this.nome_eventoChange(e)
                        }}    
                        maxlength="250"     
                        fullwidth                                                                 
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.nome_eventoState}>
                          {this.state.mensagem_nome_evento}
                      </FormFeedback>                   
              </div> 
              <div class="p-2">    
                <div class="d-flex justify-content-start">
                       <div>
                       <label for="inputAddress" className="titulo_placa">Ordem de Serviço *</label>
                      <Input                    
                        type="text"
                        name="nome"
                        className="texto_placa"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campordem_servico}
                        valid={ this.state.validate.ordem_servicoState === 'has-success' }
                        invalid={ this.state.validate.ordem_servicoState === 'has-danger' }
                        onBlur={this.verificaPlaca}                   
                        onChange={ (e) => {
                          this.ordem_servicoChange(e)                       
                        }}    
                        maxlength="10"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.ordem_servicoState}>
                          {this.state.mensagem_ordem_servico}
                      </FormFeedback>    
                       </div>
                       <div>
                       <label for="inputAddress" className="titulo_ano">Data do Evento *</label>
                      <Input           
                        className="texto_ano"         
                        type="date"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campdata_evento}
                        valid={ this.state.validate.data_eventoState === 'has-success' }
                        invalid={ this.state.validate.data_eventoState === 'has-danger' }
                        onBlur={this.verificaAnoDUT}
                        onChange={ (e) => {
                          this.data_eventoChange(e)                       
                        }}    
                        maxlength="20"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.data_eventoState}>
                          {this.state.mensagem_data_evento}
                      </FormFeedback>    
                       </div>                                                       
                </div>    
            </div>      
            <div class="p-2">               
             <FormControl variant="outlined" className="select_matriz_tipo">
                <InputLabel id="demo-simple-select-outlined-label">Tipo de Transporte *</InputLabel>
                <Select                
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.camptipoTransporteId}
                  onFocus={this.verificaTipo_veiculo}          
                  onChange={ (e) => {
                    this.tipoChange(e)
                  }}    
                  label="Tipo Transporte"
                >
                  {this.loadFillData()}                    
                </Select>
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
export default operadoresComponent;