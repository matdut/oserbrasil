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
      perfil: localStorage.getItem('logperfil'),    
      nome: localStorage.getItem('lognome'),
      id: localStorage.getItem('logid')             
    });
    //this.verifica_menu();

    this.carrega_motorista();

  }
  carrega_motorista() {
    //console.log('ENTROU AQUI busca_cep_banco')
    const { validate } = this.state

    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
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
    localStorage.removeItem('logemail');
    localStorage.removeItem('lognome');       
    localStorage.removeItem('logid');  
    localStorage.removeItem('logperfil');  
    localStorage.removeItem('logprogress');
    localStorage.removeItem('logcep');       
    localStorage.removeItem('lograzao_social');  
    localStorage.removeItem('lograzaosocial');  
    localStorage.removeItem('logVeiculo')

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
                <NavLink href="#"><strong> <span className="glyphicon glyphicon-user"></span> BEM VINDO (A), {localStorage.getItem('lognome').toUpperCase()} </strong></NavLink>                              
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
  <div className="left">    
 <br/> 
  <div className="item avatar_titulo">
       <i><div className="avatar_motorista"><Avatar alt={localStorage.getItem('lognome')} src={this.state.foto_perfil}/>                    
       </div>
         <div className="teste perfil">
         <a href={`/motorista_alterar/`+localStorage.getItem('logid')}>     
              Editar Perfil  
          </a>  
          <br/>
         </div>
       </i>      
   </div>        
  <div class="item teste active">
    <LightTooltip title="Inicio" placement="top">
       <a href="/area_motorista">
       <i class="fas fa-home"></i>   
       </a>  
    </LightTooltip>   
    </div>
  <div className="item teste">    
     <LightTooltip title="Endereço" placement="top">
          <a href={`/endereco_motorista_alterar/`+localStorage.getItem('logid')}>           
          <i class="fas fa-address-card"></i>
          </a>  
      </LightTooltip>    
  </div>  
  <div className="item teste">
  <LightTooltip title="Documentos" placement="top">
      <a href={`/documentos_motorista_alterar/`+localStorage.getItem('logid')}>
      <i class="fas fa-folder-open"></i>
      </a>  
  </LightTooltip>    
  </div>
  <div class="item teste">
  <LightTooltip title="Minha Foto" placement="top">
     <a href={`/foto_motorista_alterar/`+localStorage.getItem('logid')}>
        <i class="fas fa-camera"></i>
     </a>  
  </LightTooltip>   
  </div>
  <div className="item teste">
    <LightTooltip title="Senha" placement="top">
      <a href={`/senha_motorista_alterar/`+localStorage.getItem('logid')}>
          <i class="fas fa-unlock-alt"></i>
      </a>   
    </LightTooltip>    
  </div>
  <div class="item teste">
  <LightTooltip title="Veículos" placement="top">
     <a href={`/lista_veiculos/`+localStorage.getItem('logid')}>
     <i class="fas fa-car-alt"></i>
     </a>  
  </LightTooltip>   
  </div>    
  <div class="item teste">
  <LightTooltip title="Meus Ganhos" placement="top">
     <a href="#">
       <i className="fas fa-fw fa-th"></i>
     </a>  
  </LightTooltip>   
  </div>  
  <div class="item teste">
  <LightTooltip title="Ajuda" placement="top">
     <a href="#">
       <i className="fas fa-fw fa-th"></i>
     </a>  
  </LightTooltip>   
  </div>    
  <div className="item teste">
     <LightTooltip title="Sair" placement="top">
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
export default withRouter(menu_motoristaComponent);
//export default cabecalho_clienteComponent;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

