import React  from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Menu_motorista_preferido from '../motorista_preferido/menu_motorista_preferido';
import { valorMask } from '../formatacao/valormask';
import api from '../../services/api';

const login = sessionStorage.getItem('logemail');              
const nome = sessionStorage.getItem('lognome');  
const id = sessionStorage.getItem('logid');   

class Area_motorista_preferido extends React.Component  {

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

    this.interval = setInterval(() => this.tickarea_motorista(), 3000);
    this.setState({
      perfil: sessionStorage.getItem('logperfil'),    
      nome: sessionStorage.getItem('lognome'),
      id: sessionStorage.getItem('logid'), 
      statusid: sessionStorage.getItem('statusid') 
    });

    this.loadlistServicosConvite();
    this.loadlistServicosAtivos();
    this.load_motorista();
  }

  tickarea_motorista() {
    this.loadlistServicosConvite();
    this.loadlistServicosAtivos(); 
  }

  load_motorista() {
    const { validate } = this.state   
    api.get(`/motoristaPreferido/get/${sessionStorage.getItem('logid')}`)
    .then(res=>{

      this.setState({       
        statusid: sessionStorage.setItem('statusid', res.data.data[0].statusId)
      });

    });
  }
  loadlistServicosConvite(){    
    api.get(`/envioservicoMotorista/totalServicosenviados/${sessionStorage.getItem('logid')}`)
     .then(res=>{
       if (res.data.success == true) {       

         const data = res.data.data    
         this.setState({
           campEnvioConvite:data,
           loading: false,
          })
       }
     })
     .catch(error=>{
       console.log('loadlistServicosConvite'+error) 
    
     })
   }
   
   loadlistServicosAtivos(){
    // const url = baseUrl+"/cliente/list"   
    debugger;
    api.get(`/motorista_servico/totalServicosMotorista/${sessionStorage.getItem('logid')}`)
     .then(res=>{
       if (res.data.success == true) {
         const data = res.data.data             
//         console.log('valor  -'+data.toFixed(2));

         this.setState({
          campTotal_viagens: data,
         })
       }
     })
     .catch(error=>{
      console.log('loadlistServicosAtivos'+error) 
     })
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
          Documentação em análise, favor aguardar.         
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
         <Menu_motorista_preferido />
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
              
              <div className="titulo_area">SERVIÇOS</div>

              <div class="p-2">               
                <div class="d-flex justify-content-start titulo_area_descricao_empresarial">
                                        
                      <div className="area_evento_2_empresa"> 
                        <img src='/tour.png' style={{ width: '40px', height: '40px' }}/>                
                      </div>
                      <div className="area_servico_motorista"> 
                        Novos
                        <div className="area_evento_valor">{this.state.campEnvioConvite}</div>
                      </div>
                      <div className="area_servico_motorista"> 
                        Finalizados
                        <div className="area_evento_valor">{0}</div>
                      </div>
                      <div className="area_servico_motorista"> 
                        Ativos
                        <div className="area_evento_valor">{this.state.campTotal_viagens}</div>
                      </div>                     
                                
                  </div>  
              </div>  

        
            
          </div> 
      </div>    
    );
  }

  
}

export default Area_motorista_preferido;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));