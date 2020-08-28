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
                 <DropdownItem
                    href={"/criar_eventos/"+this.state.id}> 
                    <i class="fas fa-plus-square"></i> CRIAR  
                 </DropdownItem>                
                 <DropdownItem className="menu_link_outros" 
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
                    href={`/cliente/`+localStorage.getItem('logid')}> 
                  <i class="far fa-user"></i> Dados Pessoais
                 </DropdownItem>                  
                 <DropdownItem 
                    href={`/cliente_senha/`+localStorage.getItem('logid')}> 
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

