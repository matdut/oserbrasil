import React from 'react';
import {Form, Input, FormFeedback } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { cpfMask } from '../formatacao/cpfmask';
import { cepMask } from '../formatacao/cepmask';
import { cnpjMask } from '../formatacao/cnpjmask';
import { cnpjremoveMask } from '../formatacao/cnpjremovemask';
import { telefoneMask } from '../formatacao/telefonemask';
import Menu_cliente from '../cliente/menu_cliente' ;
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';
//import axios from 'axios';
import api from '../../services/api';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

//import url from '../../pages/configuracao/baseurl' ;
//const url = "http://34.210.56.22:3333"; 
const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');  
const id = localStorage.getItem('logid');  
const perfil = localStorage.getItem('logperfil');
const buscadorcep = require('buscadorcep');
const Email_cliente = require('../../pages/email');
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
    listEstados:[],
    validate: {
      emailState: '',
      emailtesteState: '',
    },
   }      
   this.estadoChange = this.estadoChange.bind(this); 
   //this.selecaoestadoChange = this.selecaoestadoChange.bind(this); 
   this.cpfchange = this.cpfchange.bind(this);
   this.data_nascimentochange = this.data_nascimentochange.bind(this);
   this.cepchange = this.cepchange.bind(this);
   this.telefone1change = this.telefone1change.bind(this);
   this.telefone2change = this.telefone2change.bind(this);
   this.celularchange = this.celularchange.bind(this);
   this.verificaEmail = this.verificaEmail.bind(this);
   this.verificaSenha = this.verificaSenha.bind(this);
   this.fisicachange = this.fisicachange.bind(this);
   this.juridicachange = this.juridicachange.bind(this);
   this.cnpjchange = this.cnpjchange.bind(this);
   this.emailchange = this.emailchange.bind(this);
   this.emailtestechange = this.emailtestechange.bind(this);
   this.validaEmailChange = this.validaEmailChange.bind(this);          
   this.handleClick = this.handleClick.bind(this);
   this.limpar = this.limpar.bind(this);
   this.loadcnpj = this.loadcnpj.bind(this);   
   this.realizarConsulta = this.realizarConsulta.bind(this);   

   this.verificaEmail = this.verificaEmail.bind(this);   
   this.verificaSenha = this.verificaSenha.bind(this);   

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
    campEstadoId:0,
    campBairro:"",
    telefone_formatado1: "", 
    telefone_formatado2: "",
    validate: {
      emailState: '',
      emailtesteState: '',
    }, 
    });      
 }
 componentDidMount(){  
  this.setState({
    perfil: localStorage.getItem('logperfil'),    
    nome: localStorage.getItem('lognome'),
    campTipo_cliente: "F" 
  });
    
  this.loadEstados();
  this.verifica_menu();
  this.loadcnpj();
  
 }
 
onOpenModal = () => {
  this.setState({ open: true });
};

onCloseModal = () => {
  this.setState({ open: false });
};

 estadoChange(event) {     
    this.setState({        
        campEstadoId: event.target.value
    });    
 } 
 
 
 verificaEmail(){
   console.log('email '+ this.state.campEmail);

   if (this.state.campEmail !== this.state.campEmailTeste) {
        Swal.fire(
          'Alerta',
          'Email diferente, favor acertar',
          'error'
        )  
    }   
} 

verificaSenha(event){
 // alert('verificasenha');
  if (this.state.campSenha !== this.state.campSenhaTeste) {  
    Swal.fire(
      'Alerta',
      'Senha diferente, favor acertar',
      'error'
    )  
  } else {
    
    api.get(`/login/get/${this.state.campEmail}/${this.state.campSenha}`)
    .then(res=>{                
      
      if (res.data.data.length > 0) {                        
        
      // console.log(JSON.stringify(this.state.email, null, "    ")); 
      // console.log(JSON.stringify(this.state.senha, null, "    ")); 
      // console.log(JSON.stringify(res.data, null, "    ")); 

        Swal.fire(
          'Mensagem',
          'Email já cadastrado.',
          'error'
        )        

        this.setState({
          campEmail: "",
          campSenha: "",
          campEmailTeste: "",
          campSenhaTeste: "",
        }        
        );    
        //this.email.focus();

      } else {
        api.get(`/login/getMotoristaEmail/${this.state.campEmail}`)
        .then(res=>{          
          console.log("/login/getMotoristaEmail/ "+JSON.stringify(res.data.data, null, "    ")); 
          if (res.data.data.length > 0) {                        
            
          //  console.log(JSON.stringify(this.state.email, null, "    ")); 
          //  console.log(JSON.stringify(this.state.senha, null, "    ")); 
          //  console.log(JSON.stringify(res.data, null, "    ")); 
      
            Swal.fire(
              'Mensagem',
              'Email já cadastrado.',
              'error'
            )        
      
            this.setState({
              campEmail: "",
              campSenha: "",
              campEmailTeste: "",
              campSenhaTeste: "",
            }        
            );           
      
          } else {
            api.get(`/login/getClienteEmail/${this.state.campEmail}`)
            .then(res=>{          
              console.log(" /login/getClienteEmail/ "+JSON.stringify(res.data.data, null, "    ")); 
              if (res.data.data.length > 0) {                        
                
              // console.log(JSON.stringify(this.state.email, null, "    ")); 
                //console.log(JSON.stringify(this.state.senha, null, "    ")); 
              // console.log(JSON.stringify(res.data, null, "    ")); 
          
                Swal.fire(
                  'Mensagem',
                  'Email já cadastrado.',
                  'error'
                )        
          
                this.setState({
                  campEmail: "",
                  campSenha: "",
                  campEmailTeste: "",
                  campSenhaTeste: "",
                }        
                );           
          
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
      }
    })        
    .catch(error=>{
      alert("Error server 1 "+error)
    })
    this.setState({ campSenha: event.target.value});  
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
      <Menu_cliente />  
    );
   }           
}


cpfchange(e) {
  this.setState({ campCpf: cpfMask(e.target.value) })
}

cnpjchange(e) {
  this.setState({ campCnpj: cnpjMask(e.target.value) })

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

celularchange(e) {
  this.setState({ campCelular: telefoneMask(e.target.value) })
}

emailchange(e) {
  this.setState({ campEmail: e.target.value })
}
emailtestechange(e) {
  this.setState({ campEmailTeste: e.target.value })
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


handleClick() {
  const base = this.state.campCep;
  const estadoId = "";

  if (base.length > 0) {
   buscadorcep(base.replace('-','')).
     then(endereco => {           
      
      api.get(`/estado/get/${endereco.uf}`)
      .then(res=>{        
      
        console.log(JSON.stringify(res.data, null, "    "));
        if (res.data.data.length !== 0) {      
          //console.log(JSON.stringify(res.data.data.length, null, "    "));
                     
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
       
          Swal.fire(
            'Mensagem',
            'CEP não encontrado.',
            'error'
          )    

          this.setState({ 
            campCep: "",
            campEndereco: "",
            campCidade: "",
            campBairro: "",
            campEstadoId: 0, 
            estado_selecionado: ""
          }); 

        } 
      })        
      .catch(error=>{
        alert("Error server "+error)
      })
         
         //console.log(JSON.stringify(this.state, null, "    ")); 
        // this.estadoChange = this.estadoChange.bind(this); 
      });
      
    //}
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
 
  if (localStorage.getItem('logperfil') == 1) {
    return (
      <input type="password" className="form-control" placeholder="" value={this.state.campSenha}
        onChange={(value)=> this.setState({campSenha:value.target.value})} disabled/>      
    );
  } else {
    return (
      <input type="password" className="form-control" placeholder="" value={this.state.campSenha}
                  onChange={(value)=> this.setState({campSenha:value.target.value})} /> 
      );
  }

}
habilita_senhaTeste() {
  
  if (localStorage.getItem('logperfil') == 1) {
    return (
      <input type="password" className="form-control"  placeholder="Repita a sua Senha *" onBlur={this.verificaSenha}
      value={this.state.campSenhaTeste} 
      onChange={(value)=> this.setState({campSenhaTeste:value.target.value})} disabled/>   
    );
  } else {
    return (
      <input type="password" className="form-control"  placeholder="Repita a sua Senha *" onBlur={this.verificaSenha}
                  value={this.state.campSenhaTeste} 
                  onChange={(value)=> this.setState({campSenhaTeste:value.target.value})} />
      );
  }

}

 render(){  
  const { selectedOption } = this.state;
  const { open } = this.state;
   return (
     <div>
        <div>
        {this.verifica_menu()}
          </div>          
      <div className="container">              
          <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" value="F" onClick={this.fisicachange} href="#fisica">Pessoa Física</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" value="J" onClick={this.juridicachange} href="#juridica">Pessoa Jurídica</a>
                  </li>          
          </ul><br/>
        <div className="tab-content">          
          <div id="fisica" className="container tab-pane active">
            <br/>
            <div className="form-row"> 
              <h3><strong>Dados de acesso</strong></h3>
            </div>
            <div className="form-row">                
                <div className="form-group col-md-3">
                  <label for="email1">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
                    value={this.state.campEmail}
                    valid={ this.state.validate.emailState === 'has-success' }
                    invalid={ this.state.validate.emailState === 'has-danger' }
                    onChange={ (e) => {
                                this.emailchange(e) 
                                this.validateEmail(e)
                                this.validaEmailChange(e)
                              } }
                  />  
                  <FormFeedback 
                  valid={this.state.validate.emailState}>
                      e-mail válido
                  </FormFeedback>                              
                </div>
                <div className="form-group col-md-3">
                  <label for="emailteste">Email *</label>                  
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
                    value={this.state.campEmailTeste}
                    valid={ this.state.validate.emailtesteState === 'has-success' }
                    invalid={ this.state.validate.emailtesteState === 'has-danger' }
                    onBlur={this.verificaEmail}
                    onChange={ (e) => {
                                this.emailtestechange(e) 
                                this.validateEmailteste(e)
                                this.validaEmailChange(e)
                              } }
                  />              
                  <FormFeedback 
                  valid={this.state.validate.emailtesteState}>
                      e-mail válido
                  </FormFeedback>                              
                </div>   
                <div className="form-group col-md-3">
                  <label for="senha">Senha * </label>
                  <input type="password" className="form-control" placeholder="" value={this.state.campSenha}
                       onChange={(value)=> this.setState({campSenha:value.target.value})} /> 
                </div>                
                <div className="form-group col-md-3">
                  <label for="senhateste">Senha *</label>
                  <input type="password" className="form-control"  placeholder="Repita a sua Senha *" onBlur={this.verificaSenha}
                  value={this.state.campSenhaTeste} 
                  onChange={(value)=> this.setState({campSenhaTeste:value.target.value})} />
                </div>                  
            </div>   
            <div className="form-row"> 
              <h3><strong>Dados de cadastro</strong></h3>
            </div>    
            <div className="form-row"> 
              <div className="form-group col-md-4">
                <label for="inputPassword4">CPF *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campCpf} onChange={this.cpfchange}/>
              </div>
              <div className="form-group col-md-8">
                <label for="inputEmail4">Nome *</label>
                <input type="text" className="form-control"  
                placeholder="" value={this.state.campNome} 
                onChange={(value)=> this.setState({campNome:value.target.value})} maxlength="60"/>
              </div>
            </div>    
            <div className="form-row">                     
              <div className="form-group col-md-4">                    
                    <label for="inputAddress">Cep *</label>                   
                    <Form inline>
                        <input type="text" className="form-control" placeholder=""                   
                          value={this.state.campCep} onChange={this.cepchange}/>                                             
                      <button type="button" className="btn btn-primary btn-sm" onClick={this.handleClick}>  Pesquisar </button>       
                    </Form>      
              </div>     
              <div className="form-group col-md-4">
                 <br/>
                 <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei o cep</a>  
              </div>                    
            </div>                         
            <div className="form-row">         
              <div className="form-group col-md-4">
                <label for="inputEmail4">Endereço *</label>                
                <input type="text" className="form-control"  placeholder=""  
                value={this.state.campEndereco} 
                onChange={(value)=> this.setState({campEndereco:value.target.value})} maxlength="60"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputEmail4">Número *</label>                
                <input type="text" className="form-control"  placeholder=""  
                value={this.state.campNumero} 
                onChange={(value)=> this.setState({campNumero:value.target.value})} maxlength="20"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputAddress">Complemento *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campComplemento} 
                onChange={(value)=> this.setState({campComplemento:value.target.value})} maxlength="80"/>
              </div>
            </div>    
            <div className="form-row">         
                <div className="form-group col-md-4">
                    <label for="inputEmail4">Bairro *</label>
                    <input type="text" className="form-control"  placeholder=""  
                    value={this.state.campBairro} 
                    onChange={(value)=> this.setState({campBairro:value.target.value})} maxlength="80"/>
                </div>               
                <div className="form-group col-md-4">
                  <label for="inputAddress">Cidade *</label>
                  <input type="text" className="form-control" placeholder="" 
                  value={this.state.campCidade} 
                  onChange={(value)=> this.setState({campCidade:value.target.value})} maxlength="60"/>
                </div>
                <div className="form-group col-md-4">                
                <label>Estado *</label>
                <select className="form-control" name="estado" onChange={this.estadoChange} value={this.state.campEstadoId}>

                  <option selected>Selecione o estado</option>               
                    {this.loadFillData()}                   
                </select>
                </div>
            </div>  
            <div className="form-row">         
              <div className="form-group col-md-3">
                  <label for="inputEmail4">Data de Nascimento *</label>
                  <input type="date" className="form-control"  placeholder=""  
                  value={this.state.campData_nascimento} onChange={this.data_nascimentochange} />
              </div>
              <div className="form-group col-md-3">
                  <label for="inputEmail4">Telefone1 *</label>
                  <input type="text" className="form-control"  placeholder=""  
                  value={this.state.campTelefone1} 
                  onChange={this.telefone1change} />
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
            <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Cadastrar</button>            
            {this.habilita_botao_voltar()}
        </div>   
        <div id="juridica" className="container tab-pane"><br/>
        <div className="form-row"> 
              <h3><strong>Dados de acesso</strong></h3>
            </div>
            <div className="form-row">                
                <div className="form-group col-md-3">
                <label for="emailteste">Email *</label>
                <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
                    value={this.state.campEmail}
                    valid={ this.state.validate.emailState === 'has-success' }
                    invalid={ this.state.validate.emailState === 'has-danger' }
                    onChange={ (e) => {
                                this.emailchange(e) 
                                this.validateEmail(e)
                                this.validaEmailChange(e)
                              } }
                  />  
                  <FormFeedback valid>
                       e-mail válido
                  </FormFeedback>    
                </div>
                <div className="form-group col-md-3">
                  <label for="emailteste">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder=""
                    value={this.state.campEmailTeste}
                    valid={ this.state.validate.emailtesteState === 'has-success' }
                    invalid={ this.state.validate.emailtesteState === 'has-danger' }
                    onBlur={this.verificaEmail}
                    onChange={ (e) => {
                                this.emailtestechange(e) 
                                this.validateEmailteste(e)
                                this.validaEmailChange(e)
                              } }
                  />   
                   <FormFeedback 
                  valid={this.state.validate.emailtesteState}>
                      e-mail válido
                  </FormFeedback>                
                </div>
                <div className="form-group col-md-3">
                  <label for="senha">Senha * </label>
                  {this.habilita_senha()}
                </div>
                <div className="form-group col-md-3">
                  <label for="senhateste">Senha *</label>
                  {this.habilita_senhaTeste()}
                </div>
            </div>   
            <div className="form-row"> 
              <h3><strong>Dados de cadastro</strong></h3>
            </div>    
            <div className="form-row"> 
              <div className="form-group col-md-4">
                <label for="inputPassword4">CNPJ *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campCnpj} onChange={this.cnpjchange} onBlur={this.loadcnpj} maxlength="18"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputEmail4">Inscrição Estadual *</label>
                <input type="text" className="form-control"  
                placeholder="" value={this.state.campInscricao_estadual} 
                onChange={(value)=> this.setState({campInscricao_estadual:value.target.value})} maxlength="14"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputEmail4">Inscrição Municipal *</label>
                <input type="text" className="form-control"  
                placeholder="" value={this.state.campInscricao_municipal} 
                onChange={(value)=> this.setState({campInscricao_municipal:value.target.value})} maxlength="15"/>
              </div>             
            </div>         
            <div className="form-row">         
             <div className="form-group col-md-4">
                <label for="inputEmail4">Razão Social *</label>
                <input type="text" className="form-control"  
                placeholder="" value={this.state.campNome} 
                onChange={(value)=> this.setState({campNome:value.target.value})} maxlength="60"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputEmail4">Nome Fantasia *</label>
                <input type="text" className="form-control" placeholder=""  
                value={this.state.campNome_fantasia} 
                onChange={(value)=> this.setState({campNome_fantasia:value.target.value})} maxlength="20"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputAddress">Contato *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campContato} 
                onChange={(value)=> this.setState({campContato:value.target.value})} maxlength="40"/>
              </div>
            </div>   
            <div className="form-row">                     
              <div className="form-group col-md-4">                    
                    <label for="inputAddress">Cep *</label>                   
                    <Form inline>
                        <input type="text" className="form-control" placeholder=""                   
                          value={this.state.campCep} onChange={this.cepchange}/>                                             
                      <button type="button" className="btn btn-primary btn-sm" onClick={this.handleClick}>  Pesquisar </button>       
                    </Form>      
              </div> 
              <div className="form-group col-md-4">
                 <br/>
                 <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei o cep</a>  
              </div>         
            </div>          
            <div className="form-row">          
              <div className="form-group col-md-4">
                <label for="inputEmail4">Endereço *</label>
                <input type="text" className="form-control" placeholder=""  
                value={this.state.campEndereco} 
                onChange={(value)=> this.setState({campEndereco:value.target.value})} maxlength="60"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputEmail4">Número *</label>                
                <input type="text" className="form-control"  placeholder=""  
                value={this.state.campNumero} 
                onChange={(value)=> this.setState({campNumero:value.target.value})} maxlength="20"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputAddress">Complemento *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campComplemento} 
                onChange={(value)=> this.setState({campComplemento:value.target.value})} maxlength="80"/>
              </div>            
            </div>   
            <div className="form-row">         
                <div className="form-group col-md-4">
                    <label for="inputEmail4">Bairro *</label>
                    <input type="text" className="form-control" placeholder="" 
                    value={this.state.campBairro} 
                    onChange={(value)=> this.setState({campBairro:value.target.value})} maxlength="80"/>
                </div>                
                <div className="form-group col-md-4">
                  <label for="inputAddress">Cidade *</label>
                  <input type="text" className="form-control" placeholder="" 
                  value={this.state.campCidade} 
                  onChange={(value)=> this.setState({campCidade:value.target.value})} maxlength="60"/>
                </div>
                <div className="form-group col-md-4">                
                <label>Estado *</label>
                <select className="form-control" name="estado" onChange={this.estadoChange} value={this.state.campEstadoId}>

                  <option selected>Selecione o estado</option>               
                    {this.loadFillData()}                   
                </select>
                </div>
            </div>   
            <div className="form-row">         
              <div className="form-group col-md-4">
                  <label for="inputEmail4">Telefone1 *</label>
                  <input type="text" className="form-control" placeholder=""  
                  value={this.state.campTelefone1} onChange={this.telefone1change} />
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
          
            <button type="submit" className="btn btn-primary" onClick={()=>this.sendSave()}>Cadastrar</button>
            { this.habilita_botao_voltar()}
        </div> 
      </div>    
    </div>    
    </div>
   );
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
              this.limpar();              

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
          this.limpar();
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
 
 sendSave(){        
     /// por si no ha seleccionado nada de role  

     
    if (this.state.campTipo_cliente == "F") {

      if (this.state.campEmail=="") {
        //alert("Digite o campo de email")
        Swal.fire(
          'Alerta',
          'Digite o campo email',
          'error'
        )
      } else if (this.state.campSenha=="") {
        //alert("Digite o campo de telefone")
        Swal.fire(
          'Alerta',
          'Digite o campo de senha',
          'error'
        )                   
      }       
      else if (this.state.campEmail !== this.state.campEmailTeste) {  
        Swal.fire(
          'Alerta',
          'Emails diferentes',
          'error'
        )                           
      } 
      else if (this.state.campSenha !== this.state.campSenhaTeste) {  
        Swal.fire(
          'Alerta',
          'Senhas diferentes',
          'error'
        )                           
      } 
      else if (this.state.campCpf=="") {
           //alert("Digite o campo de nome")
        Swal.fire(
          'Alerta',
          'Digite o campo cpf',
          'error'
        )
      } 
      else if (this.state.campNome=="") {
        //alert("Digite o campo de nome")
        Swal.fire(
          'Alerta',
          'Digite o campo nome',
          'error'
        )
      }          
      else if (this.state.campCep=="") {
        //alert("Digite o campo de endereço")
        Swal.fire(
          'Alerta',
          'Digite o campo Cep',
          'error'
        )
      }
      else if (this.state.campEndereco=="") {
      //alert("Digite o campo de endereço")
        Swal.fire(
          'Alerta',
          'Digite o campo de endereço',
          'error'
        )  
        } else if (this.state.campNumero=="") {
          //alert("Digite o campo de endereço")
          Swal.fire(
            'Alerta',
            'Digite o campo de número',
            'error'
          )     
        } 
        else if (this.state.campComplemento=="") {
        //alert("Digite o campo de endereço")
        Swal.fire(
          'Alerta',
          'Digite o campo de complemento',
          'error'
        )  
        }
        else if (this.state.campBairro=="") {
          //alert("Digite o campo de endereço")
          Swal.fire(
            'Alerta',
            'Digite o campo de bairro',
            'error'
          )
        }
        else if (this.state.campCidade=="") {
          //alert("Digite o campo de nome")
          Swal.fire(
            'Alerta',
            'Digite o campo Cidade',
            'error'
          )
       } else if (this.state.campEstadoId == 0) {
        //alert("Digite o campo de endereço")
        Swal.fire(
          'Alerta',
          'Selecione o campo Estado',
          'error'
        )     
      }
      else if (this.state.campData_nascimento==0) {
        //alert("Digite o campo de endereço")
        Swal.fire(
          'Alerta',
          'Digite o campo Data de nascimento',
          'error'
        )
      }  
      else if (this.state.campTelefone1=="") {
          //alert("Digite o campo de telefone")
          Swal.fire(
            'Alerta',
            'Digite o campo de telefone',
            'error'
          )     
      } 
      else if (this.state.campTelefone1.length < 14) {
        //alert("Digite o campo de telefone")
        Swal.fire(
          'Alerta',
          'Campo Telefone está faltando número.',
          'error'
        )               
         
    } else {

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
          nome_fantasia: this.state.campNome_fantasia,
          perfilId: this.state.campPerfilId,
          situacaoId: this.state.campSituacaoId
        }          
  
        console.log(JSON.stringify(datapost, null, "    ")); 
        api.post('/cliente/create',datapost)
        .then(response=>{
          if (response.data.success==true) {              
          // alert(response.data.message)   
            Swal.fire(
              'Incluido',
              'Você incluiu os dados com sucesso.',
              'success'
            )               
           
            //Email_cliente
            localStorage.setItem('logemail', response.data.data.email);            
            localStorage.setItem('lognome', response.data.data.nome);
            localStorage.setItem('logid', response.data.data.id);
            localStorage.setItem('logperfil', response.data.data.perfilId);            
  
           /// console.log('Perfil - '+perfil);
            
            if (this.state.perfil == 1) {
              this.props.history.push('/list');
            } else {
              this.props.history.push('/area_cliente');
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
        Swal.fire(
          'Alerta',
          'Digite o campo email',
          'error'
        )
      } else if (this.state.campSenha=="") {
        //alert("Digite o campo de telefone")
        Swal.fire(
          'Alerta',
          'Digite o campo de senha',
          'error'
        )   
      }       
      else if (this.state.campEmail !== this.state.campEmailTeste) {  
        Swal.fire(
          'Alerta',
          'Emails diferentes',
          'error'
        )                           
      } 
      else if (this.state.campSenha !== this.state.campSenhaTeste) {  
        Swal.fire(
          'Alerta',
          'Senhas diferentes',
          'error'
        )         
      } else if (this.state.campCnpj=="") {
        Swal.fire(
          'Alerta',
          'Digite o campo de CNPJ',
          'error'  
        )    
      } else if (this.state.campInscricao_estadual=="") {
        //alert("Digite o campo de endereço")
        Swal.fire(
          'Alerta',
          'Digite o campo de Inscrição Estadual',
          'error'
        )
      } else if ( this.state.campNome == "") {     
        
        Swal.fire(
          'Alerta',
          'Digite o campo de Nome Razão Social',
          'error'  
        )          
      } else if ( this.state.campNome_fantasia == "") {     
        
          Swal.fire(
            'Alerta',
            'Digite o campo de Nome Fantasia',
            'error'  
          )    
      } else if ( this.state.campContato == "") {     
        
          Swal.fire(
            'Alerta',
            'Digite o campo de Contato',
            'error'  
          )      
      } else if (this.state.campCep=="") {
            //alert("Digite o campo de endereço")
            Swal.fire(
              'Alerta',
              'Digite o campo Cep',
              'error'
            )
          }
          else if (this.state.campEndereco=="") {
          //alert("Digite o campo de endereço")
            Swal.fire(
              'Alerta',
              'Digite o campo de endereço',
              'error'
            )  
            } else if (this.state.campNumero=="") {
              //alert("Digite o campo de endereço")
              Swal.fire(
                'Alerta',
                'Digite o campo de número',
                'error'
              )     
            } 
            else if (this.state.campComplemento=="") {
            //alert("Digite o campo de endereço")
            Swal.fire(
              'Alerta',
              'Digite o campo de complemento',
              'error'
            )  
            }
            else if (this.state.campBairro=="") {
              //alert("Digite o campo de endereço")
              Swal.fire(
                'Alerta',
                'Digite o campo de bairro',
                'error'
              )
            }
            else if (this.state.campCidade=="") {
              //alert("Digite o campo de nome")
              Swal.fire(
                'Alerta',
                'Digite o campo Cidade',
                'error'
              )
           } else if (this.state.campEstadoId == 0) {
            //alert("Digite o campo de endereço")
            Swal.fire(
              'Alerta',
              'Selecione o campo Estado',
              'error'
            )     
          }
          else if (this.state.campData_nascimento==0) {
            //alert("Digite o campo de endereço")
            Swal.fire(
              'Alerta',
              'Digite o campo Data de nascimento',
              'error'
            )
          }  
          else if (this.state.campTelefone1=="") {
              //alert("Digite o campo de telefone")
              Swal.fire(
                'Alerta',
                'Digite o campo de telefone',
                'error'
              )     
          } 
          else if (this.state.campTelefone1.length < 14) {
            //alert("Digite o campo de telefone")
            Swal.fire(
              'Alerta',
              'Campo Telefone está faltando número.',
              'error'
            )                                                      
      } else {
        
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
          nome_fantasia: this.state.campNome_fantasia,
          perfilId: this.state.campPerfilId,
          situacaoId: this.state.campSituacaoId
        }          

        //console.log(JSON.stringify(datapost, null, "    ")); 
  
        api.post('/cliente/create',datapost)
        .then(response=>{
          if (response.data.success==true) {              
          // alert(response.data.message)   
            Swal.fire(
              'Incluido',
              'Você incluiu os dados com sucesso.',
              'success'
            )               
           
            //Email_cliente
            localStorage.setItem('logemail', response.data.data.email);            
            localStorage.setItem('lognome', response.data.data.nome);
            localStorage.setItem('logid', response.data.data.id);
            localStorage.setItem('logperfil', response.data.data.perfilId);            
  
           /// console.log('Perfil - '+perfil);
            
            if (this.state.perfil == 1) {
              this.props.history.push('/list');
            } else {
              this.props.history.push('/area_cliente');
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
  
    } 
    
  
}

verifica_cadastro() {

  if (this.state.campEmail=="") {
    //alert("Digite o campo de email")
    Swal.fire(
      'Alerta',
      'Digite o campo email',
      'error'
    )
  } else if (this.state.campSenha=="") {
    Swal.fire(
      'Alerta',
      'Digite a senha',
      'error'
    )
  } else {
   //const baseUrl = "http://34.210.56.22:3333/login/get/"+this.state.campEmail+"/"+this.state.campSenha
   //const baseUrl = url+"/login/get/"+this.state.campEmail+"/"+this.state.campSenha
            
    api.get(`/login/get/${this.state.campEmail}/${this.state.campSenha}`)
    .then(res=>{          
      if (res.data.data.length == 0) {                
          
        this.sendSave(); 

      } else {

        Swal.fire(
          'Mensagem',
          'Email já cadastrado, dados não incluidos.',
          'success'
        )        
      }
    })        
    .catch(error=>{
      alert("Error server "+error)
    })
  } 
}
}

export default editComponent;

//ReactDOM.render(<editComponent />, document.getElementById('root'));
