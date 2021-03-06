import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import '../teste_menu.css';
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
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//const [isOpen, setIsOpen] = useState(false);



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
//const Cabecalho_cliente = props => {
class menu_administradorComponent extends React.Component  {

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
      perfil: sessionStorage.getItem('logperfil'),    
      nome: sessionStorage.getItem('lognome'),
      id: sessionStorage.getItem('logid') 
    });
   // this.verifica_menu();
    

  }
  handleClick = () => {
    sessionStorage.removeItem('logemail');
    sessionStorage.removeItem('lognome');           
    sessionStorage.removeItem('logid');  
    sessionStorage.removeItem('logperfil');  
    sessionStorage.removeItem('logprogress');
    sessionStorage.removeItem('logcep');   
    sessionStorage.removeItem('logcepbanco');       
    sessionStorage.removeItem('lograzao_social');  
    sessionStorage.removeItem('lograzaosocial');  
    sessionStorage.removeItem('logeventoservico');
    sessionStorage.setItem('logperfil', null);
    sessionStorage.setItem('logid', 0);
    sessionStorage.setItem('conectado', 1);
    this.props.history.push("/");
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
  <div className="d-flex justify-content-left">        
  <div className="nav-side-menu">
  <div className="brand"></div>
  <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

      <div className="menu-list">

          <ul id="menu-content" className="menu-content collapse out">
              <li>
                <div className="avatar_titulo">
                    <div className="avatar_adm">
                      <Avatar className="classe_orange">AD</Avatar>                      
                    </div>      
                    <div className="teste perfil">                
                    </div>
                </div>   
              </li>
              <li>
              <div className="itens_menu">
                <a href="/area_administrador" className="icon_centralizado_novo">                    
                   <LightTooltip title="Inicio" placement="top">                
                      <i className="fas fa-home"></i>   
                   </LightTooltip>    
                </a>
               </div> 
              </li>     
              <li>
              <div className="itens_menu">
                <a href="#" className="icon_centralizado_novo">                    
                   <LightTooltip title="Eventos" placement="top">                
                   <i className="fas fa-calendar-alt"></i>     
                   </LightTooltip>    
                </a>
                </div>
              </li>  
              <li>
              <div className="itens_menu">
                <a href={'/lista_individual'} className="icon_centralizado_novo">
                <LightTooltip title="Cliente" placement="top">
                   <i className="fas fa-user"></i>                     
                </LightTooltip>              
                </a>
                </div>
              </li>
              <li>
              <div className="itens_menu">
                <a href={"/lista_empresarial"} className="icon_centralizado_novo">
                <LightTooltip title="Empresa" placement="top">
                     <i className="fas fa-city"></i>
                </LightTooltip>              
                </a>
                </div>
              </li>
              <li>
              <div className="itens_menu">
                <a href={"/listar"} className="icon_centralizado_novo">
                <LightTooltip title="Motoristas" placement="top">
                    <i className="fas fa-address-card"></i>
                </LightTooltip>              
                </a>
                </div>
              </li>
             
              <li data-toggle="collapse" data-target="#service" className="collapsed">
                <LightTooltip title="Auxiliares" placement="top">
                  <a href="#" className="icon_centralizado">                   
                      <i className="fa fa-th" aria-hidden="true"></i><span className="arrow"></span>                   
                  </a>
                 </LightTooltip> 
                </li>  
                <ul className="sub-menu collapse" id="service">
                  <li>
                    <a href={`/operador_lista`}>
                      <LightTooltip title="Operadores" placement="top">
                      <i className="fas fa-users-cog"></i>
                      </LightTooltip>              
                    </a>
                  </li>
                  <li>
                    <a href={`/lista_adm_auxiliar`}>
                      <LightTooltip title="Adm Auxiliar" placement="top">
                          <i className="fas fa-users"></i>
                      </LightTooltip>              
                    </a>
                  </li>            
                </ul>

              <li>
              <div className="itens_menu">
                <a href={"/listar_tipo_veiculo"} className="icon_centralizado_novo">
                <LightTooltip title="Veículos" placement="top">
                    <i className="fas fa-car-alt"></i>
                </LightTooltip>              
                </a>
                </div>
              </li>
              <li>
              <div className="itens_menu">
                <a href={"/matriz_listar"} className="icon_centralizado_novo">
                <LightTooltip title="Tarifas" placement="top">
                <i className="fas fa-money-bill-wave"></i>
                </LightTooltip>              
                </a>
                </div>
              </li>
              <li>
              <div className="itens_menu">
                <a href={'/lista_mensagens_site'} className="icon_centralizado_novo" >
                <LightTooltip title="Mensagens" placement="top">  
                <i className="fas fa-comments"></i>
                </LightTooltip>              
                </a>
                </div>
              </li>   
              <li>
              <div className="itens_menu">
              <a onClick={this.handleClick} className="icon_centralizado_novo">
                <LightTooltip title="Sair" placement="top">        
                   <i className="fas fa-sign-out-alt"></i>                   
                </LightTooltip>    
              </a>  
              </div>
              </li>                                 
          </ul>
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