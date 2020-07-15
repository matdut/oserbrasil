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
               <button type="button" class="btn btn-danger btn-sm" onClick={this.handleClick}>SAIR</button>
            </NavItem>            
          </Nav>         
        </Collapse>
      </Navbar>                                
      <div className="bg-danger text-center">
        <Link to='#'>
            <div className='thumbnail_logo'>
                <img src="../../logo_oser.jpeg" className="img-thumbnail" width="100" height="100" />                               
            </div>
        </Link>          
        <br/>
  </div>       
                            
  </div> 
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_clienteComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

