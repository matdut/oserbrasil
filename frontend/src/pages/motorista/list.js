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
      listMotorista:[],
      listaStatus:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadMotorista();  
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
         <Link className="btn btn-outline-info" to={"/motorista/0"}> <span class="glyphicon glyphicon-plus"></span><i class="fas fa-user-plus"></i> Adicionar Motorista</Link>       
        <br/>
        </div>  
        <table className="table table-hover table-striped">
          <thead>
            <tr>              
              <th scope="col">#</th>            
              <th scope="col">CPF</th>
              <th scope="col">Nome</th>
              <th scope="col">Email</th>
              <th scope="col">Endereço</th>
              <th scope="col">Celular</th>
              <th scope="col">Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>         
            {this.loadFillData()}
          </tbody>
        </table>
         <Link className="btn btn-outline-info" to={"/motorista/0"}> <span class="glyphicon glyphicon-plus"></span><i class="fas fa-user-plus"></i> Adicionar Motorista</Link>         
      </div>   
    );
  }

  loadFillData(){

    return this.state.listMotorista.map((data, index)=>{
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
              </Input></td>    
          <td>
            <div style={{width:"150px"}}>              
              {'   '}
              <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data, data.id)}> Deletar </button>
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
    
    api.put(`/motorista/update/${data.id}`, datapost)
    .then(response =>{

      if (response.data.success) {
        this.loadMotorista();
        this.loadFillData();  
      }  
      
    })
    .catch ( error => {
      alert("Erro de Conexão")
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
        this.sendDelete(data, id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Seus dados não foram apagados :)',
          'error'
        )
      }
    })
  }

  sendDelete(data, userId){
    // url de backend
    //console.log('deletar o id - '+userId);
    //const baseUrl = "http://34.210.56.22:3333/motorista/delete/"+userId    // parameter data post
    //const url = baseUrl+"/motorista/delete/"+userId    // parameter data post
    // network
    api.delete(`/login/delete/${data.email}`)    

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
