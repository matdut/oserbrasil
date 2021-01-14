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

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


//const Cabecalho_cliente = props => {
class menu_eventosComponent extends React.Component  {

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
    sessionStorage.removeItem('lograzao_social');  
    sessionStorage.removeItem('lograzaosocial');  

    this.props.history.push("/");
  }

  verifica_menu() {

    if (this.state.perfil == 1) {
      return ( 
        <li className="nav-item">
           <NavItem>       
               <NavLink href="#"><strong><span class="glyphicon glyphicon-user"></span> BEM VINDO, ADMINISTRADOR </strong></NavLink>  
           </NavItem>  
        </li>   
       ); 
    } else if (this.state.nome !== null){
        return (
          <li className="nav-item">
            <NavItem>       
              <NavLink href="#"><strong> <span className="glyphicon glyphicon-user"></span> BEM VINDO (A), {this.state.nome.toUpperCase()} </strong></NavLink>              
            </NavItem>                
          </li>   
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
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>            
             {this.verifica_menu()}
            <NavItem>               
              <NavLink href="#">AVALIAR</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                   EVENTOS
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href={"/criar_eventos/"+this.state.id}>
                  CRIAR
                </DropdownItem>
                <DropdownItem href={"/listaeventocliente/"+this.state.id}>
                  LISTAR
                </DropdownItem>
                <DropdownItem divider />                
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>               
              <NavLink href="#">CONTATO</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                ALTERAR
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href={"/edit/"+this.state.id}>
                  MEUS DADOS
                </DropdownItem>
                <DropdownItem href={"/alterar_senha"}>
                   SENHA
                </DropdownItem>
                <DropdownItem divider />                
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
               <button type="button" className="btn btn-danger btn-sm" onClick={this.handleClick}>
               <i class="fas fa-sign-out-alt"></i>SAIR
               </button>
            </NavItem>            
          </Nav>         
        </Collapse>
      </Navbar>                                        
                            
  </div> 
 );  
 }
}
//export default cabecalhoComponent;
export default withRouter(menu_eventosComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

