import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu from './cabecalho' ;
import api from '../services/api';

const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  

//const Contato = props => {
class contatoComponent extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
     //this.loadCliente()
  }

  handleSubmit(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = {
      name: name,   
      email: email,  
      messsage: message
    }
    api.post("/email/send", data)
    .then(response=>{        
      if (response.data.msg == 'success'){
          alert("Mensagem enviada."); 
        } else if(response.data.msg === 'fail'){
          alert("MMensagem com erro.")
      } 
      })        
      .catch(error=>{
        alert("Error envio email "+error)
      })     
}

resetForm(){
  document.getElementById('contact-form').reset();
}

  render()
  { 
    return (     
        <div>                   
          <Menu /> 
        <div className='container-fluid'>               
        <h2 className='text-center'>CONTATO</h2>
        <br/>        
        <div className='row'>
            <div className='col-sm-5'>
                <p></p>
                <p><span className='glyphicon glyphicon-map-marker'></span> Brasil, BR</p>
                <p><span className='glyphicon glyphicon-phone'></span> +XX XXXXX-XXXX</p>
                <p><span className='glyphicon glyphicon-envelope'></span> myemail@something.com</p>
            </div>
              <div className='col-sm-7'>
                <div className='row'>
                    <div className='col-sm-6 form-group'>
                        Preencha o formulário abaixo que entraremos em contato em breve.  
                    </div>     
                </div>
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                      <div className="form-group">
                          <label for="name">Name</label>
                          <input type="text" className="form-control" id="name" />
                      </div>
                      <div className="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                      </div>
                      <div className="form-group">
                          <label for="message">Message</label>
                          <textarea className="form-control" rows="5" id="message"></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
            </div>
        </div>
        </div>
      </div>  
    );  
  }
}

export default contatoComponent;