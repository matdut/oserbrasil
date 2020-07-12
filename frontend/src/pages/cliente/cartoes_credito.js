import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';

import { Link } from "react-router-dom";

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_administrador from '../administrador/menu_administrador';
//import { Alert } from 'reactstrap';
const nome = localStorage.getItem('lognome');  
const perfil = localStorage.getItem('logperfil');
//const baseUrl = "http://34.210.56.22:3333";

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      listCartoes:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadCartoes();    

  }

  loadCliente(){
   // const url = baseUrl+"/cartao/getListaporCliente"
   api.get('/cartao/getListaporCliente')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listCartoes:data})
      }
      else {
        alert("Error web service")
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  }
 
  render()
  {
    return (
      <div className="container-fluid">    
       <div>
            <Menu_administrador />  
          </div>
          <div>
         <br/>        
        </div>  
        <table className="table table-hover danger">
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
      </div>   
    );
  }

  loadFillData(){

    return this.state.listCliente.map((data)=>{
      return(
        <tr>
          <th>{data.id}</th>          
          <td>{data.nome}</td>
          <td>{data.email}</td>
          <td>{data.endereco}</td>
          <td>{data.telefone1}</td>
          <td>
            <div style={{width:"150px"}}>
              <Link className="btn btn-outline-info" to={"/edit/"+data.id}>Editar</Link>
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
      } else if (result.dismiss == Swal.DismissReason.cancel) {
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
    //const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/cliente/delete/${userId}`)    
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadCliente()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
