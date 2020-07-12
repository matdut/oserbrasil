import React from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//const Cabecalho_cliente = props => {
class menu_administradorComponent extends React.Component  {

  constructor(props){
    super(props);    
  }    

  componentDidMount(){
    
    //this.reload1();
     //this.loadCliente()
  }
  handleClick = () => {
    localStorage.removeItem('logemail');
    localStorage.removeItem('lognome');       
    localStorage.removeItem('logid');  
    localStorage.removeItem('logperfil');  

    this.props.history.push("/");
  }

    //this.props.history.push('/');    
    //return(
    // <h1> aqiui adas sdasd asas d sa</h1>
    //);   
  
  
  render()
  {
    const login = localStorage.getItem('logemail');              
    const nome = localStorage.getItem('lognome');  
    const id = localStorage.getItem('logid');    

 return (
  <div>  
  <div className="container-fluid">                          
        <nav className="navbar navbar-expand-xl bg-danger navbar-dark justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to='#'><strong><span class="glyphicon glyphicon-user"></span> BEM VINDO, ADMINISTRADOR </strong></Link>     
            </li>               
            <li className="nav-item">
              <Link className="nav-link" to='/list'>LISTAR CLIENTES</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/listar'>LISTAR MOTORISTAS</Link>
            </li>            
            <li className="nav-item">
              <Link className="nav-link" to='#'>PENDÊNCIAS</Link>
            </li>            
            <li className="nav-item">
               <button type="button" class="btn btn-danger btn-sm" onClick={this.handleClick}>SAIR</button>
            </li>           
          </ul>
      </nav> 
      <div className="bg-danger text-center">
        <Link to='/'>
            <div className='thumbnail_logo'>
                <img src="../../logo_oser.png" className="img-thumbnail" width="100" height="100" />                               
            </div>
        </Link>          
        <br/>
  </div>                                  
   </div> 
</div>
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_administradorComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

