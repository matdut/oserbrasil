import React from 'react';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Cabecalho from './cabecalho';

const Inicio = props => { 
  
    return (             
      <div>
        <Cabecalho />
        <br/>                
        <br/>
        <div className="container-fluid">                       
            <div className='row'>
              <div className='col-sm-3'>
              </div> 
              <div className='col-sm-3'>
                <center>
                  <div className='thumbnail_inicio'>
                      <Link to='/form'>
                          <img src="cadcliente.png" className="img-thumbnail" />                         
                      </Link>   
                  </div>
                </center> 
              </div>  
              <div className='col-sm-3'>
              <center>
                  <div className='thumbnail_inicio'>
                      <Link to='/criar'>
                          <img src="cadmotorista.png" className="img-thumbnail" />                                                 
                      </Link>   
                  </div>
               </center>   
              </div>           
              <div className='col-sm-3'>
              </div> 
            </div>         
        </div>
      </div>  
    );
    
  
}

export default Inicio;
