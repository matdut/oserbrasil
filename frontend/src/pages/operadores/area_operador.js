import React  from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_operador from '../operadores/menu_operador' ;
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import api from '../../services/api';
import { valorMask } from '../formatacao/valormask';

const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');  
const id = localStorage.getItem('logid');   

class Area_operador extends React.Component  {
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
     //this.loadCliente()
     this.setState({
      perfil: localStorage.getItem('logperfil'),    
      nome: localStorage.getItem('lognome'),
      id: localStorage.getItem('logid') 
    });
     //this.loadCliente()
     this.loadlistEventos();
     this.loadTotalServicosEvento();
     this.loadTotalViagensEventos();
  }

  loadTotalServicosEvento(){
    // const url = baseUrl+"/cliente/list"   
    //debugger;
    api.get(`/servicos/valorServicoTodosEventos/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success == true) {
         const data = res.data.data    
         
         //console.log('valor  -'+data.toFixed(2));

         this.setState({
            campvalor_total: valorMask(data.toFixed(2)),
         })
       }
     })
     .catch(error=>{
       alert("Error server 1 "+error)
     })
   }

   loadTotalViagensEventos(){
    // const url = baseUrl+"/cliente/list"   
    debugger;
    api.get(`/servicos/totalViagensEventos/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
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

  loadlistEventos(){
    // const url = baseUrl+"/cliente/list"   
    
    api.get(`/eventos/totaleventos/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
     .then(res=>{
       if (res.data.success) {
         const data = res.data.data    
         this.setState({totalEventos:data.count})
       }
     })
     .catch(error=>{
       alert("Error server "+error)
     })
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
        <Menu_operador />  
        <div className="titulo_admministrador">    
            <div className="unnamed-character-style-4 descricao_admministrador">                                                             
            <div className="titulo_bemvindo"> {this.verifica_menu()}, {this.verifica_horario()} ! </div>      
            </div>          
           
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '15vh' }} />
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
                          <div className="area_evento_valor">R$ {this.state.campvalor_total}</div>
                      </div>                     
                  </div>  
              </div>  
          </div> 
      </div>    
    );
  }

  
}

export default Area_operador;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));