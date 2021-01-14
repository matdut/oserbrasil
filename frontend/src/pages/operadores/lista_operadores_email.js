import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Alert, Input } from 'reactstrap';
//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";

import { Tabs, Tab } from 'react-bootstrap';
import MaterialTable from 'material-table';
//library sweetalert
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial' ;
import Menu_administrador from '../administrador/menu_administrador';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Data } from '@react-google-maps/api';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

//import { Alert } from 'reactstrap';
const nome = sessionStorage.getItem('lognome');  
const perfil = sessionStorage.getItem('logperfil');
const logid = sessionStorage.getItem('logid');

//const baseUrl = "http://34.210.56.22:3333";

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      inicio: 0,
      mensagem: '',
      color: 'light',
      listOperadores:[],
      listaStatus:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: sessionStorage.getItem('logperfil')    
    });
    this.loadOperadores();    
    this.carrega_status();  
  }

  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <option key={data.descricao} value={data.id}>{data.descricao} </option>
      )
    })     
  
   }
 
   carrega_status(){ 
   
    api.get('/status/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaStatus:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  loadOperadores(){
   // const url = baseUrl+"/cliente/list"
   api.get(`/emailOperador/list/`+sessionStorage.getItem('logid'))
    .then(res=>{
      if (res.data.success) {

        const data = res.data.data       
        this.setState({listOperadores:data})
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  render()
  {
    return (
      <div>    
           <div>
            <Menu_cliente_empresarial />  
            <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">        
                  <h5> {sessionStorage.getItem('lograzao_social')} </h5>                                           
                   <h3><strong>Lista de Cadastros Incompletos</strong></h3>
              </div>      
            </div>
          </div>          
        <div className="container_modal_list">              
        <br/>
    
    <Tabs 
       defaultActiveKey="ativos" id="uncontrolled-tab-example" className="tabs_titulo_lista">
      <Tab eventKey="ativos" title="Ativos">
          <div style={{ maxWidth: '95%' }}>    
                    <MaterialTable          
                        title=""
                        columns={[
                          { title: '', field: '#', width: '40px' },
                          { title: 'Status', field: 'status.descricao' },                         
                          { title: 'Email', field: 'email' },                          
                          { title: '', field: '#', width: '50px' },
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                        ]}
                        data={this.state.listOperadores}   
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir'
                          },
                          toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'buscar operadores',        
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
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportFileName: 'Relatorio_adm_empresa_excluidos',
                              search: true,     
                              exportAllData: true,                              
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 3,
                              pageSize: 7,
                              pageSizeOptions: [7],       
                        }}
                        actions={[
                          {             
                            icon: 'mail',
                            tooltip: 'Enviar',
                            onClick: (evt, data) => this.onSenha(data)
                          },
                          {
                            icon: 'delete',                                                             
                            tooltip: 'Deleta Operadores',                      
                            onClick: (data, event) => this.onDelete(data.email, data.id)
                          }
                        ]}
                      />      
            </div>      
      </Tab>       
      <Tab eventKey="excluidos" title="Excluidos">
          <div style={{ maxWidth: '95%' }}>    
                    <MaterialTable          
                        title=""
                        columns={[
                          { title: '', field: '#', width: '40px' },
                          { title: 'Status', field: 'status.descricao' },                         
                          { title: 'Email', field: 'email' },                          
                          { title: '', field: '#', width: '50px' },
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },                    
                        ]}
                        data={this.state.listOperadoresExcluidos}   
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir'
                          },
                          toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'buscar operadores',        
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
                          paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportFileName: 'Relatorio_adm_empresa_excluidos',
                              search: true,     
                              exportAllData: true,                              
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 7,
                              pageSize: 7,
                              pageSizeOptions: [7],       
                        }}
                        actions={[
                          {             
                            icon: 'edit',
                            tooltip: 'Editar',
                            onClick: (evt, data) => this.handleOpenModalEdit(data)
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
    
    return this.state.listOperadores.map((data, index)=>{     
      return(        
        <tr>
          <th>{index + 1}</th>                   
          <td>{data.email}</td>                    
          <td>{data.status.descricao}</td>
          <td>
            <div style={{width:"250px"}}>      
              <IconButton aria-label="email" onClick={()=>this.onSenha(data)}>
                <MailOutlineIcon />
              </IconButton>              
              {'   '}
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data.email, data.id)}>
                <DeleteIcon />
              </IconButton>    
            </div>            
          </td>          
        </tr>
      )
    })
  }
  
  statusChange(e, data){
    const datapost = {
      statusId: e.target.value     
    }    
    api.put(`/login/update/${data.id}`, datapost)
    
    api.put(`/operador/update/${data.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadOperadores();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
    })
  }
  
  onSenha(data) {
    
    //const senhaAleatoria = Math.random().toString(36).slice(-8);
    //url: `http://localhost:3000/operadores/${sessionStorage.getItem('logid')}`,        
    const params_email = {    
      email: data.email,                  
      url: `http://www.oser.app.br:21497/operadores_incluir/${data.id}/${data.email}`,        
      texto: `Sr(a), Operador(a) \n Seu link de acesso ao sistema è `, 
    }
    
    api.post("/email/send", params_email)    
   
    alert('Mensagem Enviada');

  }
  onDelete(data, id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(data, id)
      } 
    })
  }

  sendDelete(data, userId){  

    api.delete(`/login/delete/${data.email}`)    

    api.delete(`/operador/delete/${userId}`)
    .then(response =>{

      if (response.data.success) {       
        this.loadOperadores()

      } 
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
