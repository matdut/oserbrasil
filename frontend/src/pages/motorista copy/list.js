import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  

//const baseUrl = "http://34.210.56.22:3333"

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      listMotorista:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadMotorista();  
  }

 
  loadMotorista(){
   // const url = baseUrl+"/motorista/list"
   api.get('/motorista/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listMotorista:data})
      }
      else {
        alert("Erro de conexão")
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
       <div>
          <center><h3><strong>Lista de Motorista</strong></h3> </center>         
         <br/>
         <Link className="btn btn-outline-info" to={"/criar"}> <span class="glyphicon glyphicon-plus"></span> Adicionar Motorista</Link>       
        <br/>
        </div>  
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>            
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Endereço</th>
              <th scope="col">Telefone</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>         
            {this.loadFillData()}
          </tbody>
        </table>
         <Link className="btn btn-outline-info" to={"/criar"}> <span class="glyphicon glyphicon-plus"></span> Adicionar Motorista</Link>         
      </div>   
    );
  }

  loadFillData(){

    return this.state.listMotorista.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.nome}</td>
          <td>{data.email}</td>
          <td>{data.endereco}</td>
          <td>{data.telefone1}</td>
          <td>
            <div style={{width:"150px"}}>
              <Link className="btn btn-outline-info" to={"/editar/"+data.id}>Editar</Link>
              {'   '}
              <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Deletar </button>
            </div>            
          </td>          
        </tr>
      )
    })
  }

  onDelete(id){
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

  sendDelete(userId){
    // url de backend
    //console.log('deletar o id - '+userId);
    //const baseUrl = "http://34.210.56.22:3333/motorista/delete/"+userId    // parameter data post
    //const url = baseUrl+"/motorista/delete/"+userId    // parameter data post
    // network
    api.delete(`/motorista/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadMotorista()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
