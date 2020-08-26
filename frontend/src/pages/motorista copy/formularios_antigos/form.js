import React  from 'react';
//import { useHistory } from 'react-router-dom';
//import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Multiselect } from 'multiselect-react-dropdown';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { MDBSelect } from "mdbreact";
import {Form, Table, Input, FormFeedback, Button, Alert } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { cpfMask } from '../formatacao/cpfmask';
import { cepMask } from '../formatacao/cepmask';
import { telefoneMask } from '../formatacao/telefonemask';
import { celularMask } from '../formatacao/celularmask';
import Menu_motorista from '../motorista/menu_motorista' ;
import Menu_administrador from '../administrador/menu_administrador';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Menu from '../../pages/cabecalho' ;
import Modal from 'react-modal';
import Icon from '@material-ui/core/Icon';

//import axios from 'axios';
import api from '../../services/api';
//import { uniqueId } from "lodash";
import filesize from "filesize";
import Upload from "../Upload";
import FileList from "../Filelist";
import { Container, Content } from "../style";

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

//const baseUrl = "http://34.210.56.22:3333";
const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');  
const id = localStorage.getItem('logid');  
const perfil = localStorage.getItem('logperfil');  
const buscadorcep = require('buscadorcep');

class IncluirComponent extends React.Component{ 

  constructor(props){
   super(props);
   this.state = {
    campNome: "",
    campEmail:"",
    options: [{name: 'Inglês', id: 1},{name: 'Alemão', id: 2}, {name: 'Italiano', id: 3}, {name: 'Francês', id: 4}],
    campEmailTeste:"",
    campTelefone1:"",
    campTelefone2:"",
    campSenha:"",
    campSenhaTeste:"",
    campEndereco: "",
    campNumero: "",
    campComplemento:"",
    campCelular:"",
    campCidade:"",
    campTipo_cliente:"",
    campData_nascimento:"",
    campMotorista_bilingue: false,
    seleciona_limit: 0,
    campEstadoId:0,
    campCep:"",    
    campCpf:"",
    emailcadastrado: false,
    campCarro: "",
    campModelo: "",
    campPlaca: "",
    campAno: "",
    campCor: "",
    campBilingue: 0,
    campFoto: "",
    campIndicacao: "",
    campBanco: "",
    campAgencia: "",
    campConta: "",
    campPerfilId: 3,
    campSituacaoId: 1,
    campApolice: "",
    campSeguradoraId: 0,
    selectedValue: [],
    nome: "",   
    perfil: "",
    motoristId: 1,
    selectedFile: null,
    incluir_foto: false,
    listacarros:[],
    listaidioma:[],
    listEstados:[],
    listSeguradoras:[],
    uploadedFiles: [],
    fileFormatado: [],
    mensagem_email: '',  
    mensagem_confirma_email: '',  
    mensagem_senha: '',  
    mensagem_confirm_senha: '',  
    mensagem_cpf: '',  
    mensagem_nome: '',  
    mensagem_cep: '',  
    mensagem_endereco: '',  
    mensagem_numero: '',  
    mensagem_complemento: '',      
    mensagem_estado: '',  
    mensagem_cidade: '',  
    mensagem_bairro: '',  
    mensagem_data_nascimento: '',  
    mensagem_telefone1: '', 
    mensagem_carro: '',  
    mensagem_placa: '',  
    mensagem_cor: '',  
    mensagem_ano: '',  
    mensagem_apolice: '',  
    mensagem_seguro: '',  
    mensagem_modelo: '',  
    dado_cadastral_disabled: true,
    listEstados:[],
    validate: {
      emailState: '',
      emailtesteState: '',    
      senhaState: '',
      senhatesteState: '',      
      cpfState: '',     
      cepState: '',
      nomeState: '',      
      enderecoState: '',
      numeroState: '',     
      complementoState: '',
      bairroState: '',          
      cidadeState: '',     
      estadoState: '',     
      datanascimentoState: '',     
      telefone1State: '',             
      carroState: '',          
      modeloState: '',          
      corState: '',     
      placaState: '',     
      anoState: '',     
      apoliceState: '',     
      seguroState: '',     
    },
   }      
   this.estadoChange = this.estadoChange.bind(this);    
   this.nomeChange = this.nomeChange.bind(this);
   this.cpfchange = this.cpfchange.bind(this);
   this.data_nascimentochange = this.data_nascimentochange.bind(this);
   this.cepchange = this.cepchange.bind(this);
   this.enderecochange = this.enderecochange.bind(this);
   this.numerochange = this.numerochange.bind(this);
   this.complementochange = this.complementochange.bind(this);
   this.bairrochange = this.bairrochange.bind(this);
   this.cidadechange = this.cidadechange.bind(this);   
   this.telefone1change = this.telefone1change.bind(this);         
   this.inscricaoestadualchange = this.inscricaoestadualchange.bind(this);   
   this.inscricaomunicipalchange = this.inscricaomunicipalchange.bind(this);   
   this.razaosocialchange = this.razaosocialchange.bind(this);   
   this.nomefantasiachange = this.nomefantasiachange.bind(this);   
   this.contatochange = this.contatochange.bind(this);   
   this.handleChangeBilingue = this.handleChangeBilingue.bind(this); 
   
   this.telefone2change = this.telefone2change.bind(this);
   this.celularchange = this.celularchange.bind(this);      
   this.emailchange = this.emailchange.bind(this);
   this.emailtestechange = this.emailtestechange.bind(this);  
   this.senhachange = this.senhachange.bind(this);
   this.senhatestechange = this.senhatestechange.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.limpar = this.limpar.bind(this);
   this.limpar_endereco = this.limpar_endereco.bind(this);

   this.carroChange = this.carroChange.bind(this);
   this.modeloChange = this.modeloChange.bind(this);
   this.corChange = this.corChange.bind(this);      
   this.placaChange = this.placaChange.bind(this);
   this.anoChange = this.anoChange.bind(this);  
   this.apoliceChange = this.apoliceChange.bind(this);
   this.seguroChange = this.seguroChange.bind(this);  
   
   this.verificaEmailTeste = this.verificaEmailTeste.bind(this);   
   this.verificaEmail = this.verificaEmail.bind(this);   
   this.verificaSenha = this.verificaSenha.bind(this);  
   this.verificaSenhaTeste = this.verificaSenhaTeste.bind(this);  
   this.verificaCpf = this.verificaCpf.bind(this);  
   this.verificaNome = this.verificaNome.bind(this);  
   this.verificaCep = this.verificaCep.bind(this);  
   this.verificaEndereco = this.verificaEndereco.bind(this);  
   this.verificaNumero = this.verificaNumero.bind(this);  
   this.verificaBairro = this.verificaBairro.bind(this);  
   this.verificaCidade = this.verificaCidade.bind(this);  
   this.verificaComplemento = this.verificaComplemento.bind(this);  
   this.verificaDataNascimento = this.verificaDataNascimento.bind(this);  
   this.verificaTelefone1 = this.verificaTelefone1.bind(this);  
   this.verificaEstado = this.verificaEstado.bind(this);  

   this.verificaCarro = this.verificaCarro.bind(this);  
   this.verificaModelo = this.verificaModelo.bind(this);  
   this.verificaCor = this.verificaCor.bind(this);  
   this.verificaAno = this.verificaAno.bind(this);  
   this.verificaPlaca = this.verificaPlaca.bind(this);  
   this.verificaApolice = this.verificaApolice.bind(this);  
   this.verificaSeguro = this.verificaSeguro.bind(this);  
       
   this.validaEmailChange = this.validaEmailChange.bind(this);       
   this.validaSenhaChange = this.validaSenhaChange.bind(this);    
   this.validaSenhaTesteChange = this.validaSenhaTesteChange.bind(this);    
   this.validaCpfChange = this.validaCpfChange.bind(this);  
   this.validaNomeChange = this.validaNomeChange.bind(this);  
   this.validaCepChange = this.validaCepChange.bind(this);  
   this.validaEnderecoChange = this.validaEnderecoChange.bind(this);  
   this.validaNumeroChange = this.validaNumeroChange.bind(this);  
   this.validaBairroChange = this.validaBairroChange.bind(this);  
   this.validaCidadeChange = this.validaCidadeChange.bind(this);  
   this.validaComplementoChange = this.validaComplementoChange.bind(this);  
   this.validaEstadoChange = this.validaEstadoChange.bind(this);  
   this.validaDataNascimentoChange = this.validaDataNascimentoChange.bind(this);  
   this.validatelefone1Change = this.validatelefone1Change.bind(this);  

   this.validaCarroChange = this.validaCarroChange.bind(this);  
   this.validaModeloChange = this.validaModeloChange.bind(this);  
   this.validaCorChange = this.validaCorChange.bind(this);  
   this.validaAnoChange = this.validaAnoChange.bind(this);  
   this.validaPlacaChange = this.validaPlacaChange.bind(this);  
   this.validaApoliceChange = this.validaApoliceChange.bind(this);  
   this.validaSeguroChange = this.validaSeguroChange.bind(this);  
   
 }
 async componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),    
      nome: localStorage.getItem('lognome')
    });
    this.loadEstados()
    this.loadSeguradoras()
/*
    const response = await api.get(`/foto/motorista/get/${this.state.motoristId}`)
    .then(res=>{          
      if (res.data.data.length !== 0) { 
        this.setState({
          uploadedFiles: response.data.map(file => ({
            id: file._id,
            name: file.name,
            readableSize: filesize(file.size),
            preview: file.url,
            uploaded: true,
            url: file.url,
            motoristaId: file.motoristaId
          }))
        });
      }  
    }) */
    
 }

 estadoChange(event) {     
    this.setState({
        campEstadoId: event.target.value
    });    
 } 

 seguradoraChange(event) {     
  this.setState({
      campSeguradoraId: event.target.value
  });    
} 

limpar_endereco() {
  this.setState({ 
    campEndereco: "",
    campNumero: "",
    campComplemento:"",
    campCelular:"",
    campCidade:"",
    campEstadoId:0,
    estadoSelecionado: "",
    campCep:"",    
    campBairro:"",
    telefone_formatado1: "", 
    telefone_formatado2: "",
  });
 } 

 limpar_cnpj_nao_encontrado() {
  this.setState({ 
    campEndereco: "",
    campNumero: "",
    campComplemento:"",
    campCelular:"",
    campCidade:"",
    campEstadoId:0,
    estadoSelecionado: "",
    campCnpj:"",    
    campCep:"",    
    campBairro:"",
    telefone_formatado1: "", 
    telefone_formatado2: "",
    campInscricao_estadual:"",
    campInscricao_municipal:"",
    campNome: "",
    campNome_fantasia:"",
    campContato:"",    
    campMotorista_bilingue: false,
  });
 } 
 limpar() {   
  //this.state.campNome = "";
  this.setState({ 
   campNome: "",
   campEmail:"",
   campEmailTeste:"",
   campData_nascimento:0,
   campTelefone1:"",
   campTelefone2:"",    
   campSenha:"",
   campSenhaTeste:"",
   campEndereco: "",
   campNumero: "",
   campComplemento:"",
   campCelular:"",
   campCidade:"",
   campTipo_cliente:"",
   campEstadoId:0,
   estadoSelecionado: "",
   campModelo: "",
   campCep:"",    
   campCpf:"",   
   campBairro:"",
   telefone_formatado1: "", 
   telefone_formatado2: "",
   seleciona_limit: 0,
   showPassword: false,    
   listacarros:[],
   mensagem_nome: '',  
   mensagem_cep: '',      
   dado_cadastral_disabled: true,
   campMotorista_bilingue: false,
   validate: {
     emailState: '',
     emailtesteState: '',    
     senhaState: '',
     senhatesteState: '',      
     cpfState: '',
     nomeState: '',
     cepState: '',
     nomeState: '',      
   },
   });      
}
verificaEmail(){   
  const { validate } = this.state
  if (this.state.campEmail.length > 0) {
   
    api.get(`/login/getMotoristaEmail/${this.state.campEmail}`)
    .then(res=>{          
   
      if (res.data.data.length > 0) {
           validate.emailState = 'has-danger'
            this.setState({ 
              validate,
              mensagem_email: 'Email já cadastrado.'  
         })      

      } else {
        api.get(`/login/getClienteEmail/${this.state.campEmail}`)
        .then(res=>{                   
          if (res.data.success == true) {  
   
            if (res.data.data.length > 0) { 
   
                validate.emailState = 'has-danger'
                  this.setState({ 
                    validate,
                    mensagem_email: 'Email já cadastrado.'  
                  })                  

                //  console.log(' resultado - '+JSON.stringify(this.state, null, "    "));              
            } 
          }  
        })        
        .catch(error=>{
          alert("Error de conexão  "+error)
        })     
      }      
    })        
    .catch(error=>{
      alert("Erro de conexão"+error)
    })        
    
   
  } else {
    validate.emailState = 'has-danger'
    this.setState({ 
      validate,
      mensagem_email: 'O campo E-mail é obrigatório'  
    }) 

  }   
} 
 verificaEmailTeste(){   
  const { validate } = this.state
  if (this.state.campEmail.length > 0 && this.state.campEmailTeste.length > 0) {    
   
   if (this.state.campEmail !== this.state.campEmailTeste) {
       
      validate.emailtesteState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_confirma_email: 'Os endereços informados não são iguais.'  
      }) 

   
     
    }  else {
      validate.emailtesteState = 'has-success'
      this.setState({ 
        validate,
        mensagem_confirma_email: 'E-mail válido'  
      }) 
   
    }       
  } else {
    validate.emailtesteState = 'has-danger'
    this.setState({ 
      validate,
      mensagem_confirma_email: 'O campo Confirmar E-mail é obrigatório'  
    })    
   
  }   
} 

validateEmail(e) {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { validate } = this.state
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success'     
    } else {
      validate.emailState = 'has-danger'
    }
    this.setState({ validate })
}   

validateEmailteste(e) {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { validate } = this.state
    if (emailRex.test(e.target.value)) {
      validate.emailtesteState = 'has-success'     
    } else {
      validate.emailtesteState = 'has-danger'
    }
    this.setState({ validate })
}   

validaEmailChange = async (event) => {
const { target } = event;
const value = target.type === 'checkbox' ? target.checked : target.value;
const { name } = target;
await this.setState({
[ name ]: value,
});
}

validaSenhaChange(e) {
  const { validate } = this.state
  console.log('cpf - '+e.target.value)
  if (e.target.value !== null) {
    validate.senhaState = 'has-success'       
  } else{
    validate.senhaState = 'has-danger'
    this.setState({ mensagem_senha: 'Senha inválida' })  
  }
  this.setState({ validate })
}  
validaSenhaTesteChange(e) {
  const { validate } = this.state
  
  
    if (e.target.value !== null) {

      validate.senhatesteState = 'has-success'         
      if (this.state.campEmail == this.campEmailTeste && this.state.campSenha == this.campSenhaTeste) {
        this.setState({ 
          dado_cadastral_disabled: false
        });    
      }      
    } else{
      validate.senhatesteState = 'has-danger'
      this.setState({ mensagem_confirm_senha: 'Senha inválida' })  
    }
  this.setState({ validate })
}  
validaCpfChange(e){
  const { validate } = this.state
  
    if (e.target.value.length < 14) {
      validate.cpfState = 'has-danger'
      this.setState({ mensagem_cpf: 'CPF inválido' })  
    } else {
      validate.cpfState = 'has-success'       
    }  
    this.setState({ validate })
}

validaCepChange(e){
  const { validate } = this.state
  
    if (e.target.value.length < 8) {
      validate.cepState = 'has-danger'
      this.setState({ mensagem_cep: 'CEP inválido' })  
    } else {
      validate.cepState = 'has-success'       
    }  
    this.setState({ validate })
}

validaNomeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.nomeState = 'has-danger'
      this.setState({ mensagem_nome: 'NOME inválido' })  
    } else {
      validate.nomeState = 'has-success'       
    }  
    this.setState({ validate })  
}

validaEnderecoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.enderecoState = 'has-danger'
      this.setState({ mensagem_endereco: 'O campo Endereço é obrigatório.' })  
    } else {
      validate.enderecoState = 'has-success'       
    }  
    this.setState({ validate })
}
validaNumeroChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.numeroState = 'has-danger'
      this.setState({ mensagem_numero: 'O campo Número é obrigatório.' })  
    } else {
      validate.numeroState = 'has-success'       
    }  
    this.setState({ validate })
   
}
validaBairroChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.bairroState = 'has-danger'
      this.setState({ mensagem_bairro: 'O campo Bairro é obrigatório.' })  
    } else {
      validate.bairroState = 'has-success'       
    }  
    this.setState({ validate })
}
validaCidadeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.cidadeState = 'has-danger'
      this.setState({ mensagem_cidade: 'O campo Cidade é obrigatório.' })  
    } else {
      validate.cidadeState = 'has-success'       
    }  
    this.setState({ validate })
}
validaComplementoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.complementoState = 'has-danger'
      this.setState({ mensagem_complemento: 'O campo Complemento é obrigatório.' })  
    } else {
      validate.complementoState = 'has-success'       
    }  
    this.setState({ validate })
}
validaEstadoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.estadoState = 'has-danger'
      this.setState({ mensagem_estado: 'O campo Estado é obrigatório.' })  
    } else {
      validate.estadoState = 'has-success'       
    }  
    this.setState({ validate })
}
validaDataNascimentoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.' })  
    } else {
      validate.datanascimentoState = 'has-success'       
    }  
    this.setState({ validate })
}
validatelefone1Change(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.telefone1State = 'has-danger'
      this.setState({ mensagem_telefone1: 'O campo Telefone é obrigatório.' })  
    } else {
      validate.telefone1State = 'has-success'       
    }  
    this.setState({ validate })
}

validaCarroChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.carroState = 'has-danger'
      this.setState({ mensagem_carro: 'O campo Carro é obrigatório.' })  
    } else {
      validate.carroState = 'has-success'       
    }  
    this.setState({ validate })
}
validaModeloChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.modeloState = 'has-danger'
      this.setState({ mensagem_modelo: 'O campo Modelo é obrigatório.' })  
    } else {
      validate.modeloState = 'has-success'       
    }  
    this.setState({ validate })
}
validaCorChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.corState = 'has-danger'
      this.setState({ mensagem_cor: 'O campo Cor é obrigatório.' })  
    } else {
      validate.corState = 'has-success'       
    }  
    this.setState({ validate })
}
validaPlacaChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.placaState = 'has-danger'
      this.setState({ mensagem_placa: 'O campo Placa é obrigatório.' })  
    } else {
      validate.placaState = 'has-success'       
    }  
    this.setState({ validate })
}
validaAnoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.anoState = 'has-danger'
      this.setState({ mensagem_ano: 'O campo Ano é obrigatório.' })  
    } else {
      validate.anoState = 'has-success'       
    }  
    this.setState({ validate })
}
validaApoliceChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.apoliceState = 'has-danger'
      this.setState({ mensagem_telefone1: 'O campo Apolice é obrigatório.' })  
    } else {
      validate.apoliceState = 'has-success'       
    }  
    this.setState({ validate })
}
validaSeguroChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.seguroState = 'has-danger'
      this.setState({ mensagem_seguro: 'O campo Seguro é obrigatório.' })  
    } else {
      validate.seguroState = 'has-success'       
    }  
    this.setState({ validate })
}

handleClick() {
  const base = this.state.campCep;
  const estadoId = "";
  const { validate } = this.state

  if (base.length > 0) {
   buscadorcep(base.replace('-','')).
     then(endereco => {           
      
      api.get(`/estado/get/${endereco.uf}`)
      .then(res=>{        
        validate.enderecoState = ''  
        validate.cidadeState = ''  
        validate.bairroState = ''  
        validate.estadoState = ''  
       // console.log(JSON.stringify(res.data, null, "    "));
        if (res.data.data.length !== 0) {      
          //console.log(JSON.stringify(res.data.data.length, null, "    "));
          if (endereco.logradouro !== null) {
             validate.enderecoState = 'has-success'         
          }
          if (endereco.localidade !== null) {
            validate.cidadeState = 'has-success'
          }
          if (endereco.bairro !== null) {
            validate.bairroState = 'has-success'
          } 
          if (endereco.uf !== null) {
            validate.estadoState = 'has-success'
          }           
          
          this.setState({                    
            campCep: endereco.cep,
            campEndereco: endereco.logradouro,
            campCidade: endereco.localidade,
            campBairro: endereco.bairro,
            campEstadoId: res.data.data[0].id, // endereco.uf,           
            estado_selecionado: endereco.uf
          }); 

         // console.log(JSON.stringify(res.data, null, "    "));
        } else {  
       
          validate.cepState = 'has-danger'
          this.setState({ 
              validate,
              mensagem_cep: 'O cep não encontrado', 
              campCep: "",
              campEndereco: "",
              campCidade: "",
              campBairro: "",
              campEstadoId: 0, 
              estado_selecionado: ""
          })            

        } 
      })        
      .catch(error=>{
        alert("Error server "+error)
      })
         
         //console.log(JSON.stringify(this.state, null, "    ")); 
        // this.estadoChange = this.estadoChange.bind(this); 
      });
      
    //}
    }  else {
       this.limpar_endereco();
    }
/* 
{
  "cep": "21235-280",
  "logradouro": "Estrada do Colégio",
  "complemento": "",
  "bairro": "Colégio",
  "localidade": "Rio de Janeiro",
  "uf": "RJ",
  "unidade": "",
  "ibge": "3304557",
  "gia": ""
}*/


};

fileSelectedHandler = event => {
  this.setState({ 
     campFoto: event.target.files[0].name
  })

}
voltarlistaClick = () => {
  
  this.props.history.push('/listar'); 

}

 
habilita_botao_voltar() {
 // console.log('this.state.perfil -'+this.state.perfil);  
  if (localStorage.getItem('logperfil') == 1) {
    return (      
      <button type="button" class="btn btn-danger" onClick={this.voltarlistaClick}>VOLTAR</button>    
    );
  } 

}
/*
fileUploadHandler = () => {
  const formData = new FormData()
  formData.append(
    'myFile',
    this.state.selectedFile,
    this.state.selectedFile.name
  )

  console.log(this.state.selectedFile);
  }  */
/*  //axios.post('my-domain.com/file-upload', formData);
<button onClick={this.fileUploadHandler}>Upload</button>
}*/
seleciona(){
 // alert('imagem -'+this.state.selectedFile);
  if (this.state.campFoto === null) {
    return('../img_avatar3.png');
  } else {
    //alert('imagem - '+this.state.campFoto);
    return(this.state.campFoto);
  }
}
emailchange(e) {
  this.setState({ campEmail: e.target.value })
}
emailtestechange(e) {
  this.setState({ campEmailTeste: e.target.value })
}

handleUpload = files => {  
  
  //console.log(JSON.stringify(' uplodfiles - '+data, null, "    "));   
  const uploadedFiles = files.map(file => ({
    file,
    //id: uniqueId(),
    name: file.name,
    originalname: file.originalname,
    readableSize: filesize(file.size),
    preview: URL.createObjectURL(file),
    progress: 0,
    uploaded: false,
    error: false,
    url: file.url,
    motoristaId: 4
  }));
 
   
  this.setState({
    //uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    uploadedFiles: uploadedFiles,
    incluir_foto: true
  });

 // uploadedFiles.forEach(this.processUpload);
}
updateFile = (id, data) => {
  this.setState({
    uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
      return id === uploadedFile.id
        ? { ...uploadedFile, ...data }
        : uploadedFile;
    })
  });
};

processUpload = uploadedFile => {
  const data = new FormData();

  data.append("file", uploadedFile.file, uploadedFile.name);

 /*
  api.post("/foto/motorista", data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        this.updateFile(uploadedFile.id, {
          progress
        });
      }
    })
    .then(response => {
      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data._id,
        url: response.data.url
      });
    })
    .catch(() => {
      this.updateFile(uploadedFile.id, {
        error: true
      });
    }); */
};
fileChangedHandler = (event) => {
  this.setState({ campFoto: event.target.files[0] })
}
 render(){
  const { uploadedFiles } = this.state;
   return (
     <div>
       
       <div>
            {this.verifica_menu()}
       </div>
      <div className="container">                              
         <br/>
            <div className="form-row"> 
              <h3><strong>Dados de acesso</strong></h3>
            </div>
            <div className="form-row">                
                <div className="form-group col-md-3">                  
                  <label for="email1">Email *</label>
                  <Input         
                    type="email"
                    ref={elem => (this.textInput = elem)}
                    placeholder=""
                    value={this.state.campEmail}
                    valid={ this.state.validate.emailState === 'has-success' }
                    invalid={ this.state.validate.emailState === 'has-danger' }
                    onBlur={this.verificaEmail}
                    onChange={ (e) => {
                                this.emailchange(e) 
                                this.validateEmail(e)
                                this.validaEmailChange(e)                                
                              } }
                  />                  
                  <FormFeedback 
                  invalid={this.state.validate.emailState}>
                      {this.state.mensagem_email}
                  </FormFeedback>                               
                </div>
                <div className="form-group col-md-3">
                  <label for="emailteste">Email *</label>                  
                  <Input
                    type="email"
                    name="email2"
                    id="exampleEmail2"
                    placeholder="Confirme o seu email *"
                    value={this.state.campEmailTeste}
                    valid={ this.state.validate.emailtesteState === 'has-success' }
                    invalid={ this.state.validate.emailtesteState === 'has-danger' }
                    onBlur={this.verificaEmailTeste}
                    onChange={ (e) => {
                                this.emailtestechange(e) 
                                this.validateEmailteste(e)
                                this.validaEmailChange(e)
                              } }
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.emailtesteState}>
                       {this.state.mensagem_confirma_email}
                  </FormFeedback>                              
                </div>   
                <div className="form-group col-md-3">
                <label for="email1">Senha *</label>
                <Input
                    type="password"
                    name="email2"
                    id="exampleEmail2"
                    placeholder=""
                    value={this.state.campSenha}
                    valid={ this.state.validate.senhaState === 'has-success' }
                    invalid={ this.state.validate.senhaState === 'has-danger' }
                    onBlur={this.verificaSenha}
                    onChange={ (e) => {
                      this.senhachange(e)                       
                      this.validaSenhaChange(e)
                    }}                                     
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.senhaState}>
                       {this.state.mensagem_senha}
                  </FormFeedback>                                    
                </div>
                <div className="form-group col-md-3">
                  <label for="senhateste">Senha *</label>
                  <Input
                    type="password"
                    name="senha2"
                    id="exampleEmail2"
                    placeholder="Confirme a senha"
                    value={this.state.campSenhaTeste}
                    valid={ this.state.validate.senhatesteState === 'has-success' }
                    invalid={ this.state.validate.senhatesteState === 'has-danger' }
                    onBlur={this.verificaSenhaTeste}
                    onChange={ (e) => {
                      this.senhatestechange(e)                       
                      this.validaSenhaTesteChange(e)
                    }}                                                                          
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.senhatesteState}>
                       {this.state.mensagem_confirm_senha}
                  </FormFeedback>  
                </div>                   
            </div>   
            <div className="form-row"> 
              <h3><strong>Dados de cadastro</strong></h3>
            </div>          
            <div className="form-row">            
            <Table>
              <tr>         
                <th rowSpan="2"> 
                  <Container>
                    <Content>
                      <Upload onUpload={this.handleUpload} />
                        {!!uploadedFiles.length && (
                          <FileList files={uploadedFiles} />
                        )}
                    </Content>                
                  </Container>
                </th>
                <th colSpan="2"> 
                <label for="inputPassword4">CPF *</label>
                <Input 
                    disabled = {this.state.dado_cadastral_disabled}              
                    type="text"
                    name="cpf"
                    id="examplcpf"
                    placeholder=""
                    value={this.state.campCpf}
                    valid={ this.state.validate.cpfState === 'has-success' }
                    invalid={ this.state.validate.cpfState === 'has-danger' }
                    onBlur={this.verificaCpf}
                    onChange={ (e) => {
                      this.cpfchange(e)                       
                      this.validaCpfChange(e)
                    }}         
                    maxlength="14"                                                                 
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.cpfState}>
                       {this.state.mensagem_cpf}
                  </FormFeedback>   
                </th>
              </tr>
              <tr>              
                <th> 
                <label for="inputEmail4">Nome *</label>
                <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="nome"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campNome}
                    valid={ this.state.validate.nomeState === 'has-success' }
                    invalid={ this.state.validate.nomeState === 'has-danger' }
                    onBlur={this.verificaNome}
                    onChange={ (e) => {
                      this.nomeChange(e)                       
                      this.validaNomeChange(e)
                    }}    
                    maxlength="120"                                                                      
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.nomeState}>
                       {this.state.mensagem_nome}
                  </FormFeedback> 
                </th>            
              </tr>          
            </Table>
            </div>   
            <div className="form-row">                     
              <div className="form-group col-md-4">                    
                 <label for="inputAddress">Cep *</label>          
                 <Form inline>
                    <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="nome"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campCep}
                    valid={ this.state.validate.cepState === 'has-success' }
                    invalid={ this.state.validate.cepState === 'has-danger' }
                    onBlur={this.verificaCep}
                    onChange={ (e) => {
                      this.cepchange(e)                       
                      this.validaCepChange(e)
                    }}    
                    maxlength="9"                                                                          
                  />      
                   <button type="button" className="btn btn-primary btn-sm" onClick={this.handleClick}>  Pesquisar</button> 
                  <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">    Não sei o cep</a>                                
                  <FormFeedback 
                  invalid={this.state.validate.cepState}>
                       {this.state.mensagem_cep}
                  </FormFeedback>       
                </Form>    
              </div>                               
            </div>         
            <div className="form-row">         
                <div className="form-group col-md-4">
                <label for="inputAddress">Endereço *</label>              
                  <Input
                      disabled = {this.state.dado_cadastral_disabled}   
                      type="text"
                      name="endereco"
                      id="examplnome"
                      placeholder=""
                      value={this.state.campEndereco}
                      valid={ this.state.validate.enderecoState === 'has-success' }
                      invalid={ this.state.validate.enderecoState === 'has-danger' }
                      onBlur={this.verificaEndereco}
                      onChange={ (e) => {
                        this.enderecochange(e)                       
                        this.validaEnderecoChange(e)
                      }}           
                      maxlength="100"                                                               
                    />                                
                    <FormFeedback 
                    invalid={this.state.validate.enderecoState}>
                        {this.state.mensagem_endereco}
                    </FormFeedback>      
                </div>
                <div className="form-group col-md-4">                
                <label for="inputAddress">Número *</label>  
                <Input
                      disabled = {this.state.dado_cadastral_disabled}   
                      type="text"
                      name="numero"
                      id="examplnome"
                      placeholder=""
                      value={this.state.campNumero}
                      valid={ this.state.validate.numeroState === 'has-success' }
                      invalid={ this.state.validate.numeroState === 'has-danger' }
                      onBlur={this.verificaNumero}
                      onChange={ (e) => {
                        this.numerochange(e)                       
                        this.validaNumeroChange(e)
                      }}      
                      maxlength="15"                                                                    
                    />                                
                    <FormFeedback 
                    invalid={this.state.validate.numeroState}>
                        {this.state.mensagem_numero}
                    </FormFeedback>                   
                </div>
                <div className="form-group col-md-4">                
                  <label for="inputAddress">Complemento *</label>
                  <Input
                      disabled = {this.state.dado_cadastral_disabled}   
                      type="text"
                      name="complemento"
                      id="examplnome"
                      placeholder=""
                      value={this.state.campComplemento}
                      valid={ this.state.validate.complementoState === 'has-success' }
                      invalid={ this.state.validate.complementoState === 'has-danger' }
                      onBlur={this.verificaComplemento}
                      onChange={ (e) => {
                        this.complementochange(e)                       
                        this.validaComplementoChange(e)
                      }}          
                      maxlength="60"                                                                
                    />                                
                    <FormFeedback 
                    invalid={this.state.validate.complementoState}>
                        {this.state.mensagem_complemento}
                    </FormFeedback>                                   
                </div>
            </div>    
            <div className="form-row">         
                <div className="form-group col-md-4">
                    <label for="inputEmail4">Bairro *</label>
                    <Input
                     disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="numero"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campBairro}
                    valid={ this.state.validate.bairroState === 'has-success' }
                    invalid={ this.state.validate.bairroState === 'has-danger' }
                    onBlur={this.verificaBairro}
                    onChange={ (e) => {
                      this.bairrochange(e)                       
                      this.validaBairroChange(e)
                    }}                                                                          
                    maxlength="75"
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.bairroState}>
                       {this.state.mensagem_bairro}
                  </FormFeedback>                      
                </div>               
                <div className="form-group col-md-4">
                  <label for="inputAddress">Cidade *</label>
                  <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="numero"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campCidade}
                    valid={ this.state.validate.cidadeState === 'has-success' }
                    invalid={ this.state.validate.cidadeState === 'has-danger' }
                    onBlur={this.verificaCidade}
                    onChange={ (e) => {
                      this.cidadechange(e)                       
                      this.validaCidadeChange(e)
                    }}            
                    maxlength="50"                                                              
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.cidadeState}>
                       {this.state.mensagem_cidade}
                  </FormFeedback>                     
                </div>
                <div className="form-group col-md-4">                
                <label>Estado *</label>
                <Input 
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="select" 
                    name="select" 
                    id="exampleSelect" 
                    value={this.state.campEstadoId}
                    valid={ this.state.validate.estadoState === 'has-success' }
                    invalid={ this.state.validate.estadoState === 'has-danger' }
                    onBlur={this.verificaEstado}
                    onChange={ (e) => {
                      this.estadoChange(e)                       
                      this.validaEstadoChange(e)
                    }}>
                     <option selected>Selecione o estado</option>               
                    {this.loadFillData()}                   
                </Input>
                <FormFeedback 
                  invalid={this.state.validate.estadoState}>
                       {this.state.mensagem_estado}
                </FormFeedback>                                       
                </div>
            </div>  
            <div className="form-row">         
              <div className="form-group col-md-3">
                  <label for="inputEmail4">Data de Nascimento *</label>
                  <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="date"
                    name="senha2"
                    id="exampleEmail2"                    
                    placeholder=""
                    value={this.state.campData_nascimento}
                    valid={ this.state.validate.datanascimentoState === 'has-success' }
                    invalid={ this.state.validate.datanascimentoState === 'has-danger' }
                    onBlur={this.verificaDataNascimento}
                    onChange={ (e) => {
                      this.data_nascimentochange(e)                       
                      this.validaDataNascimentoChange(e)
                    }}                
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.datanascimentoState}>
                       {this.state.mensagem_data_nascimento}
                  </FormFeedback>  
              </div>
              <div className="form-group col-md-3">
                  <label for="inputEmail4">Telefone1 *</label>
                  <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="senha2"
                    id="exampleEmail2"
                    placeholder=""
                    value={this.state.campTelefone1}
                    valid={ this.state.validate.telefone1State === 'has-success' }
                    invalid={ this.state.validate.telefone1State === 'has-danger' }
                    onBlur={this.verificaTelefone1}
                    onChange={ (e) => {
                      this.telefone1change(e)                       
                      this.validatelefone1Change(e)
                    }}                
                    maxlength="16"                                                          
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.telefone1State}>
                       {this.state.mensagem_telefone1}
                  </FormFeedback>                  
              </div>
              <div className="form-group col-md-3">
                <label for="inputAddress">Telefone2 </label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campTelefone2} onChange={this.telefone2change} />
              </div>
              <div className="form-group col-md-3">
                <label for="inputAddress">Celular </label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campCelular} onChange={this.celularchange} />
              </div>           
            </div>    
            <div className="form-row">         
                 <div className="form-group col-md-2">  
                        <label for="inputEmail4">Carro *</label>
                          <Input                         
                          type="text"
                          name="nome"
                          id="examplnome"
                          placeholder=""
                          value={this.state.campCarro}
                          valid={ this.state.validate.carroState === 'has-success' }
                          invalid={ this.state.validate.carroState === 'has-danger' }
                          onBlur={this.verificaCarro}
                          onChange={ (e) => {
                            this.carroChange(e)                       
                            this.validaCarroChange(e)
                          }}    
                          maxlength="120"                                                                      
                        />                                
                        <FormFeedback 
                        invalid={this.state.validate.carroState}>
                            {this.state.mensagem_carro}
                        </FormFeedback>   
                     </div>  
                     <div className="form-group col-md-2">  
                        <label for="inputEmail4">Modelo *</label>
                          <Input                         
                          type="text"
                          name="modelo"
                          id="examplnome"
                          placeholder=""
                          value={this.state.campModelo}
                          valid={ this.state.validate.modeloState === 'has-success' }
                          invalid={ this.state.validate.modeloState === 'has-danger' }
                          onBlur={this.verificaModelo}
                          onChange={ (e) => {
                            this.modeloChange(e)                       
                            this.validaModeloChange(e)
                          }}    
                          maxlength="120"                                                                      
                        />                                
                        <FormFeedback 
                        invalid={this.state.validate.modeloState}>
                            {this.state.mensagem_modelo}
                        </FormFeedback>   
                     </div>  
                     <div className="form-group col-md-2">
                      <label for="inputAddress">Placa *</label>
                      <Input                    
                        type="text"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        value={this.state.campPlaca}
                        valid={ this.state.validate.placaState === 'has-success' }
                        invalid={ this.state.validate.placaState === 'has-danger' }
                        onBlur={this.verificaPlaca}
                        onChange={ (e) => {
                          this.placaChange(e)                       
                          this.validaPlacaChange(e)
                        }}    
                        maxlength="20"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.placaState}>
                          {this.state.mensagem_placa}
                      </FormFeedback>                  
                    </div>
                    <div className="form-group col-md-3">
                      <label for="inputAddress">Cor *</label>
                      <Input                    
                        type="text"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        value={this.state.campCor}
                        valid={ this.state.validate.corState === 'has-success' }
                        invalid={ this.state.validate.corState === 'has-danger' }
                        onBlur={this.verificaCor}
                        onChange={ (e) => {
                          this.corChange(e)                       
                          this.validaCorChange(e)
                        }}    
                        maxlength="20"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.corState}>
                          {this.state.mensagem_cor}
                      </FormFeedback>                   
                    </div>
                    <div className="form-group col-md-3">
                      <label for="inputAddress">Ano *</label>
                      <Input              
                        type="text"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        value={this.state.campAno}
                        valid={ this.state.validate.anoState === 'has-success' }
                        invalid={ this.state.validate.anoState === 'has-danger' }
                        onBlur={this.verificaAno}
                        onChange={ (e) => {
                          this.anoChange(e)                       
                          this.validaAnoChange(e)
                        }}    
                        maxlength="4"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.anoState}>
                          {this.state.mensagem_ano}
                      </FormFeedback>                   
                </div>                                   
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label for="inputAddress">Número Apólice *</label>
                <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="nome"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campApolice}
                    valid={ this.state.validate.apoliceState === 'has-success' }
                    invalid={ this.state.validate.apoliceState === 'has-danger' }
                    onBlur={this.verificaApolice}
                    onChange={ (e) => {
                      this.apoliceChange(e)                       
                      this.validaApoliceChange(e)
                    }}    
                    maxlength="10"                                                                      
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.apoliceState}>
                       {this.state.mensagem_apolice}
                  </FormFeedback>      
              </div>         
              <div className="form-group col-md-3">
                <label for="inputAddress">Seguradora *</label>
                <Input 
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="select" 
                    name="select" 
                    id="exampleSelect" 
                    value={this.state.campSeguradoraId}
                    valid={ this.state.validate.seguroState === 'has-success' }
                    invalid={ this.state.validate.seguroState === 'has-danger' }
                    onBlur={this.verificaSeguro}
                    onChange={ (e) => {
                      this.seguradoraChange(e)                       
                      this.validaSeguroChange(e)
                    }}                                                          >
                     <option selected>Selecione a seguradora</option>               
                     {this.loadSeguradorasData()}      
                </Input>
                <FormFeedback 
                  invalid={this.state.validate.seguroState}>
                       {this.state.mensagem_seguro}
                </FormFeedback>                           
              </div>    
              <div className="form-group col-md-3">    
              <FormControlLabel
                        value={this.state.campMotorista_bilingue}
                        control={<Switch color="primary" />}
                        label="Motorista Belingue?"
                        labelPlacement="start"
                        onChange={this.handleChangeBilingue}
                    />      
              </div>
              <div className="form-group col-md-3">    
                <label for="inputAddress">Selecione o idioma *</label>   
                <Multiselect                      
                      options={this.state.options} // Options to display in the dropdown
                      selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                      onSelect={this.onSelect} // Function will trigger on select event
                      onRemove={this.onRemove} // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                      selectionLimit={this.state.seleciona_limit}
                      />                      
            </div>  
         </div>
            <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Cadastrar</button>                
            {this.habilita_botao_voltar()}              
    </div>    
    <br/>
    <br/>
    <br/>
    </div>
   );
 }


 
 
 loadFillData(){
  
  return this.state.listEstados.map((data)=>{          
    return(
      <option key={data.nome} value={data.id}>{data.nome} </option>
    )
  })

  // var users = [];   
  //console.log('Estado - '+this.state.campEstadoId); 

 }

 loadSeguradorasData(){
  
  return this.state.listSeguradoras.map((data)=>{          
    return(
      <option key={data.nome} value={data.id}>{data.nome} </option>
    )
  })

  // var users = [];   
  //console.log('Estado - '+this.state.campEstadoId); 

 }
 

 loadEstados(){
  
  //const baseUrl = "http://34.210.56.22:3333"
  //const url = baseUrl+"/estado/list"
  api.get('/estado/list')
  .then(res=>{
    if (res.data.success) {
      const data = res.data.data
      this.setState({listEstados:data})
    }
    else {
      alert("Error web service")
    }
  })
  .catch(error=>{
    alert("Error server "+error)
  })

 }  

 loadSeguradoras(){
  
  //const baseUrl = "http://34.210.56.22:3333"
  //const url = baseUrl+"/seguradora/list"
  api.get('/seguradora/list')
  .then(res=>{
    if (res.data.success) {
      const data = res.data.data
      this.setState({listSeguradoras:data})
    }
    else {
      alert("Erro de conexão")
    }
  })
  .catch(error=>{
    alert("Error server "+error)
  })

 }  

 sendSave(){   
  const { validate } = this.state

      if (this.state.campEmail=="") {      
        //alert("Digite o campo de email")
        validate.emailState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_email: 'O campo Email é obrigatório'  
        })   

    } else if (this.state.campEmail.length == 0) {  
        validate.emailState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_email: 'O campo Email é obrigatório'  
        })   
    } else if (this.state.campEmailTeste.length == 0) {  
      validate.emailtesteState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_confirma_email: 'O campo Confirmação de Email é obrigatório'  
      })                                  
    } else if (this.state.campSenha=="") {
      //alert("Digite o campo de telefone")
      validate.senhaState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_senha: 'O campo Senha é obrigatório'  
      })                                  
    } else if (this.state.campSenhaTeste.length == 0) {  
      validate.senhatesteState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_confirm_senha: 'O campo Confirmação de Senha é obrigatório'  
      })                                 
          
    }       
    else if (this.state.campEmail !== this.state.campEmailTeste) {  
      validate.emailState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_email: 'Os endereços informados não são iguais.'  
      })                                  
    } 
    else if (this.state.campSenha !== this.state.campSenhaTeste) {  
      validate.senhaState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_senha: 'As senhas informadas não são iguais.'  
      })                            
    } 
    else if (this.state.campCpf=="") {
        //alert("Digite o campo de nome")
        validate.cpfState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_cpf: 'O campo CPF é obrigatório'  
          })                                  
    }       
    else if (this.state.campNome=="") {
      //alert("Digite o campo de nome")
      validate.nomeState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_nome: 'O campo Nome é obrigatório'  
      })     
    }          
    else if (this.state.campCep=="") {
      //alert("Digite o campo de endereço")
      validate.cepState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_cep: 'O campo Cep é obrigatório'  
      })     
    }
    else if (this.state.campEndereco=="") {
    //alert("Digite o campo de endereço")
    validate.enderecoState = 'has-danger'
    this.setState({ 
      validate,
      mensagem_endereco: 'O campo Endereço é obrigatório'  
    })     
    } else if (this.state.campNumero=="") {
        //alert("Digite o campo de endereço")
        validate.numeroState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_numero: 'O campo Número é obrigatório'  
        })     
      } 
      else if (this.state.campComplemento=="") {
      //alert("Digite o campo de endereço")
        validate.complementoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_complemento: 'O campo Complemento é obrigatório'  
        })     
      }
      else if (this.state.campBairro=="") {
        //alert("Digite o campo de endereço")
        validate.bairroState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_bairro: 'O campo Bairro é obrigatório'  
        })     
      }
      else if (this.state.campCidade=="") {
        //alert("Digite o campo de nome")
        validate.cidadeState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_cidade: 'O campo Cidade é obrigatório'  
        })     
    } else if (this.state.campEstadoId == 0) {
      //alert("Digite o campo de endereço")
        validate.estadoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_estado: 'O campo Estado é obrigatório'  
        })     
    } else if (this.state.campData_nascimento == 0) {
      //alert("Digite o campo de endereço")
      validate.datanascimentoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório'  
      })     

    }  
    else if (this.state.campTelefone1=="") {
        //alert("Digite o campo de telefone")
      validate.telefone1State = 'has-danger'
      this.setState({ 
        validate,
        mensagem_telefone1: 'O campo Telefone é obrigatório'  
      })                       
    } else if (this.state.campCarro=="") {
        //alert("Digite o campo de telefone")
        validate.carroState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_carro: 'O campo Carro é obrigatório'  
        })                       
      }        
    else if (this.state.campModelo=="") {
      //alert("Digite o campo de telefone")
      validate.carroState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_modelo: 'O campo Modelo é obrigatório'  
      })                       
    }              
      else if (this.state.campPlaca=="") {
        //alert("Digite o campo de telefone")
        validate.placaState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_placa: 'O campo Placa é obrigatório'  
        })                       
    } 
    else if (this.state.campCor=="") {
          //alert("Digite o campo de telefone")
        validate.corState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_cor: 'O campo Cor é obrigatório'  
        })                       
    } 
    else if (this.state.campAno=="") {
            //alert("Digite o campo de telefone")
            validate.anoState = 'has-danger'
            this.setState({ 
              validate,
              mensagem_ano: 'O campo Ano é obrigatório'  
              })                       
    }
    else if (this.state.campApolice == "") {
      validate.apoliceState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_apolice: 'O campo Apolice é obrigatório'  
      })                       
    }
    else if (this.state.campSeguradoraId == 0) {
          //alert("Digite o campo de telefone")
          validate.seguroState = 'has-danger'
          this.setState({ 
            validate,
            mensagem_seguro: 'O campo Seguradora é obrigatório'  
          })                       
      }     
      else {              
        
       //console.log( JSON.stringify(this.state.uploadedFiles, null, "    ") ); 
        // parametros de datos post
        const datapost = {
          nome: this.state.campNome, 
          email: this.state.campEmail, 
          endereco: this.state.campEndereco, 
          numero: this.state.campNumero, 
          telefone1: this.state.campTelefone1,
          telefone2: this.state.campTelefone2, 
          senha: this.state.campSenha, 
          complemento: this.state.campComplemento,  
          celular: this.state.campCelular, 
          cidade: this.state.campCidade,
          bairro: this.state.campBairro, 
          estadoId: this.state.campEstadoId, 
          cep: this.state.campCep, 
          cpf: this.state.campCpf, 
          data_nascimento: this.state.campData_nascimento, 
          carro: this.state.campCarro, 
          modelo: this.state.campModelo, 
          placa: this.state.campPlaca,
          ano: this.state.campAno, 
          cor: this.state.campCor, 
          bilingue: this.state.campBilingue, 
          indicacao: this.state.campIndicacao, 
          situacaoId: this.state.campSituacaoId, 
          perfilId: this.state.campPerfilId,
          apolice: this.state.campApolice,
          seguradoraId: this.state.campSeguradoraId,     
          idioma1: this.state.selectedValue[0],     
          idioma1: this.state.selectedValue[1]
        }               
        
        // const data = this.state.fileFormatado
         console.log( JSON.stringify(datapost, null, "    ") ); 
        api.post("/motorista/create", datapost)
        .then(response=>{
          if (response.data.success===true) {    
          // alert(response.data.message)   

          if (this.state.incluir_foto) {

              const formData = new FormData();          

              formData.append("file", this.state.uploadedFiles[0].file, this.state.uploadedFiles[0].name)                   
              formData.append('motoristaid', response.data.data.id);              
              
              //const cpUpload = upload.fields([{ name: 'file', file: this.state.uploadedFiles[0].file, name: this.state.uploadedFiles[0].name },
              // { name: 'body', id: response.data.data.id }])
              api.post("/foto/create", formData)
                .then(response => {
                  this.updateFile(this.state.uploadedFiles[0].id, {
                    uploaded: true,
                    id: response.data._id,
                    url: response.data.url
                  });
                })
                .catch(() => {
                  this.updateFile(this.state.uploadedFiles[0].id, {
                    error: true
                  });
                }); 
            }

            Swal.fire(
              'Mensagem',
              'incluiu os dados com sucesso',
              'success'
            )

            localStorage.setItem('logemail', response.data.data.email);            
            localStorage.setItem('lognome', response.data.data.nome);
            localStorage.setItem('logid', response.data.data.id);

            if (this.state.perfil == 1) {
              this.props.history.push('/listar');
            } else {
              this.props.history.push('/area_motorista');
            }
            
          }
          else {
            Swal.fire(
              'Mensagem',
              'Erro na conexão com o banco de dados',
              'error'
            )
          }
        }).catch(error=>{
          Swal.fire(
            'Mensagem',
            'Erro na conexão com o banco de dados',
            'error'
          )
         })

      }
  
    } 
}

export default IncluirComponent;
