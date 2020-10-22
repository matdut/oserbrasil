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
    
  verifica_titulo() {    

      return (      
         localStorage.getItem('lognome')
       ); 
    
  }  
  
  verifica_horario(){
    const d = new Date();
    const hour = d.getHours();
  
    if (hour < 5) {
      return (
        'boa noite'
        );        
    } else if (hour < 5) { 
      return (
        'bom dia' 
        );        
    } else if (hour < 8) { 
      return (
        'bom dia'          
        );        
    } else if (hour < 12) { 
      return (
        'bom dia'          
        );        
    } else if (hour < 18) { 
      return (
        'boa tarde'          
        );        
    } else { 
      return (
         'boa noite'          
        );        
    }
  }
  
  render()
  {   
    return ( 
     <div> 
        <Menu_cliente_empresarial />  
          <div className="titulo_lista">    
          <div className="unnamed-character-style-4 descricao_admministrador">                                
              <div className="titulo_bemvindo"> {this.verifica_titulo()}, {this.verifica_horario()} ! </div>
              <div className="titulo_empresa"> {localStorage.getItem('lograzao_social')} </div>      
            </div>                    
            
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