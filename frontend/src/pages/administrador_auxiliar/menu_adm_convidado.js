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
    localStorage.removeItem('logcep');      
    localStorage.removeItem('logclienteId');
    localStorage.removeItem('logcpfrep');
    localStorage.removeItem('logdocumento');
    localStorage.removeItem('logemailId');
    localStorage.removeItem('logeventoId');
    localStorage.removeItem('logMarca');
    localStorage.removeItem('logmatrizId');
    localStorage.removeItem('logModelo');    

    localStorage.setItem('logperfil', null);
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
  <div>    
    <div className="left">    
    <br/>      
    <div className="item avatar_titulo">
       <i><div className="avatar"><Avatar alt={localStorage.getItem('lognome')} src="/broken-image.jpg" className="classe_orange" />                         
       </div>
         <div className="teste perfil">
          <a href={`/cliente_alterar/`+localStorage.getItem('logid')}>           
              Editar Perfil  
          </a>  
          <br/>
         </div>
       </i>      
   </div>   
    <div class="item teste active">
    <LightTooltip title="Inicio" placement="top">
       <a href="/area_cliente_individual">
       <i class="fas fa-home"></i>   
       </a>  
    </LightTooltip>   
    </div>
    <div className="item teste">    
       <LightTooltip title="Eventos" placement="top">
            <a href={"/lista_evento/list"}>                 
            <i class="fas fa-calendar-alt"></i>                  
            </a>  
        </LightTooltip>    
    </div>  
    <div className="item teste">
    <LightTooltip title="Senha" placement="top">
        <a href={`/cliente_senha_alterar/`+localStorage.getItem('logid')}>        
         <i class="fas fa-unlock-alt"></i>
        </a>  
    </LightTooltip>    
    </div>   
    <div className="item teste">
      <LightTooltip title="Cartão Crédito" placement="top">
        <a href={`/cartao_credito/list`}>                 
        <i class="fas fa-credit-card"></i>
        </a>  
      </LightTooltip>    
    </div>
    <div className="item teste">
      <LightTooltip title="#" placement="top">
        <a href='#'>                 
         <i class="fas fa-cog"></i>
        </a>  
      </LightTooltip>    
    </div>
    <div className="item teste">
       <LightTooltip title="Sair" placement="top">
        <button type="button" className="btn btn-sm botao_sair" onClick={this.handleClick}>
           <i class="fas fa-sign-out-alt"></i> </button>   
       </LightTooltip>    
    </div>         
    
     <div className="item_sem_borda versao_sistema"> 
        <img src="/logo.png" alt="..." width="50" className="logo_centralizado"/>
       <div className="data_versao"> 30/09/20 v2.0.0 </div>
     </div>  
   </div>                                       
                            
  </div> 
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_clienteComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

