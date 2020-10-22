import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Alert, Input } from 'reactstrap';
import { Tabs, Tab } from 'react-bootstrap';
import MaterialTable from 'material-table';

//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";
//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
var dateFormat = require('dateformat');

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//var dateFormat = require('dateformat');
//const baseUrl = "http://34.210.56.22:3333";

class listaeventosComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      eventoId: '',       
      campCpf: '',
      mensagem: '',
      color: 'light',
      campordem_servico: '',
      campnome_evento: '',
      campdata_evento: '',
      listServicos:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),
      id: localStorage.getItem('logid'),
      eventoId: localStorage.getItem('logeventoId')           
    });

    this.loadEventos();    

  }

  loadEventos(){
   // const url = baseUrl+"/cliente/list"
   let userId = this.props.match.params.id;  

   api.get(`/eventos/get/${userId}`)
    .then(res=>{
      if (res.data.success == true) {
        
        console.log(' Evento - '+ JSON.stringify(res.data, null, "    ") );
        const data = res.data.data      
        this.setState({
          campordem_servico: res.data.data[0].ordem_servico,
          campnome_evento: res.data.data[0].nome_evento,
          campdata_evento: res.data.data[0].data_evento,
        });   
        
        // this.setState({listEventos:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server"+error)
    })
  }
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  verificar_translados() {
   // if (this.li) 
      
   
  }

  verifica_menu() {

    if (this.state.perfil == 1) {
      return ( 
        <div>
            <Menu_administrador />                
         </div>   
       ); 
    } else if (this.state.perfil == 2) {
      return ( 
        <div>
            <Menu_cliente_individual />                
         </div>   
       ); 
    } else if (this.state.perfil == 7) {
      return ( 
        <div>
            <Menu_cliente_empresarial />                
         </div>   
       ); 
    } else if (this.state.perfil == null){
        return (
          <Menu />
        );
  
    }          
  }     

  verifica_titulo() {
    if ( this.state.perfil == 1) {
      return (            
        'ADMINISTRADOR' 
       ); 
    } else {
      return (      
        localStorage.getItem('lognome')
       ); 
    }            
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

          {this.verifica_menu()}
          <div className="titulo_lista">     
            <div className="unnamed-character-style-4 descricao_admministrador">      
            <table>
             <tr>
            <td colSpan="2" className="espaco_voltar">
                <a href={"/lista_evento/list"}><img src="/voltar@2x.png" width="22" height="32"/></a>
                </td> 
              <td> <div className="titulo_bemvindo">  {this.state.campnome_evento} </div>
              <div className="perfil">
              <a href="#">           
                  Editar Evento  
             </a>  
             </div>
            </td> </tr>
            </table>                      
              
            </div>      
           </div>

          <div className="titulo_admministrador">
          <div className="unnamed-character-style-4 descricao_admministrador">          
              
               <div class="p-2">    
                 <div class="d-flex justify-content-start">
                    <div class="p-2">                       
                       <i class="far fa-calendar fa-2x"></i>
                    </div>
                    <div class="p-2">
                        <div className="servico_titulo">Ordem Serviço</div>                        
                        <div className="servico_descricao">{this.state.campordem_servico}</div>                                                     
                    </div>   
                    <div class="p-2">
                       <div className="servico_titulo">Data Evento</div>       
                       <div className="servico_descricao">{dateFormat(this.state.campdata_evento,'dd/mm/yyyy')}</div>                             
                    </div>

                    <div className="p-2 icone_servico">                       
                    <img src='/tour.png' style={{ width: '32px', height: '32px', marginTop: '10px' }}/>   
                    </div>                   
                    
                    <div class="p-2">
                       <div className="servico_titulo">Total de Viagens</div>       
                       <div className="servico_descricao">0</div>                             
                    </div>
                    <div class="p-2 icone_servico">                       
                       <i class="fas fa-coins"></i> 
                        <div className="servico_descricao"></div>     
                    </div>                   
                    <div class="p-2">
                       <div className="servico_titulo">Valor Total</div>       
                       <div className="servico_descricao">R$ 0,00</div>                             
                    </div>
                </div>
              </div>               
          </div> 
        </div>
        <div className="container_modal_list">       
      <br/>         
       <Tabs 
           defaultActiveKey="ativos" id="uncontrolled-tab-example" className="tabs_titulo_lista">          
          <Tab eventKey="ativos" title="Serviços do Eventos">
          <div style={{ maxWidth: '100%',  maxHeight: '100%' }}>
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '#', width: '40px' },
                              { title: 'Ordem de Serviço', field: 'ordem_servico', width: '255px' },
                              { title: 'Nome do Evento', field: 'nome_evento', width: '350px' },
                              { title: 'Data do Evento', field: 'data_evento', width: '300px', render: rowData => dateFormat(rowData.data_evento, "UTC:dd/mm/yyyy") },                                                                                  
                              { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' },                              
                             },            
                            ]}
                            data={this.state.listEventos}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir',
                                addTooltip: 'Adicionar Valores Tarifários',
                                deleteTooltip: 'Deletar',
                                editTooltip: 'Editar',
                                editRow: {
                                   deleteText: 'Deseja realmente deletar esta linha ?',
                                   cancelTooltip: 'Cancelar',
                                   saveTooltip: 'Salvar',
                                }
                              },
                              toolbar: {
                                searchTooltip: 'Pesquisar',
                                searchPlaceholder: 'Buscar evento',        
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
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px" , color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_eventos_Ativos',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,     
                              maxBodyHeight: 530,    
                             // maxBodyHeight: 400,
                             // resizable: false,
                              //headerStyle: { position: 'sticky', top: 0 },
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 4,
                             // pageSize: 7,
                              pageSizeOptions: [0],                 
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                tooltip: 'editar',                                
                                onClick: (evt, data) => this.onEditar(data)
                              },
                              {
                                icon: 'delete',                                                             
                                tooltip: 'Deleta Evento',          
                                onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                              }
                              /*,
                              {
                                icon: 'add',                                                             
                                tooltip: 'Adiciona Eventos',
                                isFreeAction: true,
                                onClick: (event) => this.handleOpenModalInclusao()
                              } */
                            ]}
                            
                          />      
                </div>    
          </Tab>        
           
        </Tabs>       

        </div>
             <div className="botao_lista_incluir">
                        <Fab className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
                            <AddIcon/> <div className="botao_incluir"> Adicionar Serviços </div>
                        </Fab>
                      </div>    
     </div>   
    );
  }

  onIncluir() {
    this.props.history.push(`/servicos_evento/${localStorage.getItem('logid')}`);   
  }

  loadFillData(){

    return this.state.listServicos.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.ordem_servico}</td>
          <td>{data.nome_evento}</td>
          <td>{ dateFormat(data.data_evento, "dd/mm/yyyy")}</td>
          <td>
            <div style={{width:"250px"}}>                    
                <Link className="btn btn-outline-info" to={"/listporevento/"+this.state.eventoId}>Translados</Link>        
              {'   '}       
              <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Deletar </button>
            </div>            
          </td>          
        </tr>
      )
    })
  }

  onDelete(id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId){
    // url de backend
    //console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/eventos/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadlistEventos()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listaeventosComponent;
