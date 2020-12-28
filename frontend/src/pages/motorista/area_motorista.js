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
      campTotal_viagens: '',
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

<br/>
              <MaterialTable          
                            title=""
                            isLoading={this.state.loading}
                           
                            columns={[
                              { title: '', field: '', width: '55px', minWidth: '55px', maxWidth: '55px' }, 
                              { title: 'Dt Serviço', field: 'data_servico', width: '90px', minWidth: '90px', maxWidth: '90px', render: rowData => dateFormat(rowData.data_servico, "UTC:dd/mm/yyyy") },
                              { title: 'Hr Serviço', field: 'hora_inicial', width: '60px', minWidth: '60px', maxWidth: '60px',  render: rowData => rowData.hora_inicial.substring(0,5) },       
                    
                              { title: '', field: 'tipoEventoId', width: '50px', minWidth: '50px', maxWidth: '50px', align:"center", 
                            cellStyle:{ fontSize: 10}, render: rowData => rowData.servico_pai_id == 0 ? rowData.tipoEventoId == 1 ? <div style={{fontSize: 10}}>{rowData.quantidade_diarias}</div> : '' : ''},                 
                              { title: '', field: 'tipoEventoId', width: '50px', minWidth: '50px', maxWidth: '50px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.tipoEventoId == 1 ? 
                              <div style={{fontSize: 10, backgroundColor: '#FF964F', color: '#FDFDFE', borderRadius: '50px' }}>Diária</div> : <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '50px' }}>Translado</div> },                              
                               
                              { title: 'Nome do Passageiro', field: 'nome_passageiro', width: '220px', minWidth: '220px', maxWidth: '220px',  render: rowData => rowData.nome_passageiro.substring(0,30)  },
                              { title: 'Passageiros', field: 'quantidade_passageiro', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },     
                              { title: 'Origem', field: 'origem', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },     
                              { title: 'Destino', field: 'destino', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },     
                              { title: '', field: 'motorista_bilingue', width: '45px', minWidth: '45px', maxWidth: '45px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_bilingue == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px' }}>Bilingue</div> : "" },   
                              { title: '', field: 'motorista_receptivo', width: '45px', minWidth: '45px', maxWidth: '45px', align:"center", 
                              cellStyle:{ fontSize: 10}, render: rowData => rowData.motorista_receptivo == true ? <div style={{fontSize: 10, backgroundColor: '#DCDCDC', borderRadius: '30px'}}>Receptivo</div> : "" },       
                              { title: 'Número Voo', field: 'origem', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },     
                              { title: 'Companhia Aerea', field: 'destino', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },   
                              { title: 'cronometro', field: 'origem', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },  
                              { title: 'botao cancelar', field: 'origem', width: '60px', minWidth: '60px', maxWidth: '60px', align: 'center' },  
                        
                              { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' },                              
                             },            
                            ]}
                            data={this.state.listMotorista}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                              },
                              toolbar: {
                                searchTooltip: 'Pesquisar',
                                searchPlaceholder: 'Buscar motorista',        
                              },
                              pagination: {
                                labelRowsSelect: 'linhas',
                                labelDisplayedRows: '{count} de {from}-{to}',
                                firstTooltip: 'Primeira página',
                                previousTooltip: 'Página anterior',
                                nextTooltip: 'Próxima página',
                                lastTooltip: 'Última página'
                              },
                              header: {
                                actions: 'Ação',
                              },
                            }}        
                            options={{
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px" , color: "#0F074E"  },
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_motorista_ativos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,          
                              maxBodyHeight: '60vh',
                              minBodyHeight: '60vh',    
                              padding: 'dense',   
                              overflowY: 'scroll',
                             // tableLayout: 'fixed',
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 7,
                             // pageSize: 9,
                              pageSizeOptions: [0],      
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                              /*,
                              {
                                icon: 'add',                                                             
                                tooltip: 'Adiciona Motorista',
                                isFreeAction: true,
                                onClick: (event) => this.handleOpenModalEnvio()
                               //onClick: (event) => this.sendteste()
                              } */
                            ]}
                          />      
            
          </div> 
      </div>    
    );
  }

  
}

export default Area_motorista;
ReactDOM.unmountComponentAtNode(document.getElementById('root'));