import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../../services/api';

//library sweetalert
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Menu_motorista from '../menu_motorista';
const perfil = localStorage.getItem('logperfil');
const nome = localStorage.getItem('lognome');  

//const baseUrl = "http://34.210.56.22:3333"

class listComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      listVeiculos:[]
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
   api.get('/veiculo/lista_veiculos/'+localStorage.getItem('logid'))
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listVeiculos:data})
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
  
    this.props.history.push('/area_motorista'); 

  }

  render()
  {
    return (
      <div className="container-fluid">    
       <div>
          <Menu_motorista />  
       </div>       
       <div>
          <center><h3><strong>Lista de Veículos</strong></h3> </center>         
         <br/>
         <Link className="btn btn-outline-info" to={`/incluir_veiculos/`+localStorage.getItem('logid')}> <span class="glyphicon glyphicon-plus"></span> Adicionar Veículo</Link>       
        <br/>
        </div>  
        <table className="table table-hover table-striped">
          <thead>
            <tr>              
              <th scope="col">#</th>            
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Placa</th>
              <th scope="col">Ano</th>             
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>         
            {this.loadFillData()}
          </tbody>
        </table>
         <Link className="btn btn-outline-info" to={`/incluir_veiculos/`+localStorage.getItem('logid')}> <span class="glyphicon glyphicon-plus"></span> Adicionar Veículo</Link>         
      </div>   
    );
  }

  loadFillData(){

    return this.state.listVeiculos.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.marca}</td>
          <td>{data.modelo}</td>
          <td>{data.placa}</td>
          <td>{data.ano}</td>          
          <td>
            <div style={{width:"150px"}}>       
            <Link className="btn btn-outline-info" to={"/alterar_veiculos/"+data.id}>Editar</Link>
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
 
    api.delete(`/veiculo/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
      
        this.loadMotorista()
      }
    })
    .catch ( error => {
      alert("Error veiculo delete id "+userId)
    })
  }

}

export default listComponent;
