import React from 'react';
import {Form, Input, FormFeedback, Select } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';

import DateFnsUtils from '@date-io/date-fns';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { cpfMask } from '../formatacao/cpfmask';
import { cepMask } from '../formatacao/cepmask';
import { cnpjMask } from '../formatacao/cnpjmask';
import { cnpjremoveMask } from '../formatacao/cnpjremovemask';
import { telefoneMask } from '../formatacao/telefonemask';
import { celularMask } from '../formatacao/celularmask';
import Menu_cliente from '../cliente/menu_cliente' ;
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';
import api from '../../services/api';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');  
const id = localStorage.getItem('logid');  
const perfil = localStorage.getItem('logperfil');
const buscadorcep = require('buscadorcep');
const Email_cliente = require('../../pages/email');
const dateFormat = require('dateformat');
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

class editComponent extends React.Component{ 

  constructor(props){
   super(props);
   
   this.state = {
    campNome: "",
    campEmail:"",
    campEmailTeste:"",
    campData_nascimento:"",
    campTelefone1:"",
    campTelefone2:"",
    campSenha:"",
    campBairro:"",
    campSenhaTeste:"",
    campEndereco: "",
    campComplemento:"",
    campNumero:"",
    campCelular:"",
    campCidade:"",
    campTipo_cliente:"",
    campEstadoId:0,
    estadoSelecionado: "",
    campCep:"",    
    campCpf:"",
    campCnpj:"",
    campInscricao_estadual:"",
    campInscricao_municipal:"",
    campNome_fantasia:"",
    campContato:"",
    campPerfilId:2,
    campSituacaoId:1,
    telefone_formatado1: "", 
    telefone_formatado2: "",
    emailcadastrado: false,
    nome: "",
    perfil: "",
    open: false,
    selectedOption: null,
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
    mensagem_CNPJ: '',      
    mensagem_inscricao_estadual: '',  
    mensagem_inscricao_municiapl: '',  
    mensagem_razao_social: '',  
    mensagem_nome_fantasia: '',  
    mensagem_contato: '',   
    senha_administrador: false, // não pode ver 
    dado_cadastral_disabled: false,
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
      cnpjState: '',     
      inscricao_estadualState: '',     
      inscricao_municipalState: '',     
      razao_socialState: '',     
      nome_fantasiaState: '',     
      contatoState: '',     
    },
   }      
   this.estadoChange = this.estadoChange.bind(this); 
   //this.selecaoestadoChange = this.selecaoestadoChange.bind(this); 
   this.cpfchange = this.cpfchange.bind(this);
   this.data_nascimentochange = this.data_nascimentochange.bind(this);
   this.cepchange = this.cepchange.bind(this);
   this.enderecochange = this.enderecochange.bind(this);
   this.numerochange = this.numerochange.bind(this);
   this.complementochange = this.complementochange.bind(this);
   this.bairrochange = this.bairrochange.bind(this);
   this.cidadechange = this.cidadechange.bind(this);   
   this.telefone1change = this.telefone1change.bind(this);   
   this.cnpjchange = this.cnpjchange.bind(this);   
   this.inscricaoestadualchange = this.inscricaoestadualchange.bind(this);   
   this.inscricaomunicipalchange = this.inscricaomunicipalchange.bind(this);   
   this.razaosocialchange = this.razaosocialchange.bind(this);   
   this.nomefantasiachange = this.nomefantasiachange.bind(this);   
   this.contatochange = this.contatochange.bind(this);   

   this.verifica_telefone1change = this.telefone1change.bind(this);
   this.telefone2change = this.telefone2change.bind(this);
   this.celularchange = this.celularchange.bind(this);   
   this.fisicachange = this.fisicachange.bind(this);
   this.juridicachange = this.juridicachange.bind(this);   
   this.emailchange = this.emailchange.bind(this);
   this.emailtestechange = this.emailtestechange.bind(this);  
   this.senhachange = this.senhachange.bind(this);
   this.senhatestechange = this.senhatestechange.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.limpar = this.limpar.bind(this);
   this.limpar_endereco = this.limpar_endereco.bind(this);
   this.limpar_cnpj_nao_encontrado = this.limpar_cnpj_nao_encontrado.bind(this);
   this.loadcnpj = this.loadcnpj.bind(this);   
   this.realizarConsulta = this.realizarConsulta.bind(this);      
   
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

   this.verificacnpj = this.verificacnpj.bind(this);   
   this.verificainscricaoestadual = this.verificainscricaoestadual.bind(this);   
   this.verificainscricaomunicipal = this.verificainscricaomunicipal.bind(this);   
   this.verificarazaosocial = this.verificarazaosocial.bind(this);   
   this.verificanomefantasia = this.verificanomefantasia.bind(this);   
   this.verificacontato = this.verificacontato.bind(this);   
  
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
   this.validatecnpjChange = this.validatecnpjChange.bind(this);   
   this.validateinscricaoestadualChange = this.validateinscricaoestadualChange.bind(this);   
   this.validateinscricaomunicipalChange = this.validateinscricaomunicipalChange.bind(this);   
   this.validaterazaosocialChange = this.validaterazaosocialChange.bind(this);   
   this.validatenomefantasiaChange = this.validatenomefantasiaChange.bind(this);   
   this.validatecontatoChange = this.validatecontatoChange.bind(this);   


   this.verifica_administrador = this.verifica_administrador.bind(this);   

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
    campCep:"",    
    campCpf:"",
    campCnpj:"",
    campInscricao_estadual:"",
    campInscricao_municipal:"",
    campNome_fantasia:"",
    campContato:"",    
    campBairro:"",
    telefone_formatado1: "", 
    telefone_formatado2: "",
    showPassword: false,    
    mensagem_nome: '',  
    mensagem_cep: '',      
    senha_administrador: false,
    dado_cadastral_disabled: false,
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
 componentDidMount(){
  //console.log('entrou componentDidMount');
  // parametro de id del usuario
  this.setState({
    perfil: localStorage.getItem('logperfil'),
    nome: localStorage.getItem('lognome')}
  );


  if (this.state.perfil == 1) {
    this.setState({ senha_administrador: true});
  } else if (this.state.nome == null){  
    this.setState({ senha_administrador: false })
  } else {
    this.setState({ senha_administrador: false })
  }  

  this.verifica_menu();
  this.loadEstados();

  let userId = this.props.match.params.id;

  //console.log('user id - '+userId);
  // http://localhost:3000/employee/get/4
  //const url = baseUrl+"/cliente/get/"+userId
  //console.log('baseURL- '+url);

  api.get(`/cliente/get/${userId}`)
  .then(res=>{
    if (res.data.success) {
      const data = res.data.data[0]
     // console.log( JSON.stringify(data, null, "    ") );        
     // var date = new Date(data.data_nascimento);                        
      //alert('date - '+data);        
      //alert('date2 - '+date.toLocaleDateString());        
      //console.log( JSON.stringify(data, null, "    ") );
      this.setState({
        dataCliente:data,
        campNome: data.nome,              
        campEmail: data.email,
        campEmailTeste: data.email,
        campSenha: data.senha,
        campSenhaTeste: data.senha,
        campEndereco: data.endereco,
        campNumero: data.numero,
        campData_nascimento: dateFormat(data.data_nascimento, "yyyy-mm-dd"),
        campComplemento: data.complemento,
        campTelefone1: data.telefone1,
        campTelefone2: data.telefone2,
        campCelular: data.celular,
        campCidade: data.cidade,
        campBairro: data.bairro,
        campEstadoId: data.estadoId,
        campCep: data.cep,
        campTipo_cliente: data.tipo_cliente,
        campCpf: data.cpf,
        campContato: data.contato,
        campCnpj: data.cnpj,
        campInscricao_estadual: data.inscricao_estadual,
        campNome_fantasia: data.nome_fantasia
      })        
      console.log( JSON.stringify(this.state, null, "    ") );        
    
    }
    else {
      alert("Error na conexão com o banco")
    }
  })
  .catch(error=>{
    alert("Error server "+error)
  })

}
 
onOpenModal = () => {
  this.setState({ open: true });
};

onCloseModal = () => {
  this.setState({ open: false });
};

nomechange(event) {     
  this.setState({        
      campNome: event.target.value
  });    
} 

 estadoChange(event) {     
    this.setState({        
        campEstadoId: event.target.value
    });    
 } 

 verificaCpf() {
  const { validate } = this.state
     if (this.state.campCpf.length == 0) {
      validate.cpfState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_cpf: 'O campo CPF é obrigatório'  
       })      
     }      
 }

 verificaNome() {
  const { validate } = this.state
     if (this.state.campNome.length == 0) {
      validate.nomeState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_nome: 'O campo nome é obrigatório.'  
       })      
     }      
 }

 verificaCep() {
  const { validate } = this.state
     if (this.state.campCep.length == 0) {
      validate.cepState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_cep: 'O campo CEP é obrigatório.'  
       })      
     }      
 }

 verificaNumero() {
  const { validate } = this.state
     if (this.state.campNumero.length == 0) {
      validate.numeroState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_numero: 'O campo Numero do Endereço é obrigatório.'  
       })      
     }      
 }

 verificaComplemento() {
  const { validate } = this.state
     if (this.state.campComplemento.length == 0) {
      validate.complementoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_complemento: 'O campo Complemento do Endereço é obrigatório.'  
       })      
     }      
 }

 verificaBairro() {
  const { validate } = this.state
     if (this.state.campBairro.length == 0) {
      validate.bairroState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_bairro: 'O campo Bairro do Endereço é obrigatório.'  
       })      
     }      
 }
 verificaCidade() {
  const { validate } = this.state
     if (this.state.campCidade.length == 0) {
      validate.cidadeState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_cidade: 'O campo cidade do Endereço é obrigatório.'  
       })      
     }      
 }
 verificaEndereco() {
  const { validate } = this.state
     if (this.state.campEndereco.length == 0) {
      validate.enderecoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_endereco: 'O campo Endereço é obrigatório.'  
       })      
     }      
 }
 verificaDataNascimento() {
  const { validate } = this.state
     if (this.state.campData_nascimento.length == 0) {
      validate.datanascimentoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_data_nascimento: 'O campo Data de Nascimento é obrigatório.'  
       })      
     }      
 }
 verificaTelefone1() {
  const { validate } = this.state
     if (this.state.campTelefone1.length == 0) {
      validate.telefone1State = 'has-danger'
      this.setState({ 
        validate,
        mensagem_telefone1: 'O campo Telefone é obrigatório'  
       })      
     }      
 }
 verificaEstado() {
  const { validate } = this.state
    
     if (this.state.campEstadoId == 0) {

      validate.estadoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_estado: 'O campo Estado é obrigatório'  
       })      
     } else if (this.state.campEstadoId == "Selecione o estado") {
      validate.estadoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_estado: 'O campo Estado é obrigatório'  
       })      
     }     
 }

 verificacnpj() {
  const { validate } = this.state
    
     if (this.state.campCnpj == 0) {

      validate.cnpjState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_CNPJ: 'O campo CNPJ é obrigatório'  
       })      
     }     
 }
 verificainscricaoestadual() {
  const { validate } = this.state
    
     if (this.state.campInscricao_estadual == 0) {

      validate.inscricao_estadualState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_inscricao_estadual: 'O campo Inscrição Estadual é obrigatório'  
       })      
     }     
 }
 verificainscricaomunicipal() {
  const { validate } = this.state
    
     if (this.state.campInscricao_municipal == 0) {

      validate.inscricao_municipalState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_inscricao_municiapl: 'O campo Inscrição Municipal é obrigatório'  
       })      
     }     
 }
 verificarazaosocial() {
  const { validate } = this.state
    
     if (this.state.campNome == 0) {

      validate.razao_socialState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_razao_social: 'O campo Razão Social é obrigatório'  
       })      
     }     
 }
 verificanomefantasia() {
  const { validate } = this.state
    
     if (this.state.campNome_fantasia == 0) {

      validate.nome_fantasiaState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_nome_fantasia: 'O campo Nome Fantasia é obrigatório'  
       })      
     }     
 }
 verificacontato() {
  const { validate } = this.state
    
     if (this.state.campContato == 0) {

      validate.contatoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_contato: 'O campo Contato é obrigatório'  
       })      
     }     
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
          alert("Error server 3 "+error)
        })     
      }      
    })        
    .catch(error=>{
      alert("Error server 2"+error)
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

verificaSenha(event){
  const { validate } = this.state
  if (this.state.campSenha.length > 0) { 
   // alert('verificasenha');     
 
     this.setState({ campSenha: event.target.value});  
     
  } else {
         validate.senhaState = 'has-danger'
         this.setState({ 
             validate,
             mensagem_senha: 'O campo Senha é obrigatório'  
       }) 
                 
  }
 } 
verificaSenhaTeste(event){
const { validate } = this.state
if (this.state.campEmail.length > 0 && this.state.campEmailTeste.length > 0) {
  this.setState({ 
    dado_cadastral_disabled: false
  });    
 
  if (this.state.campSenhaTeste.length > 0) { 
    // alert('verificasenha');
      if (this.state.campSenha !== this.state.campSenhaTeste) {  
            
          validate.senhatesteState = 'has-danger'
            this.setState({ 
              validate,
              mensagem_confirm_senha: 'As senhas informadas não são iguais.'  
            }) 

      } else {
        
        api.get(`/login/get/${this.state.campEmail}/${this.state.campSenha}`)
        .then(res=>{                
          
          if (res.data.data.length > 0) {   
    
            validate.senhatesteState = 'has-danger'
            this.setState({ 
              validate,
              mensagem_confirm_senha: 'Email e senha já cadastrada.'  
            }) 
          } 
        })        
        .catch(error=>{
          alert("erro de conexao "+error)
        })

        this.setState({ campSenhaTeste: event.target.value});  
      } 
      if (this.state.campSenha == this.state.campSenhaTeste && this.state.campEmail == this.state.campEmailTeste) {   
        this.setState({ 
          dado_cadastral_disabled: false
        });    
      } 
      
  } else {

          validate.senhatesteState = 'has-danger'
          this.setState({ 
              validate,
              mensagem_confirm_senha: 'O campo Senha é obrigatório'  
        }) 
                  
  }
} 
} 
verifica_tipo() {
  // alert('pessoa - '+this.state.campTipo_cliente);
   if (this.state.campTipo_cliente == 'F' ) {
    return (
      "FÍSICA"
      );
    } else {
      return (
         "JURÍDICA"
      );
    }
 } 
verifica_administrador() {
  console.log('verifica_administrador - '+this.state.perfil)
 
}  

verifica_menu() {

  if (this.state.perfil == 1) {
    return ( 
      <div>
          <Menu_administrador /> 
          <br/>
          <div>
            <center> <strong><h3>PESSOA {this.verifica_tipo()}</h3></strong></center>
          </div>
       </div>   
     ); 
  } else if (this.state.nome == null){
      return (
        <Menu />
      );

  } else {
    return (
      <div> 
          <Menu_cliente />  
        <br/>
        <div>
          <center> <strong><h3>PESSOA {this.verifica_tipo()}</h3></strong></center>
        </div>
       </div>   
    );
   }           
}

cpfchange(e) {
  this.setState({ campCpf: cpfMask(e.target.value) })
}

senhachange(e) {
  this.setState({ campSenha: e.target.value })
}

senhatestechange(e) {
  this.setState({ campSenhaTeste: e.target.value })
}

cnpjchange(e) {
  this.setState({ campCnpj: cnpjMask(e.target.value) })

}
inscricaoestadualchange(e) {
  this.setState({ campInscricao_estadual: e.target.value })

}
inscricaomunicipalchange(e) {
  this.setState({ campInscricao_municipal: e.target.value })
}
razaosocialchange(e) {
  this.setState({ campNome: e.target.value })
}
nomefantasiachange(e) {
  this.setState({ campNome_fantasia: e.target.value })
}
contatochange(e) {
  this.setState({ campContato: e.target.value })
}

data_nascimentochange(e) {
  this.setState({ campData_nascimento: e.target.value })
}

cepchange(e) {
  this.setState({ campCep: cepMask(e.target.value) })
}

telefone1change(e) {
  this.setState({ campTelefone1: telefoneMask(e.target.value) })
}

enderecochange(e) {
  this.setState({ campEndereco: e.target.value })
}

numerochange(e) {
  this.setState({ campNumero: e.target.value })
}
complementochange(e) {
  this.setState({ campComplemento: e.target.value })
}
bairrochange(e) {
  this.setState({ campbairro: e.target.value })
}
cidadechange(e) {
  this.setState({ campCidade: e.target.value })
}

telefone2change(e) {
  this.setState({ campTelefone2: telefoneMask(e.target.value) })
}

fisicachange(e) {     
  this.limpar();
  this.setState({ 
     campTipo_cliente: "F"     
  })
}

juridicachange(e) {  
  this.limpar();
  this.setState({ 
     campTipo_cliente: "J"
  })
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
validatecnpjChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.cnpjState = 'has-danger'
      this.setState({ mensagem_telefone1: 'O campo CNPJ é obrigatório.' })  
    } else {
      validate.cnpjState = 'has-success'       
    }  
    this.setState({ validate })
}
validateinscricaoestadualChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.inscricao_estadualState = 'has-danger'
      this.setState({ mensagem_inscricao_estadual: 'O campo Inscrição Estadual é obrigatório.' })  
    } else {
      validate.inscricao_estadualState = 'has-success'       
    }  
    this.setState({ validate })
}
validateinscricaomunicipalChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.inscricao_municipalState = 'has-danger'
      this.setState({ mensagem_inscricao_municiapl: 'O campo Inscrição Municipal é obrigatório.' })  
    } else {
      validate.inscricao_municipalState = 'has-success'       
    }  
    this.setState({ validate })
}
validaterazaosocialChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.razao_socialState = 'has-danger'
      this.setState({ mensagem_razao_social: 'O campo Razão Social é obrigatório.' })  
    } else {
      validate.razao_socialState = 'has-success'       
    }  
    this.setState({ validate })
}
validatenomefantasiaChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.nome_fantasiaState = 'has-danger'
      this.setState({ mensagem_nome_fantasia: 'O campo Nome Fantasia é obrigatório.' })  
    } else {
      validate.nome_fantasiaState = 'has-success'       
    }  
    this.setState({ validate })
}
validatecontatoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.contatoState = 'has-danger'
      this.setState({ mensagem_contato: 'O campo Contato é obrigatório.' })  
    } else {
      validate.contatoState = 'has-success'       
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

celularchange(e) {
  this.setState({ campCelular: celularMask(e.target.value) })
}

emailchange(e) {
  this.setState({ campEmail: e.target.value })
}
emailtestechange(e) {
  this.setState({ campEmailTeste: e.target.value })
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
      this.setState({ 
        dado_cadastral_disabled: false
      });    
    } else{
      validate.senhatesteState = 'has-danger'
      this.setState({ mensagem_confirm_senha: 'Senha inválida' })  
    }
  this.setState({ validate })
}  

validateEmail(e) {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { validate } = this.state
    if (emailRex.test(e.target.value)) {
      validate.emailState = 'has-success'           
    } else {
      validate.emailState = 'has-danger'
      this.setState({ mensagem_email: 'Email inválido' })  
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
      this.setState({ mensagem_confirma_email: 'Email inválido' })  
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
voltarlistaClick = () => {
  
  this.props.history.push('/list'); 

}

habilita_botao_voltar() {
  //console.log('this.state.perfil -'+this.state.perfil);  
  if (localStorage.getItem('logperfil') == 1) {
    return (      
      <button type="button" class="btn btn-danger" onClick={this.voltarlistaClick}>VOLTAR</button>    
    );
  } 

}
 
habilita_senha() {
/* 
  if (localStorage.getItem('logperfil') == 1) {
    return (
      disabled      
    );
  } 
*/
}
habilita_senhaTeste() {
  
  if (localStorage.getItem('logperfil') == 1) {
    return (
      <input type="password" className="form-control"  placeholder="Repita a sua Senha *" onBlur={this.verificaSenha}
      value={this.state.campSenhaTeste} disabled/>   
    );
  } else {
    return (
      <input type="password" className="form-control"  placeholder="Repita a sua Senha *" onBlur={this.verificaSenha}
                  value={this.state.campSenhaTeste} onfocusin={this.verificaEmail}
                  onChange={(value)=> this.setState({campSenhaTeste:value.target.value})} />
      );
  }

}

render(){ 

  return (
    <div>
        <div className="container-fluid">
          {this.verifica_menu()}
        </div>      
       <div className="container">
          {this.verificaPessoa()}    
       </div>  
    </div>      
  );
}

verificaPessoa() {   
  if (this.state.tipo_cliente == 'F') {
    return(
    <div> 
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
                    maxlength="80"          
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
                    maxlength="80"                                        
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
                    maxlength="20"   
                    disabled={this.verifica_administrador}                                           
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
                    maxlength="20"                                                                  
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
              <div className="form-group col-md-4">                
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
              </div>
              <div className="form-group col-md-8">
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
                      this.nomechange(e)                       
                      this.validaNomeChange(e)
                    }}    
                    maxlength="120"                                                                      
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.nomeState}>
                       {this.state.mensagem_nome}
                  </FormFeedback> 
              </div>
            </div>    
            <div className="form-row">                     
              <div className="form-group col-md-6">                    
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
                    maxlength="8"                                                                          
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
                    }}                                                          >
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
            <br/>
      <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>            
      {this.habilita_botao_voltar()}
     </div>  
    );
  } else {
    return(       
    <div>    
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
                     maxlength="80"   
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
                     maxlength="80"             
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
                    maxlength="20"                           
                    disabled={this.verifica_administrador}  
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
                    maxlength="20"                          
                    disabled={this.verifica_administrador}                                               
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
              <div className="form-group col-md-4">
                <label for="inputPassword4">CNPJ *</label>
                <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="cnpj"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campCnpj}
                    valid={ this.state.validate.cnpjState === 'has-success' }
                    invalid={ this.state.validate.cnpjState === 'has-danger' }
                    onBlur={this.verificacnpj}
                    onChange={ (e) => {
                      this.cnpjchange(e)                       
                      this.validatecnpjChange(e)
                    }}   
                    maxlength="18"                                                                      
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.cnpjState}>
                       {this.state.mensagem_CNPJ}
                  </FormFeedback>    
              </div>             
              <div className="form-group col-md-4">
                <label for="inputEmail4">Inscrição Municipal *</label>
                <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="cnpj"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campInscricao_municipal}
                    valid={ this.state.validate.inscricao_municipalState === 'has-success' }
                    invalid={ this.state.validate.inscricao_municipalState === 'has-danger' }
                    onBlur={this.verificainscricaomunicipal}
                    onChange={ (e) => {
                      this.inscricaomunicipalchange(e)                       
                      this.validateinscricaomunicipalChange(e)
                    }}  
                    maxlength="15"                                                                           
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.inscricao_municipalState}>
                       {this.state.mensagem_inscricao_municiapl}
                  </FormFeedback>                    
              </div>             
            </div>         
            <div className="form-row">         
             <div className="form-group col-md-4">
                <label for="inputEmail4">Razão Social *</label>
                <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="cnpj"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campNome}
                    valid={ this.state.validate.razao_socialState === 'has-success' }
                    invalid={ this.state.validate.razao_socialState === 'has-danger' }
                    onBlur={this.verificarazaosocial}
                    onChange={ (e) => {
                      this.razaosocialchange(e)                       
                      this.validaterazaosocialChange(e)
                    }}   
                    maxlength="120"                                                                                                                                                                      
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.razao_socialState}>
                       {this.state.mensagem_razao_social}
                  </FormFeedback>    
              </div>
              <div className="form-group col-md-4">
                <label for="inputEmail4">Nome Fantasia *</label>
                <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="cnpj"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campNome_fantasia}
                    valid={ this.state.validate.nome_fantasiaState === 'has-success' }
                    invalid={ this.state.validate.nome_fantasiaState === 'has-danger' }
                    onBlur={this.verificanomefantasia}
                    onChange={ (e) => {
                      this.nomefantasiachange(e)                       
                      this.validatenomefantasiaChange(e)
                    }}      
                    maxlength="150"                                                                     
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.nome_fantasiaState}>
                       {this.state.mensagem_nome_fantasia}
                  </FormFeedback>    
              </div>
              <div className="form-group col-md-4">
                <label for="inputAddress">Contato *</label>
                <Input
                    disabled = {this.state.dado_cadastral_disabled}   
                    type="text"
                    name="cnpj"
                    id="examplnome"
                    placeholder=""
                    value={this.state.campContato}
                    valid={ this.state.validate.contatoState === 'has-success' }
                    invalid={ this.state.validate.contatoState === 'has-danger' }
                    onBlur={this.verificacontato}
                    onChange={ (e) => {
                      this.contatochange(e)                       
                      this.validatecontatoChange(e)
                    }}  
                    maxlength="150"                                                                            
                  />                                
                  <FormFeedback 
                  invalid={this.state.validate.contatoState}>
                       {this.state.mensagem_contato}
                  </FormFeedback>                    
              </div>
            </div>   
            <div className="form-row">                     
              <div className="form-group col-md-6">                    
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
                    name="numero"
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
                    }}                                                          >
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
              <div className="form-group col-md-4">
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
              <div className="form-group col-md-4">
                <label for="inputAddress">Telefone2 </label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campTelefone2} onChange={this.telefone2change} />
              </div>
              <div className="form-group col-md-4">
                <label for="inputAddress">Celular </label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campCelular} onChange={this.celularchange} />
              </div>
            </div>     
          
            <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
            { this.habilita_botao_voltar()}
        </div>   
      );
  }


}  



 /*
 loadselect() {

  return ( this.state.listEstados.map((data)=> {
          { value: data.nome, label: data.id } 
         })
        );
 } 
*/
 

 loadFillData(){
  //console.log(JSON.stringify(this.state.listEstados, null, "    ")); 
  //console.log(JSON.stringify(this.state.campEstadoId, null, "    ")); 
  
  return this.state.listEstados.map((data)=>{          
    return(
      <option key={data.nome} value={data.id}>{data.nome} </option>
    )
  })

  // var users = [];   
  //console.log('Estado - '+this.state.campEstadoId); 

 }

 realizarConsulta (e) {
  //console.log('Consulta CNPJ 1');
  const doc = this.state.campCnpj;
  const endpoint = 'https://cors-anywhere.herokuapp.com/https://www.receitaws.com.br/v1/cnpj';

  if (doc === '') {
    //Alert.alert('Oops!', 'Nenhum documento informado!');
      alert(" Oops!, Nenhum documento informado!");
    return false;
  }

  this.setState({ isLoading: true });

  fetch(`${endpoint}/${doc}`)
    .then(response => {
      console.log(' JSON - '+ JSON.stringify(response.json(), null, "    "));       
      return response.json();
    })
    .then(docInfo => {
      this.setState({ isLoading: false });

      //this.props.navigation.navigate('Resultado', {
      //  data: docInfo
      //})
    })
    .catch(err => {
      this.setState({ isLoading: false });
      alert('Oops! - Houve um erro inesperado ao realizar a consulta. Pro favor, tente novamente mais tarde!');
      console.log(err);
    });
  }
 
  verifica_telefone(tel){
    
    if (tel.length == 14) {
      this.setState({ 
         telefone_formatado1: tel    
      })       
    } else if (tel.length > 14) {      
      this.setState({ 
         telefone_formatado1: tel.substr(0, 14)    
      })       
    }  
        if (tel.substr(16, tel.length).length == 14) {
          //const segundo = tel.substr(0, 14)
          //tel.substr(16, tel.length).length
          console.log(' telefone 2 - '+tel.substr(16, tel.length).length)
          
          this.setState({ 
            telefone_formatado2: tel.substr(15, tel.length)    
          })       
        } 
  }
  
 loadcnpj(e) {

  if (this.state.campCnpj !== "") { 

    //console.log('Consulta CNPJ 2');    
    //const cnpj_consulta = cnpjremoveMask(this.state.campCnpj);
    let cnpj = `https://cors-anywhere.herokuapp.com/http://www.receitaws.com.br/v1/cnpj/${cnpjremoveMask(this.state.campCnpj)}`;
    
   // console.log(`campCNPJ - ${cnpj}`);
  //  console.log(cnpj);
    api.get(cnpj)
    .then((val)=>{
      if (val.data !== null) {
        if (val.data.situacao == "ATIVA") {

          api.get(`/estado/get/${val.data.uf}`)
          .then(res=>{        
            let atualiza_email = "";
           // alert('success - '+res.data.success);  
            if (res.data.success == true) {      
              //console.log(JSON.stringify(res.data.data[0].id, null, "    "));
              //alert('estado Id - '+ res.data.data.id);
              if (val.data.telefone.length !== 0) {   
                 this.verifica_telefone(val.data.telefone);                          
              }           

              if (this.state.campEmail === "") {
                atualiza_email = val.data.email   
              } else {
                atualiza_email = this.state.campEmail
              }

              this.setState({ 
                campNome: val.data.nome,
                campTelefone1: this.state.telefone_formatado1,
                campTelefone2: this.state.telefone_formatado2,                
                campEmail: atualiza_email,
                campEmailTeste: atualiza_email,
                campBairro: val.data.bairro,
                campCidade: val.data.municipio,
                campEndereco: val.data.logradouro,
                campComplemento: val.data.complemento,
                campNumero: val.data.numero,
                campCep: val.data.cep,
                campNome_fantasiaNumero: val.data.fantasia,
                campEstadoId: res.data.data[0].id
              });              
              //console.log(JSON.stringify(res.data, null, "    "));
            } else {
            
              Swal.fire(
                'Alerta',
                'CNPJ NÃO ENCONTRADO',
                'error'
              )
              this.limpar_cnpj_nao_encontrado();            

            }
          }).catch(error=>{
            alert("Mensagem "+error)
          })  
            
        } else {
          Swal.fire(
            'Alerta',
            'CNPJ NÃO ENCONTRADO',
            'error'
          )
          this.limpar_cnpj_nao_encontrado();
        }   
      } else {
         console.log('CNPJ não encontrado')
      }
     // console.log('callapi: ' + JSON.stringify(val))
    })
  .catch((error) => console.log('callapi:'+ JSON.stringify(error)));
  }
//  fetch("https://www.receitaws.com.br/v1/cnpj/27865757000102")
//  .then((val)=>{
 //     console.log('callapi: ' + JSON.stringify(val))
 // })
 // .catch((error) => console.log('callapi:'+ JSON.stringify(error)));

  /*
  const instance = axios.get({
    baseURL: "https://www.receitaws.com.br/v1/cnpj/27865757000102"
  }).then((val)=>{
      console.log('callapi: ' + JSON.stringify(val))
  })
  .catch((error) => console.log('callapi:'+ JSON.stringify(error)));
*/
  /*axios.get("https://www.receitaws.com.br/v1/cnpj/27865757000102")
  .then(res=>{
    if (res.data.nome) {
      console.log(JSON.stringify(res.data, null, "    ")); 
    }
    else {
      alert("Error web service")
    }
  })
  .catch(error=>{
    alert("Error server "+error)
  }) */    
  
 }

 loadEstados(){
  
  api.get('/estado/list')
  .then(res=>{
    if (res.data.success) {
      const data = res.data.data
      this.setState({listEstados:data})
    }
    else {
      Swal.fire(
        'Alerta',
        'Lista estados vazia',
        'error'
      )
    }
  })
  .catch(error=>{
    alert("Error server "+error)
  })

 }  
 
 sendUpdate(){        
     /// por si no ha seleccionado nada de role  
     const { validate } = this.state
     console.log('Tipo_cliente '+this.state.campTipo_cliente);

    if (this.state.campTipo_cliente == "F") {

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
         
    } else {

          let userId = this.props.match.params.id;
          // url de backend
          //console.log('user id - '+userId);

          //const Url = baseUrl+"/cliente/update/"+userId
          //const Url = baseUrl+"http://34.210.56.22:3333/cliente/update/"+userId
          // parameter data post
          //console.log('baseURL- '+baseUrl);
          //console.log( JSON.stringify(this.state, null, "    ") );
          
          const datapost = {
            nome: this.state.campNome,              
            email: this.state.campEmail,
            senha: this.state.campSenha,
            endereco: this.state.campEndereco,
            numero: this.state.campNumero,
            complemento: this.state.campComplemento,
            telefone1: this.state.campTelefone1,
            telefone2: this.state.campTelefone2,
            celular: this.state.campCelular,
            cidade: this.state.campCidade,
            bairro: this.state.campBairro,
            estadoId: this.state.campEstadoId, 
            data_nascimento: this.state.campData_nascimento,     
            cep: this.state.campCep,       
            cpf: this.state.campCpf,
            contato: this.state.campContato,
            cnpj: this.state.campCnpj,
            Inscricao_estadual: this.state.campInscricao_estadual,
            nome_fantasia: this.state.campNome_fantasia
          }
        // console.log( JSON.stringify(this.state, null, "    ") );
          
        api.put(`/cliente/update/${userId}`, datapost)
        .then(response=>{
        if (response.data.success==true) {              
        // alert(response.data.message)   
          Swal.fire(
            'Alterado',
            'Você Alterou os dados com sucesso.',
            'success'
          )     
          
          //Email_cliente
          //localStorage.setItem('logemail', response.data.data.email);            
          //localStorage.setItem('lognome', response.data.data.nome);
          //localStorage.setItem('logid', response.data.data.id);
        // localStorage.setItem('logperfil', response.data.data.perfilId);            

        /// console.log('Perfil - '+perfil);
          
          if (this.state.perfil == 1) {
            this.props.history.push('/list');
          } else {
            //this.props.history.push('/area_cliente');
            this.props.history.push(`/edit/${userId}`);
          }

        }
        else {
          Swal.fire(
            'Erro na Inclusão',
            response.data.error.erros.message,
            'error'
          )  
          //alert(response.data.message)
        }
      }).catch(error=>{
        alert("Error 34 ")
      })
  
  
      } 
      
    } else if (this.state.campTipo_cliente == "J") {
      
    
   
      if (this.state.campEmail=="") {      
        //alert("Digite o campo de email")
        validate.emailState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_email: 'O campo Email é obrigatório'  
         })      
  
    } else if (this.state.campEmailTeste == "") {  
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
    } else if (this.state.campSenhaTeste == "") {  
      validate.senhatesteState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_confirm_senha: 'O campo Confirmação de Senha é obrigatório'  
       })                                 
  /*          
    } 
    else if (this.state.campCnpj=="") {
         //alert("Digite o campo de nome")
         validate.cnpjState = 'has-danger'
         this.setState({ 
           validate,
           mensagem_CNPJ: 'O campo CNPJ é obrigatório'  
          })                                  
   }       
    else if (this.state.campInscricao_estadual=="") {
      //alert("Digite o campo de nome")
      validate.inscricao_estadualState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_inscricao_estadual: 'O campo Inscrição Estadual é obrigatório'  
       })                                  
    }       
    else if (this.state.campNome=="") {
      //alert("Digite o campo de nome")
      validate.razao_socialState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_nome: 'O campo Razão Social é obrigatório'  
       })     
    }      
    else if (this.state.campNome_fantasia=="") {
      //alert("Digite o campo de nome")
      validate.nome_fantasiaState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_nome_fantasia: 'O campo Nome Fantasia é obrigatório'  
       })     
    } 
    else if (this.state.campContato=="") {
      //alert("Digite o campo de nome")
      validate.contatoState = 'has-danger'
      this.setState({ 
        validate,
        mensagem_contato: 'O campo Contato é obrigatório'  
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
       })       */
      } else {
      
        let userId = this.props.match.params.id;
        
        const datapost = {
          nome: this.state.campNome,              
          email: this.state.campEmail,
          senha: this.state.campSenha,
          endereco: this.state.campEndereco,
          numero: this.state.campNumero,
          complemento: this.state.campComplemento,
          telefone1: this.state.campTelefone1,
          telefone2: this.state.campTelefone2,
          celular: this.state.campCelular,
          cidade: this.state.campCidade,
          bairro: this.state.campBairro,
          estadoId: this.state.campEstadoId,      
          cep: this.state.campCep,
          data_nascimento: this.state.campData_nascimento,
          tipo_cliente: this.state.campTipo_cliente,
          cpf: this.state.campCpf,
          contato: this.state.campContato,
          cnpj: this.state.campCnpj,
          Inscricao_estadual: this.state.campInscricao_estadual,
          inscricao_municipal: this.state.campInscricao_municipal,
          nome_fantasia: this.state.campNome_fantasia,
          perfilId: this.state.campPerfilId,
          situacaoId: this.state.campSituacaoId
        }          
  
        api.put(`/cliente/update/${userId}`, datapost)
        .then(response=>{
          if (response.data.success==true) {              
          // alert(response.data.message)   
            Swal.fire(
              'Alterado',
              'Você Alterou os dados com sucesso.',
              'success'
            )               
           
            //Email_cliente
            //localStorage.setItem('logemail', response.data.data.email);            
            //localStorage.setItem('lognome', response.data.data.nome);
            ///localStorage.setItem('logid', response.data.data.id);
            //localStorage.setItem('logperfil', response.data.data.perfilId);            
  
           /// console.log('Perfil - '+perfil);
            
            if (this.state.perfil == 1) {
              this.props.history.push('/list');
            } else {
             // this.props.history.push('/area_cliente');
             this.props.history.push(`/edit/${userId}`);
            }
  
          }
          else {
            Swal.fire(
              'Erro na Inclusão',
               response.data.error.erros.message,
              'error'
            )  
            //alert(response.data.message)
          }
        }).catch(error=>{
          alert("Erro verificar log  ")
        })
  
      } 
  
    } 
    
  
}

}

export default editComponent;

