import React from 'react';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Cabecalho from './cabecalho';

const Inicio = props => { 
  //const login = localStorage.getItem('logemail');              
  //const nome = localStorage.getItem('lognome');

  //class inicioComponent extends React.Component  {
/*
  constructor(props){
    super(props);
  }

  componentDidMount(){    
      
  }

  render()
  {    */
  

    return (             
      <div>
        <Cabecalho />
        <br/>      
          <Link to='/maps'>
                        Mapas
          </Link>   
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
