import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Button, Form, Label, Input, FormText } from 'reactstrap';
import Modal from 'react-modal';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';

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

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


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
        razao_social: '',      
        campEmail: '',
        id: "",
        campgerencia_eventos: false,
        campefetua_pagamentos: false,
        campgerencia_todos_eventos: false,
        campinclui_cartao: false,
        campinclui_operadores: false,
        campvisualiza_eventos: false,
        isOpen: false
      }     
    }    

  componentDidMount(){
    
    this.setState({
      perfil: sessionStorage.getItem('logperfil'),    
      razao_social: sessionStorage.getItem('lograzao_social'), 
      nome: sessionStorage.getItem('lognome'),
      id: sessionStorage.getItem('logid') 
    });
   // this.verifica_menu();
    

  }
  handleClick = () => {
    sessionStorage.removeItem('logemail');
    sessionStorage.removeItem('lognome');       
    sessionStorage.removeItem('logcpf');
    sessionStorage.removeItem('logservicoid');    
    sessionStorage.removeItem('logid');  
    sessionStorage.removeItem('logperfil');  
    sessionStorage.removeItem('logprogress');
    sessionStorage.removeItem('logcep');   
    sessionStorage.removeItem('logcepbanco');       
    sessionStorage.removeItem('logcnpj'); 
    sessionStorage.removeItem('lograzao_social');  
    sessionStorage.removeItem('lograzaosocial');  
    sessionStorage.removeItem('logclienteId');
    sessionStorage.removeItem('logcpfrep');
    sessionStorage.removeItem('logdocumento');
    sessionStorage.removeItem('logemailId');
    sessionStorage.removeItem('logeventoId');
    sessionStorage.removeItem('logMarca');
    sessionStorage.removeItem('logmatrizId');
    sessionStorage.removeItem('logModelo');
    sessionStorage.removeItem('logrepresentante');
    sessionStorage.removeItem('logeventoservico');    
    sessionStorage.removeItem('logempresaid');      
    sessionStorage.setItem('logperfil', 0);
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
           <NavLink href="#"><strong> <span className="glyphicon glyphicon-user"></span> BEM VINDO (A), {sessionStorage.getItem('lognome')} </strong></NavLink>                              
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
                  <a href={`/empresa_alterar/`+sessionStorage.getItem('logid')}>     
                        Editar Perfil  
                    </a>  
                    <br/>
                  </div>
                </div>   
              </li>
              <li>
              <div className="itens_menu">
                <a href="/area_cliente_empresarial" className="icon_centralizado_novo">                    
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
                <a href={`/empresa_endereco/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">
                <LightTooltip title="Endereço" placement="top">
                <i className="fas fa-address-card"></i>
                </LightTooltip>              
                </a>
                </div>
              </li>
              <li>
              <div className="itens_menu">
                <a href={`/empresa_senha_alterar/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">
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
                <a href={`/lista_motorista_preferido`} className="icon_centralizado_novo">
                     <LightTooltip title="Motoristas Preferidos" placement="top">
                         <i className="fas fa-id-card"></i>
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

