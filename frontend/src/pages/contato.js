import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu from './cabecalho' ;

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
                <div className='row'>
                    <div className='col-sm-6 form-group'>
                        <input className='form-control' id='name' name='name' placeholder='Name' type='text' required />
                    </div>
                    <div className='col-sm-6 form-group'>
                        <input className='form-control' id='email' name='email' placeholder='Email' type='email' required />
                    </div>
                </div>
                <textarea className='form-control' id='mensagem' name='mensagem' placeholder='mensagem' rows='5'></textarea><br />
                <div className='row'>
                    <div className='col-sm-12 form-group'>
                        <button className='btn btn-default pull-right' type='submit'>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>  
    );  
  }
}

export default contatoComponent;