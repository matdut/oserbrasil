import React  from 'react';
//import { useHistory } from 'react-router-dom';
//import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { Form, Table } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { cpfMask } from '../formatacao/cpfmask';
import { cepMask } from '../formatacao/cepmask';
import { telefoneMask } from '../formatacao/telefonemask';
import Menu_motorista from '../motorista/menu_motorista' ;
import Menu_administrador from '../administrador/menu_administrador';
import Menu from '../../pages/cabecalho' ;
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

class EditComponent extends React.Component{ 

  constructor(props){
   super(props);
   this.state = {
    campNome: "",
    campEmail:"",
    campEmailTeste:"",
    campTelefone1:"",
    campTelefone2:"",
    campSenha:"",
    campSenhaTeste:"",
    campEndereco: "",
    campComplemento:"",
    campCelular:"",
    campCidade:"",
    campTipo_cliente:"",
    campData_nascimento:"",
    campEstadoId:0,
    campCep:"",    
    campCpf:"",
    emailcadastrado: false,
    campCarro: "",
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
    nome: "",
    perfil: "",
    motoristId: 1,
    selectedFile: null,
    listEstados:[],
    listSeguradoras:[],
    uploadedFiles: [],
    fileFormatado: []
   }      
   this.estadoChange = this.estadoChange.bind(this); 
   this.seguradoraChange = this.seguradoraChange.bind(this);
   this.cpfchange = this.cpfchange.bind(this);
   this.cepchange = this.cepchange.bind(this);
   this.data_nascimentochange = this.data_nascimentochange.bind(this);
   this.telefone1change = this.telefone1change.bind(this);
   this.telefone2change = this.telefone2change.bind(this);
   this.celularchange = this.celularchange.bind(this);
   this.verificaEmail = this.verificaEmail.bind(this);
   this.verificaSenha = this.verificaSenha.bind(this);
   this.handleClick = this.handleClick.bind(this);

 }
 async componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil'),    
      nome: localStorage.getItem('lognome')
    });
    this.loadEstados()
    this.loadSeguradoras()

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
    })
    
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
 
 verificaEmail(event){
  if (this.state.campEmail !== this.state.campEmailTeste) {
    Swal.fire(
      'Alerta',
      'Email diferente, favor acertar',
      'error'
    )  
  } else {
    this.setState({ campEmail: event.target.value}) 
  } 
} 

verifica_menu() {

  if (this.state.perfil == 1) {
    return ( <Menu_administrador /> );  
  } else if (nome == null){
      return (
        <Menu />
      );

  } else {
    return (
      <Menu_motorista />  
    );
   }       
}

verificaSenha(event){
if (this.state.campSenha !== this.state.campSenhaTeste) {  
  Swal.fire(
    'Alerta',
    'Senha diferente, favor acertar',
    'error'
  )  
 } else {
// const url = baseUrl+"/login/get/"+this.state.campEmail+"/"+this.state.campSenha
            
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

    } else {
      api.get(`/login/getClienteEmail/${this.state.campEmail}`)
      .then(res=>{          
        if (res.data.data.length > 0) {                        
          
          console.log(JSON.stringify(this.state.email, null, "    ")); 
          console.log(JSON.stringify(this.state.senha, null, "    ")); 
          console.log(JSON.stringify(res.data, null, "    ")); 
    
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
    }
  })        
  .catch(error=>{
    alert("Error server "+error)
  })
  this.setState({ campSenha: event.target.value});
 }
} 

data_nascimentochange(e) {
  this.setState({ campData_nascimento: e.target.value })
}

cpfchange(e) {
  this.setState({ campCpf: cpfMask(e.target.value) })
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

celularchange(e) {
  this.setState({ campCelular: telefoneMask(e.target.value) })
}
handleClick() {
  const base = this.state.campCep;
  
  buscadorcep(base.replace('-','')).
     then(endereco => {           
     // const url = baseUrl+"/estado/get/"+endereco.uf
     // alert('baseUrl -'+ url);
     api.get(`/estado/get/${endereco.uf}`)
     .then(res=>{        
        //alert('success - '+res.data.success);  
        if (res.data.success == true) {      
          //console.log(JSON.stringify(res.data.data, null, "    "));
          //alert('estado Id - '+ res.data.data[0].id);                   
         
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
    uploadedFiles: uploadedFiles
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
                  <input type="text" className="form-control" placeholder=""                   
                  value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})} />
                </div>
                <div className="form-group col-md-3">
                  <label for="emailteste">Email *</label>
                  <input type="email" className="form-control" placeholder="Repita o seu Email *" onBlur={this.verificaEmail}
                  value={this.state.campEmailTeste} onChange={(value)=> this.setState({campEmailTeste:value.target.value})}/>
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
                  <input type="text" className="form-control" placeholder="" 
                  value={this.state.campCpf} onChange={this.cpfchange}  maxlength="15"/>
                </th>
              </tr>
              <tr>              
                <th> 
                  <label for="inputEmail4">Nome *</label>
                  <input type="nome" className="form-control"  
                  placeholder="" value={this.state.campNome} 
                  onChange={(value)=> this.setState({campNome:value.target.value})} maxlength="60"/>
                </th>            
              </tr>          
            </Table>
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
                <input type="text" className="form-control"  placeholder=""  
                value={this.state.campEndereco} 
                onChange={(value)=> this.setState({campEndereco:value.target.value})} maxlength="60"/>
              </div>
              <div className="form-group col-md-6">
                <label for="inputAddress">Complemento *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campComplemento} 
                onChange={(value)=> this.setState({campComplemento:value.target.value})} maxlength="80"/>
              </div>
            </div>      
            <div className="form-row">         
              <div className="form-group col-md-3">
                  <label for="inputEmail4">Data de Nascimento *</label>
                  <input type="date" className="form-control"  placeholder=""  
                  value={this.state.campData_nascimento} onChange={this.data_nascimentochange} />
              </div>
              <div className="form-group col-md-2">
                    <label for="inputEmail4">Bairro *</label>
                    <input type="text" className="form-control"  
                    placeholder=""  value={this.state.campBairro} 
                    onChange={(value)=> this.setState({campBairro:value.target.value})} maxlength="80"/>
              </div>                
              <div className="form-group col-md-2">
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
                  <label for="inputEmail4">Telefone1 *</label>
                  <input type="text" className="form-control"  placeholder=""  
                  value={this.state.campTelefone1} onChange={this.telefone1change} />
              </div>
              <div className="form-group col-md-3">
                <label for="inputAddress">Telefone2 *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campTelefone2} onChange={this.telefone2change} />
              </div>
              <div className="form-group col-md-3">
                <label for="inputAddress">Celular *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campCelular} onChange={this.celularchange} />
              </div>
            </div>            
            <div className="form-row">         
                <div className="form-group col-md-4">
                    <label for="inputEmail4">Carro *</label>
                    <input type="text" className="form-control" placeholder=""  
                    value={this.state.campCarro} 
                    onChange={(value)=> this.setState({campCarro:value.target.value})} maxlength="20"/>
                </div>
                <div className="form-group col-md-2">
                  <label for="inputAddress">Placa *</label>
                  <input type="text" className="form-control" placeholder=""                   
                  value={this.state.campPlaca} 
                  onChange={(value)=> this.setState({campPlaca:value.target.value})} maxlength="20"/>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputAddress">Cor *</label>
                  <input type="text" className="form-control" placeholder="" 
                  value={this.state.campCor} 
                  onChange={(value)=> this.setState({campCor:value.target.value})} maxlength="20"/>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputAddress">Ano *</label>
                  <input type="text" className="form-control" placeholder="" 
                  value={this.state.campAno} 
                  onChange={(value)=> this.setState({campAno:value.target.value})} maxlength="4"/>
                </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label for="inputAddress">Número Apólice *</label>
                <input type="text" className="form-control" placeholder="" 
                  value={this.state.campApolice} 
                  onChange={(value)=> this.setState({campApolice:value.target.value})} maxlength="10"/>
              </div>         
              <div className="form-group col-md-3">
                <label for="inputAddress">Seguradora *</label>
                  <select className="form-control" name="seguradora" 
                  onChange={this.seguradoraChange} value={this.state.campSeguradoraId}>

                  <option selected>Selecione a seguradora</option>               
                    {this.loadSeguradorasData()}                   
                  </select>
              </div>         
            </div>  

            <button type="submit" className="btn btn-primary" onClick={()=>this.verifica_cadastro()}>Cadastrar</button>   
            {this.habilita_botao_voltar()}              
    </div>    
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
  
      /// por si no ha seleccionado nada de role  
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
      else if (this.state.campCpf=="") {
        //alert("Digite o campo de nome")
        Swal.fire(
          'Alerta',
          'Digite o campo cpf',
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
      else if (this.state.campData_nascimento=="") {
        //alert("Digite o campo de endereço")
        Swal.fire(
          'Alerta',
          'Digite o campo Data de nascimento',
          'error'
        )
      }
      else {              
        
       //console.log( JSON.stringify(this.state.uploadedFiles, null, "    ") ); 
        // parametros de datos post
        const datapost = {
          nome: this.state.campNome, 
          email: this.state.campEmail, 
          endereco: this.state.campEndereco, 
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
          placa: this.state.campPlaca,
          ano: this.state.campAno, 
          cor: this.state.campCor, 
          bilingue: this.state.campBilingue, 
          indicacao: this.state.campIndicacao, 
          situacaoId: this.state.campSituacaoId, 
          perfilId: this.state.campPerfilId,
          apolice: this.state.campApolice,
          seguradoraId: this.state.campSeguradoraId
        }               
        
        // const data = this.state.fileFormatado
         //console.log( JSON.stringify(data, null, "    ") ); 
        api.post("/motorista/create", datapost)
        .then(response=>{
          if (response.data.success===true) {    
          // alert(response.data.message)   

              const formData = new FormData();

              formData.append("file", this.state.uploadedFiles[0].file, this.state.uploadedFiles[0].name)                   
              formData.append('motoristaid', response.data.data.id);
          
              //console.log('form data ',formData);
              
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

            Swal.fire(
              'Incluido',
              'Você incluiu os dados com sucesso.',
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
            alert(response.data.message)
          }
        }).catch(error=>{
          alert("Error 34 ")
        })

      }
  
}

verifica_cadastro() {

  if (this.state.campEmail==="") {
    //alert("Digite o campo de email")
    Swal.fire(
      'Alerta',
      'Digite o campo email',
      'error'
    )
  } else if (this.state.campSenha==="") {
    Swal.fire(
      'Alerta',
      'Digite a senha',
      'error'
    )
  } else {
  
   //const baseUrl = "http://34.210.56.22:3333/login/get/"+this.state.campEmail+"/"+this.state.campSenha
   //const url = baseUrl+"/login/get/"+this.state.campEmail+"/"+this.state.campSenha
            
   api.get(`/login/get/${this.state.campEmail}/${this.state.campSenha}`)
    .then(res=>{          
      if (res.data.data.length === 0) {                
          
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

export default EditComponent;
