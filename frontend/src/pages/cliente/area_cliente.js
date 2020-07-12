import React  from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_cliente from '../cliente/menu_cliente' ;

class Area_cliente extends React.Component  {
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
        <Menu_cliente />  
          <div>        

              <center><h3><strong>ÁREA DO CLIENTE</strong></h3></center>
            
              <br/>
              <br/>
              <br/>
          </div> 
      </div>    
    );
  }

  
}

export default Area_cliente;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));