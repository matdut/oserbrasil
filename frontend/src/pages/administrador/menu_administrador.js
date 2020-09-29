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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
class menu_administradorComponent extends React.Component  {

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
       <i> <div className="avatar_adm"><Avatar className="classe_orange">AD</Avatar>                      
         </div>      
           <div className="teste perfil">                
          </div>
       </i>      
   </div>     
    <div class="item teste active">
      <LightTooltip title="Inicio" placement="top">
        <a href="/area_administrador">
        <i class="fas fa-home"></i>   
        </a>  
      </LightTooltip>   
    </div>    
    <div className="item teste">    
       <LightTooltip title="Cliente" placement="top">
            <a href={'/lista_individual'}>           
              <i class="fas fa-user"></i>
            </a>  
        </LightTooltip>    
    </div>  
    <div className="item teste">
    <LightTooltip title="Empresa" placement="top">
        <a href={"/lista_empresarial"}>
        <i class="fas fa-city"></i>
        </a>  
    </LightTooltip>    
    </div>
    <div class="item teste">
    <LightTooltip title="Motoristas" placement="top">
       <a href={"/listar"}>       
       <i class="fas fa-address-card"></i>
       </a>  
    </LightTooltip>   
    </div>   
    <div className="item teste">
      <LightTooltip title="Operadores" placement="top">
        <a href={"/operador_lista"}>
        <i class="fas fa-users"></i>
        </a>   
      </LightTooltip>    
    </div>
    <div className="item teste">
      <LightTooltip title="Veículos" placement="top">
        <a href={"/listar_tipo_veiculo"}>
        <i class="fas fa-car-alt"></i>
        </a>   
      </LightTooltip>    
    </div>
    <div className="item teste">
      <LightTooltip title="Valores Tarifários" placement="top">
        <a href={"/matriz_listar"}>
        <i class="fas fa-money-bill-wave"></i>
        </a>   
      </LightTooltip>    
    </div>
    <div className="item teste">
      <LightTooltip title="Funcionalidade" placement="top">
        <a href={"/funcionalidade/list"}>
        <i class="fas fa-shield-alt"></i>
        </a>   
      </LightTooltip>    
    </div>
    <div className="item teste">
       <LightTooltip title="Sair" placement="right">
        <button type="button" className="btn btn-sm botao_sair" onClick={this.handleClick}>
           <i class="fas fa-sign-out-alt"></i> </button>   
       </LightTooltip>    
    </div>    
      
      <div className="item_sem_borda versao_sistema"> 
        <img src="/logo.png" alt="..." width="50" className="logo_centralizado"/>
        <div className="data_versao"> 07/09/20 v1.8.0 </div>
     </div>    
   </div>                                       
                            
  </div> 
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_administradorComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

