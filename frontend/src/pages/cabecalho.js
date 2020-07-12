import React, { useState } from 'react';
import {Link} from 'react-router-dom';
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
//import ReactDOM from 'react-dom';
//import Modal from './modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//const baseUrl = "http://34.210.56.22:3333";  
const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');

const Cabecalho = props => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

 return (  
  <div className="container_fluid">                           
      <Navbar color="#dc3545" light expand="md">
        <NavbarBrand href="/"></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>               
              <NavLink href="/"><i className="fa fa-home"></i> INICIO</NavLink>
            </NavItem>
            <NavItem>               
              <NavLink href="/sobre">SOBRE</NavLink>
            </NavItem>            
            <NavItem>               
              <NavLink href="/servicos">SERVIÇOS</NavLink>
            </NavItem>
            <NavItem>               
              <NavLink href="/contato">CONTATO</NavLink>
            </NavItem>          
            <NavItem>               
              <NavLink href="/maps">MAPS</NavLink>
            </NavItem>                  
            <NavItem>
              <NavLink href="/login"><i className="fa fa-sign-in"></i> ENTRAR </NavLink>
            </NavItem>            
          </Nav>         
        </Collapse>
      </Navbar>    
       <div className="bg-danger text-center">
        <Link to='#'>
            <div className='thumbnail_logo'>
                <img src="logo_oser.png" className="img-thumbnail"  width="100" height="100"/>                               
            </div>
        </Link>          
        <br/>
  </div>      
</div> 
 );  
// }
}
//export default cabecalhoComponent;

//export default cabecalhoComponent;
export default Cabecalho;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

