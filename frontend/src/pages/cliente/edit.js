//import 'date-fns';
import React from 'react';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_cliente from '../cliente/menu_cliente' ;
import Menu from '../../pages/cabecalho' ;
import Menu_administrador from '../administrador/menu_administrador';
import {Form, Alert} from 'reactstrap';
import api from '../../services/api';

import { cnpjMask } from '../formatacao/cnpjmask';
import { cpfMask } from '../formatacao/cpfmask';
import { cepMask } from '../formatacao/cepmask';
import { telefoneMask } from '../formatacao/telefonemask';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
//import { format } from "date-fns";

//const baseUrl = "http://34.210.56.22:3333";
const perfil = localStorage.getItem('logperfil');
const login = localStorage.getItem('logemail');              
const nome = localStorage.getItem('lognome');  
const buscadorcep = require('buscadorcep');

class EditComponent extends React.Component{  
  
  constructor(props){

    super(props);    
    this.state = {
      dataCliente:{},
      campNome: "",
      campEmail:"",
      campTelefone1:"",
      campTelefone2:"",
      campSenha:"",
      campEndereo: "",
      campComplemento:"",
      campCelular:"",
      campCidade:"",
      campData_nascimento:"",
      campEstadoId:0,
      campCep:"",
      campTipo_Cliente:"",
      campCpf:"",
      campContato: "",
      campCnpj: "",
      campInscricao_estadual: "",
      campNome_fantasia: "",
      perfil: perfil,
      nome: nome,
      listEstados:[] }
      this.estadoChange = this.estadoChange.bind(this); 
      this.cepchange = this.cepchange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.cpfchange = this.cpfchange.bind(this);
      this.cnpjchange = this.cnpjchange.bind(this);
      this.telefone1change = this.telefone1change.bind(this);
      this.telefone2change = this.telefone2change.bind(this);
      this.celularchange = this.celularchange.bind(this);
      this.data_nascimentochange = this.data_nascimentochange.bind(this);     

  }  

  componentDidMount(){
    //console.log('entrou componentDidMount');
    // parametro de id del usuario
    this.setState({
      perfil: localStorage.getItem('logperfil'),
      nome: localStorage.getItem('lognome')}
    );

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
          campData_nascimento: data.data_nascimento,
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
      //  console.log( JSON.stringify(this.state, null, "    ") );
      
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })

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
  cepchange(e) {
    this.setState({ campCep: cepMask(e.target.value) })
  }

  cpfchange(e) {
    this.setState({ campCpf: cpfMask(e.target.value) })
  }
  
  cnpjchange(e) {
    this.setState({ campCnpj: cnpjMask(e.target.value) })
  }

  data_nascimentochange(e) {   
    this.setState({ campData_nascimento: e.target.value})
  }

  estadoChange(event) {     
    this.setState({
        campEstadoId: event.target.value
    });    
  } 

 telefone1change(e) {
  this.setState({ campTelefone1: telefoneMask(e.target.value) })
 }

 telefone2change(e) {
    this.setState({ campTelefone2: telefoneMask(e.target.value) })
 }

 celularchange(e) {
  this.setState({ campCelular: telefoneMask(e.target.value) })
 }
 

  verificaEmail(event){
    if (this.state.campEmail !== this.state.campEmailTeste) {
      Swal.fire(
        'Alerta',
        'Email diferente, favor acertar',
        'error'
      )  
    } 
  } 
  handleClick() {
  
    const base = this.state.campCep;   
    
    buscadorcep(base.replace('-','')).
       then(endereco => {           
       // const url = baseUrl+"/estado/get/"+endereco.uf
       
       api.get(`/estado/get/${endereco.uf}`)
       .then(res=>{        
          //alert('success - '+res.data.success);  
          if (res.data.success == true) {      
            //console.log(JSON.stringify(res.data.data[0].id, null, "    "));
            //alert('estado Id - '+ res.data.data.id);                   
           
            this.setState({ 
              campCep: endereco.cep,
              campEndereco: endereco.logradouro,
              campCidade: endereco.localidade,
              campBairro: endereco.bairro,
              campEstadoId: res.data.data[0].id, // endereco.uf,           
              estado_selecionado: endereco.uf
  
            }); 
          } else {
  
            this.setState({ 
              campCep: endereco.cep,
              campEndereco: endereco.logradouro,
              campCidade: endereco.localidade,
              campBairro: endereco.bairro,
              campEstadoId: 0, 
              estado_selecionado: endereco.uf
  
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
  verificaSenha(event){
    if (this.state.campSenha !== this.state.campSenhaTeste) {  
      Swal.fire(
        'Alerta',
        'Senha diferente, favor acertar',
        'error'
      )  
     } else {
     // const Url =baseUrl+"/login/get/"+this.state.campEmail+"/"+this.state.campSenha
            
     api.get(`/login/get/${this.state.campEmail}/${this.state.campSenha}`)
      .then(res=>{          
        if (res.data.data.length !== 0) {  
    
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
        alert("Error server "+error)
      })     
      this.setState({ campSenha: event.target.value});
     }    
    } 

    habilita_senha() {
     // console.log('habilita_senha - '+perfil);

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

     // console.log('habilita_senha_teste - '+perfil);

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
  verificaPessoa() {
   // alert(' this.state.campCpf '+this.state.campCpf);
    //alert( JSON.stringify(this.state, null, "    "));
    if (this.state.campCpf != "") {
     return (
       <div className="container"> 
       <h3><strong>Dados de acesso</strong></h3>        
        <div className="form-row">           
          <div className="form-group col-md-3">
            <label for="email">Email *</label>
            <input type="text" className="form-control"  placeholder="" value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})}/>
          </div>
          <div className="form-group col-md-3">
                  <label for="emailteste">Email *</label>
                  <input type="email" className="form-control" placeholder="Repita o seu Email *" onBlur={this.verificaEmail}
                  value={this.state.campEmailTeste} onChange={(value)=> this.setState({campEmailTeste:value.target.value})}/>
                </div>  
                       
        </div>       
        <h3><strong>Dados de cadastro</strong></h3>
        <div className="form-row">          
          <div className="form-group col-md-4">
            <label for="inputPassword4">Cpf *</label>
            <input type="text" className="form-control"  placeholder="" value={this.state.campCpf} onChange={(value)=> this.setState({campCpf:value.target.value})} disabled/>
          </div>
          <div className="form-group col-md-8">
            <label for="inputEmail4">Nome</label>
            <input type="nome" className="form-control"  placeholder="" value={this.state.campNome} onChange={(value)=> this.setState({campNome:value.target.value})}/>
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
         <div className="form-group col-md-6">
           <label for="inputEmail4">Endereço *</label>
           <input type="text" className="form-control"  placeholder=""  value={this.state.campEndereco} onChange={(value)=> this.setState({campEndereco:value.target.value})}/>
         </div>
         <div className="form-group col-md-6">
          <label for="inputAddress">Complemento *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campComplemento} onChange={(value)=> this.setState({campComplemento:value.target.value})}/>
         </div>
       </div>      
       <div className="form-row">                
          <div className="form-group col-md-2">
              <label for="inputEmail4">Bairro *</label>
              <input type="text" className="form-control"  placeholder=""  value={this.state.campBairro} onChange={(value)=> this.setState({campBairro:value.target.value})}/>
          </div>          
          <div className="form-group col-md-2">
            <label for="inputAddress">Cidade *</label>
            <input type="text" className="form-control" placeholder="" value={this.state.campCidade} onChange={(value)=> this.setState({campCidade:value.target.value})}/>
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
            <input type="text" className="form-control"  placeholder=""  value={this.state.campTelefone1} onChange={this.telefone1change}/>
        </div>
        <div className="form-group col-md-3">
          <label for="inputAddress">Telefone2 *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campTelefone2} onChange={this.telefone2change}/>
        </div>
        <div className="form-group col-md-3">
          <label for="inputAddress">Celular *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campCelular} onChange={this.celularchange}/>
        </div>
       </div>
       <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
       {this.habilita_botao_voltar()}
     </div>
     );
    } else {
      return (
        <div className="container">         
          <h3><strong>Dados de acesso</strong></h3>
        <div className="form-row">         
          <div className="form-group col-md-3">
            <label for="email">Email *</label>
            <input type="text" className="form-control"  placeholder="" value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})}/>
          </div>
          <div className="form-group col-md-3">
            <label for="inputEmail4">Email *</label>
            <input type="email" className="form-control"  placeholder="Repita o seu Email *" value={this.state.campEmailTeste} onChange={(value)=> this.setState({campEmailTeste:value.target.value})}/>
          </div>                   
        </div>       
        <h3><strong>Dados de cadastro</strong></h3>
        <div className="form-row">       
          <div className="form-group col-md-4">
                <label for="inputPassword4">CNPJ *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campCnpj} onChange={this.cnpjchange} maxlength="18" disabled/>
          </div>              
          <div className="form-group col-md-4">
            <label for="razao">Razão Social *</label>
            <input type="text" className="form-control"  placeholder="" 
            value={this.state.campNome} onChange={(value)=> this.setState({campNome:value.target.value})}/>
          </div>
          <div className="form-group col-md-4">
            <label for="nomefantadia">Nome Fantasia *</label>
            <input type="text" className="form-control" placeholder="" 
            value={this.state.campNome_fantasia} onChange={(value)=> this.setState({campNome_fantasia:value.target.value})}/>
          </div>
        </div>         
       <div className="form-row">         
         <div className="form-group col-md-4">
           <label for="inputEmail4">Endereço *</label>
           <input type="text" className="form-control"  placeholder=""  value={this.state.campEndereco} 
           onChange={(value)=> this.setState({campEndereco:value.target.value})}/>
         </div>
         <div className="form-group col-md-4">
          <label for="inputAddress">Complemento *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campComplemento} onChange={(value)=> this.setState({campComplemento:value.target.value})}/>
         </div>
         <div className="form-group col-md-4">
          <label for="contato">Contato *</label>
          <input type="text" className="form-control" placeholder="" 
          value={this.state.campContato} onChange={(value)=> this.setState({campContato:value.target.value})}/>
         </div>
       </div>      

       <div className="form-row">         
        <div className="form-group col-md-4">
            <label for="inputEmail4">Telefone1 *</label>
            <input type="text" className="form-control"  placeholder=""  value={this.state.campTelefone1} onChange={(value)=> this.setState({campTelefone1:value.target.value})}/>
        </div>
        <div className="form-group col-md-4">
          <label for="inputAddress">Telefone2 *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campTelefone2} onChange={(value)=> this.setState({campTelefone2:value.target.value})}/>
        </div>
        <div className="form-group col-md-4">
          <label for="inputAddress">Celular *</label>
          <input type="text" className="form-control" placeholder="" value={this.state.campCelular} onChange={(value)=> this.setState({campCelular:value.target.value})}/>
        </div>
       </div>

       <div className="form-row">         
          <div className="form-group col-md-2">
              <label for="inputEmail4">Bairro *</label>
              <input type="text" className="form-control"  placeholder=""  value={this.state.campBairro} onChange={(value)=> this.setState({campBairro:value.target.value})}/>
          </div>
          <div className="form-group col-md-4">
            <label for="inputAddress">Cep *</label>
            <input type="text" className="form-control" placeholder="" value={this.state.campCep} onChange={(value)=> this.setState({campCep:value.target.value})}/>
          </div>
          <div className="form-group col-md-2">
            <label for="inputAddress">Cidade *</label>
            <input type="text" className="form-control" placeholder="" value={this.state.campCidade} onChange={(value)=> this.setState({campCidade:value.target.value})}/>
          </div>
          <div className="form-group col-md-4">
          <label>Estado *</label>

            <select className="form-control" name="estado" onChange={this.estadoChange} value={this.state.campEstadoId}>

                <option selected>Selecione o estado</option>

                {this.loadFillData()}                   

            </select>

          </div>
       </div>
       <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>Atualizar</button>
       {this.habilita_botao_voltar()}
     </div>
        );
    }  
  }

  render(){
    
    return (
      <div>
          <div>
            {this.verifica_menu()}
          </div>      
      <div>
         {this.verificaPessoa()}    
      </div>  
      </div>      
    );
  }

  loadEstados(){
  
    //const baseUrl = "http://34.210.56.22:3333"
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

   loadFillData(){
    
    return this.state.listEstados.map((data)=>{          
      return(
        <option key={data.nome} value={data.id}>{data.nome} </option>
      )
    })
  
    
   }

  sendUpdate(){

    if (this.state.campTelefone1=="") {
      //alert("Digite o campo de telefone")
      Swal.fire(
        'Alerta',
        'Digite o campo de telefone',
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
    else if (this.state.campTipo_Cliente == "F" && this.state.campCpf=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite o campo cpf',
        'error'
      )
    }
    else if (this.state.campEmail=="") {
      //alert("Digite o campo de email")
      Swal.fire(
        'Alerta',
        'Digite o campo email',
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
    }
    else if (this.state.campCidade=="") {
      //alert("Digite o campo de nome")
      Swal.fire(
        'Alerta',
        'Digite o campo Cidade',
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
    else if (this.state.campCep=="") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o campo Cep',
        'error'
      )
    }
    else if (this.state.campEstadoId=="") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o campo Estado',
        'error'
      )
    }
    else if (this.state.campData_nascimento=="") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o campo Data de nascimento',
        'error'
      )
    }  
    else if (this.state.campTipo_Cliente == "J" && this.state.campCnpj == "") {
    //alert("Digite o campo de endereço")
        Swal.fire(
          'Alerta',
          'Digite o campo de CNPJ',
          'error'
        )
    }    
    else if (this.state.campCnpj !== "" && this.state.campNome_fantasia == "") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o campo de Nome Fantasia',
        'error'
      )    
    }
    else if (this.state.campCnpj !== "" && this.state.campInscricao_estadual=="") {
      //alert("Digite o campo de endereço")
      Swal.fire(
        'Alerta',
        'Digite o campo de Inscrição Estadual',
        'error'
      )
       
    }
    else {            
    // get parameter id
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
      complemento: this.state.campComplemento,
      telefone1: this.state.campTelefone1,
      telefone2: this.state.campTelefone2,
      celular: this.state.campCelular,
      cidade: this.state.campCidade,
      bairro: this.state.campBairro,
      estadoId: this.state.campEstadoId,      
      cep: this.state.campCep,
      //tipo_cliente: this.state.campTipo_cliente,
      cpf: this.state.campCpf,
      contato: this.state.campContato,
      cnpj: this.state.campCnpj,
      Inscricao_estadual: this.state.campInscricao_estadual,
      nome_fantasia: this.state.campNome_fantasia
    }
   // console.log( JSON.stringify(this.state, null, "    ") );
    
    api.put(`/cliente/update/${userId}`, datapost)
    .then(response => {
      if (response.data.success) {
       //alert(response.data.message)
       Swal.fire(
        'Alterado',
        'Você alterou os dados com sucesso.',
        'success'
       )  

      if (this.state.perfil == 1) {
        this.props.history.push('/list');
      } else {
        this.props.history.push('/area_cliente');
      }
       
       
      }
      else {
        alert("Error")
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
   }

  }


}


export default EditComponent;
