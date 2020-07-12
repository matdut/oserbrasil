import React from 'react';
import {Container, Col, Form, FormGroup, Label, Input, Button, FormFeedback, Card, CardBody, CardTitle, CardSubtitle, Row } from 'reactstrap';
import ReactDOM from 'react-dom';
import Cabecalho from './cabecalho';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

//import axios from 'axios';
//const baseUrl = "http://34.210.56.22:3333";
import api from '../services/api';

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
              //console.log( JSON.stringify(res.data, null, "    ") );
              //console.log( JSON.stringify(res.data.data, null, "") );
              if (res.data.success) {  
                //console.log('cliente');
                //console.log("res.data.data - "+res.data.data.length());
                if (res.data.data == "") {
                  //console.log('verifica motorista');
                  //const url = baseUrl+"/login/getmotorista/"+this.state.email+"/"+this.state.senha
                  
                  api.get(`/login/getmotorista/${this.state.email}/${this.state.senha}`)                 
                  .then(res=>{ 
                    if (res.data.success) { 
                      if (res.data.data != "") {

                        localStorage.setItem('logemail', this.state.email);            
                        localStorage.setItem('lognome',  res.data.data[0].nome);
                        localStorage.setItem('logid',  res.data.data[0].id);  
                        localStorage.setItem('logperfil', res.data.data[0].perfilId);           
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
                  

                  localStorage.setItem('logemail', res.data.data[0].email);            
                  localStorage.setItem('lognome',  res.data.data[0].nome);
                  localStorage.setItem('logid',  res.data.data[0].id); 
                  localStorage.setItem('logperfil', res.data.data[0].perfilId);      
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
         localStorage.setItem('logperfil', 1); 
         this.props.history.push('/area_administrador'); 
      }     
    }
    }

  componentDidMount(){
  
     //this.loadCliente()
  }  
 
  
  render()
  {
    const { email, senha } = this.state;
    

    return (
      <div>
        <Cabecalho />
      
        <Container className="App">           
        <Card>                    
        <CardBody className="text-center">
          <CardTitle><h2>Faça o seu Login</h2></CardTitle>         
        </CardBody>
        </Card>
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
          <Button>Entrar</Button> 
      </Form>
      </Container>
    </div> 
    );
  }

  
}
export default loginComponent;
ReactDOM.render(<loginComponent />, document.getElementById('root'));