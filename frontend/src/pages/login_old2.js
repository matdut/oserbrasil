import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import AppBar from 'material-ui/AppBar';
//import RaisedButton from 'material-ui/RaisedButton';
import TextField from '@material-ui/core/TextField';
import Cabecalho from './cabecalho';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import api from '../services/api';
class Login extends React.Component {
constructor(props){
  super(props);
    this.state={
        email: '',
        senha: '',
        fireRedirect: false,
          validate: {
            emailState: '',
          },
    }
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


 handleClick(event){   

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
render() {
    return (
      <div>
        <Cabecalho />
        <MuiThemeProvider>
          <div>        
             Login
            <br/>
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Email"
             placeholder="myemail@email.com"
             value={ this.state.email }
             valid={ this.state.validate.emailState === 'has-success' }
             invalid={ this.state.validate.emailState === 'has-danger' }
             onChange={ (e) => {
                this.validateEmail(e)
                this.handleChange(e)
              } }
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               value={ this.state.senha }
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <button type="button" className="btn btn-danger btn-sm" onClick={(event) => this.handleClick(event)}>SAIR</button>             
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;