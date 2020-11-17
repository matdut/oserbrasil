import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

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

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="fundo_padrao"> 
    <div className="nav-side-menu">
    <div className="brand"></div>
    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
  
        <div className="menu-list">
  
            <ul id="menu-content" className="menu-content collapse out">
                <li>
                  <div className="avatar_titulo">
                  </div>   
                </li>
                <li>
                  <a href="/" className="icon_centralizado">                    
                     <LightTooltip title="Inicio" placement="top">
                         <i className="fa fa-home fa-lg active"></i>
                     </LightTooltip>    
                  </a>
                </li>     
                <li>
                  <a href="/sobre" className="icon_centralizado_novo">
                  <LightTooltip title="Sobre" placement="top">
                       <i className="fas fa-columns"></i>
                       
                  </LightTooltip>              
                  </a>
                </li>
                <li>
                  <a href="/servicos" className="icon_centralizado_novo">
                  <LightTooltip title="Serviços" placement="top">
                      <i className="fas fa-fw fa-th"></i>
                  </LightTooltip>              
                  </a>
                </li>
                <li>
                  <a href="/contato" className="icon_centralizado_novo">
                  <LightTooltip title="Contato" placement="top">
                      <i className="fas fa-fw fa-th"></i> 
                  </LightTooltip>              
                  </a>
                </li>
                <li>
                  <a href="/login" className="icon_centralizado_novo">
                  <LightTooltip title="Entrar" placement="top">
                     <i className="fas fa-fw fa-user-circle"></i> 
                  </LightTooltip>              
                  </a>
                </li>                    
            </ul>
     </div>
</div>     
</div>
  );
}

export default ModalExample;