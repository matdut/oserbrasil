import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../../services/api';
import Box from '@material-ui/core/Box';
import Cards from 'react-credit-cards';
import PropTypes from 'prop-types';
import 'react-credit-cards/es/styles-compiled.css';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import CheckIcon from '@material-ui/icons/Check';
import FormHelperText from '@material-ui/core/FormHelperText';
import creditCardType from 'credit-card-type';
import Select from '@material-ui/core/Select';

import './cartao.css';
import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import { Input } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from 'material-table';
import ReactModal from 'react-modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//library sweetalert
//import Swal from 'sweetalert2/dist/sweetalert2.js';
//import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../../administrador/menu_administrador';
import Menu_cliente_individual from '../../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../../empresa/menu_cliente_empresarial';
import Menu_motorista from '../../motorista/menu_motorista';
import Menu_operador from '../../operadores/menu_operador';
import { Card } from '@material-ui/core';
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  
var dateFormat = require('dateformat');

const visaRegex = new RegExp("/^4(?!38935|011|51416|576)\d{12}(?:\d{3})?$/");
const masterRegex = new RegExp("/^5(?!04175|067|06699)\d{15}$/");

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
    left                   : '66%',    
    right                  : '0%',
    bottom                 : 'auto',  
    height                 : '50%',    
    width                  : '40%',    
    padding                : '0px !important',      
    overflow               : 'auto',
    WebkitOverflowScrolling: 'touch',
    position               : 'absolute',
    border: '1px solid #ccc',   
  }
};

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
    left                   : '66%',    
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class BancoComponent extends React.Component  {

  constructor(props){
    super(props);

    this.state = {
      perfil: perfil,
      mensagem: '',
      campId: '',
      campNome: '',
      campDeletarId: '',
      campconta: '',
      campconta_dv: '',
      campagencia_dv: '',
      campoperacao: '',
      campdesccartao: '',
      campDescricao: "",   
      campagencia: '',
      campcodigo: '',
      mensagem_descricao: '',
      erro_descricao: false,
      validacao_descricao: false,
      incluir: true, 
      tipo_cartao: "",
      inicio: 1,
      color: 'light',
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',        
      issuer: "",
      focused: "",
      formData: null,    
      listaAgencias: [],
      listaBanco:[],
      listaStatus:[],
      error_agencia: false,
      error_conta: false,
      error_banco: false,
      error_conta_dv: false,
      error_agencia_dv: false,
      error_operacao: false,
      mensagem_agencia: false,
      mensagem_conta: false,
      mensagem_banco: false,
      mensagem_conta_dv: false,
      mensagem_operacao: false,
      validacao_agencia: false,
      validacao_conta: false, 
      validacao_banco: false, 
      validacao_conta_dv: false,
      validacao_agencia_dv: false,
      validacao_operacao: false,
      validate: {
        descricaoState: ''
      }    
    }
    this.agenciachange = this.agenciachange.bind(this);  
    this.contachange = this.contachange.bind(this);  
    this.bancochange = this.bancochange.bind(this);  

    this.verificaDescricao = this.verificaDescricao.bind(this);       
    this.verificabanco = this.verificabanco.bind(this);       
    this.verificaagencia = this.verificaagencia.bind(this);       
    this.verificaconta = this.verificaconta.bind(this);      
    this.verificaconta_dv = this.verificaconta_dv.bind(this);    
    this.verificaagencia_dv = this.verificaagencia_dv.bind(this); 
    this.verifica_operacao = this.verifica_operacao.bind(this); 
    this.busca_descricao = this.busca_descricao.bind(this);          

    //this.descricaofocus = this.descricaofocus.bind(this);     
    this.validateDescricaoChange = this.validateDescricaoChange.bind(this);  
  }

  
  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });

    if (localStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else if (localStorage.getItem('logperfil') > 0) {       
       this.loadBancoMotorista();  
    }      

    this.carrega_status(); 
  }  

  
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
 
  
  limpar_campos() {
    this.setState({
      mensagem: '',
      campId: '',
      campNome: '',
      campDeletarId: '',
      campconta: '',
      campdesccartao: '',
      campDescricao: "",   
      campagencia: '',
      campagencia_dv: '',
      campcodigo: '',
      campconta_dv: '',
      campoperacao: '',
      mensagem_descricao: '',
      mensagem_conta_dv: '',
      numero_disable: false,
      validade_disable: false,
      nome_disable: false,
      cvc_disable: false,
      mensagem_descricao: '',
      erro_descricao: false,
      validacao_descricao: false,
      error_agencia: false,
      error_conta: false,
      error_banco: false,
      error_conta_dv: false,
      mensagem_agencia: false,
      mensagem_conta: false,
      mensagem_banco: false,
      validacao_agencia: false,
      validacao_conta: false, 
      validacao_banco: false,      
      validacao_conta_dv: false,    
    });
  }

  carrega_dados_banco_motorista(banco){ 
   
    console.log('entrou carrega'+ banco) 
    api.get(`/banco/get/${banco}}`)
    .then(res=>{
      console.log('datapost - '+JSON.stringify(res.data, null, "    "));  
      if (res.data.success == true)  {
        const data = res.data.data
        this.setState({          
          campDescricao: res.data.data[0].banco,
          campBanco: res.data.data[0].banco,
          campagencia: res.data.data[0].agencia,
          campagencia_dv: res.data.data[0].agencia_dv,
          campconta: res.data.data[0].conta,      
          campconta_dv: res.data.data[0].conta_dv,
          campoperacao: res.data.data[0].operacao,
          inicio: 2,    
          validacao_agencia: true,
          validacao_banco: true,
          validacao_conta: true,
          validacao_descricao: true,     
             
        });
        if (this.state.campoperacao.length > 0) {
          this.setState({   
            validacao_operacao: true
          });
        }
        if (this.state.campagencia_dv.length > 0) {
          this.setState({   
            validacao_agencia_dv: true,     
          });
        }
        if (this.state.campconta_dv.length > 0) {
          this.setState({   
            validacao_conta_dv: true,     
          });
        }


      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }   

   carrega_agencia_bancaria(){    
   
    api.get(`/agencia/list`)
    .then(res=>{      
      if (res.data.success == true)  {
        const data = res.data.data
        this.setState({listaAgencias:data})  
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })  
   }   

   busca_descricao(){       
   // console.log('descricao '+this.state.campDescricao);

    api.get(`/agencia/getbusca/${this.state.campDescricao}`)
    .then(res=>{      
      if (res.data.success == true)  {
       // const data = res.data.data;          
        this.setState({ campcodigo: res.data.data[0].codigo})  
        return (res.data.data[0].codigo);
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })  
   }   

   loadBancoMotorista(){ 
   
    api.get(`/banco/list_banco_motorista/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaBanco:data})
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }     
 
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }

  bancochange(e) {
    this.setState({ campbanco: e.target.value })
  }
  agenciachange(e) {
    this.setState({ campagencia: e.target.value })
  }
  contachange(e) {
    this.setState({ campconta: e.target.value })
  }

  loadagenciaData(){   
    return this.state.listaAgencias.map((data)=>{          
      return(
        <MenuItem value={data.descricao}>{data.codigo} - {data.descricao}</MenuItem>              
      )
    })     
  
   }

   verifica_botao(inicio) {
 //   const { validate } = this.state   
    console.log('validate 111 - '+JSON.stringify(this.state, null, "    ")); 

     if (inicio == 1) {
  
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                <div className="d-flex justify-content-center">
                <label> Salvar </label>
                </div>     
          </Box>           
      );   
       
      } else {

        if (this.state.validacao_banco == true 
          && this.state.validacao_conta == true && this.state.validacao_agencia == true) { 
            return (
        
              <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendSave()}>
                      <div className="d-flex justify-content-center">
                      <label> Salvar </label>
                      </div>     
                </Box>           
            );   
        } else {
          return (
        
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar </label>
                    </div>     
              </Box>           
          );   
        }   

      } 
} 
verifica_botao_update(inicio) {
  const { validate } = this.state   
  //console.log('validate - '+JSON.stringify(this.state, null, "    ")); 

   if (inicio == 1) {

    return (

      <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
              <div className="d-flex justify-content-center">
              <label> Salvar </label>
              </div>     
        </Box>           
    );   
     
    } else {

      if (this.state.validacao_banco == true 
        && this.state.validacao_conta == true && this.state.validacao_agencia == true) { 
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendUpdate()}>
                    <div className="d-flex justify-content-center">
                    <label> Salvar </label>
                    </div>     
              </Box>           
          );   
      } else {
        return (
      
          <Box bgcolor="text.disabled" color="background.paper" className="botoes_desabilitado_modal"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Salvar </label>
                  </div>     
            </Box>           
        );   
      }   

    } 
} 
  verificaDescricao(e) {
    const { validate } = this.state
    if (e.target.value.length == 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,
        erro_descricao:true,
        validacao_descricao: false,               
        mensagem_cpf: ''  
       })            
    } else if (e.target.value.length > 0) {
      validate.cpfState = ''
      this.setState({ 
        validate,
        erro_descricao:false,
        validacao_descricao: true,               
        mensagem_cpf: ''  
       })            
    }
  }

  verificabanco(e) {
    if (this.state.campDescricao.length == 0) {
      this.setState({ 
        error_banco:true,
        validacao_banco: false,               
        mensagem_banco: '',
        
        inicio: 1    
       })            
    } else if (this.state.campDescricao.length > 0) {
      this.setState({ 
        error_banco:false,
        validacao_banco: true,               
        mensagem_banco: '',
       
        inicio: 2  
       })            
    }
  }
  verificaagencia(e) {
    if (this.state.campagencia.length == 0) {
      this.setState({ 
        error_agencia:true,
        validacao_agencia: false,               
        mensagem_agencia: '',
        inicio: 1    
       })            
    } else if (this.state.campagencia.length > 0) {
      this.setState({ 
        error_agencia: false,
        validacao_agencia: true,               
        mensagem_agencia: '',
        inicio: 2    
       })            
    } 
  }
  verificaconta(e) {
    if (this.state.campconta.length == 0) {
      this.setState({ 
        error_conta:true,
        validacao_conta: false,               
        mensagem_conta: '',
        inicio: 1    
       })            
    } else if (this.state.campconta.length > 0) {
      this.setState({ 
        error_conta:false,
        validacao_conta: true,               
        mensagem_conta: '',  
        inicio: 2  
       })            
    } 
  }  
  
  verificaconta_dv(e) {
    if (this.state.campconta_dv.length == 0) {
      this.setState({ 
        error_conta_dv:true,
        validacao_conta_dv: false,               
        mensagem_conta_dv: '',
        inicio: 1    
       })            
    } else if (this.state.campconta_dv.length > 0) {
      this.setState({ 
        error_conta_dv:false,
        validacao_conta_dv: true,               
        mensagem_conta_dv: '',
        inicio: 2  
       })            
    } 
  }  

  verificaagencia_dv(e) {
    if (this.state.campagencia_dv.length == 0) {
      this.setState({ 
        error_agencia_dv:true,
        validacao_agencia_dv: false,               
        mensagem_agencia_dv: '',
        inicio: 1    
       })            
    } else if (this.state.campagencia_dv.length > 0) {
      this.setState({ 
        error_agencia_dv:false,
        validacao_agencia_dv: true,               
        mensagem_agencia_dv: '',
        inicio: 2  
       })            
    } 
  }  

  verifica_operacao(e) {
    if (this.state.campoperacao.length == 0) {
      this.setState({ 
        error_operacao:true,
        validacao_operacao: false,               
        mensagem_operacao: '',
        inicio: 1    
       })            
    } else if (this.state.campoperacao.length > 0) {
      this.setState({ 
        error_operacao:false,
        validacao_operacao: true,               
        mensagem_operacao: '',
        inicio: 2  
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

   
  sendUpdate(){        


    api.get(`/agencia/getbusca/${this.state.campDescricao}`)
    .then(rescodigo=>{      
      if (rescodigo.data.success == true)  {  

        const datapost = {
          codigo: rescodigo.data.data[0].codigo,
          banco: this.state.campDescricao,     
          agencia: this.state.campagencia,
          agencia_dv: this.state.campagencia_dv,
          conta_dv: this.state.campconta_dv,
          operacao: this.state.campoperacao,
          conta: this.state.campconta,  
          logid: localStorage.getItem('logid'), 
          perfilId: localStorage.getItem('logperfil')  
        }                  
   
          api.put(`/banco/update/${this.state.campId}`,datapost)
          .then(response=>{

            if (response.data.success == true) {          
            
             this.setState({                   
               mensagem_usuario: 'Banco alterador com sucesso!',          
             });          
    
            this.loadBancoMotorista(); 
            this.envia_mensagemClick();           
            
          }
    
          }).catch(error=>{
            alert("Erro verificar log  "+ error)
          })
        }    
   })
    .catch(error=>{
      alert("Error server "+error)
   }) 
  }  

  sendSave(){                     
  //  debugger;
   // const codigo = this.busca_descricao();

   debugger;
   
   this.setState({                   
    error_agencia: false,
    error_conta: false,
    validacao_agencia: true,
    validacao_conta: true,       
  });   
  
  try {
  
    
   api.get(`/agencia/getbusca/${this.state.campDescricao}`)  
   .then(rescodigo=>{      

    debugger;
     if (rescodigo.data.success == true)  {  
    
        const datapost = {
          codigo: rescodigo.data.data[0].codigo,
          banco: this.state.campDescricao,     
          agencia: this.state.campagencia,
          agencia_dv: this.state.campagencia_dv,
          conta: this.state.campconta,  
          conta_dv: this.state.campconta_dv,
          operacao: this.state.campoperacao,
          logid: localStorage.getItem('logid'), 
          perfilId: localStorage.getItem('logperfil')  
        }                  
      
          console.log('dataPost '+JSON.stringify(datapost, null, "    ")); 
          api.post(`/banco/create`,datapost)
          .then(response=>{

            if (response.data.success == true) {          
            
             this.setState({                   
               mensagem_usuario: 'Banco incluido com sucesso!',          
             });          
    
            this.loadBancoMotorista(); 
            this.envia_mensagemClick();            
            
          }
    
          }).catch(error=>{
            alert("Erro verificar "+ error)
          })
    
        }
      })
      .catch(error=>{
        alert("Error server "+error)
      }) 

    } catch (error) {
      console.log("😱 Error: ", error);
    }         
         
  }   

loadStatus(){
  
  return this.state.listaStatus.map((data)=>{          
    return(
      <MenuItem value={data.id}>{data.descricao}</MenuItem>              
    )
  })     

 }

 verifica_operacao(banco) {

  if (banco == "Caixa Econômica Federal") {

  return (

    <FormControl variant="outlined">     
                              <InputLabel className="label_opcao_text_motorista" htmlFor="filled-adornment-password">Operação</InputLabel>                           
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_operacao}
                                    helperText={this.state.mensagem_operacao}
                                    className="text_opcao_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campoperacao}                        
                                    onKeyUp={this.verificaoperacao}
                                    onChange={(value)=> this.setState({campoperacao:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 3,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_operacao? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_operacao}>
                                      {this.state.mensagem_operacao}
                                </FormHelperText>
                              </FormControl>   

  );
     }
 }
 carrega_status(){
  
  //const baseUrl = "http://34.210.56.22:3333"
  //const url = baseUrl+"/seguradora/list"
  api.get('/status/listafiltro')
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
    const { cvc, focused, locale, name, placeholders } = this.props;
    const { number, expiry } = this;

    return (
      <div>    

          {this.verificar_menu_lateral()}

          <div className="titulo_lista">
              <div className="unnamed-character-style-4 descricao_admministrador">          
              <div className="titulo_bemvindo"> Dados Bancários</div>
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
                          { title: '', field: '#', width: '40px', minWidth: '40px', maxWidth: '40px'  },                        
                          { title: 'Codigo', field: 'codigo', width: '100px', minWidth: '100px', maxWidth: '100px' },                            
                          { title: 'Banco', field: 'banco', width: '200px', minWidth: '200px', maxWidth: '200px' },                      
                          { title: 'Agência', field: 'agencia', width: '100px', minWidth: '100px', maxWidth: '100px',
                          render: rowData => rowData.agencia == "" ? '' : rowData.agencia_dv == "" ? rowData.agencia: rowData.agencia + '-'+ rowData.agencia_dv  },                            
                          { title: 'Conta', field: 'conta', width: '100px', minWidth: '100px', maxWidth: '100px',
                          render: rowData => rowData.conta == "" ? '' : rowData.conta_dv == "" ? rowData.conta : rowData.conta + '-'+ rowData.conta_dv }, 
                                             
                          { title: '', field: '', lookup: { 1: 'sadas', 2: 'asdas' }, },            
                        ]}
                        data={this.state.listaBanco}     
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
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportFileName: 'Relatorio_empresa_convites',
                              search: true,     
                              exportAllData: true,                              
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,                                        
                              maxBodyHeight: '60vh',
                              minBodyHeight: '60vh',    
                              padding: 'dense',   
                              overflowY: 'scroll',
                             // tableLayout: 'fixed',
                              ///headerStyle: { position: 'sticky', top: 0 },
                              /*exportButton: true, */            
                              exportButton: { pdf: true },          
                              actionsColumnIndex: 6,
                              //pageSize: 7,
                              pageSizeOptions: [0],   
                        }}                        
                        actions={[                        
                          {             
                            icon: 'edit',
                            onClick: (evt, data) => this.handleOpenModalAlteracao(data)
                          },
                          {
                            icon: 'delete',                                                             
                            tooltip: 'Deleta Veiculo',          
                            onClick: (evt, data) => this.handleOpenModalDelete(data)                                     
                          }
                          /*,
                          {
                            icon: 'add',                                                             
                            tooltip: 'Adiciona Cartão',
                            isFreeAction: true,
                            onClick: (event) => this.handleOpenModalInclusao()
                          } */
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
                      </div>   
         </TabContext>
        <br/>
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
               <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Banco? </div>
               <div className="titulo_moldura_modal_delecao_2">Ao confirmar a exclusão o registro será apagado.  </div>
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

         <ReactModal 
        isOpen={this.state.showModalInclusao}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Inclusão do Banco    
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()} className="botao_close_modal_tipo_veiculo">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                  <div class="p-2"> 
                  <FormControl className="select_matriz_tipo" variant="outlined">
                        <InputLabel className="label_select_matriz_tipo" id="demo-simple-select-outlined-label">Banco</InputLabel>
                        <Select
                          className="text_select_matriz_tipo"
                          error={this.state.error_banco} 
                          helperText={this.state.mensagem_banco}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.campDescricao}
                          onFocus={this.verificabanco}
                          onKeyUp={this.verificabanco}
                          //onClick={this.verificaTipo_veiculo}
                          onChange={(value)=> this.setState({campDescricao:value.target.value})}      
                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_banco? <CheckIcon />: ''}
                            </InputAdornment>
                          }                          
                          labelWidth={80}
                        >
                          {this.loadagenciaData()}                    
                        </Select>
                      </FormControl>      
                                                     
                    </div>                    
                    <div class="p-2">   
                    <div class="d-flex justify-content-start">     
                    <div>
                    <FormControl variant="outlined">     
                              <InputLabel className="label_opcao_text_motorista" htmlFor="filled-adornment-password">Agência</InputLabel>                           
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_agencia}
                                    helperText={this.state.mensagem_agencia}
                                    className="text_opcao_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campagencia}        
                                    onFocus={this.verificaagencia}                
                                    onKeyUp={this.verificaagencia}
                                    onChange={(value)=> this.setState({campagencia:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 4,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_agencia? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_agencia}>
                                      {this.state.mensagem_agencia}
                                </FormHelperText>
                              </FormControl>   
                      </div>  
                      <div>
                              <FormControl variant="outlined">     
                              <InputLabel className="label_conta_dv_text_motorista" htmlFor="filled-adornment-password">DV</InputLabel>                           
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_agencia_dv}
                                    helperText={this.state.mensagem_agencia_dv}
                                    className="text_conta_dv_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campagencia_dv}                        
                                    onKeyUp={this.verificaagencia_dv}
                                    onChange={(value)=> this.setState({campagencia_dv:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 1,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_agencia_dv? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_agencia_dv}>
                                      {this.state.mensagem_conta_dv}
                                </FormHelperText>
                              </FormControl>     
                                        
                            </div>    
                    <div>
                     { this.verifica_operacao(this.state.campDescricao) }
                      </div>                       
                                                                
                      </div>                      
                    </div>  
                    <div class="p-2">   
                    <div class="d-flex justify-content-start">    

                    <div>
                              <FormControl variant="outlined">
                                <InputLabel className="label_conta_text_motorista" htmlFor="filled-adornment-password">Conta</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_conta}
                                    helperText={this.state.mensagem_conta}
                                    className="text_conta_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campconta}                        
                                    onKeyUp={this.verificaconta}
                                    onChange={(value)=> this.setState({campconta:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 12,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_conta? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_conta}>
                                      {this.state.mensagem_conta}
                                </FormHelperText>
                              </FormControl>  
                              
                              </div>                           
                              <div>
                              <FormControl variant="outlined">     
                              <InputLabel className="label_conta_dv_text_motorista" htmlFor="filled-adornment-password">DV</InputLabel>                           
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_conta_dv}
                                    helperText={this.state.mensagem_conta_dv}
                                    className="text_conta_dv_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campconta_dv}                        
                                    onKeyUp={this.verificaconta_dv}
                                    onChange={(value)=> this.setState({campconta_dv:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 1,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_conta_dv? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_conta_dv}>
                                      {this.state.mensagem_conta_dv}
                                </FormHelperText>
                              </FormControl>     
                                        
                            </div>    
                     </div></div>
                  
              <br/>
              <br/>
                </div>
                       
                  {this.verifica_botao(this.state.inicio)}                          
                      
                 </div>
               </div>        
            </div>
     </ReactModal>   

     <ReactModal 
        isOpen={this.state.showModalAlterar}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Alterar Banco
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalAlteracao()} className="botao_close_modal_cartao">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
                 <div>  
                 <div class="d-flex flex-column espacamento_caixa_texto">              
                  <div class="p-2"> 
                  <FormControl className="select_matriz_tipo" variant="outlined">
                        <InputLabel className="label_select_matriz_tipo" id="demo-simple-select-outlined-label">Banco</InputLabel>
                        <Select
                          className="text_select_matriz_tipo"
                          error={this.state.error_banco} 
                          helperText={this.state.mensagem_banco}
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.campDescricao}
                          onFocus={this.verificabanco}
                          //onClick={this.verificaTipo_veiculo}
                          onChange={(value)=> this.setState({campDescricao:value.target.value})}      
                          endAdornment={
                            <InputAdornment position="end">
                                 {this.state.validacao_banco? <CheckIcon />: ''}
                            </InputAdornment>
                          }     
                          label="Tipo Transporte"
                          labelWidth={80}
                        >
                          {this.loadagenciaData()}                    
                        </Select>
                      </FormControl>      
                                                     
                    </div> 
                    <div class="p-2">   
                    <div class="d-flex justify-content-start">     
                    <div>
                    <FormControl variant="outlined">     
                              <InputLabel className="label_opcao_text_motorista" htmlFor="filled-adornment-password">Agência</InputLabel>                           
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_agencia}
                                    helperText={this.state.mensagem_agencia}
                                    className="text_opcao_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campagencia}        
                                    onFocus={this.verificaagencia}                
                                    onKeyUp={this.verificaagencia}
                                    onChange={(value)=> this.setState({campagencia:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 4,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_agencia? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_agencia}>
                                      {this.state.mensagem_agencia}
                                </FormHelperText>
                              </FormControl>   
                      </div>  
                      <div>
                              <FormControl variant="outlined">     
                              <InputLabel className="label_conta_dv_text_motorista" htmlFor="filled-adornment-password">DV</InputLabel>                           
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_agencia_dv}
                                    helperText={this.state.mensagem_agencia_dv}
                                    className="text_conta_dv_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campagencia_dv}                        
                                    onKeyUp={this.verificaagencia_dv}
                                    onChange={(value)=> this.setState({campagencia_dv:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 1,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_agencia_dv? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_agencia_dv}>
                                      {this.state.mensagem_conta_dv}
                                </FormHelperText>
                              </FormControl>     
                                        
                            </div>   
                    <div>
                         { this.verifica_operacao(this.state.campDescricao) }
                      </div>                       
                                                                
                      </div>                      
                    </div>  
                    <div class="p-2">   
                    <div class="d-flex justify-content-start">    

                    <div>
                              <FormControl variant="outlined">
                                <InputLabel className="label_conta_text_motorista" htmlFor="filled-adornment-password">Conta</InputLabel>
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_conta}
                                    helperText={this.state.mensagem_conta}
                                    className="text_conta_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campconta}                        
                                    onKeyUp={this.verificaconta}
                                    onChange={(value)=> this.setState({campconta:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 12,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_conta? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_conta}>
                                      {this.state.mensagem_conta}
                                </FormHelperText>
                              </FormControl>  
                              
                              </div>                           
                              <div>
                              <FormControl variant="outlined">     
                              <InputLabel className="label_conta_dv_text_motorista" htmlFor="filled-adornment-password">DV</InputLabel>                           
                                <OutlinedInput 
                                    autoComplete="off"                                   
                                    type="text"                       
                                    error={this.state.error_conta_dv}
                                    helperText={this.state.mensagem_conta_dv}
                                    className="text_conta_dv_motorista"                       
                                    id="cep_incluir"                      
                                    variant="outlined"
                                    value={this.state.campconta_dv}                        
                                    onKeyUp={this.verificaconta_dv}
                                    onChange={(value)=> this.setState({campconta_dv:value.target.value})}                     
                                    inputProps={{
                                      maxLength: 1,
                                    }}        
                                  endAdornment={
                                    <InputAdornment position="end">
                                        {this.state.validacao_conta_dv? <CheckIcon />: ''}
                                    </InputAdornment>
                                  }
                                  labelWidth={100}
                                />                  
                                <FormHelperText error={this.state.error_conta_dv}>
                                      {this.state.mensagem_conta_dv}
                                </FormHelperText>
                              </FormControl>     
                                        
                            </div>    
                     </div></div>
                  
                  
              <br/>
              <br/>
                </div>
                       
                  {this.verifica_botao_update(this.state.inicio)}                          
                      
                 </div>
               </div>        
            </div>
     </ReactModal>       
     <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize',  outline: 'none'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
                            <AddIcon/> <div className="botao_incluir"> Adiciona Banco </div>
                        </Fab>
                      </div>    
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
                open={this.state.mensagem_exclusao}                
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
    );
  }

  
  envia_mensagemExclusaoClick = () => {
    this.setState({ 
      mensagem_exclusao: true      
    });

  }      

  envia_mensagemExclusaoClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ 
      mensagem_exclusao: false      
    });    

    
  
  };

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
  
    this.loadBancoMotorista();       
    this.handleCloseModalInclusao();      
    this.handleCloseModalAlteracao();           
  };     

  handleOpenModalInclusao () { 
    this.setState({ 
      showModalInclusao: true,      
    });  

    this.limpar_campos();     
    this.carrega_agencia_bancaria();
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false
    });
    this.limpar_campos();   
    this.loadBancoMotorista();      
  
  }


  handleOpenModalAlteracao (data) { 
    this.setState({ 
      showModalAlterar: true,
      campId: data.id,      
      numero_disable: true,
      validade_disable: false,
      nome_disable: true,
      cvc_disable: true,
    });  

    console.log('registro - '+data.id);

   // this.limpar_campos();   
    this.carrega_agencia_bancaria();
    this.carrega_dados_banco_motorista(data.id);  

    
  }
  
  handleCloseModalAlteracao () {
    this.setState({ 
      showModalAlterar: false
    });

    this.limpar_campos();   
    this.loadBancoMotorista();  
   
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

  onIncluir() {
    this.props.history.push(`/tipo_transporte`);   
  }
  
 /* onDelete(id){
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
*/
  sendDelete(userId){    
    console.log('id '+userId);   
    api.delete(`/banco/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {

        this.loadBancoMotorista();
        this.handleCloseModalDelete();        
      }
    })
    .catch ( error => {
      alert("Error delete "+error)
    })
  }

}

export default BancoComponent;
