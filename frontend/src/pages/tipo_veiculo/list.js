import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';
import Box from '@material-ui/core/Box';

import { Input, Alert } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from 'material-table';
import ReactModal from 'react-modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import CheckIcon from '@material-ui/icons/Check';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
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
class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      campDescricao: "",   
      mensagem_descricao: '',
      erro_descricao: false,
      validacao_descricao: false,
      incluir: true, 
      inicio: 1,
      color: 'light',
      listaTipoVeiculo:[],
      validate: {
        descricaoState: ''
      }    
    }
    this.descricaochange = this.descricaochange.bind(this);  
    this.verificaDescricao = this.verificaDescricao.bind(this);       
    this.descricaofocus = this.descricaofocus.bind(this);     
    this.validateDescricaoChange = this.validateDescricaoChange.bind(this);  
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });

    if (localStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else {
       this.loadTipoVeicculo();  
    }   
  }  
 
  loadTipoVeicculo(){ 
   
    api.get('/tipoTransporte/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaTipoVeiculo:data})
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

  descricaochange(e) {
    this.setState({ campDescricao: e.target.value })
  }

  verificaDescricao(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,
        erro_descricao:false,
        validacao_descricao: false,               
        mensagem_cpf: ''  
       })            
    } 
  }

  descricaofocus(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,       
        erro_descricao:false,
        validacao_descricao: false,                       
        mensagem_cpf: ''  
       })            
    }  
  } 

  validateDescricaoChange(e){
    const { validate } = this.state
     
      if (e.target.value.length > 0) {
          validate.descricaoState = 'has-success'                 

          this.setState({ 
            mensagem_descricao: '',
            inicio: 2,
            erro_descricao:false,
            validacao_descricao: true,               
          });                               
      }  
      this.setState({ validate })
      this.botao_modal(this.state.inicio)
  }

  sendSave(){        

    const datapost = {
      descricao: this.state.campDescricao,
    }           
           
          api.post('/tipoTransporte/create',datapost)
          .then(response=>{
            if (response.data.success) {          
            
             this.handleCloseModalInclusao();
             this.loadTipoVeicculo();  
            
          }
    
          }).catch(error=>{
            alert("Erro verificar log  ")
          })
    
  }  

  botao_modal(inicio) {
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
                  <h3><strong>Tipo de Veículos</strong></h3>
              </div>      
            </div>

            <div className="container_modal_list">                                         
            <br/>                       
            <div style={{ maxWidth: '95%'}}>    
                    <MaterialTable          
                        title=""
                        columns={[
                          { title: '', field: '#', width: '40px' },
                          { title: 'Descrição', field: 'descricao' },                            
                          { title: '', field: '#', width: '50px' },                       
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                        ]}
                        data={this.state.listaTipoVeiculo}     
                        localization={{
                          body: {
                            emptyDataSourceMessage: 'Nenhum registro para exibir'
                          },
                          toolbar: {
                            searchTooltip: 'Pesquisar',
                            searchPlaceholder: 'Buscar tipo de veículo',        
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
                              exportFileName: 'Relatorio_empresa_convites',
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
                            icon: 'delete',
                            onClick: (evt, data) => this.onDelete(data.id)
                          },
                          {
                            icon: 'add',                                                             
                            tooltip: 'Adiciona Tipos Veiculos',
                            isFreeAction: true,
                            onClick: (event) => this.handleOpenModalInclusao()
                          }
                        ]}
                      />      
             </div>                
        <br/>

        <ReactModal 
        isOpen={this.state.showModalInclusao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Tipos de Veiculos    
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()} className="botao_close_modal_tipo_veiculo">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                      <div class="p-2">  
                      <FormControl variant="outlined" className="posicao_caixa_texto">
                              <InputLabel  className="label_modal" htmlFor="filled-adornment-password">Descrição</InputLabel>
                              <OutlinedInput  
                                  autoComplete="off"                                        
                                  error={this.state.erro_descricao}
                                  helperText={this.state.mensagem_descricao}
                                  className="nome_text"                       
                                  id="outlined-basic"                   
                                  variant="outlined"
                                  value={this.state.campDescricao}                                
                                  onBlur={this.descricaofocus}
                                  onKeyUp={this.verificaDescricao}
                                  onFocus={this.verificaDescricao}
                                  onChange={ (e) => {
                                    this.descricaochange(e)                                                 
                                    this.validateDescricaoChange(e)
                                  }}  
                                inputProps={{
                                  maxLength: 50,
                                }}              
                                endAdornment={
                                  <InputAdornment position="end">
                                      {this.state.validacao_descricao? <CheckIcon />: ''}
                                  </InputAdornment>
                                }
                                labelWidth={80}
                              />
                            <FormHelperText error={this.state.erro_descricao}>
                                  {this.state.mensagem_descricao}
                            </FormHelperText>
                            </FormControl>    
                          </div>
                        </div>
                        {this.botao_modal(this.state.inicio)}     
                      </div>
                    </div>        
                 </div>
     </ReactModal>       
       { 
       // <div className="botao_lista_incluir">
       //   <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
       //       <AddIcon/> Adicionar Tipo Veículo
       //   </Fab>
      // </div>
  }
      </div>   
    </div>  
    );
  }

  handleOpenModalInclusao () { 
    this.setState({ 
      showModalInclusao: true
    });  
     
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false
    });
  
   
  }

  onIncluir() {
    this.props.history.push(`/tipo_transporte`);   
  }
  loadFillData(){

    return this.state.listaTipoVeiculo.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.descricao}</td>         
          <td>
            <div style={{width:"150px"}}>              
              {'   '}
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data.id)}>
                <DeleteIcon />
              </IconButton>    
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId){  

    api.delete(`/tipoTransporte/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {

        this.loadTipoVeicculo()        
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
