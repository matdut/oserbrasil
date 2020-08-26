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

class lista_loginComponent extends React.Component  {

  constructor(props){
    super(props);
    this.state = {
      perfil: perfil,
      campStatus: '',
      inicio: 0,
      mensagem: '',
      color: 'light',
      listaLogin:[],
      listaStatus:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadLogin();  
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

  loadLogin(){
   // const url = baseUrl+"/cliente/list"
   api.get('/login/list')
    .then(res=>{
      if (res.data.success) {

        const data = res.data.data       
        this.setState({listaLogin:data})
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
          <center><h3><strong>Lista do Login</strong></h3></center>
          <div>            
        <br/>
        </div>  
        <table className="table table-hover danger">
          <thead>
            <tr>
              <th scope="col">#</th>                          
              <th scope="col">Email</th>
              <th scope="col">Senha</th>             
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
      </div>   
    );
  }

  loadFillData(){
    
    return this.state.listaLogin.map((data, index)=>{     
      return(        
        <tr>
          <th>{index + 1}</th>                    
          <td>{data.email}</td>
          <td>{data.senha}</td>          
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
    .then(response =>{

      if (response.data.success) {
        this.loadLogin();
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
      } 
    })
  }

  sendDelete(data, userId){  

    api.delete(`/login/delete/${data.email}`)     
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

export default lista_loginComponent;
