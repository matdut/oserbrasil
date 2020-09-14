import React from 'react';
import {Alert, Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback, Card, CardBody, CardTitle, CardSubtitle, Row } from 'reactstrap';
import ReactDOM from 'react-dom';
import Cabecalho from './cabecalho';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';
import TextField from '@material-ui/core/TextField';
import './inicio.css';

//import axios from 'axios';
//const baseUrl = "http://34.210.56.22:3333";
import api from '../services/api';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';

const nodemailer = require('nodemailer');

class loginComponent extends React.Component  {  
  
    constructor(props) {
        super(props);        
          this.state = {
          email: '',
          senha: '',
          color: 'light',
          mensagem: '',
          hiddenSenha: true,  
          showPassword: false,
          validaSenha: false,
          validaEmail: false,
          fireRedirect: false,
          showModal: false,
          validate: {
            emailState: '',
          },
        }
        
        this.handleChange = this.handleChange.bind(this);     
        //this.handleOpenModal = this.handleOpenModal.bind(this);     
        //this.handleCloseModal = this.handleCloseModal.bind(this);      
        this.toggleSenhaShow = this.toggleSenhaShow.bind(this);
        this.redefinir_senha = this.redefinir_senha.bind(this);
        
     //   this.esqueceu_senha = this.esqueceu_senha.bind(this);
        this.verifica_emailonblur = this.verifica_emailonblur.bind(this);
      }

  toggleSenhaShow() {     
     this.setState({ hiddenSenha: !this.state.hiddenSenha });
  } 
  
  
  componentDidMount(){ 
    
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
          } else {                        
            validate.emailState = 'has-danger'
          }
          this.setState({ 
            validate,
            color: 'light',            
            mensagem: ''
          })          
  }   
  handleClickShowPassword() {
    if (this.state.showPassword == true) {
      this.setState({ showPassword: false });   
    } else {
      this.setState({ showPassword: true });   
    }  
  };
  
  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
    this.setState({ 
      color: 'light',
      mensagem: ''
    })
  }

  submitForm(e) {
    e.preventDefault();    

    this.setState({ 
      color: 'light',      
      mensagem: ''
    })
    let email_logado = this.state.email
    console.log('BOTAO1 '+this.state.email)
    console.log('BOTAO2 '+this.state.senha)
   /* const data = {                
        email: this.state.email,
        senha: this.state.senha        
    } */

    if (!this.state.email || !this.state.senha ) {
      
      this.setState({ 
        color: 'danger',
        mensagem: 'Preencha e-mail e senha para continuar!'
      })

      //alert( "Preencha e-mail e senha para continuar!" );
    } else {      
           // const url = baseUrl+"/login/get/"+this.state.email+"/"+this.state.senha
            //console.log( JSON.stringify(`/login/get/${this.state.email}/${this.state.senha}`, null, "") );            
            this.setState({ 
              color: 'light',
              mensagem: '',
            })
            
            api.get(`/login/getLogin/${this.state.email}/${this.state.senha}`)
            .then(res=>{          
              //console.log( JSON.stringify(res.data, null, "    ") );
              //console.log( JSON.stringify(res.data.data, null, "") );
              if (res.data.success) {
                
                if (res.data.data[0].statusId == 1 || res.data.data[0].statusId == 7) {               

                    if (res.data.data[0].perfilId == 1) {

                      localStorage.setItem('logperfil', 1); 
                      this.props.history.push('/area_administrador'); 

                    } else if (res.data.data[0].perfilId == 2) {
                      api.get(`/cliente/get/${res.data.data[0].logid}`)
                      .then(rescliente=>{   
                        if (rescliente.data.success) {  
                          localStorage.setItem('logemail', rescliente.data.data[0].email);                             
                          localStorage.setItem('logid',  rescliente.data.data[0].id); 
                          localStorage.setItem('logperfil', res.data.data[0].perfilId);      
                          localStorage.setItem('lognome',  rescliente.data.data[0].nome);        
                          
                          this.props.history.push('/area_cliente_individual');    

                        } 
                      })
                      .catch(error=>{
                        alert("Error server "+error)
                      }) 
                    } else if (res.data.data[0].perfilId == 7) { //Empresa
                      api.get(`/empresa/getloginEmpresa/${res.data.data[0].logid}`)
                      .then(resempresa=>{   
                    
                        if (resempresa.data.success) {  
                          
                          localStorage.setItem('logemail', resempresa.data.data[0].cliente.email);           
                          localStorage.setItem('lognome',  resempresa.data.data[0].cliente.nome);                          
                          localStorage.setItem('logid',  resempresa.data.data[0].id); 
                          localStorage.setItem('logperfil', res.data.data[0].perfilId);      
                          localStorage.setItem('lograzao_social',  resempresa.data.data[0].razao_social);                   
                    
                          this.props.history.push('/area_cliente_empresarial');    
                    
                        } 
                      })
                      .catch(error=>{
                        alert("Error server "+error)
                      })   
                    } else if (res.data.data[0].perfilId == 3) { // motorista
                      
                        api.get(`/motorista/get/${res.data.data[0].logid}`)
                        .then(resmotorista=>{   
                      
                        localStorage.setItem('logemail', resmotorista.data.data[0].email);            
                        localStorage.setItem('lognome',  resmotorista.data.data[0].nome);
                        localStorage.setItem('logid',  resmotorista.data.data[0].id);  
                        localStorage.setItem('logperfil', res.data.data[0].perfilId);           
                        //const history = useHistory();                 
                        
                        this.setState({ 
                          color: '',
                          mensagem: ''
                        })

                      this.props.history.push('/area_motorista');        

                      })
                      .catch(error=>{
                        alert("Error server "+error)
                      }) 
                    } else if (res.data.data[0].perfilId == 8) { 
                        api.get(`/operador/get/${res.data.data[0].logid}`)
                        .then(resoperador=>{   
                      
                          localStorage.setItem('logemail', resoperador.data.data[0].email);            
                          localStorage.setItem('lognome', resoperador.data.data[0].nome);
                          localStorage.setItem('logid', resoperador.data.data[0].id);  
                          localStorage.setItem('logperfil', resoperador.data.data[0].perfilId);   
                          localStorage.setItem('logstatus', resoperador.data.data[0].statusId);   
                          localStorage.setItem('lograzao_social', resoperador.data.data[0].empresa.razao_social);                         
                          
                          this.setState({ 
                            color: '',
                            mensagem: ''
                          })

                          this.props.history.push('/area_operador');                            

                          })
                          .catch(error=>{
                            alert("Error server "+error)
                          })                                   
                      }                                                         
                  } else {
                    this.setState({ 
                      color: 'danger',
                      mensagem: 'Login não autorizado, favor entrar em contato com o administrador'
                    })   
                  }    
                } else {
                  this.setState({ 
                    color: 'danger',
                    mensagem: 'Email e Senha não localizados'
                  })   
                } 

            })        
            .catch(error=>{
              this.setState({ 
                color: 'danger',
                mensagem: 'Busca com erro, favor tentar novamente'
              })                     
              
              //alert("Busca com erro, favor tentar novamente"+error)
            })
          }
        
    }

  componentDidMount(){    
    this.setState({ 
      mensagem: ''
    })
     //this.loadCliente()
  }   
 
  redefinir_senha(){
    this.props.history.push(`/esqueceu_senha`);

  }

  senhachange(e) {
    this.setState({ senha: e.target.value })
  }
  
  render()
  {
    //const { email, senha } = this.state;    

    return (
      <div>
        <Cabecalho />     

        <Container className="App">           
        <br/>
        <div className="d-flex justify-content-center">           
           <img className="logo_inicio" src="logo_oser_black.png"/>
        </div>
        <div className="d-flex justify-content-center">           
            <div className="texto_logo">novos caminhos para seu futuro</div>          
        </div>    
        <br/>
        <div className="d-flex justify-content-center">     
          <div><h2>Faça o seu Login</h2></div>
        </div>  
        <br/>      
        <br/>
        <div className="d-flex justify-content-center">          
        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Col>
          <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
              <OutlinedInput
                className="texto_senha"
                autoComplete="off"
                id="outlined-adornment-password"
                error={this.state.validateEmail}        
                value={ this.state.email } 
                onBlur={this.verifica_emailonblur}                   
                autoComplete='off'
                autoCorrect='off'
                onChange={(e, newValue) => { 
                  this.setState({ email: e.target.value})
                  this.validateEmail(e,newValue)                    
               } }   
                labelWidth={60}
              />
            </FormControl>          
          </Col>   
          <br/>       
          <Col>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput
                className="texto_senha"
                autoComplete="off"
                id="outlined-adornment-password"
                type={this.state.hiddenSenha ? "password" : "text"}  
                error={this.state.validaSenha}
                value={this.state.senha}                 
                autoComplete='off'
                autoCorrect='off'
                onChange={ (e) => {
                         this.senhachange(e) 
                        }}                     
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.toggleSenhaShow}
                      onMouseDown={this.handleMouseDownPassword}
                      edge="end"
                    >
                      {this.state.hiddenSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
         </Col>
         <br/>
          <Alert color={this.state.color}>
               {this.state.mensagem}
          </Alert>        
          <div className="d-flex justify-content-center">  
            <Button className="botao_entrar">Entrar</Button>        
          </div>
          <div className="esqueceu_senha">
          <Link href="#" onClick={this.redefinir_senha}>
            Esqueceu Senha
          </Link>
          </div>
      </Form>
        </div>            
        
      </Container>            
      <br/>
      <br/>
      <br/>
    </div> 
    );
  }

  
}
export default loginComponent;
ReactDOM.render(<loginComponent />, document.getElementById('root'));