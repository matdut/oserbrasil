import React  from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import Menu_motorista from '../motorista_auxiliar/menu_motorista_auxiliar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import menu_motorista_auxiliar from '../motorista_auxiliar/menu_motorista_auxiliar';
import { valorMask } from '../formatacao/valormask';

const login = sessionStorage.getItem('logemail');              
const nome = sessionStorage.getItem('lognome');  
const id = sessionStorage.getItem('logid');   

class Area_motorista extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      nome: "",
      perfil:"",
      id: "",
      campTotal_viagens: '',
      campvalor_total: '',
      totalEventos: '',
      isOpen: false
    }
    
  }

  componentDidMount(){
    this.setState({
      perfil: sessionStorage.getItem('logperfil'),    
      nome: sessionStorage.getItem('lognome'),
      id: sessionStorage.getItem('logid'), 
      statusid: sessionStorage.getItem('statusid') 
    });
  }

verifica_menu() {    

    return (      
       sessionStorage.getItem('lognome')
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

verifica_mensagem() {
  if (sessionStorage.getItem('statusid') == 16) {
    //const classes = useStyles();
    return (
      <div className="mensagem_motorista">     
         Documentação em análise, favor aguardar. Liberadas apenas as funções de alteração de dados cadastrais!!   
      </div>
    );
  } else {
    return (
      <Container maxWidth="sm">
           <Typography component="div" style={{ backgroundColor: '#white', height: '12vh' }} />
      </Container>
    );
  }
  
}
    
    
  render()
  {   

    return ( 
     <div> 
         <menu_motorista_auxiliar />
         <div className="titulo_lista">        
           <div className="unnamed-character-style-4 descricao_admministrador">          
           <div className="titulo_bemvindo"> {this.verifica_menu()}, {this.verifica_horario()} ! </div>                                           
            </div>         
           
            {this.verifica_mensagem()}  
            <br/>
            <br/>
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '5vh' }} />
              </Container>
              
              <div className="titulo_area">SEUS NÚMEROS</div>

              <div class="p-2">               
                <div class="d-flex justify-content-start titulo_area_descricao_empresarial">
                      <div> 
                          <img src='/icon-calendar-157837097.jpg' style={{ width: '40px', height: '40px' }}/>                           
                      </div>                      
                      <div className="area_evento_empresa"> 
                        Eventos <br/>
                        <div className="area_evento_valor"> {this.state.totalEventos}   </div>
                      </div>
                      <div className="area_evento_2_empresa"> 
                        <img src='/tour.png' style={{ width: '40px', height: '40px' }}/>                
                      </div>
                      <div className="area_evento"> 
                      Serviços
                        <div className="area_evento_valor">{this.state.campTotal_viagens}</div>
                      </div>
                      <div className="area_evento_3_empresa"> 
                        <img src='/Group_1157.png' style={{ width: '40px', height: '40px' }}/>                
                      </div>
                      <div className="area_evento"> 
                        Custos
                          <div className="area_evento_valor">R$ {valorMask(this.state.campvalor_total)}</div>
                      </div>                     
                  </div>  
              </div>  

        
            
          </div> 
      </div>    
    );
  }

  
}

export default Area_motorista;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));