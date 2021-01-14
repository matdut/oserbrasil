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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import api from '../../services/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
class menu_motoristaComponent extends React.Component  {

  constructor(props){
    super(props);    
      this.state = {
        nome: "",
        perfil:"",
        id: "",
        foto_perfil: "",
        isOpen: false
      }
  }    

  componentDidMount(){
    
    this.setState({
      perfil: sessionStorage.getItem('logperfil'),    
      nome: sessionStorage.getItem('lognome'),
      id: sessionStorage.getItem('logid'),
      statusId: sessionStorage.getItem('statusid'),                    
    });
    //this.verifica_menu();

    this.carrega_motorista();

  }
  carrega_motorista() {
    //console.log('ENTROU AQUI busca_cep_banco')
    const { validate } = this.state

    api.get(`/motoristaAuxiliar/get/${sessionStorage.getItem('logid')}`)
    .then(res=>{
        if (res.data.data.length > 0) {
          this.setState({             
            foto_perfil: res.data.data[0].foto_url,       
          })          
        }
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
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
    sessionStorage.removeItem('logVeiculo');
    sessionStorage.removeItem('statusid');
    sessionStorage.setItem('conectado', 1);

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
                <NavLink href="#"><strong> <span className="glyphicon glyphicon-user"></span> BEM VINDO (A), {sessionStorage.getItem('lognome').toUpperCase()} </strong></NavLink>                              
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
  <div className="nav-side-menu">
  <div className="brand"></div>
  <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

      <div className="menu-list">

          <ul id="menu-content" className="menu-content collapse out">
              <li>
                <div className="avatar_titulo">
                <div className="avatar_motorista"><Avatar alt={sessionStorage.getItem('lognome')} src={this.state.foto_perfil}/>                       
                </div>
                  <div className="teste perfil">
                    <a href={`/motorista_alterar/`+sessionStorage.getItem('logid')}>   
                        Editar Perfil  
                    </a>  
                    <br/>
                  </div>
                </div>   
              </li>
              <li>
              <div className="itens_menu">
                 <a href="/area_motorista_auxiliar" className="icon_centralizado_novo">                    
                   <LightTooltip title="Inicio" placement="top">                
                      <i className="fas fa-home"></i>   
                   </LightTooltip>    
                </a>
                </div>
              </li>     
              <li>
              <div className="itens_menu">
              <a href={`/endereco_motorista_alterar/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">                    
                   <LightTooltip title="Endereço" placement="top">                
                   <i className="fas fa-address-card"></i>
                   </LightTooltip>    
                </a>
                </div>
              </li>   
              <li>
              <div className="itens_menu">
               <a href={`/documentos_motorista_alterar/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">
                <LightTooltip title="Documentos" placement="top">
                <i className="fas fa-folder-open"></i>                
                </LightTooltip>              
                </a>
                </div>
              </li>
              <li>
              <div className="itens_menu">
              <a href={`/foto_motorista_alterar/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">
                <LightTooltip title="Minha Foto" placement="top">
                <i className="fas fa-camera"></i>
                </LightTooltip>              
                </a>
                </div>
              </li> 
              <li>
              <div className="itens_menu">
              <a href={`/senha_motorista_alterar/`+sessionStorage.getItem('logid')} className="icon_centralizado_novo">
                <LightTooltip title="Senha" placement="top">
                <i className="fas fa-unlock-alt"></i>
                </LightTooltip>              
                </a>
                </div>
              </li>              
             
              <li>
              <div className="itens_menu">
              <a onClick={this.handleClick} className="icon_centralizado_novo">
                <LightTooltip title="Sair" placement="right">                  
                   <i className="fas fa-sign-out-alt"></i>
                </LightTooltip>    
              </a> 
              </div> 
              </li>                                 
          </ul>
   </div>
</div>     

 
 );  
 }
}

//export default cabecalhoComponent;
export default withRouter(menu_motoristaComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

