import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import axios from 'axios';
import { Link } from "react-router-dom";
import api from '../../../services/api';
import { Input, Alert } from 'reactstrap';

import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

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
      mensagem: '',
      color: 'light',
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
      <div>           
        <Menu_motorista />         
        <div className="titulo_admministrador">
              <div className="unnamed-character-style-4 descricao_admministrador">          
                  <h3><strong>Lista de Veículos</strong></h3>
              </div>      
            </div>
       <div className="container_alterado_1">        
    
        <br/>
     
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

         <Alert color={this.state.color}>
               {this.state.mensagem}
          </Alert>    

        <div className="botao_lista_incluir">
          <Fab size="large" color="secondary" variant="extended" onClick={()=>this.onIncluir()}>
              <AddIcon/> Adicionar Veículo
          </Fab>
       </div>
      </div>   
     </div> 
    );
  }

  onIncluir() {
    this.props.history.push(`/incluir_veiculos/`+localStorage.getItem('logid'));   
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
              <IconButton aria-label="editar" onClick={()=>this.onEditar(data)}>
                <EditIcon />
              </IconButton>  
              {'   '}
              <IconButton aria-label="delete" onClick={()=>this.onDelete(data.email, data.id)}>
                <DeleteIcon />
              </IconButton>  
            </div>            
          </td>          
        </tr>
      )
    })
  }

  onEditar(data) {
    this.props.history.push(`/alterar_veiculos/${data.id}`);   
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