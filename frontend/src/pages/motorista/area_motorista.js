import React  from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from 'material-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_motorista from '../motorista/menu_motorista';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import api from '../../services/api';
import { valorMask } from '../formatacao/valormask';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

var dateFormat = require('dateformat');
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');  
const id = localStorage.getItem('logid');   

class Area_motorista extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      nome: "",
      perfil:"",
      id: "",
      campTotal_viagens: '0',
      campvalor_total: '',
      totalEventos: '',
      isOpen: false
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),    
      nome: localStorage.getItem('lognome'),
      id: localStorage.getItem('logid'), 
      statusid: localStorage.getItem('statusid') 
    });
     //this.loadCliente()
    // this.loadlistEventos();
    //this.loadTotalServicosEvento();
     this.loadTotalViagensEventos();
     this.loadlistServicosAtivos();
  }
 
  loadlistServicosAtivos(){    
    api.get(`/motorista_servico/getMotoristaServico/${localStorage.getItem('logid')}`)
     .then(res=>{
       if (res.data.success == true) {       

         const data = res.data.data    
         this.setState({
           listaServicoAceito:data,
           loading: false,
          })
       }
     })
     .catch(error=>{
       alert("Error server loadlistServicos "+error)
     })
   }
   loadTotalViagensEventos(){
    // const url = baseUrl+"/cliente/list"   
    debugger;
    api.get(`/motorista_servico/totalServicosMotorista/${localStorage.getItem('logid')}`)
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
       alert("Error server 1 "+error)
     })
   }

  
verifica_menu() {    

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

verifica_mensagem() {
  if (localStorage.getItem('statusid') == 16) {
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
         <Menu_motorista />
         <div className="titulo_lista">        
           <div className="unnamed-character-style-4 descricao_admministrador">          
           <div className="titulo_bemvindo"> {this.verifica_menu()}, {this.verifica_horario()} ! </div>                                           
            </div>         
           
            {this.verifica_mensagem()}  

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
                         Total
                        <div className="area_evento_valor">{this.state.campTotal_viagens}</div>
                      </div>
                      <div className="area_servico_motorista"> 
                         Finalizados
                        <div className="area_evento_valor">{0}</div>
                      </div>
                      <div className="area_servico_motorista"> 
                         Ativos
                        <div className="area_evento_valor">{0}</div>
                      </div>                     
                                 
                  </div>  
              </div>  

<br/>
              
            
          </div> 
      </div>    
    );
  }

  
}

export default Area_motorista;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));