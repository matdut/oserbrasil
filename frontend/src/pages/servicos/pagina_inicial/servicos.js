import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
//import { cepMask } from '../../formatacao/cepmask';
import api from '../../services/api';
import './individual.css';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\$%\^&\*])(?=.{8,})");
//const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

const minimooitocaracterRegex = new RegExp("(?=.{8,})");
const umaletramaiusculaRegex = new RegExp("(?=.*?[A-Z])");
const umnumeroRegex = new RegExp("(?=.*[0-9])");
const umncaracterespecialRegex = new RegExp("(?=.*?[#?!@$%^&*-])");
//const controleRegex = new RegExp("(?=.{8,})(?=.*?[A-Z])(?=.*\d)[A-Za-z\d](?=.*?[#?!@$%^&*-])");

const andamento_cadastro = localStorage.getItem('logprogress');     
//const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');
//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class servicosComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {           
      validate: {
        senhaState: '',       
      }    
    }            
    
  }

  componentDidMount(){  
    

  }

  
  carrega_senha() {
    const { validate } = this.state;
    api.get(`/login/get/${localStorage.getItem('logid')}`) 
    .then(res=>{
      if (res.data.success) {
        this.setState({     
            campSenha: res.data.data[0].senha,
            campSenhaTeste: res.data.data[0].senha,
        })      

        if (this.state.campSenha == null) {
          this.setState({ 
            campSenha: ""
          })  
        }  
        
        if (this.state.campSenha !== "") {
          validate.oitocaracteresState = 'has-success' 
          validate.umaletramaiusculaState = 'has-success' 
          validate.umnumeroState = 'has-success'             
          this.setState({ 
            validate,
            inicio: 2       
          })  
          this.verifica_botao(this.state.inicio)    
          this.validacoes_mensagens(this.state.validacao_inicial)  
        }

      } 
    })        
    .catch(error=>{
      alert("Error de conexão login "+error)
    })     
  }

  
  carrega_cliente() {
    const { validate } = this.state;
    api.get(`/cliente/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log(JSON.stringify(res.data, null, "    ")); 
        if (res.data.success) {
           
          this.setState({                        
            campNome: res.data.data[0].nome,         
            inicio: 1       
          })            

        }  
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
    }
  limpar_campos() {
    this.state = {           
      backgroundColor: "#4285F4",      
      validate: {
        senhaState: '',      
      }    
    } 
  }
  
sendUpdate(){    

}  

verifica_botao(inicio) {
  const { validate } = this.state;
  //console.log(JSON.stringify(this.state, null, "    "));
  //console.log(JSON.stringify(inicio, null, "    "));
  if (localStorage.getItem('logperfil') == 0) {

      if (inicio == 1) {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
            </Box>           
        );   
      } else {
      
          if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
                && validate.umnumeroState == 'has-success' ) {

          
              if (this.state.campSenha !== '' && this.state.campSenhaTeste !== '' 
                  && this.state.campSenha == this.state.campSenhaTeste) {
                return (
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cliente_senha_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                  </div>     
                  </Box>           
                );
              } else {
                return (

                  <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                          <div className="d-flex justify-content-center">
                          <label> Próximo </label>
                          </div>     
                    </Box>                        
                    
                );     
              }

            } else {
        
              return (

                <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
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

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
      } else {
           if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
                && validate.umnumeroState == 'has-success' ) {

          
              if (this.state.campSenha !== "" && this.state.campSenhaTeste !== "" 
                  && this.state.campSenha == this.state.campSenhaTeste) {
                return (
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cliente_senha_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
                  </Box>           
                );
              } else {
                return (

                  <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                          <div className="d-flex justify-content-center">
                          <label> Salvar Alterações </label>
                          </div>     
                    </Box>                        
                    
                );     
              }
            }    
       }      

    } else if (localStorage.getItem('logperfil') == 2) {  
    
      if (inicio == 1) {
        return (

          <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
            </Box>           
        );   
      } else {
           if (validate.oitocaracteresState == 'has-success' && validate.umaletramaiusculaState == 'has-success' 
                && validate.umnumeroState == 'has-success') {

          
              if (this.state.campSenha.length > 0 && this.state.campSenhaTeste.length > 0 
                  && this.state.campSenha == this.state.campSenhaTeste) {
                return (
                  <Box bgcolor="error.main" color="error.contrastText" className="botao_cliente_senha_habilitado"  p={2} onClick={()=>this.sendUpdate()}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar Alterações </label>
                  </div>     
                  </Box>           
                );
              } else {
                return (

                  <Box bgcolor="text.disabled" color="background.paper" className="botao_cliente_senha"  p={2} >
                          <div className="d-flex justify-content-center">
                          <label> Salvar Alterações </label>
                          </div>     
                    </Box>                        
                    
                );     
              }
            }    
          }    
    } 
} 

verifica_nome(nome){
  let nome_titulo = nome.substring(0,nome.indexOf(" ")) 
  if (nome_titulo == "") {
    nome_titulo = nome
  }
  return(    
        nome_titulo          
     );  
} 

verificar_menu() {   

  if (localStorage.getItem('logperfil') == 0) {
   
   return(
    <div>
    <div className="d-flex justify-content-around">
             <div className="botao_navegacao">
                <Link to={`/cliente/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                  <label>{this.verifica_nome(this.state.campNome)}, Cadastre a sua senha de acesso  </label>       
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
               <Link to={`/cliente/`+localStorage.getItem('logid')}> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
                 </div>                  
                 <div>
                   <div className="titulo_representante">                
                    <label>{this.verifica_nome(this.state.campNome)}, Cadastre a sua senha de acesso  </label>       
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
             <Progress color="warning" value={50} className="progressbar"/>
          </div>
     </div>    
      );

  } else if (localStorage.getItem('logperfil') == 2) { // CLIENTE INDIVIDUAL             

    return(
      <div className="d-flex justify-content-around">
          <div className="botao_navegacao">
                 <Link to="/area_cliente_individual"> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                  <label>  {this.verifica_nome(this.state.campNome)}, altere a sua senha de acesso  </label>       
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
          <div class="d-flex flex-column espacamento_caixa_texto_senha">
              <div class="p-2">    
                                                  
              </div>              
              <div class="p-2">           

                 {this.validacoes_mensagens(this.state.validacao_inicial)}    

              </div> 
              <Alert className="mensagem_erro" color={this.state.color}>
                {this.state.mensagem_senha_erro}
              </Alert>                
            </div>                        
            
            {this.verifica_botao(this.state.inicio)}                                       
    </div>                 
   </div>  
</div> 
  );
} 
}
export default servicosComponent;