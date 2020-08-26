import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//const message = `Olá, estou entrando em contato pois gostaria de ajudar`;

import './rodape.css';
//const Rodape = props => {
class rodapeComponent extends React.Component  {

  render()
  { 
    return (
      <footer className='container-fluid text-center'> 
      <br/>   
      <br/>  
      <div className="containner">
      
         <label> <strong><h3>EM DESENVOLVIMENTO</h3></strong>
            <h5><strong>última atualização: 19/08/2020 - v1.5.0</strong></h5>
            <br/>
            <div className="d-flex justify-content-center">           
              <img className="logo_inicio" src="../logo_oser_principal.png"/>
            </div>
         </label>
            
       </div>  
       <br/>     
       <br/>
       <br/>
      </footer>
    ); 

   }
}

export default rodapeComponent;
