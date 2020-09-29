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
  
  verifica_horario(){
    const d = new Date();
    const hour = d.getHours();

    if (hour < 5) {
      return (
        <strong> boa noite </strong>          
        );        
    } else if (hour < 5) { 
      return (
        <strong> bom dia </strong>          
        );        
    } else if (hour < 8) { 
      return (
        <strong> bom dia </strong>          
        );        
    } else if (hour < 12) { 
      return (
        <strong> bom dia </strong>          
        );        
    } else if (hour < 18) { 
      return (
        <strong> boa tarde </strong>          
        );        
    } else { 
      return (
        <strong> boa noite </strong>          
        );        
    }
  }
  verifica_menu() {
    if (localStorage.getItem('logperfil') == 1) {
      return (            
           <strong> Administrador</strong>
       ); 
    }          
  }

  render()
  {   
    return ( 
     <div> 
        <Menu_administrador />  
          <div className="titulo_admministrador">   
            <div>
              <div className="unnamed-character-style-4 descricao_admministrador">                                
                {this.verifica_menu()}, {this.verifica_horario()} !
              </div>             
              <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '42vh' }} />
              </Container>

              </div>                   
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