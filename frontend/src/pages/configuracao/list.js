import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import Tooltip from '@material-ui/core/Tooltip';

import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu_motorista from '../motorista/menu_motorista';
import Menu_operador from '../operadores/menu_operador';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  

const LightTooltip = withStyles((theme) => ({
  tooltip: {     
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    margin: "1px 0",
    whiteSpace: 0,
  },
}))(Tooltip);

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
class ConfiguracaoComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      mensagem: '',
      campId: '',
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

verificar_menu_lateral() {
 
  if (localStorage.getItem('logperfil') == 1) {
   return( 
     <Menu_administrador />     
   );
  } else if (localStorage.getItem('logperfil') == 2) {
    return( 
      <Menu_cliente_individual />     
    );    
  } else if (localStorage.getItem('logperfil') == 3) {
    return( 
      <Menu_motorista />     
    );
  } else if (localStorage.getItem('logperfil') == 7) {
    return( 
      <Menu_cliente_empresarial />     
    );   
  } else if (localStorage.getItem('logperfil') == 8) {
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
              <div className="titulo_bemvindo"> Configuração </div>   
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

export default ConfiguracaoComponent;
