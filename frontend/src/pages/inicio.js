import React from 'react';
import { Container, Card, Button, CardTitle, CardText, Row, Col, NavItem, NavLink  } from 'reactstrap';
import {Link} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Cabecalho from './cabecalho';
import './inicio.css';


const Inicio = props => { 

    localStorage.setItem('logperfil', 0)
    localStorage.setItem('logVeiculo', 0)    

    return (             
      <div>
        <Cabecalho />
        <br/>                
        <br/>
        
        <div className="d-flex justify-content-center">           
           <img className="logo_inicio" src="logo_oser_black.png"/>
        </div>
        <div className="d-flex justify-content-center espacamento_logo">           
            <div className="texto_logo">novos caminhos para seu futuro teste</div>          
        </div>
        
        <div className="d-flex justify-content-center">  
          <div class="d-flex flex-column espacamento_caixa_texto">
                <div class="p-2 inicio_cliente"> 
                    <Link to='/tipo'> Ainda não é cliente? <i className="fa fa-chevron-right espacamento_seta_2" aria-hidden="true"></i></Link>         
                </div>
                <div class="p-2 inicio_cliente"> 
                     <Link to='/motorista/0'> Seja nosso motorista <i className="fa fa-chevron-right espacamento_seta_2" aria-hidden="true"></i></Link>                  
                </div>
          </div>      
        </div>  
        <br/>
        <br/>        
        <br/>
        <br/>
        <br/>
        <br/>
      </div>  
    );
    
  
}

export default Inicio;
