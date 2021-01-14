import React  from 'react';
import ReactDOM from 'react-dom';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial' ;
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { valorMask } from '../formatacao/valormask';
//import { cnpjMask } from '../../formatacao/cnpjmask';

var dateFormat = require('dateformat');

class Area_cliente extends React.Component  {
  constructor(props){
    super(props);    
    this.state = {   
      totalEventos: 0,
      campvalor_total: '0,00',
      campTotal_viagens: 0,
    }
  }

  componentDidMount(){
  //  this.busca_empresa();
    this.loadlistEventos();
    this.loadTotalServicosEvento();
    this.loadTotalViagensEventos();
     //this.loadCliente()

         
  }

  loadTotalServicosEvento(){
    // const url = baseUrl+"/cliente/list"   
    //debugger;
    api.get(`/servicos/valorServicoTodosEventos/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
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
    api.get(`/servicos/totalViagensEventos/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
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
    
    api.get(`/eventos/totaleventos/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
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
    
  verifica_titulo() {    

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
  
  render()
  {   
    return ( 
     <div> 
        <Menu_cliente_empresarial />  
        <div className="titulo_lista">        
           <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo"> {this.verifica_titulo()}, {this.verifica_horario()} ! </div>
              <div className="titulo_empresa"> {sessionStorage.getItem('lograzao_social')} </div>                                            
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