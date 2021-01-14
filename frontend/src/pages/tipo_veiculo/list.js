import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

//import { Input, Alert } from 'reactstrap';
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

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
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
    left                   : '64%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '100%',    
  //  width                  : '49%',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};



const ConfirmacaodelStyles = {
  overlay: {
    backgroundColor: 'papayawhip',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
   // backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    top                    : '50%',
    left                   : '60%',  
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '50%',    
 //   width                  : '560px',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      campId: '',
      campDescricao: "",   
      mensagem_descricao: '',
      campDeletarId: '',
      mensagem_alert: false,
      retorno: '',
      vertical: 'top',
      horizontal: 'left',
      open: false,
      value: "1",
      mensagem_usuario: '',
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
      perfil: sessionStorage.getItem('logperfil')    
    });

    if (sessionStorage.getItem('logperfil') == 0) {
      
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

  opcao_tabChange = (event, newValue) => {   
    this.setState({        
        value: newValue 
    });    
  };
 

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
            validate,
            mensagem_descricao: '',
            inicio: 2,
            erro_descricao:false,
            validacao_descricao: true,               
          });                               
      }        
      this.botao_modal(this.state.inicio)
  }

  sendSave(){       
    const { validate } = this.state;  
    validate.descricaoState = '';
    this.setState({ validate });

    const datapost = {
      descricao: this.state.campDescricao,
    }           
           
          api.post('/tipoTransporte/create',datapost)
          .then(response=>{
            if (response.data.success) {          
            
             //this.handleCloseModalInclusao();
             this.loadTipoVeicculo();  
             this.setState({                
                mensagem_usuario: 'Tipo de veículo incluído com sucesso!'
               });

            //this.handleCloseModalInclusao();
             this.envia_mensagemClick();    
            
          }
    
          }).catch(error=>{
            alert("Erro verificar log  ")
          })
    
  }  

  botao_modal(inicio) {    
    
    const { validate } = this.state;
    //console.log('dsa as '+ validate.validacao_descricao);           

     if (inicio == 1) {
  
      return (
  
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Incluir </label>
                </div>     
          </Box>           
      );   
       
      } else {

        if (validate.descricaoState == 'has-success') { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSave()}>
                      <div className="d-flex justify-content-center">
                      <label> Incluir </label>
                      </div>     
              </Box>           
            );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Incluir </label>
                    </div>     
            </Box>           
          );   
        }   

      } 
} 

  render()
  {
  //  const classes = useStyles();
    return (
      <div>    
 
    <div>   
      <div>   
          <Menu_administrador />  
            <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo"> Tipo de Veículo </div>
              </div>      
            </div>
            <br/>
            <div className="margem_left">       
    
            <div className="container-fluid">   
      
            <TabContext value={this.state.value} className="tabs_padrao">
            <AppBar position="static" color="transparent">
              <TabList onChange={this.opcao_tabChange} aria-label="simple tabs example">           
                              
              </TabList>
            </AppBar>
         
            <div className="tirar_espaco">         
               
               <MaterialTable          
                   title=""
                                       
                   columns={[       
                    { title: '', field: '#', width: "58px", minWidth: '58px', maxWidth: '58px' },
                    { title: 'Descrição', field: 'descricao', width: '165px', minWidth: '165px', maxWidth: '165px' },
                    { title: '', field: '', width: '260px', minWidth: '200px',  maxWidth: '200px' }, 
                    { title: '', field: '', width: '135px', minWidth: '135px', maxWidth: '135px' }, 
                    { title: '', field: '', width: '290px', minWidth: '290px', maxWidth: '290px' },
                    { title: '', field: '', width: '200px', minWidth: '200px', maxWidth: '200px' },
                 
                    { title: '', field: '', width: '120px', minWidth: '120px', maxWidth: '120px' },                                                                                                                 
                    { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },  
                           
                   ]}
                   data={this.state.listaTipoVeiculo}     
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
                    rowStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "12px" },
                    searchFieldStyle: { backgroundColor: "#fff", fontFamily: "Effra", fontSize: "16px", width: "450px", left: "16px", color: "#0F074E"  },
                    //paginationPosition: 'bottom',  
                    searchFieldAlignment: 'left', 
                    exportAllData: true,
                    exportFileName: 'Rel_servicos_ativos',
                    search: true,     
                    searchFieldVariant: 'outlined', 
                    toolbarButtonAlignment: 'right',           
                    paging: false,          
                    maxBodyHeight: '60vh',
                    minBodyHeight: '60vh',                    
                    padding: 'dense',   
                    overflowY: 'scroll', 
              
                  //  tableLayout: 'fixed',                        
                    exportButton: { pdf: true },          
                    actionsColumnIndex: 7,
                   // pageSize: 9,
                    pageSizeOptions: [0],     
                   }}                        
                   actions={[                        
                    /* {
                       icon: 'add',                                                             
                       tooltip: 'Adiciona Tipos Veiculos',
                       isFreeAction: true,
                       onClick: (event) => this.handleOpenModalInclusao()
                     }, */
                     {
                       icon: 'delete',                                                             
                       tooltip: 'Deleta Veiculo',          
                       onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                     }
                   ]} 
                   /*
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
                   }} */
                 />      
                  <div className="botao_lista_incluir">
                   <Fab style={{ textTransform: 'capitalize',  outline: 'none'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
                       <AddIcon/> <div className="botao_incluir"> Adicionar Tipo Veiculos  </div>
                   </Fab>
                 </div>                        
        </div>  
     

        </TabContext>              
   <br/> 
   

   <ReactModal 
   isOpen={this.state.showModalInclusao}
   style={customStyles}
   contentLabel="Inline Styles Modal Example"                                  
   ><div className="editar_titulo_inclusao"> Incluir Tipo de Veiculo    
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
<ReactModal 
   isOpen={this.state.showMensagemDelete}
   style={ConfirmacaodelStyles}
   contentLabel="Inline Styles Modal Example"                                  
   ><div> 
       <IconButton aria-label="editar" onClick={()=>this.handleCloseModalDelete()} className="botao_close_modal_deletar">
         <CloseOutlinedIcon />
       </IconButton></div>       
       <center><img src="/exclamation.png" /> </center>
       <div className="container_alterado">              
         
        <div className="moldura_modal_delecao">
          <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Tipo de Veículo? </div>
          <div>Ao confirmar a exclusão o registro será apagado.  </div>
        </div>     
                         <div className="retorno">{this.state.retorno}</div>
       <Box 
          className="botoes_delete_cancelar_modal" p={2} onClick={()=>this.handleCloseModalDelete()}>
         <div className="d-flex justify-content-center">
         <label> Cancelar </label>
         </div>     
       </Box>      
       <Box 
          className="botoes_delete_excluir_modal" p={2} onClick={()=>this.sendDelete(this.state.campDeletarId)}>
         <div className="d-flex justify-content-center">
         <label> Excluir </label>
         </div>     
       </Box>      

       </div>
</ReactModal>     
      <Snackbar                   
           anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
           open={this.state.mensagem_alert}                
           autoHideDuration={2000}               
           onClose={this.envia_mensagemClose}                
           >
       <Alert onClose={this.envia_mensagemClose} severity="success">
             {this.state.mensagem_usuario}
       </Alert>
     </Snackbar>
     <Snackbar                   
           anchorOrigin= {{ horizontal: 'center', vertical: 'bottom' }}           
           open={this.state.mensagem_alert_exclusao}                
           autoHideDuration={2000}               
           onClose={this.envia_mensagemExclusaoClose}                
           >
       <Alert onClose={this.envia_mensagemExclusaoClose} severity="error">
             {this.state.mensagem_usuario}
       </Alert>
     </Snackbar>
  { 
  // <div className="botao_lista_incluir">
  //   <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
  //       <AddIcon/> Adicionar Tipo Veículo
  //   </Fab>
 // </div>
}
   </div>   
   </div>
   </div>      
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


  envia_mensagemClick = () => {
    this.setState({ 
      mensagem_alert: true      
    });

  }      

  envia_mensagemClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_alert: false      
    });   
    
    this.handleCloseModalInclusao();
  
  };


  envia_mensagemExclusaoClick = () => {
    this.setState({ 
      mensagem_alert_exclusao: true      
    });

  }      

  envia_mensagemExclusaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_alert_exclusao: false      
    });   
  
  };

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

    console.log('id - '+userId);
    api.delete(`/tipoTransporte/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {

        this.loadTipoVeicculo();        

        this.setState({       
          mensagem_usuario: 'Tipo de veículo excluído com sucesso!'
         });

        this.handleCloseModalDelete();
        this.envia_mensagemExclusaoClick();

      } else {
        this.setState({       
          retorno: 'Não pode ser deletado, está sendo utilizado em outra tabela',          
        });  
      }
    })
    .catch ( error => {
      alert("Error tipoTransporte/delete - "+error)
    })
  }

}

export default listComponent;
