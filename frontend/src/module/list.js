import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

import { Link } from "react-router-dom";

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const baseUrl = "http://34.210.56.22:3333"

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      listCliente:[]
    }
  }

  componentDidMount(){
     this.loadCliente()
  }

  loadCliente(){
    const url = baseUrl+"/cliente/list"
    axios.get(url)
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listCliente:data})
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
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
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
            <Link className="btn btn-outline-info" to={"/edit/"+data.id}>Edit</Link>
          </td>
          <td>
            <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Delete </button>
          </td>
        </tr>
      )
    })
  }

  onDelete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId){
    // url de backend
    const baseUrl = "http://34.210.56.22:3333/cliente/delete"    // parameter data post
    // network
    axios.post(baseUrl,{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deleted!',
          'Your clinte has been deleted.',
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
