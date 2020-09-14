import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Alert, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import Cabecalho from './cabecalho';
import FileUpload from "../pages/FileUpload";
import api from '../services/api';

import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';

class esqueceusenhaComponent extends React.Component  {
//const Sobre = props => {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            color: 'light',
            mensagem: '',
            validaEmail: false,            
            validate: {
                emailState: '',
                erro_email: false,
              },
        }
        this.verifica_emailonblur = this.verifica_emailonblur.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.emailchange = this.emailchange.bind(this);
        
        
    }     
    

    componentDidMount(){
        
     }
   
     emailchange(e) {
        this.setState({ email: e.target.value })
      }

     verifica_emailonblur(){
        const { validate } = this.state
        if (validate.emailState == 'has-danger') {
          this.setState({ 
            validaEmail: true
          });
        }
      }
      validateEmail(e, newValue) {     
            const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const { validate } = this.state
              if (emailRex.test(e.target.value)) {            
                validate.emailState = 'has-success'
                validate.erro_email = false
              } else {                        
                validate.emailState = 'has-danger'
                validate.erro_email = true
              }
              this.setState({ 
                validate,   
                mensagem_email: ''                             
              })          
      }   
//class sobreComponent extends React.Component  {

 /* constructor(props){
    super(props);
  }

  componentDidMount(){
     //this.loadCliente()
  }

  */
 cancelar(){
    this.props.history.push(`/login`);

 }
 esqueceuSenha() {   

    const senhaAleatoria = Math.random().toString(36).slice(-8);
    console.log('email - '+this.state.email);
    if (this.state.email !== '') {

      console.log('email - '+this.state.email);

        api.get('/login/getEmail/'+this.state.email)
      .then(resp=>{                        
          
          const params_senha = {   
            senha: senhaAleatoria, 
          }
          
          console.log('loginId '+resp.data.data[0].id);
          api.put('/login/updateSenha/'+resp.data.data[0].id, params_senha);

          const params_email = {    
            email: this.state.email,                  
            url: `http://www.oser.app.br:21497/login`,        
            texto: `Sr(a), Usuário(a) \n Sua senha provisória ao sistema è ${senhaAleatoria} `, 
          }
          
          api.post("/email/send", params_email)    
         
          alert('Mensagem Enviada'); 

          this.props.history.push(`/login`);


      }).catch(error=>{
          this.setState({ 
            color: 'danger',
            mensagem: 'Busca com erro, favor tentar novamente'
           })          
    })     
   } 
  }
  validaEmailChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
    [ name ]: value,
    });
    }
  render()
  {     
    return (
        <div>
        <Cabecalho />
        <br/>         
        <br/>         
        <div> 
        <div className="d-flex justify-content-center">           
           <img className="logo_inicio" src="logo_oser_black.png"/>
        </div>
        <div className="d-flex justify-content-center">           
            <div className="texto_logo">novos caminhos para seu futuro</div>          
        </div>       
      </div>        
        <br/>
        <div className='container-fluid'>
            <div></div>
            <div className="mensagem_redefinir_senha">
               Enviaremos um e-mail com um link e uma senha temporária.               
            </div>          
            <br/>
            <br/>
            <div className="d-flex justify-content-left email_redefinir_senha">      
                <FormControl variant="outlined">
                    <InputLabel htmlFor="filled-adornment-password">Email</InputLabel>
                     <OutlinedInput                   
                        type="email"
                        error={this.state.erro_email}
                        helperText={this.state.mensagem_email}
                        className="data_text"                       
                        id="outlined-basic"                   
                        variant="outlined"
                        value={this.state.email}                        
                        onChange={ (e) => {
                                    this.emailchange(e) 
                                    this.validateEmail(e)
                                    this.validaEmailChange(e)                                
                                  } }                                              
                      labelWidth={50}                      
                    />
                   <FormHelperText error={this.state.erro_email}>
                         {this.state.mensagem_email}
                   </FormHelperText>
                </FormControl>     
            </div>            
           <div className="d-flex justify-content-left">          
                 <div className="p-2">               
                  <div className="d-flex justify-content-start botao_redefinir_senha">
                       <div> 
                       <Button color="primary" variant="contained"                         
                            onClick={()=>this.esqueceuSenha()}>REDEFINIR SENHA
                        </Button>    
                       </div>
                       <div className="cancelar">
                       <Link href="#" onClick={this.cancelar}>
                        cancelar
                        </Link>
                       </div>
                   </div>                 
                 </div>
             </div>                    
        </div>
      </div>  
    );
  }    
}

export default esqueceusenhaComponent;
