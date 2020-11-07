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

    return (      
       <strong>{localStorage.getItem('lognome')}</strong>
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
        <Menu_cliente_individual />  
         <div className="titulo_lista">        
           <div className="unnamed-character-style-4 descricao_admministrador">                                
            <div className="titulo_bemvindo"> {this.verifica_titulo()}, {this.verifica_horario()} ! </div>          
            </div>             
            
              <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '15vh' }} />
              </Container>

              <div className="titulo_area">NÚMEROS OSER</div>

              <div class="p-2">               
                <div class="d-flex justify-content-start titulo_area_descricao">
                      <div> 
                          <img src='/evento.png' style={{ width: '57px', height: '56px' }}/>                           
                      </div>                      
                      <div className="area_evento"> 
                        Eventos 
                        0   
                      </div>
                      <div className="area_evento_2"> 
                        <img src='/tour.png' style={{ width: '57px', height: '56px' }}/>                
                      </div>
                      <div className="area_evento"> 
                        Viagens
                        0
                      </div>
                      <div className="area_evento_3"> 
                        <img src='/user.png' style={{ width: '57px', height: '56px' }}/>                
                      </div>
                      <div className="area_evento"> 
                        Custos
                        0
                      </div>
                  </div>  
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

export default Area_cliente;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));