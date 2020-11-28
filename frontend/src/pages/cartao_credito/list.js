import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';
import Box from '@material-ui/core/Box';
import Cards from 'react-credit-cards';
import PropTypes from 'prop-types';
import 'react-credit-cards/es/styles-compiled.css';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { cartaoMask } from '../formatacao/cartaoMask';
import { cartaoAmericanMask } from '../formatacao/cartaoAmericanMask';
import { cartaoDinersMask } from '../formatacao/cartaoDinersMask';
//import Resizer from 'react-image-file-resizer';
import creditCardType from 'credit-card-type'

import './cartao.css';

import { bandeira_cartao } from '../formatacao/bandeira_cartao';

import NumberFormat from 'react-number-format';

import { Input } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import MaterialTable from 'material-table';
import ReactModal from 'react-modal';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData } from './utils';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//library sweetalert
//import Swal from 'sweetalert2/dist/sweetalert2.js';
//import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
import Menu_cliente_individual from '../cliente/menu_cliente_individual';
import Menu_cliente_empresarial from '../empresa/menu_cliente_empresarial';
import Menu_motorista from '../motorista/menu_motorista';
import Menu_operador from '../operadores/menu_operador';
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
    width                  : '560px',    
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
    left                   : '64%',     
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
class CartaoCreditoComponent extends React.Component  {

  constructor(props){
    super(props);

    this.state = {
      perfil: perfil,
      mensagem: '',
      campId: '',
      campNome: '',
      campdesccartao: '',
      campDescricao: "",   
      mensagem_descricao: '',
      erro_descricao: false,
      validacao_descricao: false,
      incluir: true, 
      tipo_cartao: "",
      inicio: 1,
      color: 'light',
      loading: false,
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',        
      issuer: "",
      focused: "",
      formData: null,    
      listaCartao:[],      
      mensagem_cartao: '',
      validate: {
        descricaoState: ''
      }    
    }
    this.descricaochange = this.descricaochange.bind(this);  
    this.verificaDescricao = this.verificaDescricao.bind(this);       
    this.descricaofocus = this.descricaofocus.bind(this);     
    this.verifica_cartao = this.verifica_cartao.bind(this);     
    
    this.validateDescricaoChange = this.validateDescricaoChange.bind(this);  
  }

  
  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });

    if (localStorage.getItem('logperfil') == 0) {
      
      this.props.history.push(`/login`);       

    } else if (localStorage.getItem('logperfil') > 0) {       
       this.loadCartaoCliente();  
    }      

    //console.log('locale '+ );
    
  }  

  
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }
     
    this.setState({ [target.name]: target.value });
  };
  
  limpar_campos() {
    this.setState({
      mensagem: '',
      campId: '',
      campNome: '',
      campDescricao: "",   
      tipo_cartao: "",
      numero_disable: false,
      validade_disable: false,
      nome_disable: false,
      cvc_disable: false,
      mensagem_descricao: '',
      erro_descricao: false,
      validacao_descricao: false,
      validacao_cartao: false,
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',            
    });
  }

  carrega_dados_cartao_cliente(cartao){ 
   
    console.log('entrou carrega'+ cartao) 
    api.get(`/cartao/get/${cartao}}`)
    .then(res=>{
      console.log('datapost - '+JSON.stringify(res.data, null, "    "));  
      if (res.data.success == true)  {
        const data = res.data.data
        this.setState({
          campId: res.data.data[0].id,
          cvc: res.data.data[0].codigo_seguranca,
          expiry: dateFormat(res.data.data[0].data_vencimento, "UTC:mm/yy"),
          name: res.data.data[0].nome,          
          number: res.data.data[0].numero, 
     //     bandeira: res.data.data[0].bandeira,   
        })        
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }   

  loadCartaoCliente(){ 
   
    api.get(`/cartao/list_cartao_cliente/${localStorage.getItem('logid')}/${localStorage.getItem('logperfil')}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({
          listaCartao:data,
          isLoading: false,
        })
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
/*
    if (visaRegex.test('4509 9535 6623 3704')) {       
      this.setState({ 
        tipo_cartao: 'visa'
      });  
    } else if (masterRegex.test(this.state.number)) {       
      this.setState({ 
        tipo_cartao: 'master'
      });  
    }  */

    let cartao = creditCardType(this.state.number).filter((card) => {        
      return card.type
   });

    const datapost = {
      numero: this.state.number,              
      nome: this.state.name,              
      data_vencimento: moment(this.state.expiry, "MM YY"),
      codigo_seguranca: this.state.cvc,      
      logid: localStorage.getItem('logid'), 
      perfilId: localStorage.getItem('logperfil'), 
      bandeira: cartao[0].type,  
      statusId: 1, 
    }               
    
      console.log('datapost1 - '+JSON.stringify(datapost, null, "    "));  

          api.post('/cartao/create',datapost)
          .then(response=>{
            if (response.data.success == true) {          


                this.setState({                   
                    mensagem_usuario: 'Cartão incluido com sucesso!',          
                });          
        
                this.envia_mensagemClick();    
             //this.handleCloseModalInclusao();           
            
          }
    
          }).catch(error=>{
            alert("Erro verificar log  ")
          })
    
  }  

  sendUpdate(){                 

   /* console.log('numero - '+this.state.number);
    if (visaRegex.test('4509 9535 6623 3704')) {       
      console.log(' visa ');
      this.setState({ 
        tipo_cartao: 'visa'
      });  
    } else if (masterRegex.test(this.state.number)) {       
      console.log(' master ');
      this.setState({ 
        tipo_cartao: 'master'
      });  
    } else {
      console.log(' nao encontrou ');
      this.setState({ 
        tipo_cartao: "vazio"
      }); 
    } */

    let cartao = creditCardType(this.state.number).filter((card) => {        
       return card.type
    });

   // console.log('bandeira - '+JSON.stringify(cartao[0].type, null, "    "));  
  /*  this.setState({ 
      tipo_cartao: card.type,
      campdesccartao: card.type,
  });  */

    const datapost = {
      numero: this.state.number,              
      nome: this.state.name,              
      data_vencimento: moment(this.state.expiry, "MM YY"),
      codigo_seguranca: this.state.cvc,      
      logid: localStorage.getItem('logid'), 
      perfilId: localStorage.getItem('logperfil'), 
      bandeira: cartao[0].type,      
      statusId: 1,     
    }               
   
    //  bandeira_cartao.getCardFlag('4509 9535 6623 3704');
    //tgdeveloper.getCardFlag('4509 9535 6623 3704')
  //      console.log('bandeira - '+JSON.stringify(formatCreditCardNumber('4509953566233704'), null, "    "));  

          api.put(`/cartao/update/${this.state.campId}`,datapost)
          .then(response=>{

            if (response.data.success == true) {          
            
             this.setState({                   
               mensagem_usuario: 'Cartão alterado com sucesso!',          
             });          
    
            this.envia_mensagemClick();    

            
            
          }
    
          }).catch(error=>{
            alert("Erro verificar log  "+ error)
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

        if (this.state.cvc !== '' && this.state.name !== '' && this.state.expiry !== '' && this.state.number !== '' ) { 
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

botao_modal_update(inicio) {
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

      if (this.state.cvc !== '' && this.state.name !== '' && this.state.expiry !== '' && this.state.number !== '') { 
          return (
      
            <Box bgcolor="text.disabled" color="background.paper" className="botoes_habilitados_modal"  p={2} onClick={()=>this.sendUpdate()}>
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

verifica_formatacao(bandeira, data) {
 
 if (bandeira == 'visa') {
    return (
      '****.****'+cartaoMask(data.numero).substring(9,data.numero.length)
    );
 } else if (bandeira == 'mastercard') {
   return (
      '****.****'+cartaoMask(data.numero).substring(9,data.numero.length)
    );
 } else if (bandeira == 'american-express') {
     return (
      '****.******.'+cartaoAmericanMask(data.numero).substring(11,data.numero.length)
      );
 } else if (bandeira == 'diners-club') {
  return (
    '****.******.'+cartaoDinersMask(data.numero).substring(11,data.numero.length)    
   );
} else if (bandeira == 'discover') {
  return (
    '****.****'+cartaoMask(data.numero).substring(9,data.numero.length)  
   );
} else if (bandeira == 'maestro') {
  return (
    '****.****'+cartaoMask(data.numero).substring(9,data.numero.length)  
   );
} else if (bandeira == 'jcb') {
  return (
    '****.****'+cartaoMask(data.numero).substring(9,data.numero.length)  
   );
}  else {
  return (
    '****.****'+cartaoMask(data.numero).substring(9,data.numero.length)
  );
}    
}

verifica_bandeira(bandeira) {

  if (bandeira == 'visa') {
     return (
      <img src='/visa.jpg' style={{ width: '40px', height: '20px' }}/>
     );
  } else if (bandeira == 'mastercard') {
    return (
      <img src='/master_card.png' style={{ width: '40px', height: '20px' }}/>
     );
  } else if (bandeira == 'discover') {
      return (
        <img src='/discover.png' style={{ width: '40px', height: '20px' }}/>
       );
  } else if (bandeira == 'diners-club') {
    return (
      <img src='/dinerrs.png' style={{ width: '40px', height: '20px' }}/>
     );
  } else if (bandeira == 'american-express') {
    return (
      <img src='/america_express.jpg' style={{ width: '40px', height: '20px' }}/>
     );
  } else if (bandeira == 'maestro') {
    return (
      <img src='/EloFundo.png' style={{ width: '40px', height: '20px' }}/>
     );
  } else if (bandeira == 'jcb') {
    return (
      <img src='/jcb.jpg' style={{ width: '40px', height: '20px' }}/>
     );
  }      

}

verifica_cartao() {
debugger;

const cartao = creditCardType(this.state.number).filter((card) => {        
  return card.type
});

if (cartao == null) {
  this.setState({                   
    validacao_cartao: false,          
  });    
  
} else {
  this.setState({                   
    validacao_cartao: true,          
  });    
}  
//const cartao = cartao[0].type

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
              <div className="titulo_bemvindo"> Cartão de Crédito </div>         
              </div>      
            </div>
            <div className="margem_left">       
    
    <div className="container-fluid">         
                    <MaterialTable          
                        title=""
                        isLoading={this.state.loading}
                        columns={[
                                               
                          { title: 'Bandeira', field: 'bandeira', width: "65px", minWidth: '65px', maxWidth: '65px', align: 'right', render: rowData =>  this.verifica_bandeira(rowData.bandeira) },                          
                          { title: '', field: '#', width: "10px", minWidth: '10px', maxWidth: '10px' },    
                          { title: 'Número', field: 'numero', width: "156px", minWidth: '156px', maxWidth: '156px', render: rowData => this.verifica_formatacao(rowData.bandeira, rowData) },  
                          { title: 'Nome', field: 'nome', width: "406px", minWidth: '406px', maxWidth: '406px' },                               
                          { title: 'Data Validade', field: 'data_vencimento', width: "156px", minWidth: '156px', maxWidth: '156px', render: rowData => dateFormat(rowData.data_vencimento, "UTC:mm/yyyy") },                            
                                            
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
                              //paginationPosition: 'bottom',  
                              searchFieldAlignment: 'left', 
                              exportFileName: 'Relatorio_empresa_convites',
                              search: true,     
                              exportAllData: true,                              
                              searchFieldVariant: 'outlined', 
                              toolbarButtonAlignment: 'right',           
                              paging: false,                                        
                              maxBodyHeight: '70vh',
                              minBodyHeight: '70vh',   
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
               <div className="titulo_moldura_modal_delecao">Deseja mesmo excluir este Cartão de Crédito? </div>
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
        ><div className="editar_titulo_inclusao"> 
        <div className="container-fluid">
             <div className="row">
               <div className="col-9 altura_titulo">
               Incluir Cartão Crédito
               </div>
               <div className="col-1">
               <IconButton aria-label="editar" onClick={()=>this.handleCloseModalInclusao()}>
              <CloseOutlinedIcon />
            </IconButton></div>                    
               </div>                    
             </div>
           </div>                 
            <div className="container_modal_alterado">
               <div className="d-flex justify-content">        
                 <div className="App-payment">  
                 <div class="d-flex flex-column espacamento_caixa_modal_cartao">              
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
                            autoComplete="off"   
                            className="cartao_campo"
                            placeholder="Número do cartao"                                                        
                          //  onBlur={this.verifica_cartao}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                            pattern="[\d| ]{16,22}" 
                            size="40"                           
                            required
                          />
                      </div>      
                      <div class="p-2">          
                      <input
                            type="text"
                            name="name"
                            size="40"  
                            autoComplete="off"   
                            className="cartao_campo"
                            placeholder="Nome" 
                            minlength="11" maxlength="33"                        
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}  
                            required                          
                          /> 
                      </div>      
                      <div class="p-2">          
                          <div className="d-flex justify-content-start">
                            <div>
                                <input
                                      type="text"
                                      name="expiry"
                                      size="20"  
                                      autoComplete="off"   
                                      className="cartao_campo data_valid"
                                      placeholder="Data validade"
                                      pattern="\d\d/\d\d"
                                      required
                                      onChange={this.handleInputChange}
                                      onFocus={this.handleInputFocus}
                                    />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  name="cvc"
                                  size="20"  
                                  autoComplete="off"   
                                  className="cartao_campo cvc_valid"
                                  placeholder="CVC"
                                  pattern="\d{3,4}"
                                  required
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                              </div>      
                            </div>   
                          </div>
                        </div>
                        {this.botao_modal(2)}     
                      </div>
                    </div>        
                 </div>
     </ReactModal>       

     <ReactModal 
        isOpen={this.state.showModalAlterar}
        style={customStyles}
        contentLabel="Inline Styles Modal Example"                                  
        ><div className="editar_titulo_inclusao"> Alterar Cartão Crédito
            <IconButton aria-label="editar" onClick={()=>this.handleCloseModalAlteracao()} className="botao_close_modal_cartao">
              <CloseOutlinedIcon />
            </IconButton></div>       
            <div className="container_alterado">
               <div className="d-flex justify-content">        
               <div className="App-payment">  
                 <div class="d-flex flex-column espacamento_caixa_modal_cartao">              
                      <div class="p-2">                        
                        <Cards
                            cvc={this.state.cvc}
                            expiry={this.state.expiry}
                            focused={this.state.focus}
                            name={this.state.name}
                            number={this.state.number}                                            
                            issuer={this.state.insuer}
                          />                          
                      </div>   
                      
                      <div class="p-2">                                   
                      <input
                            type="tel"
                            name="number"
                            readOnly={this.state.numero_disable}                            
                            className="cartao_campo"
                            autoComplete="off"   
                            placeholder="Número do cartao"                                                        
                           // onChange={this.handleInputChange}
                           // onFocus={this.handleInputFocus}
                            pattern="[\d| ]{16,22}"                            
                            value={this.state.number}
                            required
                            size="40"    
                          />
                      </div>      
                      <div class="p-2">          
                      <input
                            type="text"
                            name="name"
                            disabled={this.state.nome_disable}
                            className="cartao_campo"
                            autoComplete="off"   
                            placeholder="Nome"                         
                            value={this.state.name}
                           // onChange={this.handleInputChange}
                           // onFocus={this.handleInputFocus}  
                            required                          
                            size="40"    
                          /> 
                      </div>      
                      <div class="p-2">     
                      <div className="d-flex justify-content-start">
                            <div>     
                              <input
                                    type="text"
                                    name="expiry"
                                    autoComplete="off"   
                                    disabled={this.state.nome_disable}
                                    className="cartao_campo data_valid"
                                    placeholder="Data validade"
                                    pattern="\d\d/\d\d"
                                    value={this.state.expiry}
                                    required
                                    size="20"  
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                  />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  name="cvc"
                                  autoComplete="off"   
                                  disabled={this.state.cvc_disable}
                                  className="cartao_campo cvc_valid"
                                  placeholder="CVC"
                                  pattern="\d{3,4}"
                                  value={this.state.cvc}
                                  required
                                  size="20"  
                                //  onChange={this.handleInputChange}
                                // onFocus={this.handleInputFocus}
                                />
                              </div>     
                        </div>      
                        </div>      
                        </div>
                        {this.botao_modal_update(2)}     
                      </div>
                    </div>        
                 </div>
     </ReactModal>       
     <div className="botao_lista_incluir">
                        <Fab style={{ textTransform: 'capitalize',  outline: 'none'}} className="tamanho_botao" size="large" color="secondary" variant="extended" onClick={()=>this.handleOpenModalInclusao()}>
                            <AddIcon/> <div className="botao_incluir"> Adiciona Cartão </div>
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
  
    this.loadCartaoCliente();       
    this.handleCloseModalInclusao();      
    this.handleCloseModalAlteracao();           
  };     

  handleOpenModalInclusao () { 
    this.setState({ 
      showModalInclusao: true,
      campDescricao: '',      
    });  

    this.limpar_campos();     
    
  }
  
  handleCloseModalInclusao () {
    this.setState({ 
      showModalInclusao: false
    });
  
    this.loadCartaoCliente();      
  }


  handleOpenModalAlteracao (data) { 
    this.setState({ 
      showModalAlterar: true,
      campDescricao: '',
      numero_disable: true,
      validade_disable: false,
      nome_disable: true,
      cvc_disable: true,
    });  

    console.log('registro - '+data.id);

    this.limpar_campos();   
    this.carrega_dados_cartao_cliente(data.id);  

    
  }
  
  handleCloseModalAlteracao () {
    this.setState({ 
      showModalAlterar: false
    });
  
    this.loadCartaoCliente();  
   
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
     console.log('delete - '+userId)
    api.delete(`/cartao/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {

        this.loadCartaoCliente();
        this.handleCloseModalDelete();        
      }
    })
    .catch ( error => {
      alert("Error delete "+error)
    })
  }

}

export default CartaoCreditoComponent;
