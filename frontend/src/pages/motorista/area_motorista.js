import React  from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_motorista from '../motorista/menu_motorista' ;

const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');  
const id = localStorage.getItem('logid');   

class Area_motorista extends React.Component  {

  constructor(props){
    super(props);
    
  }

  componentDidMount(){
     //this.loadCliente()
  }
    
  render()
  {   

    return ( 
     <div> 
         <Menu_motorista />
          <div>                      

              <center><h3><strong>ÁREA DO MOTORISTA</strong></h3></center>

              
              <br/>
              <br/>
              <br/>
          </div> 
      </div>    
    );
  }

  
}

export default Area_motorista;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));