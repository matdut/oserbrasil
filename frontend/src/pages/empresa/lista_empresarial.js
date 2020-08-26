import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import api from '../../services/api';
import { Alert, Input } from 'reactstrap';

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
      <div className="container-fluid">    
          <div>
            <Menu_administrador />  
          </div>
          <center><h3><strong>Lista de Clientes Empresarial</strong></h3></center>
          <div>  
          <Link className="btn btn-outline-info" to={"/empresa/0"}> <span class="glyphicon glyphicon-plus"></span><i class="fas fa-user-plus"></i> Adicionar Cliente</Link>                 
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
        <Link className="btn btn-outline-info" to={"/empresa/0"}> <span class="glyphicon glyphicon-plus"></span><i class="fas fa-user-plus"></i> Adicionar Cliente</Link>       

        <br/>

        <Alert color={this.state.color}>
               {this.state.mensagem}
          </Alert>     
      </div>   
    );
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
              <button className="btn btn-outline-danger" onClick={()=>this.validar_delete(data, data.id)}> Deletar </button>
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
     
    api.get(`/eventos/listaeventocliente/${id}`)
    .then(response =>{

      if (response.data.success) {
    
        const registros = response.data.data;
        if (registros.length > 0) {
          this.setState({ 
            color: 'danger',
            mensagem: 'Cliente tem Evento(s) associado(s), não pode ser excluído'
          })          
        } else {
          this.onDelete(data, id);
        }          

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
    //console.log('deletar o id - '+userId);
   // const Url = baseUrl+"/cliente/delete/"+userId    // parameter data post
    // network
    api.delete(`/login/delete/${data.email}`)     
    
    api.get(`/empresa/getEmpresaCliente/${userId}`)
    .then(res=>{
      if (res.data.success) {

        api.delete(`/empresa/delete/${res.data.data[0].id}`)
        .then(response =>{
         
          if (response.data.success) {       
      
              api.delete(`/cliente/delete/${res.data.data[0].cliente.id}`)
              .then(response =>{
                
                if (response.data.success) {       
            
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
