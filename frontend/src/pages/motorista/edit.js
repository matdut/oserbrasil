import React from 'react';

import Menu from '../../pages/cabecalho' ;
import Menu_motorista from '../motorista/menu_motorista' ;
import Menu_administrador from '../administrador/menu_administrador';
import {Form, Table, Input, FormFeedback } from 'reactstrap';

import ImageLoader from 'react-image-file';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';

import filesize from "filesize";
import Upload from "../Upload";
import FileList from "../Filelist";
import { Container, Content } from "../style";
//import FileBase64 from 'react-file-base64';

import { cnpjMask } from '../formatacao/cnpjmask';
import { cpfMask } from '../formatacao/cpfmask';
import { cepMask } from '../formatacao/cepmask';
import { telefoneMask } from '../formatacao/telefonemask';

//const baseUrl = "http://34.210.56.22:3333";
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  
const buscadorcep = require('buscadorcep');

class EditarComponent extends React.Component{
  
  constructor(props){

    super(props);    
    this.state = {
      dataCliente:{},
      campNome: "",
      campEmail:"",
      campEmailTeste: "",
      campSenhaTeste: "",
      campTelefone1:"",
      campTelefone2:"",
      campSenha:"",
      campEndereo: "",
      campNumero: "",
      campComplemento:"",
      campCelular:"",
      campCidade:"",
      campEstadoId:0,
      campCep:"",
      campData_nascimento: "",
      campCpf:"",
      campCarro: "",
      campPlaca: "",
      campAno: "",
      campCor: "",
      campBilingue: "",
      campFoto: "",
      campIndicacao: "",
      campBanco: "",
      campAgencia: "",
      campConta: "",
      campApolice: "",
      campSeguradoraId: 0,
      campSituacaoId: "", 
      perfil: perfil,
      nome: nome,     
      listEstados:[],
      listSeguradoras:[],
      foto_path_Motorista: "",
      foto_img_Motorista: "",
      uploadedFiles: [],
      fileFormatado: [],
      atualizar_foto: false,
      validate: {
        emailState: '',
        emailtesteState: '',
      }, 
      files: []  
     }
      this.seguradoraChange = this.seguradoraChange.bind(this);
      this.estadoChange = this.estadoChange.bind(this); 
      this.cepchange = this.cepchange.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.cpfchange = this.cpfchange.bind(this);
      this.cnpjchange = this.cnpjchange.bind(this);
      this.telefone1change = this.telefone1change.bind(this);
      this.telefone2change = this.telefone2change.bind(this);
      this.celularchange = this.celularchange.bind(this);
      this.data_nascimentochange = this.data_nascimentochange.bind(this);     
      this.emailchange = this.emailchange.bind(this);   
      this.emailtestechange = this.emailtestechange.bind(this);   
      this.validaEmailChange = this.validaEmailChange.bind(this);
      
      this.verificaEmail = this.verificaEmail.bind(this);   
      this.verificaSenha = this.verificaSenha.bind(this);   
  } 

  getFiles(files){
    this.setState({ files: files })
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

  telefone1change(e) {
    this.setState({ campTelefone1: telefoneMask(e.target.value) })
   }
  
   telefone2change(e) {
      this.setState({ campTelefone2: telefoneMask(e.target.value) })
   }
  
   celularchange(e) {
    this.setState({ campCelular: telefoneMask(e.target.value) })
   }

   data_nascimentochange(e) {
    this.setState({ campData_nascimento: e.target.value })
  }
  seguradoraChange(event) {     
    this.setState({
        campSeguradoraId: event.target.value
    });    
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
    this.loadSeguradoras();

    let userId = this.props.match.params.id;

    console.log('user id - '+userId);
    // http://localhost:3000/employee/get/4
    //const url = baseUrl+"/motorista/get/"+userId
    //console.log('userId - '+userId);

    api.get(`/foto/get/${userId}`)
    .then(res=>{
      if (res.data.success) {     
        //console.log(" res.data.data "+ JSON.stringify(res.data.data, null, "    ") );       
        
        const uploadedFiles = res.data.data.map(file => ({         
            file: ({
               path: file.name
            }),  
            id: file._id,
            name: file.name,
            readableSize: filesize(file.size),
            progress: 0,
            preview: file.url,
            uploaded: false,
            url: file.url,
            error: false,
            motoristaId: file.motoristaId
          }));        
        
        this.setState({
          //uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
          uploadedFiles: uploadedFiles
        });

      }  
    })
    .catch(error=>{
      alert("Error server "+error)
    })

    api.get(`/motorista/get/${userId}`)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data[0]
        //console.log( JSON.stringify(data, null, "    ") );
        //console.log( JSON.stringify(data.foto_blob, null, "    ") );
        //this.getFiles(data.foto_blob);
        this.setState({
          dataCliente:data,
          campNome: data.nome,              
          campEmail: data.email,
          campEmailTeste: data.email,
          campSenha: data.senha,
          campSenhaTeste: data.senha,
          campEndereco: data.endereco,
          campNumero: data.numero,
          campComplemento: data.complemento,
          campTelefone1: data.telefone1,
          campTelefone2: data.telefone2,
          campCelular: data.celular,
          campCidade: data.cidade,
          campBairro: data.bairro,
          campEstadoId: data.estadoId,
          campCep: data.cep,
          campTipo_cliente: data.tipo_cliente,
          campData_nascimento: data.data_nascimento,
          campCpf: data.cpf,
          campCarro: data.carro,
          campPlaca: data.placa,
          campAno: data.ano,
          campCor: data.cor,
          campBilingue: data.bilingue,
          campFoto: data.foto_blob,
          campIndicacao: data.indicacao,          
          campSituacaoId: data.situacaoId,
          campApolice: data.apolice,
          campSeguradoraId: data.seguradoraId,
          foto_url: data.foto_url
        })

        //console.log( JSON.stringify(data, null, "    ") );
        
      }
      else {
        alert("Não conseguiu se conectar no banco de dados")
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
        alert("Não conseguiu se conectar no banco de dados")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  
   verifica_menu() {
    
    if (this.state.perfil == 1) {
      return ( 
       <div>
        <Menu_administrador />         
       </div> 
       ); 
    } else if (this.state.nome == null){
        return (
          <Menu />
        );
  
    } else {
      return (
       <div> 
          <Menu_motorista />  
        <br/>        
       </div>   
      );
     }            
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
  verificaSenha(event){
    if (this.state.campSenha !== this.state.campSenhaTeste) {  
      Swal.fire(
        'Alerta',
        'Senha diferente, favor acertar',
        'error'
      )  
     } else {
      //const url = baseUrl+"/login/get/"+this.state.campEmail+"/"+this.state.campSenha
            
      api.get(`/login/get/${this.state.campEmail}/${this.state.campSenha}`)
      .then(res=>{          
        if (res.data.data.length !== 0) {              
  
          Swal.fire(
            'Mensagem',
            'Email já cadastrado, dados não incluidos.',
            'success'
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
  } 
  emailtestechange(e) {
    this.setState({ campEmailTeste: e.target.value })
  }
  
  estadoChange(event) {     
    this.setState({
        campEstadoId: event.target.value
    });  
  }

  habilita_senha() {
    //console.log('perfil - '+ perfil);

    if (perfil == 1) {
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
   // console.log('perfil teste - '+ perfil);

    if (perfil == 1) {
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
  handleUpload = files => {  

    let Id = this.props.match.params.id;
  
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
      motoristaId: Id
    }));
   
     
    this.setState({
      //uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
      uploadedFiles: uploadedFiles,
      atualizar_foto: true
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
   
  };

  fileChangedHandler = (event) => {
    this.setState({ campFoto: event.target.files[0] })
  }

  emailchange(e) {
    this.setState({ campEmail: e.target.value })
  }

  handleClick() {
    //console.log(JSON.stringify(this.state, null, "    "));
    const base = this.state.campCep;
    //const estadoId = "";
    if (base.length > 0) { 
      buscadorcep(base.replace('-','')).
        then(endereco => {           
          //const url = baseUrl+"/estado/get/"+endereco.uf
          //alert('baseUrl -'+ baseUrl);
          
          api.get(`/estado/get/${endereco.uf}`)
          .then(res=>{        
           // alert('success - '+res.data.success);  
            if (res.data.data.length !== 0) {  
              //console.log(JSON.stringify(res.data.data[0].id, null, "    "));
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
          });  
      }    
  }

  fileSelectedHandler = event => {
    //alert('aqui');
    //console.log(JSON.stringify(event.target.files[0], null, "    "));
    this.setState({ 
       campFoto: event.target.files[0]
    })
  
  }
  seleciona(){
    //alert('aqui 2');
    // alert('imagem -'+this.state.selectedFile);
    //console.log(JSON.stringify(this.state.campFoto, null, "    "));
    if (this.state.campFoto == null) {
       return('../img_avatar3.png');
    } else {
       //alert('imagem - '+this.state.campFoto);
       return(this.state.campFoto);
    }
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
                    onChange={ (e) => {
                                this.emailtestechange(e) 
                                this.validateEmailteste(e)
                                this.validaEmailChange(e)
                              } }
                  />  
                  <FormFeedback valid>
                       e-mail válido
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
              <div className="form-group col-md-4">
                <label for="inputEmail4">Endereço *</label>
                <input type="text" className="form-control"  placeholder=""  value={this.state.campEndereco} onChange={(value)=> this.setState({campEndereco:value.target.value})}/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputEmail4">Número *</label>                
                <input type="text" className="form-control"  placeholder=""  
                value={this.state.campNumero} 
                onChange={(value)=> this.setState({campNumero:value.target.value})} maxlength="20"/>
              </div>
              <div className="form-group col-md-4">
                <label for="inputAddress">Complemento *</label>
                <input type="text" className="form-control" placeholder="" value={this.state.campComplemento} onChange={(value)=> this.setState({campComplemento:value.target.value})}/>
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
              <div className="form-group col-md-4">
                  <label for="inputEmail4">Telefone1 *</label>
                  <input type="text" className="form-control"  placeholder=""  
                  value={this.state.campTelefone1} onChange={this.telefone1change} />
              </div>
              <div className="form-group col-md-4">
                <label for="inputAddress">Telefone2 *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campTelefone2} onChange={this.telefone2change} />
              </div>
              <div className="form-group col-md-4">
                <label for="inputAddress">Celular *</label>
                <input type="text" className="form-control" placeholder="" 
                value={this.state.campCelular} onChange={this.celularchange} />
              </div>
            </div>            
            <div className="form-row">         
                <div className="form-group col-md-4">
                    <label for="inputEmail4">Carro *</label>
                    <input type="text" className="form-control"  placeholder=""  value={this.state.campCarro} onChange={(value)=> this.setState({campCarro:value.target.value})}/>
                </div>
                <div className="form-group col-md-2">
                  <label for="inputAddress">Placa *</label>
                  <input type="text" className="form-control" placeholder=""                   
                  value={this.state.campPlaca} onChange={(value)=> this.setState({campPlaca:value.target.value})}/>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputAddress">Cor *</label>
                  <input type="text" className="form-control" placeholder="" value={this.state.campCor} onChange={(value)=> this.setState({campCor:value.target.value})}/>
                </div>
                <div className="form-group col-md-3">
                  <label for="inputAddress">Ano *</label>
                  <input type="text" className="form-control" placeholder="" value={this.state.campAno} onChange={(value)=> this.setState({campAno:value.target.value})}/>
                </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label for="inputAddress">Número Apólice *</label>
                <input type="text" className="form-control" placeholder="" 
                  value={this.state.campApolice} 
                  onChange={(value)=> this.setState({campApolice:value.target.value})} maxlength="20"/>
              </div>         
              <div className="form-group col-md-3">
                <label for="inputAddress">Seguradora *</label>
                  <select className="form-control" name="seguradora" onChange={this.seguradoraChange} value={this.state.campSeguradoraId}>

                  <option selected>Selecione a seguradora</option>               
                    {this.loadSeguradorasData()}                   
                  </select>
              </div>         
            </div>  
            <button type="submit" className="btn btn-primary" onClick={()=>this.sendUpdate()}>atualizar</button>        
            {this.habilita_botao_voltar()}            
          </div>    
      </div>  

      
    );
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
  
   loadFillData(){
    
    return this.state.listEstados.map((data)=>{          
      return(
        <option key={data.nome} value={data.id}>{data.nome} </option>
      )
    })
      
   }
  
   sendUpdate(){

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
    } else if (this.state.campCpf=="") {
        //alert("Digite o campo de nome")
        Swal.fire(
          'Alerta',
          'Digite o campo cpf',
          'error'
        )
    } else if (this.state.campNome=="") {
          //alert("Digite o campo de nome")
          Swal.fire(
            'Alerta',
            'Digite o campo nome',
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
         
       }
        else {   
    //event.preventDefault();
    //console.log('atualizar ');
    // get parameter id
    let userId = this.props.match.params.id;
    // url de backend
    //console.log('user id - '+userId);  
    
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
      carro: this.state.campCarro,
      placa: this.state.campPlaca,
      ano: this.state.campAno,
      cor: this.state.campCor,
      bilingue: this.state.campBilingue,
      foto_blob: this.state.campFoto,
      indicacao: this.state.campBanco,      
      situacaoId: this.state.campSituacaoId,
      apolice: this.state.campApolice,
      seguradoraId: this.state.campSeguradoraId 
    }
    //console.log('atualizar11 -'+JSON.stringify(datapost, null, "    ") );
   
    
    api.put(`/motorista/update/${userId}`, datapost)
    .then(response => {
      //console.log('motorista -'+JSON.stringify(response.data, null, "    ") );
      if (response.data.success) {
          
         if (this.state.atualizar_foto) {
              const formData = new FormData();
              //formData.append("motoristaid", userId);
              formData.append('file', this.state.uploadedFiles[0].file, this.state.uploadedFiles[0].name);                                                      
              
              // { name: 'body', id: response.data.data.id }])
              api.put(`/foto/update/${userId}`, formData)
                .then(response => {
               //   console.log('retorno foto -'+JSON.stringify(response.data, null, "    ") );
                  
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
            'Alterado',
            'Você alterou os dados com sucesso.',
            'success'
          )       

          if (this.state.perfil == 1) {        
            this.props.history.push('/listar');
          } else {
            this.props.history.push('/area_motorista');
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


export default EditarComponent;
