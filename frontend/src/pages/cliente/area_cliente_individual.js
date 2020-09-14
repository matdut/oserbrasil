import React  from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_cliente_individual from '../cliente/menu_cliente_individual' ;
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class Area_cliente extends React.Component  {
  constructor(props){
    super(props);    
    this.state = {
      nome: "",
      perfil:"",
      id: "",
      isOpen: false
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),    
      nome: localStorage.getItem('lognome'),
      id: localStorage.getItem('logid') 
    });

  }
    
  verifica_titulo() {
    if ( this.state.perfil == 1) {
      return (            
           <strong> ADMINISTRADOR </strong>
       ); 
    } else {
      return (      
         <strong>{this.state.nome}</strong>
       ); 
    }            
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
        <Menu_cliente_individual />  
         <div className="titulo_admministrador">        
           <div className="unnamed-character-style-4 descricao_admministrador">                                
               {this.verifica_titulo()}, {this.verifica_horario()} !
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