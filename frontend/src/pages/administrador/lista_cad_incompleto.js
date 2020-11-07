import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Alert, Input } from 'reactstrap';
//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";

//library sweetalert
import Menu_administrador from '../administrador/menu_administrador';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const baseUrl = "http://34.210.56.22:3333";

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      campStatus: '',
      inicio: 0,
      mensagem: '',
      color: 'light',
      listIncompletos:[],
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadCliente();  
    this.carrega_status();  

  }

  loadStatus(){
  
    return this.state.listaStatus.map((data)=>{          
      return(
        <option key={data.descricao} value={data.id}>{data.descricao} </option>
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

  loadCliente(){
   // const url = baseUrl+"/cliente/list"
   api.get('/cliente/list')
    .then(res=>{
      if (res.data.success) {

        const data = res.data.data       
        this.setState({listCliente:data})
      }
      else {
        alert("Error  ")
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
      <div className="container-fluid">    
          <div>
            <Menu_administrador />  
          </div>
          <center><h3><strong>Lista de Clientes Individual</strong></h3></center>
          <div>  
          <Link className="btn btn-outline-info" to={"/cliente/0"}> <span class="glyphicon glyphicon-plus"></span><i class="fas fa-user-plus"></i> Adicionar Cliente</Link>                 
        <br/>
        </div>  
        <table className="table table-hover danger">
          <thead>
            <tr>
              <th scope="col">#</th>            
              <th scope="col">CPF</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Endereço</th>
              <th scope="col">Telefone</th>
              <th scope="col">Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>         
            {this.loadFillData()}
          </tbody>
        </table>
        <Link className="btn btn-outline-info" to={"/cliente/0"}> <span class="glyphicon glyphicon-plus"></span> <i class="fas fa-user-plus"></i> Adicionar Cliente</Link>       

        <br/>
        <Alert color={this.state.color}>
          {this.state.mensagem}
        </Alert>     
      </div>   
    );
  }

  loadFillData(){
    
    return this.state.listCliente.map((data, index)=>{     
      return(        
        <tr>
          <th>{index + 1}</th>          
          <td>{data.cpf}</td>
          <td>{data.nome}</td>
          <td>{data.email}</td>
          <td>{data.endereco}</td>
          <td>{data.celular}</td>
          <td><Input                   
                    type="select" 
                    name="select" 
                    className="status_select"
                    id="select" 
                    value={data.status.id}                        
                    onChange={ (e) => {
                      this.statusChange(e, data)                                             
                    }}                                                          >
              {this.loadStatus()}      
              </Input>
          </td>
          <td>
            <div style={{width:"150px"}}>           
              {'   '}
              <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.email, data.id)}> Deletar </button>
            </div>            
          </td>          
        </tr>
      )
    })
  }
  statusChange(e, data){
    const datapost = {
      statusId: e.target.value         
    }    
    api.put(`/login/update/${data.id}`, datapost)
    
    api.put(`/cliente/update/${data.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadCliente();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
    })
  }
  validar_delete(email, id) {
     
    api.get(`/eventos/listaeventocliente/${id}`)
    .then(response =>{

      if (response.data.success) {
       // console.log('id - '+response.data);
     //  console.log( JSON.stringify(response.data, null, "    ") );       
          this.setState({ 
            color: 'danger',
            mensagem: 'Cliente tem Evento(s) associado(s), não pode ser excluído'
          })             
       
      } else {
        this.sendDelete(email, id);
      } 
    })
    .catch ( error => {
      alert("Erro de Conexão")
    })
  
  }

  onDelete(email, id){
    Swal.fire({
      title: 'Você está certo?',
      text: 'Você não poderá recuperar estes dados!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, apaga isto!',
      cancelButtonText: 'Não, mantêm'
    }).then((result) => {
      if (result.value) {
        this.validar_delete(email, id)
      } 
    })
  }

  sendDelete(email, userId){  


    api.delete(`/login/delete/${email}`)     
    console.log(`/login/delete/+${email}`)

    api.delete(`/cliente/delete/${userId}`)
    .then(response =>{

      if (response.data.success) {       
        this.loadCliente()

      } else {      
        this.setState({ 
          color: 'danger',
          mensagem: 'Seus dados não foram apagados :)'
        })                     
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;