import React from 'react';
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
class menu_administradorComponent extends React.Component  {

  constructor(props){
    super(props);    
  }    

  componentDidMount(){
    
    //this.reload1();
     //this.loadCliente()
  }
  handleClick = () => {
    localStorage.removeItem('logemail');
    localStorage.removeItem('lognome');       
    localStorage.removeItem('logid');  
    localStorage.removeItem('logperfil');  

    this.props.history.push("/");
  }

    //this.props.history.push('/');    
    //return(
    // <h1> aqiui adas sdasd asas d sa</h1>
    //);   
  
  
  render()
  {
    const login = localStorage.getItem('logemail');              
    const nome = localStorage.getItem('lognome');  
    const id = localStorage.getItem('logid');    

 return (
  <div>  
    <Navbar color="#dc3545" light expand="md">
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>   
              <NavItem className="nav-item">         
                <NavLink href="#"><strong><span class="glyphicon glyphicon-user"></span> BEM VINDO, ADMINISTRADOR </strong></NavLink>                  
              </NavItem>  
            <NavItem>                             
               <NavLink href="/list">LISTAR CLIENTES</NavLink>
            </NavItem>
            <NavItem>               
              <NavLink href="/listar">LISTAR MOTORISTAS</NavLink>          
            </NavItem>
            <NavItem>               
              <NavLink href="#">PENDÊNCIAS</NavLink>          
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                   MATRIZ
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href={"/matriz_criar"}>
                  CRIAR
                </DropdownItem>
                <DropdownItem href={"/matriz_listar"}>
                  LISTAR
                </DropdownItem>
                <DropdownItem divider />                
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>               
              <NavLink href="#">CONTATO</NavLink>
            </NavItem>          
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
export default withRouter(menu_administradorComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

