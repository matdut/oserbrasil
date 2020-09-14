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
        status: localStorage.getItem('logstatus'),
      }
      
    }    

  componentDidMount(){
    
    this.setState({
      perfil: localStorage.getItem('logperfil'),    
      nome: localStorage.getItem('lognome'),
      id: localStorage.getItem('logid'),      
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
    localStorage.removeItem('logemail');
    localStorage.removeItem('lognome');       
    localStorage.removeItem('logid');  
    localStorage.removeItem('logperfil');  
    localStorage.removeItem('logprogress');
    localStorage.removeItem('logcep');   
    localStorage.removeItem('logcepbanco');       
    localStorage.removeItem('logstatus');  
    localStorage.removeItem('lograzao_social');
    localStorage.removeItem('lograzaosocial');  
    localStorage.removeItem('logoperadorId');      
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
  <div>    
  <div className="left">    
  <br/>
  <div className="item avatar_titulo">
       <i><div className="avatar"> <Avatar alt={localStorage.getItem('lognome')} src="/broken-image.jpg" className="classe_orange" />                    
       </div>
         <div className="teste perfil">
         <a href={`/operadores_alterar/`+localStorage.getItem('logid')}>   
              Editar Perfil  
          </a>  
         </div>
       </i>      
   </div>            
  <div class="item teste active">
      <LightTooltip title="Inicio" placement="top">
        <a href="/area_operador">
        <i class="fas fa-home"></i>   
        </a>  
      </LightTooltip>   
    </div>   
  <div className="item teste">
  <LightTooltip title="Senha" placement="top">
      <a href={`/senha_operador_alterar/`+localStorage.getItem('logid')}>
        <i className="fas fa-fw fa-columns"></i>
      </a>  
  </LightTooltip>    
  </div>
  <div class="item teste">
  <LightTooltip title="#" placement="top">
     <a href="#">
       <i className="fas fa-fw fa-th"></i>
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
        <img src="/logo.png" alt="..." width="50"/>
       <div className="data_versao"> 07/09/20 v1.8.0 </div>
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

