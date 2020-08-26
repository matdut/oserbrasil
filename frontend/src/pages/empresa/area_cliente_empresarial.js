import React  from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial' ;
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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
        <Menu_cliente_empresarial />  
          <div>        

              <center><h3><strong>ÁREA DO CLIENTE EMPRESARIAL</strong></h3></center>
            
              <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '42vh' }} />
              </Container>

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