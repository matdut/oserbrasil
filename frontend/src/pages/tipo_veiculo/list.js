import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../services/api';

import { Input } from 'reactstrap';

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
      listaTipoVeiculo:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadTipoVeicculo();  
  }  
 
  loadTipoVeicculo(){ 
   
    api.get('/tipoTransporte/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listaTipoVeiculo:data})
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
          <center><h3><strong>Lista de Tipo de Veículos</strong></h3> </center>         
         <br/>
         <Link className="btn btn-outline-info" to={"/tipo_transporte"}> <span class="glyphicon glyphicon-plus"></span><i class="fas fa-car"></i> Adicionar Veiculo</Link>       
        <br/>
        </div>  
        <table className="table table-hover table-striped">
          <thead>
            <tr>              
              <th scope="col">#</th>            
              <th scope="col">DESCRICAO</th>              
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>         
            {this.loadFillData()}
          </tbody>
        </table>
         <Link className="btn btn-outline-info" to={"/tipo_transporte"}> <span class="glyphicon glyphicon-plus"></span><i class="fas fa-car"></i> Adicionar Veiculo</Link>         
      </div>   
    );
  }

  loadFillData(){

    return this.state.listaTipoVeiculo.map((data, index)=>{
      return(
        <tr>
          <th>{index + 1}</th>          
          <td>{data.descricao}</td>         
          <td>
            <div style={{width:"150px"}}>              
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
    api.delete(`/tipoTransporte/delete/${userId}`)
    .then(response =>{
      if (response.data.success) {
        Swal.fire(
          'Deletado',
          'Você apagou os dados com sucesso.',
          'success'
        )
        this.loadTipoVeicculo()
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }

}

export default listComponent;
