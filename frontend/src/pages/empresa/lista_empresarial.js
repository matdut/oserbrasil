import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';
import { Alert, Input } from 'reactstrap';
import Modal from 'react-modal';

import { Link } from "react-router-dom";
import { cnpjMask } from '../formatacao/cnpjmask';
//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const baseUrl = "http://34.210.56.22:3333";


const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      inicio: 0,
      mensagem: '',
      color: 'light',
      listEmpresas:[],
      listaStatus:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadEmpresas();    
    this.carrega_status();  
  }

  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <option key={data.descricao} value={data.id}>{data.descricao} </option>
      )
    })     
  
   }


  loadEmpresas(){
   // const url = baseUrl+"/cliente/list"
   api.get('/empresa/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        console.log(JSON.stringify(data, null, "    ")); 
        this.setState({listEmpresas:data})
      }
      else {
        alert("Error conexao")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
  
  handleClick = () => {
  
    this.props.history.push('/area_administrador'); 

  }
 
  render()
  {
    return (
      <div>    
          <div >
            <Menu_administrador />  
            <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                 <h3><strong>Lista de Clientes Empresarial</strong></h3>
              </div>      
            </div>
          </div>
      <div className="container_alterado_1">      
        <div>   
        <br/>    
        </div>  
        <table className="table table-hover danger">
          <thead>
            <tr>
              <th scope="col">#</th>            
              <th scope="col">CNPJ</th>
              <th scope="col">Razão Social</th>
              <th scope="col">CPF</th>
              <th scope="col">Representante</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>         
            {this.loadFillData()}
          </tbody>
        </table>
        <br/>
        <Alert color={this.state.color}>
               {this.state.mensagem}
          </Alert>    
          <br/>
          <br/>
        <div className="botao_lista_incluir">
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
              <AddIcon/> Adicionar Empresa
          </Fab>
       </div>
       
      </div>   
    </div>      
    );
  }

  onIncluir() {
    this.props.history.push(`/empresa_incluir/0`);   
  }

  loadFillData(){
    
    return this.state.listEmpresas.map((data, index)=>{     
      return(        
        <tr>
          <th>{index + 1}</th>          
          <td>{cnpjMask(data.cnpj)}</td>
          <td>{data.razao_social}</td>
          <td>{data.cliente.cpf}</td>
          <td>{data.cliente.nome}</td>
          <td>{data.cliente.email}</td>
          <td><Input                   
                    type="select" 
                    name="select" 
                    className="status_select"
                    id="select" 
                    value={data.cliente.status.id}                        
                    onChange={ (e) => {
                      this.statusChange(e, data)                                             
                    }}                                                          >
              {this.loadStatus()}      
              </Input></td>
          <td>
            <div style={{width:"150px"}}>
              {'   '}
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data, data.id)}>
                <DeleteIcon />
              </IconButton>              
            </div>            
          </td>          
        </tr>
      )
    })
  }
  carrega_status(){
  
    //const baseUrl = "http://34.210.56.22:3333"
    //const url = baseUrl+"/seguradora/list"
    api.get('/status/list')
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
  statusChange(e, data){
    const datapost = {
      statusId: e.target.value     
    }    
    api.put(`/login/update/${data.cliente.id}`, datapost)

    api.put(`/cliente/update/${data.cliente.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadEmpresas();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
    })
  }

  validar_delete(data, id) {     
    console.log('validar_delete - '+JSON.stringify(data, null, "    ")); 
    
    //console.log(`/eventos/listaeventocliente/${id}/${data.cliente.perfilId}`);
    api.get(`/eventos/listaeventocliente/${id}/${data.cliente.perfilId}`)
    .then(response =>{

      if (response.data.success) {
    
        Swal.fire({
          title: 'Você está certo?',
          text: 'Cliente tem Evento(s) associado(s), deseja excluir?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, apaga isto!',
          cancelButtonText: 'Não, mantêm'
        }).then((result) => {
          if (result.value) {
            this.sendDelete(data, id);
          } else if (result.dismiss == Swal.DismissReason.cancel) {
            this.setState({ 
              color: 'danger',
              mensagem: 'Seus dados não foram apagados :)'
            })  
          }
        })
      } else {
        this.sendDelete(data, id);
      } 
    })
    .catch ( error => {
      alert("Erro exclusão do evento")
    })
  
  }

  onDelete(data, id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.validar_delete(data, id)
      } else if (result.dismiss == Swal.DismissReason.cancel) {
        this.setState({ 
          color: 'danger',
          mensagem: 'Seus dados não foram apagados :)'
        })  
      }
    })
  }

  sendDelete(data, userId){
    // url de backend
    console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    let clienteId = '';
    console.log('deletar o email - '+data.cliente.email);
    api.delete(`/login/delete/${data.cliente.email}`)     
    
    console.log('deletou');

    const datapost = {  
      perfilId: data.cliente.perfilId,      
    }   
     
    /* tem que excluir os serviços */
     
    api.delete(`/eventos/deleteEmpresa/${userId}`,datapost)        

    api.delete(`/operador/deleteEmpresa/${userId}`)        

    api.get(`/empresa/getEmpresaCliente/${userId}`)
    .then(res=>{
      if (res.data.success) {
        
        clienteId = res.data.data[0].cliente.id;
        console.log('pegou o cliente '+clienteId);

        api.delete(`/empresa/delete/${res.data.data[0].id}`)
        .then(response =>{
         
          if (response.data.success) {       
      
            console.log('deleteou a empresa ');
              api.delete(`/cliente/delete/${clienteId}`)
              .then(response =>{
                
                if (response.data.success) {       
            
                      console.log('deleteou o cliente ');
                      this.loadEmpresas()
          
                } else {      
                  this.setState({ 
                    color: 'danger',
                    mensagem: 'Seus dados não foram apagados :)'
                  })    
                }

              })        
              .catch(error=>{
                alert("Error de conexão cliente "+error)
              })            
    
          } else {      
            this.setState({ 
              color: 'danger',
              mensagem: 'Seus dados não foram apagados :)'
            })    
          }
        })        
        .catch(error=>{
          alert("Error de conexão cliente "+error)
        })                                       
        
        
      }  
    })        
    .catch(error=>{
      alert("Error de conexão cliente "+error)
    })        
   
  }

}

export default listComponent;
