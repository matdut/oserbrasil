import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';
import Box from '@material-ui/core/Box';
import Cards from 'react-credit-cards';
import Payment from 'payment';
import 'react-credit-cards/es/styles-compiled.css';
import * as moment from 'moment';
import 'moment/locale/pt-br';

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
import TextField from '@material-ui/core/TextField';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu_operador from '../operadores/menu_operador';
const perfil = sessionStorage.getItem('logperfil');
const nome = sessionStorage.getItem('lognome');  

const customStyles = {
  overlay: {    
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
   // backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '0px',
    left                   : '60%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100%',    
    width                  : '40%',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};
class CartaoCreditoComponent extends React.Component  {

  constructor(props){
    super(props);

    this.state = {
      perfil: perfil,
      mensagem: '',
      campId: '',
      campNome: '',
      campDescricao: "",   
      mensagem_descricao: '',
      erro_descricao: false,
      validacao_descricao: false,
      incluir: true, 
      inicio: 1,
      color: 'light',
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',      
      listaCartao:[],
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
      perfil: sessionStorage.getItem('logperfil')    
    });

    if (sessionStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else {
       this.loadCartaoCliente();  
    }      
    
  }  
 
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  

  loadCartaoCliente(){ 
   
    api.get(`/cartao/list_cartao_cliente/${sessionStorage.getItem('logid')}/${sessionStorage.getItem('logperfil')}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaCartao:data})
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
      numero: this.state.number,              
      nome: this.state.name,              
      data_vencimento: moment(this.state.expiry, "MM YY"),
      codigo_seguranca: this.state.cvc,      
      logid: sessionStorage.getItem('logid'), 
      perfilId: sessionStorage.getItem('logperfil'), 
      statusId: 1, 
    }               
    
      console.log('datapost - '+JSON.stringify(datapost, null, "    "));  

          api.post('/cartao/create',datapost)
          .then(response=>{
            if (response.data.success == true) {          
            
             this.handleCloseModalInclusao();           
            
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

       // if (validate.descricaoState == 'has-success') { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSave()}>
                      <div className="d-flex justify-content-center">
                      <label> Salvar Alterações </label>
                      </div>     
                </Box>           
            );   
       /* } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar Alterações </label>
                    </div>     
              </Box>           
          );   
        } */   

      } 
} 

verificar_menu_lateral() {

  if (sessionStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (sessionStorage.getItem('logperfil') == 2) {
    return( 
      <Menu_cliente_individual />     
    );    
  } else if (sessionStorage.getItem('logperfil') == 7) {
    return( 
      <Menu_cliente_empresarial />     
    );   
  } else if (sessionStorage.getItem('logperfil') == 8) {
   return( 
     <Menu_operador />     
   );
  }

}

  render()
  {
    return (
      <div>    

          {this.verificar_menu_lateral()}

          <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                  <h3><strong>Cartões de Créditos</strong></h3>
              </div>      
            </div>

            <div className="container_modal_list">                                         
            <br/>                       
            <div style={{ maxWidth: '90% !important', maxHeight: '91% !important', padding: '5px 5px 80px 5px' }}>    
                    <MaterialTable          
                        title=""
                        columns={[
                          { title: '', field: '#', width: '40px' },
                          { title: 'Número', field: 'numero', width: '300px' },  
                          { title: 'Nome', field: 'nome', width: '300px' },                            
                          { title: 'Data Vencimento', field: 'data_vencimento', width: '300px' },                            
                          { title: '', field: '#', width: '50px' },                       
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                        ]}
                        data={this.state.listaCartao}     
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
                              actionsColumnIndex: 5,
                              pageSize: 7,
                              pageSizeOptions: [7],   
                        }}                        
                        actions={[                        
                          {
                            icon: 'add',                                                             
                            tooltip: 'Adiciona Tipos Veiculos',
                            isFreeAction: true,
                            onClick: (event) => this.handleOpenModalInclusao()
                          }
                        ]}
                        editable={{                          
                          onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                const dataDelete = [...this.state.campId];
                                const index = oldData.id;   
                                dataDelete.splice(index, 1);                              
                                resolve()                                
                                this.sendDelete(index)
                              }, 1000)
                            }),
                        }}
                      />      
             </div>                
        <br/>

        <ReactModal 
        isOpen={this.state.showModalInclusao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Incluir Cartão Crédito
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()} className="botao_close_modal_tipo_veiculo">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                      <div class="p-2">                        
                        <Cards
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}
                          />
                      </div>   
                      
                      <div class="p-2">                     
                      <input
                            type="tel"
                            name="number"
                            placeholder="Número do cartao"                            
                            maxlength="16"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                      </div>      
                      <div class="p-2">          
                      <input
                            type="text"
                            name="name"
                            placeholder="Nome"                         
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}                            
                          /> 
                      </div>      
                      <div class="p-2">          
                      <input
                            type="text"
                            name="expiry"
                            placeholder="Data validade"
                            maxlength="16"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                      </div>      
                      <div class="p-2">          
                      <input
                            type="text"
                            name="cvc"
                            placeholder="CVC"
                            maxlength="3"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                      </div>      


                        </div>
                        {this.botao_modal(2)}     
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
      showModalInclusao: true,
      campDescricao: '',
      validacao_descricao: false,
    });  
     
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false
    });
  
    this.loadCartaoCliente();  
   
  }

  onIncluir() {
    this.props.history.push(`/tipo_transporte`);   
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

export default CartaoCreditoComponent;
