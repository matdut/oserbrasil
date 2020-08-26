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
class menu_motoristaComponent extends React.Component  {

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
    //this.verifica_menu();
  }
  handleClick = () => {
    localStorage.removeItem('logemail');
    localStorage.removeItem('lognome');       
    localStorage.removeItem('logid');  
    localStorage.removeItem('logperfil');  
    localStorage.removeItem('logprogress');
    localStorage.removeItem('logcep');       
    localStorage.removeItem('lograzao_social');  
    localStorage.removeItem('lograzaosocial');  

    this.props.history.push("/");
  }

    //this.props.history.push('/');    
    //return(
    // <h1> aqiui adas sdasd asas d sa</h1>
    //);  
     
    verifica_menu() {
      if (this.state.perfil == 1) {
        return ( 
          <li className="nav-item">
             <NavItem>     
                <NavLink href="#"><strong><span class="glyphicon glyphicon-user"></span> BEM VINDO, ADMINISTRADOR </strong></NavLink>                                 
             </NavItem>  
          </li>   
         ); 
      } else if (this.state.nome != null) {
        return ( 
          <li className="nav-item">
             <NavItem>  
                <NavLink href="#"><strong> <span className="glyphicon glyphicon-user"></span> BEM VINDO (A), {this.state.nome.toUpperCase()} </strong></NavLink>                              
             </NavItem>  
          </li>   
         ); 
      }            
    }
  
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
            <NavItem>               
              <NavLink href="#">EVENTOS</NavLink>
            </NavItem>          
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <i class="fas fa-list"></i> ALTERAR
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href={`/motorista/`+localStorage.getItem('logid')}>
                <i class="far fa-user"></i> Dados Pessoais
                </DropdownItem>
                <DropdownItem href={`/endereco_motorista/`+localStorage.getItem('logid')}>
                <i class="fas fa-home"></i> Endereço
                </DropdownItem>
                <DropdownItem href="#">
                <i class="fas fa-money-bill-wave"></i> Meus Ganhos
                </DropdownItem>
                <DropdownItem href={`/documentos_motorista/`+localStorage.getItem('logid')}>
                <i class="far fa-file-alt"></i> Meus Documentos
                </DropdownItem>
                <DropdownItem href="#">
                <i class="fas fa-road"></i> Minhas Viagens
                </DropdownItem>                
                <DropdownItem href={`/veiculo_motorista/`+localStorage.getItem('logid')}>
                <i class="fas fa-car"></i> Meu Veículo
                </DropdownItem>
                <DropdownItem href="#">
                <i class="far fa-life-ring"></i> Ajuda
                </DropdownItem>
                <DropdownItem href="#">
                <i class="fas fa-sliders-h"></i> Configurações
                </DropdownItem>
                <DropdownItem href={`/senha_motorista/`+localStorage.getItem('logid')}>
                <i class="fas fa-key"></i> Alterar Senha
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
</div>
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_motoristaComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

