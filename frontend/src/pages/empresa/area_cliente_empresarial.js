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
    
  verifica_menu() {    

      return (      
         <strong>{localStorage.getItem('lognome')}</strong>
       ); 
    
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
  render()
  {   
    return ( 
     <div> 
        <Menu_cliente_empresarial />  
          <div className="titulo_admministrador">    
          <div className="unnamed-character-style-4 descricao_admministrador">                                
            <h5> {localStorage.getItem('lograzao_social')} </h5>   
               {this.verifica_menu()}, {this.verifica_horario()} !
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