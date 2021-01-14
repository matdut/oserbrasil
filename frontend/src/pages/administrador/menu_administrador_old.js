import React from 'react';
import {Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,  
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
    sessionStorage.removeItem('logemail');
    sessionStorage.removeItem('lognome');       
    sessionStorage.removeItem('logid');  
    sessionStorage.removeItem('logperfil');  
    sessionStorage.removeItem('logprogress');
    sessionStorage.removeItem('logcep');       
    sessionStorage.removeItem('lograzao_social');  
    sessionStorage.removeItem('lograzaosocial');  
    sessionStorage.removeItem('logVeiculo')
    sessionStorage.setItem('logperfil', 0);

    this.props.history.push("/");
  }

    //this.props.history.push('/');    
    //return(
    // <h1> aqiui adas sdasd asas d sa</h1>
    //);   
  
  
  render()
  {
    const login = sessionStorage.getItem('logemail');              
    const nome = sessionStorage.getItem('lognome');  
    const id = sessionStorage.getItem('logid');    

 return (
  <div>  
    <Navbar color="#dc3545" light expand="md">
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>   
              <NavItem className="nav-item">         
                <NavLink href="#"><strong><span className="glyphicon glyphicon-user"></span> BEM VINDO, ADMINISTRADOR </strong></NavLink>                  
              </NavItem>                         
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <i class="fas fa-list"></i>  LISTA
              </DropdownToggle>
              <DropdownMenu right>                                          
                <DropdownItem href={'/lista_individual'}>                    
                  <i class="far fa-user"></i> CLIENTE INDIVIDUAL  
                </DropdownItem>                
                <DropdownItem href={"/lista_empresarial"}>
                <i class="far fa-building"></i> CLIENTE EMPRESARIAL  
                </DropdownItem>
                <DropdownItem href={"/listar"}>
                <i class="fas fa-car"></i> MOTORISTAS
                </DropdownItem>
                <DropdownItem href={"/operador_lista"}>
                <i class="fas fa-user-cog"></i> OPERADORES
                </DropdownItem>
                <DropdownItem href={"/listar_tipo_veiculo"}>
                <i class="fas fa-car"></i> VEÍCULOS
                </DropdownItem> 
                <DropdownItem href={"/matriz_listar"}>
                <i class="fas fa-money-bill-wave"></i> VALORES TARIFÁRIOS
                </DropdownItem>   
                <DropdownItem divider />                
                <DropdownItem href={"/lista_cad_incompleto"}>
                <i class="fas fa-money-bill-wave"></i> CADASTROS INCOMPLETOS
                </DropdownItem>                   
                <DropdownItem divider />                
              </DropdownMenu>
            </UncontrolledDropdown>                       
            <NavItem>
               <button type="button" class="btn btn-danger btn-sm" onClick={this.handleClick}>
               <i class="fas fa-sign-out-alt"></i> SAIR
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
export default withRouter(menu_administradorComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

