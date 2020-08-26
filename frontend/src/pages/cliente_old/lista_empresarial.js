import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';
import { Alert } from 'reactstrap';

import { Link } from "react-router-dom";
import { cnpjMask } from '../formatacao/cnpjmask';
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
      inicio: 0,
      mensagem: '',
      color: 'light',
      listCliente:[]
    }
  }

  componentDidMount(){
    this.setState({
      perfil: localStorage.getItem('logperfil')    
    });
    this.loadCliente();    

  }

  loadCliente(){
   // const url = baseUrl+"/cliente/list"
   api.get('/cliente/listarEmpresarial')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        console.log(JSON.stringify(data, null, "    ")); 
        this.setState({listCliente:data})
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
      <div className="container-fluid">    
          <div>
            <Menu_administrador />  
          </div>
          <center><h3><strong>Lista de Clientes Empresarial</strong></h3></center>
          <div>  
          <Link className="btn btn-outline-info" to={"/empresa/0"}> <span class="glyphicon glyphicon-plus"></span> Adicionar Cliente</Link>                 
        <br/>
        </div>  
        <table className="table table-hover danger">
          <thead>
            <tr>
              <th scope="col">#</th>            
              <th scope="col">CNPJ</th>
              <th scope="col">Razão Social</th>
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
        <Link className="btn btn-outline-info" to={"/empresa/0"}> <span class="glyphicon glyphicon-plus"></span> Adicionar Cliente</Link>       

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
          <td>{cnpjMask(data.cnpj)}</td>
          <td>{data.razao_social}</td>
          <td>{data.nome}</td>
          <td>{data.email}</td>
          <td>{data.status.descricao}</td>
          <td>
            <div style={{width:"150px"}}>
              {'   '}
              <button className="btn btn-outline-danger" onClick={()=>this.validar_delete(data.id)}> Deletar </button>
            </div>            
          </td>          
        </tr>
      )
    })
  }

  validar_delete(data) {
     
    api.get(`/eventos/listaeventocliente/${data}`)
    .then(response =>{

      if (response.data.success) {
       // console.log('id - '+response.data);
     //  console.log( JSON.stringify(response.data, null, "    ") );       
        const registros = response.data.data;
        if (registros.length > 0) {
          this.setState({ 
            color: 'danger',
            mensagem: 'Cliente tem Evento(s) associado(s), não pode ser excluído'
          })          
        } else {
          this.onDelete(data);
        }          

      }
    })
    .catch ( error => {
      alert("Erro de Conexão")
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
        this.setState({ 
          color: 'danger',
          mensagem: 'Seus dados não foram apagados :)'
        })  
      }
    })
  }

  sendDelete(userId){
    // url de backend
    //console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
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
