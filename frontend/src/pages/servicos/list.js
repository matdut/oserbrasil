import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import { Button, Form, Label, Input, FormText } from 'reactstrap';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
//import Button from '@material-ui/core/Button';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';
//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const EventoId = localStorage.getItem('logidEvento');
var dateFormat = require('dateformat');

//const baseUrl = "http://34.210.56.22:3333";

class listTransladosComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      campcliente_cnpj: '', 
      campcliente_nome: '', 
      campordem_servico: '', 
      campnome_evento: '', 
      campdata_evento: '', 
      camptipotransporteId: '', 
      campDeletarId: '',
      campvalor_total: '',
      campTipo_cliente: '',
      listTranslados:[],
      listTipoTransporte:[],
      evento_selecionado: '',
      campnometransporte: ''
    }
    this.handleDateChange = this.handleDateChange.bind(this);   
    
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),         
    });
    
    localStorage.setItem('logidEvento', this.props.match.params.id);    
   // console.log(JSON.stringify(eventoId, null, "    ")); 
    this.loadtranslados();    
    this.handleDateChange();    

    let eventoId = localStorage.getItem('logidEvento');    
    
      //let id = this.props.match.params.id;
   // let userId = this.props.match.params.id;        
        api.get(`/eventos/get/${eventoId}`)
        .then(res=>{
            //console.log(JSON.stringify(res.data.data, null, "    ")); 
            if (res.data.success) {
              const data = res.data.data[0]              
              //console.log(JSON.stringify(data, null, "    ")); 
              this.setState({          
                dataEvento:data,                
              //  campcliente_cnpj: data.cnpj || data.cpf, 
               // campcliente_nome: data.nome, 
                campordem_servico: data.ordem_servico, 
                campnome_evento: data.nome_evento, 
                campdata_evento: dateFormat(data.data_evento, "UTC:dd/mm/yyyy"), 
               // camptipoTransporteId: data.tipoTransporteId, 
                campvalor_total: data.valor_total
              })                       
            //  this.load_tipotransporte();
            }
            else {
              alert("Erro de conexão com o banco de dados")
            }
          })
          .catch(error=>{
            alert("Error server"+error)
          })

  }

  
  handleDateChange(date) {
    //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
    this.setState({ campdata_evento: date });
  }
  loadtranslados(){
   // const url = baseUrl+"/cliente/list"

   let id = this.props.match.params.id;

   api.get(`/translado/listporevento/${id}`)
    .then(res=>{  
      if (res.data) {
        const data = res.data.data
        //console.log(JSON.stringify(data, null, "    ")); 
        this.setState({listTranslados:data})
        //console.log(JSON.stringify(data, null, "    ")); 
        //console.log(JSON.stringify(this.state.listTranslados, null, "    ")); 
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
  
  
  load_tipotransporte() {
  // console.log('tipo '+this.state.camptipoTransporteId);

    api.get(`/tipoTransporte/get/${this.state.camptipoTransporteId}`)
    .then(res=>{
        if (res.data.success) {
          const data = res.data.data[0]              
         
          this.setState({          
            campnometransporte: data.descricao
          })          
        
        }
        else {
          alert("Erro de conexão com o banco de dados")
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      })  

  }
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  
  voltarlistaClick = () => {
  
    this.props.history.push(`/listaeventocliente/${localStorage.getItem('logid')}`); 
  
  }

  verifica_menu() {

    if (localStorage.getItem('logperfil') == 1) {
      return ( 
        <div>
            <Menu_administrador />                
         </div>   
       ); 
    } else if (localStorage.getItem('logperfil') == 2) {
      return ( 
        <div>
            <Menu_cliente_individual />                
         </div>   
       ); 
    } else if (localStorage.getItem('logperfil') == 7) {
      return ( 
        <div>
            <Menu_cliente_empresarial />                
         </div>   
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
                <div className="titulo_bemvindo"> {this.verifica_titulo()}, {this.verifica_horario()} ! </div>
                <div className="titulo_empresa"> {localStorage.getItem('lograzao_social')} </div>                

                <h3><strong>Lista de Serviços</strong></h3>
              </div>      
          </div>
          <br/>        
        <div className="container_modal_list">       
         <br/>   
         <Tabs 
           defaultActiveKey="ativos" id="uncontrolled-tab-example" className="tabs_titulo_lista">          
          <Tab eventKey="ativos" title="Eventos Ativos">
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
          <Tab eventKey="finalizados" title="Histórico de Eventos">
          <div style={{ maxWidth: '100%',  maxHeight: '100%' }}>
                        <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '#', width: '40px' },
                              { title: 'Ordem de Serviço', field: 'ordem_servico', width: '255px' },
                              { title: 'Nome do Evento', field: 'nome_evento', width: '350px' },
                              { title: 'Data do Evento', field: 'data_evento', width: '300px', render: rowData => dateFormat(rowData.data_evento, "UTC:dd/mm/yyyy") },                                                                                  
                              { title: '', field: '#', width: '50px' },
                              { title: '', field: '', align: 'left', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                            ]}
                            data={this.state.listClienteExcluidos}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir',
                                addTooltip: 'Add',
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
                              exportFileName: 'Rel_adm_eventos_finalizados',
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
                                tooltip: 'Editar',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                            ]}
                          />      
                </div>      
          </Tab>          
        </Tabs>   
            
                
                   
      </div>
     </div>         
    );
  }

  loadFillData(){     

    return this.state.listTranslados.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.nome_passageiro}</td>
          <td>{data.local_embarque}</td>
          <td>{dateFormat(data.data_inicial, "dd/mm/yyyy")}</td>
          <td>{data.hora_inicial}</td>
          <td>
            <div style={{width:"150px"}}>
              <Link className="btn btn-outline-info" to={"/transladoseditar/"+data.id}>Editar</Link>
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

  handleOpenModalDelete(data) { 
    this.setState({ 
      showMensagemDelete: true,
      campDeletarId: data.id,
      retorno: '',
      campDescricao: '',
      validacao_descricao: false,
    });  

    console.log('resultado '+JSON.stringify(data.id, null, "    ")); 
    //console.log('modal id - '+data.id)  
     
    
  }
  
  handleCloseModalDelete() {
    this.setState({ 
      showMensagemDelete: false
    });   
  }

  sendDelete(userId){
    // url de backend
    //console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/translados/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadtranslados()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listTransladosComponent;
