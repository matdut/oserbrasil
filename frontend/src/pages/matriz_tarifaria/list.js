import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';
import { Alert, Input, FormFeedback } from 'reactstrap';
import { Link } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';
import { visualizarmask } from '../formatacao/visualizarmask';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { valorMask } from '../formatacao/valormask';

import MaterialTable from 'material-table';
import ReactModal from 'react-modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Data } from '@react-google-maps/api';
import { Tabs, Tab } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';
import Menu_matriz from '../matriz_tarifaria/menu_matriz';

//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const EventoId = localStorage.getItem('logidEvento');
var dateFormat = require('dateformat');

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

class listaMatrizComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      descricao: '',
      mensagem: '',
      color: 'light',
      campfaixa_inicial: '',    
      campfaixa_final: '',    
      campvalor_km: '',    
      campvalor_tempo: '',      
      campbandeira: '',    
      campreceptivo: '',    
      campbilingue: '',    
      camppedagio: '',     
      erro_faixa_1: false,
      erro_faixa_2: false,
      erro_tipo: false,
      erro_bandeira: false,
      erro_bilingue: false,
      erro_valorkm: false,
      erro_receptivo: false,
      erro_valortempo: false,
      listTipoTransporte: [],       
      //listaMatriz: [], 
      inicio: 1,
      mensagem_tipoId: '',            
      mensagem_faixa_inicial: '',            
      mensagem_faixa_final: '',            
      mensagem_valor_km: '',            
      mensagem_valor_tempo: '',              
      mensagem_bandeira: '',            
      mensagem_receptivo: '',            
      mensagem_bilingue: '',            
      mensagem_pedagio: '',      
      listaMatriz:[],
      validate: {
        tipoIdState: '',
        faixa_inicialState: '',
        faixa_finalState: '',
        valor_kmState: '',
        valor_tempoState: '',
        bandeiraState: '',
        receptivoState: '',
        bilingueState: '',
        pedagioState: '',     
      }    
      
    }   
    
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),         
    });     
       
    this.loadMatriz();
  }

  handleOpenModal () {
    this.setState({ 
      showModal: true    
    });
  
   // this.prepareSave();
  }
  
  handleCloseModal () {
    this.setState({ 
      showModal: false,
      incluir: false 
    });
  }

  loadFillData(){  
  
    return this.state.listTipoTransporte.map((data)=>{          
      return(
         <MenuItem value={data.id}>{data.descricao}</MenuItem>      
      )
    })
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
  handleDateChange(date) {
    //const searchDate = MomentUtils(date).format("yyyy-MM-DD");
    this.setState({ campdata_evento: date });
  }

  busca_veiculo(veiculo){   
 
    api.get(`/tipoTransporte/get/${veiculo}`)
     .then(res=>{  
    //  console.log(JSON.stringify(res.data.data[0].descricao, null, "    ")); 
      let tipo = res.data.data[0].descricao
         return (
              tipo 
         );       
  
     })
     .catch(error=>{
       alert("Error server "+error)
     })
   }

  loadMatriz(){
  
   api.get("/matriz/list")
    .then(res=>{  
      if (res.data.success) {
        const data = res.data.data        
        this.setState({listaMatriz:data})
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
 
 
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
  
  voltarlistaClick = () => {
  
   // this.props.history.push(`/listaeventocliente/${localStorage.getItem('logid')}`); 
  
  }

 
 
  render()
  {
    return (
      <div>    
             <Menu_administrador />  
             <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                 <h3><strong>Valores Tarifários</strong></h3>
              </div>      
            </div>
      <div className="container_modal_list">                                         
            <br/>          
          <Tabs 
           defaultActiveKey="ativos" id="uncontrolled-tab-example" className="tabs_titulo_lista">
          <Tab eventKey="ativos" title="Valores Tarifários">             
            <div style={{ maxWidth: '95%'}}>    
                    <MaterialTable          
                        title=""
                        columns={[
                          { title: '', field: '#', width: '40px' },
                          { title: 'Transporte', field: 'tipo_transporte.descricao', width: '350px' },
                          { title: 'Faixa Inicial', field: 'faixa_inicial', width: '110px' },
                          { title: 'Faixa Final', field: 'faixa_final', width: '100px' },
                          { title: 'Valor KM (R$)', field: 'valor_km', width: '150px' },
                          { title: 'Valor Tempo (R$)', field: 'valor_tempo', width: '150px'},      
                          { title: 'Valor Bandeira (R$)', field: 'bandeira', width: '150px' },                          
                          { title: 'Valor Receptivo (R$)', field: 'bilingue', width: '150px'},
                          { title: 'Valor Bilingue (%)', field: 'receptivo', width: '150px'},            
                          { title: '', field: '#', width: '50px' },                       
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                        ]}
                        data={this.state.listaMatriz}     
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
                            searchPlaceholder: 'buscar tarifario',        
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
                          actionsColumnIndex: 9,
                          pageSize: 7,
                          pageSizeOptions: [7],      
                        }}                        
                        actions={[
                          {             
                            icon: 'edit',
                            onClick: (evt, data) => this.handleOpenModal(data)
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
            <Tab eventKey="especiais" title="Valores Tarifários Especiais">             
            <div style={{ maxWidth: '95%'}}>    
                    <MaterialTable          
                        title=""
                        columns={[
                          { title: '', field: '#', width: '40px' },
                          { title: 'Transporte', field: 'tipo_transporte.descricao', width: '350px' },
                          { title: 'Faixa Inicial', field: 'faixa_inicial', width: '110px' },
                          { title: 'Faixa Final', field: 'faixa_final', width: '100px' },
                          { title: 'Valor KM (R$)', field: 'valor_km', width: '150px' },
                          { title: 'Valor Tempo (R$)', field: 'valor_tempo', width: '150px'},      
                          { title: 'Valor Bandeira (R$)', field: 'bandeira', width: '150px' },                          
                          { title: 'Valor Receptivo (R$)', field: 'bilingue', width: '150px'},
                          { title: 'Valor Bilingue (%)', field: 'receptivo', width: '150px'},  
                          { title: '', field: '#', width: '50px' },                       
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                        ]}
                        data={this.state.listaMatriz}     
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir'
                          },
                          toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'buscar tarifario',        
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
                          exportFileName: 'Rel_adm_cliente_excluidos',
                          search: true,     
                          searchFieldVariant: 'outlined', 
                          toolbarButtonAlignment: 'right',           
                          /*exportButton: true, */            
                          exportButton: { pdf: true },          
                          actionsColumnIndex: 9,
                          pageSize: 7,
                          pageSizeOptions: [7],    
                        }}
                        actions={[
                          {             
                            icon: 'add',
                            onClick: (evt, data) => this.handleOpenModal(data)
                          }
                        ]}
                      />      
             </div>      
            </Tab>

           </Tabs>  

      <ReactModal 
        isOpen={this.state.showModal}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Editar Valores Tarifários
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModal()} className="botao_close_modal_operador">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">
                      <div class="p-2"> 
                      <FormControl variant="outlined" className="select_matriz_tipo">
                        <InputLabel id="demo-simple-select-outlined-label">Tipo Transporte</InputLabel>
                        <Select
                          error={this.state.erro_tipo} 
                          helperText={this.state.mensagem_tipoId}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.camptipoId}
                          onFocus={this.verificaTipo_veiculo}
                          //onClick={this.verificaTipo_veiculo}
                          onChange={ (e) => {
                            this.tipoChange(e)
                          }}    
                          label="Tipo Transporte"
                        >
                          {this.loadFillData()}                    
                        </Select>
                      </FormControl>                                                                    
                      </div>              
                      <div class="p-2">               
                          <div class="d-flex justify-content-start">
                              <div> 
                              <TextField 
                              className="input_matriz_faixa_ini"
                              error={this.state.erro_faixa_2} 
                              helperText={this.state.mensagem_faixa_final}
                              id="outlined-basic" 
                              label="Faixa Final *" 
                              variant="outlined"
                              value={this.state.campfaixa_inicial}
                              valid={this.state.validate.faixa_inicialState === 'has-success' }
                              invalid={this.state.validate.faixa_inicialState === 'has-danger' }
                              onBlur={this.verificafaixa_inicial}
                              onChange={ (e) => {
                                this.faixa_inicialchange(e)                                         
                              }}    
                                maxlength="6"
                              />                                                                
                                  <FormFeedback className="label_complemento"     
                                  invalid={this.state.validate.faixa_inicialState}>
                                      {this.state.mensagem_faixa_inicial}
                                  </FormFeedback>                                           
                              </div> 
                              
                              <div>
                              <TextField 
                              className="input_matriz_faixa_fim"
                              error={this.state.erro_faixa_2} 
                              helperText={this.state.mensagem_faixa_final}
                              id="outlined-basic" 
                              label="Faixa Final *" 
                              variant="outlined"
                              value={this.state.campfaixa_final}                    
                                    onFocus={this.verificafaixa_final}
                                    onKeyUp={this.verificafaixa_final}
                                    onChange={ (e) => {
                                      this.faixa_finalchange(e)
                                    }}          
                                    maxlength="60"
                              />                                                                
                                  <FormFeedback className="label_complemento"     
                                  invalid={this.state.validate.faixa_finalState}>
                                      {this.state.mensagem_faixa_final}
                                  </FormFeedback>       
                              </div>                        
                          </div>
                      </div> 
                      <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>                                                
                                  <FormControl className="input_matriz_valor_km" variant="outlined">
                                  <InputLabel htmlFor="standard-adornment-amount">Valor KM </InputLabel>
                                  <OutlinedInput
                                    id="standard-adornment-amount"  
                                    error={this.state.erro_valorkm} 
                                    helperText={this.state.mensagem_valor_km}                          
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campvalor_km}
                                    valid={ this.state.validate.valor_kmState === 'has-success' }
                                    invalid={ this.state.validate.valor_kmState === 'has-danger' }
                                    onFocus={this.verificavalor_km}
                                    onKeyUp={this.verificavalor_km}
                                    onChange={(e) => {
                                      this.valor_kmchange(e)
                                    }}    
                                    maxlength="75"
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    labelWidth={80}
                                  />
                                </FormControl>                           
                                  <FormFeedback 
                                  invalid={this.state.validate.valor_kmState}>
                                      {this.state.mensagem_valor_km}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_faixa_fim" variant="outlined">
                                  <InputLabel htmlFor="standard-adornment-amount">Valor Tempo</InputLabel>
                                  <OutlinedInput
                                    id="standard-adornment-amount"
                                    error={this.state.erro_valortempo} 
                                    helperText={this.state.mensagem_valor_tempo}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'                           
                                    value={this.state.campvalor_tempo}
                                    valid={ this.state.validate.valor_tempoState === 'has-success' }
                                    invalid={ this.state.validate.valor_tempoState === 'has-danger' }
                                    onFocus={this.verificavalor_tempo}
                                    onKeyUp={this.verificavalor_tempo}
                                    onChange={ (e) => {
                                      this.valor_tempochange(e)                                                
                                    }}            
                                    maxlength="50"         
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    labelWidth={110}
                                  />
                                </FormControl>                       
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.valor_tempoState}>
                                  {this.state.mensagem_valor_tempo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>      
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_valor_km" variant="outlined">
                                  <InputLabel htmlFor="standard-adornment-amount">Valor da Bandeira</InputLabel>
                                  <OutlinedInput
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bandeira} 
                                    helperText={this.state.mensagem_bandeira}   
                                    placeholder=""                            
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbandeira}
                                    valid={ this.state.validate.bandeiraState === 'has-success' }
                                    invalid={ this.state.validate.bandeiraState === 'has-danger' }
                                    onFocus={this.verificabandeira}
                                    onKeyUp={this.verificabandeira}
                                    onChange={(e) => {
                                      this.bandeirachange(e)
                                    }}                                                                          
                                    maxlength="75"         
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    labelWidth={160}
                                  />
                                </FormControl>                                                                          
                                  <FormFeedback 
                                  invalid={this.state.validate.bandeiraState}>
                                      {this.state.mensagem_bandeira}
                                  </FormFeedback>     
                              </div>
                            <div>
                            <FormControl className="input_matriz_faixa_fim" variant="outlined">
                                  <InputLabel htmlFor="standard-adornment-amount">Valor Receptivo</InputLabel>
                                  <OutlinedInput
                                    id="standard-adornment-amount"
                                    error={this.state.erro_receptivo} 
                                    helperText={this.state.mensagem_receptivo}   
                                    placeholder=""                                                      
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campreceptivo}
                                    valid={ this.state.validate.receptivoState === 'has-success' }
                                    invalid={ this.state.validate.receptivoState === 'has-danger' }
                                    onFocus={this.verificareceptivo}
                                    onKeyUp={this.verificareceptivo}
                                    onChange={ (e) => {
                                      this.receptivochange(e)                                                
                                    }}            
                                    maxlength="50"          
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    labelWidth={140}
                                  />
                                </FormControl>                                 
                              <FormFeedback className="label_cidade"
                              invalid={this.state.validate.receptivoState}>
                                  {this.state.mensagem_receptivo}
                              </FormFeedback>  
                            </div>                                        
                      </div>    
                    </div>  
                    <div class="p-2">    
                        <div class="d-flex justify-content-start">
                              <div>
                              <FormControl className="input_matriz_valor_km" variant="outlined">
                                  <InputLabel htmlFor="standard-adornment-amount">Valor bilingue</InputLabel>
                                  <OutlinedInput
                                    id="standard-adornment-amount"
                                    error={this.state.erro_bilingue} 
                                    helperText={this.state.mensagem_bilingue}   
                                    placeholder=""
                                    autoComplete='off'
                                    autoCorrect='off'
                                    value={this.state.campbilingue}
                                    valid={ this.state.validate.bilingueState === 'has-success' }
                                    invalid={ this.state.validate.bilingueState === 'has-danger' }
                                    onFocus={this.verificabilingue}
                                    onKeyUp={this.verificabilingue}
                                    onChange={(e) => {
                                      this.bilinguechange(e)
                                      this.validateBilingueChange(e)
                                    }}                                                                          
                                    maxlength="75"       
                                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                    labelWidth={120}
                                  />
                                </FormControl>                                                   
                                  <FormFeedback 
                                  invalid={this.state.validate.bilingueState}>
                                      {this.state.mensagem_bilingue}
                                  </FormFeedback>     
                              </div>                    
                      </div>    
                    </div>  
                    </div>  
                   {this.verifica_botao(this.state.inicio)}     
                </div>
              </div>        
            </div>
     </ReactModal>              
       {// <div className="botao_lista_incluir">
         // <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
           //   <AddIcon/> Incluir Valor Tarifário
         // </Fab>
           //           </div> 
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

  loadTipoTransporte() {
    api.get('/tipoTransporte/list')
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        this.setState({listTipoTransporte:data})
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }   

  carrega_matriz() { 
    api.get('/matriz/get/'+localStorage.getItem('logmatrizId'))
    .then(res=>{
      if (res.data.success == true) {
        const data = res.data.data

        //console.log('data - '+JSON.stringify(data[0].faixa_inicial, null, "    ")); 

        this.setState({
          camptipoId: res.data.data[0].tipoTransporteId,    
          campfaixa_inicial: res.data.data[0].faixa_inicial,    
          campfaixa_final: res.data.data[0].faixa_final,    
          campvalor_km: valorMask(res.data.data[0].valor_km),    
          campvalor_tempo: valorMask(res.data.data[0].valor_tempo),      
          campbandeira: valorMask(res.data.data[0].bandeira),    
          campreceptivo: valorMask(res.data.data[0].receptivo),    
          campbilingue: valorMask(res.data.data[0].bilingue),    
          //camppedagio: valorMask(res.data.data[0].pedagio),    
        })
        this.verifica_botao(2)
      }     
    })
    .catch(error=>{
      alert("Error server "+error)
    })

  }   

  onIncluir() {
    this.props.history.push(`/matriz_criar`);   
  } 

  onEditar(data) {

    this.props.history.push(`/matriz_editar/${data.id}`);   
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
    console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/matriz/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {       
        this.loadMatriz();      
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listaMatrizComponent;
