import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './area_cliente.css';

import Avatar from '@material-ui/core/Avatar';

const LightTooltip = withStyles((theme) => ({
  tooltip: {     
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: "1px 0",
    whiteSpace: 0,
  },
}))(Tooltip);
//const [isOpen, setIsOpen] = useState(false);
//const Cabecalho_cliente = props => {
class menu_clienteComponent extends React.Component  {  

  constructor(props){
    super(props);    
      this.state = {
        nome: "",
        perfil:"",
        id: "",
        isOpen: false
      }
      
    }    

  componentDidMount(){
    
    this.setState({
      perfil: localStorage.getItem('logperfil'),    
      nome: localStorage.getItem('lognome'),
      id: localStorage.getItem('logid') 
    });
   // this.verifica_menu();
    

  }
  handleClick = () => {
    localStorage.removeItem('logemail');
    localStorage.removeItem('lognome');       
    localStorage.removeItem('logid');  
    localStorage.removeItem('logperfil'); 
    localStorage.removeItem('logcnpj'); 
    localStorage.removeItem('logcpf');
    localStorage.removeItem('logservicoid');     
    localStorage.removeItem('logempresaid');  
    localStorage.removeItem('logcep');      
    localStorage.removeItem('logclienteId');
    localStorage.removeItem('logcpfrep');
    localStorage.removeItem('logdocumento');
    localStorage.removeItem('logemailId');
    localStorage.removeItem('logeventoId');
    localStorage.removeItem('logMarca');
    localStorage.removeItem('logmatrizId');
    localStorage.removeItem('logModelo');    
    localStorage.removeItem('logeventoservico');
    localStorage.setItem('logperfil', null);
    localStorage.setItem('conectado', 1);
    localStorage.setItem('logid', 0);
    this.props.history.push("/");
  }

  
  verifica_menu() {
    if ( this.state.perfil == 1) {
      return (            
           <strong> ADMINISTRADOR </strong>
       ); 
    } else {
      return (      
         <strong>{this.state.nome.toUpperCase()}</strong>
       ); 
    }            
  }
    //this.props.history.push('/');    
    //return(
    // <h1> aqiui adas sdasd asas d sa</h1>   //);   
  isOpen() {
    return(this.state.isOpen);
  } 

  toggle() {
   // const toggle = () => setIsOpen(!isOpen);
    if (this.state.isOpen == true) {
       this.state.isOpen = false;
    } else {
      this.state.isOpen = true;
    }    
  }
  
  render()
  {  
  
 return (
  <div className="nav-side-menu">
  <div className="brand"></div>
  <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

      <div className="menu-list">

          <ul id="menu-content" className="menu-content collapse out">
              <li>
                <div className="avatar_titulo">
                <div className="avatar"><Avatar alt={localStorage.getItem('lognome')} src="/broken-image.jpg" className="classe_orange" />                       
                </div>
                  <div className="teste perfil">
                  <a href={`/cliente_alterar/`+localStorage.getItem('logid')}>      
                        Editar Perfil  
                    </a>  
                    <br/>
                  </div>
                </div>   
              </li>
              <li>
              <div className="itens_menu">
                <a href="/area_cliente_individual" className="icon_centralizado_novo">                    
                   <LightTooltip title="Inicio" placement="top">                
                      <i className="fas fa-home"></i>   
                   </LightTooltip>    
                </a>
                </div>
              </li>     
              <li>
              <div className="itens_menu">
                <a href="/lista_evento/list" className="icon_centralizado_novo">                    
                   <LightTooltip title="Eventos" placement="top">                
                   <i className="fas fa-calendar-alt"></i>     
                   </LightTooltip>    
                </a>
                </div>
              </li>   
              <li>
              <div className="itens_menu">
              <a href={`/cliente_senha_alterar/`+localStorage.getItem('logid')} className="icon_centralizado_novo">
                <LightTooltip title="Senha" placement="top">
                <i className="fas fa-fw fa-columns"></i>                  
                </LightTooltip>              
                </a>
                </div>
              </li>
              <li>
              <div className="itens_menu">
                <a href={"/cartao_credito/list"} className="icon_centralizado_novo">
                <LightTooltip title="Cartão Crédito" placement="top">
                    <i className="fas fa-credit-card"></i>
                </LightTooltip>              
                </a>
                </div>
              </li> 
              <li>
              <div className="itens_menu">
              <a onClick={this.handleClick} className="icon_centralizado_novo">
                <LightTooltip title="Sair" placement="right">                  
                   <i className="fas fa-sign-out-alt"></i>
                </LightTooltip>    
              </a> 
              </div> 
              </li>                                 
          </ul>
   </div>
</div>     

 
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_clienteComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

