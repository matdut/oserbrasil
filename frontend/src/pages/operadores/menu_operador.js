import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
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

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Tooltip from '@material-ui/core/Tooltip';


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
class menu_clienteComponent extends React.Component  {

  constructor(props){
    super(props);    
      this.state = {
        nome: "",
        perfil:"",
        id: "",
        criar_evento: false,
        listar_evento: false,
        dados_pessoais: false,
        alterar_senha: false,
        campgerencia_eventos: false,
        campefetua_pagamentos: false,
        campgerencia_todos_eventos: false,
        campinclui_cartao: false,
        campinclui_operadores: false,
        campvisualiza_eventos: false,             
        isOpen: false,
        status: sessionStorage.getItem('logstatus'),
      }
      
    }    

  componentDidMount(){
    
    this.setState({
      perfil: sessionStorage.getItem('logperfil'),    
      nome: sessionStorage.getItem('lognome'),
      id: sessionStorage.getItem('logid'),      
    });

    /*
    if (this.state.status == 7) {
      this.setState({
        criar_evento: true,
        listar_evento: true,
        dados_pessoais: true,
        alterar_senha: false,
      });
    } */
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
    sessionStorage.removeItem('logstatus');  
    sessionStorage.removeItem('lograzao_social');
    sessionStorage.removeItem('lograzaosocial');  
    sessionStorage.removeItem('logoperadorId');      
    sessionStorage.setItem('logperfil', null);
    sessionStorage.setItem('conectado', 1);
    sessionStorage.setItem('logid', 0);

    this.props.history.push("/");
  }

  verifica_menu() {
    if ( this.state.perfil == 1) {
      return (         
        <NavItem className="nav-item"> 
           <NavLink href="#"><strong><span class="glyphicon glyphicon-user"></span> BEM VINDO, ADMINISTRADOR </strong></NavLink>                                     
        </NavItem>          
       ); 
    } else {
      return ( 
         <NavItem className="nav-item">            
           <NavLink href="#"><strong> <span className="glyphicon glyphicon-user"></span> BEM VINDO (A), {this.state.nome.toUpperCase()} </strong></NavLink>                              
         </NavItem>   
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
  <div className="d-flex justify-content-left">       
  <div className="nav-side-menu">
  <div className="brand"></div>
  <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

      <div className="menu-list">

          <ul id="menu-content" className="menu-content collapse out">
              <li>
                <div className="avatar_titulo">
                <div className="avatar"><Avatar alt={sessionStorage.getItem('lognome')} src="/broken-image.jpg" className="classe_orange" />                         
                </div>
                  <div className="teste perfil">
                  <a href={`/operadores_alterar/`+sessionStorage.getItem('logid')}>     
                        Editar Perfil  
                    </a>  
                    <br/>
                  </div>
                </div>   
              </li>
              <li>
              <div className="itens_menu">
                <a href="/area_operador" className="icon_centralizado_novo">                    
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
                <a href={`/empresa_dados_alterar/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">
                <LightTooltip title="Dados da empresa" placement="top">
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
                <a href={`/senha_operador_alterar/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">
                <LightTooltip title="Senha" placement="top">
                    <i className="fas fa-unlock-alt"></i>
                </LightTooltip>              
                </a>
                </div>
              </li>         
              <li>
              <div className="itens_menu">
                <a href={`/operador_lista_empresa/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">
                     <LightTooltip title="Operadores" placement="top">
                      <i className="fas fa-users-cog"></i>
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
</div>     
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_clienteComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

