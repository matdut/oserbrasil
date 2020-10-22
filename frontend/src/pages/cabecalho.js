import React, { useState } from 'react';
import {Link, NavLink } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,    
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import Tooltip from '@material-ui/core/Tooltip';
//import ReactDOM from 'react-dom';
//import Modal from './modal';

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

const useStylesBootstrap = makeStyles((theme) => ({
   arrow: {
     color: theme.palette.common.black,
   },
   tooltip: {
     backgroundColor: theme.palette.common.black,
   },
 }));

function BootstrapTooltip(props) {
   const classes = useStylesBootstrap();
 
   return <Tooltip arrow classes={classes} {...props} />;
 }

 
//const baseUrl = "http://34.210.56.22:3333";  
const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');
const perfil = localStorage.getItem('logperfil');

const Cabecalho = props => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
 
 return (  
  <div>          
    <div className="left">
    <br/>   
    <div className="item avatar_titulo">      
    </div>
    <div className="item active teste">      
       <a href="/">           
         <LightTooltip title="Inicio" placement="top">
           <i className="fas fa-home"></i>
          </LightTooltip>           
       </a>          
    </div>
    <div className="item teste">      
         <a href="/sobre">
         <LightTooltip title="Sobre" placement="top">
             <i className="fas fa-fw fa-columns"></i>
         </LightTooltip>              
         </a>        
    </div>
    <div class="item teste">      
      <LightTooltip title="Serviços" placement="top">
         <a href="/servicos">
            <i className="fas fa-fw fa-th"></i>
         </a>        
      </LightTooltip>
    </div>
    <div className="item teste">
      <LightTooltip title="Contato" placement="top">
         <a href="#">
            <i className="fas fa-fw fa-th"></i> 
         </a>   
      </LightTooltip>   
    </div>
    <div className="item teste">
      <LightTooltip title="Entrar" placement="top">
       <a href="/login">
          <i className="fas fa-fw fa-user-circle"></i> ENTRAR
       </a>   
      </LightTooltip> 
    </div>    
    
    <div className="item_sem_borda versao_sistema"> 
        <img src="/logo.png" alt="..." width="50" className="logo_centralizado"/>       
        <div className="data_versao"> 07/09/20 v1.8.0 </div>
     </div>  
   
   </div>   
</div> 
 );  
// }
}
//export default cabecalhoComponent;

//export default cabecalhoComponent;
export default Cabecalho;

//ReactDOM.unmountComponentAtNode(document.getElementById('cabecalho'));

