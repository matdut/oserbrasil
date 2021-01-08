import React  from 'react';
import ReactDOM from 'react-dom';

import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Menu_administrador from '../administrador/menu_administrador' ;
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { valorMask } from '../formatacao/valormask';
import { valorDoublemask } from '../formatacao/valorDoublemask';

class Area_administrador extends React.Component  {

  constructor(props){
    super(props);    
    this.state = {   
      totalEventos: 0,
      campvalor_total: '0,00',
      campTotal_viagens: 0,
      valor_faturamento: '0,00',
    }
  }

  componentDidMount(){
     //this.loadCliente()    
     this.loadlistEventos();
     this.loadTotalServicosEvento();
     this.loadTotalViagensEventos();    
  }

  loadTotalServicosEvento(){
    // const url = baseUrl+"/cliente/list"   
    //debugger;
    api.get(`/servicos/TotalTodosvalorServicoADM`)
     .then(res=>{
       if (res.data.success == true) {
         const data = res.data.data    
         
         console.log('valor  -'+data.toFixed(2));

         this.setState({
            campvalor_total: valorMask(data.toFixed(2)),
         });

         this.faturamento_oser();
       }
     })
     .catch(error=>{
       alert("Error server 1 "+error)
     })
   }

   loadTotalViagensEventos(){
    // const url = baseUrl+"/cliente/list"   
    debugger;
    api.get(`/servicos/totalviagensAdm`)
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
    
    api.get(`/eventos/totaleventosADM`)
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
  
  verifica_menu() {
    if (localStorage.getItem('logperfil') == 1) {
      return (            
           'Administrador'
       ); 
    }          
  }

  faturamento_oser() {
    debugger;
    const valor_faturamento = (parseFloat('0.192') * valorDoublemask(this.state.campvalor_total)).toFixed(2);

    this.setState({
      valor_faturamento: valorMask(valor_faturamento),
     })

  }

  render()
  {   
    return ( 
     <div> 
        <Menu_administrador />  
          <div className="titulo_lista">   
            <div>
              <div className="unnamed-character-style-4 descricao_admministrador">                                
                {this.verifica_menu()}, {this.verifica_horario()} !
              </div>             
              <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#white', height: '15vh' }} />
              </Container>

              <div className="titulo_area">NÚMEROS OSER</div>

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

export default Area_administrador;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));