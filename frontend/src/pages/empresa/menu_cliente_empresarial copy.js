import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { Button, Form, Label, Input, FormText } from 'reactstrap';
import Modal from 'react-modal';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';

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
    <Navbar color="#dc3545" light expand="md">
        <NavbarBrand href="#">{localStorage.getItem('lograzao_social')}</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>            
             {this.verifica_menu()}
            <NavItem>               
              <NavLink href="#">AVALIAR</NavLink>
            </NavItem>
            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                   OPERADORES
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem 
                    href={`/incluir_operador/`+this.state.id}> 
                      <i class="fas fa-plus-square"></i> INCLUIR
                 </DropdownItem>   
                 <DropdownItem 
                    href={`/operador_lista_empresa/`+this.state.id}> 
                       <i class="fas fa-list-ul"></i> LISTAR
                 </DropdownItem>  
                 <DropdownItem 
                    href={"/lista_operador_email/"+this.state.id}> 
                    <i class="fas fa-list-ul"></i> LISTA CADASTROS INCOMPLETOS
                 </DropdownItem> 
                <DropdownItem divider />                
              </DropdownMenu>
            </UncontrolledDropdown>          

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                   EVENTOS
              </DropdownToggle>
              <DropdownMenu right>
                 <DropdownItem 
                    href={"/criar_eventos/"+this.state.id}> 
                    <i class="fas fa-plus-square"></i> CRIAR
                 </DropdownItem>  
                 <DropdownItem 
                    href={"/listaeventocliente/"+this.state.id}> 
                    <i class="fas fa-list-ul"></i> LISTAR
                 </DropdownItem>                
                <DropdownItem divider />                
              </DropdownMenu>
            </UncontrolledDropdown>          
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <i class="fas fa-list"></i> ALTERAR
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem 
                    href={`/empresa/`+localStorage.getItem('logid')}> 
                    <i class="far fa-user"></i> Dados Representante
                 </DropdownItem>  
                 <DropdownItem 
                    href={`/empresa_dados/`+localStorage.getItem('logid')}> 
                    <i class="fas fa-home"></i> Dados Empresa
                 </DropdownItem>  
                 <DropdownItem 
                    href={`/empresa_endereco/`+localStorage.getItem('logid')}> 
                    <i class="fas fa-home"></i> Endereço
                 </DropdownItem>  
                 <DropdownItem 
                    href={`/empresa_senha/`+localStorage.getItem('logid')}> 
                   <i class="fas fa-key"></i> Alterar Senha
                 </DropdownItem>                
                <DropdownItem divider />                     
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
               <button type="button" className="btn btn-danger btn-sm botao_sair" onClick={this.handleClick}>
               <i class="fas fa-sign-out-alt"></i> SAIR </button>
            </NavItem>            
          </Nav>         
        </Collapse>
      </Navbar>                                       
      
  </div> 
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_clienteComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

