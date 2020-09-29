import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';

//FOTO
import filesize from "filesize";
import Upload from "../Upload";
import FileList from "../Filelist";
import { Container, Content } from "../style";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
///

import api from '../../services/api';
import './empresarial.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
//const cep_empresa = localStorage.getItem('logcep');     
//const userNome = ;
const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class criarOperadoresComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campFoto: "",
      campNome: "",
      campEmail: "",      
      inicio: 1,
      mensagem_email: '',     
      perfillog: false,      
      campgerencia_eventos: false,
      campefetua_pagamentos: false,
      campgerencia_todos_eventos: false,
      campinclui_cartao: false,
      campinclui_operadores: false,
      campvisualiza_eventos: false,      
      validate: {      
        emailState: '',        
      }    
    }
    this.verificar_menu = this.verificar_menu.bind(this);      
    //this.verifica_nome_motorista = this.verifica_nome_motorista.bind(this);

    this.validaEmailChange = this.validaEmailChange.bind(this);    
    this.emailchange = this.emailchange.bind(this);

    this.handlegerenciaChange = this.handlegerenciaChange.bind(this);
    this.handlegerenciatodosChange = this.handlegerenciatodosChange.bind(this);
    this.handleincluiCartaoChange = this.handleincluiCartaoChange.bind(this);
    this.handlevisualizaEventosChange = this.handlevisualizaEventosChange.bind(this);
    this.handleefetuaPagamentoChange = this.handleefetuaPagamentoChange.bind(this);
    this.handleincluiOperadoresChange = this.handleincluiOperadoresChange.bind(this);

    this.verifica_nome_empresa = this.verifica_nome_empresa.bind(this);

  }

  componentDidMount(){  

    let userId = this.props.match.params.id;

    if (userId !== 0) {
      localStorage.setItem('logid', userId);

    }

    //if (localStorage.getItem('logperfil') == 0) {
    // localStorage.setItem('logperfil', 7);
   // }    
    
    this.setState({      
      progresso: 85,
      campNome: localStorage.getItem('lognome'), 
    });    
   
    
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

  handlegerenciaChange = (event) => {
    this.setState({ 
      campgerencia_eventos: event.target.checked
    });
  };
  handlegerenciatodosChange = (event) => {
    this.setState({ 
      campgerencia_todos_eventos: event.target.checked
    });
  };
  handleincluiCartaoChange = (event) => {
    this.setState({ 
      campinclui_cartao: event.target.checked
    });
  };
  handleincluiOperadoresChange = (event) => {
    this.setState({ 
      campinclui_operadores: event.target.checked
    });
  };
  handleefetuaPagamentoChange = (event) => {
    this.setState({ 
      campefetua_pagamentos: event.target.checked
    });
  };
  handlevisualizaEventosChange = (event) => {
    this.setState({ 
      campvisualiza_eventos: event.target.checked
    });
  };
    

verifica_botao(inicio) {
  const { validate } = this.state 
   // console.log(JSON.stringify(this.state, null, "    "));
   // console.log(JSON.stringify(inicio, null, "    "));
 if (localStorage.getItem('logperfil') == 0) {  
      if (inicio == 1) {

            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                      <div className="d-flex justify-content-center">
                      <label> Enviar </label>
                      </div>     
                </Box>           
            );   
             
      } else {

        if (validate.emailState == 'has-success') { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                      <div className="d-flex justify-content-center">
                      <label> Enviar </label>
                      </div>     
                </Box>           
            );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Enviar </label>
                    </div>     
              </Box>           
          );   
        }   

      } 
    } else if (localStorage.getItem('logperfil') == 1) {     
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Enviar </label>
                  </div>     
            </Box>           
        );   
      } else {
        if (validate.emailState == 'has-success') { 
            return (
              <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                      <div className="d-flex justify-content-center">
                      <label> Enviar </label>
                      </div>     
                </Box>           
            );   
       } else {
        return (
      
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Enviar </label>
                  </div>     
            </Box>           
        );                   

       } 
      }  
    } else if (localStorage.getItem('logperfil') == 7) {  
      if (inicio == 1) {
        return (
    
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Enviar </label>
                  </div>     
            </Box>           
        );   
      } else {
        if (validate.emailState == 'has-success') { 
          return (
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                    <div className="d-flex justify-content-center">
                    <label> Enviar </label>
                    </div>     
              </Box>           
          );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_foto"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Enviar </label>
                    </div>     
              </Box>           
          );                   

        } 
      } 
    }  
} 

sendUpdate(){        
  const email_envio = this.state.campEmail
  const operadordata = {  
    email: this.state.campEmail,    
    empresaId: localStorage.getItem('logid'),     
    statusId: 6,
    gerenciar_eventos: this.state.campgerencia_eventos, 
    gerenciar_todos_eventos: this.state.campgerencia_todos_eventos, 
    incluir_cartao: this.state.campinclui_cartao, 
    visualizar_eventos: this.state.campvisualiza_eventos,
    efetuar_pagamentos: this.state.campefetua_pagamentos, 
    incluir_outors_operadores: this.state.campinclui_operadores,    
  }  
  
  //console.log(' resultado envio - '+JSON.stringify(operadordata, null, "    "));       
  api.get(`/emailOperador/getemail/${this.state.campEmail}`)
  .then(res1=>{             

    if (res1.data.data.length == 0) {    
   
      api.post(`/emailOperador/create`, operadordata)
      .then(res=>{             
       // console.log(' resultado - '+JSON.stringify(res.data, null, "    "));       
         //   url: `http://localhost:3000/operadores/${res.data.data.id}`,   
        //url: `http://www.oser.app.br:21497/operadores/${res.data.data.id}`,
        if (res.data.success == true) {    
    
          const params = {    
            email: email_envio,                
          }    
          api.post("/login/create", params);       
    
          const params_email = {    
            email: email_envio,         
           // url: `http://localhost:3000/operadores_incluir/${res.data.data.id}/${res.data.data.email}`,     
            url: `http://www.oser.app.br:21497/operadores_incluir/${res.data.data.id}/${res.data.data.email}`,     
            texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
          }      
         // console.log(' resultado - '+JSON.stringify(params_email, null, "    "));    
            
          api.post("/email/send", params_email)       
                   
          alert('Mensagem Enviada');

          if (localStorage.getItem('logperfil') == 7) {              
            this.props.history.push(`/operador_lista_empresa/`+localStorage.getItem('logid'));               
          } else if (localStorage.getItem('logperfil') == 1) {               
            this.props.history.push(`/operador_lista`);               
          }
        }      
      })        
      .catch(error=>{
        alert("Erro de conexão "+error)
      })        

    } else {      

      const params_email = {    
        email: email_envio,            
        url: `http://www.oser.app.br:21497/operadores_incluir/${res1.data.data.id}/${res1.data.data.email}`,     
        //url: `http://localhost:3000/operadores_incluir/${res1.data.data.id}/${res1.data.data.email}`,     
        texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
      }      
        
      api.post("/email/send", params_email)       
               
      alert('Mensagem Enviada');

      if (localStorage.getItem('logperfil') == 7) {              
        this.props.history.push(`/operador_lista_empresa/`+localStorage.getItem('logid'));               
      } else if (localStorage.getItem('logperfil') == 1) {               
        this.props.history.push(`/operador_lista`);               
      }         

    }
  
  })        
  .catch(error=>{
    alert("Erro de conexão "+error)
  })        

  

 
}
busca_email_ja_cadastrado(email) {
  const { validate } = this.state
  api.get(`/login/getEmail/${email}`)
  .then(res=>{          
   // console.log(' resultado motorista - '+JSON.stringify(res.data, null, "    "));        
    if (res.data.success) {

            validate.emailState = 'has-danger'
              this.setState({ 
                validate,
                mensagem_email: 'Email já cadastrado.'  
            })                                 
    }      
  })        
  .catch(error=>{
    alert("Erro de conexão 3"+error)
  })                   
}

validaEmailChange = async (event) => {
  const { target } = event;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const { name } = target;
  await this.setState({
  [ name ]: value,
  });
  }
  

validateEmail(e) {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { validate } = this.state
  //if (e.target.value.length < 18) {
  if (emailRex.test(e.target.value)) {                         
      validate.emailState = 'has-success'       
      this.busca_email_ja_cadastrado(e.target.value)                
      this.setState({ 
        validate,
        inicio: 2 })            
      
  } else {
    validate.emailState = 'has-danger'
    this.setState({ 
      validate,
      mensagem_email: '' })  
  }

  this.setState({ validate })

}   


emailchange(e) {
  this.setState({ campEmail: e.target.value })
}

verificar_menu(){
  
  if (localStorage.getItem('logperfil') == 1) { 
    return(
      <div>
      <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to={'/area_administrador'}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                    Envie um email para o Operador  
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
  } else if (localStorage.getItem('logperfil') == 7) { 
    return(
      <div>
      <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to="/area_cliente_empresarial"> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     {this.verifica_nome_empresa(this.state.campNome)}, inclua um Operador
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
render(){  
  const { uploadedFilesFoto } = this.state;
return (
<div>    
<div className="container_alteracao">
   <Menu_cliente_empresarial /> 
<div className="d-flex justify-content"> 
   <div className="area_esquerda">     
         {this.verificar_menu()}   
           <div class="d-flex flex-column espacamento_caixa_texto">              
              <div class="p-2">                                          
                   <label for="email1">Email *</label>
                      <Input                              
                        type="email"    
                        className="input_text_empresa"              
                        placeholder=""
                        autoComplete='off'
                        autoCorrect='off'
                        value={this.state.campEmail}      
                        valid={ this.state.validate.emailState === 'has-success' }
                        invalid={ this.state.validate.emailState === 'has-danger' }                                                                
                        onChange={ (e) => {
                                    this.emailchange(e) 
                                    this.validateEmail(e)
                                    this.validaEmailChange(e)                                
                                  } }
                        maxlength="80"          
                      />       
                       <FormFeedback 
                      invalid={this.state.validate.emailState}>
                          {this.state.mensagem_email}
                      </FormFeedback> 
              </div>
              <div class="p-2">
                  <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={this.state.campgerencia_eventos}
                          control={<Switch color="primary" checked={this.state.campgerencia_eventos} 
                               onChange={this.handlegerenciaChange}/>}
                          label="Gerenciar Eventos"
                          labelPlacement="end"                           
                        />                       
                      </FormGroup>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={this.state.campefetua_pagamentos}
                          control={<Switch color="primary" checked={this.state.campefetua_pagamentos} 
                               onChange={this.handleefetuaPagamentoChange}/>}
                          label="Efetuar Pagamentos"
                          labelPlacement="end"
                        />                       
                      </FormGroup>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={this.state.campinclui_cartao}
                          control={<Switch color="primary" checked={this.state.campinclui_cartao} 
                               onChange={this.handleincluiCartaoChange}/>}
                          label="Incluir cartão de Crédito"
                          labelPlacement="end"
                        />                       
                      </FormGroup>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={this.state.campinclui_operadores}
                          control={<Switch color="primary" checked={this.state.campinclui_operadores} 
                               onChange={this.handleincluiOperadoresChange}/>}
                          label="Incluir Outros Operadores"
                          labelPlacement="end"
                        />                       
                      </FormGroup>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={this.state.campgerencia_todos_eventos}
                          control={<Switch color="primary" checked={this.state.campgerencia_todos_eventos} 
                               onChange={this.handlegerenciatodosChange}/>}
                          label="Gerenciar Todos os Eventos"
                          labelPlacement="end"
                        />                       
                      </FormGroup>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={this.state.campvisualiza_eventos}
                          control={<Switch color="primary" checked={this.state.campvisualiza_eventos} 
                             onChange={this.handlevisualizaEventosChange}/>}
                          label="Somente Visualizar Evento"
                          labelPlacement="end"
                        />                       
                      </FormGroup>
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
export default criarOperadoresComponent;