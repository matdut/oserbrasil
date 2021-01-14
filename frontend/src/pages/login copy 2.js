import React from 'react';
import {Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback, Card, CardBody, CardTitle, CardSubtitle, Row } from 'reactstrap';
import ReactDOM from 'react-dom';
import Cabecalho from './cabecalho';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

//import axios from 'axios';
//const baseUrl = "http://34.210.56.22:3333";
import api from '../services/api';

//const nodemailer = require('nodemailer');
class loginComponent extends React.Component  {  
  
    constructor(props) {
        super(props);        
          this.state = {
          'email': '',
          'senha': '',
          fireRedirect: false,
          validate: {
            emailState: '',
          },
        }
        
        this.handleChange = this.handleChange.bind(this);      
      }

  validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
          if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
          } else {
            validate.emailState = 'has-danger'
          }
          this.setState({ validate })
  }   

  handleChange = async (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    await this.setState({
      [ name ]: value,
    });
  }

  submitForm(e) {
    e.preventDefault();    

    console.log('BOTAO1 '+this.state.email)
    console.log('BOTAO2 '+this.state.senha)
    const data = {                
        email: this.state.email,
        senha: this.state.senha        
    }

    if (!this.state.email || !this.state.senha ) {
      Swal.fire(
        'Mensagem',
        'Preencha e-mail e senha para continuar!',
        'error'
      )        

      //alert( "Preencha e-mail e senha para continuar!" );
    } else { 
      if (this.state.email != "adm@oserbrasil.com.br" || this.state.senha != "123456") {         
        try {       
            //const url = baseUrl+"/login/get/"+this.state.email+"/"+this.state.senha
            
            api.get(`/login/get/${this.state.email}/${this.state.senha}`)
            .then(res=>{          
              console.log( JSON.stringify(res.data, null, "    ") );
              //console.log( JSON.stringify(res.data.data, null, "") );
              if (res.data.success) {  
                //console.log('cliente');
                //console.log("res.data.data - "+res.data.data.length());
                if (res.data.data == "") {
                  //console.log('verifica motorista');
                  //const url = "/login/getmotorista/"+this.state.email+"/"+this.state.senha
                  
                  api.get(`/login/getmotorista/${this.state.email}/${this.state.senha}`)                 
                  .then(res=>{ 
                    if (res.data.success) { 
                      if (res.data.data != "") {

                        sessionStorage.setItem('logemail', this.state.email);            
                        sessionStorage.setItem('lognome',  res.data.data[0].nome);
                        sessionStorage.setItem('logid',  res.data.data[0].id);  
                        sessionStorage.setItem('logperfil', res.data.data[0].perfilId);           
                        //const history = useHistory();                 
                        
                        this.props.history.push('/area_motorista');        
                    } else {

                      Swal.fire(
                        'Mensagem',
                        'Usuário e/ou senha inválidos, Verifique !!!',
                        'error'
                      )        
                      //alert('Usuário e/ou senha inválidos, Verifique !!!');        

                    } 
                    }  
                    })
                  .catch(error=>{
                    alert("Error server "+error)
                  })

                } else {
                  

                  sessionStorage.setItem('logemail', res.data.data[0].email);            
                  sessionStorage.setItem('lognome',  res.data.data[0].nome);
                  sessionStorage.setItem('logid',  res.data.data[0].id); 
                  sessionStorage.setItem('logperfil', res.data.data[0].perfilId);      
                  //const history = useHistory();                 
                  
                  this.props.history.push('/area_cliente');            
                } 
              }
              else {
                Swal.fire(
                  'Mensagem',
                  'Usuário e/ou senha inválidos, Verifique !!!',
                  'error'
                )        
                //alert("Usuário e/ou senha inválidos, Verifique !!!")
              }
            })        
            .catch(error=>{
              Swal.fire(
                'Mensagem',
                'Busca com erro, favor tentar novamente',
                'error'
              )        
              //alert("Busca com erro, favor tentar novamente"+error)
            })

          } catch (err) {
            Swal.fire(
              'Mensagem',
              'Houve um problema com o login, verifique suas credenciais. T.T',
              'error'
            )   
            //alert('Houve um problema com o login, verifique suas credenciais. T.T');
          }
   
      } else {
         sessionStorage.setItem('logperfil', 1); 
         this.props.history.push('/area_administrador'); 
      }     
    }
    }

  componentDidMount(){
  
     //this.loadCliente()
  }  
 
  esqueceu_senha(){
/*
   
    const transporter = nodemailer.createTransport({
      host: "smtps.uol.com.br",
      //host: "smtps.uol.com.br",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          //user: "mateus.dutra@oserbrasil.com.br",
          user: "mateus.dutra@oserbrasil.com.br",
          pass: "uvlb4otd"
      },
      tls: { rejectUnauthorized: false }
  });
    
    const mailOptions = {
     // from: "mateus.dutra@oserbrasil.com.br",
      from: "mateus.dutra@oserbrasil.com.br",
      to: "mateus.dutra@oserbrasil.com.br",
      subject: "E-mail enviado usando Node!",
      text: "Bem vindo matesu sadsa das ao Oser, sua senha é 12345. "
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log('erro de envio - '+error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
*/
  }
  
  render()
  {
    const { email, senha } = this.state;
    

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
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                value={ email }
                valid={ this.state.validate.emailState === 'has-success' }
                invalid={ this.state.validate.emailState === 'has-danger' }
                onChange={ (e) => {
                            this.validateEmail(e)
                            this.handleChange(e)
                          } }
              />
              <FormFeedback valid>
                 e-mail válido
              </FormFeedback>
              <FormFeedback>
                Por favor corrija o e-mail.
              </FormFeedback>              
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Senha</Label>
              <Input
                type="password"
                name="senha"
                id="examplePassword"
                placeholder="********"
                value={ senha }
                onChange={ (e) => this.handleChange(e) }
            />
            </FormGroup>
          </Col>
          <div className="d-flex justify-content-center">  
            <Button>Entrar</Button>        
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