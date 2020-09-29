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
      perfil: localStorage.getItem('logperfil'),    
      razao_social: localStorage.getItem('lograzao_social'), 
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
    localStorage.removeItem('logprogress');
    localStorage.removeItem('logcep');   
    localStorage.removeItem('logcepbanco');       
    localStorage.removeItem('lograzao_social');  
    localStorage.removeItem('lograzaosocial');  
    localStorage.removeItem('logclienteId');
    localStorage.removeItem('logcpfrep');
    localStorage.removeItem('logdocumento');
    localStorage.removeItem('logemailId');
    localStorage.removeItem('logeventoId');
    localStorage.removeItem('logMarca');
    localStorage.removeItem('logmatrizId');
    localStorage.removeItem('logModelo');
    localStorage.removeItem('logrepresentante')
    localStorage.setItem('logperfil', 0);
    localStorage.setItem('logperfil', null);
    localStorage.setItem('logid', 0);

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
           <NavLink href="#"><strong> <span className="glyphicon glyphicon-user"></span> BEM VINDO (A), {localStorage.getItem('lognome')} </strong></NavLink>                              
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
  <div>    
    <div className="left">    
   <br/>
    <div className="item avatar_titulo">
       <i><div className="avatar"><Avatar alt={localStorage.getItem('lognome')} src="/broken-image.jpg" className="classe_orange" />                         
       </div>
         <div className="teste perfil">
         <a href={`/empresa_alterar/`+localStorage.getItem('logid')}>     
              Editar Perfil  
          </a>  
          <br/>
         </div>
       </i>      
   </div>  
    <div class="item teste active">
    <LightTooltip title="Inicio" placement="top">
       <a href="/area_cliente_empresarial">
       <i class="fas fa-home"></i>   
       </a>  
    </LightTooltip>   
    </div>
    <div className="item teste">    
       <LightTooltip title="Eventos" placement="top">
            <a href={"/listaeventocliente/"+this.state.id+"/"+localStorage.getItem('logperfil')}>           
            <i class="fas fa-bell"></i>
            </a>  
        </LightTooltip>    
    </div>  
    <div className="item teste">    
       <LightTooltip title="Dados da empresa" placement="top">
            <a href={`/empresa_dados_alterar/`+localStorage.getItem('logid')}>           
            <i className="fas fa-fw fa-columns"></i>
            </a>  
        </LightTooltip>    
    </div>  
    <div className="item teste">
    <LightTooltip title="Endereço" placement="top">
        <a href={`/empresa_endereco/`+localStorage.getItem('logid')}>
           <i class="fas fa-address-card"></i>
        </a>  
    </LightTooltip>    
    </div>
    <div class="item teste">
    <LightTooltip title="Senha" placement="top">
       <a href={`/empresa_senha_alterar/`+localStorage.getItem('logid')}>
          <i class="fas fa-unlock-alt"></i>
       </a>  
    </LightTooltip>   
    </div>
    <div className="item teste">
      <LightTooltip title="Operadores" placement="top">
        <a href={`/operador_lista_empresa/`+localStorage.getItem('logid')}>
            <i class="fas fa-users"></i>
        </a>   
      </LightTooltip>    
    </div>
    <div class="item teste">
    <LightTooltip title="Cadastro Icompleto" placement="top">
       <a href={`/lista_operador_email/`+localStorage.getItem('logid')}>
           <i class="fas fa-info"></i>
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
        28/08/20 v1.7.0
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

