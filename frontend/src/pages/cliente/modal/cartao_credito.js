import React  from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Label,  Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { celularMask } from '../formatacao/celularmask';
import { cpfMask } from '../formatacao/cpfmask';
import api from '../../services/api';
import './operadores.css';

import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

var dateFormat = require('dateformat');
const { cpf } = require('cpf-cnpj-validator');
//const nodemailer = require('nodemailer');
const andamento_cadastro = sessionStorage.getItem('logprogress'); 
//var sendmail = require('../sendmail')({silent: true})

class operadoresComponent extends React.Component{  

  constructor(props){
    super(props);      
    this.state = { 
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
      inicio: 1
    }    
  }

  componentDidMount(){ 
   
    
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
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
 

verifica_botao(inicio) {
  const { validate } = this.state    
  console.log('perfil verifica_botao -'+sessionStorage.getItem('logperfil'))
   if (sessionStorage.getItem('logperfil') == 1) {
    if (inicio == 1) {
      return (

        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
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
            <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_empresa_habilitado"  p={2} onClick={()=>this.sendSave()}>
            <div className="d-flex justify-content-center">
                  <label> Incluir </label>
            </div>     
            </Box>           
          );
        } else {
          return (

            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_empresa" p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Incluir </label>
                  </div>     
            </Box>           
        );   
        }         

      }    
  }
} 

sendSave(){        
  

}  

verificar_menu() {   
 // console.log('perfil verificar_menu -'+sessionStorage.getItem('logperfil'))

 if (sessionStorage.getItem('logperfil') == 1) {  //ADMINISTRADOR
    return(
      <div>
      <div className="d-flex justify-content-around">
           <div className="botao_navegacao">                 
               <Link to='/area_administrador'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
             </div>                  
             <div>
               <div className="titulo_representante">                
                 <label> Cadastre seu Cartão</label>            
               </div>
             </div>   
             
             <div>
                <div className="botao_navegacao">
                   
                </div>   
             </div>                     
      </div>      
        <br/>    
        <div>        
    
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
                       <div id="PaymentForm"> 
                        <Cards
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}
                          />
                       </div>
                       <div>
                       <form>
                          <Input
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                            <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                            <Input
                            type="text"
                            name="valid_date"
                            placeholder="Date_valid"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                          
                          <Input
                            type="text"
                            name="CVC"
                            placeholder="CVC"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                        </form>

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
export default operadoresComponent;