import React  from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_administrador from '../administrador/menu_administrador' ;
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


class Area_administrador extends React.Component  {

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
        <Menu_administrador />  
          <div>                      

              <center><h3><strong>ÁREA DO ADMINISTRADOR</strong></h3></center>
              <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '42vh' }} />
              </Container>
              <br/>
              <br/>
              <br/>
              <br/>
          </div> 
      </div>    
    );
  }

  
}

export default Area_administrador;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));