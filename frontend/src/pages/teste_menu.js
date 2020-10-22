import React, { useState } from 'react';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import './teste_menu.css';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

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
  render()
  { 

  return (
    <div class="nav-side-menu">
    <div class="brand"></div>
    <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
  
        <div class="menu-list">
  
            <ul id="menu-content" class="menu-content collapse out">
                <li>
                <div className="avatar_titulo"><Avatar className="classe_orange">AD</Avatar>                      
                  </div>      
                    <div className="teste perfil">                
                    </div>                                    
                </li>                
                <li>
                <LightTooltip title="Inicio" placement="top">
                  <a href="/area_administrador">
                  <i class="fas fa-home"></i>   
                  </a>  
                </LightTooltip>   
                </li>     

                <li>
                <LightTooltip title="Cliente" placement="top">
                    <a href={'/lista_individual'}>           
                      <i class="fas fa-user"></i>
                    </a>  
                </LightTooltip>    
                </li>     
                         
                <li>
                <LightTooltip title="Empresa" placement="top">
                    <a href={"/lista_empresarial"}>
                    <i class="fas fa-city"></i>
                    </a>  
                </LightTooltip>  
                </li>     
                <li>
                <LightTooltip title="Motoristas" placement="top">
                  <a href={"/listar"}>       
                  <i class="fas fa-address-card"></i>
                  </a>  
                </LightTooltip>   
                </li>

                <li>
                <LightTooltip title="Operadores" placement="top">
                    <a href={"/operador_lista"}>
                    <i class="fas fa-users"></i>
                    </a>   
                  </LightTooltip>    
                </li>

                <li>
                <LightTooltip title="Veículos" placement="top">
                  <a href={"/listar_tipo_veiculo"}>
                  <i class="fas fa-car-alt"></i>
                  </a>   
                </LightTooltip>   
                </li>

                <li>
                <LightTooltip title="Tarifas" placement="top">
                  <a href={"/matriz_listar"}>
                  <i class="fas fa-money-bill-wave"></i>
                  </a>   
                </LightTooltip>    
                </li>
                <li data-toggle="collapse" data-target="#service" class="collapsed">
                  <a href="#"><i class="fas fa-cog"></i> <span class="arrow"></span></a>
                </li>  
                <ul class="sub-menu collapse" id="service">
                  <li><i class="fas fa-cog"></i></li>                  
                </ul>
                           
                 <li>
                 <LightTooltip title="Sair" placement="right">
                      <button type="button" className="btn btn-sm botao_sair" onClick={this.handleClick}>
                        <i class="fas fa-sign-out-alt"></i> </button>   
                    </LightTooltip>    
                  </li>

                  <li>
                  <img src="/logo.png" alt="..." width="50" className="logo_centralizado"/>
                   <div className="data_versao"> 07/09/20 v1.8.0 </div>
                  </li>
                 
            </ul>
     </div>
</div>     
  );
}
}
export default withRouter(menu_administradorComponent);