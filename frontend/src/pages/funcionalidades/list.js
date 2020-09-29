import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';

import { Alert, Input, FormFeedback } from 'reactstrap';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';

import MaterialTable from 'material-table';

import ReactModal from 'react-modal';

import { Tabs, Tab } from 'react-bootstrap';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
import { Container } from '@material-ui/core';
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  

const customStyles = {
  overlay: {
    backgroundColor: 'papayawhip',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '0px',
    left                   : '66%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100%',    
    width                  : '560px',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};


/*
let columns = [
  { title: 'Name', field: 'name' },
  { title: 'Surname', field: 'surname' },
  { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
  { title: 'Birth Place', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' }, 
  },
];

let data = [
  { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
  { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  { name: 'Zerya Gsadsad', surname: 'Boar', birthYear: 2015, birthCity: 63 },
  { name: 'Tderya Hdül', surname: 'Caret', birthYear: 2016, birthCity: 34 },
  { name: 'Gda Betül', surname: 'Agatha', birthYear: 2014, birthCity: 34 },
];
*/
class funcionalidadesComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      color: 'light',
      listFuncionalidade:[],
      listaPerfil: [],
      validate: {
        descricaoState: '',
        perfilIdState: ''
      }    
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });

    if (localStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else {
       this.loadPerfil();
       this.loadfuncionalidades();      
    }   
  }

  loadPerfil(){  
    //const baseUrl = "http://34.210.56.22:3333"
    //const url = baseUrl+"/seguradora/list"
    api.get('/perfil/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaPerfil:data})
      }
      else {
        alert("Erro de conexão loadPerfilData")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  handleOpenModal(data) {
    this.setState({ 
      showModal: true,        
      incluir: false,  
      mensagem_aguarde: '',
    });    
    localStorage.setItem('logeditid', data.id);     
    console.log('buscar_cliente ');
    //this.busca_cliente();   

    if (localStorage.getItem('logperfil') == 1) {
      this.setState({ 
        camp_cpf_disabled: true,
        camp_nome_disabled: true,
        camp_datanasc_disabled: false,
        camp_email_disabled: true,
        camp_telefone_disabled: false,
      });
    }

   // this.prepareSave();
  }  
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,  
      campStatusId: 0,  
    });
    localStorage.setItem('logeditid', '');
    
    //this.loadMotoristaExcluidos();
   // this.loadMotorista();     
  //  this.carrega_status();  
    
  }

  loadPerfilData(){
  
    return this.state.listaPerfil.map((data)=>{          
      return(
        <option key={data.nome} value={data.id}>{data.nome} </option>
      )
    })     
  
   }

  loadfuncionalidades(){
   // const url = baseUrl+"/motorista/list"
   api.get(`/funcionalidade/list`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listFuncionalidade:data})
      }
      else {
        alert("Erro de conexão")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
 
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }  

  verifica_botao(inicio) {
    const { validate } = this.state   

     if (inicio == 1) {
  
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar Alterações </label>
                </div>     
          </Box>           
      );   
       
      } else {

        if (validate.descricaoState == 'has-success') { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSave()}>
                      <div className="d-flex justify-content-center">
                      <label> Salvar Alterações </label>
                      </div>     
                </Box>           
            );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                    </div>     
              </Box>           
          );   
        }   

      } 
} 
  render()
  {
    return (
      <div>               
          <Menu_administrador />  
          <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                 <h3><strong>Lista de Funcionalidades</strong></h3>
              </div>      
            </div>
      <div className="container_modal_list">                                         
          <div style={{ maxWidth: '95%' }}>    
               <MaterialTable          
                            title=""
                            columns={[
                              { title: '', field: '#', width: '40px' },
                              { title: 'Perfil', field: 'perfil.nome' },
                              { title: 'Descrição', field: 'descricao' },    
                              { title: '', field: '#', width: '50px' },                          
                              { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                            ]}
                            data={this.state.listFuncionalidade}   
                            localization={{
                              body: {
                                emptyDataSourceMessage: 'Nenhum registro para exibir'
                              },
                              toolbar: {
                                searchTooltip: 'Pesquisar',
                                searchPlaceholder: 'Buscar funcionalidade',        
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
                                actions: 'Ações',
                              },
                            }}        
                            options={{
                              rowStyle: { backgroundColor: "#fff", fontFamily: "Effra" },
                              searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px" , color: "#0F074E"  },
                              paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportAllData: true,
                              exportFileName: 'Rel_adm_valores_tarifarios',
                              search: true,     
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',    
                                /*exportButton: true, */            
                              exportButton: { pdf: true },      
                              actionsColumnIndex: 4,
                              pageSize: 7,
                              pageSizeOptions: [7]  
                            }}
                            actions={[
                              {             
                                icon: 'edit',
                                onClick: (evt, data) => this.handleOpenModal(data)
                              }
                            ]}
                          />      
                </div>      
                <ReactModal 
                    isOpen={this.state.showModal}
                    style={customStyles}
                    contentLabel="Inline Styles Modal Example"                                  
                    ><div className="editar_titulo_inclusao"> Tipos de Veiculos
                        <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()} className="botao_close_modal_operador">
                          <CloseOutlinedIcon />
                        </IconButton></div>       
                        <div className="container_alterado">
                          <div className="d-flex justify-content">        
                            <div>  
                            <div class="d-flex flex-column espacamento_caixa_texto">
                                <div class="p-2">  
                                  <label for="inputAddress">Perfil *</label>
                                    <Input                  
                                        type="select" 
                                        name="select" 
                                        className="perfil_select"
                                        id="exampleSelect" 
                                        value={this.state.campPerfilId}
                                        valid={ this.state.validate.perfilIdState === 'has-success' }
                                        invalid={ this.state.validate.perfilIdState === 'has-danger' }                   
                                        onChange={ (e) => {
                                          this.perfilchange(e)                                             
                                        }}                                                          >
                                        <option selected>Selecione o perfil</option>               
                                        {this.loadPerfilData()}      
                                    </Input>
                                  </div> 
                                  <div class="p-2"> 
                                      <label for="inputPassword4">Descrição *</label>
                                        <Input 
                                            disabled={this.state.camp_cpf_disabled}
                                            className="input_text_cliente"                        
                                            type="text"
                                            name="cpf"
                                            id="examplcpf"
                                            autoComplete='off'
                                            autoCorrect='off'
                                          //ref={cepInput} 
                                            placeholder=""
                                            value={this.state.campDescricao}
                                            valid={ this.state.validate.descricaoState === 'has-success' }
                                            invalid={ this.state.validate.descricaoState === 'has-danger' }
                                            onBlur={this.descricaofocus}
                                            onKeyUp={this.verificaDescricao}
                                            onFocus={this.verificaDescricao}
                                            onChange={ (e) => {
                                              this.descricaochange(e)                                                 
                                              this.validateDescricaoChange(e)
                                            }}         
                                            maxlength="104"                                                                 
                                          />                                
                                          <FormFeedback 
                                          invalid={this.state.validate.descricaoState}>
                                              {this.state.mensagem_descricao}
                                          </FormFeedback> 
                                  </div>              
                                </div>    
                        {this.verifica_botao(this.state.inicio)}     
                            </div>
                          </div>        
                        </div>
                </ReactModal>       

       {  
       // <div className="botao_lista_incluir">
       //   <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
       //       <AddIcon/> Incluir Funcionalidades
        //  </Fab>
      // </div>
      }
     </div>
      </div>   
    );
  }

  handleOpenModal(data) { 
    this.setState({ 
      showModal: true
    });  
    localStorage.setItem('logmatrizId', data.id);    
     
    this.loadTipoTransporte();
    this.carrega_matriz();


  }
  
  handleCloseModal() {
    this.setState({ 
      showModal: false
    });
  
    this.loadMatriz();

  }


  onIncluir() {
    this.props.history.push(`/funcionalidade/cadastrar`);   
  }

  statusChange(e, data){
    const datapost = {
      statusId: e.target.value     
    }    
    api.put(`/login/update/${data.id}`, datapost)
    
    api.put(`/motorista/update/${data.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadfuncionalidades();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
    })
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(data, userId){ 
    console.log('perfil -  '+data.perfil.id);    
    api.delete(`/funcionalidade/delete/${userId}/${data.perfil.id}`)
    .then(response =>{
      if (response.data.success) {      
        this.loadfuncionalidades()
        this.loadFillData()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  
  }

}

export default funcionalidadesComponent;
